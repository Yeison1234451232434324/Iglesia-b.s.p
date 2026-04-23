import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import logoImage from '../assets/logo.png'; 

const Header = ({ onGoToDashboard }) => {
  const { user, isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // ☢️ ORDEN DIRECTA DE SALIDA
  const forceLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8E7]/95 backdrop-blur-md border-b border-[#B8860B]/20">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('inicio')}>
            <img src={logoImage} alt="Logo" className="h-12 w-auto" />
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl font-bold font-['Cormorant_Garamond'] text-[#2C1810]">Bajo Su Presencia</h1>
              <span className="text-[10px] italic text-gray-500">Donde mora su espíritu</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <button onClick={() => scrollTo('inicio')} className="text-sm font-bold hover:text-[#B8860B]">Inicio</button>
                <button onClick={() => scrollTo('noticias')} className="text-sm font-bold hover:text-[#B8860B]">Noticias</button>
                <button onClick={() => scrollTo('eventos')} className="text-sm font-bold hover:text-[#B8860B]">Eventos</button>
                <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 px-5 py-2 border-2 border-[#B8860B] text-[#B8860B] rounded-full font-bold hover:bg-[#B8860B] hover:text-white transition-all">
                  <LogIn size={16} /> Iniciar Sesión
                </button>
                <button onClick={() => scrollTo('contacto')} className="px-5 py-2 bg-[#FFBF00] text-white rounded-full font-bold hover:bg-[#B8860B] transition-all">
                  Contacto
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFBF00] text-white flex items-center justify-center font-bold uppercase">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-[#2C1810]">{user?.name || 'Usuario'}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{user?.role || 'Rol'}</span>
                  </div>
                </div>
                <button onClick={onGoToDashboard} className="flex items-center gap-2 px-4 py-2 bg-[#FFBF00] text-[#2C1810] rounded-lg font-bold shadow-sm hover:bg-[#B8860B] hover:text-white transition-all text-sm">
                  <LayoutDashboard size={16} /> Panel de administración
                </button>
                {/* BOTÓN CON LA ORDEN DIRECTA */}
                <button onClick={forceLogout} className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg font-bold hover:bg-red-50 transition-all text-sm">
                  <LogOut size={16} /> Salir
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#B8860B]">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-20 left-0 right-0 bg-white border-b border-[#B8860B]/20 shadow-xl z-40 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 font-['Crimson_Text'] flex flex-col">
              <button onClick={() => scrollTo('inicio')} className="text-left px-4 py-2 text-lg font-semibold">Inicio</button>
              <button onClick={() => scrollTo('noticias')} className="text-left px-4 py-2 text-lg font-semibold">Noticias</button>
              <button onClick={() => scrollTo('eventos')} className="text-left px-4 py-2 text-lg font-semibold">Eventos</button>
              <button onClick={() => scrollTo('contacto')} className="text-left px-4 py-2 text-lg font-semibold">Contacto</button>
              <hr className="border-gray-100 my-2" />
              
              {!isAuthenticated ? (
                <button onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#B8860B] text-white rounded-xl font-bold">
                  <LogIn size={20} /> Iniciar Sesión
                </button>
              ) : (
                <>
                  <button onClick={() => { onGoToDashboard(); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FFBF00] text-[#2C1810] rounded-xl font-bold">
                    <LayoutDashboard size={20} /> Ir al Panel
                  </button>
                  {/* BOTÓN CON LA ORDEN DIRECTA (MÓVIL) */}
                  <button onClick={forceLogout} className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-500 font-bold bg-red-50 rounded-xl">
                    <LogOut size={20} /> Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Header;