export function GridLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2]">
      {/* Main container grid - matches max-w-7xl container */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6">
        {/* 3-column grid for work section alignment */}
        <div className="h-full grid grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent"
              style={{
                gridColumn: i === 0 ? 1 : i === 3 ? 4 : i + 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Section dividers - align with major page sections */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-[100vh] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* Additional horizontal lines for sections */}
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" style={{ top: 'calc(100vh + 40vh)' }} />
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" style={{ top: 'calc(100vh + 80vh)' }} />

      {/* Corner markers - more visible */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/[0.15]" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-white/[0.15]" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/[0.15]" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/[0.15]" />
    </div>
  );
}