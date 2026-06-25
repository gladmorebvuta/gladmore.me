import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Mail, FileText } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [
    { icon: Home, label: 'Home', id: 'hero' },
    { icon: Briefcase, label: 'Work', id: 'work' },
    { icon: User, label: 'About', id: 'about' },
    { icon: FileText, label: 'Resume', id: 'resume' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-[51]" style={{ width: `${scrollProgress}%` }} />

      {/* Desktop Navbar - Top */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 20 }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 px-6 py-3"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 flex items-center justify-between">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => onNavigate('hero')}>
              <span
                className="uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '1rem' }}
              >
                GB
              </span>
            </div>

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.id
                      ? 'bg-white/20 text-white'
                      : 'hover:bg-white/10 text-white/60 hover:text-white'
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.8rem' }}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all duration-300"
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.8rem' }}>
                Get in Touch
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar - Bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
        className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full transition-all duration-300 group relative ${
                activeSection === item.id ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
            >
              <item.icon
                className={`w-5 h-5 transition-all duration-300 ${
                  activeSection === item.id ? 'text-white' : 'text-white/60 group-hover:text-white'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}