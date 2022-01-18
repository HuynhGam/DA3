import React, { useState } from 'react';
import { FormControl, FormControlLabel, Checkbox, Grid, Paper, Avatar, TextField, Typography, Button, InputLabel, OutlinedInput, IconButton} from '@mui/material'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {isMatch} from '../component/unitl/validation/validation'
import { showErrMsg, showSuccessMsg} from '../component/unitl/notification/notification'
import axios from 'axios';


export default function Register() {
    const paperStyle = {padding: 30, height: '80vh', width: 670, margin: "75px auto"}
    const avataStyle = {backgroundColor: 'black'}
    const btstyle = {margin:'8px 0'}
    
    const initiaiState = {
        HoTen: '',
        SDT:'',
        DiaChi:'',
        Email: '',
        MatKhau: '',
        cf_password:'',
        err: '',
        success: '',
        showPassword: false,
    }
      
    const [user, setUser] = useState(initiaiState)
    const [checked, setChecked] = React.useState(false); // checkbox
    const {HoTen, SDT, DiaChi, Email, MatKhau, cf_password, err, success} = user

// Khởi tạo các biến để xử lý dữ liệu
    const handleChange = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err:'', success:''})
        setChecked(e.target.checked);
      };

// Hàm xử lý submit lên server
    const handleSubmit = async e => {
        e.preventDefault()    
        if(!isMatch(MatKhau, cf_password))
            return setUser({...user, err: "Mật khẩu xác nhận không khớp.", success: ''})

// Gọi API bên back-end
        try {
          const res = await axios.post("http://localhost:5000/user/register", {
              HoTen, SDT, DiaChi, Email, MatKhau, checked
          })
          setUser({...user, err:'', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

// Hàm show mật khẩu
   const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };
// Hàm click chuột show
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
      
  return (
        <Grid>
            <Paper elevation = {10} style = {paperStyle}>
                <Grid align = 'center'>
                    <Avatar style = {avataStyle}> <VpnKeyIcon/> </Avatar>
                    <h2>Đăng ký</h2>
                    <Typography variant='caption'>Vui lòng nhập đầy đủ thông tin dưới đây để có thể đăng ký một tài khoản</Typography>
                </Grid>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                    <TextField
                        id="outlined-multiline-flexible"
                        required
                        label="Họ tên"
                        name = 'HoTen'
                        multiline
                        onChange={handleChange}
                        sx={{ m: 1, width: '33ch' }}
                    />
                    <TextField
                        required
                        id="outlined-textarea"
                        label="Số điện thoại"
                        name = 'SDT'
                        multiline
                        onChange={handleChange}
                        sx={{ m: 1, width: '33ch' }}
                    />
                <TextField
                        id="outlined-textarea"
                        label="Địa chỉ"
                        name = 'DiaChi'
                        onChange={handleChange}
                        sx={{ m: 1, width: '68ch' }}
                        helperText="Nếu bạn là người bán hàng thì có thể bỏ qua địa chỉ"
                    />
                     <TextField
                        required
                        id="outlined-textarea"
                        label="Email"
                        name = 'Email'
                        onChange={handleChange}
                        sx={{ m: 1, width: '68ch' }}
                    />
                    <FormControl sx={{ m: 1, width: '33ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name = 'MatKhau'
                            onChange={handleChange}
                            type={user.showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {user.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Mật khẩu"
                        />
                   </FormControl>
                   <FormControl sx={{ m: 1, width: '33ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"> Xác nhận mật khẩu</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name = "cf_password"
                            onChange={handleChange}
                            type={user.showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {user.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Xác nhận mật khẩu"
                        />
                   </FormControl>
                <FormControlLabel control={<Checkbox name='checkVaiTro'  checked={checked} onChange={handleChange} title='Mặc định tài khoản của bạn sẽ đăng nhập như một người mua'  color='primary' />} label="Bạn đăng ký tài khoản như một người bán hàng" />
                <Button type = 'submit' color = 'primary' onClick={handleSubmit} fullWidth variant='contained' style ={btstyle}> Đăng ký</Button>
                <Typography> Bạn đã có tài khoản? 
                    <Link to={'/login'}>
                        Đăng nhập 
                    </Link>
                </Typography>
            </Paper>
        </Grid>
  );
}
