import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Imagen de Fondo y Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1769590280436-41d1e2252e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjaHVyY2glMjBwcmF5ZXIlMjBzcGlyaXR1YWwlMjBsaWdodHxlbnwxfHx8fDE3NzYxOTE4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Velas encendidas en atmósfera espiritual"
          className="w-full h-full object-cover"
        />
        {/* Gradiente desde el holy-brown hasta el crema sagrado */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--holy-brown)]/80 to-[var(--sacred-cream)]" />
      </div>

      {/* Efecto de Luz Divina Animado */}
      <motion.div 
        className="absolute z-10 w-[600px] h-[600px] bg-[var(--warm-amber)] rounded-full blur-[150px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contenido Principal */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-[-10vh]">
        
        {/* Título animado */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-serif font-bold tracking-wide drop-shadow-2xl">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-2">
              Bienvenidos a
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--warm-amber)]">
              Bajo Su Presencia
            </span>
          </h1>
        </motion.div>

        {/* Cita Bíblica animada */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10"
        >
          <p className="font-sans italic text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."
          </p>
          <p className="font-serif text-[var(--primary)] font-semibold mt-4 text-xl">
            Mateo 18:20
          </p>
        </motion.div>
      </div>
    </section>
  );
}