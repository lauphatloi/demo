/**
 * FloatingActions.tsx
 *
 * GSAP Animation 10 — Continuous Pulse:
 *   Each FAB has a ring that scales out and fades — creating a subtle heartbeat
 *   pulsing glow that keeps the buttons noticeable without being distracting.
 *
 *   Buttons: Zalo (blue brand color) + Book Now (gold).
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageCircle, CalendarCheck } from 'lucide-react';

export default function FloatingActions() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // GSAP Animation 10: Staggered pulse rings
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl.fromTo(
      '.fab-ring',
      { scale: 1, opacity: 0.6 },
      {
        scale: 1.65,
        opacity: 0,
        duration: 1.6,
        stagger: 0.4,
        ease: 'power2.out',
      }
    );

    // Entrance animation for the FABs themselves
    gsap.fromTo(
      '.fab-button',
      { scale: 0, opacity: 0, x: 60 },
      {
        scale: 1,
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.7)',
        delay: 1.5,
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-5 md:right-8 z-[200] flex flex-col items-end gap-4"
    >

      {/* ── Zalo Button ── */}
      <div className="relative fab-button">
        {/* Pulse ring */}
        <div className="fab-ring absolute inset-0 bg-[#0068FF] rounded-full pointer-events-none" />

        <a
          href="https://zalo.me/0901234567"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on Zalo"
          className="relative flex w-12 h-12 md:w-14 md:h-14 bg-[#0068FF] rounded-full items-center justify-center text-white shadow-[0_8px_30px_rgba(0,104,255,0.4)] hover:scale-110 transition-transform duration-300 group"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.8} />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-[#0068FF] text-white font-sans text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            Zalo Chat
          </span>
        </a>
      </div>

      {/* ── Book Now Button ── */}
      <div className="relative fab-button">
        {/* Pulse ring */}
        <div className="fab-ring absolute inset-0 bg-[#D4AF37] rounded-full pointer-events-none" />

        <button
          onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Book Now"
          className="relative flex w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#D4AF37] to-[#AA7700] rounded-full items-center justify-center text-black shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform duration-300 group"
        >
          <CalendarCheck className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.8} />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-[#D4AF37] text-black font-sans font-semibold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            Đặt lịch
          </span>
        </button>
      </div>

    </div>
  );
}
