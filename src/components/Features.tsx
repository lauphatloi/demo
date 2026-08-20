import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MousePointer2, Zap, Layers, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: "High Performance",
    description: "Hardware-accelerated animations that run silky smooth at 60fps on any device."
  },
  {
    icon: Layers,
    title: "Seamless Integration",
    description: "Works perfectly with React, Webflow, and any modern web stack."
  },
  {
    icon: Sparkles,
    title: "Endless Possibilities",
    description: "From simple fades to complex physics-based motion, if you can imagine it, you can build it."
  },
  {
    icon: MousePointer2,
    title: "Interactive Experiences",
    description: "Engage users with scroll-triggered storytelling and cursor interactions."
  }
];

export function Features() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.feature-card');
    
    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { 
          y: 100, 
          opacity: 0,
          rotationY: 45,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax background
    gsap.to('.features-bg', {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen py-32 bg-zinc-900 overflow-hidden">
      <div className="features-bg absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Crafted for <span className="text-indigo-400">Creators</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Unleash your creativity with tools designed to build premium, immersive web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
                key={i}
                className="feature-card bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-3xl"
              >
                <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
