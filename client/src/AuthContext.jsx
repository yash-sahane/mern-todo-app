import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, loading, setLoading, tasks, setTasks }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider