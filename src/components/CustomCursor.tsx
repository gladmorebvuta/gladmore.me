import { useEffect, useRef } from 'react';
import { useIsMobile } from '../components/ui/use-mobile';

export function CustomCursor() {
  const isMobile = useIsMobile();

  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cursorPosition = useRef({ x: 0, y: 0 });
  const circlePosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer');

      isHovering.current = isInteractive;
    };

    const animate = () => {
      // Move dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorPosition.current.x - 4}px, ${cursorPosition.current.y - 4}px) scale(${isHovering.current ? 1.5 : 1})`;
      }

      // Move circle
      const dx = cursorPosition.current.x - circlePosition.current.x;
      const dy = cursorPosition.current.y - circlePosition.current.y;
      circlePosition.current.x += dx * 0.15;
      circlePosition.current.y += dy * 0.15;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circlePosition.current.x - 20}px, ${circlePosition.current.y - 20}px) scale(${isHovering.current ? 1.5 : 1})`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={circleRef}
        className="fixed pointer-events-none z-[1000] transition-transform duration-200"
      >
        <div className="w-10 h-10 border-2 border-white/40 rounded-full" />
      </div>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[1001] transition-transform duration-100"
      >
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      </div>
    </>
  );
}
