/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Volume2, 
  VolumeX, 
  Send,
  Star,
  Baby,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Constants ---
const THEME = {
  sage: '#a3b18a',
  cream: '#f5efe6', // Matched to the warm beige of the watercolor image
  brown: '#7f5539',
  brownDark: '#432818',
  gold: '#d4af37'
};

const BIRTHDAY_DETAILS = {
  babyName: "Gia An (Anya)",
  hostNames: "Ba Tú & Mẹ Như",
  date: "Thứ 7, ngày 23 tháng 5 năm 2026",
  time: "18:00",
  location: "Tại Nhà Hàng: Noire Dining & Cafe",
  address: "1Bis Phạm Ngọc Thạch, Phường Sài Gòn, TP HCM",
  mapsUrl: "https://www.google.com/maps/place/NOIRE+Dining+%26+Cafe+-+Ph%E1%BA%A1m+Ng%E1%BB%8Dc+Th%E1%BA%A1ch/@10.7814575,106.6970005,14z/data=!4m10!1m2!2m1!1zVOG6oWkgbmjDoCBow6BuZyBOb2lyZSBEaW5pbmcgJiBDYWZl!3m6!1s0x31752fd9f37729af:0xd5b4d8ba77b6de99!8m2!3d10.7814575!4d106.6970005!15sCiRU4bqhaSBuaMOgIGjDoG5nIE5vaXJlIERpbmluZyAmIENhZmVaJiIkdOG6oWkgbmjDoCBow6BuZyBub2lyZSBkaW5pbmcgJiBjYWZlkgEKcmVzdGF1cmFudJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQydDNkMUpZUmtaWFJ6bE9WV3BqZVZOcWJGbGFSVkpYVVc1YVRsWnNSUkFC4AEA-gEECAAQOQ!16s%2Fg%2F11xkvlndh2?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
};

// --- Components ---

const FloatingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-sage opacity-30"
          initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Star size={16 + Math.random() * 10} />
        </motion.div>
      ))}
    </div>
  );
};

const FallingElements = () => {
  const [elements, setElements] = useState<{id: number, left: string, size: number, delay: number, duration: number, isStar: boolean, xOffset: number}[]>([]);
  
  useEffect(() => {
    // Generate falling elements only on mount to prevent hydration mismatch
    setElements([...Array(20)].map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      size: 10 + Math.random() * 20,
      delay: Math.random() * -20, // Negative delay so they start immediately at different points
      duration: 15 + Math.random() * 20,
      isStar: Math.random() > 0.5,
      xOffset: (Math.random() - 0.5) * 100
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute opacity-20"
          style={{ top: -50, left: el.left, color: Math.random() > 0.5 ? THEME.sage : THEME.brown }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360],
            x: [0, el.xOffset, 0]
          }}
          transition={{
            y: { duration: el.duration, repeat: Infinity, ease: "linear", delay: el.delay },
            rotate: { duration: el.duration * 0.8, repeat: Infinity, ease: "linear" },
            x: { duration: el.duration * 0.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
        >
          {el.isStar ? <Star size={el.size} fill="currentColor" /> : <div className="rounded-full bg-current" style={{ width: el.size, height: el.size }} />}
        </motion.div>
      ))}
    </div>
  );
};

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    className="relative z-10"
  >
    {children}
  </motion.div>
);

const Envelope = ({ onOpen }: { onOpen: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sage/10 px-4 relative overflow-hidden">
      <motion.div 
        className="relative cursor-pointer group mt-10"
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Teddy SVG jumping out of envelope */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none z-0"
          animate={{
            y: [20, 20, -115, -115, 20, 20],
            opacity: 1
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            times: [0, 0.2, 0.4, 0.7, 0.9, 1],
            ease: "easeInOut"
          }}
        >
          <motion.svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-xl z-0" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: [0, 0, 6, -6, 6, -6, 0, 0] }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              times: [0, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 1],
              ease: "easeInOut" 
            }}
          >
            <g transform="translate(50, 50)">
              {/* Ears */}
              <circle cx="-20" cy="-22" r="10" fill="#B07D62" />
              <circle cx="20" cy="-22" r="10" fill="#B07D62" />
              <circle cx="-20" cy="-22" r="5" fill="#E2B497" />
              <circle cx="20" cy="-22" r="5" fill="#E2B497" />

              {/* Arms */}
              <g transform="translate(-25, 10) rotate(30)">
                 <rect x="-8" y="-5" width="16" height="30" rx="8" fill="#B07D62" />
              </g>
              <g transform="translate(25, 10) rotate(-30)">
                 <rect x="-8" y="-5" width="16" height="30" rx="8" fill="#B07D62" />
              </g>

              {/* Head */}
              <circle cx="0" cy="0" r="28" fill="#C1835D" />

              {/* Snout */}
              <circle cx="0" cy="10" r="12" fill="#F4D3B8" />
              {/* Nose */}
              <ellipse cx="0" cy="5" rx="5" ry="3.5" fill="#4A3B32" />
              {/* Mouth */}
              <path d="M -4 11 Q 0 15 4 11" stroke="#4A3B32" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Eyes */}
              <motion.circle 
                cx="-10" cy="-4" r="3.5" fill="#4A3B32"
                style={{ originX: "50%", originY: "50%" }}
                animate={{ scaleY: [1, 0.1, 1, 1, 1] }} 
                transition={{ repeat: Infinity, duration: 3, delay: 1 }} 
              />
              <motion.circle 
                cx="10" cy="-4" r="3.5" fill="#4A3B32"
                style={{ originX: "50%", originY: "50%" }}
                animate={{ scaleY: [1, 0.1, 1, 1, 1] }} 
                transition={{ repeat: Infinity, duration: 3, delay: 1 }} 
              />

              {/* Cheeks */}
              <circle cx="-16" cy="6" r="4" fill="#FFB7B2" opacity="0.6" />
              <circle cx="16" cy="6" r="4" fill="#FFB7B2" opacity="0.6" />
            </g>
          </motion.svg>
        </motion.div>

        {/* Envelope Body */}
        <div className="relative w-80 h-56 bg-cream border-2 border-sage/40 rounded-lg shadow-xl overflow-hidden flex items-center justify-center z-10">
          {/* Flap */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-sage origin-top z-10 opacity-90 shadow-sm"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            animate={{ rotateX: isHovered ? -30 : 0 }}
          />
          
          <div className="text-center p-6 z-20 pt-10">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="text-sage w-10 h-10 mx-auto mb-2 fill-sage/20" />
            </motion.div>
            <h2 className="font-serif text-xl text-brown mb-1 tracking-wide">THƯ MỜI</h2>
            <div className="w-12 h-px bg-sage mx-auto mb-2" />
            <p className="text-sage-dark text-sm font-medium">Bé Gia An ( Anya ) Tròn 1 Tuổi</p>
          </div>

          {/* Envelope Bottom fold visual */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-sage-light/50" 
               style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }} />
        </div>

        {/* Guest Label Tag */}
        <motion.div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white px-6 py-2 shadow-lg rounded-full border border-sage/30 whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xs text-sage uppercase tracking-[0.2em] font-bold">Thân mời gia đình anh chị</span>
        </motion.div>

        {/* Hint text */}
        <motion.p
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-brown/60 text-xs italic whitespace-nowrap"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Chạm vào thư để mở nhé !
        </motion.p>
      </motion.div>
    </div>
  );
};

const RSVPSection = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div id="rsvp" className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-brown/10 relative overflow-hidden">
      <motion.div 
         className="absolute -top-10 -right-10 w-40 h-40 bg-sage/10 rounded-full blur-3xl pointer-events-none"
         animate={{ scale: [1, 1.2, 1] }}
         transition={{ repeat: Infinity, duration: 6 }}
      />
      <h3 className="font-serif text-3xl md:text-4xl text-brown text-center mb-8">Xác Nhận Tham Dự</h3>
      
      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <Heart className="w-16 h-16 text-sage mx-auto mb-4 fill-sage/10" />
          <p className="text-brown text-lg font-serif">Cảm ơn bạn đã phản hồi!</p>
          <p className="text-brown-dark/70 text-sm mt-2">Hẹn gặp bạn tại buổi tiệc của Anya.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs uppercase tracking-widest text-brown/70 font-bold mb-2 ml-1">Tên của bạn</label>
            <input 
              required
              className="w-full bg-white/50 border border-brown/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-transparent transition-all text-brown placeholder:text-brown/40"
              placeholder="Nhập họ và tên..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-brown/70 font-bold mb-2 ml-1">Số lượng người lớn</label>
              <input 
                type="number" 
                min="1"
                required
                className="w-full bg-white/50 border border-brown/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all text-brown"
                defaultValue="1"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-brown/70 font-bold mb-2 ml-1">Số lượng trẻ em</label>
              <input 
                type="number" 
                min="0"
                className="w-full bg-white/50 border border-brown/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all text-brown"
                defaultValue="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-brown/70 font-bold mb-2 ml-1">Lời chúc cho bé</label>
            <textarea 
              className="w-full bg-white/50 border border-brown/20 rounded-2xl px-5 py-4 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all text-brown placeholder:text-brown/40"
              placeholder="Gửi gắm yêu thương đến Teddy..."
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-sage hover:bg-[#8f9d78] text-white rounded-2xl py-4 font-bold tracking-[0.2em] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-md mt-4"
          >
            {status === 'submitting' ? 'ĐANG GỬI...' : (
              <>XÁC NHẬN <Send size={16} /></>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch((e) => console.log("Auto-play prevented (user needs to click play button)"));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch((e) => console.log("Play failed", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    if (isOpened) {
      // Confetti effect
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [THEME.sage, THEME.brown, THEME.gold, THEME.cream]
      });
    }
  }, [isOpened]);

  return (
    <div className="relative min-h-screen bg-[#f5efe6] select-none overflow-x-hidden font-sans text-brown">
      {/* Background Audio Placeholder */}
      <audio 
        ref={audioRef}
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3" // Smooth Piano
      />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
            transition={{ duration: 0.8 }}
          >
            <Envelope onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Continuous Smooth Falling Background Effects */}
            <FallingElements />

            {/* Music Toggle */}
            <motion.button
              onClick={toggleMusic}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/60 border border-sage/50 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMusicPlaying ? <Volume2 className="text-sage" size={20} /> : <VolumeX className="text-brown/50" size={20} />}
              {isMusicPlaying && (
                 <motion.div 
                    className="absolute -top-1 -right-1 bg-sage w-3 h-3 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                 />
              )}
            </motion.button>

            {/* Main Content Area */}
            <div className="w-full max-w-md mx-auto relative z-10 pb-20">
              
              {/* SECTION: Hero Card (Using provided image) */}
              <ScrollReveal delay={0}>
                <div className="relative w-full aspect-[9/16] sm:aspect-[4/5] sm:mt-10 sm:rounded-[3rem] overflow-hidden shadow-xl border-4 border-white/40">
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'url("https://i.pinimg.com/webp85/736x/31/42/49/314249d53e0716e3896f80853dc274ff.webp")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center text-center px-8 pt-[22%] pb-12 h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="space-y-8 tracking-wider mt-auto" // Added mt-auto to gently push text slightly down, matching original layout
                    >
                      <div>
                        <p className="font-serif text-2xl text-brown-dark mb-2 opacity-90">Thân mời</p>
                        <p className="font-serif text-brown-dark tracking-widest opacity-60">...........................</p>
                      </div>

                      <motion.div 
                        className="space-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      >
                        <p className="font-serif text-[1.35rem] md:text-2xl text-brown-dark leading-relaxed font-medium">
                          Đến dự buổi tiệc thân mật<br />mừng bé tròn 1 tuổi
                        </p>
                      </motion.div>

                      <motion.div 
                        className="space-y-1 py-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                      >
                        <p className="font-serif text-[1.3rem] text-[#bdae9c] tracking-widest mb-1">Thứ 7</p>
                        <div className="flex items-center justify-center gap-3 font-serif text-[2.2rem] text-[#865d36] font-normal tracking-wide">
                          <span>18:00</span>
                          <span className="font-light text-[2.2rem] text-[#865d36] opacity-70 -translate-y-1">|</span>
                          <span>23</span>
                          <span className="font-light text-[2.2rem] text-[#865d36] opacity-70 -translate-y-1">|</span>
                          <span>2026</span>
                        </div>
                        <p className="font-serif text-[1.3rem] text-[#bdae9c] tracking-widest mt-1">Tháng 5</p>
                      </motion.div>

                      <motion.div 
                        className="space-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                      >
                        <p className="font-serif text-[1.1rem] md:text-xl text-brown-dark leading-snug">
                          Tại Nhà Hàng :<br />Noire Dining & Cafe
                        </p>
                      </motion.div>

                      <motion.div 
                        className="pb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.1, duration: 1 }}
                      >
                        <p className="font-serif text-base text-brown-dark/80 leading-relaxed max-w-[260px] mx-auto">
                          1Bis Phạm Ngọc Thạch,<br />Phường Sài Gòn, TP HCM
                        </p>
                      </motion.div>

                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Space block */}
              <div className="h-16" />

              {/* SECTION: Lời Ngỏ & Cảm Nghĩ */}
              <ScrollReveal>
                <section className="px-6 space-y-8">
                  <div className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-[2.5rem] text-center space-y-4 shadow-sm relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <Baby size={64} />
                    </div>
                    
                    <h3 className="text-xs uppercase tracking-[0.3em] text-sage font-bold">LỜI NGỎ</h3>
                    <p className="font-serif text-xl text-brown leading-relaxed px-4">
                      Sự hiện diện của bạn là niềm vui lớn nhất cho {BIRTHDAY_DETAILS.babyName} và gia đình chúng tôi trong ngày đặc biệt này.
                    </p>
                    <p className="text-sage italic font-serif text-lg pt-2">— {BIRTHDAY_DETAILS.hostNames}</p>
                  </div>

                  <div className="flex justify-center items-center gap-4 py-8">
                     <div className="h-px w-12 bg-brown/20" />
                     <Heart className="text-sage fill-sage/20 w-6 h-6" />
                     <div className="h-px w-12 bg-brown/20" />
                  </div>
                </section>
              </ScrollReveal>

              {/* SECTION: Map Link Button directly under the thought to match flow */}
              <ScrollReveal>
                 <div className="px-6 text-center">
                    <button 
                      onClick={() => setIsMapOpen(true)}
                      className="inline-flex items-center justify-center w-full gap-3 px-8 py-5 bg-white/60 hover:bg-white/90 border border-brown/10 text-brown rounded-[2rem] text-sm font-bold uppercase tracking-[0.2em] transition-all shadow-sm backdrop-blur-sm group cursor-pointer"
                    >
                      Bản đồ chỉ đường <MapPin size={18} className="text-sage group-hover:scale-110 transition-transform" />
                    </button>
                 </div>
              </ScrollReveal>

              {/* Map Modal */}
              <AnimatePresence>
                {isMapOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brown-dark/40 backdrop-blur-sm"
                    onClick={() => setIsMapOpen(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      className="w-full max-w-lg bg-cream rounded-3xl overflow-hidden shadow-2xl relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 bg-sage text-white flex justify-between items-center">
                        <h3 className="font-serif text-xl tracking-wide">Địa Chỉ Nhà Hàng</h3>
                        <button 
                          onClick={() => setIsMapOpen(false)}
                          className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="h-[50vh] w-full">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          scrolling="no" 
                          marginHeight={0} 
                          marginWidth={0} 
                          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=36%20Tr%E1%BA%A7n%20Qu%C3%BD%20C%C3%A1p,%20Ph%C6%B0%E1%BB%9Dng%2011,%20B%C3%ACnh%20Th%E1%BA%A1nh,%20HCM&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <a 
                          href={BIRTHDAY_DETAILS.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-brown/10 text-brown rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brown/20 transition-colors"
                        >
                          MỞ TRONG APP MAPS <MapPin size={14} />
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Space block */}
              <div className="h-12" />

              {/* SECTION: Timeline (Chương trình tiệc) */}
              <ScrollReveal>
                <section className="px-6">
                  <div className="bg-white/50 backdrop-blur-md rounded-[3rem] p-10 border border-white focus:outline-none shadow-sm relative">
                    <div className="absolute top-8 right-8 text-sage/10 pointer-events-none">
                      <Clock size={48} />
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-brown text-center mb-10">Chương Trình</h3>
                    
                    <div className="space-y-8 relative">
                      {/* Timeline Line */}
                      <div className="absolute left-[13px] top-2 bottom-6 w-px bg-sage/30 hidden md:block" />
                      
                      {[
                        { time: "18:00", title: "Đón khách", desc: "Chụp hình lưu niệm cùng bé và gia đình" },
                        { time: "19:00", title: "Khai tiệc", desc: "Nghi thức cắt bánh và chúc mừng sinh nhật" },
                        { time: "20:30", title: "Cảm ơn", desc: "Tặng quà lưu niệm và kết thúc chương trình" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-5 items-start relative group">
                          {/* Dot */}
                          <div className="w-7 h-7 rounded-full bg-sage flex-shrink-0 flex items-center justify-center z-10 text-white shadow-sm ring-4 ring-white group-hover:scale-110 transition-transform ml-0 md:ml-0">
                            <Star size={10} fill="currentColor" />
                          </div>
                          <div className="pt-0.5">
                            <span className="text-sage font-bold text-sm tracking-[0.2em] px-2 py-1 bg-sage/10 rounded-full">{item.time}</span>
                            <h4 className="font-serif text-2xl text-brown-dark mt-3">{item.title}</h4>
                            <p className="text-brown/70 text-base mt-2 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Space block */}
              <div className="h-16" />

              {/* SECTION: RSVP Form */}
              <ScrollReveal>
                <div className="px-6">
                  <RSVPSection />
                </div>
              </ScrollReveal>

              {/* SECTION: Footer */}
              <ScrollReveal>
                <footer className="text-center space-y-6 pt-16">
                  <div className="w-20 h-px bg-brown/20 mx-auto" />
                  <p className="font-serif text-3xl text-brown italic">Cảm ơn & Hẹn gặp lại!</p>
                  <div className="flex justify-center gap-2 pb-8">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      >
                        <Heart className="text-sage/40 fill-sage/20 w-5 h-5" />
                      </motion.div>
                    ))}
                  </div>
                </footer>
              </ScrollReveal>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

