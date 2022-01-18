import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../seller/header'
import Sidebar from '../seller/sidebar'
import { useHistory, useParams } from 'react-router-dom';
import { showErrMsg, showSuccessMsg} from '../../component/unitl/notification/notification';
import {Grid, Paper, Button} from '@mui/material';
import { useSelector } from 'react-redux';


const paperStyle = {padding: 25, height: '60vh', width: 580, margin: "30px auto"}
const btstyle = {margin:'8px 0'}

const initiaiState = {
    MaCH: '',
    TenCH: '',
    DiaChi: '',
    err: '',
    success: '',
}
 
export default function Update_Store() {
  
// Tạo biến id được lấy trên thanh url
    const {id} = useParams();
    const history = useHistory();
    const [editStore, setEditStore] = useState([]);

    const stores = useSelector(state => state.stores);
    const token = useSelector(state => state.token);

//Lấy thông tin dựa trên id
    useEffect(() => {
        if(stores.length !== 0){
            stores.forEach(store => {
                if(store._id === id){
                    setEditStore(store)
                }
            })
        }else{
            history.push('/store')
        }
    },[stores, id, history])

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
               
                    axios.patch(`http://localhost:5000/store/update_shop/${editStore._id}`, {
                        MaCH: MaCH ? MaCH : editStore.MaCH,
                        TenCH: TenCH ? TenCH : editStore.TenCH,
                        DiaChi: DiaChi ? DiaChi : editStore.DiaChi
                    },{
                        headers: {Authorization: token}
                    })
                    setStore({...store, err:'', success: 'Cập nhật thành công'})  
              } 
              catch (err) {
                setStore({...store, err:'Có lỗi xảy ra: '.err, success: ''})
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
                {/* Main Content */}
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
                                    <h2>Cập nhật thông tin cửa hàng</h2>
                                </Grid>
                                {err && showErrMsg(err)}
                                {success && showSuccessMsg(success)}
                                <div className="form-group">
                                    <label htmlFor="InputIdStore">Mã cửa hàng</label>
                                    <input 
                                        className="form-control" 
                                        name = 'MaCH'
                                        id="InputIdStore" 
                                        defaultValue={editStore.MaCH}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="InputNameStore">Tên cửa hàng</label>
                                    <input
                                         className="form-control" 
                                         name ='TenCH'
                                         id="InputNameStore" 
                                         defaultValue={editStore.TenCH} 
                                         onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="InputAddress">Địa chỉ</label>
                                    <input 
                                        className="form-control" 
                                        name = 'DiaChi'
                                        id="InputAddress" 
                                        defaultValue={editStore.DiaChi}
                                        onChange={handleChange}
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
