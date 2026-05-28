import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { useState, useEffect, useRef } from "react";


const ProjectDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.slug === slug);

    const [activeImage, setActiveImage] = useState(0);
    const [lightbox, setLightbox] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [mapLoaded, setMapLoaded] = useState(false);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 80);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!project) return;
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % project.images.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [project]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
                    }
                });
            },
            { threshold: 0.06 }
        );
        sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
        return () => observer.disconnect();
    }, []);

    const addRef = (el, index) => { sectionRefs.current[index] = el; };

    if (!project) {
        return (
            <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-9xl font-extralight text-[#b8924a]/20 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>404</p>
                    <p className="text-[#aaa] tracking-[0.4em] text-[10px] uppercase mb-8">Project not found</p>
                    <button onClick={() => navigate(-1)} className="px-10 py-3.5 border border-[#b8924a]/40 text-[#b8924a] text-[10px] tracking-[0.3em] uppercase hover:bg-[#b8924a] hover:text-white transition-all duration-500">
                        Return
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white text-[#1a1a1a] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@200;300;400;500&display=swap');

        .cormorant { font-family: 'Cormorant Garamond', serif; }

        /* ── Animations ── */
        @keyframes slideUp   { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(184,146,74,.4)} 70%{box-shadow:0 0 0 18px rgba(184,146,74,0)} 100%{box-shadow:0 0 0 0 rgba(184,146,74,0)} }
        @keyframes floatAnim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes mapReveal { from{opacity:0;transform:scale(0.97) translateY(24px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes borderPulse { 0%,100%{border-color:rgba(184,146,74,.18)} 50%{border-color:rgba(184,146,74,.55)} }
        @keyframes pinBounce { 0%,100%{transform:translateY(0) scale(1)} 40%{transform:translateY(-8px) scale(1.15)} 60%{transform:translateY(-4px) scale(1.08)} }
        @keyframes scanLine  { 0%{top:0%} 100%{top:100%} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

        .reveal   { opacity:0 }
        .reveal.visible   { animation:slideUp  .9s cubic-bezier(.16,1,.3,1) forwards }
        .reveal-l { opacity:0 }
        .reveal-l.visible { animation:slideLeft .9s cubic-bezier(.16,1,.3,1) forwards }
        .reveal-f { opacity:0 }
        .reveal-f.visible { animation:fadeIn 1.1s ease forwards }

        .d1{animation-delay:.04s} .d2{animation-delay:.12s} .d3{animation-delay:.20s}
        .d4{animation-delay:.28s} .d5{animation-delay:.36s} .d6{animation-delay:.44s}
        .d7{animation-delay:.52s} .d8{animation-delay:.60s}

        /* ── Media cards ── */
        .img-card { overflow:hidden; cursor:pointer; position:relative; }
        .img-card img  { transition:transform .9s cubic-bezier(.16,1,.3,1); display:block; width:100%; height:100%; object-fit:cover; }
        .img-card:hover img  { transform:scale(1.06); }

        .vid-card { overflow:hidden; cursor:pointer; position:relative; }
        .vid-card video { transition:transform .9s cubic-bezier(.16,1,.3,1); display:block; width:100%; height:100%; object-fit:cover; }
        .vid-card:hover video { transform:scale(1.05); }

        /* ── Portrait grid — IMAGES ── */
        .portrait-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 10px;
        }
        @media(min-width:640px)  { .portrait-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; } }
        @media(min-width:1024px) { .portrait-grid { grid-template-columns: repeat(4, 1fr); gap: 14px; } }
        @media(min-width:1280px) { .portrait-grid { grid-template-columns: repeat(5, 1fr); gap: 14px; } }

        .portrait-card { aspect-ratio: 3/4; }

        .portrait-featured { aspect-ratio: 3/4; grid-column: span 1; }
        @media(min-width:640px) {
          .portrait-featured { grid-column: span 2; grid-row: span 2; aspect-ratio: auto; }
        }

        /* ── Portrait grid — VIDEOS ── */
        .vid-portrait-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        @media(min-width:640px)  { .vid-portrait-grid { gap: 12px; } }
        @media(min-width:1024px) { .vid-portrait-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; } }

        .vid-portrait-card { aspect-ratio: 9/16; }

        /* ── Play button ── */
        .play-btn { animation: pulseRing 2.8s ease-out infinite; }

        /* ── Overlay ── */
        .media-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top, rgba(0,0,0,.60) 0%, rgba(0,0,0,0) 55%);
          transition:opacity .4s;
        }
        .img-card:hover .media-overlay,
        .vid-card:hover .media-overlay { opacity:1; }

        .overlay-expand {
          position:absolute; inset:0;
          display:flex; align-items:center; justify-content:center;
          opacity:0; transition:opacity .35s;
        }
        .img-card:hover .overlay-expand,
        .vid-card:hover .overlay-expand { opacity:1; }

        .expand-icon {
          width:42px; height:42px;
          border:1px solid rgba(255,255,255,.6);
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          backdrop-filter:blur(6px);
          background:rgba(184,146,74,.22);
          transition:transform .3s, background .3s;
        }
        .img-card:hover .expand-icon,
        .vid-card:hover .expand-icon { transform:scale(1.12); background:rgba(184,146,74,.42); }

        /* ── Corner marks ── */
        .corner-tl { position:absolute; top:10px; left:10px; width:16px; height:16px; border-top:1.5px solid rgba(255,255,255,.45); border-left:1.5px solid rgba(255,255,255,.45); pointer-events:none; z-index:2; }
        .corner-br { position:absolute; bottom:10px; right:10px; width:16px; height:16px; border-bottom:1.5px solid rgba(255,255,255,.45); border-right:1.5px solid rgba(255,255,255,.45); pointer-events:none; z-index:2; }

        /* ── Tag pill (gold outline — on light bg) ── */
        .tag-pill {
          display:inline-flex; align-items:center; gap:6px;
          padding:5px 13px; border:1px solid rgba(184,146,74,.3);
          font-size:9px; letter-spacing:.28em; text-transform:uppercase;
          color:rgba(184,146,74,.9); background:rgba(184,146,74,.06);
          backdrop-filter:blur(6px);
        }

        /* ── Tag pill (white — on image/video) ── */
        .tag-pill-light {
          display:inline-flex; align-items:center; gap:6px;
          padding:5px 13px; border:1px solid rgba(255,255,255,.3);
          font-size:9px; letter-spacing:.28em; text-transform:uppercase;
          color:rgba(255,255,255,.8); background:rgba(255,255,255,.12);
          backdrop-filter:blur(6px);
        }

        /* ── Divider ── */
        .divider {
          height:1px;
          background:linear-gradient(to right, transparent, rgba(184,146,74,.15) 30%, rgba(184,146,74,.15) 70%, transparent);
        }

        /* ── Number label ── */
        .num-label {
          position:absolute; bottom:10px; left:12px;
          font-size:9px; letter-spacing:.3em; text-transform:uppercase;
          color:rgba(255,255,255,.45); z-index:3; pointer-events:none;
        }

        /* ── Section label ── */
        .section-label {
          font-size:9px; letter-spacing:.42em; text-transform:uppercase; color:#b8924a;
        }

        /* ── Gold shimmer ── */
        .gold-shimmer {
          background:linear-gradient(90deg,#b8924a 0%,#d4aa6a 40%,#b8924a 60%,#9a7535 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 6s linear infinite;
        }

        /* ── Lightbox — frosted white ── */
        .lightbox-backdrop {
          position:fixed; inset:0; z-index:100;
          background:rgba(250,249,246,.96); backdrop-filter:blur(18px);
          display:flex; align-items:center; justify-content:center;
          animation:fadeIn .2s ease;
        }

        /* ── Scroll float ── */
        .scroll-float { animation:floatAnim 3s ease-in-out infinite; }

        /* ── Thumb strip ── */
        .scrollbar-hide::-webkit-scrollbar { display:none }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none }

        /* ── Hero: portrait image panel on right ── */
        .hero-portrait-slide {
          position:absolute; top:0; right:0; bottom:0;
          width:58%;
          overflow:hidden;
        }
        @media(max-width:768px){
          .hero-portrait-slide { width:100%; }
        }
        .hero-portrait-slide img {
          width:100%; height:100%; object-fit:cover;
          transition:opacity 1.2s ease;
        }

        /* ── Meta card ── */
        .meta-card {
          border:1px solid #ede9e2;
          background:#faf9f6;
          padding:1.25rem;
          transition:border-color .3s, box-shadow .3s;
        }
        .meta-card:hover {
          border-color:rgba(184,146,74,.35);
          box-shadow:0 4px 24px rgba(184,146,74,.07);
        }

        /* ══════════════════════════════
           MAP SECTION STYLES
        ══════════════════════════════ */

        /* Map wrapper reveal */
        .map-wrapper.visible {
          animation: mapReveal 1s cubic-bezier(.16,1,.3,1) forwards;
        }
        .map-wrapper { opacity:0; }

        /* Map container border pulse */
        .map-border-frame {
          border: 1px solid rgba(184,146,74,.18);
          animation: borderPulse 4s ease-in-out infinite;
          position: relative;
        }

        /* Scan line effect over map */
        .map-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(184,146,74,.35), transparent);
          pointer-events: none;
          z-index: 5;
          animation: scanLine 4s linear infinite;
        }

        /* Corner crosshair marks on map */
        .map-corner {
          position: absolute;
          width: 22px; height: 22px;
          z-index: 6; pointer-events: none;
        }
        .map-corner-tl { top: 12px; left: 12px; border-top: 2px solid rgba(184,146,74,.7); border-left: 2px solid rgba(184,146,74,.7); }
        .map-corner-tr { top: 12px; right: 12px; border-top: 2px solid rgba(184,146,74,.7); border-right: 2px solid rgba(184,146,74,.7); }
        .map-corner-bl { bottom: 12px; left: 12px; border-bottom: 2px solid rgba(184,146,74,.7); border-left: 2px solid rgba(184,146,74,.7); }
        .map-corner-br { bottom: 12px; right: 12px; border-bottom: 2px solid rgba(184,146,74,.7); border-right: 2px solid rgba(184,146,74,.7); }

        /* Glow pin icon */
        .map-pin-glow {
          animation: pinBounce 3s ease-in-out infinite, glowPulse 2s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(184,146,74,0.8));
        }

        /* Map info card */
        .map-info-card {
          background: #faf9f6;
          border: 1px solid rgba(184,146,74,.18);
          transition: border-color .35s, box-shadow .35s, transform .35s;
        }
        .map-info-card:hover {
          border-color: rgba(184,146,74,.5);
          box-shadow: 0 8px 32px rgba(184,146,74,.1);
          transform: translateY(-2px);
        }

        /* Stat item */
        .map-stat {
          position: relative;
          padding-left: 14px;
        }
        .map-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 28px;
          background: linear-gradient(to bottom, #b8924a, rgba(184,146,74,0.2));
        }

        /* Open maps button */
        .open-map-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          border: 1px solid rgba(184,146,74,.35);
          color: #b8924a;
          font-size: 9px; letter-spacing: .32em; text-transform: uppercase;
          background: rgba(184,146,74,.04);
          transition: all .4s;
          cursor: pointer;
          text-decoration: none;
        }
        .open-map-btn:hover {
          background: #b8924a;
          color: white;
          border-color: #b8924a;
          box-shadow: 0 6px 24px rgba(184,146,74,.3);
        }
        .open-map-btn svg { transition: transform .3s; }
        .open-map-btn:hover svg { transform: translate(2px,-2px); }

        /* Iframe loading shimmer */
        .iframe-shimmer {
          background: linear-gradient(90deg, #f0ece6 25%, #e8e4de 50%, #f0ece6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }

        /* Coordinates badge */
        .coord-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px;
          background: rgba(184,146,74,.08);
          border: 1px solid rgba(184,146,74,.2);
          font-size: 8px; letter-spacing: .2em;
          color: rgba(184,146,74,.7);
          font-variant-numeric: tabular-nums;
        }

        /* Responsive map layout */
        .map-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media(min-width:768px) {
          .map-layout {
            grid-template-columns: 1fr 320px;
            gap: 24px;
            align-items: stretch;
          }
        }
        @media(min-width:1024px) {
          .map-layout {
            grid-template-columns: 1fr 360px;
            gap: 28px;
          }
        }

        .map-iframe-wrap {
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        @media(min-width:640px) { .map-iframe-wrap { height: 380px; } }
        @media(min-width:768px) { .map-iframe-wrap { height: 100%; min-height: 420px; } }
      `}</style>

            {/* ════════ HERO ════════ */}
            <section className="relative h-screen min-h-150 overflow-hidden bg-[#f5f2ed]">

                {/* Portrait image — right side */}
                <div className="hero-portrait-slide">
                    {project.images.map((img, i) => (
                        <img key={img} src={img} alt=""
                            className="absolute inset-0"
                            style={{ opacity: i === activeImage ? 1 : 0 }}
                        />
                    ))}
                    <div className="absolute inset-0" style={{
                        background: "linear-gradient(to right, #f5f2ed 0%, rgba(245,242,237,0.3) 38%, rgba(245,242,237,0) 100%)"
                    }} />
                    <div className="absolute inset-0" style={{
                        background: "linear-gradient(to top, #f5f2ed 0%, rgba(245,242,237,0) 35%)"
                    }} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 sm:px-10 md:px-16 py-8 md:py-12">

                    {/* Top bar */}
                    <div className={`flex items-center justify-between transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <button onClick={() => navigate(-1)}
                            className="flex items-center gap-3 text-[#1a1a1a]/40 hover:text-[#b8924a] transition-all duration-300 group text-[10px] tracking-[0.3em] uppercase"
                        >
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back
                        </button>
                        <div className="tag-pill">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b8924a]" />
                            {project.location}
                        </div>
                    </div>

                    {/* Bottom hero text */}
                    <div className="max-w-lg">
                        <div className={`transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                            <p className="section-label mb-5">
                                {String(project.images.length).padStart(2, "0")} Images &nbsp;&nbsp;·&nbsp;&nbsp; {String(project.videos.length).padStart(2, "0")} Videos
                            </p>
                        </div>

                        <h1 className={`cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1a1a1a] leading-none mb-5 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                            {project.name}
                        </h1>

                        <p className={`text-[#1a1a1a]/40 text-sm font-light leading-relaxed max-w-xs mb-8 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                            {project.description}
                        </p>

                        {/* Dot indicators */}
                        <div className={`flex items-center gap-2.5 transition-all duration-700 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                            {project.images.map((_, i) => (
                                <button key={i} onClick={() => setActiveImage(i)}
                                    className={`transition-all duration-300 rounded-full ${i === activeImage ? "w-8 h-075 bg-[#b8924a]" : "w-0.75 h-0.75 bg-[#1a1a1a]/18 hover:bg-[#b8924a]/45"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className={`scroll-float absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-3 transition-all duration-700 delay-600 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                    <div className="w-px h-12 bg-linear-to-b from-transparent to-[#b8924a]/35" />
                    <span className="text-[#b8924a]/55 text-[8px] tracking-[0.5em] uppercase">Explore</span>
                </div>
            </section>

            <div className="divider" />

            {/* ════════ PROJECT META ════════ */}
            <section ref={(el) => addRef(el, 0)} data-section="intro"
                className="px-6 sm:px-10 md:px-16 py-16 sm:py-20 bg-white"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">

                        <div className={`md:col-span-3 reveal ${visibleSections.has("intro") ? "visible" : ""}`}>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-8 h-px bg-[#b8924a]" />
                                <span className="section-label">The Project</span>
                            </div>
                        </div>

                        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
                            {[
                                { label: "Name", value: project.name },
                                { label: "Location", value: project.location },
                                { label: "Overview", value: project.description },
                            ].map((item, i) => (
                                <div key={item.label}
                                    className={`meta-card reveal d${i + 1} ${visibleSections.has("intro") ? "visible" : ""}`}
                                >
                                    <p className="text-[9px] tracking-[0.38em] uppercase text-[#b8924a]/65 mb-2.5">{item.label}</p>
                                    <p className="cormorant text-xl font-light text-[#1a1a1a] leading-snug">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider" />

            {/* ════════ IMAGES — PORTRAIT GRID ════════ */}
            <section ref={(el) => addRef(el, 1)} data-section="images"
                className="px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 bg-[#f7f5f1]"
            >
                <div className="max-w-350 mx-auto flex flex-col gap-8 sm:gap-10">

                    {/* Heading */}
                    <div className={`flex items-end justify-between px-1 reveal ${visibleSections.has("images") ? "visible" : ""}`}>
                        <div>
                            <p className="section-label mb-2.5">Photography</p>
                            <h2 className="cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a]">Visual Gallery</h2>
                        </div>
                        <span className="cormorant text-5xl sm:text-6xl font-extralight leading-none select-none pr-1" style={{ color: "rgba(26,26,26,0.06)" }}>
                            {String(project.images.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Portrait masonry grid */}
                    <div className="portrait-grid">

                        {/* Featured */}
                        <div
                            className={`img-card portrait-featured reveal d1 ${visibleSections.has("images") ? "visible" : ""}`}
                            style={{ minHeight: 320 }}
                            onClick={() => setLightbox({ type: "image", src: project.images[0] })}
                        >
                            <img src={project.images[0]} alt={project.name} style={{ height: "100%" }} />
                            <div className="media-overlay" />
                            <div className="overlay-expand">
                                <div className="expand-icon">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                    </svg>
                                </div>
                            </div>
                            <div className="corner-tl" /><div className="corner-br" />
                            <span className="num-label">01 / {String(project.images.length).padStart(2, "0")}</span>
                            <div className="tag-pill-light absolute top-3 left-3 z-10" style={{ fontSize: "8px" }}>Featured</div>
                        </div>

                        {/* Rest */}
                        {project.images.slice(1).map((img, i) => (
                            <div
                                key={img}
                                className={`img-card portrait-card reveal d${(i % 6) + 2} ${visibleSections.has("images") ? "visible" : ""}`}
                                onClick={() => setLightbox({ type: "image", src: img })}
                            >
                                <img src={img} alt={`${project.name} ${i + 2}`} />
                                <div className="media-overlay" />
                                <div className="overlay-expand">
                                    <div className="expand-icon">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="num-label">{String(i + 2).padStart(2, "0")}</span>
                            </div>
                        ))}
                    </div>

                    {/* Thumb strip */}
                    <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 pt-2 px-1">
                        {project.images.map((img, i) => (
                            <button key={i}
                                onClick={() => setLightbox({ type: "image", src: img })}
                                className={`relative shrink-0 img-card transition-all duration-300 ${i === 0 ? "ring-1 ring-[#b8924a]" : "opacity-40 hover:opacity-80"}`}
                                style={{ width: 50, height: 70, borderRadius: 2 }}
                            >
                                <img src={img} alt="" />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="divider" />

            {/* ════════ VIDEOS — PORTRAIT GRID ════════ */}
            <section ref={(el) => addRef(el, 2)} data-section="videos"
                className="px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 bg-white"
            >
                <div className="max-w-350 mx-auto flex flex-col gap-8 sm:gap-10">

                    {/* Heading */}
                    <div className={`flex items-end justify-between px-1 reveal ${visibleSections.has("videos") ? "visible" : ""}`}>
                        <div>
                            <p className="section-label mb-2.5">Cinematic</p>
                            <h2 className="cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a]">Video Tour</h2>
                        </div>
                        <span className="cormorant text-5xl sm:text-6xl font-extralight leading-none select-none pr-1" style={{ color: "rgba(26,26,26,0.06)" }}>
                            {String(project.videos.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Portrait video grid */}
                    <div className="vid-portrait-grid">
                        {project.videos.map((video, i) => (
                            <div
                                key={i}
                                className={`vid-card vid-portrait-card reveal d${(i % 5) + 1} ${visibleSections.has("videos") ? "visible" : ""}`}
                                style={{ background: "#e8e4de" }}
                                onClick={() => setLightbox({ type: "video", src: video })}
                            >
                                <video src={video}
                                    muted loop playsInline
                                    style={{ opacity: i === 0 ? 0.92 : 0.78 }}
                                    onMouseEnter={(e) => e.target.play()}
                                    onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                                />
                                <div className="media-overlay" />

                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    {i === 0 ? (
                                        <div className="play-btn w-14 h-14 rounded-full bg-[#b8924a] flex items-center justify-center shadow-2xl">
                                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm bg-white/10">
                                            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {i === 0 && (
                                    <div className="tag-pill-light absolute top-3 left-3 z-10" style={{ fontSize: "8px" }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                        Feature
                                    </div>
                                )}
                                <div className="corner-tl" /><div className="corner-br" />
                                <span className="num-label">
                                    {String(i + 1).padStart(2, "0")} / {String(project.videos.length).padStart(2, "0")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="divider" />

            {/* ════════ LOCATION & MAP ════════ */}
            {project.mapEmbedUrl && (
                <section
                    ref={(el) => addRef(el, 4)}
                    data-section="map"
                    className="px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 md:py-20 bg-[#f7f5f1]"
                >
                    <div className="max-w-350 mx-auto flex flex-col gap-8 sm:gap-10">

                        {/* ── Section heading ── */}
                        <div className={`flex items-end justify-between px-1 reveal ${visibleSections.has("map") ? "visible" : ""}`}>
                            <div>
                                <p className="section-label mb-2.5">Location</p>
                                <h2 className="cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a]">
                                    Find Your Way
                                </h2>
                            </div>
                            {/* Ghost watermark */}
                            <span
                                className="cormorant text-5xl sm:text-6xl font-extralight leading-none select-none pr-1 hidden sm:block"
                                style={{ color: "rgba(26,26,26,0.05)" }}
                            >
                                MAP
                            </span>
                        </div>

                        {/* ── Map + Info two-column layout ── */}
                        <div className={`map-wrapper map-layout ${visibleSections.has("map") ? "visible" : ""}`}
                            style={{ animationDelay: "0.1s" }}
                        >

                            {/* ── Map iframe ── */}
                            <div className="map-border-frame" style={{ overflow: "hidden" }}>

                                {/* Animated corner crosshairs */}
                                <div className="map-corner map-corner-tl" />
                                <div className="map-corner map-corner-tr" />
                                <div className="map-corner map-corner-bl" />
                                <div className="map-corner map-corner-br" />

                                {/* Scan line sweep */}
                                <div className="map-scanline" />

                                {/* Loading shimmer shown until iframe loads */}
                                <div
                                    className="map-iframe-wrap"
                                    style={{ position: "relative" }}
                                >
                                    {!mapLoaded && (
                                        <div
                                            className="iframe-shimmer absolute inset-0 z-10 flex items-center justify-center"
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                {/* Animated pin during load */}
                                                <svg
                                                    className="map-pin-glow w-8 h-8"
                                                    viewBox="0 0 24 24"
                                                    fill="#b8924a"
                                                >
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                </svg>
                                                <span
                                                    className="text-[8px] tracking-[0.4em] uppercase"
                                                    style={{ color: "rgba(184,146,74,0.6)" }}
                                                >
                                                    Loading map…
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <iframe
                                        src={project.mapEmbedUrl}
                                        title={`Map of ${project.location}`}
                                        onLoad={() => setMapLoaded(true)}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            border: "none",
                                            display: "block",
                                            opacity: mapLoaded ? 1 : 0,
                                            transition: "opacity 0.8s ease",
                                            filter: "sepia(12%) contrast(1.04) saturate(0.95)",
                                        }}
                                    />
                                </div>

                                {/* Bottom overlay label */}
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0, left: 0, right: 0,
                                        height: "56px",
                                        background: "linear-gradient(to top, rgba(245,242,237,0.85) 0%, transparent 100%)",
                                        pointerEvents: "none",
                                        zIndex: 4,
                                    }}
                                />
                            </div>

                            {/* ── Info sidebar ── */}
                            <div className="flex flex-col gap-4">

                                {/* Location card */}
                                <div className="map-info-card p-5 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        {/* Animated pin icon */}
                                        <div className="shrink-0 mt-1">
                                            <svg
                                                className="map-pin-glow w-6 h-6"
                                                viewBox="0 0 24 24"
                                                fill="#b8924a"
                                            >
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[9px] tracking-[0.38em] uppercase text-[#b8924a]/65 mb-1.5">
                                                Address
                                            </p>
                                            <p className="cormorant text-2xl font-light text-[#1a1a1a] leading-snug mb-1">
                                                {project.location}
                                            </p>
                                            <p className="text-[11px] text-[#1a1a1a]/35 font-light leading-relaxed">
                                                {project.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div
                                    className="map-info-card p-5 sm:p-6 grid grid-cols-2 gap-x-6 gap-y-5"
                                >
                                    {[
                                        // { label: "Images", value: String(project.images.length).padStart(2, "0") },
                                        // { label: "Videos", value: String(project.videos.length).padStart(2, "0") },
                                        { label: "Status", value: "Available" },
                                        { label: "Type", value: "Residential" },
                                    ].map((stat) => (
                                        <div key={stat.label} className="map-stat">
                                            <p className="text-[9px] tracking-[0.32em] uppercase text-[#b8924a]/60 mb-1">
                                                {stat.label}
                                            </p>
                                            <p className="cormorant text-xl font-light text-[#1a1a1a]">
                                                {stat.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Open in Maps CTA */}
                                <div className="map-info-card p-5 sm:p-6 flex flex-col gap-4">
                                    <p className="text-[10px] font-light text-[#1a1a1a]/40 leading-relaxed">
                                        View this property's precise location on Google Maps for directions and nearby landmarks.
                                    </p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="open-map-btn"
                                    >
                                        Open in Google Maps
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}

            <div className="divider" />

            {/* ════════ CTA BAND ════════ */}
            <section ref={(el) => addRef(el, 3)} data-section="cta"
                className="relative px-6 sm:px-10 md:px-16 py-24 sm:py-32 md:py-40 overflow-hidden"
                style={{ background: "#1a1714" }}
            >
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                    <span className="cormorant font-extralight leading-none whitespace-nowrap"
                        style={{ fontSize: "clamp(80px,18vw,260px)", color: "rgba(255,255,255,0.025)" }}
                    >
                        {project.location}
                    </span>
                </div>

                {/* Gold accent lines */}
                <div className="absolute top-0 left-16 right-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,146,74,.22) 30%, rgba(184,146,74,.22) 70%, transparent)" }} />
                <div className="absolute bottom-0 left-16 right-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,146,74,.22) 30%, rgba(184,146,74,.22) 70%, transparent)" }} />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className={`reveal ${visibleSections.has("cta") ? "visible" : ""}`}>
                        <p className="section-label mb-6" style={{ color: "#c9a96e" }}>Interested in this property?</p>
                        <h2 className="cormorant font-light leading-tight mb-4 max-w-2xl"
                            style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "white" }}
                        >
                            Let's start a{" "}
                            <em className="gold-shimmer not-italic">conversation</em>
                        </h2>
                        <p className="text-sm font-light leading-relaxed max-w-sm mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
                            Our team is ready to help you explore this exceptional property and find your perfect match.
                        </p>
                    </div>

                    <div className={`flex flex-wrap gap-4 reveal d2 ${visibleSections.has("cta") ? "visible" : ""}`}>
                        <button className="group flex items-center gap-3 px-9 py-4 bg-[#b8924a] text-white text-[10px] tracking-[0.35em] uppercase font-medium hover:bg-[#d4aa6a] transition-all duration-500">
                            Enquire Now
                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                        <button onClick={() => navigate(-1)}
                            className="px-9 py-4 text-[10px] tracking-[0.35em] uppercase transition-all duration-500"
                            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(184,146,74,0.45)"; e.currentTarget.style.color = "#d4aa6a"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
                        >
                            More Projects
                        </button>
                    </div>
                </div>
            </section>

            {/* ════════ LIGHTBOX — frosted white ════════ */}
            {lightbox && (
                <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>

                    {/* Close */}
                    <button onClick={() => setLightbox(null)}
                        className="absolute top-5 right-5 sm:top-7 sm:right-8 flex items-center gap-2.5 transition-colors text-[10px] tracking-[0.3em] uppercase z-10"
                        style={{ color: "rgba(26,26,26,0.35)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#b8924a"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(26,26,26,0.35)"}
                    >
                        Close
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Media */}
                    <div
                        className="relative mx-4 sm:mx-8"
                        style={{
                            maxHeight: "90vh",
                            maxWidth: lightbox.type === "video" ? "420px" : "380px",
                            width: "100%",
                            animation: "slideUp .4s cubic-bezier(.16,1,.3,1)"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {lightbox.type === "image"
                            ? <img src={lightbox.src} alt="" className="w-full h-auto max-h-[88vh] object-contain" style={{ boxShadow: "0 30px 80px rgba(0,0,0,.12)" }} />
                            : <video src={lightbox.src} controls autoPlay className="w-full h-auto max-h-[88vh]" style={{ boxShadow: "0 30px 80px rgba(0,0,0,.12)" }} />
                        }
                    </div>

                    {/* Prev / Next */}
                    {lightbox.type === "image" && (() => {
                        const idx = project.images.indexOf(lightbox.src);
                        return (
                            <>
                                <button
                                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                    style={{ border: "1px solid rgba(26,26,26,0.1)", color: "rgba(26,26,26,0.35)" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightbox({ type: "image", src: project.images[(idx - 1 + project.images.length) % project.images.length] });
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#b8924a"; e.currentTarget.style.borderColor = "rgba(184,146,74,0.4)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(26,26,26,0.35)"; e.currentTarget.style.borderColor = "rgba(26,26,26,0.1)"; }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button
                                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                    style={{ border: "1px solid rgba(26,26,26,0.1)", color: "rgba(26,26,26,0.35)" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightbox({ type: "image", src: project.images[(idx + 1) % project.images.length] });
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#b8924a"; e.currentTarget.style.borderColor = "rgba(184,146,74,0.4)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(26,26,26,0.35)"; e.currentTarget.style.borderColor = "rgba(26,26,26,0.1)"; }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] uppercase" style={{ color: "rgba(26,26,26,0.25)" }}>
                                    {String(idx + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                                </p>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;