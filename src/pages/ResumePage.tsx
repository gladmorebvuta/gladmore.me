import { ArrowLeft, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { navigate } from '../App';
import { Resume } from '../components/Resume';
import { GlowOrb } from '../components/GlowOrb';
import { GridLines } from '../components/GridLines';

export function ResumePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Lava Lamp Background */}
      <GlowOrb />
      
      {/* Architectural Grid Lines */}
      <GridLines />

      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[1]">
        <motion.div
          className="absolute w-[400px] h-[600px] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, rgba(219, 39, 119, 0.04) 50%, transparent 100%)',
            left: '10%',
          }}
          animate={{
            y: [-150, 200, -100, -150],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute w-[450px] h-[650px] rounded-full blur-[85px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(8, 145, 178, 0.05) 50%, transparent 100%)',
            left: '25%',
          }}
          animate={{
            y: [100, -200, 150, 100],
            scale: [1.2, 0.9, 1.3, 1.2],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute w-[420px] h-[620px] rounded-full blur-[82px]"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.05) 0%, rgba(249, 115, 22, 0.03) 50%, transparent 100%)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          animate={{
            y: [-100, 180, -120, -100],
            scale: [1.1, 0.85, 1.4, 1.1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute w-[480px] h-[680px] rounded-full blur-[90px]"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, rgba(109, 40, 217, 0.04) 50%, transparent 100%)',
            right: '25%',
          }}
          animate={{
            y: [150, -150, 200, 150],
            scale: [0.9, 1.5, 1, 0.9],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute w-[380px] h-[580px] rounded-full blur-[78px]"
          style={{
            background: 'radial-gradient(circle, rgba(132, 204, 22, 0.06) 0%, rgba(101, 163, 13, 0.04) 50%, transparent 100%)',
            right: '10%',
          }}
          animate={{
            y: [80, -180, 160, 80],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute w-[350px] h-[550px] rounded-full blur-[75px]"
          style={{
            background: 'radial-gradient(circle, rgba(250, 204, 21, 0.05) 0%, rgba(234, 179, 8, 0.03) 50%, transparent 100%)',
            right: '5%',
          }}
          animate={{
            y: [-120, 150, -80, -120],
            scale: [1.1, 0.9, 1.2, 1.1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      {/* Action Bar - Hidden on Print */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 print:hidden no-print">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-mono text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 font-mono text-sm px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 rounded text-cyan-400 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD / PRINT</span>
          </button>
        </div>
      </div>

      {/* Resume Component */}
      <div className="pt-20 print:pt-0 print-container">
        <Resume />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          .print-container {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
          }

          .no-print {
            display: none !important;
          }

          body > *:not(.print-container) {
            display: none;
          }

          .print-container > * {
            display: block;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}