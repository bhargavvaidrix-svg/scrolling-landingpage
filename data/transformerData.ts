// Configuration for the transformer sequence
export const SEQUENCE_CONFIG = {
    totalFrames: 100, // Updated to match available frames
    imageFolderPath: '/images', // Frames are directly in /images
    imageFormat: 'webp', // Using WebP format
    scrollLength: '500vh', // Cinematic pacing - adjustable
    posterFrame: 1, // Fallback/loading frame
} as const;

// HUD phase thresholds (scroll progress 0-1)
export const HUD_PHASES = {
    hero: { start: 0, end: 0.30 },
    transformation: { start: 0.30, end: 0.75 },
    arrival: { start: 0.75, end: 1.0 },
} as const;

// HUD content and copy
export const HUD_COPY = {
    hero: {
        title: '',
        subtitle: '',
        systemReadout: '',
    },
    transformation: [] as { text: string; progress: number; duration: number }[],
    arrival: {
        title: 'CINEMATIC TRANSFORMATION',
        credit: 'Directed by BHARGAV',
        cta: 'View Portfolio',
        ctaUrl: '#', // Update with actual portfolio URL
    },
} as const;

// Specs for the SpecsGrid component
export const SPECS = [
    { label: 'Total Frames', value: '100' },
    { label: 'Scroll Length', value: '500vh' },
    { label: 'Framework', value: 'Next.js 14' },
    { label: 'Animation', value: 'Framer Motion' },
    { label: 'Rendering', value: 'Canvas API' },
    { label: 'Design', value: 'Orbitron + Rajdhani' },
] as const;

// Features for the Features component
export const FEATURES = [
    {
        title: 'High-DPI Canvas Rendering',
        description: 'Pixel-perfect frame rendering optimized for Retina and 4K displays using devicePixelRatio scaling.',
        image: '/images/frame_0001.webp',
    },
    {
        title: 'Synchronized Scroll Architecture',
        description: 'Single scroll source drives both canvas frames and HUD transitions for perfect synchronization.',
        image: '/images/frame_0030.webp',
    },
    {
        title: 'Cinematic Pacing',
        description: '500vh scroll length creates deliberate, aggressive pacing that commands attention.',
        image: '/images/frame_0060.webp',
    },
    {
        title: 'Minimal HUD Design',
        description: 'Edge-aligned, fleeting diagnostics that enhance without obstructing the transformation.',
        image: '/images/frame_0090.webp',
    },
] as const;
