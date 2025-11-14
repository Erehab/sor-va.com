# Spine and Orthopedic Rehab - Static Site

A clean, self-contained static HTML site for a physical therapy clinic.

## Stack

- **HTML5**: Single-page responsive template
- **CSS**: UIKit 2.26.3 framework (CDN) + inline custom styles
- **JavaScript**: jQuery 3.7.1 (modern, compatible with UIKit 2)
  - slider.min.js, slideshow.min.js components
  - matchHeight.js for equal-height grid columns
- **Maps**: Google Maps embedded iframe (no API key required)

## Architecture

- **Single file**: `index.html` (614 lines, fully self-contained)
- **No build process**: Open in browser directly
- **Local images**: All images stored in `/img/` directory
- **No backend**: Completely static—phone links and map links work client-side

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

### jQuery
- Using jQuery 3.7.1 (modern, current)
- Fully compatible with UIKit 2.26.3
- No deprecated features used

### Google Maps
- Embedded iframe—**no API key needed**
- Location: 1919 Electric Rd SW, Roanoke, VA 24018
- Interactive zoom/pan functionality included

## Development

### Local Testing
```bash
open index.html
```

### Making Changes
- Edit `index.html` directly
- CSS changes: Add to `<style>` tag in `<head>`
- Images: Add files to `/img/` and reference as `img/filename.ext?v=1`
- Use `?v=1` for cache busting when updating existing files

## Deployment

Works on any static host:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting (FTP)

Just upload the entire directory.

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
├── index.html              # Main site (single page)
├── output.min.css          # UIKit 2.26.3 framework
├── img/                    # Local images
│   ├── logo.svg
│   ├── spine-ortho-roanoke1.jpg
│   ├── stock-*.jpg        # Stock photos
│   └── [other images]
└── README.md              # This file
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