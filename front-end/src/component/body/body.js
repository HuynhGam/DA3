import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {fetchFood, dispatchGetFood} from '../../redux/actions/foodAction';


export default function Body() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const food = useSelector(state => state.food);
    
    const {isLogged, user} = auth

    const [callback] = useState(false)

    const dispatch = useDispatch()


// Lấy tất cả menu qua bên redux
    useEffect(() => {
        if(isLogged == true){
            return fetchFood(token).then(res =>{
                dispatch(dispatchGetFood(res))
            })
        }
    },[token, isLogged, dispatch, callback])
    
  return (
    <>
            <section className="py-5 overflow-hidden bg-primary" id="home">
                <div className="container">
                    <div className="row flex-center">
                    <div className="col-md-5 col-lg-6 order-0 order-md-1 mt-8 mt-md-0"><a className="img-landing-banner" href="#!"><img className="img-fluid" src="assets/img/gallery/hero-header.png" alt="hero-header" /></a></div>
                    <div className="col-md-7 col-lg-6 py-8 text-md-start text-center">
                        <h1 className="display-1 fs-md-5 fs-lg-6 fs-xl-8 text-light">Bạn đã đói bụng chưa?</h1>
                        <h1 className="text-800 mb-5 fs-4">Chỉ một cú nhấn chuột thôi, những món ăn mà<br class="d-none d-xxl-block" />bạn yêu thích sẽ đến với bạn</h1>
                        <div className="card w-xxl-75">
                        <div className="card-body">
                            <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active mb-3" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i className="fas fa-motorcycle me-2" />Địa chỉ giao hàng</button>
                                <Link to = {`/cart/${user._id}`} className="nav-link mb-3" id="nav-profile-tab" ><i className="fas fa-shopping-bag me-2" />Giỏ hàng </Link>
                            </div>
                            </nav>
                            <div className="tab-content mt-3" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <form className="row gx-2 gy-2 align-items-center">
                                <div className="col">
                                    <div className="input-group-icon"><i className="fas fa-map-marker-alt text-danger input-box-icon" />
                                    <label className="visually-hidden" htmlFor="inputDelivery">Address</label>
                                    <input className="form-control input-box form-foodwagon-control" id="inputDelivery" type="text" placeholder="Nhập địa chỉ email của bạn" />
                                    </div>
                                </div>
                                <div className="d-grid gap-3 col-sm-auto">
                                    <button className="btn btn-danger" type="submit">Tìm món ăn</button>
                                </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <form className="row gx-4 gy-2 align-items-center">
                                <div className="col">
                                    <div className="input-group-icon"><i className="fas fa-map-marker-alt text-danger input-box-icon" />
                                    <label className="visually-hidden" htmlFor="inputPickup">Address</label>
                                    <input className="form-control input-box form-foodwagon-control" id="inputPickup" type="text" placeholder="Enter Your Address" />
                                    </div>
                                </div>
                                <div className="d-grid gap-3 col-sm-auto">
                                    <button className="btn btn-danger" type="submit">Tìm món ăn</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>    
            </section>

            <section className="py-4 overflow-hidden">
                <div className="container">
                    <div className="row h-100">
                    <div className="col-lg-7 mx-auto text-center mt-7 mb-5">
                        <h5 className="fw-bold fs-3 fs-lg-5 lh-sm">Món ăn phổ biến</h5>
                    </div>
                    <div className="col-12">
                        {
                        isLogged ? (
                            <div className="carousel slide" id="carouselPopularItems" data-bs-touch="false" data-bs-interval="false">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval={10000}>
                                    <div className="row gx-3 h-100 align-items-center">
                                    { food.map(food_store =>(
                                        <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                        <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="/img/logo.PNG" alt="..." />
                                            <div className="card-body ps-0">
                                            <h5 className="fw-bold text-1000 text-truncate mb-1">{food_store.TenMonAn} </h5>
                                            <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cần Thơ</span></div><span className="text-1000 fw-bold">{food_store.GiaBan.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2"><Link className="btn btn-lg btn-danger" to = {`/oder/${food_store._id}`} role="button">Đặt hàng ngay</Link></div>
                                        </div>
                                        )) 
                                    }                                
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev carousel-icon" type="button" data-bs-target="#carouselPopularItems" data-bs-slide="prev"><span className="carousel-control-prev-icon hover-top-shadow" aria-hidden="true" /><span className="visually-hidden">Previous</span></button>
                            <button className="carousel-control-next carousel-icon" type="button" data-bs-target="#carouselPopularItems" data-bs-slide="next"><span className="carousel-control-next-icon hover-top-shadow" aria-hidden="true" /><span className="visually-hidden">Next </span></button>
                            </div>
                        ) : (
                             <div className="carousel slide" id="carouselPopularItems" data-bs-touch="false" data-bs-interval="false">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval={10000}>
                                <div className="row gx-3 h-100 align-items-center">
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="https://shopnguyenlieu.com/wp-content/uploads/2019/09/cach-lam-tra-sua-tran-chau-550x440.jpg" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Trà sữa truyền thống </h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cần Thơ</span></div><span className="text-1000 fw-bold">25.000 VND</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="https://www.laurenicolephoto.com/uploads/5/7/5/9/57591237/aura-crab-burger-550x440-4_orig.jpg" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Hamburger thịt + Khoai chiên</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cần Thơ</span></div><span className="text-1000 fw-bold">28.000 VND</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="https://www.laurenicolephoto.com/uploads/5/7/5/9/57591237/aura-cobb-salad-550x440-3_orig.jpg" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Salad </h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cần Thơ</span></div><span className="text-1000 fw-bold">23.000 VND</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="https://assets.grab.com/wp-content/uploads/sites/11/2020/01/20104603/photo9-40-e1579488381696.jpg" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Bánh mì truyền thống</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cần Thơ</span></div><span className="text-1000 fw-bold">18.000 VND</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="https://cdn.eva.vn/upload/3-2020/images/2020-08-06/2-cach-lam-mi-cay-han-quoc-tai-nha-ngon-nhu-ngoai-hang-m--n-m---cay-h---i-s---n-1596697335-152-width600height489.jpg" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Mỳ cay hải sản </h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cần Thơ</span></div><span className="text-1000 fw-bold">45.000 VND</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                </div>
                                </div>
                                <div className="carousel-item" data-bs-interval={5000}>
                                <div className="row gx-3 h-100 align-items-center">
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="http://media.doisongphapluat.com/598/2019/3/1/com.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Cheese Burger</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Burger Arena</span></div><span className="text-1000 fw-bold">$3.88</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="https://nghebep.com/wp-content/uploads/2017/07/com-tam-1.jpg" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Toffe's Cake</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Top Sticks</span></div><span className="text-1000 fw-bold">$4.00</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/dancake.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Dancake</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cake World</span></div><span className="text-1000 fw-bold">$1.99</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/crispy-sandwitch.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Crispy Sandwitch</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Fastfood Dine</span></div><span className="text-1000 fw-bold">$3.00</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/thai-soup.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Thai Soup</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Foody Man</span></div><span className="text-1000 fw-bold">$2.79</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Đặt hàng ngay</a></div>
                                    </div>
                                </div>
                                </div>
                                {/* <div className="carousel-item" data-bs-interval={3000}>
                                <div className="row gx-3 h-100 align-items-center">
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/cheese-burger.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Cheese Burger</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Burger Arena</span></div><span className="text-1000 fw-bold">$3.88</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/toffes-cake.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Toffe's Cake</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Top Sticks</span></div><span className="text-1000 fw-bold">$4.00</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/dancake.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Dancake</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cake World</span></div><span className="text-1000 fw-bold">$1.99</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/crispy-sandwitch.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Crispy Sandwitch</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Fastfood Dine</span></div><span className="text-1000 fw-bold">$3.00</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/thai-soup.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Thai Soup</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Foody Man</span></div><span className="text-1000 fw-bold">$2.79</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                </div>
                                </div>
                                <div className="carousel-item">
                                <div className="row gx-3 h-100 align-items-center">
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/cheese-burger.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Cheese Burger</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Burger Arena</span></div><span className="text-1000 fw-bold">$3.88</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/toffes-cake.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Toffe's Cake</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Top Sticks</span></div><span className="text-1000 fw-bold">$4.00</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/dancake.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Dancake</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Cake World</span></div><span className="text-1000 fw-bold">$1.99</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/crispy-sandwitch.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Crispy Sandwitch</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Fastfood Dine</span></div><span className="text-1000 fw-bold">$3.00</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                    <div className="card card-span h-100 rounded-3"><img className="img-fluid rounded-3 h-100" src="assets/img/gallery/thai-soup.png" alt="..." />
                                        <div className="card-body ps-0">
                                        <h5 className="fw-bold text-1000 text-truncate mb-1">Thai Soup</h5>
                                        <div><span className="text-warning me-2"><i className="fas fa-map-marker-alt" /></span><span className="text-primary">Foody Man</span></div><span className="text-1000 fw-bold">$2.79</span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2"><a className="btn btn-lg btn-danger" href="#!" role="button">Order now</a></div>
                                    </div>
                                </div>
                                </div> */}
                            </div>
                            <button className="carousel-control-prev carousel-icon" type="button" data-bs-target="#carouselPopularItems" data-bs-slide="prev"><span className="carousel-control-prev-icon hover-top-shadow" aria-hidden="true" /><span className="visually-hidden">Previous</span></button>
                            <button className="carousel-control-next carousel-icon" type="button" data-bs-target="#carouselPopularItems" data-bs-slide="next"><span className="carousel-control-next-icon hover-top-shadow" aria-hidden="true" /><span className="visually-hidden">Next </span></button>
                            </div>
                        )
                        }
                    </div>
                    </div>
                </div>{/* end of .container*/}
            </section>

            <section className="py-8 overflow-hidden">
                <div className="container">
                    <div className="row flex-center mb-6">
                    <div className="col-lg-7">
                    </div>
                    <div className="col-lg-4 text-lg-end text-center"><a className="btn btn-lg text-800 me-2" href="#" role="button">XEM TẤT CẢ <i className="fas fa-chevron-right ms-2" /></a></div>
                    <div className="col-lg-auto position-relative">
                        <button className="carousel-control-prev s-icon-prev carousel-icon" type="button" data-bs-target="#carouselSearchByFood" data-bs-slide="prev"><span className="carousel-control-prev-icon hover-top-shadow" aria-hidden="true" /><span className="visually-hidden">Previous</span></button>
                        <button className="carousel-control-next s-icon-next carousel-icon" type="button" data-bs-target="#carouselSearchByFood" data-bs-slide="next"><span className="carousel-control-next-icon hover-top-shadow" aria-hidden="true" /><span className="visually-hidden">Next</span></button>
                    </div>
                    </div>
                    <div className="row flex-center">
                    <div className="col-12">
                        <div className="carousel slide" id="carouselSearchByFood" data-bs-touch="false" data-bs-interval="false">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval={10000}>
                            <div className="row h-100 align-items-center">
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="https://cdn.dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Trà sữa</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/C%C6%A1m_T%E1%BA%A5m%2C_Da_Nang%2C_Vietnam.jpg/1280px-C%C6%A1m_T%E1%BA%A5m%2C_Da_Nang%2C_Vietnam.jpg" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Cơm</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="https://cdn.daynauan.info.vn/wp-content/uploads/2018/06/mi-cay-han-quoc.jpg" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Mì cay</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="https://vnn-imgs-f.vgcloud.vn/2021/10/05/16/loat-banh-mi-dat-khach-nhat-sai-gon-co-noi-khach-chi-tram-ngan-de-dat-ship-bang-taxi-1.jpg" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Bánh mì</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="https://cdn.tgdd.vn/2021/03/CookProduct/che-xoiaf-tran-chau-thumbnail-1200x676.jpg" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Chè</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="https://dulichkhampha24.com/wp-content/uploads/2020/09/pizza-ha-noi.jpg" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Pizza</h5>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/* <div className="carousel-item" data-bs-interval={5000}>
                            <div className="row h-100 align-items-center">
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/search-pizza.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">pizza</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/burger.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Burger</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/noodles.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Noodles</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/sub-sandwich.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Sub-sandwiches</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/chowmein.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Chowmein</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/steak.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Steak</h5>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div> */}
                            {/* <div className="carousel-item" data-bs-interval={3000}>
                            <div className="row h-100 align-items-center">
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/search-pizza.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">pizza</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/burger.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Burger</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/noodles.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Noodles</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/sub-sandwich.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Sub-sandwiches</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/chowmein.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Chowmein</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/steak.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Steak</h5>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div> */}
                            {/* <div className="carousel-item">
                            <div className="row h-100 align-items-center">
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/search-pizza.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">pizza</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/burger.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Burger</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/noodles.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Noodles</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/sub-sandwich.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Sub-sandwiches</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/chowmein.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Chowmein</h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                                <div className="card card-span h-100 rounded-circle"><img className="img-fluid rounded-circle h-100" src="assets/img/gallery/steak.png" alt="..." />
                                    <div className="card-body ps-0">
                                    <h5 className="text-center fw-bold text-1000 text-truncate mb-2">Steak</h5>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div> */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>{/* end of .container*/}
            </section>

            <section className="py-0">
                <div className="bg-holder" style={{backgroundImage: 'url(assets/img/gallery/cta-two-bg.png)', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                </div>
                {/*/.bg-holder*/}
                <div className="container">
                    <div className="row flex-center">
                    <div className="col-xxl-9 py-7 text-center">
                        <h1 className="fw-bold mb-4 text-white fs-6">Bạn đã sẵn sàng để  <br/> thưởng thức bữa ăn của mình chưa ? </h1><Link className="btn btn-danger" to = {`/cart/${user._id}`}> XỬ LÝ ĐƠN HÀNG<i className="fas fa-chevron-right ms-2" /></Link>
                    </div>
                    </div>
                </div>
            </section>
        
    
    </>
  );
}
