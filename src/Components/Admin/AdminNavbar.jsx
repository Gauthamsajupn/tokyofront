import React from 'react';
import './AdminNavbar.css';
// import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <div>
      <div className="navbar_main">
                <div className="nav_brand">
                    <div className="brand_name">
                        <h3>Tokiyo</h3>
                    </div>
                </div>
                <div className="nav_account">
                    {/* <div className="account">
                        <ul>
                        <li><Link className='nav_link' style={{textDecoration:"none", color:"#c39150"}} to='/'>LogOut</Link></li>
                        </ul>
                    </div> */}
                </div>
            </div>
         </div>
   
  )
}

export default AdminNavbar
