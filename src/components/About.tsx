/**
 * About.tsx
 *
 * GSAP Animation 3 — Word-by-Word Text Reveal (scrub):
 *   Splits the philosophy paragraph into individual <span> words.
 *   Each word's opacity is driven directly by scroll position (scrub: true).
 */

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetUrl } from '../utils/asset';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLParagraphElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── GSAP Animation 3: Word-by-word reveal tied to scroll ──────────────
      if (textRef.current) {
        const rawText = textRef.current.innerText;
        textRef.current.innerHTML = '';

        rawText.split(' ').forEach((word) => {
          const span = document.createElement('span');
          span.innerText = word + ' ';
          span.style.opacity = '0.12';
          span.style.display = 'inline';
          span.style.transition = 'none';
          textRef.current!.appendChild(span);
        });

        const wordSpans = textRef.current.querySelectorAll('span');

        gsap.to(wordSpans, {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end: 'bottom 70%',
            scrub: 1.5,
          },
        });
      }

      // ── Section title fade up ──────────────────────────────────────────────
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ── Gallery images stagger ─────────────────────────────────────────────
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.children,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ── Stats counter ─────────────────────────────────────────────────────
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const STATS = [
    { value: '10+',  label: 'Năm kinh nghiệm' },
    { value: '5K+',  label: 'Khách hàng hài lòng' },
    { value: '20+',  label: 'Kiểu mi độc quyền' },
    { value: '100%', label: 'Sản phẩm an toàn' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-28 md:py-36 px-5 overflow-hidden"
    >
      {/* ── Decorative glow blobs ── */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D4AF37]/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section label + title ── */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-4 block">
            Est. 2016 — Câu Chuyện Thương Hiệu
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            L'Thanh Eyelash &amp; Beauty
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        {/* ── Philosophy paragraph (Word-by-word reveal target) ── */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-24">
          <p
            ref={textRef}
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-white font-normal leading-relaxed tracking-normal"
            aria-label="Triết lý của chúng tôi"
          >
            Đôi mắt là cửa sổ tâm hồn. Tại L'Thanh Eyelash &amp; Beauty, chúng tôi
            tin rằng mỗi ánh nhìn đều mang một câu chuyện riêng. Sứ mệnh của chúng
            tôi là đánh thức vẻ đẹp tiềm ẩn, mang lại sự tự tin và quyến rũ cho
            mọi phụ nữ — để mỗi ánh mắt đều tỏa sáng rạng ngời và cuốn hút nhất.
          </p>
        </div>

        {/* ── Real Salon Visual Showcase (User uploaded images) ── */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shiny-hover border border-white/10 group">
            <img
              src={getAssetUrl('1787143984428_3902196190291302019_3902196190291302019_dac331b6eb40cc497a44815491ba5f02.jpg')}
              alt="L'Thanh Eyelash Studio"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[#D4AF37] font-sans text-[10px] tracking-widest uppercase">Không gian sang trọng</span>
              <h3 className="font-serif text-xl text-white mt-1">Trải Nghiệm Đẳng Cấp 5 Sao</h3>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shiny-hover border border-white/10 group">
            <img
              src={getAssetUrl('1787143984437_3902196190291302019_3902196190291302019_9fe3d5ea6ce44a1c12676efd82a3e902.jpg')}
              alt="Nghệ Nhân L'Thanh Eyelash"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[#D4AF37] font-sans text-[10px] tracking-widest uppercase">Tay nghề bậc thầy</span>
              <h3 className="font-serif text-xl text-white mt-1">Tỉ Mỉ Trong Từng Sợi Mi</h3>
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item text-center border border-[#D4AF37]/20 rounded-xl p-6 bg-white/[0.02] hover:border-[#D4AF37]/50 transition-colors duration-500"
            >
              <div className="font-serif text-4xl md:text-5xl text-gradient-gold mb-2 font-semibold">
                {stat.value}
              </div>
              <div className="font-sans text-xs text-zinc-300 tracking-wider uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
