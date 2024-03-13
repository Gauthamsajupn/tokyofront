import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div>
       <div className="sidebar">

<ul>
  <li>
    <Link className='link_style' to={'/Userdetails'}>View Users </Link></li>
  <li>
    <Link className='link_style' to={'/AddAdmin'}>  Add Admin</Link></li>
  <li>
    <Link className='link_style' to={'/listAdmin'}>  View Admin</Link></li>
  <li>
    <Link className='link_style' to={'/ProductForm'}> Add Products </Link></li>
  <li>
    <Link className='link_style' to={'/viewProduct'}>View Products </Link></li>
  {/* <li>
    <Link className='link_style' to={'/addpackage'}> Add Package</Link></li>
  <li>
    <Link className='link_style' to={'/viewpackages'}> View Packages</Link></li>
  <li>
    <Link className='link_style' to={'/BookingList'}> Booking Lists</Link></li> */}
</ul>
</div>


    </div>
  )
}

export default Sidebar
