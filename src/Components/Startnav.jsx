import React, { useState } from 'react';
import './Startnav.css';
import { Link } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const Startnav = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <div>


            <nav>
                <div className="sn_brand">
                    <h1>TokiyoO</h1>

                </div>

                <ul className={menuOpen ? "open" : ""}>
                    <li><Link className='nav_link' to='/login'>Home</Link></li>
                    <li><Link className='nav_link' to='/signup'>SignUp</Link></li>
                    <li><Link className='nav_link' to='/login'>LoGin</Link></li>
                </ul>

                <div className="bar" onClick={() => {
                    setMenuOpen(!menuOpen);
                }}>
                    <DensityMediumIcon />
                </div>




            </nav>
        </div>
    )
}

export default Startnav
