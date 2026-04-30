import { useState } from "react";

const OurImpact = () => {
    const [openDownload, setOpenDownload] = useState(null);

    const toggleDownload = (index) => {
        setOpenDownload(openDownload === index ? null : index);
    };

    const recognitions = [
        {
            title: "First Real Estate Company in India",
            desc: "to have SBTi validated Net-Zero Targets (both near and long term)",
        },
        {
            title: "Ranked 1st in India",
            desc: "with the 6th highest score out of 500 Global Real Estate Development companies in the S&P Global Corporate Sustainability Assessment 2024. Member of Dow Jones Sustainability Indices",
        },
        {
            title: "Ranked 1st in Asia",
            desc: "with a perfect score of 100/100 in the Residential Development Benchmark category at Global Real Estate Sustainability Benchmark 2024 (GRESB)",
        },
        {
            title: "Ranked 1st in India and 5th in Asia",
            desc: "with a 5-star rating and a score of 94/100 in GRESB Standing Investments Benchmark 2024",
        },
    ];

    const downloads = [
        "Environment Policies",
        "Social Policies",
        "Governance Policies",
        "Sustainability Reports",
        "Certifications",
    ];

    const partnerships = [
        {
            title: "Unique Net Zero Urban Accelerator",
            desc: "Launched Unique Net Zero Urban Accelerator in partnership with RMI in 2022",
        },
        {
            title: "Bytrees Build Ahead",
            desc: "Part of Bytrees Build Ahead — a business-led coalition, dedicated to collectively tackling the challenge of achieving a net-zero built environment",
        },
        {
            title: "WRI Signatory",
            desc: "Signatory to WRI led business charter, value-chain approach to decarbonizing the building and construction sector in India",
        },
    ];

    return (
        <div className="font-sans bg-white text-gray-800 overflow-x-hidden">
            {/* ── Hero ── */}
            <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80"
                    alt="Nature canopy hero"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    style={{ animation: "slowZoom 20s ease-in-out infinite alternate" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 via-transparent to-white" />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-green-800 text-xs font-semibold tracking-[0.25em] uppercase px-5 py-2 rounded-full shadow-lg">
                        Sustainability &amp; ESG
                    </span>
                </div>
                <style>{`
          @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          .fade-up { animation: fadeUp 0.7s ease both; }
        `}</style>
            </section>

            {/* ── Creating a Positive Impact ── */}
            <section className="max-w-3xl mx-auto px-6 py-16 text-center fade-up">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-6">
                    Creating a Positive Impact
                </h2>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-4">
                    Unique Builders &amp; Developers is committed to using our capabilities to create a
                    positive impact on the environment and on society. As we grow, so does the scale of
                    the impact we can make.
                </p>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-8">
                    Through the{" "}
                    <span className="font-semibold text-green-700">Unique Foundation</span>, we implement
                    transformative projects in Education, Women's Empowerment, and Sustainable Urbanisation
                    to create a positive impact on the environment and society. We are recognised in global
                    sustainability indices and rankings for the work we do to address the environmental
                    impact of the built environment.
                </p>
                <a
                    href="#"
                    className="inline-block border border-gray-400 text-gray-700 text-xs tracking-widest uppercase px-8 py-3 hover:bg-green-700 hover:border-green-700 hover:text-white transition-all duration-300"
                >
                    Our Integrated Report
                </a>
            </section>

            {/* ── Environmental Impact ── */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">
                            Environmental Impact
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
                            Our approach to sustainable construction focuses on reducing carbon emissions
                            (decarbonisation) and on creating assets that will be resilient to future climate
                            change (resilience).
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
                                label: "Decarbonisation",
                                desc: "Our decarbonisation initiatives are designed to lead the transition to a low-carbon future for the real estate industry.",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
                                label: "Resilience",
                                desc: "Our resilience initiatives focus on water resilience, biodiversity and asset safety; mitigating future climate risks.",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
                                label: "Net Zero Accelerator",
                                desc: "The Unique Net Zero Urban Accelerator, in partnership with US-based think tank RMI, is a pioneering platform.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                            >
                                <div className="overflow-hidden h-52">
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="text-xs font-bold uppercase tracking-widest text-green-600">
                                        {item.label}
                                    </span>
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Social Impact ── */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">
                            Social Impact
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
                            Unique Builders &amp; Developers is committed to creating a positive impact on
                            Indian society through programmes which support the nation's development. Our
                            current areas of focus are Women's Empowerment and Education.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
                                label: "Women's Empowerment",
                                desc: "Ummat, Unique's flagship Women's Economic Empowerment programme.",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
                                label: "Genius Programme",
                                desc: "Unique Genius Programme, in partnership with Ashoka, nurtures young talent across India.",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
                                label: "Nation Building",
                                desc: "Unique Builders &amp; Developers is building the nation through access to quality education.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                            >
                                <div className="overflow-hidden h-52">
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                        {item.label}
                                    </span>
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Recognition ── */}
            <section className="bg-stone-900 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">Recognition</h2>
                        <p className="text-stone-400 text-sm tracking-widest uppercase">
                            Leading in global sustainability benchmarks
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recognitions.map((r, i) => (
                            <div
                                key={i}
                                className="border border-stone-700 rounded-xl p-6 hover:border-green-500 hover:bg-stone-800 transition-all duration-300 group"
                            >
                                <div className="w-8 h-1 bg-green-500 mb-4 group-hover:w-16 transition-all duration-300" />
                                <p className="font-semibold text-sm text-green-400 mb-2">{r.title}</p>
                                <p className="text-stone-400 text-xs leading-relaxed">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Partnerships ── */}
            <section className="py-16 px-6 bg-green-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
                            Partnerships
                        </h2>
                        <p className="text-gray-500 text-sm tracking-wide">
                            Strategic partnerships to lead the change in the industry
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {partnerships.map((p, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-600"
                            >
                                <div className="text-green-600 text-3xl font-bold mb-3">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-sm">{p.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Downloads ── */}
            <section className="py-16 px-6 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 text-center mb-10">
                    Downloads
                </h2>
                <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                    {downloads.map((item, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleDownload(i)}
                                className="w-full flex items-center justify-between py-5 px-2 text-left group hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span className="text-gray-700 text-sm font-medium group-hover:text-green-700 transition-colors">
                                    {item}
                                </span>
                                <svg
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openDownload === i ? "rotate-180 text-green-600" : ""
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openDownload === i && (
                                <div className="px-2 pb-5 text-gray-500 text-sm">
                                    <p className="mb-3">
                                        Download our latest {item.toLowerCase()} documents and reports.
                                    </p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 text-green-700 font-medium text-xs hover:underline"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Blog ── */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 text-center mb-10">
                        Blogs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
                                tag: "Environment",
                                title: "Embodied carbon in high rise buildings – Insights from a baselining study",
                                author: "Dr. Prasad Mangipudi & Aun Abdullah, Unique Builders & Developers",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                                tag: "Social",
                                title: "Women in real estate: Bridging the gender gap in India's construction sector",
                                author: "Unique Foundation Research Team",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
                                tag: "Governance",
                                title: "Net-zero pathways: How Indian developers can lead the global transition",
                                author: "Unique Builders &amp; Developers Sustainability Office",
                            },
                        ].map((blog, i) => (
                            <article
                                key={i}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                            >
                                <div className="overflow-hidden h-48">
                                    <img
                                        src={blog.img}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600 mb-2">
                                        {blog.tag}
                                    </span>
                                    <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-3 group-hover:text-green-700 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs">{blog.author}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer Strip ── */}
            <div className="bg-green-800 text-white text-center py-8 px-6">
                <p className="text-sm tracking-wide opacity-80">
                    © {new Date().getFullYear()} Unique Builders &amp; Developers. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default OurImpact;