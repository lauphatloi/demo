/**
 * BookingForm.tsx
 *
 * GSAP Animation 9 — Magnetic Float Effect:
 *   1. The form card has a continuous gentle floating animation (y oscillation).
 *   2. On desktop: the form subtly "leans" toward the mouse cursor (magnetic pull).
 *   3. On mouse leave: springs back elastically.
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { User, Phone, Scissors, Clock, CheckCircle } from 'lucide-react';

const SERVICES_OPTIONS = [
  'Style Anime',
  'Hoa Hồng Mix',
  'Mi Foxy',
  'Mi Thiết Kế',
  'Mi Classic',
  'Mi Volume 3D',
  'Academy / Đào tạo',
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00',
];

export default function BookingForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  // ── GSAP Animation 9a: Continuous floating animation ──────────────────────
  useGSAP(() => {
    // Section entrance
    gsap.fromTo(
      '.booking-text',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // GSAP Animation 9: Float
    floatTweenRef.current = gsap.to(formCardRef.current, {
      y: -12,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: sectionRef });

  // ── GSAP Animation 9b: Magnetic mouse tracking ───────────────────────────
  useEffect(() => {
    const card   = formCardRef.current;
    const parent = sectionRef.current;
    if (!card || !parent) return;

    let magneticX = 0;
    let magneticY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // desktop only

      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;

      magneticX = (e.clientX - cx) * 0.06;
      magneticY = (e.clientY - cy) * 0.06;

      gsap.to(card, {
        x: magneticX,
        // Note: we ADD to the float tween's y; use rotation for extra life
        rotation: magneticX * 0.04,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        x: 0,
        rotation: 0,
        duration: 1.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-28 md:py-40 bg-[#040404] relative overflow-hidden"
    >
      {/* ── Background decoration ── */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#AA7700]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text content ── */}
          <div>
            <div className="booking-text">
              <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-5 block">
                Đặt lịch hẹn
              </span>
            </div>
            <h2 className="booking-text font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Sẵn sàng cho sự{' '}
              <span className="italic text-gradient-gold">lột xác?</span>
            </h2>
            <p className="booking-text font-sans text-zinc-400 font-light leading-relaxed max-w-md mb-8 text-sm md:text-base">
              Đặt lịch hôm nay và để các nghệ nhân của L'Thanh nâng tầm vẻ đẹp
              tự nhiên của bạn. Ưu đãi đặc biệt dành cho lần đặt lịch đầu tiên.
            </p>

            {/* Highlights */}
            <div className="booking-text space-y-4 mb-8">
              {[
                'Tư vấn hình dạng mi miễn phí',
                'Đặt lịch linh hoạt, hủy dễ dàng',
                'Bảo hành 2 tuần sau mỗi lần làm',
                'Hỗ trợ 24/7 qua Zalo',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-sans text-zinc-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact alternatives */}
            <div className="booking-text flex items-center gap-6">
              <div>
                <p className="font-sans text-zinc-500 text-[9px] tracking-widest uppercase mb-1">
                  Hotline
                </p>
                <p className="font-sans text-white text-sm font-medium">090 123 4567</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-sans text-zinc-500 text-[9px] tracking-widest uppercase mb-1">
                  Zalo
                </p>
                <p className="font-sans text-white text-sm font-medium">090 123 4567</p>
              </div>
            </div>
          </div>

          {/* ── Right: Form card (magnetic float target) ── */}
          <div
            ref={formCardRef}
            className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-2xl p-7 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] will-change-transform"
          >
            <h3 className="font-serif text-xl text-white mb-7">
              Đặt lịch ngay
            </h3>

            <form
              onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn! Chúng tôi sẽ liên hệ xác nhận lịch hẹn của bạn.'); }}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">
                  Họ và tên *
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm font-sans placeholder:text-zinc-700 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input
                    type="tel"
                    required
                    placeholder="+84 090 000 0000"
                    className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm font-sans placeholder:text-zinc-700 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">
                  Dịch vụ
                </label>
                <div className="relative">
                  <Scissors size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <select
                    className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm font-sans focus:outline-none focus:border-[#D4AF37] transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {SERVICES_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time slot */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">
                  Giờ hẹn
                </label>
                <div className="relative">
                  <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <select
                    className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm font-sans focus:outline-none focus:border-[#D4AF37] transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">
                  Ghi chú (tuỳ chọn)
                </label>
                <textarea
                  rows={3}
                  placeholder="Yêu cầu đặc biệt, tình trạng mi hiện tại..."
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm font-sans placeholder:text-zinc-700 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="shiny-hover w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7700] text-black font-sans font-semibold text-xs py-4 rounded-xl uppercase tracking-widest hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 mt-2"
              >
                Xác nhận đặt lịch
              </button>

              <p className="font-sans text-zinc-600 text-[10px] text-center">
                Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút
              </p>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
