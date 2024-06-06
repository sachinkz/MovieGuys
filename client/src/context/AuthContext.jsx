import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  const login = useCallback((userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate("/");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext)