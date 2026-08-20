/**
 * Criteria.tsx
 *
 * GSAP Animation 6 — Icon Pop (bounce scale) + Line Draw:
 *   1. Icons scale from 0 → 1 with a bounce ease when scrolled into view.
 *   2. Connecting horizontal lines grow (scaleX 0 → 1) from left to right.
 *   3. Text labels fade up after icons pop in.
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Building2, Gem, ShieldCheck, Sparkles } from 'lucide-react';

const CRITERIA = [
  {
    icon: Building2,
    title: 'Không Gian Hiện Đại',
    subtitle: 'Modern Space',
    desc: 'Studio được thiết kế tối giản, sang trọng — không gian thư giãn lý tưởng để bạn tận hưởng trải nghiệm làm đẹp đẳng cấp.',
  },
  {
    icon: Gem,
    title: 'Tay Nghề Chuyên Nghiệp',
    subtitle: 'Professional Skills',
    desc: 'Đội ngũ kỹ thuật viên được đào tạo bài bản, tích lũy kinh nghiệm qua hàng nghìn ca làm mi thực tế.',
  },
  {
    icon: ShieldCheck,
    title: 'Sản Phẩm An Toàn',
    subtitle: 'Safe Products',
    desc: 'Chỉ sử dụng keo và mi sợi đạt tiêu chuẩn quốc tế, không gây kích ứng, an toàn cho mắt nhạy cảm.',
  },
  {
    icon: Sparkles,
    title: 'Chất Lượng Hàng Đầu',
    subtitle: 'Top Quality',
    desc: 'Cam kết mang đến trải nghiệm dịch vụ 5 sao — từ lúc bạn bước vào đến khi rời khỏi salon.',
  },
];

export default function Criteria() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    // GSAP Animation 6a: Icons pop in with bounce
    tl.fromTo(
      '.criterion-icon',
      { scale: 0, opacity: 0, rotation: -15 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.9)',
      }
    );

    // GSAP Animation 6b: Connecting lines "draw" from left to right
    tl.fromTo(
      '.criterion-connector',
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.inOut',
      },
      '-=0.7'  // Overlap with icon animation
    );

    // GSAP Animation 6c: Text fades up
    tl.fromTo(
      '.criterion-text',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.9'
    );

    // Desc cards fade up after
    tl.fromTo(
      '.criterion-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.6'
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-40 bg-[#050505] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-20 md:mb-24">
          <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-4 block">
            Tiêu chí của chúng tôi
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            Core Values
          </h2>
          <p className="font-sans text-zinc-500 text-sm font-light max-w-md mx-auto">
            Bốn giá trị cốt lõi định hình nên L'Thanh — cam kết không đổi với từng khách hàng.
          </p>
          <div className="gold-divider max-w-[80px] mx-auto mt-6" />
        </div>

        {/* ── Icon timeline row ── */}
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 mb-16 md:mb-24">
          {CRITERIA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center w-full md:w-1/4 px-2">

                {/* Icon circle */}
                <div className="criterion-icon relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111111] border border-[#D4AF37]/30 flex items-center justify-center mb-5 shadow-[0_0_40px_rgba(212,175,55,0.08)] z-10 group hover:border-[#D4AF37]/70 transition-colors duration-500">
                  <Icon
                    className="w-9 h-9 md:w-10 md:h-10 text-[#D4AF37]"
                    strokeWidth={1.2}
                  />
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-full bg-[#D4AF37]/5 scale-0 group-hover:scale-100 transition-transform duration-500" />
                </div>

                {/* Text */}
                <div className="criterion-text text-center">
                  <h3 className="font-serif text-lg md:text-xl text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[#D4AF37] text-[9px] tracking-[0.25em] uppercase">
                    {item.subtitle}
                  </p>
                </div>

                {/* Connecting line to next item (hidden on last) */}
                {idx < CRITERIA.length - 1 && (
                  <div
                    className="criterion-connector hidden md:block absolute top-[46px] md:top-[48px] left-[calc(50%+48px)] right-0"
                    style={{
                      height: '1px',
                      background:
                        'linear-gradient(to right, rgba(212,175,55,0.5), rgba(212,175,55,0.1))',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Description cards below ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CRITERIA.map((item, idx) => (
            <div
              key={idx}
              className="criterion-card bg-[#0a0a0a] border border-white/5 hover:border-[#D4AF37]/25 rounded-xl p-6 transition-all duration-500 hover:bg-[#111111] group"
            >
              <p className="font-sans text-zinc-400 text-sm font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
