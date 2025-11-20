import { useState, useRef, useEffect } from 'react';
import { BentoCard } from '../components/BentoCard';
import { Navbar } from '../components/Navbar';
import { ProjectModal } from '../components/ProjectModal';
import { GridLines } from '../components/GridLines';
import { CustomCursor } from '../components/CustomCursor';
import { MagneticButton } from '../components/MagneticButton';
import { ArrowRight, MapPin, Send } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { navigate } from '../App';

// Featured projects for the Bento Grid - dynamic data structure ready for Firebase
const featuredProjects = [
  {
    id: 'blueicon-technologies',
    title: 'BLUEICON TECHNOLOGIES',
    label: 'VISUAL IDENTITY',
    category: 'Identity System',
    tech: 'Illustrator, Figma',
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwZGVzaWduJTIwc3lzdGVtfGVufDF8fHx8MTc2MzQ4MzY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    size: 'wide' as const,
    description: 'A comprehensive brand identity system for a technology hardware partner. Organizing complex technical specifications into a clean, authoritative visual language.',
    role: 'Lead Brand Architect',
    year: '2024',
    tags: ['Brand Identity', 'Identity System', 'Retail Collateral', 'Swiss-Style Grid'],
    audience: 'Corporate procurement officers, gamers, and value-conscious tech enthusiasts seeking high-performance hardware.',
    objective: 'To elevate the brand from a generic "hardware reseller" into a trusted "technology partner." The goal was to organize complex technical specs (RAM, SSD, CPU) into a visual language that feels clean, authoritative, and easy to scan.',
    decisions: 'We adopted a Swiss-Style Grid System to handle the data density. The color palette (Icon Blue & Deep Navy) signals corporate trust, while the Northlane typeface provides geometric rigidity, ensuring the brand feels engineered rather than decorated.',
    specs: {
      primaryColor: '#0077C8 (Icon Blue)',
      secondary: '#0A1E2F (Deep Navy)',
      typography: 'Northlane (Bold / Medium)',
      grid: '4-Column Modular Layout',
      output: '150gsm Gloss Art Paper',
    },
    gallery: [
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGd1aWRlfGVufDF8fHx8MTc2MzQ4MzY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMG1vY2t1cHxlbnwxfHx8fDE3NjM0ODM2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    id: 'scars-narrative',
    title: 'SCARS: NARRATIVE ARCHITECTURE',
    label: 'EDITORIAL & NARRATIVE',
    category: 'Book Design',
    tech: 'Adobe Creative Suite',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwZGVzaWduJTIwY292ZXJ8ZW58MXx8fHwxNzYzNTMxNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    size: 'tall' as const,
    description: 'Editorial design translating the non-linear journey of trauma and healing into a static visual format. A book cover and layout system representing fracture and repair.',
    role: 'Art Director & Illustrator',
    year: '2023',
    tags: ['Editorial Design', 'Book Cover', 'Illustration', 'Typography'],
    audience: 'Readers of contemporary literary fiction and memoirs; an audience sensitive to visual metaphors and emotional narrative structures.',
    objective: 'To translate the non-linear journey of trauma and healing into a static visual format. The challenge was to represent the concept of "Scars"—fracture and repair—without being gratuitous or overly literal.',
    decisions: 'The layout utilizes a "Disrupted Grid" where typography interacts directly with the figure study. The serif typeface (Playfair Display) interlocks with the illustration, creating a visual metaphor for how experiences become woven into identity. Earth tones were selected to evoke organic warmth.',
    specs: {
      typeface: 'Playfair Display (Serif)',
      palette: '#D9CAB3 (Beige) / #8B4513',
      composition: 'Center-Axis / Interlocking',
      style: 'Digital Illustration + Typography',
      mood: 'Melancholic / Resilient',
    },
    gallery: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGxheW91dHxlbnwxfHx8fDE3NjM0ODM2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBkZXNpZ258ZW58MXx8fHwxNzYzNDgzNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    id: 'portfolio-digital-system',
    title: 'PORTFOLIO DIGITAL SYSTEM',
    label: 'DIGITAL PLATFORM',
    category: 'Full-Stack Application',
    tech: 'React, TypeScript',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBsYXB0b3B8ZW58MXx8fHwxNzYzNTA5MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    size: 'wide' as const,
    description: 'This portfolio—a living dossier demonstrating full-stack capability from visual identity architecture to deployed infrastructure, built without relying on templates.',
    role: 'Full-Stack Architect',
    year: '2025',
    tags: ['Full-Stack', 'React', 'Design System', 'Motion Design'],
    audience: 'Global creative agencies, venture capital firms, and technical recruiters seeking hybrid talent who bridge the gap between design and engineering.',
    objective: 'To dismantle the boundary between "Designer" and "Developer." The goal was to build a living dossier that demonstrates full-stack capability—from visual identity architecture to deployed serverless infrastructure—without relying on templates.',
    decisions: 'We implemented a "Chameleon Context Engine" (Zustand + Framer Motion) that morphs the interface physics based on scroll position. The typography strictly separates Brand Voice (Inter ExtraBold) from System Data (JetBrains Mono) to reinforce the "Technologist" persona.',
    specs: {
      framework: 'Next.js 14 (App Router)',
      styling: 'Tailwind CSS + Framer Motion',
      backend: 'Firebase v9 (Firestore)',
      state: 'Zustand (Context Aware)',
      deployment: 'Vercel Edge Network',
    },
    gallery: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2MzQ4MzY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NjM0ODM2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    category: string;
    description: string;
    role: string;
    year: string;
    imageUrl: string;
    tags: string[];
    challenge?: string;
    solution?: string;
    specs?: {
      primaryColor: string;
      typography: string;
      grid: string;
      deliverables: string;
    };
    gallery?: string[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);
  const [distortCreative, setDistortCreative] = useState(false);
  const [distortBusiness, setDistortBusiness] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleProjectClick = (project: typeof featuredProjects[0]) => {
    const transformedProject = {
      title: project.title,
      category: project.category,
      description: project.description,
      role: project.role,
      year: project.year,
      imageUrl: project.image,
      tags: project.tags,
      audience: project.audience,
      objective: project.objective,
      decisions: project.decisions,
      challenge: project.challenge,
      solution: project.solution,
      specs: project.specs,
      gallery: project.gallery,
    };
    setSelectedProject(transformedProject);
    setIsModalOpen(true);
  };

  const handleNavigate = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLElement>> = {
      hero: heroRef,
      work: workRef,
      about: aboutRef,
      contact: contactRef,
    };

    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreWork = () => {
    workRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'work', ref: workRef },
        { id: 'about', ref: aboutRef },
        { id: 'contact', ref: contactRef },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Completely random glitch effect - faster and independent
    const triggerCreativeGlitch = () => {
      const randomDelay = Math.random() * 4000 + 2000; // Random delay between 2-6 seconds
      
      setTimeout(() => {
        setDistortCreative(true);
        setTimeout(() => setDistortCreative(false), 400); // Faster glitch duration
        triggerCreativeGlitch();
      }, randomDelay);
    };

    const triggerBusinessGlitch = () => {
      const randomDelay = Math.random() * 4000 + 2000; // Random delay between 2-6 seconds
      
      setTimeout(() => {
        setDistortBusiness(true);
        setTimeout(() => setDistortBusiness(false), 400); // Faster glitch duration
        triggerBusinessGlitch();
      }, randomDelay);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    handleScroll();
    triggerCreativeGlitch();
    triggerBusinessGlitch();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">
      {/* SVG Filters for RGB Glitch Effect */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="alphaRed">
            <feColorMatrix mode="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          </filter>
          <filter id="alphaGreen">
            <feColorMatrix mode="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          </filter>
          <filter id="alphaBlue">
            <feColorMatrix mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          </filter>
        </defs>
      </svg>

      {/* Custom Cursor - Desktop Only */}
      {!isMobile && <CustomCursor />}
      
      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Grid Lines */}
      <GridLines />
      
      {/* Lava Lamp Background - Global Subtle Ambient Effect */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[1]">
        {/* Orb 1 - Hot Pink/Magenta Blob (Left Side) */}
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
        
        {/* Orb 2 - Electric Cyan Blob (Center Left) */}
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
        
        {/* Orb 3 - Orange/Amber Blob (Center) */}
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
        
        {/* Orb 4 - Deep Purple Blob (Center Right) */}
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
        
        {/* Orb 5 - Lime Green Blob (Right Side) */}
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
        
        {/* Orb 6 - Yellow Blob (Far Right) */}
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

      {/* Desktop Navbar */}
      {!isMobile && (
        <Navbar 
          activeSection={activeSection} 
          onNavigate={handleNavigate}
        />
      )}

      {/* Mobile Navbar */}
      {isMobile && (
        <Navbar 
          activeSection={activeSection} 
          onNavigate={handleNavigate}
        />
      )}

      {/* === HERO SECTION === */}
      <motion.section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center px-6 pt-12 pb-36 md:pt-32 md:pb-20 overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          {/* Combined Name and Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <p className="font-mono text-white/60 mb-2 tracking-[0.2em]" style={{ fontSize: '0.75rem' }}>
              GLADMORE BVUTA
            </p>
            <p className="font-mono text-cyan-400 tracking-widest text-xs md:text-sm">
              {'>'} LEAD.BRAND.ARCHITECT
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 
              className="font-sans font-extrabold text-white tracking-tight leading-[0.9] mb-8"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 9rem)',
                textTransform: 'uppercase',
              }}
            >
              {/* CREATIVE with RGB Glitch */}
              <span 
                className="inline-block relative"
                style={{ position: 'relative' }}
              >
                {distortCreative ? (
                  <>
                    <span 
                      className="absolute top-0 left-0"
                      style={{ 
                        filter: 'url(#alphaRed)',
                        mixBlendMode: 'lighten',
                        animation: 'rgbGlitchRed 300ms linear infinite'
                      }}
                    >
                      CREATIVE
                    </span>
                    <span 
                      className="absolute top-0 left-0"
                      style={{ 
                        filter: 'url(#alphaGreen)',
                        mixBlendMode: 'lighten',
                        animation: 'rgbGlitchGreen 300ms linear infinite'
                      }}
                    >
                      CREATIVE
                    </span>
                    <span 
                      className="absolute top-0 left-0"
                      style={{ 
                        filter: 'url(#alphaBlue)',
                        mixBlendMode: 'lighten',
                        animation: 'rgbGlitchBlue 300ms linear infinite'
                      }}
                    >
                      CREATIVE
                    </span>
                    <span className="opacity-0">CREATIVE</span>
                  </>
                ) : (
                  'CREATIVE'
                )}
              </span>
              <br />
              BRANDING<br />
              {/* + BUSINESS with RGB Glitch */}
              <span 
                className="inline-block relative"
                style={{ position: 'relative' }}
              >
                {distortBusiness ? (
                  <>
                    <span 
                      className="absolute top-0 left-0"
                      style={{ 
                        filter: 'url(#alphaRed)',
                        mixBlendMode: 'lighten',
                        animation: 'rgbGlitchRed 300ms linear infinite'
                      }}
                    >
                      + BUSINESS
                    </span>
                    <span 
                      className="absolute top-0 left-0"
                      style={{ 
                        filter: 'url(#alphaGreen)',
                        mixBlendMode: 'lighten',
                        animation: 'rgbGlitchGreen 300ms linear infinite'
                      }}
                    >
                      + BUSINESS
                    </span>
                    <span 
                      className="absolute top-0 left-0"
                      style={{ 
                        filter: 'url(#alphaBlue)',
                        mixBlendMode: 'lighten',
                        animation: 'rgbGlitchBlue 300ms linear infinite'
                      }}
                    >
                      + BUSINESS
                    </span>
                    <span className="opacity-0">+ BUSINESS</span>
                  </>
                ) : (
                  '+ BUSINESS'
                )}
              </span>
              <br />
              TECHNOLOGY
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-sans text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              Merging creative vision, strategic branding, and modern web technology to build digital experiences that matter.
            </p>
          </motion.div>

          {/* Metadata Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-12 text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-white/60">Harare, Zimbabwe</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExploreWork}
            className="group bg-white/5 backdrop-blur-xl border border-white/8 hover:border-white/20 rounded-full px-10 py-5 flex items-center gap-3 mx-auto transition-all duration-500"
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.875rem' }}>
              EXPLORE THE WORK
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </motion.section>

      {/* === WORK SECTION === */}
      <section ref={workRef} className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-mono text-cyan-400/80 mb-4 tracking-widest text-xs">
              {'>'} SELECTED.WORK
            </p>
            <h2 className="font-sans font-extrabold text-white/90 tracking-tight" 
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', textTransform: 'uppercase' }}>
              FEATURED PROJECTS
            </h2>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Wide Card */}
            <BentoCard
              {...featuredProjects[0]}
              index={1}
              onClick={() => handleProjectClick(featuredProjects[0])}
            />

            {/* Card 2: Tall Vertical Card */}
            <BentoCard
              {...featuredProjects[1]}
              index={2}
              onClick={() => handleProjectClick(featuredProjects[1])}
            />

            {/* Card 3: Wide Card */}
            <BentoCard
              {...featuredProjects[2]}
              index={3}
              onClick={() => handleProjectClick(featuredProjects[2])}
            />
          </div>
        </div>
      </section>

      {/* === ABOUT SECTION === */}
      <section ref={aboutRef} className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-cyan-400/80 mb-6 tracking-widest text-xs">
                {'>'} ABOUT.ME
              </p>
              <h2 className="font-sans font-extrabold text-white mb-8 tracking-tight leading-[1.1]" 
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textTransform: 'uppercase' }}>
                THE SELF-TAUGHT<br />EDGE
              </h2>
              <div className="space-y-6">
                <p className="font-sans text-white/70 leading-relaxed">
                  I am <strong className="text-white/90">Gladmore Bvuta</strong>, a multidisciplinary Brand Architect with 6 years of experience fusing creative direction, business strategy, and cutting-edge web development.
                </p>
                <p className="font-sans text-white/70 leading-relaxed">
                  My journey is defined by self-directed learning and hands-on experimentation. From designing compelling brand systems to building responsive digital platforms, I bring a unique perspective that blends aesthetics with functionality.
                </p>
                <p className="font-sans text-white/70 leading-relaxed">
                  I believe the best solutions emerge when creative vision meets technical execution — and that's where I thrive.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Tech Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[inset_0_0_40px_rgba(34,211,238,0.05)] hover:border-cyan-400/30 transition-colors duration-500"
            >
              <div className="mb-6">
                <p className="text-cyan-400/80 tracking-[0.2em] mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                  {'>'} TECHNICAL.STACK
                </p>
              </div>

              {/* Tech Stack Display */}
              <div className="space-y-6">
                <div>
                  <p className="text-[#4ade80] mb-2 tracking-[0.15em]" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                    // 01 BRAND STRATEGY & DESIGN
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Market Research', 'Brand Identity Systems', 'Adobe Creative Cloud', 'Figma'].map((tech) => (
                      <span 
                        key={tech}
                        className="bg-white/5 border border-white/10 hover:border-cyan-400/30 rounded-lg px-4 py-2 text-white/80 transition-all duration-300"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[#60a5fa] mb-2 tracking-[0.15em]" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                    // 02 BUSINESS TECHNOLOGY
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Firebase Studio', 'React / TypeScript', 'Gemini CLI / MCP Servers'].map((tech) => (
                      <span 
                        key={tech}
                        className="bg-white/5 border border-white/10 hover:border-cyan-400/30 rounded-lg px-4 py-2 text-white/80 transition-all duration-300"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[#c084fc] mb-2 tracking-[0.15em]" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                    // 03 SYSTEM INTELLIGENCE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['AI Context Engineering', 'System Design', 'Generative Design'].map((tech) => (
                      <span 
                        key={tech}
                        className="bg-white/5 border border-white/10 hover:border-cyan-400/30 rounded-lg px-4 py-2 text-white/80 transition-all duration-300"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[#fbbf24] mb-2 tracking-[0.15em]" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                    // 04 STRATEGIC OPERATIONS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Project Management', 'Client Consultation', 'Agile Roadmap Planning'].map((tech) => (
                      <span 
                        key={tech}
                        className="bg-white/5 border border-white/10 hover:border-cyan-400/30 rounded-lg px-4 py-2 text-white/80 transition-all duration-300"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CONTACT SECTION === */}
      <section ref={contactRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Call to Action - Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            {/* Eyebrow */}
            <p 
              className="text-[#4ade80] mb-8 tracking-[0.2em]"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
            >
              {'>'} SYSTEM_STATUS: OPEN_FOR_COLLAB
            </p>

            {/* Headline */}
            <h2 
              className="font-sans font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', textTransform: 'uppercase' }}
            >
              READY TO BUILD<br />THE NEXT SYSTEM?
            </h2>

            {/* Sub-text */}
            <p className="font-sans text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed text-lg">
              Bridging the gap between creative vision and technical execution.
            </p>

            {/* Email - The Star */}
            <a
              href="mailto:hello@gladmore.me"
              className="group inline-block"
            >
              <span 
                className="text-white border-b-2 border-white/20 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all duration-300 pb-2"
                style={{ 
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  letterSpacing: '0.05em'
                }}
              >
                hello@gladmore.me{' '}
                <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </span>
            </a>
          </motion.div>

          {/* Data Strip - Bottom Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-12 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500">
              {/* Left: Copyright */}
              <p 
                className="tracking-wider"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
              >
                © 2025 GLADMORE BVUTA
              </p>

              {/* Center: Location */}
              <p 
                className="tracking-wider"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
              >
                HARARE, ZW [ {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })} ]
              </p>

              {/* Right: Social Links */}
              <div 
                className="flex gap-8"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
              >
                <a
                  href="https://linkedin.com/in/gladmorebvuta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-300 tracking-wider"
                >
                  [LINKEDIN]
                </a>
                <a
                  href="https://github.com/gladmorebvuta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-300 tracking-wider"
                >
                  [GITHUB]
                </a>
                <a
                  href="https://read.cv/gladmorebvuta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-300 tracking-wider"
                >
                  [READ.CV]
                </a>
                {/* Hidden Admin Link */}
                <a
                  href="/admin/upload"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/upload');
                  }}
                  className="hover:text-cyan-400 transition-colors duration-300 tracking-wider opacity-20 hover:opacity-100"
                >
                  [ADMIN]
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}