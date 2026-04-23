import React from 'react';
import { motion } from 'motion/react';
import { Calendar, UserCircle } from 'lucide-react';
import salonImg from '../assets/salon.jpg';   
import retiroImg from '../assets/retiro.jpg'; 

const news = [
  {
    title: "Inauguración del Nuevo Salón de Oración",
    date: "15 Abril 2026",
    author: "Pastor Miguel Ángel",
    desc: "Un nuevo espacio sagrado diseñado para el encuentro íntimo con el Espíritu Santo.",
    image: salonImg
  },
  {
    title: "Gran Retiro de Jóvenes 2026",
    date: "10 Abril 2026",
    author: "Liderazgo Juvenil",
    desc: "Buscando la presencia de Dios en la naturaleza. ¡Inscripciones abiertas!",
    image: retiroImg
  }
];

const NewsSection = () => {
  return (
    <section id="noticias" className="py-24 px-4 bg-[#FFF8E7]">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-5xl font-['Cormorant_Garamond'] font-bold text-center text-[#2C1810] mb-12">
          Últimas Noticias
          <div className="w-24 h-1 bg-[#FFBF00] mx-auto mt-4" />
        </h3>

        <div className="grid md:grid-cols-2 gap-10">
          {news.map((item, index) => (
            <motion.div key={index} whileHover={{ y: -5 }} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#B8860B]/20 flex flex-col">
              <div className="h-56 w-full bg-gray-200">
                <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="text-2xl font-bold font-['Cormorant_Garamond'] text-[#4A2C2A] mb-3">{item.title}</h4>
                  <p className="text-gray-600 font-['Crimson_Text']">{item.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-4 text-xs font-bold text-[#B8860B] border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {item.date}</span>
                  <span className="flex items-center gap-1"><UserCircle size={14}/> {item.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;