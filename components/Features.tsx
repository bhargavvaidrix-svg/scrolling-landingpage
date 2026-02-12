import { FEATURES } from '@/data/transformerData';

export default function Features() {
    return (
        <section className="relative py-20 md:py-32 px-6 md:px-8 bg-neutral-carbon/10 overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-2 tracking-wider drop-shadow-lg">
                    CASE <span className="text-accent-plasma">STUDY</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-plasma to-transparent mx-auto mb-8" />

                <p className="font-rajdhani text-lg md:text-xl text-center text-neutral-400 mb-20 max-w-3xl mx-auto border-l-2 border-accent-plasma/50 pl-6 italic">
                    &ldquo;A deep dive into the technical challenges and creative solutions behind this cinematic scrollytelling experience.&rdquo;
                </p>

                <div className="space-y-24">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } gap-8 md:gap-16 items-center group relative`}
                        >
                            {/* Connecting Line (Vertical) - Decorative */}
                            {index !== FEATURES.length - 1 && (
                                <div className="absolute left-1/2 bottom-0 w-px h-24 bg-gradient-to-b from-accent-plasma/20 to-transparent translate-y-full hidden md:block" />
                            )}

                            {/* Feature content */}
                            <div className="flex-1 relative">
                                <div className={`absolute -top-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} text-6xl font-orbitron font-bold text-neutral-carbon/20 -z-10 select-none`}>
                                    0{index + 1}
                                </div>
                                <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide group-hover:text-accent-plasma transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <div className="w-12 h-0.5 bg-accent-plasma mb-6" />
                                <p className="font-rajdhani text-base md:text-lg text-neutral-400 leading-relaxed text-justify">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Visual placeholder */}
                            <div className="flex-1 w-full aspect-video bg-surface-carbon border border-neutral-carbon relative overflow-hidden group-hover:border-accent-plasma/50 transition-colors duration-500 rounded-sm">
                                {/* Feature Image (Background) */}
                                {feature.image && (
                                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-luminosity">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Grid Background (Overlay) */}
                                <div className="absolute inset-0 bg-[linear_gradient(rgba(255,42,42,0.03)_1px,transparent_1px),linear_gradient(90deg,rgba(255,42,42,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                                {/* Corner Markers */}
                                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-500 group-hover:border-accent-plasma transition-colors" />
                                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-500 group-hover:border-accent-plasma transition-colors" />
                                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-500 group-hover:border-accent-plasma transition-colors" />
                                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-500 group-hover:border-accent-plasma transition-colors" />

                                {/* Center Content (Label) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                    <div className="font-orbitron text-sm text-accent-plasma tracking-widest bg-base-dark/80 px-4 py-1 rounded border border-accent-plasma/20 backdrop-blur-sm shadow-[0_0_10px_rgba(255,42,42,0.1)]">
                                        FIG. 0{index + 1}
                                    </div>
                                    <div className="font-rajdhani text-xs text-neutral-400 mt-2 uppercase tracking-wide bg-base-dark/60 px-2 py-0.5 rounded">
                                        System Visualization
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-accent-plasma/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
