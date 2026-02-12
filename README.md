# Cinematic Transformer Scrollytelling Showcase

A production-ready, Awwwards-quality scrollytelling experience featuring a 204-frame transformer sequence. Built with Next.js 14, Framer Motion, and Canvas API.

## 🚀 Features

- **High-DPI Canvas Rendering**: Pixel-perfect frame rendering optimized for Retina and 4K displays
- **Synchronized Scroll Architecture**: Single scroll source drives both canvas frames and HUD transitions
- **Cinematic Pacing**: 500vh scroll length creates deliberate, aggressive pacing
- **Minimal HUD Design**: Edge-aligned, fleeting diagnostics that enhance without obstructing
- **Accessibility**: Screen reader support, keyboard navigation, and reduced-motion fallback

## 📋 Prerequisites

- Node.js 18+ and npm
- Frame images (204 frames) placed in `public/images/transformer-sequence/` named `1.jpg` through `204.jpg`

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main orchestrator
│   └── globals.css         # Global styles
├── components/
│   ├── TransformerScrollCanvas.tsx   # Canvas renderer
│   ├── TransformerExperience.tsx     # HUD overlay
│   ├── Navbar.tsx
│   ├── SpecsGrid.tsx
│   ├── Features.tsx
│   └── Footer.tsx
├── data/
│   └── transformerData.ts  # Configuration & content
└── public/
    └── images/
        └── transformer-sequence/
            ├── 1.jpg
            ├── 2.jpg
            └── ... (204 frames total)
```

## 🎨 Design Tokens

- **Colors**:
  - `base-dark`: #0b0b0b
  - `accent-metal`: #B71C1C (deep red)
  - `neutral-carbon`: #2a2a2a
- **Fonts**:
  - Headings: Orbitron (Google Fonts)
  - Body/UI: Rajdhani (Google Fonts)

## ⚙️ Configuration

Edit `data/transformerData.ts` to customize:
- Scroll length (default: 500vh)
- HUD phase thresholds
- Copy text and transitions
- Specs and features content

## 🎯 Key Implementation Details

### Master Scroll Architecture
- `app/page.tsx` owns a single `useScroll` hook
- `scrollYProgress` MotionValue passed to all children
- No component uses its own scroll source

### Canvas Rendering
- `devicePixelRatio` scaling for high-DPI displays
- Object-fit contain logic for responsive scaling
- Frame preloading with progress indicator
- Efficient redraw only when frame changes

### HUD Phases
1. **Hero (0-30%)**: Title and system readout
2. **Transformation (30-75%)**: Fleeting diagnostics
3. **Arrival (75-100%)**: Declaration and CTA

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-optimized interactions
- Adaptive typography and spacing

## ♿ Accessibility

- Canvas has `aria-hidden="true"`
- Screen reader description provided
- Keyboard navigation support
- Reduced-motion media query support
- WCAG AA contrast compliance

## 🚀 Performance

- Optimized image preloading
- Canvas rendering with RAF
- Minimal re-renders
- Efficient scroll event handling

## 📄 License

All rights reserved.

---

**Built with precision. Designed for impact.**
