import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface BentoCardProps {
  id: string;
  title: string;
  label?: string;
  category: string;
  tech?: string;
  image: string;
  size: 'wide' | 'tall';
  index: number;
  status?: string;
  liveUrl?: string;
  onClick: () => void;
}

export function BentoCard({
  title,
  label,
  category,
  tech,
  image,
  size,
  index,
  status,
  liveUrl,
  onClick
}: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    wide: 'md:col-span-2 h-[400px]',
    tall: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[824px]',
  };

  const formattedIndex = String(index).padStart(2, '0');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`${sizeClasses[size]} group relative cursor-pointer overflow-hidden rounded-2xl`}
    >
      {/* Background Image - Always visible, sharp and clear, with stable aspect ratio */}
      <div className="absolute inset-0 bg-white/5">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Glassmorphism Overlay - Slides down on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-500 flex flex-col items-center justify-center px-6"
        animate={{
          top: isHovered ? '60%' : '0%'
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 100
        }}
      >
        {/* Top Marker Triangle - only visible in default state */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/20 text-xs opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          ▼
        </div>

        {/* Text Content - Always centered within overlay */}
        <div className="flex flex-col items-center pointer-events-none z-10">
          {/* Label (if exists) */}
          {label && (
            <p className="font-mono text-cyan-400/80 tracking-widest uppercase text-[10px] mb-2">
              {label}
            </p>
          )}

          {/* Title */}
          <h3 
            className="font-sans font-extrabold uppercase text-white/90 text-center" 
            style={{ 
              fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)',
              letterSpacing: '0.2em',
              lineHeight: '1.3'
            }}
          >
            {title}
          </h3>

          {/* Tech Stack */}
          {tech && (
            <p className="font-mono text-white/50 tracking-wide text-[10px] mt-2">
              {tech}
            </p>
          )}

          {/* Project Number */}
          <div className="mt-3">
            <span className="font-mono text-cyan-400/80 text-xs">
              {formattedIndex}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Marker Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/20 group-hover:bg-cyan-400/40 transition-colors duration-500 pointer-events-none z-10" />

      {/* Hover Glow Effect - Premium sheen sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(34,211,238,0.2)]" />
        {/* Subtle sheen on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '-100%'
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* Live site link — opens the real domain in a new tab */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Visit ${title} live site`}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/15 hover:border-cyan-400/60 rounded-full text-white/80 hover:text-cyan-400 transition-colors duration-300"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px] tracking-wider uppercase">Live</span>
        </a>
      )}

      {/* Status Badge */}
      {status && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-cyan-400/50 rounded-full">
          <span className="font-mono text-cyan-400 text-xs tracking-wider uppercase">
            {status}
          </span>
        </div>
      )}

    </div>
  );
}