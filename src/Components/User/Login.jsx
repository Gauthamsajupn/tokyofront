import React, { useState } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/login', {
                email,
                password
            });
            if (response.status === 200) {
                const userData = {
                    email: email,
                    password: password
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                const storedUserData = localStorage.getItem('userData');
                console.log('Stored User Data:', storedUserData);
                
                toast.success('Login successful');
                navigate('/home');
            }
        } catch (error) {
            console.error('Error during login', error);
            toast.error('Login failed. Please check your Email and Password.'); 
        } finally {
            setLoading(false);
        }
    };
    
    const handleSignup = () => {
        console.log('Signup Clicked');
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
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
    <div className="loginmain_body">
    <ToastContainer /> 
   <div className="login_field">
       <div className="field_box">

           <div className="header">
               <h1>Login</h1>
           </div>

           <form
               onSubmit={handleSubmit}>
               <div className="inputs">
                   <input type="text"
                       placeholder='Email'
                       value={email}
                       onChange={handleEmailChange}
                       autoComplete="email"
                   />

                   <input type="password"
                       placeholder='Password'
                       value={password}
                       onChange={handlePasswordChange}
                       autoComplete="current-password" />
               </div>

               <div className="buutons">
                   <div className="submit"
                       onClick={handleSignup}>
                       <button>
                           <Link className='link_button' to={'/signup'}>Signup</Link>
                       </button>
                   </div>
                   <div className="submit">
                       <button className='link_button' disabled={loading} >Login</button>
                   </div>
               </div>
           </form>
       </div>
   </div>
</div>
  )
}

export default Login
