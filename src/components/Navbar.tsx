/**
 * Navbar.tsx
 *
 * GSAP Animation 1 — Header Load:
 *   Logo, nav links, and CTA button stagger slide-down on initial page load.
 *
 * Scroll behaviour:
 *   Transitions from transparent to a frosted-glass black/gold on scroll.
 */

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';

const NAV_LINKS = [
  { label: 'Giới Thiệu', href: '#about'    },
  { label: 'Dịch Vụ',    href: '#services' },
  { label: 'Đào Tạo',    href: '#academy'  },
  { label: 'Đánh Giá',   href: '#feedback' },
  { label: 'Cẩm Nang',   href: '#news'     },
];

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null);
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP Animation 1: stagger slide-down on load
  useGSAP(() => {
    const items = navRef.current?.querySelectorAll('.nav-item');
    if (!items) return;

    gsap.fromTo(
      items,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, { scope: navRef });

  // Smooth scroll to section
  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out
          py-4 px-5 md:px-12
          ${scrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/25 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* ── Logo ── */}
          <div className="nav-item flex items-center gap-3.5 cursor-pointer" onClick={() => scrollTo('#home')}>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shiny-hover flex-shrink-0 shadow-lg">
              <img
                src={getAssetUrl('logo.jpg')}
                alt="L'THANH Eyelash Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAssetUrl('logo.svg');
                }}
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-white text-base font-bold tracking-wider leading-tight">
                L'Thanh
              </p>
              <p className="font-sans text-[#D4AF37] text-[9px] tracking-[0.25em] uppercase font-medium">
                Eyelash &amp; Beauty
              </p>
            </div>
          </div>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="nav-item font-sans text-xs text-zinc-300 hover:text-[#FFDF73] tracking-[0.15em] uppercase transition-colors duration-300 relative group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* ── Right: CTA ── */}
          <div className="nav-item flex items-center gap-4">
            <button
              onClick={() => scrollTo('#booking')}
              className="btn-shimmer shiny-hover bg-gradient-to-r from-[#D4AF37] to-[#AA7700] text-black font-sans font-semibold text-xs py-2.5 px-6 rounded-full uppercase tracking-widest cursor-pointer"
            >
              Đặt Lịch Ngay
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} className="text-[#D4AF37]" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 px-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-serif text-2xl text-white hover:text-[#D4AF37] tracking-wider uppercase transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#booking')}
            className="btn-shimmer shiny-hover mt-6 bg-gradient-to-r from-[#D4AF37] to-[#AA7700] text-black font-sans font-semibold text-sm py-4 px-12 rounded-full uppercase tracking-widest cursor-pointer"
          >
            Đặt Lịch Ngay
          </button>
        </div>
      )}
    </>
  );
}
