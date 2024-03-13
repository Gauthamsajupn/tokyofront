import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const ViewAdmin = () => {
    const [admin,setadmin]= useState([]);

    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/listAdmin')
        .then((response)=>{
            console.log('User Details:',response.data);
            setadmin(response.data);
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
        <AdminNavbar />
    </div>
    {/* Sidebar importing with table elments */}
    <div className="sidebrUser">
        <Sidebar />

        <div className="user_main">
            <div className="table_div">
                <div className="table">
                    <div className="heading">
                      Admin Details
                    </div>
                    <div className="table_content">
                        <table className='table_border'>
                            <thead className='bs'>
                                <tr>
                                    <th>ID</th>
                                    <th>Register Id</th>
                                    <th>AdminName</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody className='tb'>
                                {admin.map((admins) =>(
                                    <tr key={admins._id}>
                                         <td>{admins._id}</td>
                                        <td>{admins.adminiD}</td>
                                        <td>{admins.adminName}</td>
                                        <td>{admins.email}</td>
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

export default ViewAdmin
