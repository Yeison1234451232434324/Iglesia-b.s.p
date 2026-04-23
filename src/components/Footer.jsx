import React from 'react';
import { MapPin, Phone, Mail, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-[#8B4513] text-white pt-16 pb-8 px-4 mt-auto font-['Crimson_Text']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/20 pb-12">
        
        {/* Columna 1 */}
        <div className="space-y-4">
          <h4 className="text-2xl font-['Cormorant_Garamond'] font-bold text-[#FFBF00]">Bajo Su Presencia</h4>
          <p className="text-white/90 text-sm leading-relaxed italic">
            "Somos una comunidad de fe fundada en 1995, dedicada a llevar el mensaje de amor y esperanza de Cristo a todas las personas."
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#FFBF00] hover:text-[#8B4513] transition-all cursor-pointer group">
              <Share2 size={18} className="group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-[#FFBF00] font-['Cormorant_Garamond'] uppercase tracking-widest">Contacto</h4>
          <ul className="space-y-3 text-white/90">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#FFBF00] shrink-0" /> 
              <span>Calle 45 #12-34, Localidad de Chapinero, Bogotá</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#FFBF00]" /> 
              <span>+57 (601) 234-5678</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[#FFBF00]" /> 
              <span>contacto@bajosupresencia.org</span>
            </li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-[#FFBF00] font-['Cormorant_Garamond'] uppercase tracking-widest">Horarios</h4>
          <ul className="space-y-2 text-white/90 text-sm">
            <li className="flex justify-between border-b border-white/20 pb-1">
              <span>Domingo - Culto Principal</span> 
              <span className="text-[#FFBF00] font-bold">10:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-white/20 pb-1">
              <span>Miércoles - Estudio Bíblico</span> 
              <span className="text-[#FFBF00] font-bold">7:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-white/20 pb-1">
              <span>Viernes - Reunión Jóvenes</span> 
              <span className="text-[#FFBF00] font-bold">6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sábado - Oración Matutina</span> 
              <span className="text-[#FFBF00] font-bold">8:00 AM</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center pt-8 text-white/60 text-xs italic">
        © 2026 Iglesia Bajo Su Presencia. "En su presencia hay plenitud de gozo" - Salmos 16:11
      </div>
    </footer>
  );
};

export default Footer;