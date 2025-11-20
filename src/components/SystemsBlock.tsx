export function SystemsBlock() {
  const skills = [
    'Figma',
    'React',
    'Brand Strategy',
    'Art Direction',
    'Design Systems',
    'Typography',
    'Motion Design',
    'Creative Direction'
  ];

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
      <div className="mb-8">
        <p className="text-white/40 mb-2 tracking-widest" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
          {'>'} SYSTEMS.CORE
        </p>
        <h2 className="uppercase tracking-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}>
          TECHNICAL STACK
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <p className="text-[#EDEDED]" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {`{${index + 1}}`}
            </p>
            <p className="text-[#EDEDED] mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {skill}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
