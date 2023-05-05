import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import AuthContextProvider from './AuthContext';
import App from './App'

export const server = 'https://node-todoapp-y4t1.onrender.com'
// export const server = 'http://localhost:5000'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)
