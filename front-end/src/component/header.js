import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'


export default function Header() {
    const auth = useSelector(state => state.auth)
    
    const {user, isLogged} = auth
 
// Xử lý đăng xuất
    const signOut = async () => {
        try {
            await axios.get('http://localhost:5000/user/logout')
            localStorage.removeItem('access_token')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

  return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" data-navbar-on-scroll="data-navbar-on-scroll">
            <div className="container"><a className="navbar-brand d-inline-flex" href= ""><img className="d-inline-block" src="assets/img/gallery/logo.svg" alt="logo" /><span className="text-1000 fs-3 fw-bold ms-2 text-gradient">oderFood</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"> </span></button>
                <div className="collapse navbar-collapse border-top border-lg-0 my-2 mt-lg-0" id="navbarSupportedContent">
                <div className="mx-auto pt-5 pt-lg-0 d-block d-lg-none d-xl-block">
                    <p className="mb-0 fw-bold text-lg-center">Địa chỉ hiện tại: <i className="fas fa-map-marker-alt text-warning mx-2" /><span className="fw-normal">Trường Đại Học Kỹ Thuật - Công Nghệ Cần Thơ </span></p>
                </div>
                <form className="d-flex mt-4 mt-lg-0 ms-lg-auto ms-xl-0">
                    <div className="input-group-icon pe-2"><i className="fas fa-search input-box-icon text-primary" />
                    <input className="form-control border-0 input-box bg-100" type="search" placeholder="Tìm món ăn" aria-label="Search" />
                    </div>

                    {isLogged ?  (
                    <>
                        <span class="btn btn-white shadow-warning text-warning" onClick = {() => signOut()}>Đăng xuất</span> 
                        
                                <a  id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="btn btn-white shadow-warning text-warning"> {user.HoTen} </span>
                                </a>
                                {/* Dropdown - User Information */}
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" to = {`/profile_user/${user._id}`}>
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                        Cá nhân
                                    </Link>
                                    <Link className="dropdown-item" to = {`/password_user/${user._id}`}>
                                    <i class="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Đổi mật khẩu
                                    </Link>
                                </div>                         
                    </>
                    ) : (
                    <>
                        <Link to="/login" class="btn btn-white shadow-warning text-warning"> <i class="fas fa-user me-2"></i>Đăng nhập</Link>
                    </>
                    )}
                                        
                </form>  
                </div>
            </div>
        </nav>
    </header>
 
  );
}
