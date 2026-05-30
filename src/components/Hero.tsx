"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";

const ROLES = [
  "AI / ML ENTHUSIAST",
  "FULL-STACK DEVELOPER",
  "JAVA DEVELOPER",
  "OPEN SOURCE BUILDER",
  "CS STUDENT",
];

import { useState, useEffect } from "react";

interface Star { id: number; x: number; y: number; size: number; delay: number; duration: number; }

export default function Hero() {
  const { theme } = useTheme();
  const isPro = theme === "pro";
  const [stars, setStars] = useState<Star[]>([]);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--gba-black)" }}
    >
      {/* ── Stars ── */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Background radial glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "900px", height: "900px", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)" }} />
        <div className="absolute top-0 right-0"
          style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* ── CRT Overlay ── */}
      <div className="crt-overlay pointer-events-none" />

      {/* ── Main hero content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 text-center w-full">

        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <span className="hud-element font-pixel text-[8px]">
            {isPro ? "✦ AI & FULL-STACK DEVELOPER ✦" : "✦ DEVELOPER.EXE — V1.0.0 ✦"}
          </span>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center mb-10"
        >
          <div
            className="relative float-animation"
            style={{ width: "140px", height: "140px" }}
          >
            <div
              className="absolute -inset-2 rounded-full glow-box-purple"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(0,245,255,0.2))", borderRadius: "50%", filter: "blur(8px)" }}
            />
            <div
              className="relative overflow-hidden border-4 border-gba-purple"
              style={{
                width: "140px", height: "140px",
                borderRadius: isPro ? "50%" : "8px",
                transition: "border-radius 0.4s ease",
              }}
            >
              <Image src="/avatar.png" alt="Ishan Motghare" fill sizes="140px" style={{ objectFit: "cover" }} priority />
            </div>
            {!isPro && (
              <div className="absolute -bottom-2 -right-2 hud-element font-pixel text-[7px] text-gba-gold">LVL 2</div>
            )}
          </div>
        </motion.div>

        {/* Player label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-pixel text-[8px] text-gba-text-dim mb-4 tracking-widest"
        >
          {isPro ? "HELLO, I'M" : "▶ PLAYER ONE"}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-pixel leading-snug mb-6"
        >
          <span className="block text-3xl md:text-5xl text-white">ISHAN</span>
          <span className="block text-3xl md:text-5xl gradient-text-cyan-purple mt-2">MOTGHARE</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mb-10"
          style={{ minHeight: "32px" }}
        >
          <span className="font-pixel text-[9px] text-gba-green glow-green">{displayed}</span>
          <span
            className="inline-block bg-gba-green"
            style={{ width: "9px", height: "18px", animation: "blink 1s steps(1) infinite" }}
          />
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["CS STUDENT", "INDIA 🇮🇳", "OPEN TO WORK"].map((tag) => (
            <span key={tag} className="hud-element font-pixel text-[7px]">{tag}</span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-5 mb-16"
        >
          <a href="#projects" id="hero-cta-projects" className="pixel-btn pixel-btn-purple text-[8px] px-8 py-4">
            {isPro ? "VIEW PROJECTS →" : "▶ START QUEST"}
          </a>
          <a
            href="/resume.pdf"
            download
            id="hero-cta-resume"
            className="pixel-btn pixel-btn-gold text-[8px] px-8 py-4"
          >
            {isPro ? "⬇ DOWNLOAD RESUME" : "💾 SAVE FILE"}
          </a>
          <a href="#contact" id="hero-cta-contact" className="pixel-btn text-[8px] px-8 py-4">
            {isPro ? "GET IN TOUCH" : "⚡ CONTACT"}
          </a>
        </motion.div>

        {/* EXP bar – GBA only */}
        {!isPro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="max-w-sm mx-auto"
          >
            <div className="flex justify-between mb-2">
              <span className="font-pixel text-[6px] text-gba-text-dim">EXP</span>
              <span className="font-pixel text-[6px] text-gba-gold">2840 / 5000</span>
            </div>
            <div className="stat-bar-track">
              <motion.div
                className="stat-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: "56.8%" }}
                transition={{ delay: 1.3, duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ background: "linear-gradient(90deg, var(--gba-gold), #ff8c00)" }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Pixel landscape ── */}
      {!isPro && (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <path d="M0,80 L60,60 L120,75 L200,45 L280,65 L360,30 L440,55 L520,40 L600,70 L680,35 L760,60 L840,25 L920,55 L1000,45 L1080,70 L1160,40 L1240,60 L1320,50 L1440,65 L1440,120 L0,120 Z"
              fill="rgba(139,92,246,0.25)" />
            <path d="M0,95 L80,80 L160,88 L260,72 L360,85 L460,75 L560,90 L680,78 L780,92 L880,80 L1000,88 L1100,76 L1200,90 L1320,82 L1440,90 L1440,120 L0,120 Z"
              fill="rgba(0,245,255,0.15)" />
          </svg>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-pixel text-[6px] text-gba-text-dim">SCROLL ↓</span>
      </motion.div>
    </section>
  );
}
