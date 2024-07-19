// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};