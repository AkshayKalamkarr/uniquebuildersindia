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

            {/* ═══ §1 HERO — VIDEO ═══ */}
            <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 520, overflow: 'hidden' }}>
                <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>

                {/* Multi-layer vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.6) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(0,0,0,0.25) 0%,transparent 60%)' }} />

                {/* Floating orb rings */}
                <div style={{ position: 'absolute', top: '22%', right: '10%', width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', animation: 'floatDot 6s ease-in-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '28%', right: '13%', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'floatDot 6s ease-in-out infinite 1.5s', pointerEvents: 'none' }} />

                {/* Staggered text entrance */}
                <div style={{ position: 'absolute', bottom: '14%', left: 'clamp(1.5rem,7vw,5rem)', zIndex: 2 }}>
                    {/* <p className="hero-eyebrow" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.9rem' }}>
                        Curating the Extraordinary
                    </p> */}
                    <p className="hero-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, color: '#fff', letterSpacing: '0.02em', lineHeight: 1.2, textShadow: '0 2px 32px rgba(0,0,0,0.3)', maxWidth: 620 }}>
                        Creating spaces where<br />life becomes art.
                    </p>
                </div>

                {/* Animated underline sweep */}
                <div className="hero-line" style={{ position: 'absolute', bottom: '8%', left: 'clamp(1.5rem,7vw,5rem)', zIndex: 2, width: 52, height: 1, background: 'rgba(255,255,255,0.65)' }} />

                {/* Bounce chevron */}
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
                            body={`${BRAND}, Transparency integrity, and innovation are at the core of everything we do, ensuring that every project reﬂects our promise of excellence, reliability, and long-term value. Whether it’s a ﬁrst home, a growing family space, or a strategic investment, each Unique Builders development is designed to blend modern lifestyles with enduring trust, making dreams tangible one brick at a time.`}
                            btn={<>Know More <ArrowIcon /></>} />
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

            {/* ═══ §4 Our Presence ═══ */}
            <section style={{ background: '#f2ede8', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,7vw,5.5rem)' }}>
                <div style={{ maxWidth: 1080, margin: '0 auto' }}>
                    <div ref={devHeadRef} className={`stagger-wrap ${devHeadInView ? 'revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 className="sc" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.7rem,3vw,2.6rem)', fontWeight: 400, color: '#1a1610' }}>Our Presence</h2>
                        <div className="sc" style={{ width: 40, height: 1, background: '#9a8a78', margin: '1rem auto 0' }} />
                    </div>
                    <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 'clamp(0.8rem,2vw,1.4rem)' }}>
                        {developments.map((d, i) => (
                            <div key={d.id} ref={devInViews[i][0]} className={`scale-in ${devInViews[i][1] ? 'shown' : ''}`} style={{ transitionDelay: `${i * 0.13}s`, cursor: 'pointer' }}>
                                <CardImg src={d.img} color={d.color} />
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.73rem', color: '#2a2520', marginTop: '0.7rem' }}>
                                    {d.name}<span style={{ color: '#9a8a78', marginLeft: '0.4rem' }}>· {d.location}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ §5 SIGNATURE HOSPITALITY ═══ */}
            <section style={{ background: '#faf9f7', padding: 'clamp(3.5rem,8vw,6rem) clamp(1.5rem,7vw,5.5rem)' }}>
                <div className="two-col" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center', maxWidth: 1080, margin: '0 auto' }}>
                    <FancyImg src="/images/homepage/fourth.png" revealIn={hospInView} parallax style={{ height: 'clamp(260px,38vw,440px)' }} />
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