import { motion } from 'motion/react';

export function GlowOrb() {
  // Lava lamp-style blob configurations
  const blobs = [
    {
      colors: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.1)', 'transparent'],
      size: { width: 800, height: 800 },
      initialPos: { x: '10%', y: '20%' },
      animation: {
        x: ['10%', '60%', '30%', '10%'],
        y: ['20%', '10%', '60%', '20%'],
        scale: [1, 1.3, 0.9, 1],
        rotate: [0, 90, 180, 360],
      },
      duration: 18,
      delay: 0,
      blur: 140,
    },
    {
      colors: ['rgba(168, 85, 247, 0.25)', 'rgba(168, 85, 247, 0.1)', 'transparent'],
      size: { width: 700, height: 700 },
      initialPos: { x: '70%', y: '30%' },
      animation: {
        x: ['70%', '20%', '50%', '70%'],
        y: ['30%', '70%', '20%', '30%'],
        scale: [1, 0.8, 1.4, 1],
        rotate: [0, -120, -240, -360],
      },
      duration: 22,
      delay: 2,
      blur: 120,
    },
    {
      colors: ['rgba(34, 211, 238, 0.2)', 'rgba(34, 211, 238, 0.1)', 'transparent'],
      size: { width: 600, height: 600 },
      initialPos: { x: '40%', y: '60%' },
      animation: {
        x: ['40%', '10%', '70%', '40%'],
        y: ['60%', '40%', '70%', '60%'],
        scale: [1, 1.2, 0.85, 1],
        rotate: [0, 60, 120, 360],
      },
      duration: 16,
      delay: 4,
      blur: 100,
    },
    {
      colors: ['rgba(251, 146, 60, 0.15)', 'rgba(251, 146, 60, 0.08)', 'transparent'],
      size: { width: 550, height: 550 },
      initialPos: { x: '25%', y: '80%' },
      animation: {
        x: ['25%', '65%', '15%', '25%'],
        y: ['80%', '25%', '50%', '80%'],
        scale: [1, 1.1, 1.3, 1],
        rotate: [0, -90, -180, -360],
      },
      duration: 20,
      delay: 6,
      blur: 110,
    },
    {
      colors: ['rgba(244, 114, 182, 0.12)', 'rgba(244, 114, 182, 0.06)', 'transparent'],
      size: { width: 500, height: 500 },
      initialPos: { x: '80%', y: '70%' },
      animation: {
        x: ['80%', '40%', '80%', '80%'],
        y: ['70%', '15%', '45%', '70%'],
        scale: [1, 0.9, 1.2, 1],
        rotate: [0, 45, 90, 360],
      },
      duration: 24,
      delay: 8,
      blur: 95,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          initial={{
            x: blob.initialPos.x,
            y: blob.initialPos.y,
            scale: 1,
            rotate: 0,
          }}
          animate={blob.animation}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95], // Custom cubic-bezier for organic movement
            delay: blob.delay,
          }}
          className="absolute"
          style={{
            width: `${blob.size.width}px`,
            height: `${blob.size.height}px`,
            mixBlendMode: 'screen',
          }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-80"
            style={{
              background: `radial-gradient(circle, ${blob.colors[0]} 0%, ${blob.colors[1]} 40%, ${blob.colors[2]} 70%)`,
              filter: `blur(${blob.blur}px)`,
            }}
          />
        </motion.div>
      ))}

      {/* Slow pulsing ambient overlay */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}