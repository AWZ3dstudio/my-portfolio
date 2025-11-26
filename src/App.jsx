import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Box, Brain, User, Mail, 
  ArrowRight, Globe, Layers, Wand2
} from 'lucide-react';

// --- 1. TRANSLATIONS (English, Spanish, Portuguese) ---
const content = {
  EN: {
    nav: { about: "About", "3d": "3D Art", ai: "AI Gen", contact: "Contact" },
    hero: {
      title: "Digital Alchemist.",
      subtitle: "I bridge the gap between structural geometry and neural imagination.",
      badge: "Freelance 3D & AI Artist"
    },
    sections: {
      about: "About Me",
      three: "Spatial Design (3D)",
      ai: "Generative Synthesis (AI)",
      contact: "Get in Touch"
    },
    about: {
      p1: "I am a multidisciplinary creator focused on the convergence of 3D modeling and Artificial Intelligence.",
      p2: "My workflow combines the precision of Blender with the unlimited potential of Stable Diffusion and ComfyUI. I don't just generate; I curate, sculpt, and refine to build digital experiences that feel tangible."
    },
    contact: {
      name: "Name",
      email: "Email",
      msg: "Message",
      send: "Send Message"
    }
  },
  ES: {
    nav: { about: "Sobre Mí", "3d": "Arte 3D", ai: "Gen IA", contact: "Contacto" },
    hero: {
      title: "Alquimista Digital.",
      subtitle: "Uniendo la brecha entre la geometría estructural y la imaginación neuronal.",
      badge: "Artista Freelance 3D & IA"
    },
    sections: {
      about: "Sobre Mí",
      three: "Diseño Espacial (3D)",
      ai: "Síntesis Generativa (IA)",
      contact: "Contactar"
    },
    about: {
      p1: "Soy un creador multidisciplinario enfocado en la convergencia del modelado 3D y la Inteligencia Artificial.",
      p2: "Mi flujo de trabajo combina la precisión de Blender con el potencial ilimitado de Stable Diffusion. No solo genero; curo, esculpo y refino para construir experiencias digitales que se sienten tangibles."
    },
    contact: {
      name: "Nombre",
      email: "Correo",
      msg: "Mensaje",
      send: "Enviar Mensaje"
    }
  },
  PT: {
    nav: { about: "Sobre Mim", "3d": "Arte 3D", ai: "Gen IA", contact: "Contato" },
    hero: {
      title: "Alquimista Digital.",
      subtitle: "Unindo a lacuna entre a geometria estrutural e a imaginação neural.",
      badge: "Artista Freelance 3D & IA"
    },
    sections: {
      about: "Sobre Mim",
      three: "Design Espacial (3D)",
      ai: "Síntese Generativa (IA)",
      contact: "Entrar em Contato"
    },
    about: {
      p1: "Sou um criador multidisciplinar focado na convergência da modelagem 3D e Inteligência Artificial.",
      p2: "Meu fluxo de trabalho combina a precisão do Blender com o potencial ilimitado do Stable Diffusion. Eu não apenas gero; eu curo, esculpo e refino para criar experiências digitais tangíveis."
    },
    contact: {
      name: "Nome",
      email: "Email",
      msg: "Mensagem",
      send: "Enviar Mensagem"
    }
  }
};

// --- 2. HELPER COMPONENTS ---

// The Floating Navigation Dock
const FloatingDock = ({ isDark, toggleTheme, lang, setLang, activeSection }) => {
  const t = content[lang].nav;
  
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 rounded-2xl border shadow-2xl backdrop-blur-2xl transition-all duration-500 ${
          isDark 
            ? 'bg-neutral-900/80 border-white/10 text-white' 
            : 'bg-white/80 border-black/5 text-neutral-900'
        }`}
      >
        {/* Section Icons */}
        <DockIcon onClick={() => scrollTo('about')} icon={<User size={18} />} label={t.about} active={activeSection === 'about'} />
        <DockIcon onClick={() => scrollTo('3d')} icon={<Box size={18} />} label={t["3d"]} active={activeSection === '3d'} />
        <DockIcon onClick={() => scrollTo('ai')} icon={<Brain size={18} />} label={t.ai} active={activeSection === 'ai'} />
        <DockIcon onClick={() => scrollTo('contact')} icon={<Mail size={18} />} label={t.contact} active={activeSection === 'contact'} />

        {/* Vertical Line Divider */}
        <div className="w-px h-6 bg-current opacity-20 mx-1" />

        {/* Language Switcher */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
          {['EN', 'ES', 'PT'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                lang === l 
                  ? (isDark ? 'bg-white text-black' : 'bg-black text-white') 
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Vertical Line Divider */}
        <div className="w-px h-6 bg-current opacity-20 mx-1" />

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-current/10 transition-colors"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </motion.div>
    </div>
  );
};

// Helper for Dock Icons
const DockIcon = ({ icon, label, onClick, active }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`relative group p-2 rounded-xl transition-all duration-300 ${
      active ? 'bg-blue-500 text-white' : 'hover:bg-current/10'
    }`}
  >
    {icon}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      {label}
    </span>
  </motion.button>
);

// The "Bento Box" Card Component
const BentoCard = ({ children, className, isDark, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }} 
    className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-500 ${
      isDark 
        ? 'bg-neutral-900 border border-white/5 hover:bg-neutral-800' 
        : 'bg-white border border-neutral-200 hover:shadow-xl shadow-sm'
    } ${className}`}
  >
    {children}
  </motion.div>
);

// --- 3. MAIN APPLICATION ---

export default function App() {
  const [isDark, setIsDark] = useState(true); // Default to Dark Mode
  const [lang, setLang] = useState('EN');
  const [activeSection, setActiveSection] = useState('about');

  // This Effect handles the HTML class for Tailwind Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const t = content[lang];

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${
      isDark ? 'bg-black text-white selection:bg-blue-500/30' : 'bg-[#f5f5f7] text-neutral-900 selection:bg-blue-500/20'
    }`}>
      
      {/* --- SECTION 1: ABOUT ME (HERO) --- */}
      <section id="about" className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-20 relative">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2 }}
          >
            {/* Pill Badge */}
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6 border ${
              isDark ? 'border-neutral-800 bg-neutral-900 text-blue-400' : 'border-neutral-200 bg-white text-blue-600'
            }`}>
              {t.hero.badge}
            </span>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              {t.hero.title}
            </h1>
            
            {/* Subtitle */}
            <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-2xl ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {t.hero.subtitle}
            </p>
          </motion.div>

          {/* Two Small Info Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-24">
            <BentoCard isDark={isDark} className="min-h-[200px] flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Layers size={20} className="text-purple-500" /> Blender / Maya
              </h3>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {t.about.p1}
              </p>
            </BentoCard>
            <BentoCard isDark={isDark} className="min-h-[200px] flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Wand2 size={20} className="text-blue-500" /> Stable Diffusion
              </h3>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {t.about.p2}
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: 3D PORTFOLIO --- */}
      <section id="3d" className={`py-32 px-6 ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-current opacity-30"></span>
            {t.sections.three}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* Main Feature Card (Large) */}
            <BentoCard isDark={isDark} className="md:col-span-2 md:row-span-2 group p-0 relative">
              <img 
                src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2000&auto=format&fit=crop" 
                alt="3D Abstract" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-2xl font-bold">Cyberpunk Environment</h3>
                <p className="text-white/70 text-sm mt-1">Blender + Octane Render</p>
              </div>
            </BentoCard>

            {/* Small Side Card 1 */}
            <BentoCard isDark={isDark} className="p-0 relative group min-h-[250px]">
               <img 
                src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=1000&auto=format&fit=crop" 
                alt="3D Character" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
               <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-white text-xs">
                 Character Sculpt
               </div>
            </BentoCard>

            {/* Small Side Card 2 (Text Only) */}
            <BentoCard isDark={isDark} className="flex flex-col justify-center">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                4K Textures.
              </h3>
              <p className={`mt-4 text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Procedurally generated materials available for individual license.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: AI PORTFOLIO --- */}
      <section id="ai" className={`py-32 px-6 ${isDark ? 'bg-black' : 'bg-[#f5f5f7]'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-current opacity-30"></span>
            {t.sections.ai}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Video Card */}
            <BentoCard isDark={isDark} className="lg:col-span-2 aspect-video p-0 relative group">
               <img 
                src="https://images.unsplash.com/photo-1678284583120-e29177a5b3a8?q=80&w=2000&auto=format&fit=crop" 
                alt="AI Video" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-4 left-4">
                 <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Video Generation</span>
              </div>
            </BentoCard>

            {/* Square Art Card 1 */}
            <BentoCard isDark={isDark} className="aspect-square p-0 relative overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1684496277637-2d8876c11b15?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Art 1" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </BentoCard>

            {/* Square Art Card 2 */}
            <BentoCard isDark={isDark} className="aspect-square p-0 relative overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1664448007542-a3c3016c701f?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Art 2" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </BentoCard>

            {/* Info Card Wide */}
            <BentoCard isDark={isDark} className="lg:col-span-4 p-8 flex flex-col items-center text-center">
              <Brain size={48} className={`mb-4 ${isDark ? 'text-neutral-700' : 'text-neutral-300'}`} />
              <h3 className="text-2xl font-bold mb-2">Custom LoRA Training</h3>
              <p className={`max-w-md ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                I build custom models to ensure character consistency across varied environments and poses.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CONTACT --- */}
      <section id="contact" className={`py-32 px-6 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">{t.sections.contact}</h2>
          
          <BentoCard isDark={isDark} className="text-left">
            <form className="space-y-4">
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  {t.contact.name}
                </label>
                <input 
                  type="text" 
                  className={`w-full p-3 rounded-xl outline-none transition-colors ${
                    isDark 
                      ? 'bg-black border border-white/10 focus:border-blue-500' 
                      : 'bg-neutral-50 border border-neutral-200 focus:border-blue-500'
                  }`} 
                />
              </div>
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  {t.contact.email}
                </label>
                <input 
                  type="email" 
                  className={`w-full p-3 rounded-xl outline-none transition-colors ${
                    isDark 
                      ? 'bg-black border border-white/10 focus:border-blue-500' 
                      : 'bg-neutral-50 border border-neutral-200 focus:border-blue-500'
                  }`} 
                />
              </div>
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  {t.contact.msg}
                </label>
                <textarea 
                  rows={4}
                  className={`w-full p-3 rounded-xl outline-none transition-colors ${
                    isDark 
                      ? 'bg-black border border-white/10 focus:border-blue-500' 
                      : 'bg-neutral-50 border border-neutral-200 focus:border-blue-500'
                  }`} 
                />
              </div>
              <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors">
                {t.contact.send}
              </button>
            </form>
          </BentoCard>

          <div className="mt-12 flex justify-center gap-6 opacity-50">
             <Globe size={20} />
             <span>Designed in React. Hosted on Vercel.</span>
          </div>
        </div>
      </section>

      {/* Floating Navigation & Settings */}
      <FloatingDock 
        isDark={isDark} 
        toggleTheme={() => setIsDark(!isDark)} 
        lang={lang} 
        setLang={setLang}
        activeSection={activeSection}
      />
      
    </div>
  );
}