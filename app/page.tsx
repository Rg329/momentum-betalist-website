'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Easily customizable screenshot paths. Place these files in your /public directory.
const SCREENSHOTS = [
  {
    id: 'build',
    src: '/screenshot-build.jpg', // Screenshot 2
    alt: 'Momentum AI - Building Schedule',
  },
  {
    id: 'focus',
    src: '/screenshot-focus.jpg', // Screenshot 3
    alt: 'Momentum AI - Focus Dashboard',
  },
  {
    id: 'insights',
    src: '/screenshot-insights.jpg', // Screenshot 1
    alt: 'Momentum AI - Insights Dashboard',
  },
];

export default function HeroPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Smooth mouse-move parallax coordinates
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale mouse position to tiny fractional ranges (-1 to 1) for minimal performance impact
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cycle slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SCREENSHOTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // If input is completely empty, redirect directly to Tally form
    if (!email.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        window.open('https://tally.so/r/jagpRY', '_blank', 'noopener,noreferrer');
        setIsLoading(false);
      }, 600);
      return;
    }

    // Basic high-standard email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // Valid email flow: Prefill using Tally URL parameter logic
    setIsLoading(true);
    setTimeout(() => {
      const targetUrl = `https://tally.so/r/jagpRY?email=${encodeURIComponent(email.trim())}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setIsLoading(false);
    }, 600);
  };

  // Styled SVG Icons
  const SparklesIcon = () => (
    <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  );

  // Animation Sequences
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#020203] text-neutral-100 overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col justify-between">
      
      {/* Ambient Radial Background Glows (Driven gently by Parallax) */}
      <motion.div 
        style={{
          x: mousePosition.x * -12,
          y: mousePosition.y * -12,
        }}
        className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-950/30 to-purple-950/5 blur-[150px] pointer-events-none" 
      />
      <motion.div 
        style={{
          x: mousePosition.x * 12,
          y: mousePosition.y * 12,
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] rounded-full bg-gradient-to-bl from-violet-950/20 to-fuchsia-950/5 blur-[160px] pointer-events-none" 
      />

      {/* Header */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-6 md:py-8 flex items-center justify-between">
        
        {/* Logo Container with your exact brand geometric logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.05]">
            <svg className="w-full h-full text-blue-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Chevron / V Shape */}
              <path
                d="M 22 26 C 22 24.5 23.5 24 25 24 H 35 C 36.5 24 37.5 24.5 38 25.5 L 50 45.5 L 62 25.5 C 62.5 24.5 63.5 24 65 24 H 75 C 76.5 24 78 24.5 78 26 C 78 27.2 77.5 28 76.8 29 L 52.2 63.2 C 51.2 64.6 48.8 64.6 47.8 63.2 L 23.2 29 C 22.5 28 22 27.2 22 26 Z"
                fill="currentColor"
              />
              {/* Left Column Pillar */}
              <path
                d="M 22 43 C 22 41.5 23.2 41 24.2 41.8 L 34.8 51.2 C 35.5 51.8 36 52.8 36 54 V 71 C 36 73.2 34.2 75 32 75 H 26 C 23.8 75 22 73.2 22 71 Z"
                fill="currentColor"
              />
              {/* Right Column Pillar */}
              <path
                d="M 64 54 C 64 52.8 64.5 51.8 65.2 51.2 L 75.8 41.8 C 76.8 41 78 41.5 78 43 V 71 C 78 73.2 76.2 75 74 75 H 68 C 65.8 75 64 73.2 64 71 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-neutral-200 group-hover:text-white transition-colors duration-200">
            Momentum
          </span>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">BetaList Special</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center flex-1">
        
        {/* Left Column (Content & Action Elements) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col space-y-10 text-left max-w-2xl lg:max-w-none"
        >
          {/* Animated Launching Soon Badge */}
          <motion.div variants={itemVariants} className="inline-flex self-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-950/40 to-purple-950/20 border border-indigo-500/20 backdrop-blur-xl">
              <SparklesIcon />
              <span className="text-[11px] font-bold tracking-widest uppercase bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Dynamic Schedule Optimizer
              </span>
            </div>
          </motion.div>

          {/* Premium Typography Hierarchy */}
          <div className="space-y-6">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-white leading-[1.05]"
            >
              Procrastinated? <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Let AI rebuild your day.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-neutral-400/90 leading-relaxed max-w-xl font-normal tracking-[-0.01em]"
            >
              Momentum is the dynamic productivity coach that detects when you fall behind and instantly restructures your schedule. No guilt. No friction. Just focus.
            </motion.p>
          </div>

          {/* Email Capture Section (Sleek Tally Integration) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col space-y-3 max-w-lg w-full"
          >
            <form 
              onSubmit={handleSubmit}
              className="w-full flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-[20px] bg-neutral-900/30 border border-white/[0.06] backdrop-blur-2xl gap-2 shadow-[0_32px_50px_-20px_rgba(0,0,0,0.8)] focus-within:border-indigo-500/40 focus-within:shadow-[0_0_24px_-4px_rgba(99,102,241,0.15)] transition-all duration-300"
            >
              <input 
                type="text"
                aria-label="Email address"
                placeholder="Enter your email to prefill waitlist..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                disabled={isLoading}
                className="flex-1 bg-transparent px-4 py-3 sm:py-2.5 text-sm text-neutral-100 placeholder-neutral-500/80 focus:outline-none rounded-xl font-normal transition-opacity duration-200 disabled:opacity-50"
              />
              <motion.button 
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="group relative flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-indigo-800 disabled:to-violet-800 text-white font-semibold text-sm px-7 py-3.5 sm:py-3 rounded-[14px] shadow-lg shadow-indigo-600/10 active:scale-[0.98] transition-all duration-200 whitespace-nowrap overflow-hidden"
              >
                {/* Clean hover light sheen */}
                <span className="absolute inset-0 w-full h-full bg-white/5 -translate-x-full skew-x-12 transition-transform duration-1000 group-hover:translate-x-full" />
                
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRightIcon />
                  </>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-xs text-rose-400 font-medium pl-4"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-6 pt-6 border-t border-neutral-900/60"
          >
            <div className="flex -space-x-2.5">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80',
                'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&fit=crop&q=80',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&fit=crop&q=80'
              ].map((src, i) => (
                <img 
                  key={i} 
                  src={src} 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full border-2 border-[#020203] object-cover ring-1 ring-neutral-800/50"
                />
              ))}
            </div>
            <div className="text-xs text-neutral-500 space-y-0.5">
              <p className="font-semibold text-neutral-400">Locked in with 400+ early adopters</p>
              <p className="font-light">Get absolute access to lifetime beta pricing models.</p>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Column (Dynamic Phone Showcase + Parallax) */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          
          {/* Layered glows supporting depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 blur-[120px] rounded-full transform scale-75 -translate-y-8 pointer-events-none" />

          {/* iPhone Chassis with Subtle Parallax Translation */}
          <motion.div 
            style={{
              x: mousePosition.x * 6,
              y: mousePosition.y * 6,
            }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[310px] h-[630px] rounded-[52px] border-[11px] border-neutral-900 bg-neutral-950 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
          >
            {/* Glossy Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none z-30 rounded-[40px]" />

            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-[22px] bg-black rounded-full z-40 flex items-center justify-between px-4">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/60" />
              <div className="w-3.5 h-1 rounded-full bg-neutral-900/60" />
            </div>

            {/* Inner Screen Shell */}
            <div className="relative w-full h-full rounded-[41px] bg-[#0A0A0C] border border-neutral-900/80 flex flex-col justify-between overflow-hidden">
              
              {/* Dynamic Slideshow wrapper */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SCREENSHOTS[activeSlide].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <motion.img 
                      src={SCREENSHOTS[activeSlide].src}
                      alt={SCREENSHOTS[activeSlide].alt}
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

          {/* Premium Glass Floating Card 1 (Parallax Left) */}
          <motion.div 
            style={{
              x: mousePosition.x * -10,
              y: mousePosition.y * -10,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="absolute top-1/4 -left-12 w-[130px] p-4 rounded-2xl bg-neutral-950/70 border border-white/[0.08] backdrop-blur-2xl shadow-2xl hidden md:block cursor-default select-none"
          >
            <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Weekly Goal</p>
            <p className="text-xs font-semibold text-neutral-200 mt-1">85% Clean Days</p>
            <div className="w-full bg-neutral-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full w-[85%]" />
            </div>
          </motion.div>

          {/* Premium Glass Floating Card 2 (Parallax Right) */}
          <motion.div 
            style={{
              x: mousePosition.x * 14,
              y: mousePosition.y * 14,
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="absolute bottom-1/4 -right-10 w-[140px] p-4 rounded-2xl bg-neutral-950/70 border border-white/[0.08] backdrop-blur-2xl shadow-2xl hidden md:block cursor-default select-none"
          >
            <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Guilt-Free Shift</p>
            <p className="text-xs font-semibold text-emerald-400 mt-1">+2 Hours Saved</p>
          </motion.div>

        </div>

      </main>

      {/* Smooth Scroll Indicator */}
      <div className="relative bottom-6 left-0 right-0 flex flex-col items-center gap-2.5 opacity-40 hover:opacity-80 transition-opacity duration-300 pointer-events-none">
        <span className="text-[10px] tracking-[0.18em] font-semibold text-neutral-500 uppercase">Beta Details</span>
        <div className="w-5 h-8 rounded-full border border-neutral-800 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.2 h-1.5 bg-neutral-400 rounded-full"
          />
        </div>
      </div>

    </div>
  );
}