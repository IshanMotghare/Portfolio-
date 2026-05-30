"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Briefcase } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_ITEMS = [
  { gba: "HOME",    pro: "Home",    href: "#home",     icon: "🏠" },
  { gba: "PROFILE", pro: "About",   href: "#about",    icon: "👤" },
  { gba: "SKILLS",  pro: "Skills",  href: "#skills",   icon: "⚔️" },
  { gba: "QUESTS",  pro: "Projects",href: "#projects", icon: "🗺️" },
  { gba: "JOURNEY", pro: "Journey", href: "#timeline", icon: "📜" },
  { gba: "CONTACT", pro: "Contact", href: "#contact",  icon: "💾" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActive]  = useState("home");
  const { theme, toggleTheme }      = useTheme();
  const isPro = theme === "pro";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = "home";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 120) current = item.href.slice(1);
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b" : "bg-transparent"
      }`}
      style={scrolled ? {
        background: isPro ? "rgba(255,255,255,0.97)" : "rgba(10,10,15,0.95)",
        backdropFilter: "blur(14px)",
        borderBottomColor: isPro ? "#e2e8f0" : "var(--gba-border)",
      } : {}}
    >
      <div className="w-full px-6 sm:px-8">
        <div className="flex items-center justify-between h-18" style={{ height: "72px" }}>

          {/* Logo */}
          <a
            href="#home"
            className={`font-pixel text-[11px] hover:opacity-80 transition-opacity tracking-wider flex-shrink-0 ${
              isPro ? "text-gba-text" : "text-gba-cyan glow-cyan"
            }`}
          >
            {isPro ? "Ishan Motghare" : "ISHAN.EXE"}
          </a>

          {/* Desktop nav + toggle */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  id={`nav-${item.gba.toLowerCase()}`}
                  className={`font-pixel text-[7px] px-4 py-6 relative transition-colors duration-200 ${
                    isActive
                      ? isPro ? "text-gba-purple" : "text-gba-cyan"
                      : isPro ? "text-gba-text-dim hover:text-gba-text" : "text-gba-text-dim hover:text-gba-text"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-x-1 inset-y-2 border"
                      style={isPro
                        ? { background: "rgba(37,99,235,0.07)", borderColor: "rgba(37,99,235,0.2)" }
                        : { background: "rgba(0,245,255,0.07)", borderColor: "rgba(0,245,255,0.25)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{isPro ? item.pro : item.gba}</span>
                  {isActive && (
                    <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      isPro ? "bg-gba-purple" : "bg-gba-cyan"
                    }`} />
                  )}
                </a>
              );
            })}

            {/* ── REALM TOGGLE BUTTON ── */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className={`theme-toggle-btn ml-4 font-pixel text-[7px] ${isPro ? "pro-mode" : "gba-mode"}`}
              title={isPro ? "Switch to GBA mode" : "Switch to Professional mode"}
            >
              {isPro ? (
                <>
                  <Zap size={11} className="flex-shrink-0" />
                  <span>GBA REALM</span>
                </>
              ) : (
                <>
                  <Briefcase size={11} className="flex-shrink-0" />
                  <span>PRO REALM</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile realm toggle (icon only) */}
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`theme-toggle-btn ${isPro ? "pro-mode" : "gba-mode"}`}
              style={{ padding: "6px 10px", gap: "6px" }}
              title={isPro ? "Switch to GBA" : "Switch to Pro"}
            >
              {isPro ? <Zap size={12} /> : <Briefcase size={12} />}
              <span className="font-pixel text-[6px]">{isPro ? "GBA" : "PRO"}</span>
            </button>

            <button
              className="text-gba-cyan p-2 border border-gba-border bg-gba-dark"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle mobile menu"
              id="mobile-menu-btn"
            >
              {mobileOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(10,10,15,0.97)", borderBottom: "1px solid var(--gba-border)" }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    id={`mobile-nav-${item.gba.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className={`font-pixel text-[8px] py-4 px-5 border flex items-center gap-4 transition-all ${
                      isActive
                        ? "text-gba-cyan border-gba-cyan/30"
                        : "text-gba-text-dim border-transparent hover:text-gba-text hover:border-gba-border"
                    }`}
                    style={isActive ? { background: "rgba(0,245,255,0.05)" } : {}}
                  >
                    <span>{item.icon}</span>
                    <span>{isPro ? item.pro : item.gba}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
