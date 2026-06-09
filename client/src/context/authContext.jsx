import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null,
        user: null,
        loading: true
    })

    useEffect(() => {
        fetch('${import.meta.env.VITE_API_URL}/api/auth/session', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.isAuthenticated)
            {
                setAuth({
                    isAuthenticated: true,
                    role: data.user.role,
                    user: data.user,
                    loading: false
                });
            }
            else
            {
                setAuth({
                    isAuthenticated: false,
                    role: null,
                    user: null,
                    loading: false
                });
            }
        })
        .catch(() => {
            setAuth(prev => ({...prev, loading: false}));
        });
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
} 

export function useAuth() {
        return useContext(AuthContext);
    }