import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

/* ── Google Fonts (Playfair Display + DM Sans) loaded via @import ── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream:   #f5f0e8;
      --ink:     #1a1510;
      --gold:    #c9a84c;
      --gold-lt: #e8d5a3;
      --muted:   #7a6e62;
      --card:    #ffffff;
      --border:  #e0d8cc;
      --err:     #c0392b;
    }

    body { font-family: 'DM Sans', sans-serif; background: var(--cream); }

    /* ── Floating label inputs ── */
    .field { position: relative; }

    .field input,
    .field textarea {
      width: 100%;
      padding: 18px 16px 6px;
      background: #faf8f4;
      border: 1.5px solid var(--border);
      border-radius: 10px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      color: var(--ink);
      transition: border-color .25s, box-shadow .25s, background .25s;
      outline: none;
      resize: none;
    }

    .field textarea { padding-top: 22px; min-height: 110px; }

    .field label {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      color: var(--muted);
      pointer-events: none;
      transition: all .2s ease;
    }

    .field textarea ~ label { top: 18px; transform: none; }

    .field input:focus,
    .field textarea:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201,168,76,.15);
      background: #fff;
    }

    .field input:focus ~ label,
    .field input:not(:placeholder-shown) ~ label,
    .field textarea:focus ~ label,
    .field textarea:not(:placeholder-shown) ~ label {
      top: 8px;
      transform: none;
      font-size: 11px;
      color: var(--gold);
      letter-spacing: .04em;
      font-weight: 500;
    }

    /* ── Submit button ── */
    .submit-btn {
      width: 100%;
      padding: 15px;
      background: var(--ink);
      color: var(--gold-lt);
      border: none;
      border-radius: 10px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: .06em;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: background .3s, color .3s, transform .15s;
    }
    .submit-btn:hover:not(:disabled) { background: #2c2419; transform: translateY(-1px); }
    .submit-btn:active:not(:disabled) { transform: translateY(0); }
    .submit-btn:disabled { background: #b8b0a4; color: #e8e0d8; cursor: not-allowed; }

    /* ripple */
    .submit-btn .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      background: rgba(201,168,76,.35);
      animation: rippleAnim .5s linear;
      pointer-events: none;
    }
    @keyframes rippleAnim {
      to { transform: scale(4); opacity: 0; }
    }

    /* ── Card ── */
    .card-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
    }

    .card {
      background: var(--card);
      width: 100%;
      max-width: 480px;
      border-radius: 20px;
      box-shadow:
        0 2px 4px rgba(0,0,0,.04),
        0 8px 24px rgba(0,0,0,.08),
        0 24px 64px rgba(0,0,0,.06);
      overflow: hidden;
      animation: slideUp .55s cubic-bezier(.22,.68,0,1.2) both;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ── Header strip ── */
    .card-header {
      background: var(--ink);
      padding: 28px 32px 24px;
      position: relative;
      overflow: hidden;
    }
    .card-header::before {
      content: '';
      position: absolute;
      width: 220px; height: 220px;
      background: radial-gradient(circle, rgba(201,168,76,.18) 0%, transparent 70%);
      top: -60px; right: -60px;
      border-radius: 50%;
    }
    .card-header-tag {
      display: inline-block;
      font-size: 11px;
      letter-spacing: .12em;
      color: var(--gold);
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .card-header h2 {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      color: #fff;
      line-height: 1.2;
    }
    .card-header p {
      font-size: 13.5px;
      color: rgba(255,255,255,.55);
      margin-top: 6px;
    }

    /* ── Body ── */
    .card-body { padding: 28px 32px 32px; display: flex; flex-direction: column; gap: 16px; }

    /* ── Decorative divider ── */
    .divider {
      display: flex; align-items: center; gap: 10px;
      margin: 4px 0;
      color: var(--border);
      font-size: 11px;
      letter-spacing: .08em;
      color: var(--muted);
    }
    .divider::before, .divider::after {
      content: ''; flex: 1; height: 1px; background: var(--border);
    }

    /* ── Loading spinner ── */
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      display: inline-block;
      width: 16px; height: 16px;
      border: 2px solid rgba(232,213,163,.3);
      border-top-color: var(--gold-lt);
      border-radius: 50%;
      animation: spin .7s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }

    /* ── Success overlay ── */
    .success-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      text-align: center;
      animation: fadeIn .5s ease both;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(.94); }
      to   { opacity: 1; transform: scale(1); }
    }

    /* checkmark */
    .check-circle {
      width: 72px; height: 72px;
      background: linear-gradient(135deg, #1a1510, #2c2419);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 20px;
      box-shadow: 0 8px 32px rgba(201,168,76,.25);
      animation: popIn .5s cubic-bezier(.22,.68,0,1.4) .1s both;
    }
    @keyframes popIn {
      from { transform: scale(0); }
      to   { transform: scale(1); }
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
      animation: drawCheck .5s ease .4s forwards;
    }
    @keyframes drawCheck {
      to { stroke-dashoffset: 0; }
    }

    .success-title {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      color: var(--ink);
      margin-bottom: 10px;
      animation: slideUp .4s ease .5s both;
    }
    .success-sub {
      font-size: 14px;
      color: var(--muted);
      line-height: 1.65;
      max-width: 300px;
      animation: slideUp .4s ease .6s both;
    }

    .success-badge {
      display: flex; align-items: center; gap: 8px;
      margin-top: 24px;
      padding: 10px 20px;
      background: #faf5ea;
      border: 1px solid var(--gold-lt);
      border-radius: 100px;
      font-size: 13px;
      color: var(--gold);
      font-weight: 500;
      animation: slideUp .4s ease .75s both;
    }
    .badge-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--gold);
      animation: pulse 1.5s ease infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: .5; transform: scale(.75); }
    }

    .reset-btn {
      margin-top: 20px;
      background: none;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      padding: 10px 24px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: var(--muted);
      cursor: pointer;
      transition: border-color .2s, color .2s;
      animation: slideUp .4s ease .9s both;
    }
    .reset-btn:hover { border-color: var(--gold); color: var(--gold); }

    /* ── Staggered field animation ── */
    .field { animation: slideUp .4s ease both; }
    .field:nth-child(1) { animation-delay: .08s; }
    .field:nth-child(2) { animation-delay: .14s; }
    .field:nth-child(3) { animation-delay: .20s; }
    .field:nth-child(4) { animation-delay: .26s; }
    .submit-row { animation: slideUp .4s ease .32s both; }
  `}</style>
);

const EnquiryForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const btnRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  /* ripple effect on button click */
  const addRipple = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 600);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (loading) return;
    addRipple(e);
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
      <div className="card-wrap">
        <div className="card">

          {/* ── Header ── */}
          <div className="card-header">
            <span className="card-header-tag">Get in touch</span>
            <h2>Send us an Enquiry</h2>
            <p>We typically respond within 24 hours.</p>
          </div>

          {/* ── Form / Success toggle ── */}
          {submitted ? (

            /* ── Success State ── */
            <div className="success-wrap">
              <div className="check-circle">
                <svg className="check-svg" viewBox="0 0 34 34">
                  <polyline className="check-path" points="6,18 14,26 28,10" />
                </svg>
              </div>

              <h3 className="success-title">Enquiry Received!</h3>
              <p className="success-sub">
                Thank you for reaching out. Our team will get back to you shortly regarding your enquiry.
              </p>

              <div className="success-badge">
                <span className="badge-dot" />
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
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label>Full Name</label>
              </div>

              <div className="field">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label>Email Address</label>
              </div>

              <div className="field">
                <input
                  type="tel"
                  name="phone"
                  placeholder=" "
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <label>Phone Number</label>
              </div>

              <div className="divider">optional</div>

              <div className="field">
                <textarea
                  name="message"
                  placeholder=" "
                  value={form.message}
                  onChange={handleChange}
                />
                <label>Your Message</label>
              </div>

              <div className="submit-row">
                <button
                  ref={btnRef}
                  type="submit"
                  disabled={loading}
                  className="submit-btn"
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Sending…
                    </>
                  ) : (
                    "Submit Enquiry →"
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EnquiryForm;