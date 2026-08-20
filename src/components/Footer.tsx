/**
 * Footer.tsx
 *
 * GSAP Animation 11 — Footer Uncover:
 *   The footer has a fixed position with z-index: -1, sitting below the main
 *   content. As the user scrolls to the very end of the page, the main
 *   section's margin-bottom creates the visual that the footer is being
 *   "uncovered" — like lifting a card off a table.
 *
 *   No GSAP ScrollTrigger is needed for the layout uncover; it is achieved purely
 *   through CSS stacking (fixed + lower z-index + margin-bottom on main).
 *   GSAP is used for a content fade-up inside the footer as it becomes visible.
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Animation 11: Animate footer content as it becomes uncovered
      gsap.fromTo(
        '.footer-col',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'bottom-=200 bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    /*
     * fixed + bottom-0 + z-[-1]:
     *   Places the footer behind all other content.
     *   The main section's margin-bottom in App.tsx reveals the footer at page-end.
     */
    <footer
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full bg-[#000000] border-t border-white/[0.06]"
      style={{ zIndex: -1 }}
    >
      {/* ── Golden top accent line ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* ── Brand Column ── */}
          <div className="footer-col col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 flex-shrink-0">
                <img
                  src="/logo.jpg"
                  alt="L'THANH Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.svg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-serif text-white text-lg font-semibold leading-tight">
                  L'Thanh
                </h3>
                <p className="font-sans text-[#D4AF37] text-[9px] tracking-[0.25em] uppercase">
                  Eyelash &amp; Beauty
                </p>
              </div>
            </div>
            <p className="font-sans text-zinc-500 text-xs font-light leading-relaxed max-w-[220px]">
              Nơi vẻ đẹp tự nhiên của bạn được nâng tầm qua đôi bàn tay của các nghệ nhân hàng đầu.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Contact Column ── */}
          <div className="footer-col">
            <h5 className="font-sans text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase mb-5">
              Liên hệ
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-[#D4AF37] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-sans text-zinc-400 text-xs font-light leading-relaxed">
                  123 Đường Làm Đẹp, Quận 1,<br />Hồ Chí Minh, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={13} className="text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:0901234567" className="font-sans text-zinc-300 text-xs hover:text-[#D4AF37] transition-colors">
                  090 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={13} className="text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:booking@lthanh.com" className="font-sans text-zinc-400 text-xs hover:text-[#D4AF37] transition-colors">
                  booking@lthanh.com
                </a>
              </li>
            </ul>
          </div>

          {/* ── Working Hours Column ── */}
          <div className="footer-col">
            <h5 className="font-sans text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase mb-5">
              Giờ mở cửa
            </h5>
            <ul className="space-y-3">
              <li>
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={11} className="text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="font-sans text-zinc-300 text-[10px] uppercase tracking-wider">
                    Thứ 2 — Thứ 6
                  </span>
                </div>
                <p className="font-sans text-zinc-400 text-xs pl-5">09:00 – 19:00</p>
              </li>
              <li>
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={11} className="text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="font-sans text-zinc-300 text-[10px] uppercase tracking-wider">
                    Thứ 7 — Chủ nhật
                  </span>
                </div>
                <p className="font-sans text-zinc-400 text-xs pl-5">09:00 – 20:00</p>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] font-sans text-[9px] tracking-wider uppercase px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  Đang mở cửa
                </span>
              </li>
            </ul>
          </div>

          {/* ── Links Column ── */}
          <div className="footer-col">
            <h5 className="font-sans text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase mb-5">
              Khám phá
            </h5>
            <ul className="space-y-3">
              {[
                ['Dịch vụ', '#services'],
                ['Academy', '#academy'],
                ['Phản hồi', '#feedback'],
                ['Tin tức', '#news'],
                ['Đặt lịch', '#booking'],
              ].map(([label, href]) => (
                <li key={href}>
                  <button
                    onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-sans text-zinc-500 text-xs hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.05] py-5">
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-zinc-600 text-[10px]">
            © {new Date().getFullYear()} L'Thanh Eyelash &amp; Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Chính sách bảo mật', 'Điều khoản sử dụng'].map((link) => (
              <a key={link} href="#" className="font-sans text-zinc-700 text-[10px] hover:text-zinc-400 transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
