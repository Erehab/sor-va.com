# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML site repository (`sor-va.com`) containing simple one-page website templates. The project consists of minimal HTML files with embedded CSS, no build process, and no backend dependencies.

**Structure:**
- `public/` - Production website files (index.html, CSS, fonts, images)
- Root - Development files, documentation, and AI planning docs
- The goal is to make this site run completely with only CDN calls

## How to manage tasks VERY IMPORTANT
Read the /_AIDocs/MIGRATION_PLAN.md file before making any changes to the project.

### Repository Details
- **GitHub**: `git@github.com:Erehab/sor-va.com.git`
- **Main Branch**: `main`
- **Project Type**: Static HTML site

## Repository Contents

### Production Files (public/)
- `public/index.html` - Production one-page site (Glide.js carousel, vanilla JS)
- `public/output.min.css` - UIKit 2 CSS framework
- `public/fonts/` - Local web fonts (Lato, Oswald)
- `public/img/` - All images (logo, hero, stock photos)

### Development Files (root)
- `original_index.html` - Original UIKit JS version (dev reference)
- `noUi.html` - Alternative version without UIKit (dev reference)
- `nojs.html` - No JavaScript version (dev reference)
- `_AIDocs/` - AI planning and migration documentation

## Development

### Viewing the Site
Since this is a static HTML project, simply open the HTML files in a browser or use Playwright to test.
```bash
# Production version
open public/index.html

# Development versions
open original_index.html
open noUi.html
open nojs.html
```

Alternatively, if you want to test with a local server:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000/public/
```

### Project Structure
The production HTML (`public/index.html`) uses:
- **Styling**: UIKit 2 CSS framework (`public/output.min.css`) + inline `<style>` tags
- **Layout**: UIKit grid system with responsive design
- **Components**: Navigation bar, hero section, Glide.js carousel, testimonials, contact form
- **Images**: Local images in `public/img/`
- **Fonts**: Local fonts in `public/fonts/`

### Common Development Tasks

#### Making Changes to Production Site
1. Edit `public/index.html` directly
1. Add images to `public/img/` and reference as `img/filename.ext?v=1`
1. CSS changes: Add to `<style>` tag in `<head>` section
1. Use `?v=1` query string for cache busting when updating files

#### Adding New Sections
1. Add a new `<section>` element in the `<main>` area with a unique `id`
1. Add corresponding link in the navigation
1. Follow the existing UIKit CSS patterns
1. Make sections navigatable with anchor tags

### Git Workflow
- Use SSH URLs (already configured as `git@github.com:Erehab/sor-va.com.git`)
- Include Claude Code attribution in commits when making changes
- Keep commits focused and descriptive

## Notes
- No package dependencies or build tools required
- No backend server needed for local development
- Fully self-contained HTML files (inline CSS)
- The `dump/` folder contains archived content and is not part of the active site
