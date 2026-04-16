"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  ChevronDown,
  ExternalLink,
  Shield,
  Cloud,
  Users,
  Mic,
  BookOpen,
  Handshake,
  Download,
  Menu,
  X,
  Monitor,
  Wrench,
  FileText,
  Headphones,
  Server,
  ArrowUp,
  Send,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- DURATION HELPER ---
function calcDuration(start: string, end: string): string {
  const parseDate = (s: string) => {
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const parts = s.trim().split(" ");
    if (parts.length === 2) {
      return new Date(parseInt(parts[1]), months[parts[0]] || 0);
    }
    return new Date(parseInt(parts[0]), 0);
  };

  const startDate = parseDate(start);
  const endDate = end === "Present" ? new Date() : parseDate(end);
  const isPresent = end === "Present";
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) + (isPresent ? 1 : 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const m = Math.max(months, 1);
  if (years === 0) return `${m} mo`;
  if (months === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${m} mo`;
}

// --- FLOATING PARTICLES ---
const particlePositions = [
  { x: 12, y: 8, d: 4.2, dl: 0.3 }, { x: 88, y: 15, d: 5.1, dl: 1.2 }, { x: 35, y: 72, d: 3.8, dl: 2.1 },
  { x: 67, y: 33, d: 6.0, dl: 0.8 }, { x: 23, y: 91, d: 4.5, dl: 1.5 }, { x: 78, y: 55, d: 3.3, dl: 2.8 },
  { x: 45, y: 18, d: 5.7, dl: 0.1 }, { x: 92, y: 67, d: 4.0, dl: 1.9 }, { x: 8, y: 42, d: 6.5, dl: 0.6 },
  { x: 55, y: 85, d: 3.5, dl: 2.4 }, { x: 31, y: 28, d: 5.3, dl: 1.0 }, { x: 73, y: 95, d: 4.8, dl: 0.4 },
  { x: 18, y: 60, d: 3.1, dl: 2.6 }, { x: 82, y: 38, d: 5.9, dl: 1.7 }, { x: 50, y: 5, d: 4.3, dl: 0.9 },
  { x: 5, y: 78, d: 6.2, dl: 2.0 }, { x: 40, y: 50, d: 3.6, dl: 1.3 }, { x: 95, y: 22, d: 5.0, dl: 0.7 },
  { x: 28, y: 13, d: 4.7, dl: 2.3 }, { x: 62, y: 88, d: 3.9, dl: 1.6 }, { x: 15, y: 35, d: 5.5, dl: 0.2 },
  { x: 85, y: 70, d: 4.1, dl: 2.9 }, { x: 38, y: 45, d: 6.3, dl: 1.1 }, { x: 70, y: 10, d: 3.4, dl: 0.5 },
  { x: 10, y: 55, d: 5.8, dl: 2.5 }, { x: 58, y: 75, d: 4.6, dl: 1.4 }, { x: 25, y: 3, d: 3.7, dl: 2.7 },
  { x: 80, y: 48, d: 5.2, dl: 0.0 }, { x: 48, y: 62, d: 4.4, dl: 1.8 }, { x: 3, y: 92, d: 6.1, dl: 2.2 },
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particlePositions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            delay: p.dl,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// --- BACK TO TOP ---
function BackToTop() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-purple-600/80 backdrop-blur-sm text-white flex items-center justify-center shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// --- HERO SECTION ---
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1a2e_0%,_#0a0a0a_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <Particles />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-36 h-36 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[3px] shadow-xl shadow-purple-500/20">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src="/mahmoud-cropped.jpg"
                alt="Mahmoud Adel"
                className="w-full h-full object-cover scale-105 contrast-[1.05] brightness-[1.1]"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Mahmoud Adel
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-400 mb-2"
        >
          MAHMOUD ADEL IBRAHIM
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl text-purple-300 mb-8 font-light"
        >
          Trilingual Professional &bull; DTP Specialist &bull; Interpreter
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["Arabic", "Japanese", "English"].map((lang) => (
            <span
              key={lang}
              className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm"
            >
              <Languages className="inline w-4 h-4 mr-1" />
              {lang}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/20"
          >
            Contact Me
          </a>
          <a
            href="#about"
            className="px-8 py-3 rounded-full border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300"
          >
            Learn More
          </a>
          <a
            href="/mahmoud-cv.pdf"
            download
            className="px-8 py-3 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-500 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// --- ABOUT SECTION ---
function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="bg-[#111] border border-gray-800 rounded-2xl p-8 md:p-10"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              As a trilingual professional fluent in{" "}
              <span className="text-purple-300 font-medium">Arabic</span>,{" "}
              <span className="text-blue-300 font-medium">Japanese</span>, and{" "}
              <span className="text-green-300 font-medium">English</span>, I have
              built extensive experience in interpretation across Egypt and Japan.
              I actively participate in volunteer activities and support smooth
              cross-cultural communication.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mt-4">
              Currently working in DTP operations and Arabic language quality
              checks, I bring precision and attention to detail in every project.
              My diverse background allows me to contribute flexibly to various
              business needs.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          >
            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 text-center">
              <MapPin className="w-6 h-6 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-white font-medium">Tokyo, Japan</p>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 text-center">
              <Globe className="w-6 h-6 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Nationality</p>
              <p className="text-white font-medium">Egyptian</p>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 text-center">
              <Briefcase className="w-6 h-6 text-green-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Current Role</p>
              <p className="text-white font-medium">SHAMS Co., Ltd.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- SKILLS SECTION ---
function SkillsSection() {
  const skills = [
    { name: "Server Administration", icon: Server, color: "text-orange-400", bg: "bg-orange-500/10" },
    { name: "IT Support & Troubleshooting", icon: Wrench, color: "text-green-400", bg: "bg-green-500/10" },
    { name: "DTP (InDesign / Illustrator)", icon: Monitor, color: "text-purple-400", bg: "bg-purple-500/10" },
    { name: "Arabic Translation QC", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
    { name: "Interpretation (Simultaneous)", icon: Headphones, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { name: "Social Media Marketing", icon: ExternalLink, color: "text-pink-400", bg: "bg-pink-500/10" },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-[#060606]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Wrench className="inline w-8 h-8 mr-3 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i + 1}
                className="bg-[#111] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-300 text-center card-3d"
              >
                <div className={`w-12 h-12 rounded-lg ${skill.bg} flex items-center justify-center mx-auto mb-3`}>
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                </div>
                <p className="text-white font-medium text-sm">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- LANGUAGES SECTION ---
function LanguagesSection() {
  const languages = [
    { name: "Arabic", level: "Native", flag: "🇪🇬", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    { name: "Japanese", level: "Fluent", flag: "🇯🇵", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
    { name: "English", level: "Fluent", flag: "🇺🇸", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  ];

  return (
    <section id="languages" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Languages className="inline w-8 h-8 mr-3 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Languages
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i + 1}
                className={`bg-[#111] border ${lang.border} rounded-xl p-6 text-center hover:border-gray-600 transition-all duration-300 card-3d`}
              >
                <div className="text-5xl mb-4">{lang.flag}</div>
                <h3 className="text-xl font-bold text-white mb-2">{lang.name}</h3>
                <span className={`inline-block px-4 py-1.5 rounded-full ${lang.bg} ${lang.color} text-sm font-medium`}>
                  {lang.level}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- EXPERIENCE SECTION ---
function ExperienceSection() {
  const experiences = [
    {
      period: "May 2021 - May 2024",
      company: "EDJ Translation Company",
      role: "Arabic Interpreter & Translator",
      description:
        "Arabic interpretation and translation services on a project-by-project basis.",
      current: false,
    },
    {
      period: "Sep 2025 - Present",
      company: "SHAMS Co., Ltd.",
      role: "DTP Operator & Arabic QC",
      description:
        "Desktop Publishing (DTP) operations for multilingual documents, Arabic translation quality checks, company server administration, and IT support including hardware troubleshooting and device maintenance.",
      current: true,
    },
    {
      period: "Apr 2026 - Present",
      company: "BeBorn Inc.",
      role: "On-Call Interpreter (Arabic / Japanese)",
      description:
        "24/7 on-call telephone interpretation service. Providing real-time Arabic-Japanese interpretation for emergencies, hospital visits, real estate agencies, utility companies, and various business communications. Contract-based role alongside current position at SHAMS.",
      current: true,
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-[#060606]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Briefcase className="inline w-8 h-8 mr-3 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent" />

            {/* EDJ - Past (Left side) */}
            <motion.div variants={fadeInUp} custom={1} className="relative mb-12">
              <div className="flex items-stretch gap-6 md:gap-0">
                <div className="hidden md:block md:w-1/2 md:pr-8">
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 h-full">
                    <div className="text-right">
                      <p className="text-purple-300 text-sm mb-1">{experiences[0].period} <span className="text-gray-500">· {calcDuration("May 2021", "May 2024")}</span></p>
                      <h3 className="text-xl font-bold text-white mb-1">{experiences[0].company}</h3>
                      <p className="text-blue-300 text-sm mb-3">{experiences[0].role}</p>
                      <p className="text-gray-400 text-sm">{experiences[0].description}</p>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-gray-500 border-2 border-[#060606] mt-2 md:absolute md:left-1/2 md:-translate-x-1/2" />
                </div>
                <div className="md:w-1/2 md:pl-8 md:hidden">
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                    <p className="text-purple-300 text-sm mb-1">{experiences[0].period} <span className="text-gray-500">· {calcDuration("May 2021", "May 2024")}</span></p>
                    <h3 className="text-xl font-bold text-white mb-1">{experiences[0].company}</h3>
                    <p className="text-blue-300 text-sm mb-3">{experiences[0].role}</p>
                    <p className="text-gray-400 text-sm">{experiences[0].description}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SHAMS + BeBorn - Current */}
            <motion.div variants={fadeInUp} custom={2} className="relative">
              {/* Label centered on the timeline */}
              <div className="flex items-center justify-center mb-6">
                <div className="hidden md:block md:w-[calc(50%-1rem)] text-right">
                  <span className="text-purple-300 text-sm font-medium">
                    Primary Role
                  </span>
                </div>
                <div className="hidden md:block w-8 text-center text-gray-600 text-xs">&</div>
                <div className="hidden md:block md:w-[calc(50%-1rem)]">
                  <span className="text-blue-300 text-sm font-medium">
                    Side Contract
                  </span>
                </div>
                <p className="md:hidden text-green-400 text-sm font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Dual Roles — Full-time & Contract
                </p>
              </div>
              <div className="flex items-stretch gap-6 md:gap-0">
                {/* SHAMS - Left side (Primary) */}
                <div className="hidden md:block md:w-1/2 md:pr-8">
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 h-full">
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium mb-3">
                        Full-time
                      </span>
                      <p className="text-purple-300 text-sm mb-1">{experiences[1].period} <span className="text-gray-500">· {calcDuration("Sep 2025", "Present")}</span></p>
                      <h3 className="text-xl font-bold text-white mb-1">{experiences[1].company}</h3>
                      <p className="text-blue-300 text-sm mb-3">{experiences[1].role}</p>
                      <p className="text-gray-400 text-sm">{experiences[1].description}</p>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-[#060606] mt-2 md:absolute md:left-1/2 md:-translate-x-1/2 animate-pulse" />
                </div>
                {/* BeBorn - Right side (Contract) */}
                <div className="md:w-1/2 md:pl-8 flex-1">
                  {/* SHAMS mobile fallback */}
                  <div className="md:hidden bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium mb-3">
                      Full-time
                    </span>
                    <p className="text-purple-300 text-sm mb-1">{experiences[1].period} <span className="text-gray-500">· {calcDuration("Sep 2025", "Present")}</span></p>
                    <h3 className="text-xl font-bold text-white mb-1">{experiences[1].company}</h3>
                    <p className="text-blue-300 text-sm mb-3">{experiences[1].role}</p>
                    <p className="text-gray-400 text-sm">{experiences[1].description}</p>
                  </div>
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 h-full">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-3">
                      Contract
                    </span>
                    <p className="text-purple-300 text-sm mb-1">{experiences[2].period} <span className="text-gray-500">· {calcDuration("Apr 2026", "Present")}</span></p>
                    <h3 className="text-xl font-bold text-white mb-1">{experiences[2].company}</h3>
                    <p className="text-blue-300 text-sm mb-3">{experiences[2].role}</p>
                    <p className="text-gray-400 text-sm">{experiences[2].description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- EDUCATION SECTION ---
function EducationSection() {
  const education = [
    {
      period: "2024 - 2025",
      duration: "1 yr",
      school: "Tokyo Language and Culture Academy",
      detail: "Japanese Language Studies",
      icon: BookOpen,
      japanese: true,
    },
    {
      period: "2017 - 2022",
      duration: "4 yrs",
      school: "Benha University",
      detail: "Faculty of Arts - Japanese Language & Literature",
      icon: GraduationCap,
      japanese: true,
    },
    {
      period: "2014 - 2017",
      duration: "3 yrs",
      school: "Elmasryeen High School",
      detail: "Graduated",
      icon: GraduationCap,
      japanese: false,
    },
  ];

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <GraduationCap className="inline w-8 h-8 mr-3 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Education
            </span>
          </motion.h2>

          <div className="grid gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i + 1}
                className={`bg-[#111] border rounded-xl p-6 transition-all duration-300 flex items-start gap-4 ${
                  edu.japanese
                    ? "border-red-500/20 hover:border-red-500/40"
                    : "border-gray-800 hover:border-blue-500/30"
                }`}
              >
                <div className={`p-3 rounded-lg ${edu.japanese ? "bg-red-500/10" : "bg-blue-500/10"}`}>
                  <edu.icon className={`w-6 h-6 ${edu.japanese ? "text-red-400" : "text-blue-400"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-sm ${edu.japanese ? "text-red-300" : "text-blue-300"}`}>{edu.period}{edu.duration && <span className="text-gray-500"> · {edu.duration}</span>}</p>
                      <h3 className="text-lg font-bold text-white">{edu.school}</h3>
                      <p className="text-gray-400 text-sm">{edu.detail}</p>
                    </div>
                    {edu.japanese && (
                      <span className="flex-shrink-0 px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                        🇯🇵 日本語
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- CERTIFICATIONS SECTION ---
function CertificationsSection() {
  const certs = [
    {
      year: "2026",
      name: "AWS Certified Cloud Practitioner\n(CLF-C02)",
      icon: Cloud,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      year: "2025",
      name: "Fortinet Certified Cybersecurity Fundamentals",
      icon: Shield,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <section id="certifications" className="py-24 px-6 bg-[#060606]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Award className="inline w-8 h-8 mr-3 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-4">
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i + 1}
                className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-yellow-500/30 transition-all duration-300 card-3d"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${cert.bg}`}>
                    <cert.icon className={`w-6 h-6 ${cert.color}`} />
                  </div>
                  <div>
                    <p className="text-yellow-300/70 text-sm">{cert.year}</p>
                    <h3 className="text-white font-bold whitespace-pre-line">{cert.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- FREELANCE & VOLUNTEER SECTION ---
function FreelanceSection() {
  const activities = [
    {
      period: "Dec 2025",
      title: "Youth Synergy Chiangmai 2025",
      desc: "Traveled to Chiang Mai, Thailand to participate in the Southeast Asia & Asia-Pacific Youth Forum — an international exchange program connecting young professionals across the region.",
      icon: Globe,
      highlight: true,
      tag: "🇹🇭 Thailand",
    },
    {
      period: "Oct 2022",
      title: "Hilton Hotel Call Center Internship",
      desc: "Japanese customer support at Hilton hotel reservation call center.",
      icon: Phone,
    },
    {
      period: "Mar 2022",
      title: "EgyCon Anime Event - Interpreter",
      desc: "English/Japanese interpretation at anime convention.",
      icon: Mic,
    },
    {
      period: "Mar 2022",
      title: "ESPESL - Interpreter",
      desc: "Arabic/Japanese interpretation for Egyptian Association for Economics, Statistics and Legislation.",
      icon: Handshake,
    },
    {
      period: "Feb 2022",
      title: "Cairo International Book Fair",
      desc: "Radio interpretation (Arabic/Japanese) at international book fair.",
      icon: BookOpen,
    },
    {
      period: "Dec 2021",
      title: "Japan Foundation Event at Benha University",
      desc: "Interpretation for international exchange event (Arabic/Japanese).",
      icon: Globe,
    },
    {
      period: "2015 - 2022",
      title: "Social Media Marketing Freelancer",
      desc: "SNS promotion campaigns and social media security management.",
      icon: ExternalLink,
    },
  ];

  return (
    <section id="volunteer" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Users className="inline w-8 h-8 mr-3 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Freelance & Volunteer
            </span>
          </motion.h2>

          <div className="grid gap-3">
            {activities.map((act, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i + 1}
                className={`bg-[#111] border rounded-xl p-5 transition-all duration-300 flex items-start gap-4 ${
                  act.highlight
                    ? "border-cyan-500/30 hover:border-cyan-500/50"
                    : "border-gray-800 hover:border-green-500/20"
                }`}
              >
                <div className={`p-2 rounded-lg mt-0.5 ${act.highlight ? "bg-cyan-500/10" : "bg-green-500/10"}`}>
                  <act.icon className={`w-5 h-5 ${act.highlight ? "text-cyan-400" : "text-green-400"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold">{act.title}</h3>
                      {act.tag && (
                        <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
                          {act.tag}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs whitespace-nowrap mt-1 ${act.highlight ? "text-cyan-300/60" : "text-green-300/60"}`}>
                      {act.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{act.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- CONTACT SECTION ---
function ContactSection() {
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:mahmoud@shams.co.jp?subject=Message from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#060606]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Mail className="inline w-8 h-8 mr-3 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact info */}
            <motion.div variants={fadeInUp} custom={1} className="space-y-4">
              <a
                href="mailto:mahmoud@shams.co.jp"
                className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group block"
              >
                <Mail className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">mahmoud@shams.co.jp</p>
              </a>
              <a
                href="tel:080-3545-5054"
                className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 group block"
              >
                <Phone className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">080-3545-5054</p>
              </a>
            </motion.div>

            {/* Contact form */}
            <motion.form
              variants={fadeInUp}
              custom={2}
              onSubmit={handleSubmit}
              className="bg-[#111] border border-gray-800 rounded-xl p-6 space-y-4"
            >
              <div>
                <label className="text-gray-400 text-sm block mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {sent ? "Sent!" : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- NAVBAR ---
function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#certifications", label: "Certs" },
    { href: "#volunteer", label: "Volunteer" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          MA
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-gray-800/50 px-6 pb-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-gray-400 hover:text-white transition-colors border-b border-gray-800/30 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Mahmoud Adel Ibrahim. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/mahmoud-adel-jp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://github.com/MahmoudJP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a
              href="mailto:mahmoud@shams.co.jp"
              className="text-gray-500 hover:text-purple-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SECTION WRAPPER (page transitions) ---
function SectionReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      {children}
    </motion.div>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionReveal><AboutSection /></SectionReveal>
        <SectionReveal><ExperienceSection /></SectionReveal>
        <SectionReveal><SkillsSection /></SectionReveal>
        <SectionReveal><EducationSection /></SectionReveal>
        <SectionReveal><LanguagesSection /></SectionReveal>
        <SectionReveal><CertificationsSection /></SectionReveal>
        <SectionReveal><FreelanceSection /></SectionReveal>
        <SectionReveal><ContactSection /></SectionReveal>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
