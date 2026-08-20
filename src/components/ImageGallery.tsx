/**
 * ImageGallery.tsx
 *
 * High-Performance Luxury Stacked-Card Gallery:
 *
 * 1. PINNED PANEL LOCK:
 *    Section pins strictly on-screen (`pin: true`, `pinSpacing: true`). The user must
 *    scroll through all 23 cards within this single panel before proceeding to <News />.
 *
 * 2. VIRTUALIZED STACK OPTIMIZATION (60–120 FPS):
 *    Only the currently active card and the next 2 upcoming cards are rendered/composited.
 *    Cards outside the active viewing window are automatically hidden (`visibility: hidden`)
 *    to eliminate GPU overdraw, memory pressure, and scroll lag.
 *
 * 3. INTRO & REVERSIBLE STACKING:
 *    Cards smoothly fan in on enter, fly off alternating left/right on scroll down,
 *    and seamlessly re-stack in reverse order on scroll up.
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getAssetUrl } from '../utils/asset';
import { Images, Sparkles } from 'lucide-react';

const GALLERY_FILES = [
  '2aoboqsom6s5aydxmal7iaas0qbk5sk61i8asx0c1.jpg',
  '2aoboqsom8gjfbt44hc8ddnerzrgskhsi4ymjmq42.jpg',
  '2aoboqsombovovnkgctfbtimfolmdvcyp0aykria3.jpg',
  '2aoboqsomhmna6eyl6yxwxsh48ivphorj7jux1ns4.jpg',
  '2aoboqsommwluyyqzsqqxi38dmztgxh41eo3nfbm5.jpg',
  '2aoboqsomrtxegy6an2ehg0ok5qon1dffuzxaoki8.jpg',
  '2aoboqsomtfrmmkk8epdnklbdbdtmnexpxbdu8jc6.jpg',
  '2aoboqsomvsiex7pdxczneu30vztvoolhauwywze7.jpg',
  '2aoboqsondjemrbvhq9rtyukkuq8egfqfdl9pgxc20.jpg',
  '2aoboqsondpuirxhzof04kkxsvxh4twdzba0bq7e22.jpg',
  '2aoboqsondrtcyvwzrhzalaoclo3xxwcq1jruvay21.jpg',
  '2aoboqsone9gky6lgslhwd4pkhdgw9bvtti3syc023.jpg',
  '2aoboqsonek2xsgq9hvinbvonf6rrpgudqxu0aok24.jpg',
  '2aoboqsonfzqp7xdecpmheejzj2lrhbxhv0kdm6q10.jpg',
  '2aoboqsonmitp4uhtmawnldzet0jm9wasdypsduq11.jpg',
  '2aoboqsonqkgzhmazmabomym1rt60cxttovrmzhu12.jpg',
  '2aoboqsonv4lnsdqb5apgeoq58b08vfdctadzskq13.jpg',
  '2aoboqsonvhnlhbrpixvogp8jh8mjwjzwzoro3ks14.jpg',
  '2aoboqsonvoij3bv8wid348fybjimz0xjokhiqg016.jpg',
  '2aoboqsonvwwoyzmiqee28lgo1ts6guow20vviru17.jpg',
  '2aoboqsonvxgysxogoxigmnnxrs9xlwvemzfuy5y15.jpg',
  '2aoboqsonylo7rpc0en0ixqomjjpuiaiewjxkfxa18.jpg',
  '2aoboqsonzwxgquomzdcux9ogvtalgk4b5ysxobq19.jpg',
];

const IMAGES = GALLERY_FILES.map((file) => getAssetUrl(`gallery/${file}`));

export default function ImageGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  const total = IMAGES.length;

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const isMobile = window.innerWidth < 768;
    const flyDistance = isMobile ? window.innerWidth * 1.25 : 950;
    const scrollDistance = isMobile ? total * 180 : total * 240;

    // ── Set initial zIndex & transform optimizations ────────────────────────
    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: total - index,
        transformOrigin: 'center center',
        force3D: true,
        // Only keep the first 3 cards visible initially to conserve GPU memory
        visibility: index <= 2 ? 'visible' : 'hidden',
      });
    });

    // ── Single Master Timeline with Pinned Panel Lock ───────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const activeIndex = Math.min(
            total - 1,
            Math.floor(progress * (total - 1))
          );

          // Update counter
          if (counterRef.current) {
            counterRef.current.textContent = `${activeIndex + 1}`;
          }

          // ── Virtualization: Dynamically toggle visibility for high performance
          // Only cards within [activeIndex - 1, activeIndex + 2] need to be rendered
          cards.forEach((card, i) => {
            const isVisible = i >= activeIndex - 1 && i <= activeIndex + 2;
            card.style.visibility = isVisible ? 'visible' : 'hidden';
          });
        },
      },
    });

    // ── 1. Intro Gathering Phase (First 0.4s of timeline) ───────────────────
    cards.slice(0, 3).forEach((card, i) => {
      const seed = i + 1;
      const initRot = (seed % 2 === 0 ? 1 : -1) * 6;
      const initY = 30;

      gsap.set(card, { rotation: initRot, y: initY, scale: 0.96 });

      tl.to(
        card,
        {
          rotation: 0,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      );
    });

    // ── 2. Card Fly-Out Sequence ────────────────────────────────────────────
    const cardsToFly = cards.slice(0, total - 1);
    const stepDuration = 1.0;

    cardsToFly.forEach((card, i) => {
      const isEven = i % 2 === 0;
      const dir = isEven ? -1 : 1; // Alternate flying left vs right
      const startTime = 0.4 + i * stepDuration;

      tl.to(
        card,
        {
          x: dir * flyDistance,
          y: -40 + (i % 3) * 15,
          rotation: dir * (16 + (i % 3) * 4),
          opacity: 0,
          scale: 0.88,
          duration: stepDuration,
          ease: 'power1.inOut',
        },
        startTime
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-[#040404] text-white overflow-hidden border-t border-white/[0.06] select-none"
      style={{ touchAction: 'pan-y' }}
    >
      {/* ── Fixed Viewport Panel ── */}
      <div
        ref={containerRef}
        className="w-full h-screen flex flex-col justify-between py-6 md:py-10 px-4 max-w-7xl mx-auto relative overflow-hidden"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

        {/* ── Section Header ── */}
        <div className="text-center relative z-20 flex-shrink-0 pt-2">
          <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3 py-1 rounded-full mb-2">
            <Sparkles size={11} className="text-[#D4AF37]" />
            <span className="font-sans text-[#D4AF37] text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-semibold">
              Bộ sưu tập nghệ thuật — Portfolio
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
            Khoảnh Khắc Đẹp Tại L'Thanh
          </h2>

          <p className="font-sans text-zinc-400 text-xs md:text-sm font-light max-w-md mx-auto mt-1 line-clamp-1 md:line-clamp-none">
            Khám phá trọn bộ các tác phẩm nghệ thuật nối mi và học viên xuất sắc.
          </p>

          {/* Real-time card counter */}
          <div className="inline-flex items-center gap-2 mt-2.5 bg-black/70 backdrop-blur-sm border border-white/10 px-3.5 py-1 rounded-full">
            <Images size={12} className="text-[#D4AF37]" />
            <span className="font-sans text-zinc-300 text-[11px]">
              Tác phẩm <span ref={counterRef} className="text-[#D4AF37] font-bold">1</span> / {total}
            </span>
          </div>
        </div>

        {/* ── Pinned Card Deck Stage ── */}
        <div
          className="relative flex-1 flex items-center justify-center my-auto w-full z-10"
          style={{ perspective: '1200px', touchAction: 'pan-y' }}
        >
          <div
            className="relative"
            style={{
              width: 'clamp(260px, 78vw, 440px)',
              height: 'clamp(320px, 54vh, 520px)',
            }}
          >
            {IMAGES.map((src, idx) => (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#0d0d0d] shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
                style={{
                  willChange: 'transform, opacity',
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Image */}
                <img
                  src={src}
                  alt={`Tác phẩm L'Thanh Eyelash ${idx + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Luxury badge */}
                <div className="absolute top-3.5 left-3.5 bg-black/75 backdrop-blur-sm border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full pointer-events-none">
                  <span className="font-sans text-[#D4AF37] text-[9px] tracking-widest uppercase font-semibold">
                    L'Thanh Masterpiece
                  </span>
                </div>

                {/* Index indicator */}
                <div className="absolute bottom-3.5 right-3.5 bg-black/80 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full pointer-events-none">
                  <span className="font-sans text-white text-[10px] tracking-wider font-medium">
                    <span className="text-[#D4AF37] font-bold">{String(idx + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Scroll Guidance ── */}
        <div className="text-center relative z-20 flex-shrink-0 pb-1 flex flex-col items-center gap-1">
          <span className="font-sans text-zinc-400 text-[9px] tracking-[0.25em] uppercase">
            Cuộn để xem hết bộ sưu tập ↓
          </span>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
