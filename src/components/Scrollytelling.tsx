import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Scrollytelling() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Split text animation manually since we don't have SplitText installed
    if (!textRef.current) return;
    
    const text = textRef.current.innerText;
    textRef.current.innerHTML = '';
    
    const words = text.split(' ');
    words.forEach(word => {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      span.className = 'inline-block opacity-20 transition-opacity duration-300';
      textRef.current?.appendChild(span);
    });

    const spans = textRef.current.querySelectorAll('span');

    gsap.to(spans, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="min-h-screen bg-zinc-900 flex items-center justify-center py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 
          ref={textRef} 
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white"
        >
          Scroll-triggered animations turn passive reading into an engaging interactive experience. 
          Every movement tells a story, guiding the user's eye and creating moments of delight.
        </h2>
      </div>
    </section>
  );
}
