import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import './AddAdmin.css';

const AddAdmin = () => {
    const [adminiD, setAdminId] = useState('');
    const [adminName, setAdminName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/addAdmin', {
                adminiD,
                adminName,
                email,
                password,

            });
            console.log('Account Created', response.data);
            toast.success('Account successfully created');

        } catch (error) {
            console.error('Error during Admin Creation', error.response.data);
            toast.error('Failed to create an Account');
            console.log(error.response.data);
        }
    };
  return (
    <div>
      <div className="PlaceAdding_form">
            <ToastContainer />
            <div className="navplaceadding">
                <AdminNavbar />
            </div>
            <div className="sidebrUser">
                <Sidebar />
                <div className="user_main">
                    <div className="heading">
                        Add Admin
                    </div>
                    <div className="formborderr_div">
                        <div className="text_fieldd">

                            <div className="package_inputbox">
                                <span>Admin iD</span>
                                <input
                                    type="text"
                                    name="adminiD"
                                    value={adminiD}
                                    onChange={(e) => setAdminId(e.target.value)}
                                    required="required"
                                />
                            </div>


                            <div className="package_inputbox">
                                <span>Admin Name</span>
                                <input
                                    type="text"
                                    name="AdminName"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                    required="required"
                                />
                            </div>

                            <div className="package_inputbox">
                                <span>Email</span>
                                <input
                                    type="text"
                                    name="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required="required"
                                />
                            </div>

                            <div className="package_inputbox">
                                <span>Password</span>
                                <input
                                    type="text"
                                    name="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required="required"
                                />
                            </div>

                            <div className="bttn_div">
                                <button className='link_buttonn'
                                    onClick={handleSubmit}   >Add Admin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddAdmin
