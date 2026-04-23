import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, User, Mail, Lock, Sparkles, Shield, Users, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password, selectedRole.id);
      toast.success(`Bienvenido ${formData.name}`);
      onClose();
      setStep(1);
    } catch (error) {
      toast.error("Error al iniciar sesión");
    }
  };

  const roles = [
    { id: 'voluntario', title: 'Voluntario', desc: 'Participa en actividades y eventos.', icon: <UserCircle size={32} />, color: 'text-blue-500', bg: 'bg-blue-50', border: 'hover:border-blue-500' },
    { id: 'colaborador', title: 'Colaborador', desc: 'Apoya en la organización.', icon: <Users size={32} />, color: 'text-green-500', bg: 'bg-green-50', border: 'hover:border-green-500' },
    { id: 'administrador', title: 'Administrador', desc: 'Gestión completa del sistema.', icon: <Shield size={32} />, color: 'text-orange-500', bg: 'bg-orange-50', border: 'hover:border-orange-500' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        {/* ENCABEZADO AMARILLO */}
        <div className="bg-[#FFBF00] p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all">
            <X size={20} />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={24} />
            <h2 className="text-2xl font-['Cormorant_Garamond'] font-bold">Iniciar Sesión</h2>
          </div>
          <p className="text-white/90 text-sm font-['Crimson_Text']">
            {step === 1 ? "Selecciona tu rol en la comunidad" : "Completa tus datos"}
          </p>
        </div>

        <div className="p-8 bg-gray-50/50">
          {step === 1 ? (
            /* PASO 1: TARJETAS HORIZONTALES */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => { setSelectedRole(role); setStep(2); }}
                  className={`flex flex-col items-center text-center p-8 rounded-2xl bg-white border-2 border-gray-100 shadow-sm transition-all ${role.border}`}
                >
                  <div className={`w-16 h-16 rounded-full ${role.bg} ${role.color} flex items-center justify-center mb-4`}>
                    {role.icon}
                  </div>
                  <h4 className="font-bold text-[#2C1810] text-lg mb-2">{role.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{role.desc}</p>
                </button>
              ))}
            </div>
          ) : (
            /* PASO 2: FORMULARIO */
            <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2"><User size={14}/> Nombre Completo</label>
                <input type="text" required className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#FFBF00] outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2"><Mail size={14}/> Correo Electrónico</label>
                <input type="email" required className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#FFBF00] outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2"><Lock size={14}/> Contraseña</label>
                <input type="password" required className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#FFBF00] outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#B8860B]">Rol: {selectedRole?.title}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(1)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg">Volver</button>
                  <button type="submit" className="px-6 py-2 text-sm font-bold bg-[#FFBF00] text-white rounded-lg shadow-md hover:bg-[#B8860B]">Iniciar Sesión</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;