import React from 'react';
import { 
  Users, Calendar, FileText, Heart, Building2, Box, Activity, BookOpen, 
  LayoutDashboard, Search, Bell, LogOut
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  // Datos para gráficas
  const growthData = [{m:'Feb', u:30, v:10}, {m:'Mar', u:50, v:25}, {m:'Abr', u:87, v:45}, {m:'May', u:95, v:50}];
  const contentData = [{name:'Noticias', val:24}, {name:'Oraciones', val:56}, {name:'Eventos', val:32}, {name:'Actividades', val:78}, {name:'Recursos', val:12}];
  const eventsData = [{m:'Feb', e:10, a:20}, {m:'Mar', e:15, a:35}, {m:'Abr', e:32, a:78}, {m:'May', e:25, a:60}];
  const pieData = [{name: 'Niños', value: 22}, {name: 'Recepción', value: 18}, {name: 'Multimedia', value: 16}, {name: 'Limpieza', value: 11}, {name: 'Otros', value: 7}, {name: 'Música', value: 27}];
  const COLORS = ['#FFBF00', '#B8860B', '#4A2C2A', '#8B4513', '#D4AF37', '#CD853F'];

  const metricsRow1 = [
    { title: "Usuarios Totales", val: "87", inc: "+8", icon: <Users size={24} className="text-blue-500" /> },
    { title: "Eventos Creados", val: "32", inc: "+5", icon: <Calendar size={24} className="text-orange-500" /> },
    { title: "Noticias Publicadas", val: "24", inc: "+2", icon: <FileText size={24} className="text-green-500" /> },
    { title: "Voluntarios Activos", val: "45", inc: "+12", icon: <Heart size={24} className="text-pink-500" /> }
  ];

  const metricsRow2 = [
    { title: "Sedes totales", val: "5", inc: "+0", icon: <Building2 size={24} className="text-purple-500" /> },
    { title: "Recursos Inventario", val: "12", inc: "+2", icon: <Box size={24} className="text-red-500" /> },
    { title: "Actividades Creadas", val: "78", inc: "+15", icon: <Activity size={24} className="text-teal-500" /> },
    { title: "Oraciones Publicadas", val: "56", inc: "+8", icon: <BookOpen size={24} className="text-indigo-500" /> }
  ];

  // ☢️ ORDEN DIRECTA DE SALIDA
  const forceLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-[#FFF8E7] overflow-hidden font-['Crimson_Text']">
      
      {/* SIDEBAR OSCURO */}
      <aside className="w-64 bg-[#4A2C2A] text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <div className="w-16 h-16 bg-white rounded-full mb-3 shadow-lg flex items-center justify-center">
            <span className="text-[#4A2C2A] font-bold text-xl">BSP</span>
          </div>
          <h2 className="text-xl font-bold font-['Cormorant_Garamond'] text-[#FFBF00]">Bajo Su Presencia</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {['Dashboard', 'Usuarios', 'Roles', 'Eventos', 'Noticias', 'Oración del Día', 'Inventario / Recursos', 'Sedes'].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${i === 0 ? 'bg-[#FFBF00] text-[#4A2C2A] font-bold shadow-md' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
              <LayoutDashboard size={18} /> {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          {/* BOTÓN CON LA ORDEN DIRECTA */}
          <button onClick={forceLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-bold">
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-[#2C1810] font-['Cormorant_Garamond']">Panel de administración</h1>
            <p className="text-sm text-gray-500">Resumen general y estadísticas del sistema.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Buscar..." className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm outline-none w-64 focus:ring-2 focus:ring-[#FFBF00]" />
            </div>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"><Bell size={18} /></button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-[#FFBF00] rounded-full text-white flex items-center justify-center font-bold">A</div>
              <div className="text-sm"><p className="font-bold">Administrador</p><p className="text-xs text-gray-500">Sistema</p></div>
            </div>
          </div>
        </header>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Tarjetas Arriba */}
          <div className="grid grid-cols-4 gap-6">
            {metricsRow1.map((m, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
                <span className="absolute top-4 right-4 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">{m.inc}</span>
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4">{m.icon}</div>
                <h3 className="text-3xl font-bold text-[#2C1810]">{m.val}</h3>
                <p className="text-sm text-gray-500 font-bold">{m.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-6">
            {metricsRow2.map((m, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
                <span className="absolute top-4 right-4 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">{m.inc}</span>
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4">{m.icon}</div>
                <h3 className="text-3xl font-bold text-[#2C1810]">{m.val}</h3>
                <p className="text-sm text-gray-500 font-bold">{m.title}</p>
              </div>
            ))}
          </div>

          {/* Gráficas */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4">Crecimiento de Usuarios</h3>
              <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={growthData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m"/><YAxis/><Tooltip/><Area type="monotone" dataKey="u" stroke="#4A2C2A" fill="#4A2C2A" fillOpacity={0.1}/><Area type="monotone" dataKey="v" stroke="#FFBF00" fill="#FFBF00" fillOpacity={0.3}/></AreaChart></ResponsiveContainer></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4">Contenido Publicado</h3>
              <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={contentData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="val" fill="#FFBF00" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4">Eventos vs Actividades</h3>
              <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={eventsData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m"/><YAxis/><Tooltip/><Area type="step" dataKey="a" stroke="#8B4513" fill="#8B4513" fillOpacity={0.2}/><Area type="step" dataKey="e" stroke="#FFBF00" fill="#FFBF00" fillOpacity={0.6}/></AreaChart></ResponsiveContainer></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="font-bold mb-4">Voluntarios por Área</h3>
              <div className="flex-1"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label>{pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Tooltip/></PieChart></ResponsiveContainer></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;