import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BentoCard } from '../components/BentoCard';
import { Navbar } from '../components/Navbar';
import { ProjectModal } from '../components/ProjectModal';
import { GridLines } from '../components/GridLines';
import { CustomCursor } from '../components/CustomCursor';
import { MagneticButton } from '../components/MagneticButton';
import { ArrowRight, MapPin, Send } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Define the type for a single project
interface Project {
  id: string;
  title: string;
  label: string;
  category: string;
  tech: string;
  image: string;
  size: 'wide' | 'tall';
  description: string;
  role: string;
  year: string;
  order: number;
  tags: string[];
  audience: string;
  objective: string;
  decisions: string;
  specs: { [key: string]: string };
  gallery: { thumbnail: string; full: string }[];
  challenge?: string;
  solution?: string;
  features?: string[];
  status?: string;
  liveUrl?: string;
}

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);
  const [glitch, setGlitch] = useState({ c: false, t: false });

  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(db, "projects");
      const q = query(projectsCollection, orderBy("order"));
      const snapshot = await getDocs(q);
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  // Periodic RGB-split glitch on the hero headline (skips reduced-motion).
  useEffect(() => {
    if (typeof window !== 'undefined' &&
        !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>, r1: ReturnType<typeof setTimeout>, r2: ReturnType<typeof setTimeout>;
    const loopC = () => {
      t1 = setTimeout(() => {
        setGlitch((g) => ({ ...g, c: true }));
        r1 = setTimeout(() => setGlitch((g) => ({ ...g, c: false })), 360);
        loopC();
      }, Math.random() * 4000 + 2500);
    };
    const loopT = () => {
      t2 = setTimeout(() => {
        setGlitch((g) => ({ ...g, t: true }));
        r2 = setTimeout(() => setGlitch((g) => ({ ...g, t: false })), 360);
        loopT();
      }, Math.random() * 4000 + 3500);
    };
    loopC();
    loopT();
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(r1); clearTimeout(r2); };
  }, []);

  const handleProjectClick = (project: Project) => {
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
      features: project.features,
      status: project.status,
      liveUrl: project.liveUrl,
    };
    setSelectedProject(transformedProject);
    setIsModalOpen(true);
  };

  const handleNavigate = (section: string) => {
    if (section === 'resume') {
      navigate('/resume');
      return;
    }
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

    // Initialize animations and event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    handleScroll();

    return () => {
      // Cleanup
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-clip relative pb-[5.5rem]">

      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="alphaRed"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
          <filter id="alphaGreen"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
          <filter id="alphaBlue"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" /></filter>
        </defs>
      </svg>

      {!isMobile && <CustomCursor />}
      
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      <GridLines />
      
      {/* Full-bleed ambient gradient field — anchored to every corner so colour
          reaches edge-to-edge instead of pooling in the centre. Static = cheap. */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(60% 75% at 0% 0%, rgba(236, 72, 153, 0.14), transparent 72%),
            radial-gradient(60% 75% at 100% 8%, rgba(6, 182, 212, 0.14), transparent 72%),
            radial-gradient(75% 80% at 100% 100%, rgba(124, 58, 237, 0.16), transparent 72%),
            radial-gradient(75% 80% at 0% 100%, rgba(16, 185, 129, 0.10), transparent 72%),
            radial-gradient(55% 55% at 50% 45%, rgba(59, 130, 246, 0.08), transparent 80%)
          `,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-[1] mix-blend-soft-light opacity-60"
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 40%, rgba(0,0,0,0.55) 100%)`,
        }}
      />

      {!isMobile && (
        <Navbar 
          activeSection={activeSection} 
          onNavigate={handleNavigate}
        />
      )}

      {isMobile && (
        <Navbar 
          activeSection={activeSection} 
          onNavigate={handleNavigate}
        />
      )}

      <main>
        <motion.section 
          ref={heroRef} 
          className="relative min-h-screen flex items-center justify-center px-6 pt-12 pb-36 md:pt-32 md:pb-20 overflow-hidden"
          style={{ opacity, scale }}
        >
          <div className="max-w-7xl mx-auto w-full text-center relative z-10">
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

            <h1
              className="font-sans font-extrabold text-white tracking-tight leading-[0.9] mb-8"
              style={{
                fontSize: 'clamp(3rem, 12vw, 9rem)',
                textTransform: 'uppercase',
              }}
            >
              <motion.span
                className="inline-block relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
              >
                {glitch.c ? (
                  <>
                    <span className="absolute top-0 left-0" style={{ filter: 'url(#alphaRed)', mixBlendMode: 'lighten', animation: 'rgbGlitchRed 300ms linear infinite' }}>CREATIVE</span>
                    <span className="absolute top-0 left-0" style={{ filter: 'url(#alphaGreen)', mixBlendMode: 'lighten', animation: 'rgbGlitchGreen 300ms linear infinite' }}>CREATIVE</span>
                    <span className="absolute top-0 left-0" style={{ filter: 'url(#alphaBlue)', mixBlendMode: 'lighten', animation: 'rgbGlitchBlue 300ms linear infinite' }}>CREATIVE</span>
                    <span className="opacity-0">CREATIVE</span>
                  </>
                ) : 'CREATIVE'}
              </motion.span>
              <br />
              <motion.span
                className="inline-block relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              >
                {glitch.t ? (
                  <>
                    <span className="absolute top-0 left-0" style={{ filter: 'url(#alphaRed)', mixBlendMode: 'lighten', animation: 'rgbGlitchRed 300ms linear infinite' }}>TECHNOLOGIST</span>
                    <span className="absolute top-0 left-0" style={{ filter: 'url(#alphaGreen)', mixBlendMode: 'lighten', animation: 'rgbGlitchGreen 300ms linear infinite' }}>TECHNOLOGIST</span>
                    <span className="absolute top-0 left-0" style={{ filter: 'url(#alphaBlue)', mixBlendMode: 'lighten', animation: 'rgbGlitchBlue 300ms linear infinite' }}>TECHNOLOGIST</span>
                    <span className="opacity-0">TECHNOLOGIST</span>
                  </>
                ) : 'TECHNOLOGIST'}
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-sans text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                Merging creative vision, strategic branding, and modern web technology to build digital experiences that matter.
              </p>
            </motion.div>

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

        <section ref={workRef} className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto relative z-10">
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
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 60, scale: 0.94, rotateX: 8 },
                    show: {
                      opacity: 1, y: 0, scale: 1, rotateX: 0,
                      transition: { type: 'spring', stiffness: 90, damping: 16 },
                    },
                  }}
                  style={{ transformPerspective: 1000 }}
                  className={project.size === 'tall' ? 'md:row-span-2' : 'md:col-span-2'}
                >
                  <BentoCard
                    {...project}
                    index={index + 1}
                    onClick={() => handleProjectClick(project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section ref={aboutRef} className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                    I am <strong className="text-white/90">Gladmore Bvuta</strong>, a Creative Technologist with 6 years of experience fusing brand strategy, product design, and full-stack engineering — the rare hybrid who can both <span className="text-white/90">design the identity</span> and <span className="text-white/90">ship the software</span>.
                  </p>
                  <p className="font-sans text-white/70 leading-relaxed">
                    As founder of <strong className="text-white/90">Brandapt</strong>, a hybrid venture studio, I design and ship production products end-to-end — from brand systems and UX to deployed infrastructure. I've taken four real ventures live across Africa and beyond: <span className="text-white/90">Zoranta</span>, <span className="text-white/90">Luminery</span>, <span className="text-white/90">Brandapt OS</span>, and <span className="text-white/90">Pamhepo</span> (in closed beta).
                  </p>
                  <p className="font-sans text-white/70 leading-relaxed">
                    My edge is being <strong className="text-white/90">AI-native</strong>: I build with Claude Code, multi-agent orchestration, and MCP — compressing what used to take a team into work I can architect, ship, and maintain solo, on React, TypeScript, and Firebase.
                  </p>
                  <p className="font-sans text-white/70 leading-relaxed">
                    Self-directed from day one, I believe the best products emerge where creative vision meets technical execution — and that's exactly where I operate.
                  </p>
                </div>
              </motion.div>

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
                      // 02 AI-NATIVE ENGINEERING
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Claude Code', 'Multi-Agent Orchestration', 'MCP Servers', 'Gemini CLI', 'React / TypeScript', 'Firebase'].map((tech) => (
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
                      {['AI Context Engineering', 'Agentic Workflows', 'Prompt & Pipeline Design', 'System Design'].map((tech) => (
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
                      {['Venture Building', 'Project Management', 'Client Consultation', 'Agile Roadmap Planning'].map((tech) => (
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

        <section ref={contactRef} className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <p 
                className="text-[#4ade80] mb-8 tracking-[0.2em]"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
              >
                {'>'} SYSTEM_STATUS: OPEN_FOR_COLLAB
              </p>

              <h2 
                className="font-sans font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', textTransform: 'uppercase' }}
              >
                READY TO BUILD<br />THE NEXT SYSTEM?
              </h2>

              <p className="font-sans text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed text-lg">
                Bridging the gap between creative vision and technical execution.
              </p>

              <a
                href="mailto:gladmorebvuta@gmail.com"
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
                  gladmorebvuta@gmail.com{' '}
                  <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-12 border-t border-white/10"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500">
                <p
                  className="tracking-wider"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                >
                  © {new Date().getFullYear()} GLADMORE BVUTA
                </p>

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

                <div 
                  className="flex gap-8"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                >
                  <a
                    href="https://www.linkedin.com/in/gladmore-bvuta-58ba7516b/"
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
                    href="https://x.com/gladmorebvuta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors duration-300 tracking-wider"
                  >
                    [X]
                  </a>
                  <a
                    href="/resume"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/resume');
                    }}
                    className="hover:text-cyan-400 transition-colors duration-300 tracking-wider"
                  >
                    [RESUME]
                  </a>
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

        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      </main>
    </div>
  );
}