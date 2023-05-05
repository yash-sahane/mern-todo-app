import axios from 'axios';
import React, { useContext } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { server } from '../main';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, setLoading, setTasks } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        // console.log(token);
        try {
            const { data } = await axios.get(`${server}/users/logout`, {
                maxBodyLength: Infinity,
                headers: {
                    'token': token,
                },
            });
            // console.log(data);
            toast.success(data.message);
            localStorage.setItem('token', '');
            setIsAuthenticated(false);
            setTasks([]);
            setLoading(false);
            navigate('/login');
        } catch (e) {
            console.log(e.response.data.message);
            toast.error(e.message.data.message);
            setIsAuthenticated(true);
        }
    }

    return (
        <nav className='header'>
            <div>
                <h2>Todo App</h2>
            </div>
            <article>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
                {
                    isAuthenticated ? <button className='btn' onClick={logoutHandler}>Logout</button> : <Link to='/login'>Login</Link>
                }
            </article>
        </nav>
    )
}

export default Header