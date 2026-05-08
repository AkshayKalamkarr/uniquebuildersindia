import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

/* ── Google Fonts ── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:       #0d0b09;
      --gold:      #c9974a;
      --gold-lt:   #e8c98a;
      --gold-dim:  rgba(201,151,74,.18);
      --cream:     #f7f2eb;
      --muted:     #7a6e62;
      --card:      rgba(255,255,255,0.97);
      --border:    rgba(201,151,74,.22);
      --err:       #c0392b;
      --panel-bg:  rgba(10,8,6,0.88);
    }

    body { font-family: 'Outfit', sans-serif; min-height: 100vh; overflow-x: hidden; }

    /* ═══════════════════════════════════════
       PAGE SHELL – full-bleed background
    ═══════════════════════════════════════ */
    .page-shell {
      min-height: 100vh;
      background-image: url('/images/homepage/enquiryBg.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      display: flex;
      align-items: stretch;
      justify-content: center;
      position: relative;
    }

    /* dark overlay over entire bg */
    .page-shell::before {
      content: '';
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, rgba(10,8,6,.92) 0%, rgba(20,14,8,.80) 50%, rgba(10,8,6,.90) 100%);
      z-index: 0;
    }

    /* ═══════════════════════════════════════
       TWO-COLUMN WRAPPER
    ═══════════════════════════════════════ */
    .layout {
      position: relative;
      z-index: 1;
      display: flex;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      min-height: 100vh;
      align-items: stretch;
    }

    /* ─── LEFT PANEL ─── */
    .left-panel {
      display: none;
      flex: 0 0 48%;
      position: relative;
      padding: 60px 52px;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
    }

    @media (min-width: 900px) {
      .left-panel { display: flex; }
    }

    /* decorative glow blob */
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(64px);
      pointer-events: none;
      will-change: transform, opacity;
    }
    .blob-1 {
      width: 380px; height: 380px;
      background: radial-gradient(circle, rgba(201,151,74,.28) 0%, transparent 70%);
      top: -80px; right: -80px;
      animation: floatBlob1 9s ease-in-out infinite;
    }
    .blob-2 {
      width: 260px; height: 260px;
      background: radial-gradient(circle, rgba(201,151,74,.15) 0%, transparent 70%);
      bottom: 10%; left: -40px;
      animation: floatBlob2 11s ease-in-out infinite;
    }
    .blob-3 {
      width: 180px; height: 180px;
      background: radial-gradient(circle, rgba(232,201,138,.12) 0%, transparent 70%);
      top: 55%; right: 10%;
      animation: floatBlob1 7s ease-in-out 2s infinite;
    }

    @keyframes floatBlob1 {
      0%, 100% { transform: translate(0,0) scale(1); }
      33%       { transform: translate(-20px, 30px) scale(1.07); }
      66%       { transform: translate(15px,-20px) scale(.95); }
    }
    @keyframes floatBlob2 {
      0%, 100% { transform: translate(0,0) scale(1); }
      40%       { transform: translate(25px,-18px) scale(1.05); }
      70%       { transform: translate(-10px, 22px) scale(.97); }
    }

    /* floating geometric rings */
    .geo-rings {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      pointer-events: none;
    }
    .ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(201,151,74,.12);
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
    }
    .ring:nth-child(1) { width: 320px; height: 320px; animation: rotRing 22s linear infinite; }
    .ring:nth-child(2) { width: 460px; height: 460px; animation: rotRing 30s linear reverse infinite; border-style: dashed; }
    .ring:nth-child(3) { width: 600px; height: 600px; animation: rotRing 42s linear infinite; opacity: .6; }

    @keyframes rotRing {
      to { transform: translate(-50%,-50%) rotate(360deg); }
    }

    /* floating particles */
    .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .particle {
      position: absolute;
      width: 3px; height: 3px;
      border-radius: 50%;
      background: var(--gold);
      opacity: 0;
      animation: particleFly linear infinite;
    }
    @keyframes particleFly {
      0%   { opacity: 0; transform: translateY(0) scale(0); }
      10%  { opacity: .7; transform: translateY(-20px) scale(1); }
      90%  { opacity: .3; transform: translateY(-140px) scale(.6); }
      100% { opacity: 0; transform: translateY(-160px) scale(0); }
    }

    /* left panel text */
    .panel-tag {
      font-size: 11px;
      letter-spacing: .18em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: fadeUp .6s ease .1s both;
    }
    .panel-tag::before {
      content: '';
      width: 32px; height: 1px;
      background: var(--gold);
      display: inline-block;
    }

    .panel-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 4vw, 52px);
      font-weight: 600;
      color: #fff;
      line-height: 1.12;
      margin-bottom: 22px;
      animation: fadeUp .6s ease .2s both;
    }
    .panel-title em {
      font-style: italic;
      color: var(--gold-lt);
    }

    .panel-desc {
      font-size: 15px;
      color: rgba(255,255,255,.5);
      line-height: 1.75;
      max-width: 380px;
      margin-bottom: 40px;
      font-weight: 300;
      animation: fadeUp .6s ease .3s both;
    }

    /* trust bullets */
    .trust-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
      animation: fadeUp .6s ease .4s both;
    }
    .trust-list li {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 14px;
      color: rgba(255,255,255,.65);
      font-weight: 300;
    }
    .trust-icon {
      width: 34px; height: 34px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--gold-dim);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .trust-icon svg { width: 15px; height: 15px; stroke: var(--gold); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

    /* divider line between panels */
    .panel-divider {
      display: none;
      position: absolute;
      left: 48%;
      top: 5%;
      bottom: 5%;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(201,151,74,.25) 30%, rgba(201,151,74,.25) 70%, transparent);
      z-index: 2;
    }
    @media (min-width: 900px) { .panel-divider { display: block; } }

    /* stats row */
    .stats-row {
      display: flex;
      gap: 28px;
      margin-top: 36px;
      padding-top: 32px;
      border-top: 1px solid rgba(201,151,74,.14);
      animation: fadeUp .6s ease .5s both;
    }
    .stat { display: flex; flex-direction: column; gap: 3px; }
    .stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 700;
      color: var(--gold-lt);
      line-height: 1;
    }
    .stat-label {
      font-size: 11px;
      color: rgba(255,255,255,.38);
      letter-spacing: .06em;
      text-transform: uppercase;
    }

    /* ─── RIGHT PANEL (form side) ─── */
    .right-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 28px;
      position: relative;
      z-index: 2;
    }

    .form-card {
      background: var(--card);
      width: 100%;
      max-width: 440px;
      border-radius: 24px;
      box-shadow:
        0 0 0 1px rgba(201,151,74,.1),
        0 8px 32px rgba(0,0,0,.18),
        0 32px 80px rgba(0,0,0,.22);
      overflow: hidden;
      animation: cardIn .7s cubic-bezier(.22,.68,0,1.15) both;
    }
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(32px) scale(.96); }
      to   { opacity: 1; transform: translateY(0)    scale(1); }
    }

    /* card header */
    .card-head {
      background: linear-gradient(135deg, #111008 0%, #1c1509 100%);
      padding: 30px 32px 26px;
      position: relative;
      overflow: hidden;
    }
    .card-head::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,151,74,.5), transparent);
    }
    .head-eyebrow {
      font-size: 10.5px;
      letter-spacing: .16em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .head-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--gold);
      animation: dotPulse 2s ease infinite;
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(201,151,74,.4); }
      50%       { opacity: .7; transform: scale(.85); box-shadow: 0 0 0 6px rgba(201,151,74,0); }
    }
    .card-head h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 27px;
      font-weight: 600;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 5px;
    }
    .card-head p {
      font-size: 13px;
      color: rgba(255,255,255,.42);
      font-weight: 300;
    }

    /* decorative gold corner accent */
    .corner-accent {
      position: absolute;
      top: 0; right: 0;
      width: 80px; height: 80px;
      background: conic-gradient(from 180deg at 100% 0%, rgba(201,151,74,.25), transparent 40%);
    }

    /* card body */
    .card-body { padding: 26px 32px 32px; display: flex; flex-direction: column; gap: 15px; }

    /* ── Floating label fields ── */
    .field { position: relative; animation: fadeUp .4s ease both; }
    .field:nth-child(1) { animation-delay: .10s; }
    .field:nth-child(2) { animation-delay: .16s; }
    .field:nth-child(3) { animation-delay: .22s; }
    .field:nth-child(4) { animation-delay: .30s; }
    .submit-row        { animation: fadeUp .4s ease .36s both; }

    .field input,
    .field textarea {
      width: 100%;
      padding: 18px 16px 6px;
      background: #faf8f4;
      border: 1.5px solid #ede8df;
      border-radius: 12px;
      font-family: 'Outfit', sans-serif;
      font-size: 14.5px;
      color: #1a1510;
      transition: border-color .25s, box-shadow .25s, background .25s;
      outline: none;
      resize: none;
    }
    .field textarea { padding-top: 22px; min-height: 106px; }

    .field label {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      color: #9a8e82;
      pointer-events: none;
      transition: all .2s ease;
      font-family: 'Outfit', sans-serif;
    }
    .field textarea ~ label { top: 18px; transform: none; }

    .field input:focus,
    .field textarea:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201,151,74,.12);
      background: #fff;
    }
    .field input:focus ~ label,
    .field input:not(:placeholder-shown) ~ label,
    .field textarea:focus ~ label,
    .field textarea:not(:placeholder-shown) ~ label {
      top: 8px;
      transform: none;
      font-size: 10.5px;
      color: var(--gold);
      letter-spacing: .05em;
      font-weight: 500;
    }

    /* optional divider */
    .opt-divider {
      display: flex; align-items: center; gap: 10px;
      color: #b8b0a4;
      font-size: 11px;
      letter-spacing: .08em;
    }
    .opt-divider::before, .opt-divider::after {
      content: ''; flex: 1; height: 1px; background: #ede8df;
    }

    /* ── Submit Button ── */
    .submit-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #1a1208 0%, #2b1e0c 100%);
      color: var(--gold-lt);
      border: 1px solid rgba(201,151,74,.25);
      border-radius: 12px;
      font-family: 'Outfit', sans-serif;
      font-size: 14.5px;
      font-weight: 500;
      letter-spacing: .07em;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all .3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .submit-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #221808 0%, #3a2810 100%);
      border-color: rgba(201,151,74,.5);
      box-shadow: 0 6px 24px rgba(201,151,74,.18);
      transform: translateY(-1px);
    }
    .submit-btn:active:not(:disabled) { transform: translateY(0); }
    .submit-btn:disabled { background: #c8c0b8; color: #e8e0d8; border-color: transparent; cursor: not-allowed; }

    /* shimmer sweep on hover */
    .submit-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent);
      transition: left .5s ease;
    }
    .submit-btn:hover::before { left: 140%; }

    /* btn arrow */
    .btn-arrow {
      display: inline-flex;
      transition: transform .3s;
    }
    .submit-btn:hover .btn-arrow { transform: translateX(3px); }

    /* ── Spinner ── */
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      width: 15px; height: 15px;
      border: 2px solid rgba(232,201,138,.25);
      border-top-color: var(--gold-lt);
      border-radius: 50%;
      animation: spin .7s linear infinite;
      flex-shrink: 0;
    }

    /* ── Success State ── */
    .success-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 52px 32px;
      text-align: center;
    }
    .check-ring {
      width: 76px; height: 76px;
      border-radius: 50%;
      background: linear-gradient(135deg, #15100a, #2a1c0d);
      border: 1px solid rgba(201,151,74,.3);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 22px;
      box-shadow: 0 0 32px rgba(201,151,74,.2), 0 8px 32px rgba(0,0,0,.12);
      animation: popBounce .6s cubic-bezier(.22,.68,0,1.4) .1s both;
    }
    @keyframes popBounce {
      from { transform: scale(0) rotate(-20deg); }
      to   { transform: scale(1) rotate(0deg); }
    }
    .check-svg { width: 34px; height: 34px; }
    .check-path {
      stroke: var(--gold);
      stroke-width: 2.5;
      stroke-dasharray: 50;
      stroke-dashoffset: 50;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      animation: drawCheck .5s ease .45s forwards;
    }
    @keyframes drawCheck { to { stroke-dashoffset: 0; } }

    .success-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 600;
      color: #1a1510;
      margin-bottom: 10px;
      animation: fadeUp .4s ease .55s both;
    }
    .success-sub {
      font-size: 14px;
      color: #7a6e62;
      line-height: 1.7;
      max-width: 290px;
      font-weight: 300;
      animation: fadeUp .4s ease .65s both;
    }
    .success-badge {
      display: flex; align-items: center; gap: 8px;
      margin-top: 24px;
      padding: 10px 22px;
      background: #fdf8ef;
      border: 1px solid rgba(201,151,74,.3);
      border-radius: 100px;
      font-size: 13px;
      color: var(--gold);
      font-weight: 500;
      animation: fadeUp .4s ease .78s both;
    }
    .s-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--gold);
      animation: dotPulse 1.8s ease infinite;
    }
    .reset-btn {
      margin-top: 18px;
      background: none;
      border: 1.5px solid #ede8df;
      border-radius: 10px;
      padding: 10px 26px;
      font-family: 'Outfit', sans-serif;
      font-size: 13px;
      color: #9a8e82;
      cursor: pointer;
      transition: border-color .2s, color .2s;
      animation: fadeUp .4s ease .9s both;
    }
    .reset-btn:hover { border-color: var(--gold); color: var(--gold); }

    /* shared keyframe */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Mobile adjustments ── */
    @media (max-width: 899px) {
      .page-shell { align-items: flex-start; }
      .right-panel { padding: 28px 16px; min-height: 100vh; align-items: flex-start; padding-top: 40px; }
      .card-head { padding: 24px 24px 20px; }
      .card-body { padding: 22px 24px 28px; }
    }
  `}</style>
);

/* ── Particles generator ── */
const Particles = () => {
  const positions = [
    { left: '12%', animationDelay: '0s', animationDuration: '5.5s' },
    { left: '28%', animationDelay: '1.2s', animationDuration: '6.8s' },
    { left: '44%', animationDelay: '0.5s', animationDuration: '5s' },
    { left: '60%', animationDelay: '2s', animationDuration: '7.2s' },
    { left: '76%', animationDelay: '0.8s', animationDuration: '6s' },
    { left: '90%', animationDelay: '1.6s', animationDuration: '5.8s' },
    { left: '20%', animationDelay: '3s', animationDuration: '6.5s' },
    { left: '52%', animationDelay: '2.4s', animationDuration: '7s' },
    { left: '82%', animationDelay: '1s', animationDuration: '5.3s' },
  ];
  return (
    <div className="particles">
      {positions.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: `${10 + (i % 4) * 12}%`,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

/* ── Trust items ── */
const TrustItem = ({ children, iconPath }) => (
  <li>
    <div className="trust-icon">
      <svg viewBox="0 0 24 24"><path d={iconPath} /></svg>
    </div>
    {children}
  </li>
);

const EnquiryForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const btnRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendEmail = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form,
        import.meta.env.VITE_PUBLIC_KEY
      );
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("FAILED:", err);
      alert("Failed to send ❌ Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="page-shell">
        <div className="layout">

          {/* ═══════════════════════════════════
              LEFT PANEL – animated content
          ═══════════════════════════════════ */}
          <div className="left-panel">
            {/* decorative blobs */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            {/* rotating rings */}
            <div className="geo-rings">
              <div className="ring" />
              <div className="ring" />
              <div className="ring" />
            </div>

            {/* floating particles */}
            <Particles />

            {/* text content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <p className="panel-tag">Premium Service</p>

              <h1 className="panel-title">
                Let's craft your<br />
                <em>perfect vision</em><br />
                together.
              </h1>

              <p className="panel-desc">
                Share your ideas with us and our dedicated team will transform them
                into reality. Every enquiry is handled with care and complete discretion.
              </p>

              <ul className="trust-list">
                <TrustItem iconPath="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z">
                  Fully confidential &amp; secure
                </TrustItem>
                <TrustItem iconPath="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75">
                  Dedicated relationship manager
                </TrustItem>
                <TrustItem iconPath="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.71 3.53 2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.02-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z">
                  Response within 24 hours
                </TrustItem>
              </ul>

              <div className="stats-row">
                <div className="stat">
                  <span className="stat-num">98%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
                <div className="stat">
                  <span className="stat-num">5K+</span>
                  <span className="stat-label">Clients Served</span>
                </div>
                <div className="stat">
                  <span className="stat-num">12yr</span>
                  <span className="stat-label">Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* vertical divider */}
          <div className="panel-divider" />

          {/* ═══════════════════════════════════
              RIGHT PANEL – form card
          ═══════════════════════════════════ */}
          <div className="right-panel">
            <div className="form-card">

              {/* card header */}
              <div className="card-head">
                <div className="corner-accent" />
                <div className="head-eyebrow">
                  <span className="head-dot" />
                  Get in touch
                </div>
                <h2>Send us an Enquiry</h2>
                <p>We typically respond within 24 hours.</p>
              </div>

              {submitted ? (
                /* ── Success State ── */
                <div className="success-wrap">
                  <div className="check-ring">
                    <svg className="check-svg" viewBox="0 0 34 34">
                      <polyline className="check-path" points="6,18 14,26 28,10" />
                    </svg>
                  </div>
                  <h3 className="success-title">Enquiry Received!</h3>
                  <p className="success-sub">
                    Thank you for reaching out. Our team will get back to you shortly regarding your enquiry.
                  </p>
                  <div className="success-badge">
                    <span className="s-dot" />
                    Our team is on it
                  </div>
                  <button className="reset-btn" onClick={() => setSubmitted(false)}>
                    Submit another enquiry
                  </button>
                </div>

              ) : (
                /* ── Form State ── */
                <form className="card-body" onSubmit={sendEmail}>

                  <div className="field">
                    <input type="text" name="name" placeholder=" " value={form.name} onChange={handleChange} required />
                    <label>Full Name</label>
                  </div>

                  <div className="field">
                    <input type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} required />
                    <label>Email Address</label>
                  </div>

                  <div className="field">
                    <input type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} required />
                    <label>Phone Number</label>
                  </div>

                  <div className="opt-divider">optional</div>

                  <div className="field">
                    <textarea name="message" placeholder=" " value={form.message} onChange={handleChange} />
                    <label>Your Message</label>
                  </div>

                  <div className="submit-row">
                    <button ref={btnRef} type="submit" disabled={loading} className="submit-btn">
                      {loading ? (
                        <>
                          <div className="spinner" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <span className="btn-arrow">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EnquiryForm;