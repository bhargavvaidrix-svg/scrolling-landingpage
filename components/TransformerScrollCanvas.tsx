'use client';

import { useRef, useEffect, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface TransformerScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function TransformerScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: TransformerScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);

    // Preload all frame images
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                    resolve();
                };
                img.onerror = reject;
                // Format: frame_0001.webp, frame_0002.webp, etc.
                const frameNumber = String(index + 1).padStart(4, '0');
                img.src = `${imageFolderPath}/frame_${frameNumber}.webp`;
                images[index] = img;
            });
        };

        // Load all images
        Promise.all(
            Array.from({ length: totalFrames }, (_, i) => loadImage(i))
        )
            .then(() => {
                imagesRef.current = images;
                setImagesLoaded(true);
            })
            .catch((error) => {
                console.error('Error loading frame images:', error);
            });

        // Cleanup
        return () => {
            images.forEach((img) => {
                img.src = '';
            });
        };
    }, [totalFrames, imageFolderPath]);

    // Handle canvas sizing and rendering
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            // Set canvas size with device pixel ratio for high-DPI displays
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Scale context to match
            ctx.scale(dpr, dpr);

            // Set canvas display size
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            // Redraw current frame
            drawFrame(currentFrameRef.current);
        };

        const drawFrame = (frameIndex: number) => {
            if (!ctx || !imagesRef.current[frameIndex]) return;

            const img = imagesRef.current[frameIndex];
            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

            // Clear canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Calculate object-fit: cover dimensions (fills entire canvas)
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth = canvasWidth;
            let drawHeight = canvasHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (imgRatio > canvasRatio) {
                // Image is wider - fit to height, crop sides
                drawWidth = canvasHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
            } else {
                // Image is taller - fit to width, crop top/bottom
                drawHeight = canvasWidth / imgRatio;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            // Draw image to fill entire canvas (object-fit cover)
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Initial setup
        resizeCanvas();

        // Handle window resize
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [imagesLoaded]);

    // Update frame based on scroll progress
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (!imagesLoaded || !canvasRef.current) return;

        // Map scroll progress [0..1] to frame index [0..totalFrames-1]
        const frameIndex = Math.min(
            Math.floor(latest * totalFrames),
            totalFrames - 1
        );

        // Only redraw if frame changed
        if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const img = imagesRef.current[frameIndex];
            if (!img) return;

            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

            // Clear and redraw
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Calculate object-fit: cover (fills entire canvas)
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth = canvasWidth;
            let drawHeight = canvasHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (imgRatio > canvasRatio) {
                // Image is wider - fit to height, crop sides
                drawWidth = canvasHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
            } else {
                // Image is taller - fit to width, crop top/bottom
                drawHeight = canvasWidth / imgRatio;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    });

    return (
        <div className="absolute inset-0 w-full h-full bg-base-dark z-0">
            {/* Loading indicator */}
            {!imagesLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="font-orbitron text-2xl md:text-4xl text-white mb-4 tracking-wider">
                        LOADING SEQUENCE
                    </div>
                    <div className="w-64 h-1 bg-neutral-carbon rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent-metal transition-all duration-300"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <div className="font-rajdhani text-lg text-neutral-carbon mt-2">
                        {loadProgress}%
                    </div>
                </div>
            )}

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                aria-hidden="true"
            />

            {/* Screen reader description */}
            <div className="sr-only">
                A cinematic transformation sequence showing a mechanical truck transforming
                into a humanoid robot across 204 frames. The sequence is controlled by
                scrolling through the page.
            </div>
        </div>
    );
}
