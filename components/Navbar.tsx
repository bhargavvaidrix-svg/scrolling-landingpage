'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isInHeroSection, setIsInHeroSection] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hero section is approximately 500vh tall
            // Get the viewport height
            const viewportHeight = window.innerHeight;
            // Hero section ends at approximately 5x viewport height (500vh)
            const heroSectionEnd = viewportHeight * 5;

            // Check if we're still in the hero section
            setIsInHeroSection(window.scrollY < heroSectionEnd);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isInHeroSection ? 'bg-transparent' : 'bg-black/90 backdrop-blur-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
                {/* Logo/Brand */}
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-orbitron text-2xl md:text-2xl font-bold tracking-wider text-white cursor-pointer hover:text-accent-plasma transition-colors duration-300"
                >
                    TRANSFORMER
                </div>

                {/* CTA */}
                <a
                    href="#"
                    className="font-rajdhani text-lg md:text-xl px-4 py-2 text-white hover:text-accent-metal transition-colors duration-300 tracking-wide uppercase focus:outline-none focus:ring-2 focus:ring-accent-metal focus:ring-offset-2 focus:ring-offset-transparent rounded"
                >
                    PORTFOLIO
                </a>
            </div>
        </motion.nav>
    );
}
