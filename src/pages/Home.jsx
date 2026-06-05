import React, { useEffect, useRef, useState, useCallback, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const BRAND = 'Unique Builders & Developers'

const developments = [
  { id: 1, name: 'New City Palace', location: 'Pushpak Nagar', img: '/images/newcitypalace413/1.jpeg', color: '#2c3e50', slug: 'project-1', soldOut: 72 },
  { id: 2, name: 'Gajanan Enclave', location: 'Pushpak Nagar', img: '/images/gajananenclave357/1.jpg', color: '#1a3a4a', slug: 'project-2', soldOut: 50 },
  { id: 3, name: 'Unique Palacio', location: 'Pushpak Nagar', img: '/images/uniquepalacio24/1.jpg', color: '#1a3a4a', slug: 'project-3', soldOut: 30 },
  { id: 4, name: 'Unique Apartment', location: 'Ulwe', img: '/images/uniqueapartment420/1.jpg', color: '#1a3a4a', slug: 'project-4', soldOut: 88 },
  { id: 5, name: 'Ravi Apartment', location: 'Karanjade, Pushpak Node', img: '/images/raviapartment141/raviapartment-5.jpg', color: '#1a3a4a', slug: 'project-5', soldOut: 100 },
  { id: 6, name: 'Happy Apartment', location: 'Khalapur, Rees', img: '/images/happyappartment/2.jpg', color: '#1a3a4a', slug: 'project-6', soldOut: 30 },
  { id: 7, name: 'Unique Aura', location: 'Pushpak Nagar', img: '/images/uniqueaura/unique-2.jpeg', color: '#1a3a4a', slug: 'project-7', soldOut: 65 },
]

const footerLeft = ['Our Story', 'Our Impact', 'Our Developments', 'Experiences', 'Signature Hospitality', 'Press Room', 'Awards', 'Blogs']
const footerRight = ['NRI', 'Investor Relations', 'Careers', 'Terms & Conditions', 'Disclaimer', 'Contact Us', 'SMART ODR']

/* ─────────────────────────────────────────────
   GLOBAL SCROLL MANAGER
   Single rAF loop instead of one per component
───────────────────────────────────────────── */
const scrollListeners = new Set()
let rafScheduled = false

function globalScrollTick() {
  rafScheduled = false
  scrollListeners.forEach(fn => fn())
}

function addScrollListener(fn) {
  scrollListeners.add(fn)
  if (scrollListeners.size === 1) {
    window.addEventListener('scroll', scheduleRaf, { passive: true })
  }
}


function removeScrollListener(fn) {
  scrollListeners.delete(fn)
  if (scrollListeners.size === 0) {
    window.removeEventListener('scroll', scheduleRaf)
  }
}

function scheduleRaf() {
  if (!rafScheduled) {
    rafScheduled = true
    requestAnimationFrame(globalScrollTick)
  }
}

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
   SOLD-OUT RING  — SVG arc progress badge
───────────────────────────────────────────── */
const SoldOutRing = memo(function SoldOutRing({ pct, size = 54 }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const cx = size / 2
  const cy = size / 2

  const color =
    pct >= 70 ? '#e07a5f'
      : pct >= 40 ? '#d4aa6a'
        : '#9ab87a'

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, contain: 'strict' }}>
      <svg
        width={size} height={size}
        style={{ transform: 'rotate(-90deg)', display: 'block' }}
        aria-hidden="true"
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          style={{ transition: 'stroke-dasharray 1.1s cubic-bezier(.22,1,.36,1)', willChange: 'stroke-dasharray' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        lineHeight: 1, gap: 1,
      }}>
        <span style={{
          fontFamily: "'DM Sans',sans-serif", fontWeight: 500,
          fontSize: size < 50 ? '0.58rem' : '0.65rem',
          color, letterSpacing: '-0.02em',
        }}>{pct}%</span>
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────────
   SOLD-OUT STRIP — progress bar below card
───────────────────────────────────────────── */
const SoldOutStrip = memo(function SoldOutStrip({ pct }) {
  const color =
    pct >= 70 ? '#e07a5f'
      : pct >= 40 ? '#d4aa6a'
        : '#9ab87a'
  const remaining = 100 - pct

  return (
    <div style={{ marginTop: '0.6rem', padding: '0 0.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3a342e' }}>{pct}% Sold</span>
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', color: '#9a8a78', letterSpacing: '0.06em' }}>{remaining}% Left</span>
      </div>

      <div style={{ height: 4, borderRadius: 99, background: 'rgba(154,138,120,0.18)', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%', borderRadius: 99, width: `${pct}%`,
          background: `linear-gradient(90deg,${color}cc,${color})`,
          transition: 'width 1.1s cubic-bezier(.22,1,.36,1)',
          position: 'relative', overflow: 'hidden',
          willChange: 'width',
        }}>
          {/* Shimmer: translate-based — no layout/paint cost */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.45) 50%,transparent 100%)',
            animation: 'shimmerSlide 2.2s infinite linear',
            willChange: 'transform',
          }} />
        </div>
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────────
   FANCY IMAGE — parallax + clip-path reveal
   All heavy props on GPU-composited layers
───────────────────────────────────────────── */
const FancyImg = memo(function FancyImg({ src, alt, style, revealIn, delay = 0, parallax = false }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!parallax) return
    const tick = () => {
      const el = wrapRef.current
      if (!el || !imgRef.current) return
      const rect = el.getBoundingClientRect()
      const prog = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const offset = (prog - 0.5) * 60
      imgRef.current.style.transform = `scale(1.12) translateY(${offset}px) translateZ(0)`
    }
    addScrollListener(tick)
    return () => removeScrollListener(tick)
  }, [parallax])

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', overflow: 'hidden', willChange: 'transform', ...style }}
    >
      {/* Skeleton — opacity-only transition, zero paint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#e8e2dc',
        opacity: loaded ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <img
        ref={imgRef}
        src={src}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transform: parallax ? 'scale(1.12) translateZ(0)' : 'scale(1) translateZ(0)',
          opacity: loaded ? 1 : 0,
          transition: loaded
            ? parallax ? 'opacity 0.6s ease' : 'opacity 0.6s ease, transform 0.85s cubic-bezier(.22,1,.36,1)'
            : 'none',
          willChange: parallax ? 'transform' : 'opacity',
        }}
      />

      {/* Clip-path wipe overlay — GPU-composited */}
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
})

/* ─────────────────────────────────────────────
   CARD IMAGE — sold-out ring + urgency badge
───────────────────────────────────────────── */
const CardImg = memo(function CardImg({ src, color, name, location, soldOut, onClick }) {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const urgency =
    soldOut >= 80 ? 'Almost Gone'
      : soldOut >= 60 ? 'Selling Fast'
        : soldOut >= 40 ? 'Limited Units'
          : 'Available'

  const urgencyBg =
    soldOut >= 80 ? 'rgba(224,122,95,0.92)'
      : soldOut >= 60 ? 'rgba(212,170,106,0.92)'
        : soldOut >= 40 ? 'rgba(212,170,106,0.72)'
          : 'rgba(154,184,122,0.85)'

  const barColor =
    soldOut >= 70 ? 'linear-gradient(90deg,#e07a5f,#f09070)'
      : soldOut >= 40 ? 'linear-gradient(90deg,#d4aa6a,#e8c480)'
        : 'linear-gradient(90deg,#9ab87a,#b8d498)'

  /* Inline handlers avoid re-renders from state cascade */
  const enter = useCallback(() => setHovered(true), [])
  const leave = useCallback(() => setHovered(false), [])

  return (
    <div
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        overflow: 'hidden',
        height: 'clamp(280px,30vw,420px)',
        position: 'relative',
        background: color,
        cursor: 'pointer',
        borderRadius: 2,
        /* transform on wrapper keeps inner absolutely-positioned children composited */
        transform: hovered ? 'translateY(-6px) translateZ(0)' : 'translateY(0) translateZ(0)',
        transition: 'transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s',
        boxShadow: hovered
          ? '0 28px 56px rgba(0,0,0,0.22), 0 8px 16px rgba(0,0,0,0.1)'
          : '0 4px 18px rgba(0,0,0,0.08)',
        willChange: 'transform,box-shadow',
        contain: 'layout style',
      }}
    >
      {/* Skeleton */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#d0c8c0',
        opacity: loaded ? 0 : 1,
        transition: 'opacity 0.5s ease',
        zIndex: 1, pointerEvents: 'none',
      }} />

      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          display: 'block',
          transform: hovered ? 'scale(1.07) translateZ(0)' : 'scale(1.01) translateZ(0)',
          transition: 'transform 0.9s cubic-bezier(.22,1,.36,1), opacity 0.5s',
          opacity: loaded ? 1 : 0,
          willChange: 'transform',
        }}
      />

      {/* Gradient overlay — opacity only (cheap) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(0deg,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.18) 50%,transparent 100%)',
        opacity: hovered ? 1 : 0.55,
        transition: 'opacity 0.45s',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* TOP-LEFT: Category tag */}
      <div style={{
        position: 'absolute', top: '0.85rem', left: '0.85rem', zIndex: 3,
        padding: '3px 10px',
        border: '1px solid rgba(255,255,255,0.25)',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(6px)',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0) translateZ(0)' : 'translateY(-6px) translateZ(0)',
        transition: 'opacity 0.35s, transform 0.35s',
        willChange: 'opacity,transform',
      }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Residential</span>
      </div>

      {/* TOP-RIGHT: Sold-out ring */}
      <div style={{
        position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
        background: 'rgba(0,0,0,0.42)',
        backdropFilter: 'blur(8px)',
        borderRadius: '50px',
        padding: '0.4rem 0.55rem',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transform: hovered ? 'scale(1.08) translateZ(0)' : 'scale(1) translateZ(0)',
        transition: 'transform 0.4s cubic-bezier(.22,1,.36,1)',
        willChange: 'transform',
      }}>
        <SoldOutRing pct={soldOut} size={48} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.46rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', lineHeight: 1, paddingBottom: '0.1rem' }}>Sold</span>
      </div>

      {/* URGENCY PILL */}
      <div style={{
        position: 'absolute', top: '50%', right: '0.75rem', zIndex: 4,
        transform: hovered
          ? 'translateY(-50%) translateX(0) translateZ(0)'
          : 'translateY(-50%) translateX(12px) translateZ(0)',
        background: urgencyBg,
        backdropFilter: 'blur(6px)',
        borderRadius: 99,
        padding: '0.28rem 0.7rem',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s 0.1s, transform 0.4s 0.1s cubic-bezier(.22,1,.36,1)',
        border: '1px solid rgba(255,255,255,0.22)',
        pointerEvents: 'none',
        willChange: 'opacity,transform',
      }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>{urgency}</span>
      </div>

      {/* BOTTOM INFO */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.2rem 1rem 1rem', zIndex: 3,
        transform: hovered ? 'translateY(0) translateZ(0)' : 'translateY(4px) translateZ(0)',
        transition: 'transform 0.4s cubic-bezier(.22,1,.36,1)',
        willChange: 'transform',
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,1.4vw,1.18rem)', fontWeight: 400, color: '#fff', marginBottom: '0.2rem', lineHeight: 1.2 }}>{name}</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{location}</p>

        <div style={{ marginTop: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{soldOut}% Sold Out</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.54rem', color: 'rgba(255,255,255,0.38)' }}>{100 - soldOut}% left</span>
          </div>
          <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.18)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              width: `${soldOut}%`,
              background: barColor,
              transition: 'width 1.2s cubic-bezier(.22,1,.36,1)',
              willChange: 'width',
            }} />
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.7rem',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) translateZ(0)' : 'translateY(6px) translateZ(0)',
          transition: 'opacity 0.3s 0.05s, transform 0.3s 0.05s',
          willChange: 'opacity,transform',
        }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.78rem', color: '#d4aa6a', letterSpacing: '0.04em' }}>View Project</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="#d4aa6a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Corner marks — opacity only */}
      <div style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '1.5px solid rgba(255,255,255,0.3)', borderRight: '1.5px solid rgba(255,255,255,0.3)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 4 }} />
      <div style={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: '1.5px solid rgba(255,255,255,0.3)', borderLeft: '1.5px solid rgba(255,255,255,0.3)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 4 }} />
    </div>
  )
})

/* ─────────────────────────────────────────────
   TEXT BLOCK — staggered children
───────────────────────────────────────────── */
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function TextBlock({ label, heading, italic, body, btn, inView, style }) {
  return (
    <div className={`stagger-wrap ${inView ? 'revealed' : ''}`} style={style}>
      {label && <p className="sc label-text">{label}</p>}
      <h2 className="sc serif-head" style={{ fontStyle: italic ? 'italic' : 'normal' }}>{heading}</h2>
      {body && <p className="sc body-text">{body}</p>}
      {btn && <div className="sc know-btn-wrap">{btn}</div>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SOLD-OUT LEGEND
───────────────────────────────────────────── */
const SoldOutLegend = memo(function SoldOutLegend() {
  const items = [
    { color: '#9ab87a', label: 'Available (< 40% sold)' },
    { color: '#d4aa6a', label: 'Limited Units (40–69%)' },
    { color: '#e07a5f', label: 'Almost Gone (70%+)' },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.4rem', justifyContent: 'center', marginBottom: 'clamp(1.4rem,3vw,2.4rem)' }}>
      {items.map(it => (
        <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: it.color, flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: '#7a6e65', textTransform: 'uppercase' }}>{it.label}</span>
        </div>
      ))}
    </div>
  )
})

/* ─────────────────────────────────────────────
   DISCOUNT NOTIFICATION
───────────────────────────────────────────── */
const DiscountNotification = memo(function DiscountNotification({ visible, onClose }) {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    }, 3000)
    return () => clearInterval(id)
  }, [visible])

  return (
    <div style={{
      position: 'fixed',
      bottom: 'clamp(1rem,3vw,2rem)',
      right: 'clamp(1rem,3vw,2rem)',
      zIndex: 9999,
      maxWidth: 'min(380px,calc(100vw - 2rem))',
      width: '100%',
      transform: visible ? 'translateY(0) scale(1) translateZ(0)' : 'translateY(120%) scale(0.95) translateZ(0)',
      opacity: visible ? 1 : 0,
      transition: 'transform 0.65s cubic-bezier(.22,1,.36,1), opacity 0.5s ease',
      pointerEvents: visible ? 'auto' : 'none',
      willChange: 'transform,opacity',
    }}>
      <div style={{ background: '#1a1610', borderRadius: 4, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.32),0 6px 18px rgba(0,0,0,0.18)', border: '1px solid rgba(212,170,106,0.25)' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg,#b8924a,#d4aa6a,#9a7535)' }} />

        <div style={{ padding: 'clamp(1rem,3vw,1.4rem)' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.8rem', marginBottom: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(212,170,106,0.12)',
                border: '1px solid rgba(212,170,106,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transform: pulse ? 'scale(1.18) translateZ(0)' : 'scale(1) translateZ(0)',
                transition: 'transform 0.3s cubic-bezier(.22,1,.36,1)',
                willChange: 'transform',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 12v10H4V12" stroke="#d4aa6a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 7H2v5h20V7z" stroke="#d4aa6a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22V7" stroke="#d4aa6a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" stroke="#d4aa6a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#d4aa6a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4aa6a', marginBottom: '0.15rem' }}>Exclusive Offer</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.4vw,1.18rem)', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.2 }}>Book Direct &amp; Save</p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Dismiss offer"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', flexShrink: 0, padding: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div style={{ height: '1px', background: 'rgba(212,170,106,0.18)', marginBottom: '0.9rem' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg,#b8924a,#d4aa6a)', borderRadius: 3, padding: '0.55rem 0.9rem', textAlign: 'center', flexShrink: 0 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 500, color: '#1a1610', lineHeight: 1, letterSpacing: '-0.02em' }}>2%</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,22,16,0.75)', marginTop: '0.15rem' }}>OFF</p>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(0.72rem,2vw,0.82rem)', color: '#d8d0c4', lineHeight: 1.65 }}>
              Get an <strong style={{ color: '#d4aa6a', fontWeight: 500 }}>additional 2% discount</strong> when you book directly through our website — exclusively for online visitors.
            </p>
          </div>

          <Link to="/enquiry" style={{ textDecoration: 'none' }}>
            <div
              style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: 'linear-gradient(90deg,#b8924a,#d4aa6a)', borderRadius: 2, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a1610', fontWeight: 500 }}>Explore Offer</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="#1a1610" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.54rem', color: 'rgba(255,255,255,0.28)', textAlign: 'center', marginTop: '0.6rem', letterSpacing: '0.06em' }}>*Offer valid on direct website bookings only. T&amp;C apply.</p>
        </div>
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate()

  const [showNotif, setShowNotif] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowNotif(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const [promiseRef, promiseInView] = useInView()
  const [purposeRef, purposeInView] = useInView()
  const [devHeadRef, devHeadInView] = useInView()
  const [hospRef, hospInView] = useInView()
  const [devGridRef, devGridInView] = useInView({ threshold: 0.06 })

  const closeNotif = useCallback(() => setShowNotif(false), [])
  const navToProject = useCallback((slug) => navigate(`/projects/${slug}`), [navigate])

  return (
    <div style={{ background: '#faf9f7', color: '#1a1610', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

        /*
          All keyframes use only transform/opacity.
          shimmerSlide uses translateX instead of background-position
          → runs on the compositor thread, zero main-thread cost.
        */
        @keyframes shimmerSlide {
          0%   { transform:translateX(-100%) translateZ(0); }
          100% { transform:translateX(200%)  translateZ(0); }
        }
        @keyframes heroUp    { from{opacity:0;transform:translateY(28px) translateZ(0)} to{opacity:1;transform:translateY(0) translateZ(0)} }
        @keyframes bounce    { 0%,100%{transform:translateX(-50%) translateY(0) translateZ(0)} 50%{transform:translateX(-50%) translateY(8px) translateZ(0)} }
        @keyframes lineSweep { from{transform:scaleX(0) translateZ(0)} to{transform:scaleX(1) translateZ(0)} }
        @keyframes floatDot  { 0%,100%{transform:translateY(0) scale(1) translateZ(0)} 50%{transform:translateY(-12px) scale(1.1) translateZ(0)} }
        @keyframes videoFade { from{opacity:0;transform:scale(1.06) translateZ(0)} to{opacity:1;transform:scale(1) translateZ(0)} }
        @keyframes cardReveal{ from{opacity:0;transform:translateY(28px) scale(0.95) translateZ(0)} to{opacity:1;transform:translateY(0) scale(1) translateZ(0)} }

        .hero-eyebrow { animation:heroUp 1.2s cubic-bezier(.22,1,.36,1) forwards 0.9s; opacity:0; }
        .hero-text    { animation:heroUp 1.3s cubic-bezier(.22,1,.36,1) forwards 1.1s; opacity:0; will-change:transform,opacity; }
        .hero-line    { transform-origin:left; animation:lineSweep 1s cubic-bezier(.22,1,.36,1) forwards 1.5s; transform:scaleX(0); will-change:transform; }
        video.hero-video { animation:videoFade 1.8s cubic-bezier(.22,1,.36,1) forwards; will-change:transform,opacity; }

        /* Stagger reveal — only transform+opacity, always composited */
        .stagger-wrap .sc {
          opacity:0;
          transform:translateY(24px) translateZ(0);
          transition:opacity 0.85s cubic-bezier(.22,1,.36,1), transform 0.85s cubic-bezier(.22,1,.36,1);
          will-change:opacity,transform;
        }
        .stagger-wrap.revealed .sc { opacity:1; transform:translateY(0) translateZ(0); }
        .stagger-wrap.revealed .sc:nth-child(1){transition-delay:0.05s}
        .stagger-wrap.revealed .sc:nth-child(2){transition-delay:0.18s}
        .stagger-wrap.revealed .sc:nth-child(3){transition-delay:0.32s}
        .stagger-wrap.revealed .sc:nth-child(4){transition-delay:0.48s}

        .label-text { font-family:'DM Sans',sans-serif; font-size:0.6rem; letter-spacing:0.26em; text-transform:uppercase; color:#9a8a78; margin-bottom:0.65rem; }
        .serif-head { font-family:'Cormorant Garamond',serif; font-size:clamp(1.55rem,2.8vw,2.35rem); font-weight:400; line-height:1.24; color:#1a1610; margin-bottom:0.9rem; }
        .body-text  { font-family:'DM Sans',sans-serif; font-size:0.8rem; color:#5a5550; line-height:1.9; max-width:340px; margin-bottom:1.6rem; }
        .know-btn-wrap a, .know-btn-wrap button, .know-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          border:1px solid #9a8a78; color:#4a3f35; background:transparent;
          cursor:pointer; font-family:'DM Sans',sans-serif; font-size:0.68rem;
          letter-spacing:0.16em; text-transform:uppercase; padding:0.52rem 1.5rem;
          text-decoration:none;
          transition:background 0.35s, color 0.35s, box-shadow 0.35s;
        }
        .know-btn-wrap a:hover, .know-btn-wrap button:hover, .know-btn:hover {
          background:#1a1610; color:#fff; box-shadow:0 8px 24px rgba(26,22,16,0.18);
        }

        .fl { font-family:'DM Sans',sans-serif; font-size:0.74rem; color:rgba(255,255,255,0.52); display:block; margin-bottom:0.55rem; text-decoration:none; transition:color 0.2s,transform 0.2s; will-change:transform; }
        .fl:hover { color:#fff; transform:translateX(6px) translateZ(0); }
        .si { width:32px; height:32px; border-radius:50%; border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.6); text-decoration:none; transition:background 0.3s,color 0.3s,transform 0.3s; will-change:transform; }
        .si:hover { background:#fff; color:#1a1610; transform:scale(1.1) translateZ(0); }

        /* Dev grid */
        .dev-grid {
          display:grid;
          gap:clamp(0.9rem,2vw,1.6rem);
          grid-template-columns:repeat(4,minmax(0,1fr));
        }
        .dev-card { opacity:0; will-change:opacity,transform; }
        .dev-grid.revealed .dev-card {
          animation:cardReveal 0.75s cubic-bezier(.22,1,.36,1) forwards;
        }
        .dev-grid.revealed .dev-card:nth-child(1){ animation-delay:0.05s }
        .dev-grid.revealed .dev-card:nth-child(2){ animation-delay:0.18s }
        .dev-grid.revealed .dev-card:nth-child(3){ animation-delay:0.31s }
        .dev-grid.revealed .dev-card:nth-child(4){ animation-delay:0.44s }
        .dev-grid.revealed .dev-card:nth-child(5){ animation-delay:0.57s }
        .dev-grid.revealed .dev-card:nth-child(6){ animation-delay:0.70s }
        .dev-grid.revealed .dev-card:nth-child(7){ animation-delay:0.83s }

        .dev-card-label { margin-top:0.55rem; padding:0 0.1rem; }
        .dev-card-name  { font-family:'DM Sans',sans-serif; font-size:0.8rem; font-weight:500; color:#2a2520; line-height:1.3; }
        .dev-card-loc   { font-family:'DM Sans',sans-serif; font-size:0.68rem; color:#9a8a78; margin-top:0.18rem; letter-spacing:0.04em; }

        .presence-accent { display:inline-block; width:36px; height:1px; background:linear-gradient(to right,#b8924a,#9a7535); margin:0 auto; }

        /* Responsive */
        @media(max-width:1200px){ .dev-grid{ grid-template-columns:repeat(3,minmax(0,1fr)); } }
        @media(max-width:900px) { .dev-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media(max-width:480px) { .dev-grid{ grid-template-columns:1fr; } }
        @media(max-width:768px) {
          .two-col     { grid-template-columns:1fr !important; }
          .purpose-grid{ grid-template-columns:1fr !important; }
          .img-right-group{ min-height:280px !important; }
        }
        @media(max-width:480px) {
          .img-right-group { display:none !important; }
        }
      `}</style>

      {/* ═══ DISCOUNT NOTIFICATION ═══ */}
      <DiscountNotification visible={showNotif} onClose={closeNotif} />

      {/* ═══ §1 HERO ═══ */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 520, overflow: 'hidden' }}>
        <video
          className="hero-video"
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform,opacity' }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlays — no animation, just static layers */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(0,0,0,0.25) 0%,transparent 60%)', pointerEvents: 'none' }} />

        {/* Floating rings — translateZ forces own compositor layer */}
        <div style={{ position: 'absolute', top: '22%', right: '10%', width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', animation: 'floatDot 6s ease-in-out infinite', pointerEvents: 'none', willChange: 'transform' }} />
        <div style={{ position: 'absolute', top: '28%', right: '13%', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'floatDot 6s ease-in-out infinite 1.5s', pointerEvents: 'none', willChange: 'transform' }} />

        <div style={{ position: 'absolute', bottom: '14%', left: 'clamp(1.5rem,7vw,5rem)', zIndex: 2 }}>
          <p className="hero-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, color: '#fff', letterSpacing: '0.02em', lineHeight: 1.2, maxWidth: 620 }}>
            Creating spaces where<br />life becomes art.
          </p>
        </div>

        <div className="hero-line" style={{ position: 'absolute', bottom: '8%', left: 'clamp(1.5rem,7vw,5rem)', zIndex: 2, width: 52, height: 1, background: 'rgba(255,255,255,0.65)' }} />

        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', zIndex: 2, animation: 'bounce 1.8s ease-in-out infinite', willChange: 'transform' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
              heading={<>Raising the Standard<br />of Living</>}
              body={`${BRAND}, Transparency integrity, and innovation are at the core of everything we do, ensuring that every project reflects our promise of excellence, reliability, and long-term value. Whether it's a first home, a growing family space, or a strategic investment, each Unique Builders development is designed to blend modern lifestyles with enduring trust, making dreams tangible one brick at a time.`}
              btn={<Link to="/our-story" className="know-btn">Know More <ArrowIcon /></Link>}
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
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', zIndex: 4, pointerEvents: 'none' }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.85rem', color: '#fff' }}>Our Story</span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                <FancyImg src="/images/homepage/second.jpg" revealIn={purposeInView} delay={0.2} style={{ height: '100%', minHeight: 120 }} />
                <div style={{ position: 'absolute', bottom: '0.7rem', left: '0.7rem', zIndex: 4, pointerEvents: 'none' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.72rem', color: '#fff' }}>Our Impact</span>
                </div>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                <FancyImg src="/images/homepage/fifth.jpg" revealIn={purposeInView} delay={0.4} style={{ height: '100%', minHeight: 120 }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ §4 OUR PRESENCE — SOLD-OUT CARDS ═══ */}
      <section style={{ background: '#f2ede8', padding: 'clamp(3.5rem,7vw,5.5rem) clamp(1.5rem,7vw,5.5rem)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div ref={devHeadRef} className={`stagger-wrap ${devHeadInView ? 'revealed' : ''}`}
            style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
            <p className="sc label-text">Portfolio</p>
            <h2 className="sc" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', fontWeight: 400, color: '#1a1610', marginBottom: '1rem' }}>
              Our Presence
            </h2>
            <div className="sc presence-accent" />
          </div>

          <SoldOutLegend />

          <div ref={devGridRef} className={`dev-grid ${devGridInView ? 'revealed' : ''}`}>
            {developments.map((d) => (
              <div key={d.id} className="dev-card">
                <CardImg
                  src={d.img} color={d.color} name={d.name}
                  location={d.location} soldOut={d.soldOut}
                  onClick={() => navToProject(d.slug)}
                />
                <div className="dev-card-label">
                  <p className="dev-card-name">{d.name}</p>
                  <p className="dev-card-loc">· {d.location}</p>
                </div>
                <SoldOutStrip pct={d.soldOut} />
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
              btn={<button className="know-btn">Know More <ArrowIcon /></button>}
            />
          </div>
        </div>
      </section>

    </div>
  )
}