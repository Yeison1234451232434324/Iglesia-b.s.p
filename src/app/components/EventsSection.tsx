import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, CalendarDays } from 'lucide-react';

const eventsData = [
  {
    id: 1,
    title: "Servicio Dominical",
    date: "Domingo 20 de abril",
    time: "10:00 - 12:00",
    location: "Santuario Principal",
    attendees: "Más de 200 asistentes esperados",
    borderColor: "border-[var(--primary)]" // Dorado
  },
  {
    id: 2,
    title: "Estudio Bíblico",
    date: "Miércoles 23 de abril",
    time: "19:00 - 21:00",
    location: "Salón de Conferencias",
    attendees: "Más de 50 asistentes esperados",
    borderColor: "border-[#9d174d]" // Fucsia/Vino tinto del diseño
  }
];

export default function EventsSection() {
  return (
    <section className="py-16 px-4 bg-[var(--sacred-cream)]">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado de Sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <CalendarDays className="w-8 h-8 text-[var(--primary)]" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              Próximos Eventos
            </h2>
          </div>
          <p className="font-sans text-[var(--muted-foreground)] text-lg">
            Únete a nosotros en estas experiencias espirituales.
          </p>
        </motion.div>

        {/* Grid de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {eventsData.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 border-t-8 ${event.borderColor}`}
            >
              <h3 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-6">
                {event.title}
              </h3>
              
              <div className="space-y-4 font-sans text-[var(--muted-foreground)]">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="italic">{event.attendees}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}