import React, { useState } from 'react'
import './Signup.css';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (event) => {
        event.preventDefault();
        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return; 
            // Exit the function early if passwords don't match
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/signup', {
                username,
                email,
                password,
                confirmPassword,
            });
            console.log('Account Created', response.data);
            toast.success('Account successfully created');
            navigate('/login');
        } catch (error) {
            console.error('Error during signup', error.response.data);
            toast.error('Failed to create an Account');
            console.log(error.response.data);
        }
    };

  return (
    <div className="sign_main_body">
    <ToastContainer/>
    <div className="sign_field">
        <div className="sign_field_box">

            <div className="sign_header">
                <h1>SignUp</h1>

            </div>

            <div className="sign_inputs">
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                />

                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />

                <input
                    type="password"
                    placeholder='ConfirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

            </div>

            <div className="create_buutons">
                <div className="submit" onClick={handleCreate}>
                    <button className='link_button'> Create </button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Signup
