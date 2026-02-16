import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Font configurations
const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
    weight: ["400", "700", "900"],
    display: "swap",
});

const rajdhani = Rajdhani({
    subsets: ["latin"],
    variable: "--font-rajdhani",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Cinematic Transformer Sequence | Scrollytelling Showcase",
    description: "An Awwwards-quality scrollytelling experience featuring a 204-frame transformer sequence. Frame-by-frame cinematic direction.",
    keywords: ["scrollytelling", "transformer", "cinematic", "animation", "framer motion", "next.js"],
    authors: [{ name: "Your Name" }],
    openGraph: {
        title: "Cinematic Transformer Sequence",
        description: "Frame-by-frame cinematic transformation",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
            <body className="font-rajdhani antialiased">
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
