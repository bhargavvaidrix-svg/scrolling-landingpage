import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'base-dark': '#0b0b0b',
                'accent-metal': '#B71C1C',
                'accent-plasma': '#FF2A2A',
                'neutral-carbon': '#2a2a2a',
                'surface-carbon': '#1a1a1a',
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                rajdhani: ['Rajdhani', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'neon': '0 0 10px rgba(255, 42, 42, 0.5), 0 0 20px rgba(255, 42, 42, 0.3)',
                'neon-strong': '0 0 15px rgba(255, 42, 42, 0.7), 0 0 30px rgba(255, 42, 42, 0.5)',
            },
        },
    },
    plugins: [],
};

export default config;
