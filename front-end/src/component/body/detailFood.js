import React, { useState, useEffect } from 'react';
import Footer from '../footer';
import Header from '../header';
import { useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const initiaiState = {
    TenMonAn: '',
    GiaBan: '',
    SoLuong: '',
    ThanhTien: '',
    user_id: ''
}

export default function Order() {
  
    // Tạo biến id được lấy trên thanh url
    const {id} = useParams();
    const history = useHistory();
    const [detail, setDetail] = useState([]);

    const auth =  useSelector(state => state.auth)
    const {user} = auth

    const food = useSelector(state => state.food);
    const token = useSelector(state => state.token);

 
//Lấy thông tin dựa trên id
    useEffect(() => {
        if(food.length !== 0){
            food.forEach(detail_food => {
                if(detail_food._id === id){
                    setDetail(detail_food)
                }
            })
        }else{
            history.goBack()
        }
    },[food, id, history])


    const [Food, setFood] = useState(initiaiState)

    const handleChange = e => {
        const {name, value} = e.target
        setFood({...Food, [name]:value})

      };
         
     const {TenMonAn,GiaBan, SoLuong, ThanhTien} = Food
    
// Hàm xử lý submit lên server
const handleAddCart = async e => {     
    // Gọi API bên back-end
    try {
         axios.post(`http://localhost:5000/store/add_cart`, {
            TenMonAn: detail.TenMonAn, 
            GiaBan: detail.GiaBan, 
            SoLuong: SoLuong, 
            ThanhTien: SoLuong*detail.GiaBan, 
            user_id: user._id
        },{
            headers: {Authorization: token}
        })

        alert('Thêm vào giỏ hàng thành công')

      } catch (err) {     
         console.log(err)
      }
  }

  return (
    <>
       <div id="wrapper">  
            <div id="content-wrapper">  
                <Header />
        
                <div className="card" style={{margin: '120px auto', width: '350px', height: '650px', background: '#FFB30E', padding: '20px', borderRadius: '15px', color: 'cornsilk', position: 'relative'}}>
                    <div className="card_heart" style={{fontSize: '30px', position: 'absolute', left: '20px', top: '10px'}}>
                        <i className="bx bx-heart" />
                    </div>
                    <div className="card_cart" style={{fontSize: '30px', position: 'absolute', left: 'unset', top: '10px', right: '10px'}}>
                        <i className="bx bxs-cart" />
                    </div>
                    <div className="card__img" style={{width: '100%', padding: 'unset', paddingTop: '30px'}}>
                        <img src="/img/logo.PNG" style={{width: '100%', height: '100%', objectFit: 'cover', marginBottom: '20px'}} />
                    </div>
                    <div className="card__title"  style={{fontSize: '23px', fontWeight: 'bold', background:'#FFB30E', textAlign: 'center', marginLeft: '9px' ,marginTop: '20px', color: 'black'}}  >
                        {detail.TenMonAn} 
                    </div>
                    <div className="card__price" style={{fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: 'black'}}>      
                        {/* {detail.GiaBan.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} */}
                        {detail.GiaBan}
                    </div>
                    <div className="card__number" style={{display: 'flex', marginBottom: '25px'}}> 
                        <h2 style={{marginLeft: '10px', fontSize: '25px'}}>Số lượng: </h2>
                        <input 
                            onChange={handleChange} 
                            aria-label="quantity" 
                            className="input-qty" 
                            max={10} min={1} 
                            name= "SoLuong" 
                            type="number" 
                            defaultValue={1} 
                            style={{padding: '2px', borderRadius: '10px', textAlign: 'center', marginLeft: '25px', marginBottom: '15px'}} 
                        />
                    </div>
                    <div className="card__action" style={{outline: 'none', color: 'darkgray'}}>
                        <button style={{borderRadius: '20px', fontSize: '20px', padding: '10px  20px', marginLeft: '30px'}}>Buy Now</button>
                        <button onClick={handleAddCart} style={{borderRadius: '20px', fontSize: '20px', padding: '10px  20px', marginLeft: '20px'}}>add cart</button>
                    </div>
                </div>

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <button onClick={() => history.goBack()} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> <i className="fas fa-backward"></i> Quay lại</button>   
                </div>
                
                <Footer/>
            </div>
        </div>
    </>
  );
}
