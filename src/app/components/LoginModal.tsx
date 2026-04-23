import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserCircle, Users, Shield, LogIn, Sparkles, Mail, User, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

type UserRole = 'voluntario' | 'colaborador' | 'administrador' | null;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ FIX 1: Math.random() sacado del render para evitar hidratación inconsistente
const PARTICLE_POSITIONS = Array.from({ length: 20 }, () => ({
  left: Math.random() * 100,
  xOffset: Math.random() * 100 - 50,
}));

const FIELD_PARTICLES = Array.from({ length: 5 }, (_, i) => ({
  left: 20 + i * 15,
  xOffset: (Math.random() - 0.5) * 100,
  yOffset: -50 - Math.random() * 50,
}));

function LightParticle({ delay, left, xOffset }: { delay: number; left: number; xOffset: number }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0 }}
      animate={{
        y: [-100, -500],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        x: [0, xOffset],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      className="absolute w-2 h-2 bg-gradient-to-r from-[var(--divine-gold)] to-white rounded-full blur-sm"
      style={{ left: `${left}%`, bottom: 0 }}
    />
  );
}

// ✅ FIX 2: Componente de partícula de campo extraído para evitar re-renders con random en JSX
function FieldParticle({ left, xOffset, yOffset, delay }: { left: number; xOffset: number; yOffset: number; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, x: 0, y: 0 }}
      animate={{
        scale: [0, 1, 0],
        x: [0, xOffset],
        y: [0, yOffset],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
      className="absolute w-1.5 h-1.5 bg-[var(--divine-gold)] rounded-full blur-sm pointer-events-none"
      style={{ left: `${left}%`, top: '50%' }}
    />
  );
}

// ✅ FIX 3: Componente de campo reutilizable para eliminar duplicación masiva de código
interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  icon: React.ElementType;
  focusedField: string | null;
  delay: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function InputField({
  id, label, type, value, placeholder, icon: Icon,
  focusedField, delay, onChange, onFocus, onBlur,
}: InputFieldProps) {
  const isFocused = focusedField === id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative"
    >
      {/* ✅ FIX 4: label con className válido — eliminado `flex` duplicado como prop separado */}
      <motion.label
        animate={{
          color: isFocused ? 'rgb(217, 119, 6)' : 'rgb(51, 51, 51)',
          scale: isFocused ? 1.02 : 1,
        }}
        className="flex items-center gap-2 font-['Crimson_Text'] text-[var(--foreground)] mb-2 font-semibold"
        htmlFor={id}
      >
        <motion.div
          animate={{
            rotate: isFocused ? [0, 10, -10, 0] : 0,
            scale: isFocused ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        {label}
      </motion.label>

      <div className="relative">
        {/* Partículas de luz al enfocar */}
        {isFocused && FIELD_PARTICLES.map((p, i) => (
          <FieldParticle key={i} left={p.left} xOffset={p.xOffset} yOffset={p.yOffset} delay={i * 0.1} />
        ))}

        {/* ✅ FIX 5: repeat condicional — Infinity causa error cuando la condición cambia mid-animation */}
        <motion.div
          animate={{
            opacity: isFocused ? [0.3, 0.6, 0.3] : 0,
            scale: isFocused ? [0.95, 1.05, 0.95] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isFocused ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className="absolute -inset-1 bg-gradient-to-r from-[var(--divine-gold)] via-[var(--warm-amber)] to-[var(--divine-gold)] rounded-xl blur-md pointer-events-none"
        />

        <motion.input
          id={id}
          whileFocus={{ scale: 1.02, y: -2 }}
          animate={{
            borderColor: isFocused
              ? 'rgb(217, 119, 6)'
              : value
              ? 'rgb(251, 191, 36)'
              : 'rgb(229, 231, 235)',
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type}
          value={value}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-['Crimson_Text'] transition-all duration-300 bg-white relative z-10 shadow-sm"
          placeholder={placeholder}
        />

        {/* Brillo deslizante al escribir */}
        {value && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none rounded-xl"
          />
        )}
      </div>
    </motion.div>
  );
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<'role' | 'credentials'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const roles = useMemo(() => [
    {
      value: 'voluntario' as UserRole,
      title: 'Voluntario',
      icon: UserCircle,
      description: 'Participa en actividades y eventos',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      value: 'colaborador' as UserRole,
      title: 'Colaborador',
      icon: Users,
      description: 'Apoya en la organización',
      color: 'from-green-500 to-emerald-500',
    },
    {
      value: 'administrador' as UserRole,
      title: 'Administrador',
      icon: Shield,
      description: 'Gestión completa del sistema',
      color: 'from-amber-500 to-orange-500',
    },
  ], []);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('credentials');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRole || !email || !password) return;
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Correo o contraseña incorrectos. Intenta de nuevo.');
      return;
    }
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep('role');
    setSelectedRole(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 overflow-hidden"
          >
            {/* ✅ FIX 7: Partículas con props estáticas en vez de Math.random() en render */}
            {PARTICLE_POSITIONS.map((p, i) => (
              <LightParticle key={i} delay={i * 0.2} left={p.left} xOffset={p.xOffset} />
            ))}
          </motion.div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100, rotateX: 45 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative pointer-events-auto"
            >
              {/* Rayos de luz animados en el fondo */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
                >
                  <div className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-[var(--divine-gold)]/20 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-[var(--warm-amber)]/20 to-transparent rotate-45" />
                  <div className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-[var(--divine-gold)]/20 to-transparent rotate-90" />
                  <div className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-[var(--warm-amber)]/20 to-transparent -rotate-45" />
                </motion.div>
              </div>

              <div className="relative overflow-y-auto max-h-[90vh]">
                {/* Botón de cierre */}
                <motion.button
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/90 rounded-full transition-colors z-10 bg-white/70 backdrop-blur-sm shadow-lg"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>

                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--warm-amber)] p-8 text-white relative overflow-hidden">
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-4 right-20 w-20 h-20 bg-white/30 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-4 left-20 w-16 h-16 bg-white/20 rounded-full blur-2xl"
                  />

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Sparkles className="w-8 h-8" />
                      </motion.div>
                      <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold">
                        Iniciar Sesión
                      </h2>
                    </div>
                    <p className="font-['Crimson_Text'] text-white/90">
                      {step === 'role' ? 'Selecciona tu rol en la comunidad' : 'Completa tus datos'}
                    </p>
                  </motion.div>
                </div>

                <div className="p-8 relative">
                  <AnimatePresence mode="wait">
                    {step === 'role' ? (
                      <motion.div
                        key="role-step"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-3 gap-6"
                      >
                        {roles.map((role, index) => (
                          <motion.button
                            key={role.value}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: index * 0.15, type: 'spring', bounce: 0.5 }}
                            whileHover={{ scale: 1.08, y: -10, rotateY: 5, transition: { duration: 0.3 } }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRoleSelect(role.value)}
                            className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-[var(--primary)] hover:shadow-2xl transition-all duration-300 shadow-lg text-center group relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />

                            <motion.div
                              className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${role.color} rounded-full flex items-center justify-center shadow-xl relative`}
                              whileHover={{ rotate: 360, scale: 1.2, transition: { duration: 0.5 } }}
                            >
                              <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-full`}
                              />
                              <role.icon className="w-8 h-8 text-white relative z-10" />
                            </motion.div>

                            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[var(--foreground)] mb-2 relative z-10">
                              {role.title}
                            </h3>
                            <p className="font-['Crimson_Text'] text-sm text-[var(--muted-foreground)] relative z-10">
                              {role.description}
                            </p>
                          </motion.button>
                        ))}
                      </motion.div>
                    ) : (
                      // ✅ FIX 8: onSubmit tipado correctamente en el form
                      <motion.form
                        key="credentials-step"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleLogin}
                        className="space-y-6"
                      >
                        {/* ✅ FIX 9: Campos unificados con el componente InputField reutilizable */}
                        <InputField
                          id="name"
                          label="Nombre Completo"
                          type="text"
                          value={name}
                          placeholder="Tu nombre completo"
                          icon={User}
                          focusedField={focusedField}
                          delay={0.1}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />

                        <InputField
                          id="email"
                          label="Correo Electrónico"
                          type="email"
                          value={email}
                          placeholder="tu@email.com"
                          icon={Mail}
                          focusedField={focusedField}
                          delay={0.2}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />

                        <InputField
                          id="password"
                          label="Contraseña"
                          type="password"
                          value={password}
                          placeholder="••••••••"
                          icon={Lock}
                          focusedField={focusedField}
                          delay={0.3}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                        />

                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gradient-to-r from-[var(--sacred-cream)] to-amber-50 p-4 rounded-xl border-2 border-[var(--divine-gold)]/30 relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          />
                          <p className="font-['Crimson_Text'] text-sm text-[var(--foreground)] relative z-10">
                            <span className="font-bold">Rol seleccionado:</span>{' '}
                            <span className="text-[var(--primary)] font-semibold">
                              {roles.find((r) => r.value === selectedRole)?.title}
                            </span>
                          </p>
                        </motion.div>

                        {/* Mensaje de error */}
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm font-['Crimson_Text'] text-center -mt-2"
                          >
                            {error}
                          </motion.p>
                        )}

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex gap-4"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => setStep('role')}
                            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-['Crimson_Text'] font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                          >
                            Volver
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: loading ? 1 : 1.05, boxShadow: '0 10px 40px rgba(217, 119, 6, 0.4)' }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--warm-amber)] text-white rounded-xl font-['Crimson_Text'] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            >
                              <LogIn className="w-5 h-5 relative z-10" />
                            </motion.div>
                            <span className="relative z-10">
                              {loading ? 'Entrando...' : 'Iniciar Sesión'}
                            </span>
                          </motion.button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}