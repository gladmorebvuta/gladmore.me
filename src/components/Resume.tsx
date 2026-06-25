import { GlowOrb } from './GlowOrb';
import { GridLines } from './GridLines';

export function Resume() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative">
      {/* Lava Lamp Background */}
      <GlowOrb />
      
      {/* Architectural Grid Lines */}
      <GridLines />

      {/* A4 Container - 595 x 842px */}
      <div 
        className="relative bg-black backdrop-blur-xl border border-white/10 shadow-2xl z-10"
        style={{ 
          width: '595px', 
          height: '842px',
          padding: '40px'
        }}
      >
        {/* Subtle Inner Grid Lines */}
        <div className="absolute inset-0 opacity-[0.005] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          
          {/* HEADER SECTION */}
          <div className="mb-6 pb-6 border-b border-white/10">
            {/* Name - Massive Text */}
            <h1 className="font-sans font-black text-white tracking-tight mb-2" style={{ fontSize: '32px', lineHeight: '1.1' }}>
              GLADMORE TINASHE BVUTA
            </h1>
            
            {/* Title */}
            <p className="font-mono text-green-400 tracking-wider mb-4" style={{ fontSize: '11px' }}>
              CREATIVE TECHNOLOGIST // BRAND + BUSINESS TECHNOLOGY
            </p>
            
            {/* Contact Strip */}
            <div className="font-mono text-white/60 mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>
              +263 774 433 871  //  gladmorebvuta@gmail.com  //  www.gladmore.me
            </div>
            
            {/* Socials */}
            <div className="font-mono text-white/40" style={{ fontSize: '8px', letterSpacing: '0.5px' }}>
              linkedin.com/in/gladmore-bvuta-58ba7516b  //  github.com/gladmorebvuta  //  x.com/gladmorebvuta
            </div>
          </div>

          {/* SECTION 1: PROFESSIONAL SUMMARY */}
          <div className="mb-6 pb-6 border-b border-white/10">
            <h2 className="font-mono text-green-400 tracking-widest mb-3" style={{ fontSize: '10px' }}>
              // 01. SYSTEM OVERVIEW
            </h2>
            <p className="font-sans text-white leading-relaxed" style={{ fontSize: '10px', lineHeight: '1.6' }}>
              A Creative Technologist who bridges visual identity and shipping software. I pair a decade of brand and product design with AI-native engineering—building and deploying full production systems on React, TypeScript and Firebase, orchestrated with Claude Code, multi-agent workflows and MCP. My philosophy of 'Intelligent Construction' fuses brand narrative, user experience and deployed infrastructure into one cohesive whole.
            </p>
          </div>

          {/* SECTION 2: EXPERIENCE */}
          <div className="mb-6 pb-6 border-b border-white/10">
            <h2 className="font-mono text-green-400 tracking-widest mb-4" style={{ fontSize: '10px' }}>
              // 02. EXECUTION LOG
            </h2>
            
            {/* Job Entry — Venture Studio */}
            <div className="mb-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-sans font-extrabold text-white tracking-tight mb-1" style={{ fontSize: '12px' }}>
                    Founder & Creative Technologist — Brandapt (Venture Studio)
                  </h3>
                  <p className="font-mono text-white/40" style={{ fontSize: '8px' }}>
                    ROLE: FULL-STACK ARCHITECT // AI-NATIVE PRODUCT BUILDER
                  </p>
                </div>
                <div className="font-mono text-cyan-400" style={{ fontSize: '9px' }}>
                  2024 – PRESENT
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="font-mono text-cyan-400 flex-shrink-0" style={{ fontSize: '10px' }}>›</span>
                  <p className="font-sans text-white" style={{ fontSize: '9px', lineHeight: '1.5' }}>
                    Designed, built and deployed a portfolio of production ventures end-to-end — Brandapt OS, Zoranta, Luminery and Pamhepo (closed beta) — on React, TypeScript and Firebase.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-cyan-400 flex-shrink-0" style={{ fontSize: '10px' }}>›</span>
                  <p className="font-sans text-white" style={{ fontSize: '9px', lineHeight: '1.5' }}>
                    Engineered AI-native workflows with Claude Code, multi-agent orchestration and MCP servers to ship faster as a solo operator.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-cyan-400 flex-shrink-0" style={{ fontSize: '10px' }}>›</span>
                  <p className="font-sans text-white" style={{ fontSize: '9px', lineHeight: '1.5' }}>
                    Owned the full stack: brand systems, UX, Firestore data + security rules, and CI/hosting.
                  </p>
                </div>
              </div>
            </div>

            {/* Job Entry — Consultancy */}
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-sans font-extrabold text-white tracking-tight mb-1" style={{ fontSize: '12px' }}>
                    Independent Brand & Product Design Consultant
                  </h3>
                  <p className="font-mono text-white/40" style={{ fontSize: '8px' }}>
                    ROLE: LEAD ARCHITECT // CLIENT: INTERNATIONAL PORTFOLIO
                  </p>
                </div>
                <div className="font-mono text-cyan-400" style={{ fontSize: '9px' }}>
                  2019 – PRESENT
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="font-mono text-cyan-400 flex-shrink-0" style={{ fontSize: '10px' }}>›</span>
                  <p className="font-sans text-white" style={{ fontSize: '9px', lineHeight: '1.5' }}>
                    Lead designer and strategist for international clients (Dubai, SA, Kenya, Japan, Zimbabwe).
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-cyan-400 flex-shrink-0" style={{ fontSize: '10px' }}>›</span>
                  <p className="font-sans text-white" style={{ fontSize: '9px', lineHeight: '1.5' }}>
                    Architected complete brand systems (logo, type, guidelines) and premium UI/UX for web apps.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-cyan-400 flex-shrink-0" style={{ fontSize: '10px' }}>›</span>
                  <p className="font-sans text-white" style={{ fontSize: '9px', lineHeight: '1.5' }}>
                    Managed entire project lifecycles from consultation to final delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: SKILLS GRID */}
          <div className="flex-1">
            <h2 className="font-mono text-green-400 tracking-widest mb-4" style={{ fontSize: '10px' }}>
              // 03. ARCHITECTURE SPECS
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Category A: Design & Strategy */}
              <div className="bg-white/5 border border-white/10 rounded p-3 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300">
                <h3 className="font-mono text-white/80 tracking-wider mb-2" style={{ fontSize: '8px' }}>
                  DESIGN & STRATEGY
                </h3>
                <div className="space-y-1">
                  {['Brand Strategy', 'Art Direction', 'UI/UX · Design Systems', 'Figma', 'Adobe Suite'].map((skill) => (
                    <div key={skill} className="flex items-center gap-1">
                      <span className="text-cyan-400" style={{ fontSize: '8px' }}>{'>'}</span>
                      <span className="font-sans text-white" style={{ fontSize: '8px' }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category B: Technical */}
              <div className="bg-white/5 border border-white/10 rounded p-3 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300">
                <h3 className="font-mono text-white/80 tracking-wider mb-2" style={{ fontSize: '8px' }}>
                  AI-NATIVE ENGINEERING
                </h3>
                <div className="space-y-1">
                  {['React / TypeScript', 'Firebase', 'Claude Code', 'Multi-Agent / MCP', 'Gemini CLI'].map((skill) => (
                    <div key={skill} className="flex items-center gap-1">
                      <span className="text-green-400" style={{ fontSize: '8px' }}>{'>'}</span>
                      <span className="font-sans text-white" style={{ fontSize: '8px' }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category C: Professional */}
              <div className="bg-white/5 border border-white/10 rounded p-3 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300">
                <h3 className="font-mono text-white/80 tracking-wider mb-2" style={{ fontSize: '8px' }}>
                  PROFESSIONAL
                </h3>
                <div className="space-y-1">
                  {['Project Management', 'International Collaboration', 'Strategic Planning', 'Client Relations', 'Team Leadership'].map((skill) => (
                    <div key={skill} className="flex items-center gap-1">
                      <span className="text-blue-400" style={{ fontSize: '8px' }}>{'>'}</span>
                      <span className="font-sans text-white" style={{ fontSize: '8px' }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex justify-center">
              <div className="border border-white/10 rounded px-6 py-2 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300">
                <p className="font-mono text-cyan-400 tracking-widest text-center" style={{ fontSize: '9px' }}>
                  VIEW FULL CASE STUDIES AT WWW.GLADMORE.ME
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}