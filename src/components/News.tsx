/**
 * News.tsx
 *
 * GSAP Animation 8 — Fade-Up Stagger:
 *   Clean, professional stagger fade-up animation for article cards
 *   as they enter the viewport.
 *   Uses uploaded real salon beauty tips and portfolio images from public folder.
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';

const FEATURED = {
  title: 'Học Viện L\'Thanh: Hành Trình Từ Học Viên Đến Làm Chủ Studio Nối Mi',
  date: 'Tháng 8, 2024',
  category: 'Câu chuyện thành công',
  image: '1787143984422_3902196190291302019_3902196190291302019_cc959470fa75592c78a1d22b7fec483b.jpg',
  excerpt: 'Khám phá câu chuyện truyền cảm hứng của các học viên tốt nghiệp L\'Thanh Academy — những người đã biến đam mê nghệ thuật nối mi thành sự nghiệp kinh doanh vững chắc.',
};

const NEWS = [
  {
    title: 'Cách chăm sóc mi nối đúng cách để giữ mi bền đẹp trên 6 tuần',
    date: '15 Tháng 7, 2024',
    category: 'Cẩm nang chăm sóc',
    readTime: '4 phút đọc',
    image: '1787143984394_3902196190291302019_3902196190291302019_76fb77e796628d040d705ff2cccf33fd.jpg',
    excerpt: 'Những thói quen rửa mặt, dưỡng mi và chải mi đúng cách hàng ngày giúp hàng mi nối của bạn luôn tơi đều, mượt mà và bền đẹp nhất.',
  },
  {
    title: 'Top 5 kiểu mi xu hướng hot nhất được phái đẹp săn đón năm 2024',
    date: '02 Tháng 6, 2024',
    category: 'Xu hướng làm đẹp',
    readTime: '5 phút đọc',
    image: '1787143984408_3902196190291302019_3902196190291302019_a75c3915e743a65ec712f63af246fb31.jpg',
    excerpt: 'Từ style Mi Foxy quyến rũ, Anime cá tính đến Hoa Hồng Mix lãng mạn — cùng L\'Thanh cập nhật những phong cách mi đang dẫn đầu xu thế.',
  },
  {
    title: 'Bí quyết chọn dáng mi và độ cong chuẩn xác theo từng khuôn mắt',
    date: '19 Tháng 5, 2024',
    category: 'Tư vấn chuyên gia',
    readTime: '6 phút đọc',
    image: '1787143984417_3902196190291302019_3902196190291302019_02144224414435de2aa33b587dca8e94.jpg',
    excerpt: 'Mắt một mí, mắt mí lót, mắt tròn hay mắt sâu nên nối kiểu mi nào? Hướng dẫn chi tiết từ chuyên gia nối mi tại L\'Thanh.',
  },
];

export default function News() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header fade up
    gsap.fromTo(
      '.news-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Featured article
    gsap.fromTo(
      '.news-featured',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.news-featured',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // GSAP Animation 8: Stagger fade-up for article cards
    gsap.fromTo(
      '.news-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.news-grid',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="news"
      ref={sectionRef}
      className="py-28 md:py-36 bg-black overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">

        {/* ── Header ── */}
        <div className="news-header flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-3 block font-semibold">
              Tin tức &amp; Cẩm nang làm đẹp
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white">
              Cẩm Nang &amp; Xu Hướng Mi
            </h2>
          </div>
          <button className="font-sans text-white hover:text-[#D4AF37] text-xs uppercase tracking-widest border-b border-[#D4AF37]/60 pb-1 transition-colors duration-300 w-max inline-flex items-center gap-2 group font-medium">
            Xem tất cả bài viết
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* ── Featured Article ── */}
        <div className="news-featured mb-10 group cursor-pointer">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] shiny-hover border border-white/10 shadow-2xl">
            <img
              src={getAssetUrl(FEATURED.image)}
              alt={FEATURED.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-[#D4AF37] text-black font-sans text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                  {FEATURED.category}
                </span>
                <span className="font-sans text-zinc-300 text-xs flex items-center gap-1.5 font-medium">
                  <Calendar size={12} className="text-[#D4AF37]" />
                  {FEATURED.date}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-[#FFDF73] transition-colors duration-300 leading-snug">
                {FEATURED.title}
              </h3>
              <p className="font-sans text-zinc-300 text-sm font-light leading-relaxed hidden md:block">
                {FEATURED.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* ── Article Cards Grid ── */}
        <div className="news-grid grid grid-cols-1 md:grid-cols-3 gap-7">
          {NEWS.map((article, idx) => (
            <article key={idx} className="news-card group cursor-pointer flex flex-col justify-between">
              <div>
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-5 shiny-hover border border-white/5">
                  <img
                    src={getAssetUrl(article.image)}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    <Tag size={9} className="text-[#D4AF37]" />
                    <span className="font-sans text-[#D4AF37] text-[9px] uppercase tracking-wider font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-zinc-400 text-xs flex items-center gap-1">
                    <Calendar size={11} className="text-[#D4AF37]" />
                    {article.date}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="font-sans text-zinc-400 text-xs font-light">
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-white group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="font-sans text-zinc-400 text-sm font-light leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
              </div>

              {/* Read more */}
              <span className="font-sans text-[#D4AF37] text-xs uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300 font-medium">
                Đọc tiếp <ArrowRight size={13} />
              </span>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
