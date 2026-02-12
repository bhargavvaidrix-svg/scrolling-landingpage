export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 md:py-16 px-6 md:px-8 bg-black border-t-0 overflow-hidden">
            {/* Top Border "Loading Bar" */}
            <div className="absolute top-0 left-0 w-full h-1 bg-surface-carbon">
                <div className="h-full w-1/3 bg-accent-plasma/50" />
                <div className="absolute top-0 right-0 h-full w-24 bg-accent-plasma animate-pulse" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <div
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="font-orbitron text-2xl font-bold tracking-widest text-white relative group cursor-pointer"
                        >
                            TRANSFORMER
                            <span className="absolute -inset-1 bg-accent-plasma/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="font-rajdhani text-xs text-accent-plasma tracking-[0.3em] opacity-70 mt-1">
                            SYSTEM ONLINE
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8">
                        {['Portfolio', 'Contact', 'GitHub'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="font-rajdhani text-sm text-neutral-400 hover:text-white transition-colors duration-200 tracking-wide uppercase relative group overflow-hidden px-2 py-1"
                            >
                                <span className="relative z-10">{item}</span>
                                <span className="absolute inset-0 bg-accent-plasma/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-plasma transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right delay-75" />
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="font-rajdhani text-sm text-neutral-600">
                        © {currentYear} <span className="text-accent-plasma/50">{"///"}</span> ALL RIGHTS RESERVED
                    </div>
                </div>

                {/* Back to top */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-orbitron text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 bg-transparent border border-neutral-700 hover:border-accent-plasma focus:outline-none"
                    >
                        <span className="absolute inset-0 w-full h-full bg-accent-plasma/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative group-hover:text-accent-plasma transition-colors duration-300">
                            ↑ SCORE TO TOP
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
