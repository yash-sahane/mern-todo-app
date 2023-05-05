import axios from 'axios';
import React, { useContext } from 'react'
import { server } from '../main';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../AuthContext';

const Task = ({ title, desc, isCompleted, id }) => {
    const { tasks, setTasks } = useContext(AuthContext);

    const deleteHandler = async () => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await axios.delete(`${server}/tasks/${id}`, {
                headers: {
                    'token': token
                }
            })
            console.log(data);
            // Fetch the updated tasks data from the server
            const updatedTasks = await axios.get(`${server}/tasks/my`, {
                headers: {
                    'token': token
                }
            });
            // Update the tasks state with the updated data
            setTasks(updatedTasks.data.tasks);
            toast.success(data.message)
        } catch (e) {
            console.log(e.response.data.message);
            toast.error(e.response.data.message);
        }
    }

    const isCompleteHandler = async () => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await axios.put(`${server}/tasks/${id}`, {}, {
                headers: {
                    'token': token
                }
            })
            // console.log(data);
            // Fetch the updated tasks data from the server
            const updatedTasks = await axios.get(`${server}/tasks/my`, {
                headers: {
                    'token': token
                }
            });
            // Update the tasks state with the updated data
            setTasks(updatedTasks.data.tasks);
            toast.success(data.message)
        } catch (e) {
            // console.log(e);
            console.log(e.response.data.message);
            toast.error(e.response.data.message);
        }
    }

    return (
        <div className="todo">
            <div>
                <h4>{title}</h4>
                <p>{desc}</p>
            </div>
            <div>
                <input type="checkbox" name="isCompleted" checked={isCompleted} onChange={isCompleteHandler} />
                <button className="btn" onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    );
}

export default Task