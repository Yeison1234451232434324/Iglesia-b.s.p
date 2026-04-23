import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext();

/**
 * Proveedor de Autenticación - El corazón del sistema
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si había una sesión guardada al cargar la página
  useEffect(() => {
    const savedUser = localStorage.getItem('bsp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Función para simular Login (Luego conectaremos Supabase aquí)
  const login = async (email, password, role = 'voluntario') => {
    // Simulamos una pequeña demora de red
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          name: email.split('@')[0], // Usamos el nombre del correo como nombre
          email,
          role: role // 'administrador', 'colaborador' o 'voluntario'
        };
        setUser(mockUser);
        localStorage.setItem('bsp_user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 500);
    });
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bsp_user');
  };

  // Valores que estarán disponibles en TODA la app
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usarlo fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};