/**
 * ImageGallery.tsx
 *
 * Luxury stacked-card gallery with GSAP ScrollTrigger scrub:
 *
 * 1. INTRO: Cards start slightly fanned/scattered and gather neatly into a single centered stack.
 * 2. PINNED SCRUB: As user scrolls, the section is pinned. The top card flies off (alternating left/right),
 *    revealing the next card underneath.
 * 3. REVERSIBLE: Scrolling back up re-stacks cards in the exact correct order.
 * 4. MOBILE / IPHONE OPTIMIZATION:
 *    - All ScrollTriggers configured statically inside useGSAP (no async creation).
 *    - `touch-action: pan-y` prevents touch lock on iOS Safari.
 *    - GPU acceleration (transform: translate3d, will-change).
 *    - Responsive card sizing and fly-out offsets.
 */

import React, { useRef, useState } from 'react';
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
  const sectionRef  = useRef<HTMLDivElement>(null);
  const triggerRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef  = useRef<HTMLSpanElement>(null);

  const total = IMAGES.length;

  useGSAP(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 0px)', (context) => {
      const isMobile = window.innerWidth < 768;
      const flyDistance = isMobile ? window.innerWidth * 1.15 : 850;

      // ── Set initial zIndex so first images are on top of the stack ─────────
      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: total - index,
          transformOrigin: 'center center',
          force3D: true,
        });
      });

      // ── Main Timeline with ScrollTrigger Pin ───────────────────────────────
      const scrollDistance = isMobile ? total * 160 : total * 220;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counterRef.current) {
              const currentIdx = Math.min(
                total,
                Math.max(1, Math.floor(self.progress * (total - 1)) + 1)
              );
              counterRef.current.textContent = `${currentIdx}`;
            }
          },
        },
      });

      // ── 1. Intro Fan-In Phase (First 5% of scroll) ─────────────────────────
      cards.forEach((card, i) => {
        const seed = i + 1;
        const initRot = (seed % 2 === 0 ? 1 : -1) * ((seed * 4) % 12);
        const initX = (seed % 2 === 0 ? 1 : -1) * ((seed * 7) % 25);
        const initY = 40 + ((seed * 3) % 20);

        // Start slightly fanned out
        gsap.set(card, {
          rotation: initRot,
          x: initX,
          y: initY,
          scale: 0.95,
          opacity: 0.9,
        });

        // Gather into neat stack
        tl.to(
          card,
          {
            rotation: 0,
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0
        );
      });

      // ── 2. Card Stack Fly-Out (Remaining 95% of scroll) ───────────────────
      // We animate from top card (index 0) to second-to-last card (index total-2)
      // The last card (index total-1) remains visible at the bottom
      const cardsToAnimate = cards.slice(0, total - 1);
      const stepDuration = 1.0;

      cardsToAnimate.forEach((card, i) => {
        const isEven = i % 2 === 0;
        const dir = isEven ? -1 : 1; // alternate fly left / right
        const startTime = 0.5 + i * stepDuration;

        tl.to(
          card,
          {
            x: dir * flyDistance,
            y: -30 + (i % 3) * 15,
            rotation: dir * (15 + (i % 4) * 3),
            opacity: 0,
            scale: 0.9,
            duration: stepDuration,
            ease: 'power1.inOut',
          },
          startTime
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-[#050505] text-white overflow-hidden border-t border-white/[0.06]"
      style={{ touchAction: 'pan-y' }}
    >
      {/* ── Pinned Viewport Container ── */}
      <div
        ref={triggerRef}
        className="w-full h-screen flex flex-col justify-between py-6 md:py-10 px-4 max-w-7xl mx-auto relative overflow-hidden"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Ambient golden glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

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
            Cuộn xuống để lướt từng tác phẩm nối mi và học viên xuất sắc.
          </p>

          {/* Counter pill */}
          <div className="inline-flex items-center gap-2 mt-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-0.5 rounded-full">
            <Images size={12} className="text-[#D4AF37]" />
            <span className="font-sans text-zinc-300 text-[11px]">
              Tác phẩm <span ref={counterRef} className="text-[#D4AF37] font-bold">1</span> / {total}
            </span>
          </div>
        </div>

        {/* ── Center Stack Stage ── */}
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
                className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#111111]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                {/* Top luxury badge */}
                <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 px-2.5 py-1 rounded-full pointer-events-none">
                  <span className="font-sans text-[#D4AF37] text-[9px] tracking-widest uppercase font-semibold">
                    L'Thanh Masterpiece
                  </span>
                </div>

                {/* Bottom index indicator */}
                <div className="absolute bottom-3.5 right-3.5 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full pointer-events-none">
                  <span className="font-sans text-white text-[10px] tracking-wider font-medium">
                    <span className="text-[#D4AF37] font-bold">{String(idx + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Scroll Hint ── */}
        <div className="text-center relative z-20 flex-shrink-0 pb-1 flex flex-col items-center gap-1">
          <span className="font-sans text-zinc-400 text-[9px] tracking-[0.25em] uppercase">
            Cuộn để xem tiếp ↓
          </span>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
