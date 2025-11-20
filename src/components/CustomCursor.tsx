import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Dot follows cursor immediately
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Check for hover state
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer');

      setIsHovering(isInteractive);
    };

    // Smooth animation for circle following the dot
    const animate = () => {
      setCirclePosition((prev) => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.15,
        y: prev.y + (cursorPosition.y - prev.y) * 0.15,
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPosition.x, cursorPosition.y]);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Circle - follows with delay, centered on the dot */}
      <div
        className="fixed pointer-events-none z-[1000] hidden md:block transition-transform duration-200"
        style={{
          left: `${circlePosition.x}px`,
          top: `${circlePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div className="w-10 h-10 border-2 border-white/40 rounded-full" />
      </div>

      {/* Dot - follows cursor instantly */}
      <div
        className="fixed pointer-events-none z-[1001] hidden md:block transition-transform duration-100"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      </div>
    </>
  );
}
