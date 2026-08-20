/**
 * Feedback.tsx
 *
 * GSAP Animation 7 — Horizontal Scroll (Pinned):
 *   On desktop (>=768px): The section is pinned and feedback cards translate
 *   horizontally in sync with vertical scroll (scrub).
 *   Features real client photos uploaded by the user from public folder.
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Star } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';

const REVIEWS = [
  {
    name: 'Nguyễn Thị Lan Anh',
    role: 'Khách hàng thân thiết (3 năm)',
    text: 'Tôi đã làm mi ở L\'Thanh từ những ngày đầu. Mi nối cực kỳ êm, không cộm, không rụng mi thật và giữ được hơn 1 tháng. Không gian salon rất thơm và thư giãn.',
    stars: 5,
    image: '1787143984351_3902196190291302019_3902196190291302019_a10e0b3b657de375defa0db879b59e5a.jpg',
    style: 'Style Anime',
  },
  {
    name: 'Trần Thảo My',
    role: 'Người mẫu ảnh / Content Creator',
    text: 'Style Mi Foxy ở đây làm mình cực kỳ ưng ý! Lên hình mắt sâu và quyến rũ hẳn. Chuyên viên rất tỉ mỉ và tư vấn nhiệt tình đúng dáng mắt của mình.',
    stars: 5,
    image: '1787143984360_3902196190291302019_3902196190291302019_6ea59bed9fbb15ea38b783529f122f8d.jpg',
    style: 'Mi Foxy',
  },
  {
    name: 'Hoàng Yến Nhi',
    role: 'Cựu học viên Masterclass K12',
    text: 'Khóa học tại L\'Thanh đã thay đổi hoàn toàn sự nghiệp của mình. Sau khi tốt nghiệp, mình đã tự tin mở studio riêng và có lượng khách ổn định. Cảm ơn cô Thanh rất nhiều!',
    stars: 5,
    image: '1787143984369_3902196190291302019_3902196190291302019_957eaf719c315040699bb5d68f374ee1.jpg',
    style: 'Khóa Masterclass',
  },
  {
    name: 'Phạm Quỳnh Như',
    role: 'Khách hàng VIP',
    text: 'Hoa Hồng Mix là kiểu mi chân ái của mình. Nhẹ như không nối, rửa mặt êm ru không lo rụng sớm. Sản phẩm keo nối cao cấp không hề bị cay hay đỏ mắt.',
    stars: 5,
    image: '1787143984378_3902196190291302019_3902196190291302019_39320e466702748f39f476239d1c50fc.jpg',
    style: 'Hoa Hồng Mix',
  },
  {
    name: 'Vũ Minh Trang',
    role: 'Khách hàng',
    text: 'Dịch vụ 5 sao từ khâu đón tiếp đến lúc ra về. Mỗi lần ghé L\'Thanh là một lần được thư giãn trọn vẹn, thức dậy là có ngay đôi mắt xinh đẹp rạng ngời.',
    stars: 5,
    image: '1787143984386_3902196190291302019_3902196190291302019_672f240be7656c4e33b5c258d7c81a00.jpg',
    style: 'Mi Thiết Kế',
  },
];

export default function Feedback() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: Horizontal scroll pinned
    mm.add('(min-width: 768px)', () => {
      if (!trackRef.current || !sectionRef.current) return;

      const totalWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      gsap.to(trackRef.current, {
        x: () => -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + scrollDistance,
          invalidateOnRefresh: true,
        },
      });
    });

    // Mobile: Simple fade-up
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        '.feedback-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="feedback"
      ref={sectionRef}
      className="relative bg-[#080808] overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div className="pt-20 md:pt-28 pb-10 md:pb-12 px-5 md:px-16 max-w-7xl mx-auto">
        <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-3 block font-semibold">
          Khách hàng tại L'Thanh
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Khách Hàng Chia Sẻ
          </h2>
          <p className="font-sans text-zinc-400 text-sm hidden md:block">
            Cuộn ngang để xem thêm đánh giá →
          </p>
        </div>
        <div className="gold-divider w-24 mt-5" />
      </div>

      {/* Track wrapper */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="
            flex gap-6 pb-20
            md:pb-28 md:gap-8
            px-5 md:px-16
            overflow-x-auto md:overflow-x-visible
            snap-x snap-mandatory md:snap-none
            hide-scrollbar
            will-change-transform
          "
          style={{ width: 'max-content' }}
        >
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="feedback-card flex-shrink-0 w-[85vw] md:w-[520px] snap-start"
            >
              <div className="h-full bg-[#0f0f0f] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-7 md:p-9 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] relative flex flex-col justify-between">

                {/* Quote decoration */}
                <div className="absolute top-6 right-8 font-serif text-7xl text-[#D4AF37]/10 leading-none select-none">
                  "
                </div>

                <div>
                  {/* Top row: Client photo + Name + Tag */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 flex-shrink-0 shadow-md">
                      <img
                        src={getAssetUrl(review.image)}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-white text-lg font-semibold">{review.name}</h4>
                      <p className="font-sans text-zinc-400 text-xs mt-0.5">{review.role}</p>
                      <span className="inline-block font-sans text-[#D4AF37] text-[9px] tracking-wider uppercase border border-[#D4AF37]/30 px-2 py-0.5 rounded-full mt-1.5 font-medium">
                        {review.style}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.stars }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="font-sans text-zinc-300 font-light leading-relaxed text-sm md:text-base italic mb-4 relative z-10">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>✓ Đã xác thực dịch vụ</span>
                  <span className="text-[#D4AF37]">5.0 / 5.0</span>
                </div>

              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-5 md:w-16" />
        </div>
      </div>
    </section>
  );
}
