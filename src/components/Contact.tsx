"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Link2, Mail, Send, Download } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const SOCIAL_LINKS = [
  {
    id:      "contact-github",
    gbaLabel:"GITHUB",
    proLabel:"GitHub",
    command: "$ open github.com/IshanMotghare",
    href:    "https://github.com/IshanMotghare",
    icon:    <GitBranch size={16} />,
    color:   "#a78bfa",
  },
  {
    id:      "contact-linkedin",
    gbaLabel:"LINKEDIN",
    proLabel:"LinkedIn",
    command: "$ open linkedin.com/in/ishan-motghare-imu3011",
    href:    "https://www.linkedin.com/in/ishan-motghare-imu3011/",
    icon:    <Link2 size={16} />,
    color:   "#00f5ff",
  },
  {
    id:      "contact-email",
    gbaLabel:"EMAIL",
    proLabel:"Email",
    command: "$ mail --compose ishanmotghare@example.com",
    href:    "mailto:ishanmotghare@example.com",
    icon:    <Mail size={16} />,
    color:   "#ffd700",
  },
] as const;

export default function Contact() {
  const { theme } = useTheme();
  const isPro = theme === "pro";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:ishanmotghare@example.com?subject=${subject}&body=${body}`, "_self");
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gba-dark)" }}>
        <div className="noise-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: "800px", height: "400px", background: "radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-tag">{isPro ? "// CONTACT" : "// SAVE POINT"}</span>
          <h2 className="font-pixel text-2xl md:text-3xl text-white mt-3">
            {isPro ? "GET " : "CONTACT "}<span className="gradient-text-cyan-purple">{isPro ? "IN TOUCH" : "TERMINAL"}</span>
          </h2>
          <p className="font-body text-base text-gba-text-dim mt-5 max-w-xl mx-auto">
            {isPro
              ? "Have an opportunity, a project, or just want to connect? I'd love to hear from you."
              : "Open a connection. Whether you have an opportunity, a collaboration idea, or just want to say hello — the terminal is always listening."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* ── Left: social links + resume ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Terminal window */}
            <div className="pixel-panel p-8">
              {/* Chrome */}
              <div className="flex items-center gap-2 mb-7 pb-4 border-b border-gba-border">
                <div className="w-3 h-3 rounded-full bg-gba-red" />
                <div className="w-3 h-3 rounded-full bg-gba-gold" />
                <div className="w-3 h-3 rounded-full bg-gba-green" />
                <span className="font-pixel text-[7px] text-gba-text-dim ml-3 tracking-wider">
                  {isPro ? "ishan@portfolio" : "ishan@portfolio:~$"}
                </span>
              </div>

              {/* Social links */}
              <div className="space-y-4">
                {SOCIAL_LINKS.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <a
                      href={link.href}
                      id={link.id}
                      target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="group block p-4 border border-transparent hover:border-gba-border bg-gba-dark/50 hover:bg-gba-dark transition-all"
                      style={{ borderRadius: isPro ? "10px" : "0" }}
                    >
                      <div className="flex items-center gap-4 mb-1.5">
                        <span style={{ color: link.color }}>{link.icon}</span>
                        <span className="font-pixel text-[8px] group-hover:underline" style={{ color: link.color }}>
                          {isPro ? link.proLabel : link.gbaLabel}
                        </span>
                      </div>
                      {!isPro && (
                        <p className="font-pixel text-[7px] text-gba-text-dim pl-9 tracking-wider">
                          {link.command}
                        </p>
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div className="dialogue-box p-8">
              <p className="font-pixel text-[8px] text-gba-gold mb-4">
                {isPro ? "📄 RESUME" : "💾 SAVE FILE — RESUME.PDF"}
              </p>
              <p className="font-body text-base text-gba-text mb-7 leading-relaxed">
                {isPro
                  ? "Download my resume to review my complete education, skills, and project experience."
                  : "Download my resume to review my complete skills, education, and project history."}
              </p>
              <a
                href="/resume.pdf"
                download="Ishan_Motghare_Resume.pdf"
                id="contact-resume-download"
                className="pixel-btn pixel-btn-gold w-full justify-center gap-3"
              >
                <Download size={13} />
                {isPro ? "DOWNLOAD RESUME" : "⬇ DOWNLOAD RESUME"}
              </a>
            </div>
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="pixel-panel p-8 h-full">
              <p className="font-pixel text-[8px] text-gba-green mb-8 flex items-center gap-3">
                {isPro ? "SEND A MESSAGE" : "> SEND_MESSAGE.exe"}
                {!isPro && (
                  <span className="inline-block bg-gba-green align-middle"
                    style={{ width: "8px", height: "16px", animation: "blink 1s steps(1) infinite" }} />
                )}
              </p>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 gap-5">
                  <div className="text-6xl">✓</div>
                  <p className="font-pixel text-[9px] text-gba-green glow-green">MESSAGE SENT!</p>
                  <p className="font-body text-base text-gba-text-dim text-center">
                    Your mail client should have opened. Talk soon!
                  </p>
                  <button onClick={() => setSent(false)}
                    className="pixel-btn pixel-btn-purple mt-4"
                    style={{ fontSize: "8px", padding: "10px 20px" }}>
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form" className="space-y-6">
                  <div>
                    <label htmlFor="contact-name"
                      className="font-pixel text-[7px] text-gba-text-dim block mb-3">
                      {isPro ? "YOUR NAME" : "> PLAYER_NAME:"}
                    </label>
                    <input id="contact-name" type="text" required value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-gba-black border border-gba-border text-gba-text font-body text-base px-5 py-4 outline-none transition-colors"
                      style={{ caretColor: "var(--gba-green)", borderRadius: isPro ? "8px" : "0" }}
                      placeholder="Enter your name..."
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gba-cyan)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gba-border)")} />
                  </div>

                  <div>
                    <label htmlFor="contact-email-field"
                      className="font-pixel text-[7px] text-gba-text-dim block mb-3">
                      {isPro ? "YOUR EMAIL" : "> CONTACT_EMAIL:"}
                    </label>
                    <input id="contact-email-field" type="email" required value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-gba-black border border-gba-border text-gba-text font-body text-base px-5 py-4 outline-none transition-colors"
                      style={{ caretColor: "var(--gba-green)", borderRadius: isPro ? "8px" : "0" }}
                      placeholder="your@email.com"
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gba-cyan)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gba-border)")} />
                  </div>

                  <div>
                    <label htmlFor="contact-message"
                      className="font-pixel text-[7px] text-gba-text-dim block mb-3">
                      {isPro ? "YOUR MESSAGE" : "> MESSAGE_BODY:"}
                    </label>
                    <textarea id="contact-message" required rows={6} value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-gba-black border border-gba-border text-gba-text font-body text-base px-5 py-4 outline-none transition-colors resize-none"
                      style={{ caretColor: "var(--gba-green)", borderRadius: isPro ? "8px" : "0" }}
                      placeholder="Type your message here..."
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gba-cyan)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gba-border)")} />
                  </div>

                  <button type="submit" id="contact-submit"
                    className="pixel-btn pixel-btn-green w-full justify-center gap-3"
                    style={{ padding: "14px 24px" }}>
                    <Send size={13} />
                    {isPro ? "SEND MESSAGE" : "TRANSMIT MESSAGE"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-gba-border text-center space-y-3"
        >
          <p className="font-pixel text-[7px] text-gba-text-dim">
            {isPro ? "ISHAN MOTGHARE — PORTFOLIO" : "ISHAN.EXE — V1.0.0"}
          </p>
          <p className="font-pixel text-[6px]" style={{ color: "var(--gba-text-dim)", opacity: 0.5 }}>
            © 2026 ISHAN MOTGHARE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-pixel text-[6px]" style={{ color: "var(--gba-text-dim)", opacity: 0.3 }}>
            BUILT WITH NEXT.JS 16 + REACT 19 + TAILWIND v4 + FRAMER MOTION
          </p>
        </motion.div>
      </div>
    </section>
  );
}
