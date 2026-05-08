import { Award, Leaf, TrendingUp, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";


function useFadeIn(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
    const [ref, visible] = useFadeIn();
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

const QUALIFICATIONS = [
    { degree: "B.E.", field: "Civil Engineering" },
    { degree: "MBA", field: "Marketing" },
    { degree: "B.Sc.", field: "Horticulture" },
];

const STRENGTHS = [
    { Icon: Award, title: "Leadership", desc: "Empowering teams with a clear vision and leading by example across every level of the organization." },
    { Icon: TrendingUp, title: "Business Strategy", desc: "Transforming ambitious ideas into high-performing, scalable enterprises with disciplined execution." },
    { Icon: Users, title: "Operational Excellence", desc: "Building cultures grounded in integrity, collaboration, and continuous improvement." },
    { Icon: Leaf, title: "Sustainability", desc: "Forward-thinking, environmentally responsible development for a resilient future." },
];

const EXPERTISE = ["Real Estate", "Architecture", "Landscape Development", "Civil Engineering", "Business Strategy", "Market Dynamics"];

const BIO = [
    "A visionary entrepreneur with over 20 years of extensive experience across Real Estate, Architecture, and Landscape Development, the Director brings a strong multidisciplinary foundation to the organization. With academic qualifications in Civil Engineering, Marketing, and Horticulture, he combines technical expertise with strategic business insight to drive sustainable growth in the built environment sector.",
    "Throughout his professional journey, he has demonstrated a consistent commitment to excellence, innovation, and value-driven leadership. As a co-founder of multiple successful ventures, he has played a pivotal role in transforming ideas into high-performing and scalable business enterprises, working alongside a team of like-minded professionals.",
    "Under his leadership, the organization achieved remarkable growth within a short span of five years, reaching a net worth exceeding ₹50 crore and generating annual revenues in the range of ₹50–100 crore. This accomplishment reflects his strategic vision, disciplined execution, and strong understanding of market dynamics and customer needs.",
    "Looking ahead, he remains focused on expanding business horizons, delivering impactful developments, and contributing to the advancement of the real estate and infrastructure sector with a forward-thinking and environmentally responsible approach.",
];

export default function Director() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        img { display: block; max-width: 100%; }

        /* HERO */
        .dh { position: relative; min-height: 100vh; display: flex; align-items: flex-end; overflow: hidden; }
        .dh-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 20%; }
        .dh-g1 { position: absolute; inset: 0; background: linear-gradient(90deg,rgba(10,6,2,.86) 0%,rgba(10,6,2,.48) 55%,rgba(10,6,2,.1) 100%); }
        .dh-g2 { position: absolute; inset: 0; background: linear-gradient(180deg,transparent 40%,rgba(10,6,2,.7) 100%); }
        .dh-vline { position: absolute; left: 72px; top: 0; bottom: 0; width: 1px; background: linear-gradient(180deg,transparent,rgba(184,155,110,.42) 30%,rgba(184,155,110,.42) 70%,transparent); display: flex; align-items: center; }
        .dh-dot { width: 6px; height: 6px; border-radius: 50%; background: #b89b6e; margin-left: -3px; }
        .dh-content { position: relative; z-index: 2; padding: 130px 96px 108px; max-width: 720px; }
        .dh-super { font-family: 'Jost',sans-serif; font-size: 9px; letter-spacing: .32em; text-transform: uppercase; color: #b89b6e; margin-bottom: 22px; }
        .dh-name { font-family: 'Cormorant Garamond',serif; font-size: clamp(44px,6.5vw,90px); font-weight: 300; line-height: 1.04; color: #fff; margin-bottom: 22px; letter-spacing: .02em; }
        .dh-rule { width: 56px; height: 1px; background: #b89b6e; margin-bottom: 28px; }
        .dh-quote { font-family: 'Cormorant Garamond',serif; font-size: clamp(19px,2.4vw,28px); font-weight: 300; font-style: italic; color: rgba(255,255,255,.82); line-height: 1.55; margin-bottom: 40px; }
        .dh-pills { display: flex; gap: 10px; flex-wrap: wrap; }
        .dh-pill { border: 1px solid rgba(184,155,110,.35); padding: 8px 18px; border-radius: 2px; font-family: 'Jost',sans-serif; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.75); background: rgba(255,255,255,.04); }
        .dh-pill span { color: #b89b6e; font-weight: 500; }
        .dh-scroll { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); text-align: center; }
        .dh-scroll-line { width: 1px; height: 48px; background: rgba(184,155,110,.4); margin: 0 auto 8px; }
        .dh-scroll-lbl { font-family: 'Jost',sans-serif; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.38); }

        /* STATS */
        .ds { background: #18120a; display: grid; grid-template-columns: repeat(4,1fr); }
        .ds-cell { padding: 52px 32px; text-align: center; border-right: 1px solid rgba(184,155,110,.12); }
        .ds-cell:last-child { border-right: none; }
        .ds-val { font-family: 'Cormorant Garamond',serif; font-size: clamp(34px,4vw,58px); font-weight: 300; color: #b89b6e; line-height: 1; margin-bottom: 12px; }
        .ds-lbl { font-family: 'Jost',sans-serif; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.42); line-height: 1.65; }

        /* BIO */
        .db { background: #fff; padding: 120px 96px; }
        .db-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.65fr; gap: 96px; align-items: start; }
        .db-left { position: sticky; top: 100px; }
        .d-stag { font-family: 'Jost',sans-serif; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: #b89b6e; margin-bottom: 20px; }
        .d-h2 { font-family: 'Cormorant Garamond',serif; font-size: clamp(28px,3vw,48px); font-weight: 300; line-height: 1.22; color: #18120a; margin-bottom: 28px; }
        .d-hrule { width: 40px; height: 1px; background: #b89b6e; margin-bottom: 36px; }
        .db-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 44px; }
        .db-tag { font-family: 'Jost',sans-serif; font-size: 9.5px; letter-spacing: .12em; text-transform: uppercase; color: #8a7460; border: 1px solid rgba(184,155,110,.28); padding: 6px 14px; border-radius: 2px; }
        .db-cta { display: flex; gap: 12px; }
        .db-btn-g { display: flex; align-items: center; gap: 7px; background: #b89b6e; color: #18120a; font-family: 'Jost',sans-serif; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; font-weight: 600; padding: 12px 22px; text-decoration: none; border-radius: 2px; transition: background .2s; }
        .db-btn-g:hover { background: #c8a87e; }
        .db-btn-o { display: flex; align-items: center; gap: 7px; border: 1px solid rgba(184,155,110,.4); color: #b89b6e; font-family: 'Jost',sans-serif; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; padding: 12px 22px; text-decoration: none; border-radius: 2px; background: none; transition: border-color .2s; }
        .db-btn-o:hover { border-color: #b89b6e; }
        .db-para { font-family: 'Jost',sans-serif; font-size: 15px; line-height: 1.92; color: #4a3a2a; margin-bottom: 30px; }

        /* PORTRAIT */
        .dp { background: #f7f2eb; padding: 100px 96px; }
        .dp-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.1fr; gap: 88px; align-items: center; }
        .dp-img-wrap { position: relative; }
        .dp-img-frame { position: relative; overflow: hidden; border-radius: 2px; }
        .dp-img-frame img { width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: center top; transition: transform .7s ease; }
        .dp-img-frame:hover img { transform: scale(1.04); }
        .dp-gold-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: #b89b6e; }
        .dp-offset { position: absolute; top: 20px; right: -20px; bottom: -20px; left: 20px; border: 1px solid rgba(184,155,110,.22); border-radius: 2px; z-index: -1; }
        .dp-name { font-family: 'Cormorant Garamond',serif; font-size: clamp(32px,3.8vw,56px); font-weight: 300; color: #18120a; line-height: 1.1; margin-bottom: 10px; }
        .dp-role { font-family: 'Jost',sans-serif; font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: #b89b6e; margin-bottom: 36px; }
        .dp-pull { font-family: 'Cormorant Garamond',serif; font-size: clamp(17px,1.9vw,24px); font-weight: 300; font-style: italic; color: #5a4a38; line-height: 1.65; margin-bottom: 40px; }
        .dp-quals { display: flex; flex-direction: column; gap: 14px; }
        .dp-qual { display: flex; align-items: center; gap: 14px; }
        .dp-deg { font-family: 'Jost',sans-serif; font-size: 10px; font-weight: 600; letter-spacing: .14em; color: #b89b6e; min-width: 44px; }
        .dp-sep { width: 20px; height: 1px; background: rgba(184,155,110,.3); flex-shrink: 0; }
        .dp-field { font-family: 'Jost',sans-serif; font-size: 12px; color: #6a5a48; letter-spacing: .07em; }

        /* STRENGTHS */
        .dstr { background: #fff; padding: 100px 96px; }
        .dstr-hdr { text-align: center; margin-bottom: 64px; }
        .dstr-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .dstr-card { background: #f7f2eb; padding: 44px 32px; border-bottom: 3px solid transparent; transition: border-color .25s, transform .25s, box-shadow .25s; cursor: default; }
        .dstr-card:hover { border-bottom-color: #b89b6e; transform: translateY(-4px); box-shadow: 0 16px 48px rgba(184,155,110,.1); }
        .dstr-icon { width: 44px; height: 44px; border: 1px solid rgba(184,155,110,.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #b89b6e; }
        .dstr-title { font-family: 'Cormorant Garamond',serif; font-size: 23px; font-weight: 400; color: #18120a; margin-bottom: 12px; }
        .dstr-desc { font-family: 'Jost',sans-serif; font-size: 13px; line-height: 1.75; color: #6a5a48; }

        /* QUOTE BANNER */
        .dq { position: relative; overflow: hidden; padding: 130px 48px; }
        .dq-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(.2); }
        .dq-body { position: relative; z-index: 1; max-width: 880px; margin: 0 auto; text-align: center; }
        .dq-line { width: 1px; height: 64px; background: rgba(184,155,110,.4); margin: 0 auto; }
        .dq-text { font-family: 'Cormorant Garamond',serif; font-size: clamp(24px,3.2vw,50px); font-weight: 300; font-style: italic; color: #fff; line-height: 1.45; letter-spacing: .02em; margin: 40px 0; }
        .dq-attr { font-family: 'Jost',sans-serif; font-size: 10px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-top: 32px; }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .dstr-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 900px) {
          .ds { grid-template-columns: repeat(2,1fr); }
          .ds-cell:nth-child(2) { border-right: none; }
          .ds-cell:nth-child(3),
          .ds-cell:nth-child(4) { border-top: 1px solid rgba(184,155,110,.12); }
          .db { padding: 80px 36px; }
          .db-inner { grid-template-columns: 1fr; gap: 48px; }
          .db-left { position: static; }
          .dp { padding: 80px 36px; }
          .dp-inner { grid-template-columns: 1fr; gap: 56px; }
          .dp-offset { display: none; }
          .dstr { padding: 80px 36px; }
          .dh-content { padding: 120px 36px 100px; }
          .dh-vline { left: 36px; }
        }
        @media (max-width: 600px) {
          .dstr-grid { grid-template-columns: 1fr; }
          .dh-content { padding: 100px 24px 80px; }
          .db  { padding: 64px 24px; }
          .dp  { padding: 64px 24px; }
          .dstr{ padding: 64px 24px; }
          .dq  { padding: 96px 28px; }
        }
      `}</style>

            {/* ── HERO ── */}
            <section className="dh">
                {/* <img className="dh-img"
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1800&q=85"
                    alt="Director professional portrait"
                /> */}
                <div className="dh-g1" />
                <div className="dh-g2" />
                <div className="dh-vline"><div className="dh-dot" /></div>

                <div className="dh-content">
                    <p className="dh-super">Co-Founder & Director — Unique Builders & Developers</p>
                    <h1 className="dh-name">Lakshminarayan<br />Pillai</h1>
                    <div className="dh-rule" />
                    <p className="dh-quote">"Designing Legacy.<br />Building the Future."</p>
                    <div className="dh-pills">
                        {QUALIFICATIONS.map(q => (
                            <div key={q.degree} className="dh-pill">
                                <span>{q.degree}</span> · {q.field}
                            </div>
                        ))}
                    </div>
                </div>

                <FadeIn>
                    <div className="dp-img-wrap">
                        <div className="dp-img-frame">
                            <img
                                src="/images/director/laxmi.jpg"
                                alt="Lakshminarayan Pillai"
                            />
                            <div className="dp-gold-bar" />
                        </div>
                        <div className="dp-offset" />
                    </div>
                </FadeIn>

                <div className="dh-scroll">
                    <div className="dh-scroll-line" />
                    <p className="dh-scroll-lbl">Scroll</p>
                </div>
            </section>

            {/* ── BIO ── */}
            <section className="db">
                <div className="db-inner">
                    <FadeIn>
                        <div className="db-left">
                            <p className="d-stag">About the Director</p>
                            <h2 className="d-h2">A legacy built on<br />vision & purpose</h2>
                            <div className="d-hrule" />
                            <div className="db-tags">
                                {EXPERTISE.map(e => <span key={e} className="db-tag">{e}</span>)}
                            </div>
                        </div>
                    </FadeIn>

                    <div>
                        {BIO.map((p, i) => (
                            <FadeIn key={i} delay={i * 90}>
                                <p className="db-para"
                                    style={i === 0 ? { borderLeft: "2px solid #b89b6e", paddingLeft: 22 } : {}}
                                >{p}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PORTRAIT ── */}
            {/* <section className="dp">
                <div className="dp-inner">
                    <FadeIn>
                        <div className="dp-img-wrap">
                            <div className="dp-img-frame">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                                    alt="Lakshminarayan Pillai"
                                />
                                <div className="dp-gold-bar" />
                            </div>
                            <div className="dp-offset" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={120}>
                        <div>
                            <h2 className="dp-name">Lakshminarayan<br />Pillai</h2>
                            <p className="dp-role">Co-Founder & Director</p>
                            <div className="d-hrule" />
                            <p className="dp-pull">
                                "Leading with a clear vision, empowering teams, and fostering a culture built on integrity, collaboration, and continuous improvement."
                            </p>
                            <div className="dp-quals">
                                {QUALIFICATIONS.map(q => (
                                    <div key={q.degree} className="dp-qual">
                                        <span className="dp-deg">{q.degree}</span>
                                        <div className="dp-sep" />
                                        <span className="dp-field">{q.field}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section> */}

            {/* ── STRENGTHS ── */}
            <section className="dstr">
                <FadeIn>
                    <div className="dstr-hdr">
                        <p className="d-stag" style={{ textAlign: "center" }}>Core Strengths</p>
                        <h2 className="d-h2" style={{ textAlign: "center" }}>What drives his leadership</h2>
                        <div className="d-hrule" style={{ margin: "0 auto" }} />
                    </div>
                </FadeIn>
                <div className="dstr-grid">
                    {STRENGTHS.map(({ Icon, title, desc }, i) => (
                        <FadeIn key={i} delay={i * 80}>
                            <div className="dstr-card">
                                <div className="dstr-icon"><Icon size={18} strokeWidth={1.5} /></div>
                                <h3 className="dstr-title">{title}</h3>
                                <p className="dstr-desc">{desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* ── QUOTE BANNER ── */}
            <section className="dq">
                <img className="dq-img"
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=75"
                    alt="Architecture background"
                />
                <div className="dq-body">
                    <FadeIn>
                        <div className="dq-line" />
                        <p className="dq-text">
                            "A consistent commitment to excellence, innovation, and value-driven leadership — shaping developments that stand the test of time."
                        </p>
                        <div className="dq-line" />
                        <p className="dq-attr">Lakshminarayan Pillai · Co-Founder & Director</p>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}