import React, { useState } from 'react';
import axios from 'axios';
import Header from './header'
import Sidebar from './sidebar'
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showErrMsg, showSuccessMsg} from '../unitl/notification/notification';
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
export default function Password() {

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

  return (
    <>
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                  <Sidebar/>
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                     <Header/>
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
            {/* End of Page Wrapper */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>
    </>
  );
}
