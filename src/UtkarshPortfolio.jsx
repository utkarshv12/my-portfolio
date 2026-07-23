import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import {
  Mail,
  Phone,
  Terminal,
  Crosshair,
  ChevronDown,
  Plus,
  Minus,
  Circle,
} from "lucide-react";

/* lucide-react dropped brand/logo icons (Github, Linkedin, etc.) in recent
   versions for trademark reasons — inline SVGs used instead so this file
   has no dependency on which icons a given lucide-react version ships. */
function GithubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* DATA — sourced directly from resume content                      */
/* ---------------------------------------------------------------- */

const SKILL_GROUPS = [
  { cat: "Languages", items: ["Java", "Python", "JavaScript", "HTML", "CSS", "SQL"] },
  {
    cat: "Frameworks & Libraries",
    items: ["Flask", "Spring Boot", "REST APIs", "NumPy", "Pandas", "OpenCV", "Dependency Injection"],
  },
  { cat: "Databases & Tools", items: ["MySQL", "DBMS", "Git", "GitHub", "VS Code", "Postman"] },
  {
    cat: "Cloud & AI/ML",
    items: ["AWS Cloud Practitioner", "Google Cloud Gen AI", "Deep Learning", "Computer Vision"],
  },
];

const SKILL_BAR_DATA = SKILL_GROUPS.map((g) => ({ name: g.cat, count: g.items.length }));

const PROJECTS = [
  {
    id: "sentineleye",
    title: "SentinelEye",
    subtitle: "AI-Powered Smart Surveillance System",
    confidence: 98,
    tags: ["AI/ML", "Computer Vision", "Backend"],
    tech: ["Python", "OpenCV", "Flask", "Deep Learning", "ngrok", "REST APIs"],
    bullets: [
      "Architected and developed an AI-powered surveillance application using OpenCV and deep learning, enabling real-time motion detection and facial recognition across multiple video feeds.",
      "Designed complete system architecture — Class, Use Case, and Sequence diagrams — structuring application logic across the full development lifecycle from design to deployment.",
      'Built and deployed a secure, full-stack remote monitoring solution with Flask and ngrok, integrating automated email alerts and a dynamic "Allow Entry" feature that reduced manual verification steps for trusted users.',
    ],
  },
  {
    id: "verisium",
    title: "Verisium",
    subtitle: "AI Mock Interview Platform",
    confidence: 95,
    tags: ["AI/ML", "NLP"],
    tech: ["Python", "Speech Recognition", "NLP Analysis", "AI"],
    bullets: [
      "Engineered an AI-driven mock interview platform combining speech recognition and response analysis to simulate realistic, role-specific interview environments.",
      "Developed evaluation logic to assess user communication patterns and generate actionable performance feedback, improving candidates' interview readiness and confidence.",
    ],
  },
  {
    id: "weather",
    title: "Weather Forecasting Application",
    subtitle: "Responsive Web App",
    confidence: 92,
    tags: ["Frontend", "APIs"],
    tech: ["JavaScript", "HTML", "CSS", "REST APIs"],
    bullets: [
      "Built a responsive weather monitoring web application by integrating third-party RESTful APIs, delivering real-time atmospheric data and location-based forecasts.",
      "Designed an intuitive, mobile-friendly UI with modern front-end technologies to visualize environmental data and dynamic weather icons, improving usability across devices.",
    ],
  },
];

const ALL_TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

const EDUCATION = [
  {
    yr: "2023 — 2026",
    title: "B.Tech, Computer Science & Engineering (Artificial Intelligence)",
    place: "Galgotias College of Engineering & Technology, Gautam Buddh Nagar, UP · CGPA 7.86",
  },
  {
    yr: "2020 — 2023",
    title: "Diploma in Electronics Engineering",
    place: "Govt. Polytechnic, Barabanki, UP",
  },
  { yr: "2018 — 2020", title: "XII & X, UP Board", place: "ASCD Inter College, Fatehpur, Barabanki, UP" },
];

const CERTS = [
  "Database Programming with SQL — Oracle Academy",
  "Python Programming — GeeksforGeeks",
  "Introduction to Operating Systems — NPTEL",
  "Problem Solving (Basic) — HackerRank",
  "Virtual Internship on Core Java — Upskills Campus",
  "Java & Database Management — Springboard",
  "100+ Data Structures & Algorithms problems — LeetCode",
  "AWS Academy Graduate — Cloud Foundations badge",
  "Google Cloud — Generative AI",
];

const NAV_SECTIONS = ["about", "skills", "projects", "education", "certs", "contact"];

const COLORS = { cyan: "#4FD8E8", amber: "#FFB627", alert: "#FF5D5D" };

/* ---------------------------------------------------------------- */
/* HOOK — network canvas background                                  */
/* ---------------------------------------------------------------- */

function useNetworkCanvas(canvasRef, reduceMotion) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let nodes = [];
    let w = 0,
      h = 0;

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }

    function init() {
      resize();
      const count = Math.min(60, Math.floor((w * h) / 90000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const linkDist = w * 0.09;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x,
            dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(79,216,232,${0.12 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.fillStyle = "rgba(255,182,39,0.35)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    init();
    draw();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [canvasRef, reduceMotion]);
}

/* ---------------------------------------------------------------- */
/* MAIN COMPONENT                                                     */
/* ---------------------------------------------------------------- */

export default function UtkarshPortfolio() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [typedName, setTypedName] = useState("");
  const [clock, setClock] = useState("");
  const [frame, setFrame] = useState(1);
  const [active, setActive] = useState("about");
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("All");
  const [cursorPos, setCursorPos] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const canvasRef = useRef(null);
  const sectionRefs = useRef({});
  useNetworkCanvas(canvasRef, reduceMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const fine = window.matchMedia("(pointer: fine)").matches;

    // boot sequence
    const bootSeq = [
      "INITIALIZING SENTINEL INTERFACE...",
      "LOADING SUBJECT PROFILE: UTK-2026...",
      "CALIBRATING FEED...",
      "ACCESS GRANTED.",
    ];
    if (mq.matches) {
      setBooted(true);
    } else {
      let i = 0;
      const t = setInterval(() => {
        setBootLines((prev) => [...prev, bootSeq[i]]);
        i++;
        if (i >= bootSeq.length) {
          clearInterval(t);
          setTimeout(() => setBooted(true), 500);
        }
      }, 380);
    }

    // typewriter
    const full = "UTKARSH";
    let idx = 0;
    const typeT = setInterval(() => {
      idx++;
      setTypedName(full.slice(0, idx));
      if (idx >= full.length) clearInterval(typeT);
    }, 110);

    // clock
    const clockT = setInterval(() => {
      setClock(new Date().toLocaleTimeString("en-IN", { hour12: false }));
    }, 1000);

    // frame counter
    const frameT = setInterval(() => {
      setFrame((f) => f + Math.floor(Math.random() * 40) + 1);
    }, 1200);

    // cursor
    const onMove = (e) => {
      if (fine) setCursorPos({ x: e.clientX, y: e.clientY });
    };
    if (fine) window.addEventListener("mousemove", onMove);

    return () => {
      clearInterval(typeT);
      clearInterval(clockT);
      clearInterval(frameT);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [booted]);

  // reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [booted]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const visibleProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <div style={styles.root}>
      <style>{CSS}</style>

      <canvas ref={canvasRef} className="net-canvas" aria-hidden="true" />
      <div className="scan-overlay" aria-hidden="true" />
      <div className="noise-vignette" aria-hidden="true" />

      {cursorPos && (
        <div
          className="crosshair"
          style={{ left: cursorPos.x, top: cursorPos.y }}
          aria-hidden="true"
        >
          <Crosshair size={22} color={COLORS.cyan} strokeWidth={1} />
          <span className="coords">
            X:{String(cursorPos.x).padStart(4, "0")} Y:{String(cursorPos.y).padStart(4, "0")}
          </span>
        </div>
      )}

      {!booted && (
        <div className="boot-screen">
          <div className="boot-lines">
            {bootLines.map((l, i) => (
              <div key={i} className="boot-line">
                &gt; {l}
              </div>
            ))}
            <span className="cursor" />
          </div>
        </div>
      )}

      <div className={`site ${booted ? "in" : ""}`}>
        {/* NAV / STATUS BAR */}
        <div className="statusbar">
          <div className="wrap statusbar-inner">
            <div className="rec">
              <span className="dot" />
              LIVE
            </div>
            <nav>
              {NAV_SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={active === id ? "active" : ""}
                >
                  {id}
                </button>
              ))}
            </nav>
            <div className="clock">CAM_01 · LUCKNOW, IN · {clock}</div>
          </div>
        </div>

        {/* HERO */}
        <header className="hero">
          <div className="wrap">
            <div className="frame hero-frame">
              <span className="bl" />
              <span className="br" />
              <div className="hero-meta">
                <div>
                  SUBJECT_ID: <span>UTK-2026</span> &nbsp;|&nbsp; STATUS: <span>OPEN TO WORK</span>
                </div>
                <div>FRAME: {String(frame).padStart(6, "0")}</div>
              </div>
              <h1 className="hero-name">
                {typedName}
                <span className="cursor" />
              </h1>
              <div className="role">SOFTWARE DEVELOPER — AI / FULL-STACK SYSTEMS</div>
              <p className="summary">
                Detail-oriented software developer with a strong foundation in object-oriented
                programming, system architecture, and full-stack development — building AI/ML-driven
                applications, RESTful APIs, and responsive web solutions with Python, Java, Flask, and
                Spring Boot.
              </p>

              <div className="hud-stats">
                <div className="stat">
                  <b>100+</b>
                  <span>LeetCode Solved</span>
                </div>
                <div className="stat">
                  <b>3</b>
                  <span>Shipped Projects</span>
                </div>
                <div className="stat">
                  <b>7.86</b>
                  <span>CGPA · B.Tech AI</span>
                </div>
                <div className="stat">
                  <b>9</b>
                  <span>Certifications</span>
                </div>
              </div>

              <div className="hero-links">
                <a className="btn solid" href="mailto:vermapriyank730@gmail.com">
                  <Mail size={14} /> Contact Me
                </a>
                <button className="btn" onClick={() => scrollTo("projects")}>
                  View Projects <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ABOUT */}
        <section id="about">
          <div className="wrap">
            <SectionHead idx="00" title="About" />
            <div className="log" data-reveal>
              <span className="k">$</span> whoami{"\n"}
              <span className="v">
                → Utkarsh, B.Tech CSE (Artificial Intelligence), Galgotias College of Engineering &
                Technology
              </span>
              {"\n\n"}
              <span className="k">$</span> cat focus.txt{"\n"}
              <span className="v">
                → System architecture · OOP · Data Structures & Algorithms · Agile/SDLC · Software
                testing & debugging
                {"\n"}→ AI/ML-driven applications, RESTful APIs and responsive web solutions across
                Python, Java, Flask and Spring Boot
                {"\n"}→ Comfortable moving from design (class / use-case / sequence diagrams) to
                deployed, working systems
              </span>
              {"\n\n"}
              <span className="k">$</span> echo $STATUS{"\n"}
              <span className="v">→ Actively building. Actively looking for the next hard problem.</span>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="wrap">
            <SectionHead idx="01" title="Skills Inventory" />

            <div className="chart-frame frame" data-reveal>
              <span className="bl" />
              <span className="br" />
              <div className="chart-label">
                <Terminal size={13} /> ITEMS SCANNED PER CATEGORY
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={SKILL_BAR_DATA} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#223039" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#6E8079", fontSize: 11 }} axisLine={{ stroke: "#223039" }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    tick={{ fill: "#DCE6E3", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
                    axisLine={{ stroke: "#223039" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#10151C",
                      border: "1px solid #223039",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 12,
                    }}
                    cursor={{ fill: "rgba(79,216,232,0.06)" }}
                  />
                  <Bar dataKey="count" radius={[0, 2, 2, 0]}>
                    {SKILL_BAR_DATA.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? COLORS.cyan : COLORS.amber} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="skill-groups">
              {SKILL_GROUPS.map((g) => (
                <div className="skill-card frame" data-reveal key={g.cat}>
                  <span className="bl" />
                  <span className="br" />
                  <span className="cat">{g.cat}</span>
                  <div className="chips">
                    {g.items.map((it) => (
                      <span className="chip" key={it}>
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="wrap">
            <SectionHead idx="02" title="Detected Projects" />

            <div className="filter-row" data-reveal>
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  className={`filter-chip ${filter === t ? "active" : ""}`}
                  onClick={() => setFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="projects">
              {visibleProjects.map((p) => {
                const isOpen = expanded === p.id;
                return (
                  <div className="project frame" data-reveal key={p.id}>
                    <span className="bl" />
                    <span className="br" />
                    <div className="project-top">
                      <div>
                        <h3>{p.title}</h3>
                        <div className="subtitle">{p.subtitle}</div>
                      </div>
                      <span className="confidence">CONFIDENCE {p.confidence}%</span>
                    </div>

                    <div className="stack">
                      {p.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>

                    <button
                      className="expand-btn"
                      onClick={() => setExpanded(isOpen ? null : p.id)}
                      aria-expanded={isOpen}
                    >
                      {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                      {isOpen ? "Hide scan details" : "Show scan details"}
                    </button>

                    {isOpen && (
                      <ul className="detail-list">
                        {p.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <div className="wrap">
            <SectionHead idx="03" title="Education Log" />
            <div className="timeline" data-reveal>
              {EDUCATION.map((e) => (
                <div className="tl-item" key={e.title}>
                  <div className="yr">{e.yr}</div>
                  <h4>{e.title}</h4>
                  <p>{e.place}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTS */}
        <section id="certs">
          <div className="wrap">
            <SectionHead idx="04" title="Certifications & Training" />
            <div className="cert-grid">
              {CERTS.map((c) => (
                <div className="cert frame" data-reveal key={c}>
                  <span className="bl" />
                  <span className="br" />
                  <Circle size={7} color={COLORS.amber} fill={COLORS.amber} className="cert-dot" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <footer id="contact">
          <div className="wrap">
            <SectionHead idx="05" title="Establish Connection" />
            <div className="terminal frame" data-reveal>
              <span className="bl" />
              <span className="br" />
              <div className="line">
                <span className="prompt">&gt;</span> ping utkarsh --request=collaboration
              </div>
              <div className="line muted">reply from UTK-2026: reachable via channels below.</div>
              <div className="contact-links">
                <a href="mailto:vermapriyank730@gmail.com">
                  <Mail size={13} /> vermapriyank730@gmail.com
                </a>
                <a href="tel:+918787228718">
                  <Phone size={13} /> +91-8787228718
                </a>
                <a href="https://www.linkedin.com/in/utkarsh-878798327" target="_blank" rel="noreferrer">
                  <LinkedinIcon size={13} /> LinkedIn
                </a>
                <a href="https://github.com/utkarshv12" target="_blank" rel="noreferrer">
                  <GithubIcon size={13} /> GitHub
                </a>
              </div>
            </div>
            <div className="fine">© 2026 UTKARSH — SYSTEM STATUS: ONLINE — LAST DEPLOYED JUL 15 2026</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SectionHead({ idx, title }) {
  return (
    <div className="section-head" data-reveal>
      <span className="idx">{idx}</span>
      <h2>{title}</h2>
      <div className="rule" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* STYLES                                                             */
/* ---------------------------------------------------------------- */

const styles = {
  root: { position: "relative", minHeight: "100vh" },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

.site{ background:#0A0D12; color:#DCE6E3; font-family:'Inter',sans-serif; line-height:1.6; position:relative; z-index:1;
  opacity:0; transform:translateY(8px); transition:opacity .5s ease, transform .5s ease; }
.site.in{ opacity:1; transform:none; }

*{ box-sizing:border-box; }
.wrap{ max-width:1080px; margin:0 auto; padding:0 28px; }

.net-canvas{ position:fixed; inset:0; width:100%; height:100%; z-index:0; opacity:0.8; }
.scan-overlay{ position:fixed; inset:0; pointer-events:none; z-index:2;
  background:repeating-linear-gradient(0deg, rgba(0,0,0,0.09) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 3px);
  opacity:0.3; }
.noise-vignette{ position:fixed; inset:0; pointer-events:none; z-index:2; box-shadow: inset 0 0 180px rgba(0,0,0,0.65); }

.crosshair{ position:fixed; z-index:60; pointer-events:none; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; }
.crosshair .coords{ font-family:'JetBrains Mono',monospace; font-size:9px; color:#4FD8E8; margin-top:2px; white-space:nowrap; }

.boot-screen{ position:fixed; inset:0; background:#0A0D12; z-index:100; display:flex; align-items:center; justify-content:center; }
.boot-lines{ font-family:'JetBrains Mono',monospace; color:#4FD8E8; font-size:13px; }
.boot-line{ margin-bottom:8px; }
.boot-lines .cursor{ display:inline-block; width:8px; height:14px; background:#FFB627; animation:blink 1s steps(1) infinite; }

::selection{ background:#FFB627; color:#0A0D12; }
a{ color:inherit; text-decoration:none; }
button{ font-family:inherit; cursor:pointer; background:none; border:none; color:inherit; }

.statusbar{ position:sticky; top:0; z-index:50; background:rgba(10,13,18,0.88); backdrop-filter:blur(6px); border-bottom:1px solid #223039; }
.statusbar-inner{ display:flex; align-items:center; justify-content:space-between; height:56px; font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:0.04em; }
.rec{ display:flex; align-items:center; gap:8px; color:#FF5D5D; }
.rec .dot{ width:8px; height:8px; border-radius:50%; background:#FF5D5D; animation:pulse 1.4s infinite; }
@keyframes pulse{ 0%,100%{opacity:1} 50%{opacity:0.25} }
.statusbar nav{ display:flex; gap:20px; }
.statusbar nav button{ color:#6E8079; transition:color .2s; text-transform:uppercase; }
.statusbar nav button:hover{ color:#4FD8E8; }
.statusbar nav button.active{ color:#FFB627; }
.statusbar .clock{ color:#6E8079; }
@media (max-width:720px){ .statusbar nav{ display:none; } }

.frame{ position:relative; border:1px solid #223039; background:#10151C; }
.frame .bl, .frame .br{ content:""; position:absolute; width:16px; height:16px; border-color:#4FD8E8; border-style:solid; border-width:0; transition:border-color .25s, width .25s, height .25s; display:block; }
.frame::before, .frame::after{ content:""; position:absolute; width:16px; height:16px; border-color:#4FD8E8; border-style:solid; border-width:0; transition:border-color .25s, width .25s, height .25s; }
.frame::before{ top:-1px; left:-1px; border-top-width:2px; border-left-width:2px; }
.frame::after{ top:-1px; right:-1px; border-top-width:2px; border-right-width:2px; }
.frame .bl{ bottom:-1px; left:-1px; border-bottom-width:2px; border-left-width:2px; }
.frame .br{ bottom:-1px; right:-1px; border-bottom-width:2px; border-right-width:2px; }
.frame:hover::before, .frame:hover::after, .frame:hover .bl, .frame:hover .br{ width:22px; height:22px; border-color:#FFB627; }

.hero{ padding:100px 0 90px; }
.hero-frame{ padding:44px 36px; }
.hero-meta{ display:flex; justify-content:space-between; font-family:'JetBrains Mono',monospace; font-size:11px; color:#6E8079; margin-bottom:34px; flex-wrap:wrap; gap:10px; }
.hero-meta span{ color:#FFB627; }
.hero-name{ font-family:'JetBrains Mono',monospace; font-weight:800; font-size:clamp(34px,6vw,64px); letter-spacing:-0.01em; min-height:1.1em; }
.hero-name .cursor{ display:inline-block; width:0.5em; height:0.85em; background:#FFB627; animation:blink 1s steps(1) infinite; vertical-align:-0.1em; margin-left:4px; }
@keyframes blink{ 50%{opacity:0} }
.role{ font-family:'JetBrains Mono',monospace; color:#4FD8E8; font-size:clamp(14px,2.2vw,18px); margin-top:10px; }
.summary{ max-width:640px; margin-top:26px; color:#B7C4C0; font-size:15px; }
.hud-stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:16px; margin-top:36px; }
.hud-stats .stat{ border-left:2px solid #FFB627; padding-left:10px; }
.hud-stats .stat b{ display:block; font-family:'JetBrains Mono',monospace; font-size:22px; }
.hud-stats .stat span{ font-family:'JetBrains Mono',monospace; font-size:10px; text-transform:uppercase; letter-spacing:0.07em; color:#6E8079; }
.hero-links{ margin-top:38px; display:flex; gap:14px; flex-wrap:wrap; }
.btn{ font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:0.04em; padding:11px 18px; border:1px solid #4FD8E8; color:#4FD8E8; background:transparent; transition:all .2s; text-transform:uppercase; display:inline-flex; align-items:center; gap:8px; }
.btn:hover{ background:#4FD8E8; color:#0A0D12; }
.btn.solid{ background:#FFB627; border-color:#FFB627; color:#0A0D12; }
.btn.solid:hover{ background:transparent; color:#FFB627; }

section{ padding:80px 0; border-top:1px solid #223039; position:relative; }
.section-head{ display:flex; align-items:baseline; gap:14px; margin-bottom:40px; opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease; }
.section-head.in{ opacity:1; transform:none; }
.section-head .idx{ font-family:'JetBrains Mono',monospace; color:#6E8079; font-size:12px; }
.section-head h2{ font-family:'JetBrains Mono',monospace; font-size:26px; letter-spacing:-0.01em; text-transform:uppercase; }
.section-head .rule{ flex:1; height:1px; background:#223039; }

.log{ font-family:'JetBrains Mono',monospace; font-size:13px; color:#A9BAB5; background:#141B23; border:1px solid #223039; padding:22px 24px; white-space:pre-wrap; }
.log .k{ color:#FFB627; }
.log .v{ color:#4FD8E8; }

.chart-frame{ padding:20px 24px; margin-bottom:22px; }
.chart-label{ font-family:'JetBrains Mono',monospace; font-size:11px; color:#6E8079; display:flex; align-items:center; gap:8px; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.06em; }

.skill-groups{ display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:18px; }
.skill-card{ padding:20px; }
.skill-card .cat{ font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:#FFB627; margin-bottom:14px; display:block; }
.chips{ display:flex; flex-wrap:wrap; gap:8px; }
.chip{ font-family:'JetBrains Mono',monospace; font-size:11.5px; border:1px solid #223039; padding:5px 10px; background:#141B23; }

.filter-row{ display:flex; flex-wrap:wrap; gap:10px; margin-bottom:26px; opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease; }
.filter-row.in{ opacity:1; transform:none; }
.filter-chip{ font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; padding:7px 13px; border:1px solid #223039; color:#6E8079; transition:all .2s; }
.filter-chip:hover{ border-color:#4FD8E8; color:#4FD8E8; }
.filter-chip.active{ background:#4FD8E8; border-color:#4FD8E8; color:#0A0D12; }

.projects{ display:flex; flex-direction:column; gap:22px; }
.project{ padding:28px; }
.project-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:14px; flex-wrap:wrap; margin-bottom:10px; }
.project h3{ font-family:'JetBrains Mono',monospace; font-size:19px; }
.project .subtitle{ font-size:13px; color:#6E8079; margin-top:3px; }
.confidence{ font-family:'JetBrains Mono',monospace; font-size:11px; color:#FF5D5D; border:1px solid rgba(255,93,93,0.4); background:rgba(255,93,93,0.08); padding:4px 9px; white-space:nowrap; height:fit-content; }
.stack{ display:flex; flex-wrap:wrap; gap:8px; margin:14px 0; }
.stack span{ font-family:'JetBrains Mono',monospace; font-size:11px; color:#4FD8E8; border:1px solid rgba(79,216,232,0.3); padding:4px 9px; }
.expand-btn{ font-family:'JetBrains Mono',monospace; font-size:11px; color:#FFB627; display:inline-flex; align-items:center; gap:6px; text-transform:uppercase; letter-spacing:0.05em; margin-top:6px; }
.detail-list{ margin:16px 0 4px 18px; color:#B7C4C0; font-size:14px; }
.detail-list li{ margin-bottom:8px; }

.timeline{ position:relative; padding-left:26px; opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease; }
.timeline.in{ opacity:1; transform:none; }
.timeline::before{ content:""; position:absolute; left:5px; top:6px; bottom:6px; width:1px; background:#223039; }
.tl-item{ position:relative; padding-bottom:34px; }
.tl-item:last-child{ padding-bottom:0; }
.tl-item::before{ content:""; position:absolute; left:-25px; top:4px; width:11px; height:11px; background:#0A0D12; border:2px solid #FFB627; border-radius:50%; }
.tl-item .yr{ font-family:'JetBrains Mono',monospace; font-size:11px; color:#6E8079; }
.tl-item h4{ font-family:'JetBrains Mono',monospace; font-size:16px; margin:4px 0 3px; }
.tl-item p{ font-size:13.5px; color:#6E8079; }

.cert-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; }
.cert{ font-family:'JetBrains Mono',monospace; font-size:12.5px; color:#B7C4C0; padding:16px 18px; display:flex; gap:10px; align-items:flex-start; }
.cert-dot{ margin-top:5px; flex-shrink:0; }

.terminal{ padding:28px 30px; font-family:'JetBrains Mono',monospace; font-size:13px; opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease; }
.terminal.in{ opacity:1; transform:none; }
.terminal .prompt{ color:#FFB627; }
.terminal .line{ margin-bottom:10px; }
.terminal .line.muted{ color:#6E8079; }
.contact-links{ display:flex; flex-wrap:wrap; gap:14px; margin-top:20px; }
.contact-links a{ font-family:'JetBrains Mono',monospace; font-size:12px; color:#4FD8E8; border:1px solid rgba(79,216,232,0.3); padding:8px 14px; transition:all .2s; display:inline-flex; align-items:center; gap:7px; }
.contact-links a:hover{ background:#4FD8E8; color:#0A0D12; }
footer .fine{ margin-top:40px; font-family:'JetBrains Mono',monospace; font-size:10.5px; color:#6E8079; text-align:center; }

[data-reveal]{ opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease; }
[data-reveal].in{ opacity:1; transform:none; }

@media (prefers-reduced-motion: reduce){
  .rec .dot, .hero-name .cursor, .boot-lines .cursor{ animation:none; }
  [data-reveal], .site, .section-head, .timeline, .terminal, .filter-row{ opacity:1 !important; transform:none !important; transition:none !important; }
}
`;
