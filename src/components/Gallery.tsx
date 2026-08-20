import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const IMAGES = [
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581404100659-1f49635df0dd?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616805096181-799ff2801456?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop"
];

export function Gallery() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!track.current || !container.current) return;

    const sections = gsap.utils.toArray('.gallery-item');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + track.current?.offsetWidth
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="h-screen bg-zinc-950 overflow-hidden flex items-center">
      <div className="w-full pl-8 md:pl-24 mb-12 absolute top-24 z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          Visual Journey
        </h2>
        <p className="text-zinc-400 mt-2 max-w-md">
          Horizontal scrolling opens up new dimensions for storytelling.
        </p>
      </div>

      <div ref={track} className="flex w-[500vw] h-[60vh] mt-24">
        {IMAGES.map((src, i) => (
          <div key={i} className="gallery-item w-screen h-full flex-shrink-0 flex items-center justify-center px-4 md:px-24">
            <div className="relative w-full max-w-5xl h-full rounded-2xl overflow-hidden group">
              <img 
                src={src} 
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <h3 className="text-3xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Concept {i + 1}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
