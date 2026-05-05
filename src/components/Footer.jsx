import React, { useEffect, useRef, useState } from 'react'

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
        }, { threshold: 0.1, ...opts })
        ob.observe(el)
        return () => ob.disconnect()
    }, [])
    return [ref, inView]
}

/* ─────────────────────────────────────────────
   NAV LINKS — only what's in the navbar
───────────────────────────────────────────── */
const NAV_LINKS = [
    { label: 'Our Story', href: '/our-story' },
    { label: 'Our Impact', href: '/our-impact' },
    { label: 'Navi Mumbai Rising', href: '/navi-mumbai' },
]

const SOCIAL = [
    {
        label: 'Instagram',
        href: '#',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: 'Facebook',
        href: '#',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: '#',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'YouTube',
        href: '#',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42A2.78 2.78 0 0 0 20.59 4.4C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-2.02A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
]

/* ─────────────────────────────────────────────
   BRAND LOGO MARK (SVG building icon)
───────────────────────────────────────────── */
const LogoMark = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 60" fill="none">
        <rect x="18" y="2" width="12" height="56" fill="url(#gold-vert)" rx="1" />
        <rect x="8" y="14" width="8" height="44" fill="url(#gold-vert)" rx="1" opacity=".75" />
        <rect x="32" y="14" width="8" height="44" fill="url(#gold-vert)" rx="1" opacity=".75" />
        <rect x="1" y="28" width="6" height="30" fill="url(#gold-vert)" rx="1" opacity=".5" />
        <rect x="41" y="28" width="6" height="30" fill="url(#gold-vert)" rx="1" opacity=".5" />
        <rect x="0" y="57" width="48" height="2" fill="#c9974a" rx="1" />
        <defs>
            <linearGradient id="gold-vert" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#e8c98a" />
                <stop offset="100%" stopColor="#9a6e30" />
            </linearGradient>
        </defs>
    </svg>
)

/* ─────────────────────────────────────────────
   FOOTER COMPONENT
───────────────────────────────────────────── */
export default function Footer() {
    const [rootRef, rootInView] = useInView()
    const [linksRef, linksInView] = useInView()
    const [botRef, botInView] = useInView()
    const year = new Date().getFullYear()

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Variables ── */
        :root {
          --gold:     #c9974a;
          --gold-lt:  #e8c98a;
          --gold-dim: rgba(201,151,74,.15);
          --ink:      #0d0b07;
          --ink-2:    #161210;
          --muted:    rgba(255,255,255,.38);
          --muted-hv: rgba(255,255,255,.75);
          --border:   rgba(201,151,74,.18);
        }

        /* ── Footer shell ── */
        .ubf-footer {
          background: var(--ink);
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* top glow pulse */
        .ubf-footer::before {
          content: '';
          position: absolute;
          top: -160px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 360px;
          background: radial-gradient(ellipse, rgba(201,151,74,.08) 0%, transparent 68%);
          pointer-events: none;
        }

        /* subtle grain texture overlay */
        .ubf-footer::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: .6;
        }

        .ubf-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 6vw, 4rem);
        }

        /* ══ TOP GOLD LINE ══ */
        .ubf-top-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 40%, var(--gold) 60%, transparent 100%);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 1.4s cubic-bezier(.22,1,.36,1);
        }
        .ubf-top-line.shown { transform: scaleX(1); }

        /* ══ BRAND SECTION ══ */
        .ubf-brand-section {
          padding: clamp(3rem, 6vw, 5.5rem) 0 clamp(2.5rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1);
        }
        .ubf-brand-section.shown { opacity: 1; transform: translateY(0); }

        .ubf-logo-wrap {
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 24px rgba(201,151,74,.2));
        }

        .ubf-wordmark {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.45rem;
        }
        .ubf-wordmark span {
          color: var(--gold);
        }

        .ubf-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(0.85rem, 1.6vw, 1.05rem);
          color: rgba(255,255,255,.35);
          letter-spacing: 0.06em;
          margin-bottom: 1.8rem;
        }

        /* gold ornament divider */
        .ubf-ornament {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
        }
        .ubf-ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border));
        }
        .ubf-ornament-line.r {
          background: linear-gradient(90deg, var(--border), transparent);
        }
        .ubf-ornament-diamond {
          width: 7px; height: 7px;
          background: var(--gold);
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .ubf-ornament-dot {
          width: 3px; height: 3px;
          background: rgba(201,151,74,.5);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* ══ NAV LINKS STRIP ══ */
        .ubf-links-section {
          padding: clamp(2rem, 4vw, 3rem) 0;
          border-top: 1px solid rgba(255,255,255,.05);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .ubf-links-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(1.2rem, 4vw, 3.5rem);
          opacity: 0;
          transform: translateY(22px);
          transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1);
        }
        .ubf-links-grid.shown { opacity: 1; transform: translateY(0); }

        .ubf-nav-link {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.65rem, 1.2vw, 0.72rem);
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: color .3s ease;
          white-space: nowrap;
        }
        .ubf-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width .4s cubic-bezier(.22,1,.36,1);
        }
        .ubf-nav-link:hover { color: var(--gold-lt); }
        .ubf-nav-link:hover::after { width: 100%; }

        /* separator dots between links */
        .ubf-nav-sep {
          color: rgba(201,151,74,.3);
          font-size: 0.5rem;
          display: flex;
          align-items: center;
          user-select: none;
        }

        /* ══ SOCIAL + CONTACT ROW ══ */
        .ubf-bottom-section {
          padding: clamp(1.8rem, 3.5vw, 2.8rem) 0 clamp(1.5rem, 3vw, 2.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity .85s cubic-bezier(.22,1,.36,1) .15s, transform .85s cubic-bezier(.22,1,.36,1) .15s;
        }
        .ubf-bottom-section.shown { opacity: 1; transform: translateY(0); }

        /* contact pill */
        .ubf-contact-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.55rem 1.4rem 0.55rem 1rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          background: var(--gold-dim);
          text-decoration: none;
          transition: background .3s, border-color .3s, transform .3s;
        }
        .ubf-contact-pill:hover {
          background: rgba(201,151,74,.25);
          border-color: rgba(201,151,74,.4);
          transform: translateY(-2px);
        }
        .ubf-contact-pill-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--gold);
          animation: ubf-pulse 2.2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes ubf-pulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(201,151,74,.5); }
          50%      { opacity:.7; box-shadow:0 0 0 5px rgba(201,151,74,0); }
        }
        .ubf-contact-pill-text {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-lt);
          font-weight: 400;
        }

        /* social icons */
        .ubf-socials {
          display: flex;
          gap: 0.65rem;
        }
        .ubf-social-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.12);
          background: transparent;
          color: rgba(255,255,255,.45);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all .32s cubic-bezier(.22,1,.36,1);
          cursor: pointer;
        }
        .ubf-social-btn:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--ink);
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 20px rgba(201,151,74,.28);
        }

        /* ══ COPYRIGHT BAR ══ */
        .ubf-copy-bar {
          border-top: 1px solid rgba(255,255,255,.06);
          padding: 1.1rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .ubf-copy-text {
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,.22);
          text-transform: uppercase;
        }
        .ubf-copy-text a {
          color: rgba(201,151,74,.45);
          text-decoration: none;
          transition: color .2s;
        }
        .ubf-copy-text a:hover { color: var(--gold); }

        .ubf-rera {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.7rem;
          color: rgba(255,255,255,.18);
          letter-spacing: 0.04em;
        }

        /* ══ RERA / LEGAL STRIP ══ */
        .ubf-legal-strip {
          background: rgba(0,0,0,.35);
          border-top: 1px solid rgba(255,255,255,.04);
          padding: 0.85rem 0;
          text-align: center;
        }
        .ubf-legal-text {
          font-size: 0.58rem;
          color: rgba(255,255,255,.18);
          line-height: 1.8;
          letter-spacing: 0.04em;
          max-width: 860px;
          margin: 0 auto;
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 640px) {
          .ubf-nav-sep { display: none; }
          .ubf-links-grid { gap: 1rem 2rem; }
          .ubf-bottom-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .ubf-copy-bar {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 420px) {
          .ubf-wordmark { letter-spacing: 0.16em; }
          .ubf-links-grid { gap: 0.9rem 1.6rem; }
        }
      `}</style>

            <footer className="ubf-footer">

                {/* ── TOP GOLD ACCENT LINE ── */}
                <div className="ubf-inner">
                    <div
                        className={`ubf-top-line ${rootInView ? 'shown' : ''}`}
                        ref={rootRef}
                    />
                </div>

                {/* ── BRAND SECTION ── */}
                <div className="ubf-inner">
                    <div className={`ubf-brand-section ${rootInView ? 'shown' : ''}`}>

                        <div className="ubf-logo-wrap">
                            <LogoMark size={52} />
                        </div>

                        <p className="ubf-wordmark">
                            <span>Unique</span> Builders &amp; Developers
                        </p>
                        <p className="ubf-sub">Every Brick Lead To Your Dream</p>

                        {/* ornament divider */}
                        <div className="ubf-ornament">
                            <div className="ubf-ornament-line" />
                            <div className="ubf-ornament-dot" />
                            <div className="ubf-ornament-diamond" />
                            <div className="ubf-ornament-dot" />
                            <div className="ubf-ornament-line r" />
                        </div>
                    </div>
                </div>

                {/* ── NAV LINKS ── */}
                <div className="ubf-links-section">
                    <div className="ubf-inner">
                        <nav
                            ref={linksRef}
                            className={`ubf-links-grid ${linksInView ? 'shown' : ''}`}
                            aria-label="Footer navigation"
                        >
                            {NAV_LINKS.map((link, i) => (
                                <React.Fragment key={link.label}>
                                    <a href={link.href} className="ubf-nav-link">{link.label}</a>
                                    {i < NAV_LINKS.length - 1 && (
                                        <span className="ubf-nav-sep" aria-hidden="true">◆</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* ── SOCIAL + CONTACT ── */}
                <div className="ubf-inner">
                    <div
                        ref={botRef}
                        className={`ubf-bottom-section ${botInView ? 'shown' : ''}`}
                    >
                        {/* contact pill */}
                        <a href="/enquiry" className="ubf-contact-pill">
                            <span className="ubf-contact-pill-dot" />
                            <span className="ubf-contact-pill-text">Contact Us</span>
                        </a>

                        {/* social row */}
                        <div className="ubf-socials">
                            {SOCIAL.map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    className="ubf-social-btn"
                                    aria-label={s.label}
                                    title={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── COPYRIGHT ── */}
                    <div className="ubf-copy-bar">
                        <p className="ubf-copy-text">
                            © {year} Unique Builders &amp; Developers. All Rights Reserved.
                            {' '}·{' '}
                            <a href="#">Privacy Policy</a>
                            {' '}·{' '}
                            <a href="#">Terms &amp; Conditions</a>
                            {' '}·{' '}
                            <a href="#">Disclaimer</a>
                        </p>
                        <p className="ubf-rera">MahaRERA Registered</p>
                    </div>
                </div>

                {/* ── LEGAL FINE PRINT ── */}
                <div className="ubf-legal-strip">
                    <div className="ubf-inner">
                        <p className="ubf-legal-text">
                            The content on this website is for informational purposes only and does not constitute an offer or contract.
                            All images, specifications, and details are indicative and subject to change without prior notice.
                            Buyers are advised to verify all information independently before making any purchase decisions.
                        </p>
                    </div>
                </div>

            </footer>
        </>
    )
}