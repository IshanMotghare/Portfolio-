"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type Cat = "ALL" | "FRONTEND" | "BACKEND" | "DATABASE" | "TOOLS" | "AI/CLOUD";

interface Skill {
  name: string; icon: string; level: number; cat: Cat; desc: string;
}

const SKILLS: Skill[] = [
  { name:"Java",              icon:"☕", level:82, cat:"BACKEND",   desc:"OOP · Recursion · Basic DSA & Algorithms" },
  { name:"JavaScript",        icon:"⚡", level:74, cat:"FRONTEND",  desc:"ES6+ · DOM Manipulation · Async/Await" },
  { name:"HTML & CSS",        icon:"🎨", level:85, cat:"FRONTEND",  desc:"Semantic HTML5 · Flexbox · Grid · Responsive Design" },
  { name:"React",             icon:"⚛️", level:65, cat:"FRONTEND",  desc:"Hooks · Components · State Management" },
  { name:"Next.js",           icon:"▲",  level:60, cat:"FRONTEND",  desc:"App Router · SSR · File-based Routing" },
  { name:"Node.js",           icon:"🟢", level:55, cat:"BACKEND",   desc:"REST APIs · Express · Server-side Basics" },
  { name:"MySQL",             icon:"🐬", level:62, cat:"DATABASE",  desc:"SQL Queries · Joins · Relational DB Design" },
  { name:"Git & GitHub",      icon:"🐙", level:80, cat:"TOOLS",    desc:"Version Control · Branching · Open Source" },
  { name:"Android Dev",       icon:"📱", level:68, cat:"TOOLS",    desc:"Java + Android SDK · Retrofit · XML Layouts" },
  { name:"Microsoft Office",  icon:"📊", level:85, cat:"TOOLS",    desc:"Word · Excel · PowerPoint — Professional Productivity" },
  { name:"AI / ML Concepts",  icon:"🤖", level:50, cat:"AI/CLOUD", desc:"ML Basics · Neural Networks · Prompt Engineering" },
];

const CATS: { id: Cat; label: string }[] = [
  { id:"ALL",      label:"ALL" },
  { id:"FRONTEND", label:"FRONTEND" },
  { id:"BACKEND",  label:"BACKEND" },
  { id:"DATABASE", label:"DATABASE" },
  { id:"TOOLS",    label:"TOOLS" },
  { id:"AI/CLOUD", label:"AI & CLOUD" },
];

const CAT_COLOR: Record<Cat, string> = {
  "ALL":      "#2563eb",
  "FRONTEND": "#7c3aed",
  "BACKEND":  "#0369a1",
  "DATABASE": "#0f766e",
  "TOOLS":    "#92400e",
  "AI/CLOUD": "#be185d",
};

export default function Skills() {
  const { theme } = useTheme();
  const isPro = theme === "pro";
  const [active, setActive] = useState<Cat>("ALL");

  const filtered = active === "ALL"
    ? [...SKILLS]
    : SKILLS.filter((s) => s.cat === active);

  return (
    <section id="skills" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gba-dark)" }}>
        <div className="noise-overlay" />
        <div className="absolute bottom-0 right-0 pointer-events-none"
          style={{ width: "600px", height: "600px", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-tag">{isPro ? "// TECHNICAL SKILLS" : "// INVENTORY"}</span>
          <h2 className="font-pixel text-2xl md:text-3xl text-white mt-4">
            {isPro ? "SKILLS & " : "SKILL "}<span className="gradient-text-cyan-purple">{isPro ? "EXPERTISE" : "LOADOUT"}</span>
          </h2>
          <p className="font-body text-base text-gba-text-dim mt-5 max-w-lg mx-auto">
            {isPro
              ? "Technologies, tools, and frameworks I work with — organized by category."
              : "Select a category to filter your inventory. Hover an item to inspect stats."}
          </p>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {CATS.map((c) => (
            <button
              key={c.id}
              id={`skill-filter-${c.id.toLowerCase().replace("/","")}`}
              onClick={() => setActive(c.id)}
              className={`font-pixel text-[7px] px-5 py-3 border transition-all duration-200 ${
                active === c.id
                  ? "border-gba-cyan text-gba-cyan"
                  : "border-gba-border text-gba-text-dim hover:border-gba-purple hover:text-gba-text"
              }`}
              style={{
                background: active === c.id
                  ? isPro ? `${CAT_COLOR[c.id]}15` : "rgba(0,245,255,0.08)"
                  : isPro ? "#ffffff" : "transparent",
                borderColor: active === c.id
                  ? isPro ? CAT_COLOR[c.id] : undefined
                  : isPro ? "#94a3b8" : undefined,
                color: active === c.id
                  ? isPro ? CAT_COLOR[c.id] : undefined
                  : isPro ? "#475569" : undefined,
                borderRadius: isPro ? "8px" : "0",
                boxShadow: isPro ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* ── Skills Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="inventory-item group relative"
              style={isPro ? {
                borderLeft: `4px solid ${CAT_COLOR[skill.cat]}`,
                background: "#ffffff",
              } : {}}
            >
              <div className="p-6 flex flex-col items-center text-center">
                {/* Icon */}
                <div className="text-4xl mb-4">{skill.icon}</div>

                {/* Name */}
                <p className="font-pixel text-[8px] text-white mb-1 leading-snug"
                  style={isPro ? { color: "#0f172a" } : {}}>
                  {skill.name}
                </p>

                {/* Category chip — pro mode only */}
                {isPro && (
                  <span
                    className="mt-1 mb-3 font-pixel text-[6px] px-2 py-0.5"
                    style={{
                      background: `${CAT_COLOR[skill.cat]}15`,
                      color: CAT_COLOR[skill.cat],
                      borderRadius: "4px",
                      border: `1px solid ${CAT_COLOR[skill.cat]}40`,
                    }}
                  >
                    {skill.cat}
                  </span>
                )}

                {/* Level bar */}
                <div className="flex items-center gap-3 w-full mt-2 mb-3">
                  <div className="flex-1 stat-bar-track" style={{ height: "6px" }}>
                    <div
                      className="stat-bar-fill"
                      style={{
                        width: `${skill.level}%`,
                        background: isPro
                          ? `linear-gradient(90deg, ${CAT_COLOR[skill.cat]}, ${CAT_COLOR[skill.cat]}bb)`
                          : "linear-gradient(90deg, var(--gba-cyan), var(--gba-purple))",
                      }}
                    />
                  </div>
                  <span
                    className="font-pixel text-[6px] text-gba-text-dim flex-shrink-0"
                    style={isPro ? { color: "#475569", fontWeight: 700 } : {}}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Desc */}
                <p className="font-body text-xs text-gba-text-dim leading-relaxed text-center"
                  style={isPro ? { color: "#475569" } : {}}>
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Pro mode: skills summary row ── */}
        {isPro && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 p-7 rounded-2xl text-center"
            style={{ background: "#ffffff", border: "1px solid #94a3b8", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >
            <p className="font-pixel text-[9px] mb-2" style={{ color: "#1d4ed8", textAlign: "center" }}>
              ACTIVELY LEARNING & GROWING
            </p>
            <p className="font-body text-sm" style={{ color: "#475569", textAlign: "center" }}>
              Fast learner with a project-first approach — every skill above was applied in at least one real project.
              Currently expanding into AI/ML, cloud computing, and system design.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
