# Quick Start Guide

## 🚀 Running the Project

```bash
# Development
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

## 📸 Adding Frame Images

1. Place 204 images in: `public/images/transformer-sequence/`
2. Name them: `1.jpg`, `2.jpg`, ..., `204.jpg`
3. Reload the page — frames will load automatically

## ⚙️ Customization

### Change Scroll Speed
Edit `data/transformerData.ts`:
```typescript
scrollLength: '400vh' // Faster
scrollLength: '600vh' // Slower
```

### Update HUD Copy
Edit `data/transformerData.ts`:
```typescript
HUD_COPY.hero.title = 'YOUR TITLE'
HUD_COPY.arrival.credit = 'Directed by Your Name'
HUD_COPY.arrival.ctaUrl = 'https://your-site.com'
```

### Adjust Phase Timing
Edit `data/transformerData.ts`:
```typescript
HUD_PHASES.hero = { start: 0, end: 0.25 } // Shorter hero
HUD_PHASES.transformation = { start: 0.25, end: 0.80 } // Longer transformation
```

## 🎨 Design Tokens

### Colors (Tailwind)
- `bg-base-dark` → #0b0b0b
- `text-accent-metal` → #B71C1C
- `border-neutral-carbon` → #2a2a2a

### Fonts
- `font-orbitron` → Headings
- `font-rajdhani` → Body/UI

## 🔧 Troubleshooting

### Images not loading?
- Check file names: `1.jpg` not `001.jpg`
- Check path: `public/images/transformer-sequence/`
- Check console for 404 errors

### Scroll feels off?
- Adjust `scrollLength` in `transformerData.ts`
- Modify phase thresholds in `HUD_PHASES`

### Performance issues?
- Optimize images (compress JPGs)
- Reduce image dimensions (max 2560px width)
- Check DevTools Performance tab

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main orchestrator |
| `components/TransformerScrollCanvas.tsx` | Canvas renderer |
| `components/TransformerExperience.tsx` | HUD overlay |
| `data/transformerData.ts` | Configuration |
| `app/globals.css` | Global styles |

## 🎯 Next Steps

1. ✅ Add 204 frame images
2. ✅ Customize HUD copy
3. ✅ Update director credit and CTA URL
4. ✅ Test on different devices
5. ✅ Deploy to production

---

**Need help?** Check the full [walkthrough.md](file:///C:/Users/Bhargavkow/.gemini/antigravity/brain/6235392f-3a67-468f-8dd8-268ab33f2e4c/walkthrough.md) or [README.md](file:///d:/SCROLLING-LANDINGPAGE/README.md)
