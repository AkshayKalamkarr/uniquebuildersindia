import { useState, useEffect, useRef } from "react";

// ── Global Styles ──────────────────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      width: 100%;
      overflow-x: hidden;
    }

    .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }

    @keyframes slowZoom {
      from { transform: scale(1.05); }
      to   { transform: scale(1.12); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f5f5f4; }
    ::-webkit-scrollbar-thumb { background: #a7b8a0; border-radius: 3px; }
  `}</style>
);

// ── InView Hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

// ── Reveal Wrapper ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
    const [ref, visible] = useInView();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

// ── Shared UI Atoms ───────────────────────────────────────────────────────
function SectionLabel({ children, light = false }) {
    return (
        <span
            className={`inline-block tracking-[0.25em] text-[10px] uppercase font-semibold mb-3 ${light ? "text-emerald-300" : "text-emerald-700"
                }`}
        >
            {children}
        </span>
    );
}

function SectionHeading({ children, light = false }) {
    return (
        <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 ${light ? "text-white" : "text-stone-800"
                }`}
        >
            {children}
        </h2>
    );
}

// ── DATA ──────────────────────────────────────────────────────────────────
const ENV_CARDS = [
    {
        img: "/images/ourimpact/ourimpact2.jpg",
        tag: "Decarbonisation",
        title: "Low-Carbon Transition",
        desc: "Our decarbonisation initiatives are designed to lead the transition to a low-carbon future for the real estate industry.",
    },
    {
        img: "/images/ourimpact/ourimpact3.jpg",
        tag: "Climate Resilience",
        title: "Water & Biodiversity",
        desc: "Resilience initiatives focus on water resilience, biodiversity and asset safety; mitigating future climate risks.",
    },
    {
        img: "/images/ourimpact/ourimpact4.jpg",
        tag: "Net Zero",
        title: "Net Zero Urban Accelerator",
        desc: "The Unique Builders & Developers Net Zero Urban Accelerator, in partnership with US-based think tank RMI, is a pioneering platform for change.",
    },
];

const SOCIAL_CARDS = [
    {
        img: "/images/ourimpact/ourimpact5.jpg",
        tag: "Community Development",
        // title: "Unnati Programme",
        desc: "We aim to create projects that foster safe, inclusive, and vibrant communities. From thoughtful planning to sustainable practices, every development is designed to enhance quality of life.",
    },
    {
        img: "/images/ourimpact/ourimpact6.jpg",
        tag: "Sustainable Living",
        // title: "Unique Genius Programme",
        desc: "We are working towards integrating eco-friendly practices such as green spaces, efficient resource usage, and environmentally conscious construction methods in our future projects.",
    },
    {
        img: "/images/ourimpact/ourimpact7.jpg",
        tag: "Our Commitment",
        // title: "Access to Quality Sport",
        desc: "As a growing brand, Unique Builders & Developers is dedicated to gradually expanding its social initiatives and making a meaningful difference in the communities we serve.",
    },
];

const RECOGNITIONS = [
    {
        rank: "#1",
        label: "CREDAI BANM Trusted Builder of the Year, 2024 🏆",
        // sub: "to have SBTi validated Net-Zero Targets (both near and long term)",
        color: "from-emerald-50 to-teal-50",
        accent: "text-emerald-700",
    },
    {
        rank: "#2",
        label: "Quality construction, timely delivery, and customer trust 🏆",
        // sub: "Global Real Estate Development companies in the S&P Global Corporate Sustainability Assessment 2024. Member of Dow Jones Sustainability Indices",
        color: "from-amber-50 to-yellow-50",
        accent: "text-amber-700",
    },
    {
        rank: "#3",
        label: "Strong presence in Raigad and beyond 🏆",
        // sub: "with a perfect score in the Residential Development Benchmark category at Global Real Estate Sustainability Benchmark 2024 (GRESB)",
        color: "from-sky-50 to-blue-50",
        accent: "text-sky-700",
    },
    {
        rank: "#4",
        label: "Consistently upholding transparency, integrity, and excellence 🏆",
        // sub: "with a 5-star rating and a score in GRESB Standing Investments Benchmark 2024",
        color: "from-rose-50 to-pink-50",
        accent: "text-rose-700",
    },
    {
        rank: "#5",
        label: "Delivering homes that create lasting value and pride 🏆",
        // sub: "with a 5-star rating and a score in GRESB Standing Investments Benchmark 2024",
        color: "from-rose-50 to-pink-50",
        accent: "text-rose-700",
    },
];

const PARTNERSHIPS = [
    {
        icon: "🌿",
        title: "Green Living Initiatives",
        desc: "We integrate natural ventilation, green landscapes, and energy-conscious design to create healthier and more sustainable living spaces.",
    },
    {
        icon: "🏗️",
        title: "Responsible Construction",
        desc: "Focused on efficient material usage, reduced construction waste, and quality-driven practices to ensure long-lasting and environmentally mindful developments.",
    },
    {
        icon: "💧",
        title: "Water & Resource Management",
        desc: "Encouraging smart water usage, drainage planning, and resource-efficient systems across our projects to support sustainable urban living.",
    },
    {
        icon: "🌇",
        title: "Community-Centric Planning",
        desc: "Designing spaces that promote open areas, safety, and community interaction—enhancing everyday living experiences for residents.",
    },
    {
        icon: "📈",
        title: "Future Sustainability Goals",
        desc: "We are actively exploring green building practices and sustainable innovations to align with future-ready development standards.",
    },
    {
        icon: "🤝",
        title: "Ethical Development Approach",
        desc: "Committed to transparency, fair practices, and building trust with every stakeholder through responsible business conduct.",
    }
]


// ── Reusable container ─────────────────────────────────────────────────────
function Container({ children, className = "" }) {
    return (
        <div
            style={{ width: "100%", maxWidth: "1152px", marginLeft: "auto", marginRight: "auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            className={className}
        >
            {children}
        </div>
    );
}

// ── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
    return (
        <section
            style={{ position: "relative", width: "100%", height: "70vh", minHeight: "480px", overflow: "hidden" }}
        >
            <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=85"
                alt="Nature canopy"
                style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    animation: "slowZoom 18s ease-in-out infinite alternate",
                }}
            />
            <div
                style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent 40%, rgba(15,10,5,0.72))",
                }}
            />
            <div
                style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "flex-end",
                    paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem",
                    textAlign: "center",
                }}
            >
                <div style={{ animation: "fadeUp 1s ease 0.3s both", maxWidth: "640px", width: "100%" }}>
                    <span
                        style={{
                            display: "inline-block", letterSpacing: "0.3em",
                            fontSize: "11px", textTransform: "uppercase",
                            color: "#6ee7b7", fontWeight: 600, marginBottom: "0.75rem",
                        }}
                    >
                        ESG · Sustainability
                    </span>
                    <h1
                        className="font-display"
                        style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", color: "#fff", lineHeight: 1.15 }}
                    >
                        Our Impact
                    </h1>
                    <p
                        style={{
                            marginTop: "1rem", color: "#d6d3d1",
                            fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.7,
                            maxWidth: "480px", marginLeft: "auto", marginRight: "auto",
                        }}
                    >
                        Creating a better world through environmental stewardship, social
                        empowerment, and responsible governance.
                    </p>
                </div>
            </div>
        </section>
    );
}

// ── INTRO ─────────────────────────────────────────────────────────────────
function Intro() {
    return (
        <section style={{ width: "100%", background: "#fff", padding: "5rem 0" }}>
            <Container>
                <Reveal>
                    <div style={{ textAlign: "center", maxWidth: "720px", marginLeft: "auto", marginRight: "auto" }}>
                        <SectionLabel>Creating a Positive Impact</SectionLabel>
                        <SectionHeading>Committed to a sustainable future</SectionHeading>
                        <p style={{ color: "#78716c", fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.8 }}>
                            Unique Builders & Developers is committed to using our capabilities to
                            create a positive impact on the environment and on society. As we grow,
                            so does the scale of the impact we can make. Through{" "}
                            <span style={{ color: "#047857", fontWeight: 500 }}>Unique Foundation</span>
                            , we implement transformative projects in Education, Women's Empowerment,
                            and Sustainable Urbanisation.
                        </p>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}

// ── IMPACT CARD ───────────────────────────────────────────────────────────
function ImpactCard({ img, tag, title, desc, delay }) {
    return (
        <Reveal
            delay={delay}
            className="group"
            style={{ width: "100%" }}
        >
            <div
                style={{
                    borderRadius: "1rem", overflow: "hidden", background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                    transition: "box-shadow 0.4s ease",
                    height: "100%",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.07)"}
            >
                <div style={{ overflow: "hidden", height: "220px" }}>
                    <img
                        src={img}
                        alt={title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                </div>
                <div style={{ padding: "1.5rem" }}>
                    <span
                        style={{
                            display: "block", fontSize: "10px", letterSpacing: "0.15em",
                            textTransform: "uppercase", fontWeight: 700, color: "#059669",
                            marginBottom: "0.5rem",
                        }}
                    >
                        {tag}
                    </span>
                    <h3
                        className="font-display"
                        style={{ fontSize: "1.2rem", color: "#1c1917", marginBottom: "0.5rem", lineHeight: 1.3 }}
                    >
                        {title}
                    </h3>
                    <p style={{ color: "#78716c", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
                </div>
            </div>
        </Reveal>
    );
}

// ── ENVIRONMENTAL IMPACT ──────────────────────────────────────────────────
function EnvironmentalImpact() {
    return (
        <section id="environmental" style={{ width: "100%", background: "#fafaf9", padding: "5rem 0" }}>
            <Container>
                <Reveal>
                    <div style={{ textAlign: "center", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", marginBottom: "3rem" }}>
                        <SectionLabel>Planet</SectionLabel>
                        <SectionHeading>Environmental Impact</SectionHeading>
                        <p style={{ color: "#78716c", fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.75 }}>
                            Our approach to sustainable construction focuses on reducing carbon
                            emissions and creating assets resilient to future climate change.
                        </p>
                    </div>
                </Reveal>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        width: "100%",
                    }}
                >
                    {ENV_CARDS.map((c, i) => (
                        <ImpactCard key={i} {...c} delay={i * 120} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

// ── SOCIAL IMPACT ─────────────────────────────────────────────────────────
function SocialImpact() {
    return (
        <section id="social" style={{ width: "100%", background: "#fff", padding: "5rem 0" }}>
            <Container>
                <Reveal>
                    <div style={{ textAlign: "center", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", marginBottom: "3rem" }}>
                        <SectionLabel>People</SectionLabel>
                        <SectionHeading>Social Impact</SectionHeading>
                        <p style={{ color: "#78716c", fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.75 }}>
                            At Unique Builders & Developers, we believe real estate is not just about structures—it’s about shaping communities and improving lives.
                            As we grow, we are committed to contributing positively to society through responsible development and meaningful initiatives.
                        </p>
                    </div>
                </Reveal>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        width: "100%",
                    }}
                >
                    {SOCIAL_CARDS.map((c, i) => (
                        <ImpactCard key={i} {...c} delay={i * 120} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

// ── RECOGNITION ───────────────────────────────────────────────────────────
function Recognition() {
    return (
        <section
            id="recognition"
            style={{
                width: "100%",
                background: "linear-gradient(135deg, #1c1917 0%, #064e3b 100%)",
                padding: "5rem 0",
            }}
        >
            <Container>
                <Reveal>
                    <div style={{ textAlign: "center", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", marginBottom: "3.5rem" }}>
                        <SectionLabel light>Awards</SectionLabel>
                        <SectionHeading light>Recognition</SectionHeading>
                        <p style={{ color: "#a8a29e", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                            Leading in global sustainability benchmarks
                        </p>
                    </div>
                </Reveal>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "1.25rem",
                        width: "100%",
                    }}
                >
                    {RECOGNITIONS.map((r, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div
                                style={{
                                    borderRadius: "1rem",
                                    background: `linear-gradient(135deg, ${i === 0 ? "#ecfdf5, #f0fdfa"
                                        : i === 1 ? "#fffbeb, #fefce8"
                                            : i === 2 ? "#f0f9ff, #eff6ff"
                                                : "#fff1f2, #fdf2f8"
                                        })`,
                                    padding: "1.5rem",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.75rem",
                                }}
                            >
                                <span
                                    className="font-display"
                                    style={{
                                        fontSize: "2.25rem",
                                        fontWeight: 700,
                                        color: i === 0 ? "#047857" : i === 1 ? "#b45309" : i === 2 ? "#0369a1" : "#be123c",
                                    }}
                                >
                                    {r.rank}
                                </span>
                                <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1c1917", lineHeight: 1.4 }}>
                                    {r.label}
                                </p>
                                <p style={{ fontSize: "0.75rem", color: "#78716c", lineHeight: 1.6, flex: 1 }}>
                                    {r.sub}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}

// ── PARTNERSHIPS ──────────────────────────────────────────────────────────
function Partnerships() {
    return (
        <section id="partnerships" style={{ width: "100%", background: "#fafaf9", padding: "5rem 0" }}>
            <Container>
                <Reveal>
                    <div style={{ textAlign: "center", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", marginBottom: "3.5rem" }}>
                        <SectionLabel>Collaborations</SectionLabel>
                        <SectionHeading>Partnerships</SectionHeading>
                        <p style={{ color: "#78716c", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                            Strategic partnerships to lead the change in the industry
                        </p>
                    </div>
                </Reveal>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "2rem",
                        width: "100%",
                    }}
                >
                    {PARTNERSHIPS.map((p, i) => (
                        <Reveal key={i} delay={i * 120}>
                            <div
                                style={{
                                    display: "flex", flexDirection: "column", gap: "1rem",
                                    padding: "2rem", borderRadius: "1rem",
                                    background: "#fff", border: "1px solid #e7e5e4",
                                    height: "100%",
                                    transition: "box-shadow 0.3s ease",
                                }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.09)"}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                            >
                                <span style={{ fontSize: "2.25rem" }}>{p.icon}</span>
                                <h3 className="font-display" style={{ fontSize: "1.15rem", color: "#1c1917", lineHeight: 1.35 }}>
                                    {p.title}
                                </h3>
                                <p style={{ color: "#78716c", fontSize: "0.875rem", lineHeight: 1.7 }}>{p.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}


// ── FOOTER CTA ────────────────────────────────────────────────────────────
function FooterCTA() {
    return (
        <section
            style={{
                width: "100%",
                background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
                padding: "6rem 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Dot pattern overlay */}
            <div
                style={{
                    position: "absolute", inset: 0, opacity: 0.08,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23fff'/%3E%3C/svg%3E")`,
                }}
            />
            <Container>
                <Reveal>
                    <div style={{ textAlign: "center", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: 1 }}>
                        <SectionLabel light>Join Us</SectionLabel>
                        <SectionHeading light>Together, we can build a better tomorrow</SectionHeading>
                        <p style={{ color: "#a7f3d0", fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.75, marginBottom: "2rem" }}>
                            Explore how Unique Builders & Developers is setting new benchmarks
                            in sustainable development and creating lasting positive change.
                        </p>
                        <a
                            href="#"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                                background: "#fff", color: "#064e3b",
                                padding: "1rem 2rem", borderRadius: "9999px",
                                fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                                fontWeight: 700, textDecoration: "none",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                                transition: "background 0.3s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "#ecfdf5"}
                            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                        >
                            Download Integrated Report
                        </a>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}

// ── ROOT ──────────────────────────────────────────────────────────────────
export default function OurImpact() {
    return (
        <>
            <GlobalStyles />
            <div style={{ width: "100%", minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
                <Hero />
                <Intro />
                <EnvironmentalImpact />
                <SocialImpact />
                <Recognition />
                <Partnerships />
                {/* <Blogs />
                <FooterCTA /> */}
            </div>
        </>
    );
}