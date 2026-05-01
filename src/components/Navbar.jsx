import React, { useState, useEffect, useRef } from "react";
import { Search, MessageCircle, AlignJustify, X, ChevronDown, Phone } from "lucide-react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   CONFIG — update these values as needed
───────────────────────────────────────────── */
const WHATSAPP_NUMBER = "919076326232"; // Format: country code + number, no + or spaces
const WHATSAPP_MESSAGE = "Hello! I'm interested in your properties. Please share more details.";

const residentialProjects = [
  { label: "New City Palace", location: "Pushpak Nagar, Navi Mumbai", slug: "project-1" },
  { label: "Gajanan Enclave", location: "Pushpak Nagar, Navi Mumbai", slug: "project-2" },
  { label: "Unique Palacio", location: "Pushpak Nagar, Navi Mumbai", slug: "project-3" },
  { label: "Unique Apartment", location: "Ulwe, Navi Mumbai", slug: "project-4" },
  { label: "Ravi Apartment", location: "Karanjade, Pushpak Node", slug: "project-5" },
  { label: "Happy Apartment", location: "Khalapur, Rees", slug: "project-6" },
  { label: "Unique Aura", location: "Pushpak Nagar", slug: "project-7" },
];

/* Open WhatsApp in new tab */
function openWhatsApp() {
  const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --lodha-dark:  #1a1410;
          --lodha-brown: #8B6E52;
          --lodha-gold:  #C8A97A;
          --lodha-cream: #F5EFE6;
          --lodha-mid:   rgba(30,22,14,0.85);
          --wa-green:    #25D366;
          --wa-green-dk: #1da851;
        }

        /* ── BASE ── */
        .lodha-nav {
          font-family: 'Montserrat', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .lodha-nav.scrolled {
          background: var(--lodha-mid);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          box-shadow: 0 2px 40px rgba(0,0,0,0.35);
        }
        .lodha-nav:not(.scrolled) {
          background: linear-gradient(180deg,rgba(10,6,3,0.75) 0%,rgba(10,6,3,0.1) 100%);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* ── INNER ── */
        .nav-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 102px;
          transition: height 0.3s ease;
        }
        .scrolled .nav-inner { height: 64px; }

        /* ── LOGO ── */
        .lodha-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #fff;
          text-decoration: none;
          white-space: nowrap;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .lodha-logo:hover { color: var(--lodha-gold); }

        /* ── CENTER NAV ── */
        .nav-center {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .nav-divider {
          width: 1px;
          height: 32px;
          background: rgba(200,169,122,0.25);
          margin: 0 4px;
          flex-shrink: 0;
        }
        .nav-link {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 8px 22px;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 22px; right: 22px;
          height: 1px;
          background: var(--lodha-gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after,
        .nav-link.active::after { transform: scaleX(1); }
        .nav-link.active { color: var(--lodha-gold); }

        .nav-chevron { transition: transform 0.25s ease; opacity: 0.7; }
        .nav-chevron.open { transform: rotate(180deg); opacity: 1; }

        /* ── RIGHT ACTIONS ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        /* WhatsApp button */
        .wa-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 14px;
          border-radius: 2px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .wa-btn:hover {
          color: var(--wa-green);
          background: rgba(37,211,102,0.08);
        }
        .wa-btn:hover .wa-icon-wrap { background: var(--wa-green); }
        .wa-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--wa-green-dk);
          transition: background 0.2s;
          flex-shrink: 0;
        }

        /* WhatsApp SVG icon */
        .wa-svg { width: 13px; height: 13px; fill: #fff; display: block; }

        /* Enquire button */
        .enquire-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 14px;
          border-radius: 2px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .enquire-btn:hover {
          color: var(--lodha-gold);
          background: rgba(200,169,122,0.08);
        }

        /* ── MEGA DROPDOWN ── */
        .mega-dropdown {
          position: absolute;
          top: 100%;
          left: 0; right: 0;
          background: rgba(14,9,4,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(200,169,122,0.18);
          border-bottom: 1px solid rgba(200,169,122,0.1);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
          z-index: 999;
        }
        .mega-dropdown.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .mega-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 40px 80px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 0;
        }
        .mega-col {
          padding-right: 40px;
          border-right: 1px solid rgba(200,169,122,0.1);
          padding-left: 20px;
        }
        .mega-col:first-child { padding-left: 0; }
        .mega-col:last-child { border-right: none; }
        .mega-col-title {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(200,169,122,0.12);
        }
        .mega-item {
          display: block;
          padding: 9px 0;
          border-bottom: 1px solid rgba(200,169,122,0.05);
          text-decoration: none;
          transition: padding-left 0.2s ease;
        }
        .mega-item:last-of-type { border-bottom: none; }
        .mega-item:hover { padding-left: 6px; }
        .mega-item-label {
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.82);
          display: block;
          transition: color 0.2s;
        }
        .mega-item:hover .mega-item-label { color: var(--lodha-gold); }
        .mega-item-loc {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: rgba(200,169,122,0.45);
          display: block;
          margin-top: 1px;
        }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          background: none;
          border: 1px solid rgba(200,169,122,0.25);
          color: rgba(255,255,255,0.9);
          cursor: pointer;
          border-radius: 2px;
          transition: border-color 0.2s, color 0.2s;
        }
        .hamburger:hover { border-color: var(--lodha-gold); color: var(--lodha-gold); }

        /* ── MOBILE OVERLAY ── */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 1001;
          background: rgba(8,5,2,0.98);
          backdrop-filter: blur(24px);
          flex-direction: column;
          overflow-y: auto;
        }
        .mobile-overlay.open { display: flex; }

        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(200,169,122,0.12);
        }
        .mobile-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #fff;
        }
        .mobile-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          background: none;
          border: 1px solid rgba(200,169,122,0.25);
          color: rgba(255,255,255,0.9);
          cursor: pointer;
          border-radius: 2px;
          transition: border-color 0.2s, color 0.2s;
        }
        .mobile-close:hover { border-color: var(--lodha-gold); color: var(--lodha-gold); }

        .mobile-nav { padding: 32px 28px; flex: 1; }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 18px 0;
          border-bottom: 1px solid rgba(200,169,122,0.08);
          transition: color 0.2s;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          width: 100%;
          cursor: pointer;
          text-align: left;
        }
        .mobile-nav-link:first-child { border-top: 1px solid rgba(200,169,122,0.08); }
        .mobile-nav-link:hover { color: var(--lodha-gold); }

        .mobile-projects-list {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease;
        }
        .mobile-projects-list.open { max-height: 1200px; }

        .mobile-projects-section-title {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(200,169,122,0.5);
          padding: 16px 16px 8px;
        }
        .mobile-project-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          border-bottom: 1px solid rgba(200,169,122,0.05);
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          width: 100%;
          text-align: left;
        }
        .mobile-project-item:hover { color: var(--lodha-gold); }

        /* Mobile actions */
        .mobile-actions {
          padding: 24px 28px 48px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid rgba(200,169,122,0.12);
        }
        .mobile-action-row { display: flex; gap: 12px; }
        .mobile-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
        }
        .mobile-action-btn.wa {
          background: var(--wa-green-dk);
          border: 1px solid var(--wa-green);
          color: #fff;
          font-weight: 600;
        }
        .mobile-action-btn.wa:hover { background: var(--wa-green); }
        .mobile-action-btn.solid {
          background: var(--lodha-gold);
          border: 1px solid var(--lodha-gold);
          color: var(--lodha-dark);
          font-weight: 600;
        }
        .mobile-action-btn.solid:hover { background: #d4b98a; }
        .mobile-search-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 1px solid rgba(200,169,122,0.2);
          border-radius: 2px;
        }
        .mobile-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
        }
        .mobile-search-input::placeholder { color: rgba(255,255,255,0.3); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .nav-inner    { padding: 0 32px; }
          .nav-link     { padding: 8px 14px; }
          .wa-btn,
          .enquire-btn  { padding: 7px 10px; }
          .mega-inner   { padding: 32px 48px 40px; }
        }
        @media (max-width: 900px) {
          .nav-center, .nav-actions { display: none; }
          .hamburger { display: flex; }
          .mega-dropdown { display: none; }
        }
        @media (max-width: 520px) {
          .nav-inner   { padding: 0 20px; }
          .lodha-logo  { font-size: 22px; }
        }
      `}</style>

      <header className={`lodha-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* ── Logo ── */}
          <a href="/" className="lodha-logo">
            <img
              src="/images/logo/logo-light.png"
              alt="Unique Builders Logo"
              style={{ height: scrolled ? 36 : 56, objectFit: "contain", transition: "height 0.3s ease" }}
            />
          </a>

          {/* ── Center Nav ── */}
          <nav className="nav-center">
            <Link to="/our-story" className="nav-link">Our Story</Link>
            <div className="nav-divider" />
            <Link to="/our-impact" className="nav-link">Our Impact</Link>
            <div className="nav-divider" />

            <div className="projects-btn-wrap" ref={dropdownRef}>
              <button
                className={`nav-link${projectsOpen ? " active" : ""}`}
                onClick={() => setProjectsOpen(!projectsOpen)}
                aria-expanded={projectsOpen}
              >
                Our Projects
                <ChevronDown size={13} className={`nav-chevron${projectsOpen ? " open" : ""}`} />
              </button>
            </div>
          </nav>

          {/* ── Right Actions ── */}
          <div className="nav-actions">

            {/* WhatsApp — left of divider */}
            <button className="wa-btn" onClick={openWhatsApp} aria-label="Chat on WhatsApp">
              <span className="wa-icon-wrap">
                {/* Official WhatsApp logo path */}
                <svg className="wa-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.522.664 4.888 1.822 6.938L2 30l7.29-1.793A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 01-5.82-1.594l-.418-.248-4.33 1.065 1.096-4.218-.272-.433A11.5 11.5 0 1116 27.5zm6.32-8.63c-.347-.174-2.05-1.012-2.368-1.128-.317-.116-.548-.174-.778.174-.23.347-.895 1.128-1.097 1.358-.202.231-.404.26-.75.087-.347-.174-1.466-.54-2.792-1.722-1.032-.92-1.73-2.056-1.933-2.403-.202-.347-.022-.534.152-.707.156-.155.347-.404.52-.606.174-.202.231-.347.347-.578.116-.231.058-.433-.029-.607-.087-.173-.778-1.876-1.066-2.57-.28-.674-.565-.583-.778-.594l-.663-.012c-.231 0-.606.087-.923.433-.317.347-1.21 1.183-1.21 2.885s1.239 3.346 1.412 3.578c.173.231 2.44 3.726 5.91 5.225.826.356 1.47.57 1.972.729.828.264 1.582.226 2.177.137.664-.1 2.05-.838 2.338-1.647.289-.81.289-1.504.202-1.647-.087-.144-.317-.231-.664-.404z" />
                </svg>
              </span>
              WhatsApp
            </button>

            {/* Divider | */}
            <div className="nav-divider" />

            {/* Enquire */}
            <Link to="/enquiry">
              <button className="enquire-btn">
                <Phone size={14} />
                Enquire
              </button>
            </Link>

          </div>

          {/* ── Hamburger (mobile) ── */}
          <button className="hamburger" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <AlignJustify size={20} />
          </button>
        </div>

        {/* ── MEGA DROPDOWN ── */}
        <div className={`mega-dropdown${projectsOpen ? " show" : ""}`}>
          <div className="mega-inner">
            <div className="mega-col">
              <div className="mega-col-title">Residential</div>
              {residentialProjects.map((p) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="mega-item"
                  onClick={() => setProjectsOpen(false)}
                >
                  <span className="mega-item-label">{p.label}</span>
                  <span className="mega-item-loc">{p.location}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE OVERLAY ── */}
      <div className={`mobile-overlay${isOpen ? " open" : ""}`} aria-modal="true" role="dialog">
        <div className="mobile-header">
          <span className="mobile-logo">UNIQUE BUILDERS</span>
          <button className="mobile-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav">
          <Link to="/our-story" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Our Story</Link>
          <Link to="/our-impact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Our Impact</Link>

          <button
            className="mobile-nav-link"
            onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
            aria-expanded={mobileProjectsOpen}
          >
            Our Projects
            <ChevronDown
              size={20}
              style={{
                transition: "transform 0.25s",
                transform: mobileProjectsOpen ? "rotate(180deg)" : "rotate(0deg)",
                color: mobileProjectsOpen ? "var(--lodha-gold)" : undefined,
              }}
            />
          </button>

          <div className={`mobile-projects-list${mobileProjectsOpen ? " open" : ""}`}>
            <div className="mobile-projects-section-title">Residential</div>
            {residentialProjects.map((p) => (
              <button
                key={p.slug}
                className="mobile-project-item"
                onClick={() => setIsOpen(false)}
              >
                <span>{p.label}</span>
                <span style={{ fontSize: "9px", color: "rgba(200,169,122,0.45)", letterSpacing: "0.1em" }}>
                  {p.location}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <div className="mobile-actions">
          <div className="mobile-search-wrap">
            <Search size={15} style={{ color: "rgba(200,169,122,0.5)", flexShrink: 0 }} />
            <input
              className="mobile-search-input"
              type="text"
              placeholder="Search projects, locations…"
            />
          </div>
          <div className="mobile-action-row">
            {/* WhatsApp on mobile */}
            <button className="mobile-action-btn wa" onClick={openWhatsApp}>
              <svg style={{ width: 15, height: 15, fill: "#fff", flexShrink: 0 }} viewBox="0 0 32 32">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.522.664 4.888 1.822 6.938L2 30l7.29-1.793A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 01-5.82-1.594l-.418-.248-4.33 1.065 1.096-4.218-.272-.433A11.5 11.5 0 1116 27.5zm6.32-8.63c-.347-.174-2.05-1.012-2.368-1.128-.317-.116-.548-.174-.778.174-.23.347-.895 1.128-1.097 1.358-.202.231-.404.26-.75.087-.347-.174-1.466-.54-2.792-1.722-1.032-.92-1.73-2.056-1.933-2.403-.202-.347-.022-.534.152-.707.156-.155.347-.404.52-.606.174-.202.231-.347.347-.578.116-.231.058-.433-.029-.607-.087-.173-.778-1.876-1.066-2.57-.28-.674-.565-.583-.778-.594l-.663-.012c-.231 0-.606.087-.923.433-.317.347-1.21 1.183-1.21 2.885s1.239 3.346 1.412 3.578c.173.231 2.44 3.726 5.91 5.225.826.356 1.47.57 1.972.729.828.264 1.582.226 2.177.137.664-.1 2.05-.838 2.338-1.647.289-.81.289-1.504.202-1.647-.087-.144-.317-.231-.664-.404z" />
              </svg>
              WhatsApp
            </button>

            {/* Enquire on mobile */}
            <button className="mobile-action-btn solid" onClick={() => alert("Enquire clicked")}>
              <Phone size={14} />
              Enquire
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;