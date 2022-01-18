import React, { useState } from 'react';
import axios from 'axios';
import Header from '../seller/header'
import Sidebar from '../seller/sidebar'
import { useHistory } from 'react-router-dom';
import { showErrMsg, showSuccessMsg} from '../../component/unitl/notification/notification';
import { Grid, Paper, Avatar, Button, InputLabel, OutlinedInput} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


export default function Add_Store() {
    const paperStyle = {padding: 25, height: '60vh', width: 650, margin: "30px auto"}
    const avataStyle = {backgroundColor: 'black'}
    const btstyle = {margin:'8px 0'}

    const history = useHistory()

    const initiaiState = {
        MaCH: '',
        TenCH: '',
        DiaChi: '',
        err: '',
        success: '',
    }
    const [store, setStore] = useState(initiaiState)

    // Khởi tạo các biến để xử lý dữ liệu
    const handleChange = e => {
        const {name, value} = e.target
        setStore({...store, [name]:value, err:'', success:''})
      };

    const {MaCH, TenCH, DiaChi, err, success} = store

    // Hàm xử lý submit lên server
    const handleSubmit = async e => {
        e.preventDefault()      
        // Gọi API bên back-end
        try {
            const res = await axios.post("http://localhost:5000/store/create_shop", {
                MaCH, TenCH, DiaChi
            })
            setStore({...store, err:'', success: res.data.msg})
          } catch (err) {
              err.response.data.msg && 
              setStore({...store, err: err.response.data.msg, success: ''})
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
                                    <Avatar style = {avataStyle}> <AddBusinessIcon/> </Avatar>
                                    <h2>Thêm thông tin cửa hàng</h2>
                                    {err && showErrMsg(err)}
                                    {success && showSuccessMsg(success)}
                                </Grid>
                                    <InputLabel htmlFor="outlined-adornment">Mã cửa hàng</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment"           
                                            name= 'MaCH'
                                            label="MaCH"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    <InputLabel htmlFor="outlined-adornment">Tên cửa hàng</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment"
                                            name= 'TenCH'
                                            label= "TenCH"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    <InputLabel htmlFor="outlined-adornment">Địa chỉ</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment"
                                            name= 'DiaChi'
                                            label= "DiaChi"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    <Button type = 'submit' color = 'primary' onClick={handleSubmit} fullWidth variant='contained' style ={btstyle}> Thêm</Button>      
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
