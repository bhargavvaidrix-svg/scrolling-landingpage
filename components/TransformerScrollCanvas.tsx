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
    const [initialFrameReady, setInitialFrameReady] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);

    // Progressive image loading - show first frame immediately, load rest in background
    useEffect(() => {
        const images: HTMLImageElement[] = new Array(totalFrames);
        let loadedCount = 0;
        imagesRef.current = images;

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                    
                    // Show canvas as soon as first frame loads
                    if (index === 0) {
                        setInitialFrameReady(true);
                    }
                    resolve();
                };
                img.onerror = () => {
                    // Don't block on errors, just resolve
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                    resolve();
                };
                const frameNumber = String(index + 1).padStart(4, '0');
                img.src = `${imageFolderPath}/frame_${frameNumber}.webp`;
                images[index] = img;
            });
        };

        // Load first frame immediately (priority)
        loadImage(0).then(() => {
            // Load remaining frames in batches for better performance
            const batchSize = 5;
            const loadBatch = async (startIndex: number) => {
                const batch = [];
                for (let i = startIndex; i < Math.min(startIndex + batchSize, totalFrames); i++) {
                    if (i !== 0) { // Skip first frame, already loaded
                        batch.push(loadImage(i));
                    }
                }
                await Promise.all(batch);
                
                // Load next batch if there are more frames
                if (startIndex + batchSize < totalFrames) {
                    // Use requestIdleCallback for non-blocking loading
                    if ('requestIdleCallback' in window) {
                        (window as any).requestIdleCallback(() => loadBatch(startIndex + batchSize));
                    } else {
                        setTimeout(() => loadBatch(startIndex + batchSize), 10);
                    }
                }
            };
            
            loadBatch(1);
        });

        // Cleanup
        return () => {
            images.forEach((img) => {
                if (img) img.src = '';
            });
        };
    }, [totalFrames, imageFolderPath]);

    // Handle canvas sizing and rendering
    useEffect(() => {
        if (!initialFrameReady || !canvasRef.current) return;

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
            // Fall back to closest available frame if current isn't loaded yet
            let img = imagesRef.current[frameIndex];
            if (!img || !img.complete) {
                // Find closest loaded frame
                for (let i = frameIndex; i >= 0; i--) {
                    if (imagesRef.current[i]?.complete) {
                        img = imagesRef.current[i];
                        break;
                    }
                }
            }
            if (!ctx || !img) return;

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
    }, [initialFrameReady]);

    // Update frame based on scroll progress
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (!initialFrameReady || !canvasRef.current) return;

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

            // Try to get requested frame, fall back to closest loaded frame
            let img = imagesRef.current[frameIndex];
            if (!img || !img.complete) {
                for (let i = frameIndex; i >= 0; i--) {
                    if (imagesRef.current[i]?.complete) {
                        img = imagesRef.current[i];
                        break;
                    }
                }
            }
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
            {/* Initial loading indicator - only shows until first frame loads */}
            {!initialFrameReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
                    <div className="font-orbitron text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 tracking-wider animate-pulse">
                        INITIALIZING
                    </div>
                    <div className="w-32 sm:w-48 h-0.5 bg-neutral-carbon rounded-full overflow-hidden relative">
                        <div className="absolute h-full w-1/3 bg-accent-metal animate-pulse" />
                    </div>
                </div>
            )}

            {/* Background loading progress - subtle indicator in corner */}
            {initialFrameReady && loadProgress < 100 && (
                <div className="absolute bottom-16 sm:bottom-4 right-4 z-20 flex items-center gap-2 bg-black/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded backdrop-blur-sm">
                    <div className="w-12 sm:w-16 h-0.5 bg-neutral-carbon rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent-metal/70 transition-all duration-300"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <span className="font-rajdhani text-[10px] sm:text-xs text-neutral-400">{loadProgress}%</span>
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
                into a humanoid robot across {totalFrames} frames. The sequence is controlled by
                scrolling through the page.
            </div>
        </div>
    );
}
