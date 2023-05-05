import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { server } from './main';
import { AuthContext } from './AuthContext';
import './styles/app.scss';

const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated, setLoading } = useContext(AuthContext)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        setLoading(true);
        const data = await axios.get(`${server}/users/me/`, {
          maxBodyLength: Infinity,
          headers: {
            'token': token,
            'Access-Control-Allow-Origin': '*'
          }
        })
        console.log(data);
        setUser(data.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (e) {
        setUser({});
        setLoading(false);
      }
    }

    fetchUser();
  }, [isAuthenticated])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App