import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Userdetails.css';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const Userdetails = () => {
    const [users,setUsers]= useState([]);
    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/listUser')
        .then((response)=>{
            console.log('User Details:',response.data);
            setUsers(response.data);
        })
        .catch((error)=>{
            console.error('Error fetching user details:',error);
        });
    },[]);
  return (
    <div>
      <div className=' main_body_user'>
            {/* Navbar importing */}
            <div className="navUser">
                <AdminNavbar/>
            </div>
            {/* Sidebar importing with table elments */}
            <div className="sidebrUser">
                <Sidebar />

                <div className="user_main">
                    <div className="table_div">
                        <div className="table">
                            <div className="heading">
                                User Details
                            </div>
                            <div className="table_content">
                                <table className='table_border'>
                                    <thead className='bs'>
                                        <tr>
                                            <th>UserID</th>
                                            <th>UserName</th>
                                            <th>UserEmail</th>
                                        </tr>
                                    </thead>
                                    <tbody className='tb'>
                                        {users.map((user) =>(
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Userdetails
