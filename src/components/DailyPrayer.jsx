import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const DailyPrayer = () => {
  // Datos que luego vendrán de Supabase
  const prayer = {
    text: "Señor, hoy me rindo ante tu presencia. Guía mis pasos, ilumina mi mente y permite que mi corazón sea un reflejo de tu amor infinito.",
    verse: "Salmos 143:8 - Hazme oír por la mañana tu misericordia, porque en ti he confiado.",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000"
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[var(--sacred-cream)] to-white relative overflow-hidden">
      
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-[var(--primary)]/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-[var(--warm-amber)]/10 rounded-full animate-spin-slow-reverse" />

      <div className="max-w-4xl mx-auto">
        {/* Título de Sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-[var(--warm-amber)] w-5 h-5" />
            <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[var(--foreground)]">Oración del Día</h3>
            <Sparkles className="text-[var(--warm-amber)] w-5 h-5" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mx-auto" />
        </motion.div>

        {/* Tarjeta de Oración con Acentos Dorados */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 relative border-2 border-[var(--primary)]/5"
        >
          {/* Esquinas Doradas (El detalle divino) */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[var(--divine-gold)] rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[var(--divine-gold)] rounded-br-3xl" />

          <div className="text-center space-y-8">
            <p className="text-xl md:text-3xl font-['Crimson_Text'] italic text-[var(--foreground)] leading-relaxed">
              "{prayer.text}"
            </p>
            
            <div className="pt-6 border-t border-[var(--border)]">
              <span className="font-['Cormorant_Garamond'] text-lg md:text-xl font-bold text-[var(--primary)] uppercase tracking-widest">
                {prayer.verse}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyPrayer;