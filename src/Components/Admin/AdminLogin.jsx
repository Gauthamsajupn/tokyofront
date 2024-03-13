import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const AdminLogin = () => {
    const [adminiD, setAdminiD] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://127.0.0.1:8000/adminLogin',
                {
                    adminiD,
                    password
                });
            if (res.status === 200) {
                toast.success('Login successful');
                navigate('/UserDetails');
            }
        } catch (error) {
            console.error('Error during login', error);
            toast.error('Login failed. Please check your Email and Password.');
        }
        finally {
            setLoading(false);
        }
    };

    const handleAdminiDChange = (e) => {
        setAdminiD(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        //Prevent the default form submission behavior
        e.preventDefault();
        // Call handleLogin function when the form is submitted
        handleLogin();
    };
    return (
        <div className="ad_loginadmin_body">
            <ToastContainer/>
            <div className="ad_login_field">
                <div className="ad_field_box">

                    <div className="ad_header">
                        <h3>Admin</h3>
                        <h1>Login</h1>
                    </div>

                    <form
                        onSubmit={handleSubmit}>
                        <div className="ad_inputs">
                            <input type="text"
                                placeholder='AdminiD'
                                value={adminiD}
                                onChange={handleAdminiDChange}
                            // autoComplete="email"
                            />



                            <input type="password"
                                placeholder='Password'
                                value={password}
                                onChange={handlePasswordChange}
                            />

                        </div>

                        <div className="ad_buutons">
                            <div className="ad_submit">
                                <button className='ad_link_button'  disabled={loading} >Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default AdminLogin
