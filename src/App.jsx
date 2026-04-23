import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DailyPrayer from './components/DailyPrayer';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster, toast } from 'sonner';

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();
  const [currentView, setCurrentView] = useState('landing');

  // ☢️ LA OPCIÓN NUCLEAR DEFINITIVA
  const handleLogout = () => {
    // 1. Borrar la memoria del navegador a la fuerza (Esto mata a la "Sesión Fantasma")
    localStorage.clear();
    sessionStorage.clear();

    // 2. Limpiar el contexto de React
    try {
      if (logout) logout();
    } catch (e) {
      console.error(e);
    }
    
    // 3. Avisar al usuario
    toast.info("Sesión cerrada. Redirigiendo...");
    
    // 4. Cambiar el estado a la fuerza
    setCurrentView('landing');
    
    // 5. Destruir la ruta actual y recargar la web desde cero
    setTimeout(() => {
      window.location.replace('/');
    }, 600);
  };

  // Si estamos en el dashboard y el usuario está logueado
  if (currentView === 'dashboard' && isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Vista de la Landing Page
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8E7]">
      <Header 
        onGoToDashboard={() => setCurrentView('dashboard')} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow pt-20">
        <HeroSection />
        <DailyPrayer />
        <NewsSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton />
      <AppContent />
    </AuthProvider>
  );
}

export default App;