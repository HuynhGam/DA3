import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { showErrMsg, showSuccessMsg} from '../../component/unitl/notification/notification';
import {Grid, Paper, Button} from '@mui/material';
import {useSelector} from 'react-redux';



const paperStyle = {padding: 40, height: '65vh', width: 400, margin: "30px auto"}
const btstyle = {margin:'8px 0'}

const initiaiState = {
    Email: '',
    VaiTro: '',
    err: '',
    success: '',
}
 
export default function Update_Info() {
    const {id} = useParams();
    const history = useHistory();
    const [editUser, setEditUser] = useState([]);
    const [data, setData] = useState(initiaiState);

    const users = useSelector(state => state.users)
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const {user, isAdmin} = auth;
 
    useEffect(() => {
        if(users.length != 0){
            users.forEach(User => {
                if(User._id === id){
                    setEditUser(User)
                }
            })
        } else{
            history.push('/admin')
        }
    }, [users, id, history])
     // Khởi tạo các biến để xử lý dữ liệu
     const handleChange = e => {
        const {name, value} = e.target;
        setData({...data, [name]:value, err:'', success:''});
      };

    const {Email, VaiTro, err, success} = data
  
    // Hàm xử lý submit lên server
        const handleSubmit = async e => {
            e.preventDefault();  
          try {
            axios.patch(`http://localhost:5000/user/update/${editUser._id}`, {
                Email: Email ? Email : editUser.Email,
                VaiTro: VaiTro ? VaiTro : editUser.VaiTro
            },{
                headers: {Authorization: token}
            })
            setData({...data, err:'', success: 'Cập nhật thành công'})  
          } catch (err) {
            setData({...data, err:'Có lỗi xảy ra: '.err, success: ''})
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

// Reset password
    const resetPass = async () => {
        try {
            await axios.patch(`http://localhost:5000/user/reset_password/${id}`)
            alert('Mật khẩu đã được cập nhật lại: 111111')
        } catch (err) {
            alert(err)
        }
    }

  return (
    <>
        
              {/* Page Wrapper */}
              <div id="wrapper">
                {/* Sidebar */}
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
                {/* Main Content */}
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <button onClick={() => history.goBack()} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> <i className="fas fa-backward"></i> Quay lại</button>
                        </div>
                        <Grid>
                            <Paper elevation = {10} style = {paperStyle}>
                                <Grid align = 'center'>
                                    <h2>Cập nhật thông tin</h2>
                                </Grid>
                                {err && showErrMsg(err)}
                                {success && showSuccessMsg(success)}
                      
                                <div className="form-group">
                                    <label htmlFor="InputName">Họ tên</label>
                                    <input
                                         className="form-control" 
                                         name ='HoTen'
                                         id="InputName" 
                                         onChange={handleChange}
                                         defaultValue={editUser.HoTen}
                                         disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="InputEmail">Email</label>
                                    <input
                                         className="form-control" 
                                         name ='Email'
                                         id="InputEmail" 
                                         onChange={handleChange}
                                         defaultValue={editUser.Email}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="InputRole">Vai trò</label>
                                    <select name="VaiTro" id="InputRole" className="form-control" defaultValue={editUser.VaiTro} onChange={handleChange}>  
                                        <option></option>   
                                        <option value="0">Admin</option> 
                                        <option value="1">Khách hàng</option>
                                        <option value="2">Người bán</option>                       
                                    </select>
                                </div>
                                  <Button type = 'submit'  color = 'primary' onClick={handleSubmit} fullWidth variant='contained' style ={btstyle}> Cập nhật</Button> 
                                  <Button data-toggle="modal" data-target="#resetPassword" color = 'primary' fullWidth variant='contained' style ={btstyle}> Cập nhật lại mật khẩu</Button>
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
            {/* End of Page Wrapper */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>

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

    {/* Reset Password*/}
        <div className="modal fade" id="resetPassword" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Cập nhật lại mật khẩu </h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Bạn chắc chắn muốn cập nhật mật khẩu của người dùng này.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Không</button>
                        <a className="btn btn-primary" onClick = {() => resetPass()}>Có</a>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
