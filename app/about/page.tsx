import Navbar from '@/components/Navbar';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-[#0a0a0a] text-white">
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">

                {/* Left Profile Section */}
                <div className="w-full lg:w-4/12 xl:w-5/12 relative bg-[#0a0a0a] group overflow-hidden flex flex-col min-h-[60vh] lg:min-h-auto border-r border-neutral-900">

                    {/* Image Area - Upper Section (50% height on desktop) */}
                    <div className="relative h-[300px] lg:h-[50%] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-1000 group-hover:scale-105 grayscale hover:grayscale-0 bg-[url('/images/about-me.png')]"></div>
                        {/* Overlay Gradient for smooth transition to black */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
                    </div>

                    {/* Info Area - Lower Section (Remaining height) */}
                    <div className="relative z-10 p-8 lg:p-12 flex-1 flex flex-col justify-center bg-[#0a0a0a] border-t border-neutral-900">
                        <div className="mb-6">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight leading-none">
                                Tolgahan <br />
                                <span className="text-white">Tokatlı</span>
                            </h1>
                            <p className="text-lg text-gray-400 font-light tracking-wide mt-2">Architect & Interior Designer</p>
                        </div>

                        <div className="space-y-5">
                            <a className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group/link w-fit" href="mailto:bilgi@tolgahantokatli.com.tr">
                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/link:border-white group-hover/link:text-white transition-colors">
                                    <span className="text-sm">✉</span>
                                </div>
                                <span className="text-sm font-medium">bilgi@tolgahantokatli.com.tr</span>
                            </a>
                            <a className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group/link w-fit" href="tel:05433051318">
                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/link:border-white group-hover/link:text-white transition-colors">
                                    <span className="text-sm">📞</span>
                                </div>
                                <span className="text-sm font-medium">0543 305 13 18</span>
                            </a>
                            <div className="flex items-center gap-4 text-gray-300 group/link w-fit">
                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <span className="text-sm">📍</span>
                                </div>
                                <span className="text-sm font-medium">Maltepe, İstanbul</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content Section */}
                <div className="w-full lg:w-8/12 xl:w-7/12 bg-[#0a0a0a] overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-6 py-16 lg:px-16 lg:py-20">

                        {/* Prof Summary */}
                        <section className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-white">👤</span>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-white">About Me</h2>
                            </div>
                            <div className="text-gray-300 leading-relaxed font-light text-lg space-y-4">
                                <p>
                                    Altınbaş University graduate with a degree in Architecture and Interior Designer. I have over 5 years of professional experience in interior design, furniture production, and site management. I approach projects holistically, managing the process from concept development through turnkey delivery.
                                </p>
                                <p>
                                    In office and retail projects, I oversee design, production detailing, and on-site implementation simultaneously. I prepare manufacturing drawings, define material decisions, and supervise the execution process on site.
                                </p>
                                <p>
                                    I produce photorealistic visualizations using D5 Render and 3ds Max, utilizing rendering as a tool to support and refine design decisions.
                                </p>
                                <p>
                                    I manage project costs and operational processes through Excel-based analysis, handling quantity take-offs and progress payments. I integrate design, execution, and budget control within a single workflow.
                                </p>
                            </div>
                        </section>

                        {/* Experience */}
                        <section className="mb-16">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-white">💼</span>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-white">Professional Experience</h2>
                            </div>

                            <div className="relative space-y-12">
                                {/* Item 1 */}
                                <div className="relative pl-8 border-l border-neutral-800">
                                    <div className="absolute left-[-9px] top-1.5 size-4 rounded-full border-2 border-white bg-[#0a0a0a]"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-white">Architect (Concept & Production)</h3>
                                        <span className="text-sm text-gray-500 font-mono">Oct 2024 — Present</span>
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-4">Esste Home Design, İstanbul</h4>
                                    <ul className="space-y-2 text-gray-400 text-sm list-disc pl-4 marker:text-white">
                                        <li><strong className="text-gray-200">Store Concept Design:</strong> Renewing existing store identities and establishing circulation/display areas.</li>
                                        <li><strong className="text-gray-200">Client & Process Management:</strong> One-on-one interaction with project clients, conducting needs analysis, and managing legal design processes.</li>
                                        <li><strong className="text-gray-200">Production Coordination:</strong> Preparing detail drawings for custom furniture, tracking workshop production (cutting, edge banding, assembly).</li>
                                        <li><strong className="text-gray-200">Cost & Proposal:</strong> Preparing project-based cost tables in Excel and creating sales proposals.</li>
                                        <li><strong className="text-gray-200">Visualization:</strong> Creating high-quality renders using D5 Render for client presentations.</li>
                                    </ul>
                                </div>

                                {/* Item 2 */}
                                <div className="relative pl-8 border-l border-neutral-800">
                                    <div className="absolute left-[-9px] top-1.5 size-4 rounded-full border-2 border-neutral-500 bg-[#0a0a0a]"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-white">Architect (Design, Field & Site Management)</h3>
                                        <span className="text-sm text-gray-500 font-mono">Oct 2021 — July 2024</span>
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-4">Less and Blue, İstanbul</h4>
                                    <ul className="space-y-2 text-gray-400 text-sm list-disc pl-4 marker:text-white">
                                        <li><strong className="text-gray-200">Full-Cycle Project Management:</strong> Managed end-to-end design and construction processes for turnkey residential and commercial projects.</li>
                                        <li><strong className="text-gray-200">Architectural Design & Application:</strong> Created conceptual designs and application drawings, ensuring precise execution on-site (drywall, paint, flooring, custom furniture).</li>
                                        <li><strong className="text-gray-200">Site Operations & Team Leadership:</strong> Directed subcontractor teams, managed daily site schedules, and resolved on-site technical issues.</li>
                                        <li><strong className="text-gray-200">Financial Management:</strong> Handled quantity surveying, prepared detailed progress payments (hakediş), and managed project budgets.</li>
                                        <li><strong className="text-gray-200">Procurement:</strong> Managed the entire material selection and purchasing process in alignment with the design concept.</li>
                                    </ul>
                                </div>

                                {/* Internships */}
                                <div className="relative pl-8 border-l border-transparent">
                                    <div className="absolute left-[-9px] top-1.5 size-4 rounded-full border-2 border-neutral-600 bg-[#0a0a0a]"></div>
                                    <div className="flex flex-col gap-6">
                                        <div>
                                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                                <h3 className="text-lg font-semibold text-gray-300">Intern Architect</h3>
                                                <span className="text-xs text-gray-500 font-mono">June 2019 — Aug 2019</span>
                                            </div>
                                            <h4 className="text-white/80 text-sm mb-2">BvA Mimarlık</h4>
                                            <p className="text-sm text-gray-500">Technical support for interior application project detailing and design revisions.</p>
                                        </div>
                                        <div>
                                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                                <h3 className="text-lg font-semibold text-gray-300">Intern Architect</h3>
                                                <span className="text-xs text-gray-500 font-mono">May 2016 — Nov 2016</span>
                                            </div>
                                            <h4 className="text-white/80 text-sm mb-2">Vanta Tasarım</h4>
                                            <p className="text-sm text-gray-500">Surveying existing spaces, digitization, and material research for decoration projects.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Skills */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="text-white">🛠</span>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-white">Skills</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "D5 Render (Expert)",
                                        "3ds Max (Advanced)",
                                        "AutoCAD",
                                        "Microsoft Office Suite",
                                        "Manufacturing Details",
                                        "Site Management",
                                        "Production Coordination",
                                        "Quantity Surveying"
                                    ].map((skill) => (
                                        <span key={skill} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-gray-300 text-sm rounded hover:border-white hover:text-white transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Education & Certificates */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="text-white">🎓</span>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-white">Education</h2>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-base font-semibold text-white">Architecture (English)</h3>
                                        <p className="text-white/80 text-sm">Altınbaş University</p>
                                        <p className="text-xs text-gray-500 font-mono mt-1">2015 — 2021</p>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white">Certificates</h3>
                                        <ul className="text-sm text-gray-400 mt-2 space-y-1">
                                            <li>• Outside/Inside Facade Cladding - <span className="text-gray-500">KNAUF (2017)</span></li>
                                            <li>• 3ds Max + Vray - <span className="text-gray-500">MİMTEK (2016)</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
