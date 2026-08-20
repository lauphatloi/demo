/**
 * Academy.tsx
 *
 * GSAP Animation 5 — Pinned Image / Parallax Two-Column:
 *   On desktop: The image column is pinned while the text column scrolls past it.
 *   Both columns scroll at slightly different parallax speeds for depth.
 *   On mobile: Standard stacked vertical layout.
 *   Uses uploaded real training session photography.
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, GraduationCap, Users, Award } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';

const PROGRAMS = [
  {
    icon: GraduationCap,
    title: 'Khóa Học Nối Mi Chuyên Nghiệp',
    subtitle: 'Professional Masterclass',
    duration: '5 ngày thực chiến',
    desc: 'Đào tạo toàn diện từ lý thuyết cấu trúc mi, kỹ thuật nối mi Classic, Volume, Foxy đến xử lý mọi dáng mắt khó. Thực hành 100% trên người thật.',
  },
  {
    icon: Users,
    title: 'Kèm Cặp 1-Kèm-1 Chuyên Sâu',
    subtitle: '1-on-1 Mentorship',
    duration: '3 ngày',
    desc: 'Được Master Artist của L\'Thanh trực tiếp chỉnh sửa từng thao tác tay, căn chỉnh góc gắp nhíp, kỹ thuật chấm keo chuẩn không cay mắt.',
  },
  {
    icon: Award,
    title: 'Khóa Học Quản Lý & Mở Tiệm',
    subtitle: 'Salon Business & Branding',
    duration: '2 ngày',
    desc: 'Bí quyết xây dựng thương hiệu cá nhân, thu hút khách hàng trung thành, định giá dịch vụ và setup salon chuẩn phong cách sang trọng.',
  },
];

export default function Academy() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef  = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: Pin image column
    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: imageColRef.current,
        pinSpacing: false,
      });

      // GSAP Animation 5: Subtle parallax on image
      gsap.to(imgInnerRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Text items stagger from the right
      gsap.fromTo(
        '.academy-item',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Mobile: Simple stagger fade-up
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        '.academy-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="academy"
      ref={sectionRef}
      className="relative bg-[#030303] overflow-x-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col md:flex-row min-h-screen">

        {/* ── Left: Image Column (pinned on desktop) ── */}
        <div
          ref={imageColRef}
          className="w-full md:w-1/2 flex items-center justify-center py-16 md:py-0 md:h-screen flex-shrink-0"
        >
          <div ref={imgInnerRef} className="relative w-full max-w-sm md:max-w-md">
            {/* Main image (User uploaded academy training image) */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full shiny-hover border border-[#D4AF37]/30 shadow-2xl">
              <img
                src={getAssetUrl('1787143984468_3902196190291302019_3902196190291302019_63be7f28c67331798a3edb73b769b102.jpg')}
                alt="L'Thanh Academy Training Session"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Bottom badge */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-sans text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-1">
                  Đào Tạo Chuyên Nghiệp
                </p>
                <p className="font-serif text-white text-xl">
                  Học Viện Nối Mi L'Thanh
                </p>
              </div>
            </div>

            {/* Decorative border frame */}
            <div className="absolute -inset-3 border border-[#D4AF37]/20 rounded-2xl pointer-events-none -z-[1]" />

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -right-5 md:-right-8 bg-[#111111] border border-[#D4AF37]/40 rounded-xl px-6 py-4 shadow-2xl backdrop-blur-md">
              <div className="font-serif text-3xl text-gradient-gold font-bold">200+</div>
              <div className="font-sans text-zinc-300 text-[10px] tracking-widest uppercase mt-0.5 font-medium">
                Học viên thành nghề
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Text Column (scrolls normally) ── */}
        <div
          ref={textColRef}
          className="w-full md:w-1/2 py-16 md:py-32 md:pl-16 flex flex-col justify-center"
        >
          {/* Header */}
          <div className="academy-item mb-8">
            <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-3 block font-semibold">
              Đào tạo học viên chuyên nghiệp
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">
              Học để làm nghề
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl text-zinc-400 italic font-light">
              Làm nghề để thành công
            </h3>
          </div>

          <div className="gold-divider w-24 mb-8 academy-item" />

          <p className="font-sans text-zinc-300 font-light leading-relaxed mb-10 text-sm md:text-base academy-item">
            Tại L'Thanh Academy, chúng tôi cam kết mang lại môi trường học tập thực chiến,
            cầm tay chỉ việc 100%. Học viên tốt nghiệp tự tin mở tiệm, làm nghề vững vàng
            với tiêu chuẩn kỹ thuật hàng đầu.
          </p>

          {/* Program list */}
          <div className="space-y-7">
            {PROGRAMS.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <div
                  key={i}
                  className="academy-item flex gap-5 group bg-[#0c0c0c] border border-white/5 hover:border-[#D4AF37]/30 p-5 rounded-xl transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="font-serif text-white text-lg">
                        {prog.title}
                      </h4>
                      <span className="font-sans text-[#D4AF37] text-[9px] tracking-widest uppercase border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full font-medium">
                        {prog.duration}
                      </span>
                    </div>
                    <p className="font-sans text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benefits list */}
          <div className="academy-item mt-8 grid grid-cols-2 gap-3">
            {[
              'Cấp chứng chỉ tốt nghiệp',
              'Tặng trọn bộ đồ nghề cao cấp',
              'Hỗ trợ trọn đời sau khóa học',
              'Bảo hành tay nghề đến khi thạo',
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" strokeWidth={1.8} />
                <span className="font-sans text-zinc-300 text-xs font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="academy-item mt-10">
            <button
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="shiny-hover bg-gradient-to-r from-[#D4AF37] to-[#AA7700] text-black font-sans font-semibold text-xs py-4 px-10 rounded-full uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              Nhận tư vấn khóa học
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
