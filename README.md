# Spine and Orthopedic Rehab - Static Site

A clean, self-contained static HTML site for a physical therapy clinic.

## Stack

- **HTML5**: Single-page responsive template
- **CSS**: UIKit 2 framework (styling only, no UIKit JS)
- **JavaScript**: Minimal vanilla JS + Glide.js carousel (CDN)
  - **Glide.js 3.2.0**: Professional Services carousel with true infinite looping
  - **Vanilla JS**: ScrollSpy (IntersectionObserver), match heights
- **Maps**: Google Maps embedded iframe (no API key required)

## Architecture

- **Single file**: `public/index.html` (fully self-contained)
- **No build process**: Open in browser directly
- **Minimal dependencies**: Only Glide.js for carousel (all other JS is vanilla)
- **Local images**: All images stored in `public/img/` directory
- **No backend**: Completely static—phone links and map links work client-side
- **Clean structure**: Production files in `public/`, development files in root

### Carousel Implementation

- **Glide.js** for infinite-looping carousel (supports true wrapping, unlike Glider.js)
- Nested structure: Controls + carousel wrapped in `position: relative` container
- 90% width centered track allows arrows to sit outside without overflow
- Responsive: 4 slides (desktop) → 3 (tablet) → 2 (mobile) → 1 (small)

## Key Features

- Responsive design (mobile, tablet, desktop breakpoints)
- Hero section with static image + text overlay
- Service carousel and grid
- Patient testimonials
- Contact information with Google Maps
- Smooth scroll animations

## Important Notes

### Stock Images
⚠️ **Stock photos are licensed to E-rehab**. Images to check/replace:
- Service/testimonial images: Various `stock-*.jpg` files

Check licensing before commercial use or republishing.

**Note**: Hero image (`spine-ortho-roanoke1.jpg`) is from the clinic.

### Analytics
- **No analytics installed** (Clicky was removed)
- GitHub provides basic deployment analytics if hosted there
- Can easily add Google Analytics, Hotjar, etc. if needed

### Version History
- `public/index.html`: Production version (Glide.js, vanilla JS only)
- `original_index.html`: Original UIKit 2 JS version (jQuery, UIKit slider) - development reference
- `noUi.html`: Alternative version without UIKit - development reference
- `nojs.html`: No JavaScript version - development reference

### Google Maps
- Embedded iframe—**no API key needed**
- Location: 1919 Electric Rd SW, Roanoke, VA 24018
- Interactive zoom/pan functionality included

## Development

### Local Testing
```bash
# Production version
open public/index.html

# Development versions (for local comparison)
open original_index.html
open noUi.html
open nojs.html
```

### Making Changes
- Edit `public/index.html` directly
- CSS changes: Add to `<style>` tag in `<head>`
- Images: Add files to `public/img/` and reference as `img/filename.ext?v=1`
- Use `?v=1` for cache busting when updating existing files

## Deployment

Works on any static host:
- **GitHub Pages**: Point to `public/` directory
- **Netlify**: Set publish directory to `public`
- **Vercel**: Set output directory to `public`
- **Firebase Hosting**: Configure `public` as hosting directory
- **Traditional web hosting (FTP)**: Upload contents of `public/` directory

Just configure your hosting to serve from the `public/` directory.

## Credits

Comprehensive migration and optimization completed with **Claude Code** (Anthropic's CLI for Claude).

Cleanup work included:
- Removal of WordPress cruft (~121 lines)
- Dead CSS selectors elimination
- Custom JavaScript removal
- Image migration to local storage
- HTML reformatting and documentation
- Performance optimization

## Files

```
.
├── public/                 # Production website files
│   ├── index.html          # Main production site (Glide.js carousel)
│   ├── output.min.css      # UIKit 2 CSS framework
│   ├── fonts/              # Local web fonts (Lato, Oswald)
│   └── img/                # Local images
│       ├── logo.svg
│       ├── spine-ortho-roanoke1.jpg
│       ├── stock-*.jpg     # Stock photos
│       └── [other images]
├── _AIDocs/                # AI planning and migration documentation
│   ├── MIGRATION_PLAN.md
│   └── [other docs]
├── original_index.html     # Original UIKit JS version (dev reference)
├── noUi.html              # No UIKit version (dev reference)
├── nojs.html              # No JavaScript version (dev reference)
├── CLAUDE.md              # Project instructions for Claude Code
├── README.md              # This file
└── test-performance.md    # Performance testing documentation
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested on mobile, tablet, desktop
- IE support: Basic (HTML5 shiv included)

## License

Site content and design © Spine and Orthopedic Rehab
Stock images: Licensed to E-rehab (see licensing docs)

---

**Last updated**: 2024-11-14
**Migration complete**: All external dependencies resolved, zero custom JS files