import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
import Header from '../seller/header'
import Sidebar from '../seller/sidebar'
import { useParams, useHistory} from 'react-router-dom';
import { showErrMsg, showSuccessMsg} from '../../component/unitl/notification/notification';
import { Grid, Paper, Button, InputLabel, OutlinedInput} from '@mui/material';

export default function Add_Menu() {
    const paperStyle = {padding: 25, height: '60vh', width: 480, margin: "30px auto"}
    const btstyle = {margin:'8px 0'}

    const initiaiState = {
        MaCH: '',
        MaMonAn: '',
        TenMonAn: '',
        GiaBan: '',
        err: '',
        success: '',
    }
    const [menu, setMenu] = useState(initiaiState)

    const stores = useSelector(state => state.stores);
    const {id} = useParams()
    const history = useHistory()
    // Khởi tạo các biến để xử lý dữ liệu
    const handleChange = e => {
        const {name, value} = e.target
        setMenu({...menu, [name]:value, err:'', success:''})

      };

    const {MaCH, MaMonAn, TenMonAn, GiaBan, err, success} = menu

     // Hàm xử lý submit lên server
     const handleSubmit = async e => {
        e.preventDefault()      
        // Gọi API bên back-end
        try {
            const res = await axios.post("http://localhost:5000/store/create_food", {
                MaCH: id, MaMonAn, TenMonAn, GiaBan
            })
            setMenu({...menu, err:'', success: res.data.msg})
          } catch (err) {
              err.response.data.msg && 
              setMenu({...menu, err: err.response.data.msg, success: ''})
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
                                    <h2>Thêm món ăn</h2>
                                </Grid>
                                    <InputLabel htmlFor="outlined-adornment">Mã món ăn</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment"           
                                            name= 'MaMonAn'
                                            label="Mã món ăn"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    <InputLabel htmlFor="outlined-adornment">Tên món</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment"
                                            name= 'TenMonAn'
                                            label= "Tên món"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    <InputLabel htmlFor="outlined-adornment">Giá bán</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment"
                                            type = "number"
                                            min = "0"
                                            name= 'GiaBan'
                                            label= "Giá bán"
                                            onChange={handleChange}
                                            fullWidth
                                            helperText="Đơn vị: VNĐ"
                                        />
                                    <Button type = 'submit' color = 'primary' onClick={handleSubmit} fullWidth variant='contained' style ={btstyle}> Thêm</Button>   
                                    {err && showErrMsg(err)}
                                    {success && showSuccessMsg(success)}   
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
