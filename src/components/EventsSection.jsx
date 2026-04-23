import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Clock, Sparkles } from 'lucide-react';

const events = [
  {
    title: "Servicio Dominical",
    date: "Domingo 20 Abril",
    time: "10:00 AM - 12:00 PM",
    location: "Santuario Principal",
    attendees: "200+ asistentes esperados",
    description: "Únete a nuestra celebración principal de fe y adoración."
  },
  {
    title: "Estudio Bíblico",
    date: "Miércoles 23 Abril",
    time: "7:00 PM - 9:00 PM",
    location: "Salón de Conferencias",
    attendees: "50+ asistentes esperados",
    description: "Profundizando en la palabra de Dios cada semana."
  }
];

const EventsSection = () => {
  return (
    <section className="py-20 px-4 bg-white/50 relative overflow-hidden" id="eventos">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-bold text-[#2C1810] mb-4">Próximos Eventos</h3>
          <p className="text-[#8B4513] font-['Crimson_Text'] italic text-lg">Únete a nosotros en estas experiencias espirituales</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mt-4" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#B8860B]/10 text-left flex flex-col gap-5 relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] to-[#FFBF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h4 className="text-2xl font-bold text-[#8B4513] font-['Cormorant_Garamond']">{event.title}</h4>
              <p className="text-gray-600 font-['Crimson_Text'] text-sm">{event.description}</p>
              
              <div className="space-y-3 text-gray-700 font-['Crimson_Text']">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-[#B8860B]"><Calendar size={20} /></div>
                  <span className="font-semibold">{event.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-[#B8860B]"><Clock size={20} /></div>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-[#B8860B]"><MapPin size={20} /></div>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-[#B8860B]"><Users size={20} /></div>
                  <span className="font-bold text-[#B8860B]">{event.attendees}</span>
                </div>
              </div>

              <button className="mt-4 w-full py-3 bg-[#FFF8E7] text-[#B8860B] font-bold rounded-xl border border-[#B8860B]/20 hover:bg-[#B8860B] hover:text-white transition-all">
                Más información
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;