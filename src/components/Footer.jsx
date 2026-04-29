import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const BRAND = 'Unique builders & developers'

const developments = [
    { id: 1, name: 'New City Palace', location: 'Pushpak Nagar', img: '/images/newcitypalace413/1.jpeg', color: '#2c3e50' },
    { id: 2, name: 'Unique Apartment', location: 'Ulwe', img: '/images/uniqueapartment420/1.jpg', color: '#1a3a4a' },
    { id: 3, name: 'Unique Palacio', location: 'Karanjadi', img: '/images/uniquepalacio24/1.jpg', color: '#3d2b1f' },
    { id: 4, name: 'Gajanan Enclave', location: 'Rasayani', img: '/images/gajananenclave357/1.jpg', color: '#1a2a3a' },
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

    useEffect(() => {
        if (!parallax) return
        const handleScroll = () => {
            const el = wrapRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const prog = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
            const offset = (prog - 0.5) * 60
            if (imgRef.current) imgRef.current.style.transform = `scale(1.12) translateY(${offset}px)`
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
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
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transform: parallax ? 'scale(1.12)' : 'scale(1)',
                    transition: parallax ? 'none' : 'transform 0.85s cubic-bezier(.22,1,.36,1)',
                    filter: loaded ? 'none' : 'blur(4px)',
                    opacity: loaded ? 1 : 0,
                    transitionProperty: 'opacity,transform,filter',
                    transitionDuration: '0.6s',
                }}
            />
            {/* Clip-path curtain — slides away on reveal */}
            <div style={{
                position: 'absolute', inset: 0,
                background: '#faf9f7',
                clipPath: revealIn
                    ? 'polygon(0 0,100% 0,100% 0,0 0)'
                    : 'polygon(0 0,100% 0,100% 100%,0 100%)',
                transition: `clip-path 1.2s cubic-bezier(.22,1,.36,1) ${delay}s`,
                pointerEvents: 'none', zIndex: 2,
            }} />
        </div>
    )
}

/* ─────────────────────────────────────────────
   CARD IMAGE — lift + scale + explore label
───────────────────────────────────────────── */
function CardImg({ src, color }) {
    const [loaded, setLoaded] = useState(false)
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                overflow: 'hidden',
                height: 'clamp(150px,18vw,220px)',
                position: 'relative',
                background: color,
                transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'transform 0.4s cubic-bezier(.22,1,.36,1),box-shadow 0.4s',
                boxShadow: hovered ? '0 22px 44px rgba(0,0,0,0.2)' : '0 4px 14px rgba(0,0,0,0.07)',
            }}
        >
            {!loaded && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg,#e8e4e0,#d8d2cc,#e8e4e0)',
                    backgroundSize: '200%',
                    animation: 'shimmer 1.4s infinite linear',
                }} />
            )}
            <img src={src} alt="" onLoad={() => setLoaded(true)}
                style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transform: hovered ? 'scale(1.1)' : 'scale(1.02)',
                    transition: 'transform 0.85s cubic-bezier(.22,1,.36,1),opacity 0.5s',
                    opacity: loaded ? 1 : 0,
                }}
            />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(0deg,rgba(0,0,0,0.55) 0%,transparent 55%)',
                opacity: hovered ? 1 : 0.28,
                transition: 'opacity 0.4s',
            }} />
            {hovered && (
                <div style={{
                    position: 'absolute', bottom: '0.9rem', left: '0.9rem', zIndex: 2,
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    animation: 'fadeUpQ 0.35s cubic-bezier(.22,1,.36,1) forwards',
                }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.78rem', color: '#fff', letterSpacing: '0.04em' }}>Explore</span>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
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
    const videoRef = useRef(null)

    const [promiseRef, promiseInView] = useInView()
    const [purposeRef, purposeInView] = useInView()
    const [devHeadRef, devHeadInView] = useInView()
    const [hospRef, hospInView] = useInView()
    const [footerRef, footerInView] = useInView()

    const devInViews = [useInView(), useInView(), useInView(), useInView()]

    return (
        <div style={{ background: '#faf9f7', color: '#1a1610', overflowX: 'hidden' }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes shimmer   { to { background-position:-200% 0 } }
        @keyframes heroUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUpQ   { from{opacity:0;transform:translateY(8px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes bounce    { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes lineSweep { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes floatDot  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
        @keyframes videoFade { from{opacity:0;transform:scale(1.06)} to{opacity:1;transform:scale(1)} }

        .hero-eyebrow { animation:heroUp 1.2s cubic-bezier(.22,1,.36,1) forwards 0.9s; opacity:0; }
        .hero-text    { animation:heroUp 1.3s cubic-bezier(.22,1,.36,1) forwards 1.1s; opacity:0; }
        .hero-line    { transformOrigin:left; animation:lineSweep 1s cubic-bezier(.22,1,.36,1) forwards 1.5s; transform:scaleX(0); }
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
        .scale-in      {opacity:0;transform:scale(0.9) translateY(20px);transition:opacity 0.9s cubic-bezier(.22,1,.36,1),transform 0.9s cubic-bezier(.22,1,.36,1);}
        .scale-in.shown{opacity:1;transform:scale(1) translateY(0);}

        @media(max-width:768px){
          .two-col{grid-template-columns:1fr !important;}
          .four-col{grid-template-columns:repeat(2,1fr) !important;}
          .purpose-grid{grid-template-columns:1fr !important;}
          .img-right-group{min-height:280px !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
          .footer-brand{grid-column:span 2 !important;align-items:flex-start !important;}
        }
        @media(max-width:480px){
          .four-col{grid-template-columns:1fr !important;}
          .footer-grid{grid-template-columns:1fr !important;}
          .footer-brand{grid-column:span 1 !important;}
        }
      `}</style>

            {/* ═══ §6 FOOTER ═══ */}
            <footer style={{ background: '#1a1610', padding: 'clamp(2.5rem,5vw,4.5rem) clamp(1.5rem,7vw,5.5rem) 1.5rem' }}>
                <div ref={footerRef} className={`footer-grid fade-up ${footerInView ? 'shown' : ''}`}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(1.5rem,4vw,3rem)', maxWidth: 1080, margin: '0 auto 3rem' }}>
                    <div>{footerLeft.map(l => <a key={l} href="#" className="fl">{l}</a>)}</div>
                    <div>{footerRight.map(l => <a key={l} href="#" className="fl">{l}</a>)}</div>
                    <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1.6rem', fontWeight: 500, letterSpacing: '0.32em', color: '#fff', textTransform: 'uppercase' }}>{BRAND}</p>
                        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem', textAlign: 'right' }}>Crafting life's finest moments.</p>
                        <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.5rem' }}>
                            <a href="#" className="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg></a>
                            <a href="#" className="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
                            <a href="#" className="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.2rem', maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>© {BRAND} Group 2026. All Rights Reserved.</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Privacy · Terms</p>
                </div>
            </footer>
        </div>
    )
}