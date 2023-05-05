import TasksItems from '../components/TasksItems';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { server } from '../main';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Home = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginLink, setLoginLink] = useState(false);
    const { isAuthenticated, tasks, setTasks } = useContext(AuthContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const data = await axios.post(`${server}/tasks/new`, {
                title, desc
            }, {
                maxBodyLength: Infinity,
                headers: {
                    'token': token,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            console.log(data);
            toast.success(data.data.message);
            setTasks(prevTasks => [...prevTasks, data.data.task]);
            setLoading(false);
            setTitle('');
            setDesc('');
        } catch (e) {
            console.log(e.response);
            toast.error(e.response.data.message);
            if (e.response.status === 401) {
                setLoginLink(true);
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            const fetchTasks = async () => {
                const token = localStorage.getItem('token');
                const data = await axios.get(`${server}/tasks/my`, {
                    maxBodyLength: Infinity,
                    headers: {
                        'token': token
                    }
                })
                console.log(data.data.tasks);
                setTasks(data.data.tasks);
            }
            fetchTasks();
        }
    }, [isAuthenticated]);
    return (
        <div className="todo-container">
            {!isAuthenticated && <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Please login for using this app</h4>}
            <div className='login'>
                <section>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder='Enter title' required onChange={(e) => setTitle(e.target.value)} value={title} />
                        <input type="text" placeholder='Enter description' required onChange={(e) => setDesc(e.target.value)} value={desc} />
                        <button type='submit'>Add Task</button>
                        {loginLink && <Link to='/login'>Login Here</Link>}
                    </form>
                </section>
            </div>
            <TasksItems tasks={tasks} />
        </div>
    )
}

export default Home