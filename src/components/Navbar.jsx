import React, { useState, useEffect, useRef } from "react";
import { Search, MessageCircle, AlignJustify, X, ChevronDown, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const residentialProjects = [
  { label: "New City Palace", location: "Alibaug", slug: "ulwe" },
  { label: "Unique Apartment", location: "Mumbai", slug: "pushpaknagar" },
  { label: "Unique Palacio", location: "Pune", slug: "camelot" },
  { label: "Gajanan Enclave", location: "Bangalore", slug: "elanza" },
  { label: "Lodha Villa Cerro", location: "Khopoli", slug: "villa-cerro" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaSearch, setMegaSearch] = useState("");
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

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
          --lodha-dark: #1a1410;
          --lodha-brown: #8B6E52;
          --lodha-gold: #C8A97A;
          --lodha-cream: #F5EFE6;
          --lodha-mid: rgba(30, 22, 14, 0.85);
          --lodha-glass: rgba(20, 14, 8, 0.6);
        }

        .lodha-nav {
          font-family: 'Montserrat', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease;
        }

        .lodha-nav.scrolled {
          background: var(--lodha-mid);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          box-shadow: 0 2px 40px rgba(0,0,0,0.35);
        }

        .lodha-nav:not(.scrolled) {
          background: linear-gradient(180deg, rgba(10,6,3,0.75) 0%, rgba(10,6,3,0.1) 100%);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

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

        .nav-divider {
          width: 1px;
          height: 32px;
          background: rgba(200,169,122,0.25);
          margin: 0 4px;
        }

        .lodha-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #fff;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .lodha-logo:hover { color: var(--lodha-gold); }

        .nav-center {
          display: flex;
          align-items: center;
          gap: 0;
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

        .nav-chevron {
          transition: transform 0.25s ease;
          opacity: 0.7;
        }
        .nav-chevron.open { transform: rotate(180deg); opacity: 1; }

        /* ── MEGA DROPDOWN ── */
        .mega-dropdown {
          position: absolute;
          top: 100%;
          left: 0; right: 0;
          background: rgba(14, 9, 4, 0.97);
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

        .mega-view-all {
          display: inline-block;
          margin-top: 16px;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--lodha-gold);
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.2s;
          border-bottom: 1px solid rgba(200,169,122,0.3);
          padding-bottom: 2px;
        }
        .mega-view-all:hover { opacity: 1; }

        /* Search inside mega */
        .mega-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,169,122,0.18);
          border-radius: 2px;
          padding: 10px 14px;
          margin-bottom: 24px;
        }
        .mega-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.08em;
        }
        .mega-search-input::placeholder { color: rgba(255,255,255,0.25); }

        /* Palava section */
        .mega-palava-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.9);
          margin-bottom: 12px;
        }

        .mega-palava-link {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.2s;
        }
        .mega-palava-link:hover { color: var(--lodha-gold); }

        /* Projects btn wrap */
        .projects-btn-wrap {
          position: static;
        }

        /* Right Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 14px;
          border-radius: 2px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .action-btn:hover {
          color: var(--lodha-gold);
          background: rgba(200,169,122,0.06);
        }

        .search-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          border-radius: 50%;
          transition: color 0.2s, background 0.2s;
        }
        .search-toggle:hover {
          color: var(--lodha-gold);
          background: rgba(200,169,122,0.1);
        }

        /* Search Bar */
        .search-bar {
          position: absolute;
          top: 100%;
          left: 0; right: 0;
          background: rgba(15, 10, 5, 0.97);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(200,169,122,0.2);
          border-bottom: 1px solid rgba(200,169,122,0.2);
          padding: 20px 48px;
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.25s, transform 0.25s;
          pointer-events: none;
        }
        .search-bar.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .search-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--lodha-gold);
        }

        /* Hamburger */
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
        .hamburger:hover {
          border-color: var(--lodha-gold);
          color: var(--lodha-gold);
        }

        /* Mobile overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(8, 5, 2, 0.98);
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
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.22em;
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
        .mobile-close:hover {
          border-color: var(--lodha-gold);
          color: var(--lodha-gold);
        }

        .mobile-nav {
          padding: 32px 28px;
          flex: 1;
        }

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

        .mobile-actions {
          padding: 24px 28px 48px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid rgba(200,169,122,0.12);
        }

        .mobile-action-row {
          display: flex;
          gap: 12px;
        }

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
        .mobile-action-btn.outline {
          background: none;
          border: 1px solid rgba(200,169,122,0.3);
          color: rgba(255,255,255,0.8);
        }
        .mobile-action-btn.outline:hover {
          border-color: var(--lodha-gold);
          color: var(--lodha-gold);
        }
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

        /* Responsive */
        @media (max-width: 1100px) {
          .nav-inner { padding: 0 32px; }
          .nav-link { padding: 8px 16px; }
          .action-btn { padding: 7px 10px; }
          .search-bar { padding: 18px 32px; }
          .mega-inner { padding: 32px 48px 40px; gap: 0; }
        }

        @media (max-width: 900px) {
          .nav-center, .nav-actions { display: none; }
          .hamburger { display: flex; }
          .mega-dropdown { display: none; }
        }

        @media (max-width: 520px) {
          .nav-inner { padding: 0 20px; }
          .lodha-logo { font-size: 22px; }
        }
      `}</style>

      <header className={`lodha-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo */}
          <a href="/" className="lodha-logo flex items-center">
            <img
              src="/images/logo/logo-light.png"
              alt="Unique Logo"
              className="h-8 md:h-20 object-contain"
            />
          </a>

          {/* Center Nav */}
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
                <ChevronDown
                  size={13}
                  className={`nav-chevron${projectsOpen ? " open" : ""}`}
                />
              </button>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            <div className="nav-divider" />
            <button className="action-btn" onClick={() => alert("Enquire clicked")}>
              <Phone size={13} /> Enquire
            </button>
            <div className="nav-divider" />
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <AlignJustify size={20} />
          </button>
        </div>

        {/* ── MEGA DROPDOWN (full-width) ── */}
        <div className={`mega-dropdown${projectsOpen ? " show" : ""}`}>
          <div className="mega-inner">

            {/* Col 2 – Residential */}
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
              {/* <Link to="/projects/residential" className="mega-view-all" onClick={() => setProjectsOpen(false)}>
                View all
              </Link> */}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`search-bar${searchOpen ? " open" : ""}`}>
          <span className="search-label">Search</span>
          <div className="nav-divider" />
          <input
            ref={searchRef}
            className="search-input"
            type="text"
            placeholder="Type a project, location or keyword…"
          />
          <Search size={16} style={{ color: "rgba(200,169,122,0.5)", flexShrink: 0 }} />
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay${isOpen ? " open" : ""}`} aria-modal="true" role="dialog">
        <div className="mobile-header">
          <span className="mobile-logo">LODHA</span>
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
              <button key={p.slug} className="mobile-project-item" onClick={() => setIsOpen(false)}>
                <span>{p.label}</span>
                <span style={{ fontSize: "9px", color: "rgba(200,169,122,0.45)", letterSpacing: "0.1em" }}>{p.location}</span>
              </button>
            ))}

          </div>
        </nav>

        <div className="mobile-actions">
          <div className="mobile-search-wrap">
            <Search size={15} style={{ color: "rgba(200,169,122,0.5)", flexShrink: 0 }} />
            <input className="mobile-search-input" type="text" placeholder="Search projects, locations…" />
          </div>
          <div className="mobile-action-row">
            <button className="mobile-action-btn outline">
              <MessageCircle size={14} /> Chat
            </button>
            <button className="mobile-action-btn solid">
              <Phone size={14} /> Enquire
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;