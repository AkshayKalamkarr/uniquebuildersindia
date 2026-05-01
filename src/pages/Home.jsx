import React, { useEffect, useRef, useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const BRAND = 'Unique builders & developers'

const developments = [
    { id: 1, name: 'New City Palace', location: 'Pushpak Nagar', img: '/images/newcitypalace413/1.jpeg', color: '#2c3e50', slug: 'project-1' },
    { id: 2, name: 'Gajanan Enclave', location: 'Pushpak Nagar', img: '/images/gajananenclave357/1.jpg', color: '#1a3a4a', slug: 'project-2' },
    { id: 3, name: 'Unique Palacio', location: 'Pushpak Nagar', img: '/images/uniquepalacio24/1.jpg', color: '#1a3a4a', slug: 'project-3' },
    { id: 4, name: 'Unique Apartment', location: 'Ulwe', img: '/images/uniqueapartment420/1.jpg', color: '#1a3a4a', slug: 'project-4' },
    { id: 5, name: 'Ravi Apartment', location: 'Karanjade, Pushpak Node', img: '/images/raviapartment141/raviapartment-5.jpg', color: '#1a3a4a', slug: 'project-5' },
    { id: 6, name: 'Happy Apartment', location: 'Khalapur, Rees', img: '/images/happyappartment/2.jpg', color: '#1a3a4a', slug: 'project-6' },
    { id: 7, name: 'Unique Aura', location: 'Pushpak Nagar', img: '/images/uniqueaura/unique-2.jpeg', color: '#1a3a4a', slug: 'project-7' },
]
const footerLeft = ['Our Story', 'Our Impact', 'Our Developments', 'Experiences', 'Signature Hospitality', 'Press Room', 'Awards', 'Blogs']
const footerRight = ['NRI', 'Investor Relations', 'Careers', 'Terms & Conditions', 'Disclaimer', 'Contact Us', 'SMART ODR']

/* ─────────────────────────────────────────────
   HOOK — Intersection Observer (fires once)
───────────────────────────────────────────── */
function useInView(opts = {}) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const ob = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setInView(true); ob.unobserve(el) }
        }, { threshold: 0.12, ...opts })
        ob.observe(el)
        return () => ob.disconnect()
    }, [])
    return [ref, inView]
}

/* ─────────────────────────────────────────────
   FANCY IMAGE — shimmer + clip-path wipe + parallax
───────────────────────────────────────────── */
function FancyImg({ src, alt, style, revealIn, delay = 0, parallax = false }) {
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef(null)
    const wrapRef = useRef(null)
    const rafRef = useRef(null)

    useEffect(() => {
        if (!parallax) return
        const handleScroll = () => {
            if (rafRef.current) return
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null
                const el = wrapRef.current
                if (!el) return
                const rect = el.getBoundingClientRect()
                const prog = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
                const offset = (prog - 0.5) * 60
                if (imgRef.current) imgRef.current.style.transform = `scale(1.12) translateY(${offset}px)`
            })
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [parallax])

    return (
        <div ref={wrapRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>
            {!loaded && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg,#f0ece8 0%,#e8e2dc 40%,#f0ece8 80%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.6s infinite linear',
                    zIndex: 1,
                }} />
            )}
            <img
                ref={imgRef}
                src={src}
                alt={alt || ''}
                onLoad={() => setLoaded(true)}
                style={{
                    width: '100%', height: '100%', objectFit: 'contain', display: 'block',
                    transform: parallax ? 'scale(1.12)' : 'scale(1)',
                    transition: parallax ? 'none' : 'transform 0.85s cubic-bezier(.22,1,.36,1)',
                    filter: loaded ? 'none' : 'blur(4px)',
                    opacity: loaded ? 1 : 0,
                    transitionProperty: 'opacity,filter',
                    transitionDuration: '0.6s',
                    willChange: parallax ? 'transform' : 'auto',
                }}
            />
            <div style={{
                position: 'absolute', inset: 0,
                background: '#faf9f7',
                clipPath: revealIn
                    ? 'polygon(0 0,100% 0,100% 0,0 0)'
                    : 'polygon(0 0,100% 0,100% 100%,0 100%)',
                transition: `clip-path 1.2s cubic-bezier(.22,1,.36,1) ${delay}s`,
                pointerEvents: 'none', zIndex: 2,
                willChange: 'clip-path',
            }} />
        </div>
    )
}

/* ─────────────────────────────────────────────
   CARD IMAGE — FIXED: objectFit cover, taller height
───────────────────────────────────────────── */
function CardImg({ src, color, name, location, onClick }) {
    const [loaded, setLoaded] = useState(false)
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                overflow: 'hidden',
                /* ── KEY FIX: taller box so full building is visible ── */
                height: 'clamp(280px, 30vw, 420px)',
                position: 'relative',
                background: color,
                cursor: 'pointer',
                borderRadius: 2,
                transform: hovered ? 'translateY(-6px) translateZ(0)' : 'translateY(0) translateZ(0)',
                transition: 'transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s',
                boxShadow: hovered
                    ? '0 28px 56px rgba(0,0,0,0.22), 0 8px 16px rgba(0,0,0,0.1)'
                    : '0 4px 18px rgba(0,0,0,0.08)',
                willChange: 'transform, box-shadow',
            }}
        >
            {!loaded && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg,#e8e4e0,#d8d2cc,#e8e4e0)',
                    backgroundSize: '200%',
                    animation: 'shimmer 1.4s infinite linear',
                    zIndex: 1,
                }} />
            )}

            {/* ── KEY FIX: objectFit cover fills the box completely ── */}
            <img
                src={src}
                alt={name}
                onLoad={() => setLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',          /* was 'contain' — now fills box */
                    objectPosition: 'center top', /* keep top of building visible */
                    display: 'block',
                    transform: hovered ? 'scale(1.07) translateZ(0)' : 'scale(1.01) translateZ(0)',
                    transition: 'transform 0.9s cubic-bezier(.22,1,.36,1), opacity 0.5s',
                    opacity: loaded ? 1 : 0,
                    willChange: 'transform',
                }}
            />

            {/* Bottom gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)',
                opacity: hovered ? 1 : 0.55,
                transition: 'opacity 0.45s',
                pointerEvents: 'none',
            }} />

            {/* Top-left category tag */}
            <div style={{
                position: 'absolute', top: '0.85rem', left: '0.85rem', zIndex: 3,
                padding: '3px 10px',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(6px)',
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(-6px)',
                transition: 'opacity 0.35s, transform 0.35s',
            }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
                    Residential
                </span>
            </div>

            {/* Bottom info — always visible, lifts on hover */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.2rem 1rem 1rem',
                zIndex: 3,
                transform: hovered ? 'translateY(0)' : 'translateY(4px)',
                transition: 'transform 0.4s cubic-bezier(.22,1,.36,1)',
            }}>
                <p style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 'clamp(1rem,1.4vw,1.18rem)',
                    fontWeight: 400,
                    color: '#fff',
                    marginBottom: '0.2rem',
                    lineHeight: 1.2,
                    textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                }}>{name}</p>
                <p style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                }}>{location}</p>

                {/* Explore link */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    marginTop: '0.7rem',
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.3s 0.05s, transform 0.3s 0.05s',
                }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.78rem', color: '#d4aa6a', letterSpacing: '0.04em' }}>
                        View Project
                    </span>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="#d4aa6a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Corner marks */}
            <div style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '1.5px solid rgba(255,255,255,0.3)', borderRight: '1.5px solid rgba(255,255,255,0.3)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 4 }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: '1.5px solid rgba(255,255,255,0.3)', borderLeft: '1.5px solid rgba(255,255,255,0.3)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 4 }} />
        </div>
    )
}

/* ─────────────────────────────────────────────
   TEXT BLOCK — staggered children
───────────────────────────────────────────── */
function TextBlock({ label, heading, italic, body, btn, inView, style }) {
    return (
        <div className={`stagger-wrap ${inView ? 'revealed' : ''}`} style={style}>
            {label && <p className="sc label-text">{label}</p>}
            <h2 className="sc serif-head" style={{ fontStyle: italic ? 'italic' : 'normal' }}>{heading}</h2>
            {body && <p className="sc body-text">{body}</p>}
            {btn && <button className="sc know-btn">{btn}</button>}
        </div>
    )
}

const ArrowIcon = () => (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Home() {
    const navigate = useNavigate()
    const videoRef = useRef(null)

    const [promiseRef, promiseInView] = useInView()
    const [purposeRef, purposeInView] = useInView()
    const [devHeadRef, devHeadInView] = useInView()
    const [hospRef, hospInView] = useInView()
    const [footerRef, footerInView] = useInView()
    const [devGridRef, devGridInView] = useInView({ threshold: 0.08 })

    return (
        <div style={{ background: '#faf9f7', color: '#1a1610', overflowX: 'hidden' }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes shimmer   { to { background-position:-200% 0 } }
        @keyframes heroUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce    { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes lineSweep { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes floatDot  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
        @keyframes videoFade { from{opacity:0;transform:scale(1.06)} to{opacity:1;transform:scale(1)} }

        @keyframes cardReveal {
          from { opacity:0; transform:translateY(28px) scale(0.95) translateZ(0); }
          to   { opacity:1; transform:translateY(0)   scale(1)    translateZ(0); }
        }

        .hero-eyebrow { animation:heroUp 1.2s cubic-bezier(.22,1,.36,1) forwards 0.9s; opacity:0; }
        .hero-text    { animation:heroUp 1.3s cubic-bezier(.22,1,.36,1) forwards 1.1s; opacity:0; }
        .hero-line    { transform-origin:left; animation:lineSweep 1s cubic-bezier(.22,1,.36,1) forwards 1.5s; transform:scaleX(0); }
        video.hero-video { animation:videoFade 1.8s cubic-bezier(.22,1,.36,1) forwards; }

        .stagger-wrap .sc { opacity:0; transform:translateY(24px); transition:opacity 0.85s cubic-bezier(.22,1,.36,1),transform 0.85s cubic-bezier(.22,1,.36,1); }
        .stagger-wrap.revealed .sc { opacity:1; transform:translateY(0); }
        .stagger-wrap.revealed .sc:nth-child(1){transition-delay:0.05s}
        .stagger-wrap.revealed .sc:nth-child(2){transition-delay:0.18s}
        .stagger-wrap.revealed .sc:nth-child(3){transition-delay:0.32s}
        .stagger-wrap.revealed .sc:nth-child(4){transition-delay:0.48s}

        .label-text{font-family:'DM Sans',sans-serif;font-size:0.6rem;letter-spacing:0.26em;text-transform:uppercase;color:#9a8a78;margin-bottom:0.65rem;}
        .serif-head{font-family:'Cormorant Garamond',serif;font-size:clamp(1.55rem,2.8vw,2.35rem);font-weight:400;line-height:1.24;color:#1a1610;margin-bottom:0.9rem;}
        .body-text {font-family:'DM Sans',sans-serif;font-size:0.8rem;color:#5a5550;line-height:1.9;max-width:340px;margin-bottom:1.6rem;}

        .know-btn{display:inline-flex;align-items:center;gap:0.5rem;border:1px solid #9a8a78;color:#4a3f35;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.16em;text-transform:uppercase;padding:0.52rem 1.5rem;transition:background 0.35s,color 0.35s,box-shadow 0.35s;}
        .know-btn:hover{background:#1a1610;color:#fff;box-shadow:0 8px 24px rgba(26,22,16,0.18);}
        .know-btn svg{transition:transform 0.3s;}
        .know-btn:hover svg{transform:translateX(4px);}

        .fl{font-family:'DM Sans',sans-serif;font-size:0.74rem;color:rgba(255,255,255,0.52);display:block;margin-bottom:0.55rem;text-decoration:none;transition:color 0.2s,padding-left 0.2s;}
        .fl:hover{color:#fff;padding-left:6px;}
        .si{width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);text-decoration:none;transition:all 0.3s;}
        .si:hover{background:#fff;color:#1a1610;transform:scale(1.1);}

        .fade-up      {opacity:0;transform:translateY(36px);transition:opacity 0.9s cubic-bezier(.22,1,.36,1),transform 0.9s cubic-bezier(.22,1,.36,1);}
        .fade-up.shown{opacity:1;transform:translateY(0);}

        /* ── Dev Grid ── */
        .dev-grid {
          display: grid;
          gap: clamp(0.9rem, 2vw, 1.6rem);
          grid-template-columns: repeat(4, minmax(0,1fr));
        }
        .dev-card { opacity:0; }
        .dev-grid.revealed .dev-card {
          animation: cardReveal 0.75s cubic-bezier(.22,1,.36,1) forwards;
          will-change: opacity, transform;
        }
        .dev-grid.revealed .dev-card:nth-child(1){ animation-delay:0.05s }
        .dev-grid.revealed .dev-card:nth-child(2){ animation-delay:0.18s }
        .dev-grid.revealed .dev-card:nth-child(3){ animation-delay:0.31s }
        .dev-grid.revealed .dev-card:nth-child(4){ animation-delay:0.44s }

        /* card name below image */
        .dev-card-label {
          margin-top: 0.85rem;
          padding: 0 0.1rem;
        }
        .dev-card-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: #2a2520;
          line-height: 1.3;
        }
        .dev-card-loc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          color: #9a8a78;
          margin-top: 0.18rem;
          letter-spacing: 0.04em;
        }

        /* ── Responsive breakpoints ── */
        @media(max-width:1024px) {
          .dev-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
        @media(max-width:540px) {
          .dev-grid { grid-template-columns: 1fr; }
        }

        @media(max-width:768px){
          .two-col{grid-template-columns:1fr !important;}
          .purpose-grid{grid-template-columns:1fr !important;}
          .img-right-group{min-height:280px !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
          .footer-brand{grid-column:span 2 !important;align-items:flex-start !important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr !important;}
          .footer-brand{grid-column:span 1 !important;}
          .img-right-group{ display:none !important; }
        }

        /* presence section heading accent */
        .presence-accent {
          display:inline-block;
          width: 36px; height: 1px;
          background: linear-gradient(to right, #b8924a, #9a7535);
          margin: 0 auto;
        }
      `}</style>

            {/* ═══ §1 HERO — VIDEO ═══ */}
            <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 520, overflow: 'hidden' }}>
                <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>

                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.6) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(0,0,0,0.25) 0%,transparent 60%)' }} />

                <div style={{ position: 'absolute', top: '22%', right: '10%', width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', animation: 'floatDot 6s ease-in-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '28%', right: '13%', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'floatDot 6s ease-in-out infinite 1.5s', pointerEvents: 'none' }} />

                <div style={{ position: 'absolute', bottom: '14%', left: 'clamp(1.5rem,7vw,5rem)', zIndex: 2 }}>
                    <p className="hero-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, color: '#fff', letterSpacing: '0.02em', lineHeight: 1.2, textShadow: '0 2px 32px rgba(0,0,0,0.3)', maxWidth: 620 }}>
                        Creating spaces where<br />life becomes art.
                    </p>
                </div>

                <div className="hero-line" style={{ position: 'absolute', bottom: '8%', left: 'clamp(1.5rem,7vw,5rem)', zIndex: 2, width: 52, height: 1, background: 'rgba(255,255,255,0.65)' }} />

                <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', zIndex: 2, animation: 'bounce 1.8s ease-in-out infinite' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 7l6 6 6-6" stroke="rgba(255,255,255,0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </section>

            {/* ═══ §2 OUR PROMISE ═══ */}
            <section style={{ background: '#faf9f7', padding: 'clamp(3.5rem,8vw,6rem) clamp(1.5rem,7vw,5.5rem)' }}>
                <div className="two-col" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center', maxWidth: 1080, margin: '0 auto' }}>
                    <FancyImg src="/images/homepage/first.jpeg" revealIn={promiseInView} parallax style={{ height: 'clamp(260px,40vw,460px)' }} />
                    <div ref={promiseRef}>
                        <TextBlock inView={promiseInView} label="Our Promise"
                            heading={<>Raising the Standard <br />of Living</>}
                            body={`${BRAND}, Transparency integrity, and innovation are at the core of everything we do, ensuring that every project reﬂects our promise of excellence, reliability, and long-term value. Whether it's a ﬁrst home, a growing family space, or a strategic investment, each Unique Builders development is designed to blend modern lifestyles with enduring trust, making dreams tangible one brick at a time.`}
                            btn={
                                <Link to="/our-story" className="know-btn">
                                    Know More <ArrowIcon />
                                </Link>
                            }
                        />
                    </div>
                </div>
            </section>

            {/* ═══ §3 OUR PURPOSE ═══ */}
            <section style={{ background: '#faf9f7', padding: '0 clamp(1.5rem,7vw,5.5rem) clamp(3.5rem,8vw,6rem)' }}>
                <div className="purpose-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.4fr)', gap: 'clamp(2rem,5vw,4.5rem)', alignItems: 'stretch', maxWidth: 1080, margin: '0 auto' }}>
                    <div ref={purposeRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <TextBlock inView={purposeInView} label="Our Purpose" heading="Building with Purpose. Living with Impact." italic
                            body={`${BRAND}, our purpose is to create spaces that go beyond construction—spaces that inspire better living, foster communities, and deliver lasting value. Every project we build is guided by integrity, innovation, and a commitment to enhancing the way people live and invest.`} />
                    </div>
                    <div className="img-right-group" style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.85fr', gap: 6, minHeight: 'clamp(340px,50vw,580px)' }}>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <FancyImg src="/images/homepage/third.png" revealIn={purposeInView} style={{ height: '100%', minHeight: 280 }} />
                            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', zIndex: 4 }}>
                                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.85rem', color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>Our Story</span>
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                                <FancyImg src="/images/homepage/second.jpg" revealIn={purposeInView} delay={0.2} style={{ height: '100%', minHeight: 120 }} />
                                <div style={{ position: 'absolute', bottom: '0.7rem', left: '0.7rem', zIndex: 4 }}>
                                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.72rem', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>Our Impact</span>
                                </div>
                            </div>
                            <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                                <FancyImg src="https://picsum.photos/seed/garden-arch/600/500" revealIn={purposeInView} delay={0.4} style={{ height: '100%', minHeight: 120 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                §4 OUR PRESENCE — FIXED CARD SECTION
            ═══════════════════════════════════════ */}
            <section style={{
                background: '#f2ede8',
                padding: 'clamp(3.5rem,7vw,5.5rem) clamp(1.5rem,7vw,5.5rem)',
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                    {/* Heading */}
                    <div
                        ref={devHeadRef}
                        className={`stagger-wrap ${devHeadInView ? 'revealed' : ''}`}
                        style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3.5rem)' }}
                    >

                        <h2 className="sc" style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 'clamp(1.8rem,3.2vw,2.8rem)',
                            fontWeight: 400,
                            color: '#1a1610',
                            marginBottom: '1rem',
                        }}>
                            Our Presence
                        </h2>
                        <div className="sc presence-accent" />
                    </div>

                    {/* Grid */}
                    <div
                        ref={devGridRef}
                        className={`dev-grid ${devGridInView ? 'revealed' : ''}`}
                    >
                        {developments.map((d) => (
                            <div key={d.id} className="dev-card">
                                {/* Card image — fills full height */}
                                <CardImg
                                    src={d.img}
                                    color={d.color}
                                    name={d.name}
                                    location={d.location}
                                    onClick={() => navigate(`/projects/${d.slug}`)}
                                />

                                {/* Label below card */}
                                <div className="dev-card-label">
                                    <p className="dev-card-name">{d.name}</p>
                                    <p className="dev-card-loc">· {d.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ═══ §5 SIGNATURE HOSPITALITY ═══ */}
            <section style={{ background: '#faf9f7', padding: 'clamp(3.5rem,8vw,6rem) clamp(1.5rem,7vw,5.5rem)' }}>
                <div className="two-col" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center', maxWidth: 1080, margin: '0 auto' }}>
                    <FancyImg src="/images/homepage/navimumbaiairport.jpg" revealIn={hospInView} parallax style={{ height: 'clamp(260px,38vw,440px)' }} />
                    <div ref={hospRef}>
                        <TextBlock inView={hospInView} label="Our Signature Service"
                            heading={<>Elevating<br />the everyday</>}
                            body="At Unique Builders & Developers, we go beyond building homes—we create experiences. From premium amenities to personalized services, every aspect is designed to enhance your daily life with comfort, convenience, and luxury."
                            btn={<>Know More <ArrowIcon /></>} />
                    </div>
                </div>
            </section>

        </div>
    )
}