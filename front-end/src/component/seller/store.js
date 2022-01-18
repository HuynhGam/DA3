import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Header from '../seller/header'
import Sidebar from '../seller/sidebar'
import {fetchAllStores, dispatchGetAllStores} from '../../redux/actions/storeAction';

export default function Store() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const { isSeller } = auth
 
    const stores = useSelector(state => state.stores)

    const [callback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isSeller){
            return fetchAllStores(token).then(res =>{
                dispatch(dispatchGetAllStores(res))
            })
        }
    },[token, isSeller, dispatch, callback])

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
                            <h1 className="h3 mb-0 text-gray-800">Cửa hàng của bạn</h1>
                            <Link to='/add-store' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> <i className="fas fa-plus-square fa-sm text-white-50"></i> Thêm cửa hàng </Link>
                        </div>
                        <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Tên cửa hàng</th>
                                            <th>Địa chỉ</th>
                                            <th>Memu</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                           stores.map(store =>(
                                               <tr key = {store.id}>
                                                  <td>{store.TenCH}</td>
                                                  <td>{store.DiaChi}</td>
                                                  <td>
                                                    <Link to = {`/menu/${store.MaCH}`}>
                                                    <i className="fas fa-bars" title='Menu'></i>
                                                    </Link>                    
                                                   </td>
                                                   <td>
                                                        <Link to = {`/update-store/${store._id}`}>
                                                            <i className="fas fa-edit" title="Chỉnh sửa"></i>
                                                        </Link>
                                                   </td>
                                               </tr>
                                           ))
                                       }
                                    </tbody>
                                </table>
                        </div>
                   
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
