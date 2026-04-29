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
            { threshold: 0.1 }
        );
        sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
        return () => observer.disconnect();
    }, []);

    const addRef = (el, index) => { sectionRefs.current[index] = el; };

    if (!project) {
        return (
            <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-8xl font-light text-[#b8a88a] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>404</p>
                    <p className="text-[#999] tracking-[0.3em] text-xs uppercase mb-8">Project not found</p>
                    <button onClick={() => navigate(-1)} className="px-10 py-3.5 bg-[#1a1a1a] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#b8a88a] transition-all duration-500">
                        Return
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#faf9f7] text-[#1a1a1a] overflow-x-hidden" style={{ fontFamily: "'Jost', sans-serif" }}>

            {/* ── FONTS & GLOBAL STYLES ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        .playfair { font-family: 'Playfair Display', serif; }

        @keyframes heroReveal {
          from { opacity: 0; transform: scale(1.08); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(184,168,138,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(184,168,138,0); }
          100% { box-shadow: 0 0 0 0 rgba(184,168,138,0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        .hero-img { animation: heroReveal 1.4s cubic-bezier(0.16,1,0.3,1) forwards; }

        .reveal { opacity: 0; }
        .reveal.visible { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .reveal-left { opacity: 0; }
        .reveal-left.visible { animation: slideLeft 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .reveal-fade { opacity: 0; }
        .reveal-fade.visible { animation: fadeIn 1s ease forwards; }

        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.15s; }
        .d3 { animation-delay: 0.25s; }
        .d4 { animation-delay: 0.35s; }
        .d5 { animation-delay: 0.45s; }
        .d6 { animation-delay: 0.55s; }

        .img-card { overflow: hidden; }
        .img-card img { transition: transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .img-card:hover img { transform: scale(1.07); }

        .vid-card { overflow: hidden; }
        .vid-card video { transition: transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .vid-card:hover video { transform: scale(1.05); }

        .play-btn { animation: pulseRing 2.5s ease-out infinite; }
        .scroll-float { animation: float 3s ease-in-out infinite; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .noise-bg {
          background-color: #faf9f7;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }

        .section-line {
          transform-origin: left;
          animation: lineGrow 1s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        .thumb-active { box-shadow: 0 0 0 2px #b8a88a; }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border: 1px solid #e5e0d8;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #999;
          background: white;
        }

        /* ── GAP SYSTEM ──
           All sections are separated by a visible gap strip.
           --section-gap controls vertical breathing room.
        */
        :root {
          --section-gap: 6rem;        /* 96px desktop */
          --section-gap-sm: 3.5rem;   /* 56px mobile  */
          --inner-gap: 1.5rem;        /* gap between cards inside a grid */
          --inner-gap-lg: 2rem;       /* larger inner gap for featured rows */
        }

        @media (max-width: 768px) {
          :root {
            --section-gap: var(--section-gap-sm);
          }
        }

        /* Between-section gap divider */
        .section-spacer {
          height: var(--section-gap);
          background: #faf9f7;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .section-spacer::before {
          content: '';
          position: absolute;
          left: 2rem;
          right: 2rem;
          top: 50%;
          height: 1px;
          background: linear-gradient(to right, transparent, #e8e3da 30%, #e8e3da 70%, transparent);
        }
        @media(min-width:768px){
          .section-spacer::before { left: 4rem; right: 4rem; }
        }

        /* Image / video inner gap */
        .media-grid { gap: var(--inner-gap); }
        .media-grid-lg { gap: var(--inner-gap-lg); }
      `}</style>

            {/* ════════════════════════════════════
           HERO
      ════════════════════════════════════ */}
            <section className="relative h-screen min-h-[600px] overflow-hidden">
                <div className="absolute inset-0">
                    {project.images.map((img, i) => (
                        <img
                            key={img}
                            src={img}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === activeImage ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                </div>

                {/* Top bar */}
                <div className={`absolute top-0 left-0 right-0 z-20 px-5 sm:px-8 md:px-16 py-6 sm:py-8 flex items-center justify-between transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group text-xs tracking-[0.25em] uppercase"
                    >
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back
                    </button>
                    <div className="tag-pill bg-white/10 border-white/20 text-white/70 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b8a88a]" />
                        {project.location}
                    </div>
                </div>

                {/* Hero text */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-5 sm:px-8 md:px-16 pb-14 sm:pb-16 md:pb-24">
                    <div className={`transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-[#b8a88a] text-xs tracking-[0.4em] uppercase mb-4 sm:mb-5">
                            {String(project.images.length).padStart(2, "0")} Images &nbsp;·&nbsp; {String(project.videos.length).padStart(2, "0")} Videos
                        </p>
                    </div>
                    <h1 className={`playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-4 sm:mb-6 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        {project.name}
                    </h1>
                    <p className={`text-white/50 font-light text-sm max-w-sm leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        {project.description}
                    </p>
                    <div className={`flex gap-2 mt-6 sm:mt-8 transition-all duration-700 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        {project.images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`transition-all duration-400 rounded-full ${i === activeImage ? "w-8 h-1.5 bg-[#b8a88a]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className={`scroll-float absolute bottom-8 right-8 sm:right-10 z-20 hidden sm:flex flex-col items-center gap-3 transition-all duration-700 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-white/40 text-[9px] tracking-[0.35em] uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                </div>
            </section>

            {/* ── GAP ── */}
            <div className="section-spacer" />

            {/* ════════════════════════════════════
           PROJECT INTRO STRIP
      ════════════════════════════════════ */}
            <section
                ref={(el) => addRef(el, 0)}
                data-section="intro"
                className="px-5 sm:px-8 md:px-16 noise-bg"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">
                        <div className={`md:col-span-3 reveal ${visibleSections.has("intro") ? "visible" : ""}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px w-8 bg-[#b8a88a] section-line" />
                                <span className="text-[10px] tracking-[0.4em] uppercase text-[#b8a88a]">The Project</span>
                            </div>
                        </div>
                        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
                            {[
                                { label: "Name", value: project.name },
                                { label: "Location", value: project.location },
                                { label: "Overview", value: project.description },
                            ].map((item, i) => (
                                <div key={item.label} className={`reveal d${i + 1} ${visibleSections.has("intro") ? "visible" : ""}`}>
                                    <p className="text-[10px] tracking-[0.35em] uppercase text-[#bbb] mb-3">{item.label}</p>
                                    <p className="playfair text-xl font-light text-[#1a1a1a] leading-snug">{item.value}</p>
                                    <div className="mt-4 h-px bg-[#e8e3da]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GAP ── */}
            <div className="section-spacer" />

            {/* ════════════════════════════════════
           IMAGES — EDITORIAL MASONRY
      ════════════════════════════════════ */}
            <section
                ref={(el) => addRef(el, 1)}
                data-section="images"
                className="px-6 sm:px-10 md:px-20 lg:px-28 xl:px-32 bg-white py-10"
            >
                <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-12">

                    {/* Section heading */}
                    <div className={`flex items-end justify-between reveal ${visibleSections.has("images") ? "visible" : ""}`}>
                        <div className="flex flex-col gap-4">
                            <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8a88a]">Photography</p>
                            <h2 className="playfair text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a]">Visual Gallery</h2>
                        </div>
                        <span className="playfair text-5xl sm:text-6xl font-light text-[#f0ece4] leading-none">
                            {String(project.images.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Featured image */}
                    <div
                        className={`img-card relative cursor-pointer group reveal d1 ${visibleSections.has("images") ? "visible" : ""}`}
                        onClick={() => setLightbox({ type: "image", src: project.images[0] })}
                    >
                        <div className="aspect-[16/7] sm:aspect-[21/8] bg-[#f0ece4]">
                            <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 bg-white/90 backdrop-blur-sm px-6 py-3 text-xs tracking-[0.3em] uppercase text-[#1a1a1a]">
                                View Full
                            </div>
                        </div>
                        <span className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-white/60" />
                        <span className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-white/60" />
                    </div>

                    {/* Grid images */}
                    {project.images.length > 1 && (
                        <div className="grid grid-cols-12 gap-8">
                            {project.images.slice(1).map((img, i) => {
                                const spans = [
                                    "col-span-12 sm:col-span-7",
                                    "col-span-12 sm:col-span-5",
                                    "col-span-12 sm:col-span-5",
                                    "col-span-12 sm:col-span-7",
                                ];
                                const aspects = [
                                    "aspect-[4/3]",
                                    "aspect-[3/4]",
                                    "aspect-[3/4]",
                                    "aspect-[4/3]",
                                ];
                                return (
                                    <div
                                        key={img}
                                        className={`${spans[i % spans.length]} img-card relative cursor-pointer group reveal d${(i % 3) + 2} ${visibleSections.has("images") ? "visible" : ""}`}
                                        onClick={() => setLightbox({ type: "image", src: img })}
                                    >
                                        <div className={`${aspects[i % aspects.length]} bg-[#f0ece4]`}>
                                            <img src={img} alt={`${project.name} ${i + 2}`} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />
                                        <div className="absolute bottom-4 left-4 text-white/0 group-hover:text-white/80 transition-all duration-400 text-[10px] tracking-[0.3em] uppercase">
                                            {String(i + 2).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Thumbnails */}
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {project.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setLightbox({ type: "image", src: img })}
                                className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-16 img-card transition-all duration-300 ${i === 0 ? "thumb-active" : "opacity-50 hover:opacity-90"}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {/* ── GAP between Images and Videos ── */}
            <div className="section-spacer" style={{ height: "calc(var(--section-gap) * 1.25)" }} />

            {/* ════════════════════════════════════
           VIDEOS
      ════════════════════════════════════ */}
            <section
                ref={(el) => addRef(el, 2)}
                data-section="videos"
                className="px-6 sm:px-10 md:px-20 lg:px-28 xl:px-32 noise-bg py-10"
            >
                <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-12">

                    {/* Section heading */}
                    <div className={`flex items-end justify-between reveal ${visibleSections.has("videos") ? "visible" : ""}`}>
                        <div className="flex flex-col gap-4">
                            <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8a88a]">Cinematic</p>
                            <h2 className="playfair text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a]">Video Tour</h2>
                        </div>
                        <span className="playfair text-5xl sm:text-6xl font-light text-[#e8e3da] leading-none">
                            {String(project.videos.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Featured video */}
                    {project.videos[0] && (
                        <div
                            className={`vid-card relative cursor-pointer group reveal d1 ${visibleSections.has("videos") ? "visible" : ""}`}
                            onClick={() => setLightbox({ type: "video", src: project.videos[0] })}
                        >
                            <div className="aspect-[16/8] bg-[#1a1a1a] relative overflow-hidden">
                                <video
                                    src={project.videos[0]}
                                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500"
                                    muted loop playsInline
                                    onMouseEnter={(e) => e.target.play()}
                                    onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="play-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1a1a1a] ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 tag-pill bg-black/40 border-white/20 text-white/70 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                    Feature Film
                                </div>
                                <span className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/40 text-xs tracking-[0.3em] uppercase">
                                    01 / {String(project.videos.length).padStart(2, "0")}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Remaining videos grid */}
                    {project.videos.length > 1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {project.videos.slice(1).map((video, i) => (
                                <div
                                    key={i}
                                    className={`vid-card relative cursor-pointer group reveal d${i + 2} ${visibleSections.has("videos") ? "visible" : ""}`}
                                    onClick={() => setLightbox({ type: "video", src: video })}
                                >
                                    <div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
                                        <video
                                            src={video}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                                            muted loop playsInline
                                            onMouseEnter={(e) => e.target.play()}
                                            onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:border-white group-hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                                            <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase">
                                                {String(i + 2).padStart(2, "0")} / {String(project.videos.length).padStart(2, "0")}
                                            </p>
                                        </div>
                                        <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/30" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── GAP before CTA ── */}
            <div className="section-spacer" />

            {/* ════════════════════════════════════
                        CTA FOOTER BAND
                ════════════════════════════════════ */}
            <section
                ref={(el) => addRef(el, 3)}
                data-section="cta"
                className="px-5 sm:px-8 md:px-16 py-20 sm:py-24 md:py-36 bg-[#1a1a1a] relative overflow-hidden"
            >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="playfair text-[80px] sm:text-[120px] md:text-[200px] font-light text-white/[0.03] leading-none whitespace-nowrap">
                        {project.location}
                    </span>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    <div className={`reveal ${visibleSections.has("cta") ? "visible" : ""}`}>
                        <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8a88a] mb-6">Interested in this property?</p>
                        <h2 className="playfair text-3xl sm:text-4xl md:text-6xl font-light text-white leading-tight mb-8 sm:mb-10 max-w-2xl">
                            Let's start a<br />
                            <em className="text-[#b8a88a]">conversation</em>
                        </h2>
                    </div>

                    <div className={`flex flex-wrap gap-4 reveal d2 ${visibleSections.has("cta") ? "visible" : ""}`}>
                        <button className="group flex items-center gap-3 px-8 sm:px-10 py-4 bg-[#b8a88a] text-white text-xs tracking-[0.3em] uppercase hover:bg-[#a8987a] transition-all duration-400">
                            Enquire Now
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 sm:px-10 py-4 border border-white/20 text-white/60 text-xs tracking-[0.3em] uppercase hover:border-white/50 hover:text-white transition-all duration-400"
                        >
                            More Projects
                        </button>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
           LIGHTBOX
      ════════════════════════════════════ */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center"
                    style={{ animation: "fadeIn 0.3s ease" }}
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute top-5 right-5 sm:top-7 sm:right-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs tracking-[0.3em] uppercase z-10"
                    >
                        Close
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="max-w-6xl w-full mx-4 sm:mx-8"
                        onClick={(e) => e.stopPropagation()}
                        style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}
                    >
                        {lightbox.type === "image" ? (
                            <img src={lightbox.src} alt="" className="w-full h-auto max-h-[88vh] object-contain" />
                        ) : (
                            <video src={lightbox.src} controls autoPlay className="w-full h-auto max-h-[88vh] rounded-sm" />
                        )}
                    </div>

                    {lightbox.type === "image" && (() => {
                        const currentIdx = project.images.indexOf(lightbox.src);
                        return (
                            <>
                                <button
                                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const prev = (currentIdx - 1 + project.images.length) % project.images.length;
                                        setLightbox({ type: "image", src: project.images[prev] });
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button
                                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const next = (currentIdx + 1) % project.images.length;
                                        setLightbox({ type: "image", src: project.images[next] });
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                                <p className="absolute bottom-6 sm:bottom-7 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em] uppercase">
                                    {String(currentIdx + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
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