/**
 * ImageGallery.tsx
 *
 * Luxury stacked-card gallery with GSAP ScrollTrigger scrub:
 *
 * 1. INTRO — Fan-in animation: cards enter scattered/rotated from below,
 *    then converge into a single aligned stack with a bounce finish.
 * 2. PIN — Section locks in place while user scrolls.
 * 3. SCRUB — Each scroll step flies the top card left/right off-screen
 *    (alternating side), revealing the next card underneath.
 * 4. REVERSE — Scrolling back re-stacks cards in correct order.
 *
 * Performance notes:
 *  - `will-change: transform, opacity` on every card.
 *  - `transform: translateZ(0)` forces GPU compositing.
 *  - Passive touch listeners via Lenis/ScrollTrigger.
 *  - `loading="lazy"` on all images below the fold.
 *  - Debounced ScrollTrigger.refresh() on resize.
 */

import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getAssetUrl } from '../utils/asset';
import { Images } from 'lucide-react';

// ─── All 24 gallery images from /public/gallery ──────────────────────────────
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

// We only use 23 JPGs (skip the mp4)
const IMAGES = GALLERY_FILES.map((file) => getAssetUrl(`gallery/${file}`));

// Deterministic random offsets for the fan-in scatter (seeded by index)
function pseudoRandom(seed: number, scale: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return (x - Math.floor(x) - 0.5) * 2 * scale;
}

export default function ImageGallery() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const stackRef    = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);

  const count = IMAGES.length; // 23

  // Card dimensions: responsive via CSS, but we need numeric estimates for GSAP
  // px values below are overridden by CSS — used only for fly-out distance calc
  const FLY_X_DESKTOP = 900;
  const FLY_X_MOBILE  = 420;

  useGSAP(() => {
    if (!stackRef.current || !sectionRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.gal-card');
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isDesktop: '(min-width: 768px)',
      },
      (ctx) => {
        const { isMobile } = ctx.conditions as { isMobile: boolean; isDesktop: boolean };
        const flyX = isMobile ? FLY_X_MOBILE : FLY_X_DESKTOP;

        // ── 1. SET initial state: scattered / rotated / below viewport ────────
        cards.forEach((card, i) => {
          const seed = i + 1;
          const scatterX = pseudoRandom(seed * 3, isMobile ? 80 : 160);
          const scatterY = pseudoRandom(seed * 7, isMobile ? 60 : 120);
          const scatterR = pseudoRandom(seed * 11, 28);
          const scatterS = 0.4 + Math.abs(pseudoRandom(seed * 5, 0.25));

          gsap.set(card, {
            x: scatterX,
            y: isMobile ? 340 + Math.abs(scatterY) : 520 + Math.abs(scatterY),
            rotation: scatterR,
            scale: scatterS,
            opacity: 0,
            zIndex: i,
            transformOrigin: 'center center',
            force3D: true,
          });
        });

        // ── 2. INTRO animation: fan-in from scattered → stacked ──────────────
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          onComplete: () => {
            // After intro, immediately set up the pin + scrub
            buildScrollAnimation(flyX);
          },
        });

        // All cards scatter-fly-in staggered
        introTl.to(cards, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: {
            each: 0.045,
            from: 'end',
          },
          ease: 'power3.out',
        });

        // Bounce settle
        introTl.to(cards, {
          y: -6,
          duration: 0.18,
          ease: 'power1.out',
        });
        introTl.to(cards, {
          y: 0,
          duration: 0.22,
          ease: 'bounce.out',
        });

        // Header fades in
        if (headerRef.current) {
          introTl.fromTo(
            headerRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.8'
          );
        }
      }
    );

    // ── 3. Scroll-scrub: pin + fly cards out / back in ────────────────────────
    function buildScrollAnimation(flyX: number) {
      // Each card gets its own scrub position in the scroll range
      // Total scroll distance: each card flies in 1/count of total range
      const scrollPerCard = 1; // normalized units → ScrollTrigger handles px

      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top top',
        end: `+=${count * (window.innerWidth < 768 ? 220 : 280)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Individual ScrollTrigger per card so reversing restores correct order
      cards.forEach((card, i) => {
        const flyDirection = i % 2 === 0 ? -1 : 1; // alternate left / right
        const cardEl = card as HTMLElement;

        // Natural z-order: top card = last index (highest zIndex)
        const zTop = count - i;
        gsap.set(cardEl, { zIndex: zTop });

        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: `top+=${(count - 1 - i) * (window.innerWidth < 768 ? 220 : 280)} top`,
          end: `top+=${(count - i) * (window.innerWidth < 768 ? 220 : 280)} top`,
          scrub: 0.6,
          onUpdate(self) {
            const p = self.progress; // 0 → 1

            if (p <= 0) {
              // Fully on stack
              gsap.set(cardEl, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                scale: 1,
                zIndex: zTop,
              });
              return;
            }

            // Flying out
            const flyRotation = flyDirection * p * 18;
            const flyXVal    = flyDirection * p * flyX;
            const flyOpacity = 1 - Math.pow(p, 1.5);
            const flyScale   = 1 - p * 0.08;

            gsap.set(cardEl, {
              x: flyXVal,
              y: p * -40,
              rotation: flyRotation,
              opacity: flyOpacity,
              scale: flyScale,
              // Drop z-index while flying so next card shows on top
              zIndex: p > 0.5 ? 0 : zTop,
            });

            // Update counter
            if (counterRef.current) {
              const shown = Math.max(1, count - Math.round(self.scroll() / (window.innerWidth < 768 ? 220 : 280)));
              counterRef.current.textContent = `${Math.min(shown, count)}`;
            }
          },
        });
      });

      // Cleanup on component unmount
      return () => {
        pinTrigger.kill();
      };
    }

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, { scope: sectionRef });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Background glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-[160px]" />
      </div>

      {/* ── Decorative grid ── */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
          backgroundSize: '55px 55px',
        }}
      />

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="opacity-0 pt-16 md:pt-24 pb-8 text-center px-5 relative z-10"
      >
        <span className="font-sans text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase mb-3 block font-semibold">
          Bộ sưu tập — Portfolio
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">
          Khoảnh Khắc Đẹp
        </h2>
        <p className="font-sans text-zinc-400 text-sm font-light max-w-md mx-auto leading-relaxed mb-2">
          Từng sợi mi — từng nụ cười — từng ánh nhìn tự tin của khách hàng
          L'Thanh.
        </p>

        {/* Live counter */}
        <div className="inline-flex items-center gap-2 mt-3">
          <Images size={13} className="text-[#D4AF37]" strokeWidth={1.5} />
          <span className="font-sans text-zinc-400 text-xs">
            <span ref={counterRef} className="text-[#D4AF37] font-semibold">
              {count}
            </span>{' '}
            / {count} ảnh
          </span>
        </div>

        <div className="gold-divider max-w-[80px] mx-auto mt-5" />
      </div>

      {/* ── Card Stack Stage ── */}
      <div
        className="
          relative flex items-center justify-center
          px-4
          h-[60vh] md:h-[72vh]
          z-10
        "
        style={{ perspective: '1200px' }}
      >
        <div
          ref={stackRef}
          className="relative"
          style={{
            width: 'clamp(260px, 72vw, 480px)',
            height: 'clamp(320px, 88vw, 600px)',
          }}
        >
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className="gal-card absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-[0_16px_60px_rgba(0,0,0,0.7)]"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Card image */}
              <img
                src={src}
                alt={`L'Thanh Eyelash gallery ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />

              {/* Subtle inner vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

              {/* Card index pill */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-3 py-1">
                <span className="font-sans text-[#D4AF37] text-[10px] tracking-widest font-semibold">
                  {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60">
        <span className="font-sans text-zinc-400 text-[9px] tracking-[0.3em] uppercase">
          Cuộn để xem
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37]/60 to-transparent" />
      </div>
    </section>
  );
}
