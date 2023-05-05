import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { server } from '../main';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(AuthContext);

    const submitHandler = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            // console.log(name, email, pass);
            const { data } = await axios.post(`${server}/users/register/`, {
                name, email, pass
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                withCredentials: true  // Add this line to include credentials
            });
            localStorage.setItem("token", data.token);
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (e) {
            toast.error(e.response.data.message);
            // console.log(e.response.data.message);
        }
    }

    if (isAuthenticated) {
        return <Navigate to='/profile' />
    }

    return (
        <div className='login'>
            <section>
                <form action="" onSubmit={submitHandler}>
                    <input type="text" placeholder='Enter your Name' required value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter your password' required value={pass} onChange={(e) => setPass(e.target.value)} />
                    <button type='submit'>Sign Up</button>
                    <h4>OR</h4>
                    <Link to='/login'>Login</Link>
                </form>
            </section>
        </div>
    )
}

export default Register