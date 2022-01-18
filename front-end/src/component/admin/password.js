import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showErrMsg, showSuccessMsg} from '../../component/unitl/notification/notification';
import {FormControl,InputAdornment, Grid, Paper, Button, InputLabel, OutlinedInput, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {isMatch} from '../unitl/validation/validation'


const paperStyle = {padding: 32, height: '55vh', width: 350, margin: "50px auto"}
const avataStyle = {backgroundColor: 'black'}
const btstyle = {margin:'8px 0'}

const initiaiState = {
    MatKhauCu: '',
    MatKhauMoi:'',
    cf_password: '',
    err:'',
    success: '',
}
export default function Password_Ad() {

    const history = useHistory();

    const auth =  useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user} = auth
    const [data, setData] = useState(initiaiState)
    const {MatKhauCu, MatKhauMoi, cf_password, err, success} = data

// Hàm show mật khẩu
   const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };
// Hàm click chuột show
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
      
    
// Hàm xử lý...
    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

// Hàm xử lý submit lên server
    const handleSubmit = async e => {
         e.preventDefault()

         if(!isMatch(MatKhauMoi, cf_password)){
            return setData({...data, err: "Mật khẩu xác nhận không khớp.", success: ''})   
         }

         try {
            const res = await axios.patch(`http://localhost:5000/user/change_password/${user._id}`, {MatKhauCu, MatKhauMoi: cf_password},
                {
                     headers: {Authorization: token}
                })
            setData({...data, err:'', success: res.data.msg})
         } catch (err) {
            err.response.data.msg && 
            setData({...data, err: err.response.data.msg, success: ''})
         }
    
      }

// Xử lý đăng xuất
    const signOut = async () => {
        try {
            await axios.get('http://localhost:5000/user/logout')
            localStorage.removeItem('access_token')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

  return (
    <>
    {/* Page Wrapper */}
        <div id="wrapper">
        {/* Sidebar */}
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link to = "/admin" className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">Dashboard</div>
            </Link>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
            <a className="nav-link" href="index.html">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span></a>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars" />
                </button>
                {/* Topbar Search */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Tìm kiếm..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm" />
                    </button>
                    </div>
                </div>
                </form>
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw" />
                    </a>
                </li>
                {/* Nav Item - Alerts */}
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw" />
                    {/* Counter - Alerts */}
                    <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                    {/* Dropdown - Alerts */}
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">
                        Alerts Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                        <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white" />
                        </div>
                        </div>
                        <div>
                        <div className="small text-gray-500">December 12, 2019</div>
                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                        <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white" />
                        </div>
                        </div>
                        <div>
                        <div className="small text-gray-500">December 7, 2019</div>
                        $290.29 has been deposited into your account!
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                        <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white" />
                        </div>
                        </div>
                        <div>
                        <div className="small text-gray-500">December 2, 2019</div>
                        Spending Alert: We've noticed unusually high spending for your account.
                        </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                </li>
                <div className="topbar-divider d-none d-sm-block" />
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Xin chào bạn</span>
                    <img className="img-profile rounded-circle" src="https://s1.uphinh.org/2021/04/27/default-user-icon-13.png" />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <Link className="dropdown-item" to = {`/change_password/${user._id}`}>
                    <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
                        Đổi mật khẩu
                    </Link>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Đăng xuất
                    </a>
                    </div>
                </li>
                </ul>
            </nav>
        {/* End of Topbar */}
        
    {/* Begin Page Content */}
    <div className="container-fluid">
                        {/* Page Heading */}
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <button onClick={() => history.goBack()} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> <i className="fas fa-backward"></i> Quay lại</button>
                        </div>
                        <Grid>
                            <Paper elevation = {10} style = {paperStyle}>
                                <Grid align = 'center'>
                                    <h2>Đổi mật khẩu</h2>
                                </Grid>
                                
                                <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu cũ</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            name = 'MatKhauCu'
                                            onChange={handleChange}
                                            type={data.showPassword ? 'text' : 'password'}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {data.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Mật khẩu cũ"
                                        />
                                </FormControl>

                                    <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu mới</InputLabel>
                                        <OutlinedInput
                                            id="outlined-password"
                                            name = 'MatKhauMoi'
                                            onChange={handleChange}
                                            type={data.showPassword ? 'text' : 'password'}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {data.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Mật khẩu mới"
                                        />
                                </FormControl>

                                <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password"> Xác nhận mật khẩu</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            name = "cf_password"
                                            onChange={handleChange}
                                            type={data.showPassword ? 'text' : 'password'}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {data.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Xác nhận mật khẩu"
                                        />
                                </FormControl>
                                {err && showErrMsg(err)}
                                {success && showSuccessMsg(success)}
                                <Button type = 'submit' color = 'primary' onClick={handleSubmit} fullWidth variant='contained' style ={btstyle}> Cập nhật</Button>
                            </Paper>
                        </Grid>
                    </div>
            {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                <span>Copyright © Your Website 2020</span>
                </div>
            </div>
            </footer>
            {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
        </div>

        {/* Logout Modal*/}
        <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Bạn muốn đăng xuất?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">Chọn "Đăng xuất" hoặc "Hủy" nếu bạn muốn tiếp tục.</div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                    <a className="btn btn-primary" onClick = {() => signOut()}>Đăng xuất</a>
                </div>
            </div>
        </div>
        </div>
    </>
  );
}
