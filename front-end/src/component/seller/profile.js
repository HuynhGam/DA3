import {React, useState} from 'react';
import axios from 'axios';
import Header from '../seller/header'
import Sidebar from '../seller/sidebar'
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showErrMsg, showSuccessMsg} from '../../component/unitl/notification/notification';
import {Grid, Paper, Button} from '@mui/material';


const paperStyle = {padding: 25, height: '60vh', width: 450, margin: "30px auto"}
const btstyle = {margin:'8px 0'}

const initiaiState = {
    HoTen: '',
    SDT:'',
    err: '',
    success: '',
}
export default function Profile() {

    const history = useHistory();

    const auth =  useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user} = auth
    const [data, setData] = useState(initiaiState)
    const {HoTen, SDT, err, success} = data

    const {id} = useParams();

    
// Hàm xử lý...
    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }


    // Hàm xử lý submit lên server
    const handleSubmit = async e => {
         e.preventDefault()      
            // Gọi API bên back-end
            try {     
                    axios.patch(`http://localhost:5000/user/update_info/${user._id}`, {
                        HoTen: HoTen ? HoTen :  user.HoTen,
                        SDT: SDT ? SDT : user.SDT
                    },{
                        headers: {Authorization: token}
                    })
                    setData({...data, err:'', success: 'Cập nhật thành công'})  
              } 
              catch (err) {
                  setData({...data, err: err.msg, success: ''})
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
                                        <h2> Thông tin cá nhân</h2>
                                    </Grid>
                                    {err && showErrMsg(err)}
                                    {success && showSuccessMsg(success)}
                                    <div className="form-group">
                                        <label htmlFor="InputIdStore">Họ tên</label>
                                        <input 
                                            className="form-control" 
                                            name = 'HoTen'
                                            id="InputIdStore" 
                                            defaultValue={user.HoTen}     
                                            onChange={handleChange}              
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="InputNameStore">Số điện thoại</label>
                                        <input
                                            className="form-control" 
                                            name ='SDT'
                                            id="InputNameStore" 
                                            defaultValue={user.SDT}   
                                            onChange={handleChange}        
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="InputAddress">Email</label>
                                        <input 
                                            className="form-control" 
                                            name = 'Email'
                                            id="InputAddress" 
                                            defaultValue={user.Email}
                                            onChange={handleChange}  
                                            disabled
                                        />
                                    </div>
                                    <Button type = 'submit'  color = 'primary' onClick={handleSubmit} fullWidth variant='contained' style ={btstyle}> Cập nhật</Button>      
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
