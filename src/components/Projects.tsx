"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type Status = "COMPLETED" | "IN_PROGRESS" | "LOCKED";

interface Project {
  id: string; name: string; subtitle: string; status: Status;
  difficulty: string; description: string; tech: string[];
  github: string | null; live: string | null; locked: boolean; featured: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "india-news-app",
    name: "INDIA NEWS APP",
    subtitle: "Mission Alpha — Completed",
    status: "COMPLETED",
    difficulty: "★★★☆☆",
    description: "A real-time news aggregation Android app for India. Browse top headlines across categories — tech, sports, business and more — with a clean and intuitive interface. Features category filtering and live API data.",
    tech: ["JAVA", "ANDROID", "REST API", "XML", "RETROFIT"],
    github: "https://github.com/IshanMotghare/IndiaNewsApp",
    live: null, locked: false, featured: true,
  },
  {
    id: "portfolio-site",
    name: "PORTFOLIO.EXE",
    subtitle: "Mission Beta — Active",
    status: "IN_PROGRESS",
    difficulty: "★★★★☆",
    description: "This very portfolio! A GBA-inspired interactive developer showcase built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion. An immersive dive into the developer world with CRT effects and pixel aesthetics.",
    tech: ["NEXT.JS", "REACT 19", "TAILWIND v4", "FRAMER"],
    github: null, live: "#home", locked: false, featured: false,
  },
  {
    id: "locked-gamma",
    name: "??? — PROJECT GAMMA",
    subtitle: "Mission Gamma — Classified",
    status: "LOCKED",
    difficulty: "★★★★★",
    description: "ACCESS RESTRICTED — MISSION DETAILS CLASSIFIED UNTIL UNLOCK CONDITIONS MET",
    tech: ["???", "???", "???"],
    github: null, live: null, locked: true, featured: false,
  },
  {
    id: "locked-delta",
    name: "??? — PROJECT DELTA",
    subtitle: "Mission Delta — Coming Soon",
    status: "LOCKED",
    difficulty: "★★★★★",
    description: "ACCESS RESTRICTED — MISSION DETAILS CLASSIFIED UNTIL UNLOCK CONDITIONS MET",
    tech: ["???", "???", "???"],
    github: null, live: null, locked: true, featured: false,
  },
];

const STATUS_CONFIG: Record<Status, { color: string; label: string; proLabel: string }> = {
  COMPLETED:   { color: "#39ff14", label: "✓ COMPLETED",  proLabel: "✓ COMPLETED" },
  IN_PROGRESS: { color: "#ffd700", label: "⟳ IN PROGRESS", proLabel: "⟳ IN PROGRESS" },
  LOCKED:      { color: "#444466", label: "🔒 LOCKED",    proLabel: "🔒 COMING SOON" },
};

export default function Projects() {
  const { theme } = useTheme();
  const isPro = theme === "pro";

  return (
    <section id="projects" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gba-dark)" }}>
        <div className="noise-overlay" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-tag">{isPro ? "// PROJECTS" : "// MISSION SELECT"}</span>
          <h2 className="font-pixel text-2xl md:text-3xl text-white mt-3">
            {isPro ? "FEATURED " : "ACTIVE "}<span className="gradient-text-cyan-purple">{isPro ? "WORK" : "QUESTS"}</span>
          </h2>
          <p className="font-body text-base text-gba-text-dim mt-5 max-w-xl mx-auto">
            {isPro
              ? "A selection of projects I've built. More on GitHub."
              : "Select a mission to view details. Additional quests unlock as XP grows."}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => {
            const sc = STATUS_CONFIG[project.status];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="mission-card relative"
                style={project.featured ? { borderColor: "var(--gba-purple)" } : {}}
              >
                {/* Featured badge */}
                {project.featured && (
                  <div
                    className="absolute -top-4 left-8 font-pixel text-[7px] text-gba-gold border border-gba-gold px-4 py-1.5"
                    style={{ background: "var(--gba-black)" }}
                  >
                    ★ {isPro ? "FEATURED" : "FEATURED MISSION"}
                  </div>
                )}

                <div className="p-8">
                  {/* Status + difficulty */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-pixel text-[6px] px-3 py-1.5 border"
                      style={{ color: sc.color, borderColor: `${sc.color}50`, background: `${sc.color}10` }}
                    >
                      {isPro ? sc.proLabel : sc.label}
                    </span>
                    <span className="font-pixel text-[8px] text-gba-gold">{project.difficulty}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-pixel text-[11px] text-white mb-2 leading-relaxed">{project.name}</h3>
                  <p className="font-body text-sm text-gba-text-dim mb-6">{project.subtitle}</p>

                  {/* Description */}
                  <p
                    className="font-body leading-relaxed mb-7"
                    style={{
                      color: project.locked ? "var(--gba-text-dim)" : "var(--gba-text)",
                      fontFamily: project.locked ? "var(--font-pixel), 'Press Start 2P', monospace" : "var(--font-body), 'Outfit', sans-serif",
                      fontSize: project.locked ? "8px" : "15px",
                      letterSpacing: project.locked ? "1px" : "normal",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.tech.map((t, ti) => (
                      <span key={`${t}-${ti}`} className="tech-tag"
                        style={project.locked ? { borderColor: "#333355", color: "#444466" } : {}}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  {!project.locked && (
                    <div className="flex gap-4 flex-wrap">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          id={`project-${project.id}-github`}
                          className="pixel-btn pixel-btn-purple flex items-center gap-2"
                          style={{ fontSize: "8px", padding: "10px 18px" }}>
                          <GitBranch size={12} /> {isPro ? "SOURCE CODE" : "SOURCE"}
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} id={`project-${project.id}-live`}
                          className="pixel-btn flex items-center gap-2"
                          style={{ fontSize: "8px", padding: "10px 18px" }}>
                          <ExternalLink size={12} /> {isPro ? "LIVE DEMO" : "DEMO"}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Locked overlay */}
                {project.locked && (
                  <div className="locked-overlay">
                    <div className="text-center p-8">
                      <Lock className="mx-auto mb-4 opacity-30 text-gba-text-dim" style={{ width: "48px", height: "48px" }} />
                      <p className="font-pixel text-[7px] text-gba-text-dim">COMING SOON</p>
                      <p className="font-pixel text-[6px] mt-2" style={{ color: "var(--gba-text-dim)", opacity: 0.5 }}>
                        {isPro ? "PROJECT IN DEVELOPMENT" : "EARN MORE XP TO UNLOCK"}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="https://github.com/IshanMotghare" target="_blank" rel="noopener noreferrer"
            id="view-all-github"
            className="pixel-btn pixel-btn-purple inline-flex items-center gap-3 px-10 py-4">
            <GitBranch size={14} />
            {isPro ? "MORE PROJECTS ON GITHUB" : "VIEW ALL ON GITHUB"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
