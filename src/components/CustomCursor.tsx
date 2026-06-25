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

    const animate = () => {
      // Dot tracks the pointer 1:1 (instant, responsive)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorPosition.current.x - 4}px, ${cursorPosition.current.y - 4}px) scale(${isHovering.current ? 1.5 : 1})`;
      }

      // Ring follows with a tight trail
      const dx = cursorPosition.current.x - circlePosition.current.x;
      const dy = cursorPosition.current.y - circlePosition.current.y;
      circlePosition.current.x += dx * 0.35;
      circlePosition.current.y += dy * 0.35;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circlePosition.current.x - 20}px, ${circlePosition.current.y - 20}px) scale(${isHovering.current ? 1.5 : 1})`;
      }

      // Keep animating only until the ring has caught up; then sleep.
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    const wake = () => {
      if (animationFrameRef.current == null) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      isHovering.current =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer');

      wake(); // resume the loop on movement
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isMobile]);

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
        className="fixed top-0 left-0 pointer-events-none z-[1000] will-change-transform"
      >
        <div className="w-10 h-10 border-2 border-white/40 rounded-full" />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[1001] will-change-transform"
      >
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      </div>
    </>
  );
}
