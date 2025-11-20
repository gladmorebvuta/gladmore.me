import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FlipClockHeadlineProps {
  lines: string[];
  className?: string;
}

export function FlipClockHeadline({ 
  lines,
  className = '' 
}: FlipClockHeadlineProps) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-<>[]{}|/\\';
  
  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="relative flex flex-wrap justify-center tracking-widest">
          {line.split('').map((targetChar, charIndex) => (
            <FlipCard
              key={`${lineIndex}-${charIndex}`}
              targetChar={targetChar}
              delay={lineIndex * 0.1 + charIndex * 0.02}
              chars={chars}
            />
          ))}
          <br />
        </div>
      ))}
    </div>
  );
}

interface FlipCardProps {
  targetChar: string;
  delay: number;
  chars: string;
}

function FlipCard({ targetChar, delay, chars }: FlipCardProps) {
  const [currentChar, setCurrentChar] = useState(chars[0]);
  const [isFlipping, setIsFlipping] = useState(false);
  const isSpace = targetChar === ' ';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Stop animation at 1.5 seconds - calculate max flips based on this
    const maxAnimationTime = 1500; // 1.5 seconds
    const flipInterval = 40; // ms between flips
    const startDelay = delay * 1000;
    const maxFlips = Math.floor((maxAnimationTime - startDelay) / flipInterval);
    
    let flipCount = 0;
    
    // Clear any existing timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Start flipping after delay
    timeoutRef.current = setTimeout(() => {
      setIsFlipping(true);
      
      intervalRef.current = setInterval(() => {
        flipCount++;
        
        if (flipCount >= maxFlips) {
          // FINAL: Set to target character and stop
          setCurrentChar(targetChar);
          setIsFlipping(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          // Flip to random character
          setCurrentChar(chars[Math.floor(Math.random() * chars.length)]);
        }
      }, flipInterval);
    }, startDelay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [targetChar, delay, chars]);

  if (isSpace) {
    return <span className="inline-block" style={{ width: '2rem' }} />;
  }

  return (
    <span 
      className="inline-block relative" 
      style={{ 
        width: 'auto',
        minWidth: '1ch',
        perspective: '1000px',
      }}
    >
      {/* Flipping Character */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentChar}
          className="flex items-center justify-center"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            color: '#FFFFFF',
            textShadow: isFlipping 
              ? '0 0 10px rgba(6, 182, 212, 0.3)' 
              : '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)',
          }}
          initial={{ 
            rotateX: -90,
            opacity: 0.3,
          }}
          animate={{ 
            rotateX: 0,
            opacity: 1,
          }}
          exit={{
            rotateX: 90,
            opacity: 0.3,
          }}
          transition={{
            duration: 0.1,
            ease: 'easeOut',
          }}
        >
          {currentChar}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}