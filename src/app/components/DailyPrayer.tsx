import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function DailyPrayer() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-[var(--sacred-cream)] overflow-hidden">
      
      {/* Elementos Decorativos Giratorios */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 border-2 border-[var(--primary)]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-24 h-24 border-2 border-[var(--warm-amber)]/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Título de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[var(--warm-amber)]" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              Oración del Día
            </h2>
            <Sparkles className="w-6 h-6 text-[var(--warm-amber)]" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
        </motion.div>

        {/* Tarjeta de Oración */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 border-[var(--primary)]/10 w-full"
        >
          {/* Acentos Dorados en Esquinas */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[var(--divine-gold)] rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[var(--divine-gold)] rounded-br-3xl" />

          {/* Contenido de la Oración */}
          <div className="flex flex-col items-center text-center">
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-[var(--foreground)] leading-relaxed italic mb-6">
              "Amado Dios, en este nuevo día te pedimos que tu luz guíe nuestros pasos. 
              Danos la sabiduría para tomar buenas decisiones, la fuerza para superar 
              los obstáculos y un corazón dispuesto a servir a los demás. Que tu paz, 
              que sobrepasa todo entendimiento, guarde nuestras mentes y corazones."
            </p>
            <p className="font-serif text-base sm:text-lg md:text-xl text-[var(--primary)] font-semibold">
              Amén.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}