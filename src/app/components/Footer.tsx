import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Church } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[var(--holy-brown)] to-[#5D4037] text-white pt-16 pb-8 overflow-hidden">
      
      {/* Efecto Decorativo: Rayos de Luz Superior */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--divine-gold)] to-transparent"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          
          {/* Sección 1: Acerca de la Iglesia */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Church className="text-[var(--divine-gold)]" size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold">Bajo Su Presencia</h3>
            </div>
            <p className="font-sans text-base text-white/80 leading-relaxed mb-6">
              Somos una comunidad de fe fundada en 1995, dedicada a llevar el mensaje de amor y esperanza de Cristo a todas las personas. Nuestra misión es crear un espacio donde cada alma encuentre refugio, sanación y propósito bajo la presencia divina.
            </p>
            <div className="flex gap-4">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--divine-gold)] transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* SVG Nativo de Facebook */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Sección 2: Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl font-bold text-[var(--warm-amber)] mb-6">Contacto</h3>
            <ul className="space-y-4 font-sans text-base text-white/90">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--divine-gold)] shrink-0 mt-1" />
                <span>Calle 45 #12-34<br/>Localidad de Chapinero<br/>Bogotá, Colombia</span>
              </li>
              <li>
                <a href="tel:+5716012345" className="flex items-center gap-3 hover:text-[var(--warm-amber)] transition-colors duration-300">
                  <Phone className="w-5 h-5 text-[var(--divine-gold)] shrink-0" />
                  <span>+57 (601) 234-5678</span>
                </a>
              </li>
              <li>
                <a href="mailto:contacto@bajosupresencia.org" className="flex items-center gap-3 hover:text-[var(--warm-amber)] transition-colors duration-300">
                  <Mail className="w-5 h-5 text-[var(--divine-gold)] shrink-0" />
                  <span>contacto@bajosupresencia.org</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Sección 3: Horarios de Servicio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-serif text-2xl font-bold text-[var(--warm-amber)] mb-6">Horarios de Servicio</h3>
            <ul className="space-y-3 font-sans text-base text-white/90">
              <li className="flex justify-between border-b border-white/20 pb-2">
                <span>Domingo - Culto Principal</span>
                <span className="text-[var(--divine-gold)] font-medium">10:00 AM</span>
              </li>
              <li className="flex justify-between border-b border-white/20 pb-2">
                <span>Miércoles - Estudio Bíblico</span>
                <span className="text-[var(--divine-gold)] font-medium">7:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/20 pb-2">
                <span>Viernes - Reunión Jóvenes</span>
                <span className="text-[var(--divine-gold)] font-medium">6:00 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Sábado - Oración Matutina</span>
                <span className="text-[var(--divine-gold)] font-medium">8:00 AM</span>
              </li>
            </ul>
          </motion.div>
          
        </div>

        {/* Barra Inferior (Copyright) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/20 pt-8 mt-8 text-center font-sans"
        >
          <p className="text-white/70 text-sm mb-2">
            © 2026 Iglesia Bajo Su Presencia. Todos los derechos reservados.
          </p>
          <p className="text-[var(--divine-gold)] italic text-sm">
            "En su presencia hay plenitud de gozo" - Salmos 16:11
          </p>
        </motion.div>
      </div>
    </footer>
  );
}