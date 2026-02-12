'use client';

import { MotionValue, motion, useTransform } from 'framer-motion';
import { HUD_PHASES, HUD_COPY, SEQUENCE_CONFIG } from '@/data/transformerData';
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Separate component to properly use hooks for each diagnostic item
function DiagnosticItem({
    item,
    index,
    scrollYProgress,
}: {
    item: { progress: number; duration: number; text: string };
    index: number;
    scrollYProgress: MotionValue<number>;
}) {
    const startFade = item.progress - 0.02;
    const endFade = item.progress + item.duration;

    const diagnosticOpacity = useTransform(
        scrollYProgress,
        [startFade, item.progress, endFade, endFade + 0.02],
        [0, 1, 1, 0]
    );

    const diagnosticX = useTransform(
        scrollYProgress,
        [startFade, item.progress],
        [index % 2 === 0 ? -30 : 30, 0]
    );

    return (
        <motion.div
            style={{
                opacity: diagnosticOpacity,
                x: diagnosticX,
            }}
            className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'left-8 md:left-12' : 'right-8 md:right-12'
                }`}
        >
            <div className="font-orbitron text-lg md:text-xl lg:text-2xl font-bold text-white tracking-wider">
                {item.text}
            </div>
        </motion.div>
    );
}

interface TransformerExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function TransformerExperience({
    scrollYProgress,
}: TransformerExperienceProps) {
    const [isMuted, setIsMuted] = useState(true);
    // Use Web Audio API for synthesized sound if file fails/is missing
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    // Cleanup audio context on unmount
    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const toggleAudio = () => {
        if (isMuted) {
            // Initialize Audio Context if not exists
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            // Resume context if suspended (browser policy)
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            // Create Oscillator (Low frequency drone)
            const osc = audioContextRef.current.createOscillator();
            const gain = audioContextRef.current.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(50, audioContextRef.current.currentTime); // 50Hz drone

            // Modulation (Subtle LFO for "alive" feel)
            const lfo = audioContextRef.current.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.5, audioContextRef.current.currentTime);
            const lfoGain = audioContextRef.current.createGain();
            lfoGain.gain.setValueAtTime(10, audioContextRef.current.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            // Filter (Lowpass to dampen harshness)
            const filter = audioContextRef.current.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(120, audioContextRef.current.currentTime);

            // Connect graph
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(audioContextRef.current.destination);

            // Volume ramp up
            gain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
            gain.gain.linearRampToValueAtTime(0.4, audioContextRef.current.currentTime + 1);

            osc.start();

            oscillatorRef.current = osc;
            gainNodeRef.current = gain;
            setIsMuted(false);
        } else {
            // Ramp down and stop
            if (gainNodeRef.current && audioContextRef.current) {
                const currentTime = audioContextRef.current.currentTime;
                gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, currentTime);
                gainNodeRef.current.gain.linearRampToValueAtTime(0, currentTime + 0.5);

                setTimeout(() => {
                    if (oscillatorRef.current) {
                        oscillatorRef.current.stop();
                        oscillatorRef.current.disconnect();
                        oscillatorRef.current = null;
                    }
                }, 550);
            }
            setIsMuted(true);
        }
    };
    // Hero phase animations (0-30%)
    const heroOpacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.25, 0.30],
        [0, 1, 1, 0]
    );

    // Arrival phase animations (75-100%)
    const arrivalOpacity = useTransform(
        scrollYProgress,
        [0.70, 0.75, 1.0],
        [0, 1, 1]
    );

    const arrivalY = useTransform(
        scrollYProgress,
        [0.70, 0.80],
        [20, 0]
    );

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {/* Hero Phase (0-30%) */}
            <motion.div
                style={{ opacity: heroOpacity }}
                className="absolute inset-0"
            >
                {/* Top-left title */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12">
                    <h1 className="font-orbitron text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white">
                        {HUD_COPY.hero.title}
                    </h1>
                    <p className="font-rajdhani text-sm md:text-base lg:text-lg text-neutral-carbon mt-2 tracking-wide">
                        {HUD_COPY.hero.subtitle}
                    </p>
                </div>

                {/* Bottom-right system readout */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-right">
                    <div className="font-orbitron text-xs md:text-sm text-accent-metal tracking-widest">
                        {HUD_COPY.hero.systemReadout}
                    </div>
                </div>
            </motion.div>

            {/* Transformation Phase (30-75%) - Fleeting diagnostics */}
            {HUD_COPY.transformation.map((item, index) => (
                <DiagnosticItem
                    key={`diagnostic-${index}`}
                    item={item}
                    index={index}
                    scrollYProgress={scrollYProgress}
                />
            ))}

            {/* Arrival Phase (75-100%) */}
            <motion.div
                style={{
                    opacity: arrivalOpacity,
                    y: arrivalY,
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
            >
                <h2
                    className="font-orbitron text-3xl md:text-5xl lg:text-7xl font-black tracking-wider text-white mb-4"
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6)' }}
                >
                    {HUD_COPY.arrival.title}
                </h2>
                <p className="font-rajdhani text-lg md:text-xl lg:text-2xl text-white tracking-wide mb-8"
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6)' }}
                >
                    {HUD_COPY.arrival.credit}
                </p>

                {/* CTA - pointer-events-auto to make it clickable */}
                <a
                    href={HUD_COPY.arrival.ctaUrl}
                    className="pointer-events-auto bg-accent-metal text-white font-orbitron text-sm md:text-base px-8 py-3 border-2 border-accent-metal text-accent-metal"
                >
                    {HUD_COPY.arrival.cta}
                </a>
            </motion.div>
        </div>
    );
}
