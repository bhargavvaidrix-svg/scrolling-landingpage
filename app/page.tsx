'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import TransformerScrollCanvas from '@/components/TransformerScrollCanvas';
import TransformerExperience from '@/components/TransformerExperience';
import SpecsGrid from '@/components/SpecsGrid';
import Features from '@/components/Features';
import ProcessWorkflow from '@/components/ProcessWorkflow';
import Footer from '@/components/Footer';
import { SEQUENCE_CONFIG } from '@/data/transformerData';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Single scroll source for the entire experience
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <main className="bg-base-dark">
            <Navbar />

            {/* Scroll sequence container - 500vh */}
            <section
                ref={containerRef}
                className="relative"
                style={{ height: SEQUENCE_CONFIG.scrollLength }}
            >
                {/* Sticky viewport - full screen, adjusted for mobile */}
                <div className="sticky top-0 h-screen md:h-[120vh] w-full overflow-hidden">
                    {/* Canvas layer (z-0) */}
                    <TransformerScrollCanvas
                        scrollYProgress={scrollYProgress}
                        totalFrames={SEQUENCE_CONFIG.totalFrames}
                        imageFolderPath={SEQUENCE_CONFIG.imageFolderPath}
                    />

                    {/* HUD overlay (z-10) */}
                    <TransformerExperience scrollYProgress={scrollYProgress} />
                </div>
            </section>

            {/* Post-sequence content (z-20) */}
            <div className="relative z-20 bg-base-dark">
                <SpecsGrid />
                <Features />
                <ProcessWorkflow />
                <Footer />
            </div>
        </main>
    );
}
