"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type QuestStatus = "completed" | "active" | "locked";
interface Milestone { year: string; title: string; proTitle: string; desc: string; tags: string[]; status: QuestStatus; icon: string; }

const MILESTONES: Milestone[] = [
  {
    year: "2022", icon: "🎮",
    title: "ADVENTURE BEGINS", proTitle: "CS ENROLLED",
    desc: "Enrolled in Computer Science. First steps into the digital world — learning the fundamentals of programming, discrete math, and problem-solving logic.",
    tags: ["CS ENROLLED", "PROGRAMMING BASICS", "MATH FOUNDATION"],
    status: "completed",
  },
  {
    year: "2023", icon: "☕",
    title: "JAVA WARRIOR UNLOCKED", proTitle: "JAVA MASTERY",
    desc: "Dived deep into Java — mastered OOP concepts, inheritance, polymorphism, recursion, and built first command-line projects. Became comfortable with structured programming.",
    tags: ["JAVA", "OOP", "RECURSION", "DSA BASICS"],
    status: "completed",
  },
  {
    year: "2024", icon: "🌐",
    title: "WEB REALMS DISCOVERED", proTitle: "WEB DEVELOPMENT",
    desc: "Expanded into the web frontier. Learned HTML, CSS, and JavaScript from scratch. Built first interactive web pages and launched on GitHub — the portfolio journey started here.",
    tags: ["HTML / CSS / JS", "FIRST PROJECTS", "GITHUB LAUNCH"],
    status: "completed",
  },
  {
    year: "2025", icon: "🔥",
    title: "FULL-STACK PATH INITIATED", proTitle: "FULL-STACK + ANDROID",
    desc: "Combined frontend creativity with backend logic. Explored databases (SQL/MySQL), REST APIs, and the basics of AI/ML. Built India News App — a real Android app shipped to GitHub.",
    tags: ["FULL-STACK", "AI/ML INTRO", "DATABASE", "INDIA NEWS APP"],
    status: "completed",
  },
  {
    year: "2026", icon: "⚡",
    title: "CURRENT ACTIVE QUEST", proTitle: "CURRENT",
    desc: "Building ambitious real-world projects, crafting this portfolio, growing the GitHub profile, and actively targeting internships in AI, software development, and cloud computing.",
    tags: ["PORTFOLIO BUILD", "INTERNSHIP HUNT", "PROJECT GRIND", "LEVELLING UP"],
    status: "active",
  },
  {
    year: "???", icon: "🏆",
    title: "FIRST INTERNSHIP", proTitle: "TARGET: INTERNSHIP",
    desc: "The ultimate quest — landing a real-world internship in AI, software engineering, or cloud computing. This milestone is loading... ETA: very soon.",
    tags: ["TARGET", "AI", "SOFTWARE ENGINEERING", "CLOUD"],
    status: "locked",
  },
];

export default function Timeline() {
  const { theme } = useTheme();
  const isPro = theme === "pro";

  return (
    <section id="timeline" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gba-black)" }}>
        <div className="noise-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: "700px", height: "700px", background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-tag">{isPro ? "// EXPERIENCE" : "// QUEST LOG"}</span>
          <h2 className="font-pixel text-2xl md:text-3xl text-white mt-3">
            {isPro ? "MY " : "JOURNEY "}<span className="gradient-text-cyan-purple">{isPro ? "JOURNEY" : "PROGRESS"}</span>
          </h2>
          <p className="font-body text-base text-gba-text-dim mt-5 max-w-xl mx-auto">
            {isPro
              ? "A timeline of skills built, projects shipped, and milestones reached."
              : "A chronicle of quests completed, skills unlocked, and milestones reached on the road to becoming a professional developer."}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Track line */}
          <div className="absolute top-0 bottom-0"
            style={{ left: "26px", width: "2px", background: "linear-gradient(180deg, transparent, var(--gba-border) 5%, var(--gba-border) 95%, transparent)" }} />
          {/* Animated fill */}
          <motion.div
            className="absolute top-0"
            style={{ left: "26px", width: "2px", background: "linear-gradient(180deg, var(--gba-cyan), var(--gba-purple) 60%, transparent)", originY: 0 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Items */}
          <div className="space-y-10 pl-20">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute" style={{ left: "-3.15rem", top: "14px" }}>
                  <div className={`quest-dot ${m.status}`} />
                </div>

                {/* Card */}
                <div
                  className="pixel-panel p-8"
                  style={
                    m.status === "active"
                      ? { borderColor: "var(--gba-cyan)", boxShadow: "0 0 20px rgba(0,245,255,0.15), 0 0 50px rgba(0,245,255,0.05)" }
                      : m.status === "locked" ? { opacity: 0.6 } : {}
                  }
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                    <div>
                      <div className="flex items-center gap-4 mb-3 flex-wrap">
                        <span className="text-2xl leading-none">{m.icon}</span>
                        <span className="font-pixel text-[7px] text-gba-text-dim">{m.year}</span>
                        {m.status === "active" && (
                          <span className="font-pixel text-[6px] text-gba-cyan border border-gba-cyan/40 px-2 py-1 press-start-blink"
                            style={{ background: "rgba(0,245,255,0.08)" }}>
                            {isPro ? "CURRENT" : "NOW PLAYING"}
                          </span>
                        )}
                        {m.status === "locked" && (
                          <span className="font-pixel text-[6px] text-gba-text-dim border border-gba-border px-2 py-1">
                            🔒 {isPro ? "UPCOMING" : "LOCKED"}
                          </span>
                        )}
                      </div>
                      <h3 className="font-pixel text-[9px] text-white leading-relaxed">
                        {isPro ? m.proTitle : m.title}
                      </h3>
                    </div>
                    {m.status === "completed" && (
                      <span className="font-pixel text-[6px] text-gba-green border border-gba-green/40 px-3 py-1.5 whitespace-nowrap flex-shrink-0"
                        style={{ background: "rgba(57,255,20,0.08)" }}>
                        ✓ {isPro ? "COMPLETE" : "DONE"}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-base text-gba-text leading-relaxed mb-5">{m.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((tag) => (
                      <span key={tag} className="font-pixel text-[6px] px-3 py-1.5 border border-gba-border text-gba-text-dim bg-gba-dark">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
