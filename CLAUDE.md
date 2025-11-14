# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML site repository (`sor-va.com`) containing simple one-page website templates. The project consists of minimal HTML files with embedded CSS, no build process, and no backend dependencies. The goal is to make this site run completely for this directory structure with only calls to cdnjs.

### Repository Details
- **GitHub**: `git@github.com:Erehab/sor-va.com.git`
- **Main Branch**: `main`
- **Project Type**: Static HTML site

## Repository Contents

### Main Files
- `index.html` - Primary one-page site template with header, navigation, sections (home, about, services, contact), and embedded styling
- `indexSimple.html` - Simplified version of the template
- `dump/` - Archived/reference files (not part of active development)

## Development

### Viewing the Site
Since this is a static HTML project, simply open the HTML files in a browser:
```bash
open index.html
# or
open indexSimple.html
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
2. Add corresponding link in the navigation `.nav-links`
3. Follow the existing CSS patterns for padding and borders
4. Use `.container` div for content wrapper

#### Styling Changes
All CSS is in the `<style>` tag. Key design elements:
- **Container**: Max-width 960px, centered with padding
- **Colors**: Primary blue (#0d6efd), grays (#212529, #555, #666), backgrounds (#f8f9fa, #fff)
- **Typography**: System fonts with fallbacks
- **Spacing**: Uses rem units (1rem = 16px base)
- **Responsive**: Uses `auto-fit` grid and flexbox for mobile compatibility

#### Form Integration
The contact form (`id="contact"`) has placeholder `action="#"`. Connect it to a backend service by:
1. Updating the `action` attribute to point to your endpoint
2. Adjusting the `method` if needed (currently `post`)
3. Ensure field names (`name`, `email`, `message`) match your backend expectations

### Git Workflow
- Use SSH URLs (already configured as `git@github.com:Erehab/sor-va.com.git`)
- Include Claude Code attribution in commits when making changes
- Keep commits focused and descriptive

## Notes
- No package dependencies or build tools required
- No backend server needed for local development
- Fully self-contained HTML files (inline CSS)
- The `dump/` folder contains archived content and is not part of the active site
