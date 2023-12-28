import React, { createContext, useEffect, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.stringify({
        model: '',
        username:''
    }));
    // Function to handle login
  

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            fetch('http://localhost:3000/user/me',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json()).then(data => {
                setUser(JSON.stringify(data.profile));
            })
        }
    },[])

 
    // Provide the context values to the children components
    return (
        <AuthContext.Provider value={{ logout,user,setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
