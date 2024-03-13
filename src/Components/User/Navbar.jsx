import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import './Navbar.css';
import axios from 'axios';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/getByCategory?category=${category}`);
      // Handle response data as needed
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data by category:', error);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('userData')
    navigate('/login')
    
};

  return (
    <div>
      <nav>
        <div className="brand">
          <h1>TokiyoO</h1>
        </div>

        <ul className={menuOpen ? "open" : ""}>
          <li><Link className='nav_link' to='/home'>Home</Link></li>
          <li><Link className='nav_link' to='/kids' onClick={() => handleCategoryClick('kids')}>Kids</Link></li>
          <li><Link className='nav_link' to='/womens' onClick={() => handleCategoryClick('womens')}>Womens</Link></li>
          <li><Link className='nav_link' to='/mens' onClick={() =>('mens')}>Mens</Link></li>
        </ul>

        <div className="bar" onClick={() => {
          setMenuOpen(!menuOpen);
        }}>
          <DensityMediumIcon />

          
        </div>
        <div className="user_icon" onClick={handleLogout}>
                    <ExitToAppIcon />
                </div>
        <div>
          
        </div>

        {user && (
          <div className="user-account">
            Welcome, {user}!
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
