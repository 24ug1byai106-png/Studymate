"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FRAME_COUNT = 120;
const currentFrame = (index: number) =>
    `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.066s.png`;

export default function ScrollySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImages(loadedImages);
                }
            };
            loadedImages.push(img);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || images.length === 0) return;

        // Handle Resize
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(Math.round(frameIndex.get()));
        };

        window.addEventListener("resize", resizeCanvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = (index: number) => {
            const img = images[index];
            if (!img) return;
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        };

        render(0);

        const unsubscribe = frameIndex.on("change", (latest) => {
            render(Math.round(latest));
        });

        return () => {
            unsubscribe();
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [images, frameIndex]);

    // Section 1: 0% to 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    // Section 2: 30% to 50%
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.55], [50, -50]);

    // Section 3: 60% to 80%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.85], [50, -50]);

    return (
        <div ref={containerRef} className="h-[500vh] w-full relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Canvas Background */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                {/* Text Overlays */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full pointer-events-none">

                    {/* Section 1 */}
                    <motion.div
                        style={{ opacity: opacity1, y: y1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center pb-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                            Vishnu Karanth
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-300 font-light flex items-center gap-3 drop-shadow-md">
                            <span>AI Developer</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>Software Enthusiast</span>
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        style={{ opacity: opacity2, y: y2 }}
                        className="absolute inset-0 flex flex-col items-start justify-center pl-4 md:pl-10"
                    >
                        <h2 className="text-4xl md:text-6xl font-semibold text-white max-w-2xl leading-tight drop-shadow-lg">
                            Building intelligent <br />systems &amp; web apps.
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-300 mt-6 max-w-xl font-light leading-relaxed drop-shadow-md">
                            I enjoy constructing automation tools and immersive digital experiences that solve real problems.
                        </p>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        style={{ opacity: opacity3, y: y3 }}
                        className="absolute inset-0 flex flex-col items-end justify-center pr-4 md:pr-10 text-right"
                    >
                        <h2 className="text-4xl md:text-6xl font-semibold text-white max-w-2xl leading-tight drop-shadow-lg">
                            Bridging AI and <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Software Development</span>.
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-300 mt-6 max-w-xl font-light leading-relaxed drop-shadow-md">
                            Crafting scalable solutions using Modern Tech Stack, Machine Learning, and Full-Stack Architecture.
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
