/**
 * Hero.tsx
 *
 * GSAP Animation 2 — Hero Pin & Zoom-Out Parallax:
 *   - Pins the hero section while scrolling begins.
 *   - The background image scales smoothly from 1.18 -> 1.0 (zoom out).
 *   - The hero container rounds and shrinks slightly.
 *   - The Vietnamese headline/CTA translates up & fades before unpinning.
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';

export default function Hero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const chevronRef  = useRef<HTMLDivElement>(null);

  // Chevron float animation
  useEffect(() => {
    if (!chevronRef.current) return;
    gsap.to(chevronRef.current, {
      y: 10,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  // Headline entrance on load
  useGSAP(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.8,
      }
    );
  }, { scope: sectionRef });

  // GSAP Animation 2: Pin + Zoom Out Parallax
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('all', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Background image zooms OUT as we scroll with clean brightness
      tl.fromTo(
        bgRef.current,
        { scale: 1.15, filter: 'brightness(0.85)' },
        { scale: 1.0,  filter: 'brightness(0.70)', ease: 'none' },
        0
      );

      // Inner card shrinks + rounds
      tl.to(
        innerRef.current,
        { scale: 0.94, borderRadius: '24px', ease: 'none' },
        0
      );

      // Content fades and moves up
      tl.to(
        contentRef.current,
        { y: -80, opacity: 0, ease: 'power2.in' },
        0.2
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const scrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full bg-black"
      style={{ overflow: 'hidden' }}
    >
      {/* Inner wrapper */}
      <div
        ref={innerRef}
        className="relative w-full h-full overflow-hidden transform-gpu"
        style={{ transformOrigin: 'center center' }}
      >
        {/* ── Background Image (User uploaded banner) ── */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          <img
            src={getAssetUrl('banner.png')}
            alt="L'THANH Luxury Eyelash Banner"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getAssetUrl('3b662d0e-e3bc-4ad8-aa35-7117acb4db94.png');
            }}
          />
        </div>

        {/* Subtle dark gradient overlay for text legibility while keeping banner clear */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/75" />
        <div className="absolute inset-0 z-[1] bg-black/20" />

        {/* ── Decorative golden vertical lines ── */}
        <div className="absolute top-1/4 left-8 md:left-20 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent z-[2]" />
        <div className="absolute top-1/4 right-8 md:right-20 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent z-[2]" />

        {/* ── Hero Content ── */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-5 max-w-5xl mx-auto left-0 right-0"
        >
          {/* Pre-headline badge */}
          <div className="mb-6">
            <span className="inline-block font-sans text-[#D4AF37] text-[10px] md:text-xs tracking-[0.35em] uppercase border border-[#D4AF37]/40 px-5 py-2 rounded-full backdrop-blur-sm bg-black/30">
              Est. 2016 — L'THANH EYELASH &amp; BEAUTY
            </span>
          </div>

          {/* Main Vietnamese headline with Playfair Display */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.12] mb-6 tracking-normal">
            Nâng tầm nét đẹp{' '}
            <span className="block italic text-gradient-gold mt-1 font-serif">
              đôi mắt
            </span>
          </h1>

          {/* Sub-headline in Vietnamese */}
          <p className="font-sans text-zinc-300 text-sm md:text-lg font-light max-w-2xl mb-10 leading-relaxed">
            Chúng tôi tôn vinh vẻ đẹp tự nhiên của bạn qua nghệ thuật nối mi
            cao cấp — nơi sự tinh tế, độ bền và tay nghề chuẩn 5 sao hội tụ.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-shimmer shiny-hover bg-gradient-to-r from-[#D4AF37] to-[#AA7700] text-black font-sans font-semibold text-xs py-4 px-10 rounded-full uppercase tracking-widest cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Đặt lịch hẹn ngay
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="shiny-hover border border-[#D4AF37]/80 text-[#FFDF73] font-sans font-medium text-xs py-4 px-10 rounded-full uppercase tracking-widest transition-all duration-300 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] backdrop-blur-sm cursor-pointer"
            >
              Khám phá dịch vụ
            </button>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        ref={chevronRef}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] cursor-pointer flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="font-sans text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase mb-1">
          Cuộn xuống
        </span>
        <ChevronDown className="text-[#D4AF37] w-5 h-5" />
      </div>
    </section>
  );
}
