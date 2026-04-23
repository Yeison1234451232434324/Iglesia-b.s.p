import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Mail, Menu, X, Church } from 'lucide-react';
import LoginModal from './LoginModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--sacred-cream)]/95 backdrop-blur-sm border-b border-[var(--border)]"
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo y Marca */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--warm-amber)] rounded-full flex items-center justify-center text-white shadow-lg">
              <Church size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[var(--foreground)] tracking-wide leading-none">
                Bajo Su Presencia
              </span>
              <span className="font-sans text-sm italic text-[var(--muted-foreground)]">
                Donde mora su espíritu
              </span>
            </div>
          </motion.div>

          {/* Botones Desktop */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center gap-4"
          >
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 font-sans bg-white border-2 border-[var(--primary)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
            >
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 font-sans bg-gradient-to-r from-[var(--primary)] to-[var(--warm-amber)] text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 font-medium">
              <Mail className="w-4 h-4" />
              <span>Contacto</span>
            </button>
          </motion.div>

          {/* Toggle Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--foreground)] p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-[var(--border)] shadow-lg p-4 flex flex-col gap-3 absolute w-full"
          >
            <button 
              onClick={() => {
                setIsLoginOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 font-sans border-2 border-[var(--primary)] text-[var(--primary)] rounded-full font-medium"
            >
              <LogIn className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3 font-sans bg-gradient-to-r from-[var(--primary)] to-[var(--warm-amber)] text-white rounded-full font-medium shadow-md">
              <Mail className="w-5 h-5" />
              <span>Contacto</span>
            </button>
          </motion.div>
        )}
      </motion.header>

      {/* RENDERIZAMOS EL MODAL AQUÍ */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}