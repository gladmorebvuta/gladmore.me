import { Home, Briefcase, User, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingDockProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export function FloatingDock({ onNavigate, activeSection }: FloatingDockProps) {
  const navItems = [
    { icon: Home, label: 'Home', id: 'hero' },
    { icon: Briefcase, label: 'Work', id: 'work' },
    { icon: User, label: 'About', id: 'about' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', damping: 20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
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
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-1">
                <p className="text-xs whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {item.label}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
