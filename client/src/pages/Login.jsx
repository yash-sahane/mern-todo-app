import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { server } from '../main';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(AuthContext)

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`${server}/users/login`, {
                email, pass
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                withCredentials: true  // Add this line to include credentials
            });
            // console.log('message : ' + data.message + 'token : ' + data.token);
            localStorage.setItem("token", data.token);
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (e) {
            toast.error(e.response.data.message);
            console.log(e.response.data.message);
        }
    }

    if (isAuthenticated) {
        return <Navigate to='/profile' replace />;
    }

    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input type="email" placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="password" placeholder='Enter your password' required onChange={(e) => setPass(e.target.value)} value={pass} />
                    <button type='submit'>Login</button>
                    <h4>OR</h4>
                    <Link to='/register'>Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login