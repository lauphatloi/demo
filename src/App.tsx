/**
 * App.tsx — Root component
 * Initializes Lenis smooth scroll synchronized with GSAP ScrollTrigger.
 */

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Academy from './components/Academy';
import Criteria from './components/Criteria';
import Feedback from './components/Feedback';
import ImageGallery from './components/ImageGallery';
import News from './components/News';
import BookingForm from './components/BookingForm';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile Safari address bar resize events from glitching pinned triggers
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  useEffect(() => {
    // ─── Lenis Smooth Scroll Setup ──────────────────────────────────────────
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: false,
    });

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP's ticker for zero jitter and 60fps scrollytelling
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after assets/fonts load to ensure accurate heights
    const onLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', onLoad);

    // Debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      window.removeEventListener('load', onLoad);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      className="bg-black text-white min-h-screen relative"
      style={{ overflowX: 'clip' }}
    >
      {/* Luxury gold cursor (desktop only) */}
      <CustomCursor />

      {/* Navbar — sticky / fixed on top */}
      <Navbar />

      {/* Main content sits above fixed footer */}
      <main
        className="relative z-10 bg-black"
        style={{
          marginBottom: 'clamp(320px, 48vh, 520px)',
          boxShadow: '0 30px 100px rgba(0,0,0,1)',
        }}
      >
        <Hero />
        <About />
        <Services />
        <Academy />
        <Criteria />
        <Feedback />
        <ImageGallery />
        <News />
        <BookingForm />
      </main>

      {/* Footer — fixed at bottom, uncovered as main scrolls off */}
      <Footer />

      {/* Floating Action Buttons (Zalo & Book Now) */}
      <FloatingActions />
    </div>
  );
}
