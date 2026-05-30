"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";

const STATS = [
  { label: "JAVA",          pro: "Java",            pct: 82, color: "var(--gba-gold)" },
  { label: "FULL-STACK",    pro: "Full-Stack Dev",  pct: 68, color: "var(--gba-cyan)" },
  { label: "HTML/CSS/JS",   pro: "HTML · CSS · JS", pct: 78, color: "var(--gba-green)" },
  { label: "AI CONCEPTS",   pro: "AI / ML Basics",  pct: 55, color: "var(--gba-purple-bright)" },
  { label: "DATABASES",     pro: "Databases",       pct: 65, color: "var(--gba-pink)" },
  { label: "PROBLEM SOLVE", pro: "DSA & Problem Solving", pct: 72, color: "var(--gba-gold)" },
];

const ACHIEVEMENTS = [
  { icon: "🎯", title: "Built real-world Android project",    sub: "India News App — live RSS aggregator" },
  { icon: "🌐", title: "Mastered Full-Stack fundamentals",    sub: "React, Node, REST APIs, SQL" },
  { icon: "🤖", title: "Exploring AI & Cloud systems",        sub: "Actively learning ML + cloud computing" },
  { icon: "🚀", title: "GitHub-first development approach",   sub: "Every project version-controlled" },
];

export default function About() {
  const { theme } = useTheme();
  const isPro = theme === "pro";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filledOnce, setFilledOnce] = useState(false);
  if (inView && !filledOnce) setFilledOnce(true);

  return (
    <section id="about" className="relative py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "var(--gba-black)" }}>
        <div className="noise-overlay" />
        <div className="absolute top-0 left-0 pointer-events-none"
          style={{ width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10" ref={ref}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-tag">{isPro ? "// ABOUT ME" : "// PLAYER PROFILE"}</span>
          <h2 className="font-pixel text-2xl md:text-3xl text-white mt-3">
            {isPro ? "MY " : "CHARACTER "}<span className="gradient-text-cyan-purple">{isPro ? "STORY" : "STATUS"}</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Bio + Achievements ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Avatar + bio card */}
            <div className="pixel-panel p-8">
              <p className="font-pixel text-[8px] text-gba-cyan mb-6">
                {isPro ? "▸ BIO" : "▶ PLAYER BIO"}
              </p>
              <div className="flex gap-6 items-start mb-6">
                <div className="flex-shrink-0">
                  <div
                    className="overflow-hidden border-2 border-gba-purple"
                    style={{
                      width: "80px", height: "80px",
                      borderRadius: isPro ? "50%" : "4px",
                      transition: "border-radius 0.4s ease",
                    }}
                  >
                    <Image src="/avatar.png" alt="Ishan" width={80} height={80} style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div>
                  <p className="font-pixel text-[8px] text-white mb-1">ISHAN MOTGHARE</p>
                  <p className="font-body text-sm text-gba-text-dim">CS Student · India 🇮🇳</p>
                  <p className="font-body text-sm text-gba-text-dim">Aspiring AI / Full-Stack Dev</p>
                </div>
              </div>
              <p className="font-body text-base leading-relaxed text-gba-text">
                I&apos;m a Computer Science student from India who loves building things — apps, systems,
                and ideas. My journey started with Java and DSA, expanded into web development, and is
                now converging on AI and cloud computing. I&apos;m driven by curiosity, fueled by real-world projects,
                and aiming for internships where I can contribute meaningfully.
              </p>
            </div>

            {/* Character info */}
            <div className="pixel-panel p-8">
              <p className="font-pixel text-[8px] text-gba-gold mb-6">
                {isPro ? "▸ DETAILS" : "▶ PLAYER INFO"}
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { k: isPro ? "ROLE" : "CLASS",  v: "CS STUDENT" },
                  { k: isPro ? "LEVEL" : "LVL",   v: isPro ? "UNDERGRAD" : "2" },
                  { k: isPro ? "LOCATION" : "REGION", v: "INDIA 🇮🇳" },
                  { k: isPro ? "FOCUS" : "GOAL",   v: "INTERNSHIP" },
                  { k: isPro ? "LANGUAGES" : "LANG", v: "JAVA / JS" },
                  { k: isPro ? "STATUS" : "STATUS",  v: "OPEN TO WORK" },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col gap-1">
                    <span className="font-pixel text-[6px] text-gba-text-dim">{row.k}</span>
                    <span className="font-pixel text-[7px] text-gba-cyan">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="pixel-panel p-8">
              <p className="font-pixel text-[8px] text-gba-green mb-6">
                {isPro ? "▸ HIGHLIGHTS" : "▶ ACHIEVEMENTS UNLOCKED"}
              </p>
              <div className="space-y-5">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.title} className="flex gap-4 items-start">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{a.icon}</span>
                    <div>
                      <p className="font-pixel text-[7px] text-white leading-relaxed">{a.title}</p>
                      <p className="font-body text-sm text-gba-text-dim mt-1">{a.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Stat bars ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="pixel-panel p-8 sticky top-24">
              <p className="font-pixel text-[8px] text-gba-purple-bright mb-8">
                {isPro ? "▸ SKILL METRICS" : "▶ BASE STATS"}
              </p>

              <div className="space-y-7">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-pixel text-[7px] text-gba-text">{isPro ? s.pro : s.label}</span>
                      <span className="font-pixel text-[7px]" style={{ color: s.color }}>{s.pct}%</span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: filledOnce ? `${s.pct}%` : "0%",
                          background: `linear-gradient(90deg, ${s.color}, ${s.color}bb)`,
                          transition: `width 1.6s ${i * 0.1}s cubic-bezier(0.4, 0, 0.2, 1)`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-10 pt-8 border-t border-gba-border">
                <p className="font-body text-base text-gba-text-dim italic leading-relaxed">
                  &ldquo;I don&apos;t wait for perfect conditions — I ship, learn, and improve.&rdquo;
                </p>
                <p className="font-pixel text-[7px] text-gba-cyan mt-3">— ISHAN MOTGHARE</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
