import { AlignJustify, ArrowRight, ChevronDown, MessageCircle, Phone, Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


/* ─── CONSTANTS ─────────────────────────────────────────── */
const BRAND = "Unique";
const BRAND_FULL = "Unique Builders & Developers";

const NAV_LINKS = ["Our Story", "Our Impact", "Our Projects"];

const STATS = [
    { value: "450+", unit: "Happy Families", label: "" },
    { value: "3L+", unit: "Sq. Ft. Delievered", label: "" },
    { value: "9+", unit: "Combined Experience", label: "" },
    { value: "10L+", unit: "Sq. Ft. Upcoming*", label: "" },
];

const PRESENCE = ["Mumbai", "Navi Mumbai", "Pune"];

const STORY_SECTIONS = [
    {
        tag: "OUR STORY",
        headline: "A legacy of excellence",
        body: "With over 20 years of experience, Unique Builders & Developers has built a reputation for quality, trust, and thoughtful development—delivering spaces designed for lasting value and modern living.",
        img: "/images/ourstory/our-story3.jpg",
        imgAlt: "Iconic skyscraper at dusk",
        layout: "img-left",
    },
    {
        tag: "",
        headline: "Crafting timeless elegance",
        body: "We design and build homes with a focus on quality, detail, and lasting value—creating spaces that blend modern living with enduring elegance.",
        img: "/images/ourstory/our-story4.jpg",
        imgAlt: "Luxury interior living room",
        layout: "img-right",
    },
    {
        tag: "",
        headline: "Sophistication on a grand scale",
        body: "We develop residential and commercial spaces designed for modern lifestyles—combining quality, functionality, and lasting value.",
        img: "/images/ourstory/our-story5.jpg",
        imgAlt: "Luxury hotel lobby corridor",
        layout: "img-left",
    },
];

const AWARDS = [
    "CREDAI BANM Trusted Builder of the Year, 2024 🏆",
    "Quality construction, timely delivery, and customer trust 🏆",
    "Strong presence in Raigad and beyond 🏆",
    "Consistently upholding transparency, integrity, and excellence 🏆",
    "Delivering homes that create lasting value and pride 🏆",
];

const FOOTER_LINKS = {
    Company: ["Our Story", "Our Vision", "Our Developments", "Experiences", "Corporate Hospitality", "Press Room", "Awards", "Blog"],
    Legal: ["NRC", "Investor Relations", "Careers", "Terms & Conditions", "Disclaimer", "Contact Us", "SMART ONE"],
};

/* ─── HOOK: Intersection Observer ───────────────────────── */
function useFadeIn(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ─── FADE WRAPPER ───────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
    const [ref, visible] = useFadeIn();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [projOpen, setProjOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        if (searchOpen && searchRef.current) searchRef.current.focus();
    }, [searchOpen]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');
        :root{--gold:#b89b6e;--dark:#18120a;--cream:#f7f2eb;--mid:rgba(24,18,10,.88)}
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Jost',sans-serif;background:#fff;color:#18120a}
        .cf{font-family:'Cormorant Garamond',serif}
        .jost{font-family:'Jost',sans-serif}
        /* navbar */
        nav.fixed{position:fixed;top:0;left:0;right:0;z-index:100;transition:background .35s,box-shadow .35s}
        nav.fixed.scrolled{background:var(--mid);backdrop-filter:blur(18px);box-shadow:0 2px 32px rgba(0,0,0,.28)}
        nav.fixed:not(.scrolled){background:linear-gradient(180deg,rgba(10,6,2,.72) 0%,transparent 100%);backdrop-filter:blur(4px)}
        .nav-inner{max-width:1380px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:68px;transition:height .3s}
        nav.fixed.scrolled .nav-inner{height:60px}
        .nav-logo{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;letter-spacing:.22em;color:#fff;text-decoration:none}
        .nav-logo:hover{color:var(--gold)}
        .nav-links{display:flex;align-items:center;gap:0}
        .nav-a{font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.85);text-decoration:none;padding:8px 20px;position:relative;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;transition:color .2s}
        .nav-a::after{content:'';position:absolute;bottom:0;left:20px;right:20px;height:1px;background:var(--gold);transform:scaleX(0);transition:transform .3s}
        .nav-a:hover{color:#fff}
        .nav-a:hover::after{transform:scaleX(1)}
        .nav-sep{width:1px;height:28px;background:rgba(200,169,122,.2);flex-shrink:0}
        .nav-right{display:flex;align-items:center;gap:4px}
        .nav-act{display:flex;align-items:center;gap:6px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.8);background:none;border:none;cursor:pointer;padding:7px 12px;border-radius:2px;transition:color .2s,background .2s}
        .nav-act:hover{color:var(--gold);background:rgba(200,169,122,.07)}
        .search-icon{display:flex;align-items:center;justify-content:center;width:34px;height:34px;background:none;border:none;color:rgba(255,255,255,.8);cursor:pointer;border-radius:50%;transition:color .2s,background .2s}
        .search-icon:hover{color:var(--gold);background:rgba(200,169,122,.1)}
        .hamburger{display:none;align-items:center;justify-content:center;width:38px;height:38px;background:none;border:1px solid rgba(200,169,122,.3);color:rgba(255,255,255,.9);cursor:pointer;border-radius:2px;transition:border-color .2s,color .2s}
        .hamburger:hover{border-color:var(--gold);color:var(--gold)}
        /* search bar */
        .search-bar{position:absolute;top:100%;left:0;right:0;background:rgba(15,10,4,.97);backdrop-filter:blur(20px);border-top:1px solid rgba(200,169,122,.18);border-bottom:1px solid rgba(200,169,122,.18);padding:18px 48px;display:flex;align-items:center;gap:14px;opacity:0;transform:translateY(-6px);transition:opacity .25s,transform .25s;pointer-events:none}
        .search-bar.open{opacity:1;transform:translateY(0);pointer-events:all}
        .search-bar input{flex:1;background:none;border:none;outline:none;color:#fff;font-family:'Jost',sans-serif;font-size:13px;letter-spacing:.06em}
        .search-bar input::placeholder{color:rgba(255,255,255,.3)}
        .search-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
        /* dropdown */
        .proj-wrap{position:relative}
        .proj-drop{position:absolute;top:calc(100% + 2px);left:50%;transform:translateX(-50%) translateY(-6px);background:rgba(16,10,4,.97);backdrop-filter:blur(20px);border:1px solid rgba(200,169,122,.15);border-top:2px solid var(--gold);min-width:240px;padding:6px 0;opacity:0;visibility:hidden;transition:opacity .2s,transform .2s,visibility .2s}
        .proj-drop.open{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0)}
        .proj-drop a{display:block;padding:11px 22px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.75);text-decoration:none;transition:background .15s,color .15s,padding-left .18s}
        .proj-drop a:hover{background:rgba(200,169,122,.08);color:var(--gold);padding-left:28px}
        /* mobile */
        .mob-overlay{display:none;position:fixed;inset:0;z-index:200;background:rgba(10,6,2,.98);backdrop-filter:blur(24px);flex-direction:column;overflow-y:auto}
        .mob-overlay.open{display:flex}
        .mob-hdr{display:flex;align-items:center;justify-content:space-between;padding:20px 28px;border-bottom:1px solid rgba(200,169,122,.12)}
        .mob-logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;letter-spacing:.22em;color:#fff}
        .mob-close{display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:none;border:1px solid rgba(200,169,122,.25);color:rgba(255,255,255,.9);cursor:pointer;border-radius:2px;transition:border-color .2s,color .2s}
        .mob-close:hover{border-color:var(--gold);color:var(--gold)}
        .mob-nav{padding:28px;flex:1}
        .mob-link{display:flex;align-items:center;justify-content:space-between;font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;letter-spacing:.06em;color:rgba(255,255,255,.85);text-decoration:none;padding:16px 0;border-bottom:1px solid rgba(200,169,122,.08);background:none;border-left:none;border-right:none;border-top:none;width:100%;cursor:pointer;text-align:left;transition:color .2s}
        .mob-link:first-child{border-top:1px solid rgba(200,169,122,.08)}
        .mob-link:hover{color:var(--gold)}
        .mob-acts{padding:20px 28px 44px;border-top:1px solid rgba(200,169,122,.12);display:flex;flex-direction:column;gap:12px}
        .mob-row{display:flex;gap:12px}
        .mob-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:13px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .2s}
        .mob-outline{background:none;border:1px solid rgba(200,169,122,.3);color:rgba(255,255,255,.8)}
        .mob-outline:hover{border-color:var(--gold);color:var(--gold)}
        .mob-solid{background:var(--gold);border:1px solid var(--gold);color:#18120a;font-weight:600}
        .mob-solid:hover{background:#c8a87e}
        /* responsive */
        @media(max-width:1000px){.nav-links,.nav-right{display:none}.hamburger{display:flex}}
        @media(max-width:600px){.nav-inner{padding:0 20px}.nav-logo{font-size:20px}}
      `}</style>

            <nav className={`fixed${scrolled ? " scrolled" : ""}`} style={{ position: "fixed" }}>
                <div className="nav-inner">
                    <a href="#" className="nav-logo">{BRAND}</a>

                    <div className="nav-links">
                        <a href="#" className="nav-a">Our Story</a>
                        <div className="nav-sep" />
                        <a href="#" className="nav-a">Our Impact</a>
                        <div className="nav-sep" />
                        <div className="proj-wrap">
                            <button className="nav-a" onClick={() => setProjOpen(!projOpen)}>
                                Our Projects
                                <ChevronDown size={12} style={{ transition: "transform .25s", transform: projOpen ? "rotate(180deg)" : "none", opacity: .7 }} />
                            </button>
                            <div className={`proj-drop${projOpen ? " open" : ""}`}>
                                {["Unique Heights – Mumbai", "Unique Towers – Pune", "Unique Greens – Bengaluru", "Unique One – Delhi NCR"].map(p => (
                                    <a key={p} href="#">{p}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="nav-right">
                        <button className="nav-act"><Phone size={12} /> Enquire</button>
                        <div className="nav-sep" />
                        <button className="nav-act"><MessageCircle size={12} /> Chat</button>
                        <div className="nav-sep" />
                        <button className="search-icon" onClick={() => setSearchOpen(!searchOpen)}>
                            {searchOpen ? <X size={16} /> : <Search size={16} />}
                        </button>
                    </div>

                    <button className="hamburger" onClick={() => setMobileOpen(true)}><AlignJustify size={19} /></button>
                </div>

                <div className={`search-bar${searchOpen ? " open" : ""}`}>
                    <span className="search-label">Search</span>
                    <div className="nav-sep" />
                    <input ref={searchRef} type="text" placeholder="Search projects, locations…" />
                    <Search size={15} style={{ color: "rgba(200,169,122,.45)", flexShrink: 0 }} />
                </div>
            </nav>

            {/* Mobile */}
            <div className={`mob-overlay${mobileOpen ? " open" : ""}`}>
                <div className="mob-hdr">
                    <span className="mob-logo">{BRAND}</span>
                    <button className="mob-close" onClick={() => setMobileOpen(false)}><X size={19} /></button>
                </div>
                <div className="mob-nav">
                    <a href="#" className="mob-link">Our Story</a>
                    <a href="#" className="mob-link">Our Impact</a>
                    <a href="#" className="mob-link">Our Projects <ChevronDown size={18} style={{ opacity: .6 }} /></a>
                </div>
                <div className="mob-acts">
                    <div className="mob-row">
                        <button className="mob-btn mob-outline"><MessageCircle size={13} /> Chat</button>
                        <button className="mob-btn mob-solid"><Phone size={13} /> Enquire</button>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero() {
    return (
        <section style={{ height: "100vh", minHeight: 580, position: "relative", overflow: "hidden" }}>
            <img
                src="/images/ourstory/our-story1.jpg"
                alt="Luxury outdoor event setting"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 50%, rgba(0,0,0,.55) 100%)" }} />
            <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "#fff" }}>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", marginBottom: 14 }}>OUR STORY</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, letterSpacing: "0.06em", lineHeight: 1.1 }}>
                    Shaping the future<br />of living
                </h1>
            </div>
        </section>
    );
}

/* ─── INTRO SPLIT ────────────────────────────────────────── */
function IntroSplit() {
    return (
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 480 }}>
            <div style={{ overflow: "hidden" }}>
                <img
                    src="/images/ourstory/our-story2.jpg"
                    alt="Modern architecture building"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                />
            </div>
            <div style={{ background: "#f7f2eb", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 64px" }}>
                <FadeIn>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold,#b89b6e)", marginBottom: 24 }}>WHAT WE DO</p>
                    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3vw,46px)", fontWeight: 300, lineHeight: 1.25, marginBottom: 28, color: "#18120a" }}>
                        Shaping Indian<br />real estate
                    </h2>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.8, color: "#5a4a38", maxWidth: 440 }}>
                        At Unique Builders & Developers, we focus on creating thoughtfully designed residential and commercial spaces that reflect quality, functionality, and long-term value.

                        Driven by a commitment to excellence, we aim to deliver developments that meet the evolving needs of modern urban lifestyles—balancing smart design, reliable construction, and attention to detail.

                        Every project we undertake is guided by a clear vision:
                        to build not just structures, but spaces where people can live, grow, and thrive.

                        As a growing real estate brand, we continue to strengthen our capabilities, refine our processes, and explore new ways to deliver better living experiences with every development.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}

/* ─── SECTION DIVIDER ────────────────────────────────────── */
function SectionTag({ tag, title }) {
    return (
        <FadeIn>
            <div style={{ textAlign: "center", padding: "96px 24px 64px" }}>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#b89b6e", marginBottom: 18 }}>{tag}</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 300, letterSpacing: "0.04em", color: "#18120a" }}>{title}</h2>
                <div style={{ width: 48, height: 1, background: "#b89b6e", margin: "28px auto 0" }} />
            </div>
        </FadeIn>
    );
}

/* ─── STORY SECTION ──────────────────────────────────────── */
function StorySection({ section, index }) {
    const isRight = section.layout === "img-right";
    return (
        <section style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 520,
            direction: isRight ? "rtl" : "ltr"
        }}
            className="story-section"
        >
            <style>{`
        @media(max-width:768px){.story-section{grid-template-columns:1fr!important;direction:ltr!important}}
      `}</style>
            <div style={{ overflow: "hidden", direction: "ltr" }}>
                <img
                    src={section.img}
                    alt={section.imgAlt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 380, transition: "transform .7s ease" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                />
            </div>
            <div style={{
                direction: "ltr",
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: "72px 72px",
                background: index % 2 === 0 ? "#fff" : "#f7f2eb"
            }}>
                <FadeIn delay={100}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,2.8vw,42px)", fontWeight: 300, lineHeight: 1.25, marginBottom: 24, color: "#18120a" }}>
                        {section.headline}
                    </h3>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.85, color: "#5a4a38", maxWidth: 440 }}>
                        {section.body}
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}

/* ─── STATS ──────────────────────────────────────────────── */
function Stats() {
    return (
        <section style={{ background: "#fff", padding: "100px 48px 80px" }}>
            <SectionTag tag="OUR SCALE" title="Delivering excellence with continued growth" />
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "48px 32px", padding: "24px 0 48px" }}>
                {STATS.map((s, i) => (
                    <FadeIn key={i} delay={i * 80}>
                        <div>
                            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(42px,5vw,72px)", fontWeight: 300, color: "#18120a", lineHeight: 1, marginBottom: 10 }}>
                                {s.value}
                            </div>
                            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: "0.1em", color: "#8a7460", lineHeight: 1.6, maxWidth: 180 }}>{s.unit}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
            <FadeIn>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a7460", marginBottom: 10 }}>PRESENCE IN</p>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        {PRESENCE.map(p => (
                            <span key={p} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, color: "#18120a" }}>{p}</span>
                        ))}
                    </div>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, color: "#aaa", marginTop: 16 }}>*As of December 2023 | *As conducted vide VTA + 23</p>
                </div>
            </FadeIn>
        </section>
    );
}

/* ─── LEADERSHIP ─────────────────────────────────────────── */
function Leadership() {
    return (
        <section style={{ background: "#f7f2eb", padding: "96px 48px" }}>
            <SectionTag tag="PEOPLE" title="Guided by visionary leadership" />
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="lead-grid">
                <style>{`.lead-grid{@media(max-width:600px){grid-template-columns:1fr!important}}`}</style>
                {[
                    { title: "Board of Director", desc: "Experienced industry leaders ensure we are growing our positive impact as we grow our business." },
                ].map((card, i) => (
                    <FadeIn key={i} delay={i * 120}>
                        <div style={{
                            background: "#fff",
                            padding: "48px 40px",
                            border: "1px solid rgba(184,155,110,.2)",
                            transition: "box-shadow .25s, transform .25s"
                        }}
                            onMouseOver={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(184,155,110,.18)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseOut={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                        >
                            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, marginBottom: 16, color: "#18120a" }}>{card.title}</h3>
                            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.75, color: "#5a4a38", marginBottom: 28 }}>{card.desc}</p>
                            <Link to="/director">
                                <button style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    background: "none", border: "1px solid #b89b6e", padding: "10px 22px",
                                    fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.18em",
                                    textTransform: "uppercase", color: "#b89b6e", cursor: "pointer",
                                    transition: "background .2s, color .2s"
                                }}
                                    onMouseOver={e => { e.currentTarget.style.background = "#b89b6e"; e.currentTarget.style.color = "#fff"; }}
                                    onMouseOut={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#b89b6e"; }}
                                >
                                    View <ArrowRight size={13} />
                                </button>
                            </Link>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}

/* ─── AWARDS ─────────────────────────────────────────────── */
function Awards() {
    const [expanded, setExpanded] = useState(false);
    return (
        <section style={{ background: "#fff", padding: "80px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }} className="awards-grid">
                <style>{`.awards-grid{@media(max-width:768px){grid-template-columns:1fr!important}}`}</style>
                <FadeIn>
                    <div>
                        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#b89b6e", marginBottom: 18 }}>RECOGNITION</p>
                        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, lineHeight: 1.25, color: "#18120a", marginBottom: 24 }}>
                            Globally recognised for excellence
                        </h2>
                        <div style={{ width: 36, height: 1, background: "#b89b6e" }} />
                    </div>
                </FadeIn>
                <FadeIn delay={150}>
                    <div>
                        {AWARDS.slice(0, expanded ? AWARDS.length : 3).map((a, i) => (
                            <div key={i} style={{ padding: "18px 0", borderBottom: "1px solid rgba(184,155,110,.15)", fontFamily: "'Jost',sans-serif", fontSize: 13, color: "#3a2e22", lineHeight: 1.6 }}>
                                {a}
                            </div>
                        ))}
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b89b6e", cursor: "pointer" }}
                        >
                            {expanded ? "View Less" : `View All ${AWARDS.length}`} <ChevronDown size={13} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .25s" }} />
                        </button>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}


/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; background: #fff; color: #18120a; }
        img { display: block; max-width: 100%; }
        @media(max-width:768px){
          section[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;direction:ltr!important}
          .nav-inner{padding:0 20px!important}
        }
      `}</style>
            <Hero />
            <IntroSplit />
            <SectionTag tag="OUR ETHOS" title="Raising expectations for real estate" />
            {STORY_SECTIONS.map((s, i) => <StorySection key={i} section={s} index={i} />)}
            <Stats />
            <Leadership />
            <Awards />
        </>
    );
}