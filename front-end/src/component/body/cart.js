import React, {useEffect, useState} from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {fetchCart, dispatchGetCart} from '../../redux/actions/cartAction';
import Header from '../header'
import Footer from '../footer';

export default function Cart() {
    const {id} = useParams()
    const history = useHistory();

    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart);

    const { isLogged, user } = auth
    const [callback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isLogged === true){
            return fetchCart(id).then(res =>{
                dispatch(dispatchGetCart(res))
            })
        }
    },[id, isLogged, dispatch, callback])


  return (
    <>
        <div id="content-wrapper">  
            <Header />
        </div>
        {/* Block content - Đục lỗ trên giao diện bố cục chung, đặt tên là `content` */}
        <div className="container mt-4">
        <h1 className="text-center">....</h1>
        <h1 className="text-center">Giỏ hàng của bạn</h1>
        <div className="row">
            <div className="col col-md-12">
            <table className="table table-bordered" >
                <thead>
                <tr>
                    <th></th>
                    <th>Món ăn</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="datarow">                 
                    {
                        cart.map(cart_user =>(
                            <tr key = {id}>
                                <td><input type="checkbox" name="CheckBox"/></td>
                                <td>{cart_user.TenMonAn}</td>
                                <td className="text-right" style={{width: 'px'}}><input defaultValue={cart_user.SoLuong} type = "number"></input></td>
                                <td className="text-right">{(cart_user.ThanhTien/cart_user.SoLuong).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                <td className="text-right">{cart_user.ThanhTien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                <td>
                                    {/* Reload lại trang */}
                                    <button id="delete_1" data-sp-ma={2} className="btn btn-danger btn-delete-sanpham" onClick={
                                        async e => {
                                            try {
                                                await axios.patch(`http://localhost:5000/store/remove_food/${cart_user._id}`)
                                                alert('Thao tác thành công')   
                                                history.push(`/cart/${user._id}`) 
                                             } catch (err) {
                                                alert(err)
                                             }
                                        
                                        }        
                                    }>
                                        <i className="fa fa-trash" aria-hidden="true" /> Xóa
                                    </button>
                                </td>

                            </tr>
                        ))
                    }   
                </tbody>
            </table>
            <Link to = {"/"} className="btn btn-warning btn-md"><i className="fa fa-arrow-left" aria-hidden="true" />&nbsp;Quay
                về trang chủ</Link>
            <a href="checkout.html" className="btn btn-primary btn-md"><i className="fa fa-shopping-cart" aria-hidden="true" />&nbsp;Thanh toán</a>
            </div>
        </div>
        </div>
        {/* End block content */}
        <Footer/>
    </>
  );
}
