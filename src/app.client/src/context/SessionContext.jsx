import React, { createContext, useState, useContext } from 'react';
import usersRegistrated from "../mocks/users.json";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const checkSession = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);  
      return {
        success: true,
        user: storedUser.email,
        message: "Usuario detectado"
      };
    } else {
      return {
        success: false,
        user: "",
        message: "Usuario no detectado"
      };
    }
  };
  
  const login = (userData) => {
    const userFound = usersRegistrated.find(user => 
      user.email === userData.email && user.password === userData.password
    );
    
    if (userFound) {
      const userInfo = {
        email: userFound.email,
        role: userFound.role,
      };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo)); 
      console.log("Usuario guardado en localStorage: ", JSON.parse(localStorage.getItem('user')));
      return {
        success: true,
        email: userFound.email,
        role: userFound.role,
        message: "Inicio de sesión exitoso"
      };
    } else {
      setUser(null);
      return {
        success: false,
        user: "",
        message: "Credenciales incorrectas"
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
  };

  return (
    <SessionContext.Provider value={{ user, login, logout, checkSession }}>
      {children}
    </SessionContext.Provider>
  );
};
