import React, {useEffect, useState} from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Header from '../seller/header'
import Sidebar from '../seller/sidebar'
import {fetchMenu, dispatchGetMenu} from '../../redux/actions/menuAction';

export default function Menu() {
 
    const {id} = useParams()
    const history = useHistory();

    const auth = useSelector(state => state.auth)
    const menu = useSelector(state => state.menu);

    const { isSeller } = auth
    const [callback] = useState(false)

    const dispatch = useDispatch()


// Lấy tất cả menu qua bên redux
    useEffect(() => {
        if(isSeller){
            return fetchMenu(id).then(res =>{
                dispatch(dispatchGetMenu(res))
            })
        }
    },[id, isSeller, dispatch, callback])
    
   
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
                            <h1 className="h3 mb-0 text-gray-800">Menu</h1>
                            <Link to= {`/add-menu/${id}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> <i className="fas fa-plus-square fa-sm text-white-50"></i> Thêm món ăn</Link>
                        </div>
                        <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Mã món ăn</th>
                                            <th>Tên món ăn</th>
                                            <th>Giá</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                    {
                                           menu.map(menu_store =>(
                                               <tr key = {id}>
                                                  <td>{menu_store.MaMonAn}</td>
                                                  <td>{menu_store.TenMonAn}</td>
                                                  <td>{menu_store.GiaBan.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                                   <td>
                                                        <Link to = {`/update-menu/${menu_store._id}`}>
                                                            <i className="fas fa-edit" title="Chỉnh sửa"></i>
                                                        </Link>
                                                   </td>
                                               </tr>
                                           ))
                                       }         
                                    </tbody>
                                </table>
                        </div>
                        <button onClick={() => history.goBack()} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> <i className="fas fa-backward"></i> Quay lại</button>
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
