import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg'; // <-- TU IMAGEN LOCAL RESTAURADA

const HeroSection = () => {
  // Función para que la flecha baje suavemente
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-[#4A2C2A]">
      {/* IMAGEN DE FONDO LOCAL */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A2C2A]/80 via-[#B8860B]/50 to-[#FFF8E7]" />
      </div>

      {/* TEXTO LIMPIO SIN CAJAS NEGRAS NI BOTONES EXTRA */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl md:text-5xl font-bold font-['Cormorant_Garamond'] text-white mb-2 drop-shadow-md">
            Bienvenidos a
          </h2>
          <h1 className="text-7xl md:text-9xl font-bold font-['Cormorant_Garamond'] text-[#FFBF00] mb-8 drop-shadow-xl">
            Bajo Su Presencia
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-2xl text-white font-['Crimson_Text'] italic drop-shadow-md">
              "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."
            </p>
            <p className="text-[#FFBF00] font-bold text-sm mt-4 uppercase tracking-widest drop-shadow-md">
              — Mateo 18:20
            </p>
          </div>
        </motion.div>
      </div>

      {/* FLECHA FUNCIONAL */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#FFBF00] cursor-pointer"
        onClick={() => scrollTo('eventos')}
      >
        <ChevronDown size={40} strokeWidth={3} />
      </motion.div>
    </section>
  );
};

export default HeroSection;