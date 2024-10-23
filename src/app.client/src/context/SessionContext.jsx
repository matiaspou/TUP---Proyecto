import React, { createContext, useState, useContext } from 'react';

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


  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/UsersController.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'userAuthetication', User: userData })
      });


      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const userFound = await response.json();

      console.log(userFound);
      

      if (userFound) {
        const userInfo = {
          email: userFound.email,
          role: userFound.role, 
        };
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo)); 
        console.log("Usuario guardado en localStorage: ", userInfo);
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
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      return {
        success: false,
        message: "Ocurrió un error durante el inicio de sesión"
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
