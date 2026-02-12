'use client';

import { motion } from 'framer-motion';

const STEPS = [
    {
        id: '01',
        title: 'ANALYZE',
        description: 'Deep dive into system requirements and architectural constraints.',
        image: '/images/frame_0080.webp',
    },
    {
        id: '02',
        title: 'TRANSFORM',
        description: 'Execution of precise, high-fidelity animation sequences.',
        image: '/images/frame_0085.webp',
    },
    {
        id: '03',
        title: 'DEPLOY',
        description: 'Seamless integration into production environments.',
        image: '/images/frame_0090.webp',
    },
];

export default function ProcessWorkflow() {
    return (
        <section className="relative py-20 md:py-32 px-6 md:px-8 bg-black overflow-hidden border-t border-neutral-carbon">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4 tracking-wider">
                        OPERATIONAL <span className="text-accent-plasma">PROTOCOL</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-plasma to-transparent mx-auto" />
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="group relative">
                            {/* Card Container */}
                            <div className="relative h-96 border border-neutral-carbon bg-surface-carbon/50 overflow-hidden rounded-sm transition-colors duration-500 group-hover:border-accent-plasma/50">
                                {/* Background Image */}
                                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-luminosity">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-cover grayscale"
                                    />
                                </div>

                                {/* Grid Overlay */}
                                <div className="absolute inset-0 bg-[linear_gradient(rgba(255,42,42,0.03)_1px,transparent_1px),linear_gradient(90deg,rgba(255,42,42,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                    {/* Step Number */}
                                    <div className="absolute top-6 right-6 font-orbitron text-4xl text-neutral-carbon/30 group-hover:text-accent-plasma/20 transition-colors duration-500 font-bold select-none">
                                        {step.id}
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-orbitron text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-accent-plasma transition-colors duration-300">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="font-rajdhani text-lg text-neutral-400 group-hover:text-white transition-colors duration-300">
                                        {step.description}
                                    </p>

                                    {/* Decorative Bar */}
                                    <div className="w-full h-0.5 bg-neutral-carbon mt-6 group-hover:bg-accent-plasma transition-colors duration-500 origin-left transform scale-x-50 group-hover:scale-x-100" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
