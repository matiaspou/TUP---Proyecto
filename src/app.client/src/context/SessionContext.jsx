import React, { createContext, useState, useContext, useEffect } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    checkSession();
  }, [])

  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/UsersController.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',
        redirect: 'follow',
        body: JSON.stringify({ action: 'userAuthetication', User: userData })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const userFound = await response.json();

      if (userFound.success) {
        const userInfo = {
          id_usuario: userFound.result.id_usuario,
          email: userFound.result.email,
          typeOfClient: userFound.result.id_rol,
          nombre: userFound.result.nombre,
          apellido: userFound.result.apellido,
          razon_social: userFound.result.razon_social,
          persona_fisica: userFound.result.persona_fisica,
        };
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));

        return {
          success: true,
          user: userInfo,
          message: "Inicio de sesión exitoso"
        };
      } else {
        setUser(null);
        return {
          success: false,
          user: null,
          message: userFound.message || "Credenciales incorrectas"
        };
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return {
        success: false,
        user: null,
        message: "Error al iniciar sesión"
      };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/UsersController.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'sessionDestroy' })
      });

      const result = await response.json();
      
      if (result.success) {
        setUser(null);
        localStorage.removeItem('user');
      } else {
        console.error("Error al cerrar sesión:", result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de cierre de sesión:", error);
    }
  };

  const checkSession = async () => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {

      const response = await fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/UsersController.php", {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
          'Accept': '*/*',
          'Accept-Encoding':'gzip, deflate, br',
          'Connection':'keep-alive',
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'checkSession' })
      });

      const result = await response.json();
      console.log(result);
      
      if (!result.success) {
        console.log("cerrando sesion...");
        logout();
      } else{
        setUser(storedUser);
      }
    }
  };

  return (
    <SessionContext.Provider value={{ user, login, logout, checkSession }}>
      {children}
    </SessionContext.Provider>
  );
};
