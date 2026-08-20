/**
 * Services.tsx
 *
 * GSAP Animation 4 — Staggered 3D Rotate In:
 *   Cards enter with rotationY: 50 + y offset, rotating to flat on scroll.
 *   "Shiny Hover" CSS class applied to each card's image wrapper.
 *   Utilizes real uploaded eyelash style photos from public folder.
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';

const SERVICES = [
  {
    title: 'Style Anime',
    subtitle: 'Phong cách hoạt hình',
    image: '1787143984248_3902196190291302019_3902196190291302019_c45839e0c2940fe46ad47dcf39abb4c4.jpg',
    desc: 'Đường mi sắc nét, cá tính với các spike độc đáo tạo điểm nhấn ấn tượng, to tròn cho đôi mắt.',
    tag: 'Bestseller',
  },
  {
    title: 'Hoa Hồng Mix',
    subtitle: 'Romantic Rose Volume',
    image: '1787143984275_3902196190291302019_3902196190291302019_4c6cf7f7d8a1f977f3fdf98faf50f0bc.jpg',
    desc: 'Độ dày bồng bềnh như cánh hoa hồng, tạo nét đẹp dịu dàng, lãng mạn và vô cùng tự nhiên.',
    tag: 'Được yêu thích',
  },
  {
    title: 'Mi Foxy',
    subtitle: 'Hiệu ứng mắt mèo',
    image: '1787143984297_3902196190291302019_3902196190291302019_1474b017fbc6ea8804dfea4c49aa7027.jpg',
    desc: 'Kéo dài và nâng cong vút phần đuôi mắt, mang đến ánh nhìn sắc sảo, quyến rũ và đầy quyền lực.',
    tag: 'Xu hướng 2024',
  },
  {
    title: 'Mi Thiết Kế',
    subtitle: 'Custom Bespoke Design',
    image: '1787143984314_3902196190291302019_3902196190291302019_4363cc34534dd7f4da527c498b456fb8.jpg',
    desc: 'Được thiết kế độc bản theo dáng mắt, phong cách và sở thích riêng của từng khách hàng.',
    tag: 'Cao cấp',
  },
  {
    title: 'Mi Classic',
    subtitle: 'Vẻ đẹp thanh lịch',
    image: '1787143984330_3902196190291302019_3902196190291302019_5811329574e3525fb779ac50d98d860f.jpg',
    desc: 'Từng sợi mi tự nhiên được dặm kỹ lưỡng, giữ trọn nét thanh tao, nhẹ nhàng cho công sở và đời thường.',
    tag: 'Tự nhiên',
  },
  {
    title: 'Mi Volume 3D',
    subtitle: 'Độ dày ấn tượng',
    image: '1787143984341_3902196190291302019_3902196190291302019_f923f89516173009005516cd7519faa1.jpg',
    desc: 'Kỹ thuật tạo fan mi đa tầng siêu mỏng nhẹ, mang lại hàng mi đen mướt, dày dặn nhưng không nặng mắt.',
    tag: 'Chuyên sâu',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<Element>('.service-card');

    // GSAP Animation 4: Staggered 3D rotate-in
    gsap.fromTo(
      cards,
      {
        rotationY: 50,
        y: 80,
        opacity: 0,
        transformOrigin: 'left center',
      },
      {
        rotationY: 0,
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Section header fade up
    gsap.fromTo(
      '.services-header',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 md:py-36 bg-[#080808] relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-12">

        {/* ── Header ── */}
        <div className="services-header text-center mb-16 md:mb-20">
          <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-4 block">
            Dịch Vụ Nổi Bật — Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            Signature Eyelash Styles
          </h2>
          <p className="font-sans text-zinc-400 text-sm font-light max-w-xl mx-auto leading-relaxed">
            Mỗi kiểu mi là một tác phẩm nghệ thuật — được chế tác tỉ mỉ bởi đôi bàn tay
            của các chuyên viên giàu kinh nghiệm tại L'Thanh.
          </p>
          <div className="gold-divider max-w-[80px] mx-auto mt-6" />
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((svc, idx) => (
            <div
              key={idx}
              className="service-card group cursor-pointer bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)] flex flex-col justify-between"
            >
              <div>
                {/* Image with shiny hover */}
                <div className="relative h-64 overflow-hidden shiny-hover">
                  <img
                    src={getAssetUrl(svc.image)}
                    alt={svc.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 transform"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                  {/* Tag badge */}
                  {svc.tag && (
                    <span className="absolute top-4 right-4 bg-[#D4AF37] text-black font-sans text-[9px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full shadow-md">
                      {svc.tag}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="p-7">
                  <p className="font-sans text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase mb-1">
                    {svc.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[#FFDF73] transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="font-sans text-zinc-400 text-sm font-light leading-relaxed mb-4">
                    {svc.desc}
                  </p>
                </div>
              </div>

              {/* Card footer CTA */}
              <div className="px-7 pb-7">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-sans tracking-widest uppercase group-hover:gap-4 transition-all duration-300 font-medium">
                  <span>Đặt lịch kiểu này</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-14">
          <button
            onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="shiny-hover border border-[#D4AF37]/60 text-[#D4AF37] hover:text-black hover:bg-[#D4AF37] font-sans text-xs py-4 px-10 rounded-full uppercase tracking-widest transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(212,175,55,0.15)]"
          >
            Tư vấn chọn kiểu mi phù hợp
          </button>
        </div>

      </div>
    </section>
  );
}
