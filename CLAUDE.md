# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML site repository (`sor-va.com`) containing simple one-page website templates. The project consists of minimal HTML files with embedded CSS, no build process, and no backend dependencies. The goal is to make this site run completely for this directory structure with only calls to cdnjs.

## How to manage tasks VERY IMPORTANT
Read the /_AIDocs/MIGRATION_PLAN.md file before making any changes to the project.

### Repository Details
- **GitHub**: `git@github.com:Erehab/sor-va.com.git`
- **Main Branch**: `main`
- **Project Type**: Static HTML site

## Repository Contents

### Main Files
- `index.html` - Primary one-page site template with header, navigation, sections (home, about, services, contact), and embedded styling
- `dump/` - Archived/reference files (not part of active development) Only read when requested.

## Development

### Viewing the Site
Since this is a static HTML project, simply open the HTML files in a browser or use Playwright to test.
```bash
open index.html
```

Alternatively, if you want to test with a local server:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Project Structure
The HTML is self-contained with:
- **Styling**: Embedded `<style>` tags in the HTML head (no external CSS files)
- **Layout**: Container-based responsive design with flexbox and CSS Grid
- **Components**: Navigation bar, hero section, feature cards, contact form

### Common Development Tasks

#### Adding New Sections
1. Add a new `<section>` element in the `<main>` area with a unique `id`
1. Add corresponding link in the navigation `.nav-links`
1. Follow the existing CSS patterns for padding and borders
1. Use `.container` div for content wrapper
1. Make the sections navigatable with a simple menu that goes to anchor tags on the sections

#### Styling Changes
All CSS is in the `<style>` tag. Key design elements:
- **Container**: Max-width 960px, centered with padding
- **Colors**: Primary blue (#0d6efd), grays (#212529, #555, #666), backgrounds (#f8f9fa, #fff)
- **Typography**: System fonts with fallbacks
- **Spacing**: Uses rem units (1rem = 16px base)
- **Responsive**: Uses `auto-fit` grid and flexbox for mobile compatibility

### Git Workflow
- Use SSH URLs (already configured as `git@github.com:Erehab/sor-va.com.git`)
- Include Claude Code attribution in commits when making changes
- Keep commits focused and descriptive

## Notes
- No package dependencies or build tools required
- No backend server needed for local development
- Fully self-contained HTML files (inline CSS)
- The `dump/` folder contains archived content and is not part of the active site
