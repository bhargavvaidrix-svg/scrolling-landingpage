import { SPECS } from '@/data/transformerData';

export default function SpecsGrid() {
    return (
        <section className="relative py-20 md:py-32 px-6 md:px-8 bg-base-dark overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear_gradient(to_right,#1a1a1a_1px,transparent_1px),linear_gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="relative max-w-6xl mx-auto z-10">
                <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    TECHNICAL <span className="text-accent-plasma">SPECIFICATIONS</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {SPECS.map((spec, index) => (
                        <div
                            key={index}
                            className="relative group bg-surface-carbon/80 backdrop-blur-sm border border-neutral-carbon p-6 md:p-8 text-center transition-all duration-300 hover:border-accent-plasma hover:shadow-neon hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent-plasma opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent-plasma opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Scanline Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-plasma/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-in-out pointer-events-none" />

                            <div className="font-rajdhani text-sm md:text-base text-neutral-400 mb-2 tracking-wide uppercase group-hover:text-white transition-colors">
                                {spec.label}
                            </div>
                            <div className="font-orbitron text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-accent-plasma transition-colors duration-300 drop-shadow-[0_0_5px_rgba(255,42,42,0.5)]">
                                {spec.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
