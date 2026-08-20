/**
 * CustomCursor.tsx
 * A custom gold cursor with a follower ring — desktop only.
 * Styled to match the luxury brand aesthetic.
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef      = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only render on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot      = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    // quickTo for maximum performance
    const xDot = gsap.quickTo(dot,      'x', { duration: 0.08, ease: 'power3' });
    const yDot = gsap.quickTo(dot,      'y', { duration: 0.08, ease: 'power3' });
    const xFol = gsap.quickTo(follower, 'x', { duration: 0.5,  ease: 'power3' });
    const yFol = gsap.quickTo(follower, 'y', { duration: 0.5,  ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX); yDot(e.clientY);
      xFol(e.clientX); yFol(e.clientY);
    };

    // Scale up on interactive elements
    const onEnter = () => {
      gsap.to(dot,      { scale: 2.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(follower, { scale: 1.8, opacity: 0.15, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(dot,      { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);

    // Attach hover to interactive elements after a tick (let DOM settle)
    const timer = setTimeout(() => {
      document.querySelectorAll('a, button, [role="button"], .shiny-hover').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    }, 500);

    return () => {
      window.removeEventListener('mousemove', onMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[#D4AF37] opacity-30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
