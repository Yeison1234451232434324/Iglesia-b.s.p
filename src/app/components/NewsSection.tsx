import { motion } from 'motion/react';
import { Calendar, User, FileText } from 'lucide-react';

const newsData = [
  {
    id: 1,
    title: "Inauguración del Nuevo Salón de Oración",
    description: "Con gran alegría anunciamos la apertura de nuestro nuevo espacio dedicado a la oración y meditación.",
    date: "15 de abril de 2026",
    author: "Pastor Miguel Ángel",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop" // Imagen representativa
  },
  {
    id: 2,
    title: "Retiro Espiritual de Jóvenes",
    description: "Los días 25-27 de abril realizaremos nuestro retiro anual para jóvenes en la Casa de Retiros.",
    date: "10 de abril de 2026",
    author: "Liderazgo Juvenil",
    // ⬇️ Reemplaza la URL rota por esta nueva ⬇️
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop" 
  }
];

export default function NewsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado de Sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <FileText className="w-8 h-8 text-[var(--primary)]" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              Noticias y Anuncios
            </h2>
          </div>
          <p className="font-sans text-[var(--muted-foreground)] text-lg">
            Mantente informado sobre lo que sucede en nuestra comunidad
          </p>
        </motion.div>

        {/* Grid de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {newsData.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-3">
                  {news.title}
                </h3>
                <p className="font-sans text-[var(--muted-foreground)] mb-6 flex-grow">
                  {news.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 font-sans border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{news.author}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
      </div>
    </section>
  );
}