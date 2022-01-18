import React from 'react';
import { Link} from 'react-router-dom';

export default function componentName() {
  return (
    <>
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    {/* Sidebar - Brand */}
                    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/seller">
                        <div className="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-utensils"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">OderFood Seller</div>
                    </Link>
                    {/* Divider */}
                    <hr className="sidebar-divider my-0" />
                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">
                        <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span> Dashboard</span></a>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider" />
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Món ăn
                    </div>
                    {/* Nav Item - Utilities Collapse Menu */}
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to = '/store' data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-store"></i>
                        <span> Cửa hàng</span>
                        </Link>
                    </li>     
                </ul>
    </>
  );
}
