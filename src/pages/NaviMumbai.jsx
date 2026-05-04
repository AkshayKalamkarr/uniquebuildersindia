import { useState, useEffect, useRef } from "react";

/* ── hooks ── */
const useInView = (threshold = 0.1) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
};

/* ── animated counter ── */
const AnimatedNumber = ({ target, suffix = "", prefix = "" }) => {
    const [val, setVal] = useState(0);
    const [ref, inView] = useInView();
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const end = parseFloat(target);
        const step = end / (1600 / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setVal(end); clearInterval(timer); }
            else setVal(parseFloat(start.toFixed(1)));
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);
    return <span ref={ref}>{prefix}{val}{suffix}</span>;
};

/* ── reveal wrapper ── */
const Reveal = ({ children, delay = 0, className = "" }) => {
    const [ref, inView] = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(32px)",
            transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
        }}>
            {children}
        </div>
    );
};

/* ── bar chart ── */
function BarChart({ data }) {
    const [ref, inView] = useInView(0.2);
    const max = Math.max(...data.flatMap(d => [d.demand, d.supply]));
    return (
        <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
            {data.map((d, i) => (
                <div key={d.year} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", width: "100%", height: 136 }}>
                        <div style={{ flex: 1, borderRadius: "4px 4px 0 0", background: "#D4A017", transition: "height 1s ease", height: inView ? `${(d.demand / max) * 100}%` : "0%", transitionDelay: `${i * 80}ms` }} />
                        <div style={{ flex: 1, borderRadius: "4px 4px 0 0", background: "#C0C8DC", transition: "height 1s ease", height: inView ? `${(d.supply / max) * 100}%` : "0%", transitionDelay: `${i * 80 + 40}ms` }} />
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#9CA3AF" }}>{d.year}</div>
                </div>
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function NaviMumbaiRising() {
    const [hoveredImg, setHoveredImg] = useState(null);

    return (
        <div style={{
            background: "#FAFAF7",
            color: "#1A1A2E",
            fontFamily: "'DM Sans', sans-serif",
            overflowX: "hidden",
            minHeight: "100vh"
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nm-accent { color: #D4A017; }
        .nm-muted  { color: #6B7280; }

        .nm-tag {
          display: inline-block;
          background: #FBF8EF;
          color: #9A6E0A;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid #EDE8D8;
          font-family: 'DM Sans', sans-serif;
        }
        .nm-tag-dark {
          display: inline-block;
          background: rgba(212,160,23,0.15);
          color: #D4A017;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(212,160,23,0.3);
          font-family: 'DM Sans', sans-serif;
        }

        .nm-card {
          background: #ffffff;
          border: 1px solid #EBEBE3;
          border-radius: 20px;
          padding: 28px;
        }
        .nm-card-tinted {
          background: #FBF8EF;
          border: 1px solid #EDE8D8;
          border-radius: 20px;
          padding: 28px;
        }
        .nm-card-dark {
          background: #1A1A2E;
          border-radius: 20px;
          padding: 32px;
          color: #fff;
        }

        .nm-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .nm-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(212,160,23,0.14);
        }

        .nm-divider { height: 1px; background: #E5E5DC; }
        .nm-accent-bar { height: 3px; width: 52px; background: #D4A017; border-radius: 2px; }

        .nm-hero-num {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(5.5rem, 17vw, 12rem);
          line-height: 0.88;
          color: #1A1A2E;
          letter-spacing: 0.02em;
        }
        .nm-bebas { font-family: 'Bebas Neue', cursive; }
        .nm-cormorant { font-family: 'Cormorant Garamond', serif; }
        .nm-dm { font-family: 'DM Sans', sans-serif; }

        .nm-grid-bg {
          background-image:
            linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .nm-stripe {
          background: repeating-linear-gradient(
            -45deg, transparent, transparent 3px,
            rgba(212,160,23,0.05) 3px, rgba(212,160,23,0.05) 6px
          );
        }

        .nm-pulse { animation: nmPulse 2.6s ease-in-out infinite; }
        @keyframes nmPulse { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }

        /* ── IMAGE SHOWCASE ── */
        .nm-img-showcase {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 20px;
          align-items: stretch;
        }

        .nm-img-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
        }

        .nm-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }

        .nm-img-card:hover img {
          transform: scale(1.06);
        }

        .nm-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(13, 27, 62, 0.88) 0%,
            rgba(13, 27, 62, 0.3) 45%,
            rgba(13, 27, 62, 0.05) 100%
          );
          transition: opacity 0.4s ease;
        }

        .nm-img-card:hover .nm-img-overlay {
          opacity: 0.92;
        }

        .nm-img-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 28px 32px;
          transform: translateY(0);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .nm-img-detail {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s;
          margin-top: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
        }

        .nm-img-card:hover .nm-img-detail {
          opacity: 1;
          transform: translateY(0);
        }

        .nm-img-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(212,160,23,0.9);
          backdrop-filter: blur(8px);
          border-radius: 100px;
          padding: 6px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1A1A2E;
        }

        .nm-img-number {
          position: absolute;
          top: 20px;
          left: 20px;
          font-family: 'Bebas Neue', cursive;
          font-size: 52px;
          line-height: 1;
          color: rgba(255,255,255,0.12);
          pointer-events: none;
          transition: color 0.4s;
        }

        .nm-img-card:hover .nm-img-number {
          color: rgba(212,160,23,0.2);
        }

        .nm-img-line {
          width: 36px;
          height: 2px;
          background: #D4A017;
          border-radius: 2px;
          margin-bottom: 10px;
          transition: width 0.4s ease;
        }

        .nm-img-card:hover .nm-img-line {
          width: 56px;
        }

        /* ── RESPONSIVE ── */
        .nm-px { padding-left: clamp(20px, 7vw, 110px); padding-right: clamp(20px, 7vw, 110px); }
        .nm-section { padding-top: 96px; padding-bottom: 96px; }

        .nm-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .nm-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .nm-two-col-center {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .nm-stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }
        .nm-four-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
        .nm-six-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
        .nm-infra-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .nm-chart-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .nm-split-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .nm-hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .nm-two-col { grid-template-columns: 1fr; gap: 40px; }
          .nm-two-col-center { grid-template-columns: 1fr; gap: 40px; }
          .nm-chart-grid { grid-template-columns: 1fr; gap: 40px; }
          .nm-split-card { grid-template-columns: 1fr; }
          .nm-section { padding-top: 64px; padding-bottom: 64px; }
          .nm-hero-num { font-size: clamp(4.5rem, 20vw, 9rem); }
          .nm-summary-grid { grid-template-columns: 1fr !important; }
          .nm-img-showcase { grid-template-columns: 1fr; }
          .nm-img-card { min-height: 340px; }
        }

        @media (max-width: 560px) {
          .nm-hero-num { font-size: clamp(4rem, 22vw, 7rem); }
          .nm-section { padding-top: 48px; padding-bottom: 48px; }
          .nm-img-card { min-height: 280px; }
          .nm-img-content { padding: 20px 20px 24px; }
        }
      `}</style>

            {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
            <section className="nm-px" style={{
                paddingTop: 72,
                paddingBottom: 80,
                minHeight: "95vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden"
            }}>
                <div className="nm-grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.7, pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: "-60px", top: "5%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div className="nm-hero-grid" style={{ position: "relative", zIndex: 2, width: "100%" }}>
                    <div>
                        <Reveal delay={0}>
                            <span className="nm-tag" style={{ marginBottom: 28, display: "inline-block" }}>A Comprehensive Perspective · 2026</span>
                        </Reveal>
                        <Reveal delay={100}>
                            <div className="nm-cormorant" style={{ fontSize: "clamp(1.1rem,2.5vw,1.8rem)", color: "#9CA3AF", fontStyle: "italic", marginBottom: 6 }}>Navi Mumbai</div>
                        </Reveal>
                        <Reveal delay={180}>
                            <div className="nm-hero-num">RISING</div>
                        </Reveal>
                        <Reveal delay={280}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginTop: 32, marginBottom: 40 }}>
                                <div style={{ width: 3, minWidth: 3, height: 80, background: "#D4A017", borderRadius: 2, marginTop: 4 }} />
                                <p className="nm-dm nm-muted" style={{ fontSize: "clamp(14px,1.8vw,16px)", lineHeight: 1.8 }}>
                                    India's Next Commercial Real Estate Hub — emerging as MMR's primary office growth market with Grade A/A+ space, superior affordability, and world-class infrastructure underway.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={380}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                {[
                                    { label: "Office Stock", val: "32.7 MSF" },
                                    { label: "Active Occupiers", val: "430+" },
                                    { label: "Infrastructure", val: "₹1L Cr" },
                                    { label: "REIT Portfolio", val: "~30%" },
                                ].map(({ label, val }) => (
                                    <div key={label} className="nm-card" style={{ padding: "14px 22px", borderRadius: 16, minWidth: 110, flex: "0 0 auto" }}>
                                        <div className="nm-bebas nm-accent" style={{ fontSize: 22, lineHeight: 1 }}>{val}</div>
                                        <div className="nm-dm nm-muted" style={{ fontSize: 10, marginTop: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={200}>
                        <div style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            border: "1px solid rgba(212,160,23,0.2)",
                            boxShadow: "0 32px 80px rgba(13,27,62,0.35)",
                            position: "relative",
                            aspectRatio: "4/3"
                        }}>
                            <img src="/images/homepage/navimumbaiairport.jpg" alt="Navi Mumbai Airport" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{
                                position: "absolute", bottom: 20, left: 20,
                                background: "rgba(13,27,62,0.88)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(212,160,23,0.3)",
                                borderRadius: 14,
                                padding: "12px 18px"
                            }}>
                                <div className="nm-dm" style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Mumbai Metropolitan Region</div>
                                <div className="nm-bebas nm-accent" style={{ fontSize: 18 }}>Mumbai 3.0 — The Next Chapter</div>
                            </div>
                            {[[68, 42], [82, 28], [72, 56]].map(([top, left], i) => (
                                <div key={i} className="nm-pulse" style={{
                                    position: "absolute", top: `${top}%`, left: `${left}%`,
                                    width: 8, height: 8, borderRadius: "50%",
                                    background: "#D4A017",
                                    animationDelay: `${i * 0.8}s`
                                }} />
                            ))}
                        </div>
                    </Reveal>
                </div>

                <div style={{
                    position: "absolute", right: "clamp(20px,4vw,50px)", top: "50%",
                    transform: "translateY(-50%) rotate(90deg)", transformOrigin: "right center",
                    display: "flex", alignItems: "center", gap: 10
                }}>
                    <div style={{ width: 40, height: 1, background: "#D4A017", opacity: 0.5 }} />
                    <span className="nm-dm" style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#C0B8A0", whiteSpace: "nowrap" }}>Mumbai Metropolitan Region · 2026</span>
                </div>
            </section>

            <div className="nm-divider" style={{ margin: "0 clamp(20px,7vw,110px)" }} />

            {/* ══════════════════════════════════════
          SUMMARY STRIP
      ══════════════════════════════════════ */}
            <section className="nm-section nm-px">
                <div className="nm-summary-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0 0", alignItems: "stretch" }}>
                    <Reveal delay={0}>
                        <div style={{ paddingRight: "clamp(24px,4vw,56px)" }}>
                            <div className="nm-accent-bar" style={{ marginBottom: 24 }} />
                            <h2 className="nm-cormorant" style={{ fontSize: "clamp(1.7rem,3vw,2.6rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: 24 }}>
                                Consolidated<br />
                                <span style={{ fontStyle: "italic", color: "#6B7280" }}>Market Summary</span>
                            </h2>
                            <p className="nm-dm nm-muted" style={{ fontSize: 15, lineHeight: 1.9 }}>
                                Navi Mumbai has emerged as a <strong style={{ color: "#D4A017", fontWeight: 600 }}>structurally significant commercial real estate market</strong> within the Mumbai Metropolitan Region. Its emergence is driven by the convergence of infrastructure delivery, institutional office supply, and secular demand.
                            </p>
                        </div>
                    </Reveal>

                    <div style={{ width: 1, background: "#EBEBE3", margin: "0 0" }} />

                    <Reveal delay={160}>
                        <div style={{ paddingLeft: "clamp(24px,4vw,56px)" }}>
                            <div className="nm-accent-bar" style={{ marginBottom: 24 }} />
                            <h3 className="nm-cormorant" style={{ fontSize: "clamp(1.4rem,2.4vw,2rem)", fontWeight: 600, marginBottom: 20 }}>
                                Implications for<br />
                                <span style={{ fontStyle: "italic", color: "#6B7280" }}>Occupiers & Investors</span>
                            </h3>
                            <p className="nm-dm nm-muted" style={{ fontSize: 15, lineHeight: 1.9 }}>
                                For occupiers, Navi Mumbai offers <strong style={{ color: "#D4A017", fontWeight: 600 }}>income stability, growth visibility, and scalability</strong>. For investors, demand-driven consolidation is underway with leading players preferring large-format campus-style developments.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══════════════════════════════════════
          IMAGE SHOWCASE — above Demographics
      ══════════════════════════════════════ */}
            <section className="nm-px" style={{ paddingBottom: 80, paddingTop: 0 }}>
                <Reveal delay={0}>
                    {/* Section label */}
                    <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
                        <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, #E5E5DC, transparent)" }} />
                        <span className="nm-tag">City · Infrastructure · Vision</span>
                        <div style={{ height: 1, flex: 1, background: "linear-gradient(270deg, #E5E5DC, transparent)" }} />
                    </div>
                </Reveal>

                <div className="nm-img-showcase" style={{ height: "clamp(360px, 52vw, 580px)" }}>
                    {/* IMAGE 1 — wider */}
                    <Reveal delay={80} className="nm-img-card">
                        <div
                            className="nm-img-card"
                            style={{ height: "100%", background: "#0D1B3E" }}
                            onMouseEnter={() => setHoveredImg(0)}
                            onMouseLeave={() => setHoveredImg(null)}
                        >
                            <img
                                src="/images/homepage/atal-setu.png"
                                alt="Navi Mumbai International Airport"
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                            <div className="nm-img-overlay" />

                            {/* Large ghost number */}
                            <div className="nm-img-number">01</div>

                            {/* Top badge */}
                            <div className="nm-img-badge">Atal Setu</div>

                            {/* Bottom content */}
                            <div className="nm-img-content">
                                <div className="nm-img-line" />
                                <div className="nm-bebas" style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#fff", lineHeight: 1.1, marginBottom: 4 }}>
                                    Navi Mumbai to<br />
                                    <span style={{ color: "#D4A017" }}>Mumbai Atal setu</span>
                                </div>
                                <div className="nm-img-detail">
                                    The bridge you shared is Atal Setu, officially called the Mumbai Trans Harbour Link (MTHL) — one of India’s biggest infrastructure projects.
                                </div>
                                <div style={{
                                    display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap"
                                }}>
                                    {["₹17,840 Cr Investment", "2024 Opened", "Connects Sewri (Mumbai) → Chirle (Navi Mumbai)"].map(tag => (
                                        <div key={tag} style={{
                                            background: "rgba(212,160,23,0.18)",
                                            border: "1px solid rgba(212,160,23,0.35)",
                                            borderRadius: 100,
                                            padding: "4px 12px",
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: 10,
                                            fontWeight: 600,
                                            color: "#D4A017",
                                            letterSpacing: "0.08em",
                                            whiteSpace: "nowrap"
                                        }}>{tag}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* IMAGE 2 — narrower, with 2 stacked zones */}
                    <Reveal delay={180}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
                            {/* Top image card */}
                            <div
                                className="nm-img-card"
                                style={{ flex: "1 1 55%", background: "#111827", minHeight: 0 }}
                                onMouseEnter={() => setHoveredImg(1)}
                                onMouseLeave={() => setHoveredImg(null)}
                            >
                                <img
                                    src="/images/homepage/traintrans.jpg"
                                    alt="Trans Harbour Link"
                                    style={{
                                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                                        filter: "hue-rotate(180deg) saturate(0.6) brightness(0.85)"
                                    }}
                                />
                                <div className="nm-img-overlay" />
                                <div className="nm-img-number" style={{ fontSize: 40 }}>02</div>
                                <div className="nm-img-badge" style={{ fontSize: 9 }}>Sea Link</div>
                                <div className="nm-img-content" style={{ padding: "18px 22px 22px" }}>
                                    <div className="nm-img-line" />
                                    <div className="nm-bebas" style={{ fontSize: "clamp(18px, 2.4vw, 24px)", color: "#fff", lineHeight: 1.1 }}>
                                        Trans Harbour Link<br />
                                        <span style={{ color: "#D4A017" }}>21.8 km Connectivity</span>
                                    </div>
                                    <div className="nm-img-detail" style={{ fontSize: 12 }}>
                                        Mumbai to Navi Mumbai in just 20 minutes — cutting commute time by over 60%.
                                    </div>
                                </div>
                            </div>

                            {/* Bottom stat banner */}
                            <div style={{
                                flex: "0 0 auto",
                                background: "#1A1A2E",
                                borderRadius: 20,
                                padding: "22px 24px",
                                display: "flex",
                                alignItems: "center",
                                gap: 0,
                                border: "1px solid rgba(212,160,23,0.18)",
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                {/* Decorative stripe */}
                                <div style={{
                                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                    background: "linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2))"
                                }} />
                                <div style={{
                                    position: "absolute", right: -20, bottom: -20,
                                    width: 100, height: 100, borderRadius: "50%",
                                    background: "rgba(212,160,23,0.06)"
                                }} />

                                {[
                                    { val: "₹1L Cr", label: "Infra Pipeline" },
                                    { val: "2026", label: "Metro Delivery" },
                                    { val: "5+", label: "Corridors" },
                                ].map((stat, i, arr) => (
                                    <div key={stat.label} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                                        {i > 0 && (
                                            <div style={{
                                                position: "absolute", left: 0, top: "10%",
                                                width: 1, height: "80%",
                                                background: "rgba(255,255,255,0.08)"
                                            }} />
                                        )}
                                        <div className="nm-bebas nm-accent" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: 1 }}>{stat.val}</div>
                                        <div className="nm-dm" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", marginTop: 5 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Scroll hint */}
                <Reveal delay={300}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28, paddingLeft: 4 }}>
                        <div style={{ width: 28, height: 1, background: "#D4A017" }} />
                        <span className="nm-dm" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9CA3AF" }}>Infrastructure · Connectivity · Growth</span>
                    </div>
                </Reveal>
            </section>

            {/* ══════════════════════════════════════
          DEMOGRAPHICS – dark section
      ══════════════════════════════════════ */}
            <section style={{ background: "#1A1A2E", padding: "96px clamp(20px,7vw,110px)", position: "relative", overflow: "hidden" }}>
                <div className="nm-stripe" style={{ position: "absolute", inset: 0 }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                    <Reveal>
                        <span className="nm-tag-dark" style={{ marginBottom: 24, display: "inline-block" }}>Demographics</span>
                        <h2 className="nm-cormorant" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.15, marginBottom: 56 }}>
                            Navi Mumbai <span style={{ color: "#D4A017", fontStyle: "italic" }}>by the Numbers</span>
                        </h2>
                    </Reveal>

                    <div className="nm-four-grid">
                        {[
                            { num: "2", suf: "M", label: "Population (2025)", icon: "⬡", body: "Navi Mumbai's resident population, growing at one of MMR's fastest rates year on year." },
                            { num: "4.3", suf: "%", label: "Annual Growth Rate", icon: "◈", body: "Year-on-year population expansion, driven by employment inflow and infrastructure pull." },
                            { num: "62", suf: "%", label: "Middle & High Income Share", icon: "◇", body: "Highest concentration of affluent households in the MMR — a powerful demand multiplier." },
                            { num: "8.9", suf: "%", label: "Share of MMR Population", icon: "○", body: "Of total MMR population, yet commands outsized share of regional economic activity." },
                        ].map((s, i) => (
                            <Reveal key={s.label} delay={i * 80}>
                                <div className="nm-hover" style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.09)",
                                    borderRadius: 20, padding: 32
                                }}>
                                    <div style={{ color: "#D4A017", fontSize: 22, marginBottom: 20 }}>{s.icon}</div>
                                    <div className="nm-bebas nm-accent" style={{ fontSize: 58, lineHeight: 1 }}>
                                        <AnimatedNumber target={parseFloat(s.num)} suffix={s.suf} />
                                    </div>
                                    <div className="nm-dm" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "10px 0 14px" }}>{s.label}</div>
                                    <div style={{ height: 1, background: "linear-gradient(90deg, rgba(212,160,23,0.5), transparent)", marginBottom: 14 }} />
                                    <p className="nm-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{s.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          INCOME PROFILE
      ══════════════════════════════════════ */}
            <section className="nm-section nm-px">
                <div className="nm-two-col-center">
                    <Reveal>
                        <div>
                            <span className="nm-tag" style={{ marginBottom: 24, display: "inline-block" }}>Income Profile</span>
                            <h2 className="nm-cormorant" style={{ fontSize: "clamp(1.8rem,3.2vw,2.8rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: 24 }}>
                                Household Income<br /><span style={{ fontStyle: "italic", color: "#6B7280" }}>Mumbai vs Navi Mumbai</span>
                            </h2>
                            <p className="nm-dm nm-muted" style={{ fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
                                Navi Mumbai's skew toward higher-income households is a structural demand driver — premium commercial and residential grades see disproportionate absorption.
                            </p>
                            <div style={{ display: "flex", gap: 28 }}>
                                {[["#C0C8DC", "Mumbai"], ["#D4A017", "Navi Mumbai"]].map(([c, l]) => (
                                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: 3, background: c }} />
                                        <span className="nm-dm nm-muted" style={{ fontSize: 13 }}>{l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={160}>
                        <div className="nm-card" style={{ padding: 36 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                {[
                                    { label: "> ₹5,00,000", mum: 22, navi: 38 },
                                    { label: "₹3,00,000–5,00,000", mum: 18, navi: 28 },
                                    { label: "₹2,00,000–3,00,000", mum: 20, navi: 18 },
                                    { label: "₹1,20,000–2,00,000", mum: 18, navi: 10 },
                                    { label: "₹60,000–1,20,000", mum: 14, navi: 5 },
                                    { label: "₹20,000–60,000", mum: 8, navi: 1 },
                                ].map(row => (
                                    <div key={row.label}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                                            <span className="nm-dm nm-muted" style={{ fontSize: 12 }}>{row.label}</span>
                                            <div style={{ display: "flex", gap: 14 }}>
                                                <span className="nm-dm" style={{ fontSize: 12, color: "#6B7280" }}>{row.mum}%</span>
                                                <span className="nm-dm nm-accent" style={{ fontSize: 12, fontWeight: 600 }}>{row.navi}%</span>
                                            </div>
                                        </div>
                                        <div style={{ height: 8, borderRadius: 4, background: "#C0C8DC", width: `${row.mum * 2.4}%`, marginBottom: 4 }} />
                                        <div style={{ height: 6, borderRadius: 4, background: "#D4A017", width: `${row.navi * 2.4}%`, opacity: 0.85 }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="nm-divider" style={{ margin: "0 clamp(20px,7vw,110px)" }} />

            {/* ══════════════════════════════════════
          MMR GROWTH CORE
      ══════════════════════════════════════ */}
            <section className="nm-section nm-px">
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 72 }}>
                        <span className="nm-tag" style={{ marginBottom: 20, display: "inline-block" }}>MMR Ecosystem</span>
                        <h2 className="nm-cormorant" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 600 }}>
                            MMR's New <span className="nm-accent" style={{ fontStyle: "italic" }}>Growth Core</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="nm-two-col-center">
                    <Reveal delay={100}>
                        <div className="nm-card-tinted" style={{ padding: 0, overflow: "hidden", borderRadius: 24 }}>
                            <svg viewBox="0 0 420 460" style={{ width: "100%", display: "block" }} xmlns="http://www.w3.org/2000/svg">
                                {[...Array(10)].map((_, i) => (
                                    <line key={i} x1={0} y1={i * 46} x2={420} y2={i * 46} stroke="rgba(212,160,23,0.05)" strokeWidth="1" />
                                ))}
                                <ellipse cx="210" cy="180" rx="58" ry="52" fill="rgba(192,200,220,0.25)" stroke="#C0C8DC" strokeWidth="1.5" />
                                <ellipse cx="145" cy="250" rx="62" ry="90" fill="rgba(192,200,220,0.3)" stroke="#C0C8DC" strokeWidth="1.5" />
                                <ellipse cx="330" cy="360" rx="42" ry="38" fill="rgba(192,200,220,0.2)" stroke="#C0C8DC" strokeWidth="1" />
                                <ellipse cx="265" cy="300" rx="72" ry="68" fill="rgba(212,160,23,0.1)" stroke="#D4A017" strokeWidth="2" />
                                <ellipse cx="265" cy="300" rx="72" ry="68" fill="none" stroke="#D4A017" strokeWidth="1" strokeDasharray="5 5" opacity="0.35" />
                                <text x="265" y="295" textAnchor="middle" fill="#D4A017" fontSize="14" fontFamily="'Cormorant Garamond',serif" fontWeight="600">Navi Mumbai</text>
                                <text x="265" y="314" textAnchor="middle" fill="rgba(212,160,23,0.65)" fontSize="11" fontFamily="'DM Sans',sans-serif">Next Growth Core</text>
                                <text x="143" y="253" textAnchor="middle" fill="#6B7280" fontSize="12" fontFamily="'DM Sans',sans-serif">Mumbai</text>
                                <text x="208" y="183" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="'DM Sans',sans-serif">Thane</text>
                                <text x="330" y="363" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="'DM Sans',sans-serif">Panvel</text>
                                <line x1="143" y1="208" x2="218" y2="228" stroke="rgba(212,160,23,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                                <line x1="230" y1="240" x2="252" y2="258" stroke="rgba(212,160,23,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                                {[[150, 150], [340, 140], [88, 195], [355, 280]].map(([x, y], i) => (
                                    <circle key={i} cx={x} cy={y} r="4" fill="#D4A017" opacity="0.45" style={{ animation: `nmPulse 2.6s ease-in-out ${i * 0.6}s infinite` }} />
                                ))}
                                <circle cx="265" cy="225" r="22" fill="#1A1A2E" />
                                <text x="265" y="221" textAnchor="middle" fill="#D4A017" fontSize="7" fontFamily="'DM Sans',sans-serif" fontWeight="600" letterSpacing="1">MUMBAI</text>
                                <text x="265" y="234" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="'Bebas Neue',cursive">3.0</text>
                                <rect x="8" y="8" width="104" height="26" rx="13" fill="#D4A017" />
                                <text x="60" y="25" textAnchor="middle" fill="#1A1A2E" fontSize="11" fontFamily="'DM Sans',sans-serif" fontWeight="600">Mumbai 3.0</text>
                            </svg>
                        </div>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {[
                            { num: "01", title: "Institutional Catalyst", body: "Educational and economic proposals bring jobs and investment, reducing dependency on Mumbai as the primary employment hub." },
                            { num: "02", title: "Fastest Accessible Corridor", body: "Faster commuting expands the effective reach to both residential and economic zones — Navi Mumbai is no longer far from established areas." },
                            { num: "03", title: "Long-Term Appreciation", body: "Real estate here is expected to benefit from sustained capital appreciation, attracting investors and homebuyers alike." },
                            { num: "04", title: "Future-Ready Infrastructure", body: "Navi Mumbai's integrated axis will improve living standards and reduce congestion, making the MMR more economically sustainable." },
                        ].map((item, i) => (
                            <Reveal key={item.title} delay={i * 80}>
                                <div className="nm-hover" style={{ display: "flex", gap: 20, padding: "20px 24px", background: "#fff", border: "1px solid #EBEBE3", borderRadius: 16 }}>
                                    <div className="nm-bebas nm-accent" style={{ fontSize: 34, lineHeight: 1, minWidth: 38 }}>{item.num}</div>
                                    <div>
                                        <div className="nm-dm" style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#1A1A2E" }}>{item.title}</div>
                                        <div className="nm-dm nm-muted" style={{ fontSize: 13, lineHeight: 1.75 }}>{item.body}</div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          INFRASTRUCTURE
      ══════════════════════════════════════ */}
            <section style={{ background: "#F5F3EC", padding: "96px 0", overflow: "hidden" }}>
                <div className="nm-px">
                    <Reveal>
                        <div className="nm-two-col" style={{ alignItems: "flex-end", marginBottom: 64 }}>
                            <div>
                                <span className="nm-tag" style={{ marginBottom: 24, display: "inline-block" }}>Infrastructure</span>
                                <h2 className="nm-cormorant" style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)", fontWeight: 600, lineHeight: 1.15 }}>
                                    Navi Mumbai's<br /><span className="nm-accent" style={{ fontStyle: "italic" }}>₹1 Lakh Cr Backbone</span>
                                </h2>
                            </div>
                            <p className="nm-dm nm-muted" style={{ fontSize: 15, lineHeight: 1.88 }}>
                                Conceived as a planned urban extension, Navi Mumbai's infrastructure has been developed to systematically decongest Mumbai while enabling balanced residential, commercial, retail and industrial growth.
                            </p>
                        </div>
                    </Reveal>

                    <div className="nm-infra-grid">
                        {[
                            { icon: "✈", title: "NMIA", subtitle: "New International Airport", body: "Transformative connectivity unlocking global-grade occupier demand and residential catchment expansion.", dark: true },
                            { icon: "🌉", title: "Trans Harbour Link", subtitle: "Cuts commute by 60 min", body: "The 21.8 km sea bridge collapses travel time between Mumbai and Navi Mumbai to just 20 minutes.", dark: false },
                            { icon: "⚡", title: "Metro Lines", subtitle: "Multiple new corridors", body: "Lines 1 and 2 expanding intracity mobility; smart feeder networks planned for 2026–2028 delivery.", dark: false },
                            { icon: "🛣", title: "MTHL Freeway", subtitle: "Highway upgrades", body: "Upgraded road networks and freight corridors improving last-mile connectivity to industrial zones.", dark: false },
                        ].map((item, i) => (
                            <Reveal key={item.title} delay={i * 70}>
                                <div className="nm-hover" style={{
                                    background: item.dark ? "#1A1A2E" : "#fff",
                                    border: item.dark ? "none" : "1px solid #EBEBE3",
                                    borderRadius: 20, padding: 32, height: "100%"
                                }}>
                                    <div style={{ fontSize: 30, marginBottom: 20 }}>{item.icon}</div>
                                    <div className="nm-bebas" style={{ fontSize: 24, color: item.dark ? "#D4A017" : "#1A1A2E", marginBottom: 5 }}>{item.title}</div>
                                    <div className="nm-dm" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 14 }}>{item.subtitle}</div>
                                    <div style={{ height: 1, background: item.dark ? "rgba(212,160,23,0.25)" : "#EBEBE3", marginBottom: 14 }} />
                                    <p className="nm-dm" style={{ fontSize: 13, lineHeight: 1.8, color: item.dark ? "rgba(255,255,255,0.55)" : "#6B7280" }}>{item.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          COMMERCIAL REAL ESTATE
      ══════════════════════════════════════ */}
            <section className="nm-section nm-px">
                <Reveal>
                    <div style={{ marginBottom: 64 }}>
                        <span className="nm-tag" style={{ marginBottom: 20, display: "inline-block" }}>Commercial Real Estate</span>
                        <div className="nm-two-col" style={{ alignItems: "flex-end" }}>
                            <h2 className="nm-cormorant" style={{ fontSize: "clamp(2rem,5vw,4.2rem)", fontWeight: 600, lineHeight: 1.1 }}>
                                India's Next<br /><span className="nm-accent">Growth Engine</span>
                            </h2>
                            <p className="nm-dm nm-muted" style={{ fontSize: 15, lineHeight: 1.85 }}>
                                MMR's scale-driven office hub, anchored by large-format developments and an expanding infrastructure backbone. Navi Mumbai has emerged as MMR's primary office growth market.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <div className="nm-stat-grid" style={{ marginBottom: 48 }}>
                    {[
                        { val: "32.7 MSF", label: "Grade A/A+ Stock" },
                        { val: "430+", label: "Active Occupiers" },
                        { val: "13.8%", label: "Vacancy Rate" },
                        { val: "3.1 MSF", label: "Avg Annual Demand" },
                        { val: "0.8 MSF", label: "Avg Annual Supply" },
                    ].map((s, i) => (
                        <Reveal key={s.label} delay={i * 60}>
                            <div className="nm-card-tinted nm-hover" style={{ textAlign: "center", padding: "28px 20px" }}>
                                <div className="nm-bebas nm-accent" style={{ fontSize: 32, lineHeight: 1 }}>{s.val}</div>
                                <div className="nm-dm nm-muted" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={100}>
                    <div className="nm-split-card" style={{ marginBottom: 48 }}>
                        <div className="nm-card-dark nm-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                            <div>
                                <div className="nm-dm" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 10 }}>North Navi Mumbai</div>
                                <div className="nm-bebas nm-accent" style={{ fontSize: 48 }}>17.0 MSF</div>
                                <div className="nm-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 5 }}>12.3 MSF Grade A+</div>
                            </div>
                            <div style={{ width: 1, height: 80, background: "rgba(255,255,255,0.1)" }} />
                            <div style={{ textAlign: "right" }}>
                                <div className="nm-dm" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 10 }}>South Navi Mumbai</div>
                                <div className="nm-bebas" style={{ fontSize: 48, color: "#C0C8DC" }}>15.7 MSF</div>
                                <div className="nm-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 5 }}>11.2 MSF Grade A+</div>
                            </div>
                        </div>
                        <div className="nm-card nm-hover" style={{ display: "flex", alignItems: "center" }}>
                            <div>
                                <div className="nm-accent-bar" style={{ marginBottom: 20 }} />
                                <div className="nm-cormorant" style={{ fontSize: 22, fontWeight: 600, color: "#1A1A2E", marginBottom: 12, lineHeight: 1.3 }}>Demand significantly outpacing supply</div>
                                <p className="nm-dm nm-muted" style={{ fontSize: 14, lineHeight: 1.75 }}>Avg 2-year demand of 3.1 MSF versus supply of 0.8 MSF creates a strong vacancy compression thesis.</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={160}>
                    <div className="nm-card" style={{ padding: 40 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
                            <div>
                                <h3 className="nm-cormorant" style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Office Demand Outpacing Supply</h3>
                                <p className="nm-dm nm-muted" style={{ fontSize: 13 }}>Demand, Supply & Vacancy in MMR & Navi Mumbai</p>
                            </div>
                            <div style={{ display: "flex", gap: 20 }}>
                                {[["#D4A017", "Demand"], ["#C0C8DC", "Supply"]].map(([c, l]) => (
                                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                                        <span className="nm-dm nm-muted" style={{ fontSize: 12 }}>{l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="nm-chart-grid">
                            {[
                                {
                                    label: "MMR — Demand vs Supply", data: [
                                        { year: "2020", demand: 40, supply: 35 }, { year: "2021", demand: 28, supply: 42 },
                                        { year: "2022", demand: 55, supply: 48 }, { year: "2023", demand: 62, supply: 38 },
                                        { year: "2024", demand: 70, supply: 30 }, { year: "YTD", demand: 45, supply: 20 }
                                    ]
                                },
                                {
                                    label: "Navi Mumbai — Demand vs Supply", data: [
                                        { year: "2020", demand: 25, supply: 30 }, { year: "2021", demand: 18, supply: 28 },
                                        { year: "2022", demand: 38, supply: 22 }, { year: "2023", demand: 52, supply: 18 },
                                        { year: "2024", demand: 65, supply: 14 }, { year: "YTD", demand: 40, supply: 10 }
                                    ]
                                },
                            ].map(({ label, data }) => (
                                <div key={label}>
                                    <div className="nm-dm nm-muted" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>{label}</div>
                                    <BarChart data={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ══════════════════════════════════════
          YOUNG CITY / KEY HIGHLIGHTS
      ══════════════════════════════════════ */}
            <section style={{ background: "#1A1A2E", padding: "96px clamp(20px,7vw,110px)" }}>
                <Reveal>
                    <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 64, flexWrap: "wrap" }}>
                        <div style={{ position: "relative", width: 112, height: 112, flexShrink: 0 }}>
                            <div style={{
                                width: 112, height: 112, borderRadius: "50%",
                                background: "conic-gradient(#D4A017 0deg 108deg, rgba(255,255,255,0.1) 108deg 360deg)",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <div style={{ width: 76, height: 76, background: "#1A1A2E", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                    <div className="nm-bebas nm-accent" style={{ fontSize: 18, lineHeight: 1 }}>~30%</div>
                                    <div className="nm-dm" style={{ fontSize: 9, color: "#9CA3AF", letterSpacing: "0.12em" }}>REIT</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="nm-bebas nm-accent" style={{ fontSize: 26, marginBottom: 8 }}>Mindspace REIT Portfolio</div>
                            <div className="nm-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 500, lineHeight: 1.75 }}>
                                Navi Mumbai holds ~30% of India's largest REIT portfolio by Mindspace REIT — the largest REIT portfolio by annualized rentals in India.
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <div style={{ marginBottom: 56 }}>
                        <div className="nm-accent-bar" style={{ marginBottom: 20 }} />
                        <h2 className="nm-cormorant" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                            A Young City<br /><span style={{ color: "#D4A017", fontStyle: "italic" }}>Built for the Future</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="nm-six-grid">
                    {[
                        { val: "20–30%", label: "Residential Price Arbitrage", body: "Persistent affordability vs. core Mumbai indicates capital value headroom as infrastructure and employment density rise.", accent: true },
                        { val: "41%", label: "Lower Congestion", body: "Superior liveability metrics act as a demand multiplier, influencing occupier and residential location decisions.", accent: false },
                        { val: "< 9 Yrs", label: "Average Office Age", body: "The youngest commercial market in MMR — offering future-ready A/A+ aligned buildings versus retrofitted CBD structures.", accent: false },
                        { val: "45,000+", label: "Annual Talent Additions", body: "A deep, scalable graduate pipeline supports future GCC, IT services, and knowledge sector expansion.", accent: false },
                        { val: "18+ MSF", label: "Green Office Pipeline", body: "One of India's largest concentrated green-certified office ecosystems (ready + under construction).", accent: true },
                        { val: "21%", label: "Cost Headroom vs Tier-1", body: "Lower entry rentals create room for medium-term rental upside as demand deepens post-airport and metro integration.", accent: false },
                    ].map((card, i) => (
                        <Reveal key={card.label} delay={i * 70}>
                            <div className="nm-hover" style={{
                                background: card.accent ? "rgba(212,160,23,0.1)" : "rgba(255,255,255,0.04)",
                                border: card.accent ? "1px solid rgba(212,160,23,0.3)" : "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 20, padding: 30
                            }}>
                                <div className="nm-bebas nm-accent" style={{ fontSize: 42, lineHeight: 1, marginBottom: 10 }}>{card.val}</div>
                                <div className="nm-dm" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: card.accent ? "#D4A017" : "#9CA3AF", marginBottom: 14 }}>{card.label}</div>
                                <div style={{ height: 1, background: card.accent ? "rgba(212,160,23,0.3)" : "rgba(255,255,255,0.08)", marginBottom: 14 }} />
                                <p className="nm-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{card.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
          CONCLUSION
      ══════════════════════════════════════ */}
            <section className="nm-section nm-px" style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,160,23,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
                    <Reveal>
                        <div className="nm-accent-bar" style={{ margin: "0 auto 32px" }} />
                        <div className="nm-bebas" style={{ fontSize: "clamp(4rem,15vw,9.5rem)", color: "#1A1A2E", lineHeight: 0.9, marginBottom: 28, letterSpacing: "0.03em" }}>RISING</div>
                        <h2 className="nm-cormorant" style={{ fontSize: "clamp(1.3rem,2.8vw,2rem)", fontWeight: 600, lineHeight: 1.4, marginBottom: 24, color: "#1A1A2E" }}>
                            Navi Mumbai: The Commercial Real Estate<br />
                            <span style={{ fontStyle: "italic", color: "#D4A017" }}>Destination of Tomorrow</span>
                        </h2>
                        <p className="nm-dm nm-muted" style={{ fontSize: 15, lineHeight: 1.9, marginBottom: 48 }}>
                            As global capability centres expand their footprint and domestic enterprises seek scalable, future-ready campuses, Navi Mumbai stands positioned to capture the next wave of commercial real estate demand in India's financial capital region.
                        </p>
                        <div className="nm-accent-bar" style={{ margin: "44px auto 0" }} />
                    </Reveal>
                </div>
            </section>
        </div>
    );
}