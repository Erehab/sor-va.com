# Static HTML Site Migration Process

A standardized process for converting WordPress-exported one-page sites into clean, self-contained static HTML repositories.

## Overview

This document describes the step-by-step process for migrating a WordPress-exported HTML site to a clean, static, locally-hosted version. The process assumes:

- **Starting point:** `index.html` exported from WordPress (contains all site content)
- **Supporting files:** `/dump/` directory with browser-saved assets (images, CSS, JS, icons)
- **Goal:** Clean, self-contained HTML file with all external dependencies resolved locally

## Quick Start Checklist

For a new site, follow these phases in order:

- [ ] **PHASE 0:** Document current state and gather assets
- [ ] **PHASE 1:** Migrate all images to local `/img/` directory
- [ ] **PHASE 2:** Remove WordPress-specific code
- [ ] **PHASE 3:** Audit and remove unused JavaScript files
- [ ] **PHASE 4:** Resolve external components (maps, embeds, etc.)
- [ ] **PHASE 5:** Remove broken links and dead code
- [ ] **PHASE 6:** Validate CSS classes and styling
- [ ] **PHASE 7:** Final cleanup and optimization
- [ ] **PHASE 8:** Custom JavaScript removal (if applicable)
- [ ] **PHASE 9:** Mobile responsiveness enhancements

---

## Phase Details

### PHASE 0: Document Current State & Asset Collection

**Goal:** Understand what you're working with and establish a reference.

**Steps:**
1. Open the exported `index.html` in a browser to see what currently works
2. Create a `/dump/` directory as a reference archive
3. Extract any CSS/JS/images from the WordPress export
4. Note all external resources being loaded (CDNs, images, APIs)

**Checklist:**
- [ ] `index.html` opens and displays correctly
- [ ] `/dump/` directory created with reference copies
- [ ] All external resources identified and catalogued

**Key Points:**
- The `/dump/` directory serves as a backup and reference for finding migrated files
- Keep this until the migration is complete, then remove it

---

### PHASE 1: Image Migration (External → Local)

**Goal:** Eliminate all external image dependencies by downloading and hosting images locally.

**What to Look For:**
Images come from multiple sources in WordPress exports:
- External CDN: `imgix.net`, `stock.imgix.net`, domain-specific CDNs
- Favicons and touch icons referenced in `<head>`
- Background images in CSS (`background-image: url()`)
- Inline `<img>` tags

**Migration Steps:**

1. **Identify all external image URLs**
   ```bash
   # Find image URLs in HTML
   grep -n "http.*\(jpg\|png\|svg\|gif\|webp\)" index.html

   # Find CSS background images
   grep -n "background-image" index.html
   ```

2. **Download images locally**
   ```bash
   # Create img directory
   mkdir -p img

   # Download individual images
   curl -o img/filename.ext "https://external-url/image"

   # For multiple similar URLs, extract and batch download
   ```

3. **Update HTML references**
   - Change `src="https://external-url/image.jpg"` to `src="img/image.jpg?v=1"`
   - Change `background-image: url(https://...)` to `background-image: url(img/filename.ext?v=1)`
   - Use query string `?v=1` for cache busting

4. **Verify all images load**
   - Open `index.html` in a browser
   - Confirm all images display correctly
   - Check browser DevTools for 404 errors

**Gotchas:**

- **Image naming:** Use simple, consistent naming (e.g., `stock-{id}.jpg` or `logo.svg`)
  - WordPress exports often have long, complex names - rename them!

- **Image formats:** Some URLs don't show file extensions
  - `stock.imgix.net/12345?w=500` - need to save as `.jpg` and test
  - Use file size to determine if download was successful

- **Duplicate images:** WordPress often serves same image from multiple URLs
  - Download once, reference multiple times in HTML

- **Responsive images:** Some WordPress setups use `srcset` for multiple resolutions
  - Keep it simple: use one good-quality image for static sites

- **Favicons:** Often in `/files/mobile/` or similar paths on the old WordPress site
  - Download all variants: favicon.ico, touch icons, etc.
  - These don't prevent the site from working but are nice to have

**Before/After Example:**
```html
<!-- BEFORE -->
<img src="https://blogsdir.imgix.net/2452/files/image/bigstock-Man-wearing-elbow-brace.png?fit=crop&w=600">

<!-- AFTER -->
<img src="img/elbow-brace.png?v=1">
```

---

### PHASE 2: Remove WordPress-Specific Code

**Goal:** Clean out WordPress framework code that serves no purpose in a static HTML file.

**What to Remove:**

1. **WordPress Emoji System** (Lines in `<head>` and styles)
   - Emoji detection JavaScript: `window._wpemojiSettings`
   - Emoji CSS classes: `.wp-smiley`, `.emoji`
   - External script load from `s.w.org`
   - **Why:** Static sites don't need emoji polyfills

2. **WordPress REST API Meta Links** (In `<head>`)
   - `<link rel="https://api.w.org/">`
   - `<link rel="alternate" title="JSON">`
   - `<link rel="canonical">` (points to old WordPress domain)
   - oEmbed discovery links
   - **Why:** These link to the old WordPress backend that no longer exists

3. **WordPress Body Classes** (On `<body>` tag)
   - Remove: `wp-singular`, `page-template-default`, `page-id-*`, `wp-theme-*`
   - Keep: Layout classes like `uk-height-1-1`, page state like `page-home`, browser markers like `desktop chrome`
   - **Why:** These are theme-specific selectors that have no CSS defined

4. **Commented Old Code**
   - Old menu structures: `<!-- <div class="menu-prim-container">...</div> -->`
   - Dead links to `1000128.ptclinicng.com`
   - Test/debug code
   - **Why:** Dead code is technical debt and confusing

**How to Find and Remove:**

```bash
# Find WordPress-specific strings
grep -n "wp-emoji\|api.w.org\|wp-singular\|page-id-" index.html

# Verify removal after cleanup
grep -c "wp-" index.html  # Should return 0
```

**Before/After Examples:**

```html
<!-- BEFORE: Body tag with WordPress classes -->
<body class="home wp-singular page-template-default page page-id-3 wp-theme-gfive wp-child-theme-1000128themeG5 uk-height-1-1 page-home desktop chrome">

<!-- AFTER: Clean body tag -->
<body class="uk-height-1-1 page-home desktop chrome">
```

**Gotchas:**

- **CSS might reference these classes:** Check that removing WordPress classes doesn't break styling
  - Usually it won't since WordPress classes don't have CSS definitions in static sites
  - Test by opening the page in a browser after removal

- **Check for partial matches:** Sometimes `page-id-3` or `page-template-default` appears in comments or data attributes
  - Make sure you're only removing actual WordPress cruft, not legitimate code

---

### PHASE 3: JavaScript Audit & Cleanup

**Goal:** Identify and remove unused JavaScript files while keeping essential functionality.

**Step 1: Inventory All JavaScript**

List all `<script>` tags:
```bash
grep -n "<script" index.html
```

You'll typically find:
- **CDN libraries:** jQuery, UIKit, other frameworks (keep if used)
- **Local custom files:** g5_master.js, nlSignup.js, etc. (audit carefully)
- **Inline scripts:** Analytics, tracking, config (review each one)

**Step 2: Analyze Each Local JavaScript File**

For each custom JS file, determine:

1. **What does it do?** (Read the file or comments)
2. **Is it used?** (Search for its data attributes or function calls in HTML)
3. **What does it depend on?** (External APIs, libraries, HTML elements)

**Example Audit Template:**

```
File: g5_master.js
- Function: data-g5-phonelink → Click-to-call tracking
  Status: USED (4 occurrences in HTML) → KEEP

- Function: g5-gmap → Google Maps initialization
  Status: NOT USED (0 matches, but g5-gmap element exists)
  Issues: EXPOSED API KEY in code
  Action: REMOVE & REPLACE with embedded map

- Function: g5-loadreview → Review modal loader
  Status: NOT USED (all review references commented out)
  Action: REMOVE
```

**Step 3: Verify Usage in HTML**

```bash
# For each JavaScript handler, search HTML for usage
grep -n "data-g5-phonelink\|g5-totop\|g5-gmap" index.html

# Check for any references to the JavaScript file itself
grep -n "g5_master\|nlSignup" index.html
```

**Step 4: Remove Unused Files**

Delete files from both:
1. The filesystem (if local files exist)
2. The `<script>` tag references in HTML

**Gotchas:**

- **Hidden dependencies:** A JavaScript file might be required by another file you want to keep
  - Check for `$.getScript()` or other dynamic script loading

- **Data attributes without HTML matches:** Sometimes the HTML is commented out but the JS remains
  - Search for commented code: `<!-- ... data-g5-...`
  - If all uses are commented, the JS is dead code

- **API keys in code:** Common in WordPress sites
  - Look for: `api_key`, `apiKey`, `key=`, `.key`
  - **Never commit exposed API keys** - replace with secure alternatives
  - Example: Google Maps API key exposure

- **External dependencies:** JavaScript might call external APIs
  - Search for `$.ajax()`, `fetch()`, `getScript()` with external URLs
  - These won't work without the backend (ptclinic.com API calls, etc.)

- **jQuery plugins:** Verify jQuery version compatibility
  - WordPress exports often include jQuery 1.12 (very old)
  - Some plugins require newer jQuery
  - Keep `jquery-migrate.min.js` for compatibility if using old plugins

**Before/After:**

```html
<!-- BEFORE: Multiple script tags, some unused -->
<script src="g5_master.js"></script>
<script src="nlSignup.js"></script>
<script src="recovery-process.js"></script>

<!-- AFTER: Only essential scripts -->
<script src="jquery.min.js"></script>
<script src="uikit.min.js"></script>
```

---

### PHASE 4: Resolve External Components

**Goal:** Replace custom/broken external components with working alternatives.

**Common Issues:**

1. **Custom Maps (G5 framework maps, etc.)**
   - **Problem:** Custom JavaScript requires API keys or external services
   - **Solution Options:**
     - Option A: Embedded Google Map iframe (simple, no API key needed)
     - Option B: OpenStreetMap + Leaflet (open source, no key)
     - Option C: Static map image (no interactivity but simplest)
   - **Choose based on:** How much interactivity is needed?

2. **Newsletter Signup Forms**
   - **Problem:** Form submits to old WordPress backend that no longer exists
   - **Solution:** Remove the form or convert to a mailto: link
   - Example: `<form action="mailto:contact@example.com">` (no backend needed)

3. **Appointment Request Systems**
   - **Problem:** Modal pops up and tries to load external iframe from ptclinic.com
   - **Solution:** Replace with simple contact form or button link to external scheduler

**Implementation Example: Maps**

Replace:
```html
<!-- Before: Custom G5 map component with exposed API key -->
<div class='g5-gmap' data-practice_id='128'></div>
```

With:
```html
<!-- After: Embedded Google Map iframe -->
<iframe
  src="https://maps.google.com/maps?q=37.247101,-80.032973&z=15&output=embed"
  width="100%" height="250" style="border:0;"
  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

**Gotchas:**

- **Google Maps embed vs API:** Embedded maps don't require an API key (safer!)
  - Use `maps.google.com/maps?q=...&output=embed`
  - NOT the JavaScript API which requires keys

- **Coordinates:** Keep the original coordinates/address for accuracy
  - Find the coordinates from the old site or use the physical address

- **Testing iframes:** Some environments block iframes
  - Test locally first
  - Verify `referrerpolicy` and `allow` attributes are set correctly

---

### PHASE 5: Remove Broken Links & Dead Code

**Goal:** Clean up non-functional links and orphaned code.

**What to Look For:**

1. **Broken Service Links**
   - `href="/#/"` or `href="#service-name"` that don't actually navigate
   - Comment out or convert to `<p>` or `<span>` tags if they're just labels

2. **Analytics & Tracking**
   - Clicky Analytics: `clicky_site_ids.push(...)`
   - Google Analytics (if broken/outdated)
   - Remove entirely - they won't work without backend

3. **External Script Loaders**
   ```javascript
   // Dead code - tries to load from old domain
   $.getScript("https://ptclinic.com/site/script.js");
   ```

4. **Commented Out HTML Blocks**
   - Large blocks of commented HTML from old menu/layout
   - If they're just reference/documentation, move to `/dump/` directory
   - Otherwise, remove them

**Search Commands:**

```bash
# Find all analytics/tracking code
grep -n "clicky\|analytics\|tracking" index.html

# Find script loaders trying to fetch external files
grep -n "getScript\|$.ajax\|fetch.*http" index.html

# Find placeholder links
grep -n "href=\"/#\|href=\"#\"" index.html
```

**Gotchas:**

- **Google Analytics:** Sometimes you WANT to keep this for a live site
  - Only remove if the site won't be live
  - If keeping it, make sure it uses a valid tracking ID

- **Comment cleanup:** Be careful not to remove important documentation
  - If a comment documents a design decision, keep it
  - If a comment is dead code, remove it

- **Service placeholders:** Check context - is this meant to be a button or just a label?
  - If meant to be a button, replace broken link with real functionality
  - If just a label/text, convert to proper HTML tag

---

### PHASE 6: Validate CSS & Styling

**Goal:** Ensure all CSS classes used in HTML are properly defined and there are no orphaned styles.

**Step 1: Extract All Classes Used in HTML**

```bash
# Find all class attributes
grep -o 'class="[^"]*"' index.html | sed 's/class="//g' | sed 's/"//g' | tr ' ' '\n' | sort -u > used-classes.txt
```

**Step 2: Extract All Defined CSS Classes**

```bash
# From output.min.css (minified, so harder to parse)
# Manual review or use a CSS parser to extract defined classes

# From inline styles in <style> tag
grep -o 'class="[^"]*"' index.html | ... (same as above, plus any CSS-based selectors)
```

**Step 3: Compare**

- Classes used in HTML but not defined in CSS = potential styling issues
- Classes defined in CSS but never used = dead CSS (can remove for optimization)

**Gotchas:**

- **UIKit framework:** Has 1,000+ predefined classes
  - Don't remove these just because you don't use them all
  - The framework provides them for flexibility

- **Browser detection classes:** Intentional markers like `ie7`, `chrome`, `desktop`
  - These might not have CSS definitions - they're for JavaScript
  - Leave them alone

- **JavaScript hooks:** Classes used only by JavaScript (`data-*` alternatives or semantic classes)
  - Example: `g5-totop` - triggers scroll behavior, no CSS needed
  - Won't have CSS definitions - that's normal

- **Combined classes:** Some classes work together
  - `uk-flex` + `uk-flex-left` + `uk-flex-center`
  - Check context, not in isolation

- **Vendor prefixes:** `-webkit-`, `-moz-` prefixes in CSS
  - These are necessary for browser compatibility
  - Don't remove them

**What's Normal vs What's a Problem:**

```
✅ Normal (no action needed):
- Browser detection: ie, chrome, desktop
- JavaScript hooks: g5-totop, g5-gmap
- UIKit utilities: uk-flex, uk-margin
- Custom semantic: page-home, tm-title

⚠️ Investigate but probably OK:
- Custom combinations: tm-background-gradient-services
- Missing in CSS but visually working: CSS might be elsewhere

❌ Problem (should fix):
- Typos: "calss" instead of "class"
- Orphaned classes: Defined in CSS but never used (bloat)
- Dead theme remnants: wp-theme-* if removed in PHASE 2
```

---

### PHASE 7: Final Cleanup & Optimization

**Goal:** Trim unnecessary files and prepare for production.

**Cleanup Tasks:**

1. **Remove `/dump/` directory**
   - All useful files should be migrated by now
   - This was just a working reference
   - Removing it reduces repository bloat

2. **Remove unused CSS files**
   - Example: `recovery-process.css` if no styles are used from it
   - Check: `grep -f recovery-process.css index.html` (will show 0 matches if unused)

3. **Add cache busting to critical assets**
   - Images: `img/logo.svg?v=1`
   - CSS: `output.min.css?v=1` (if self-hosted)
   - This forces browsers to reload if content changes

4. **Verify performance**
   - Check file sizes
   - Confirm all assets load
   - Test on multiple browsers

**Final Verification:**

```bash
# Verify no external dependencies remain (except CDNs, which is OK)
grep -n "http://\|https://" index.html | grep -v "cdnjs\|cdn\|google\|youtube\|fonts\.googleapis"

# Count total size
du -sh .

# Verify site works
# Option 1: Open in browser
open index.html

# Option 2: Python local server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**Gotchas:**

- **External CDNs are OK:** jQuery, UIKit, Google Fonts, YouTube embeds are fine
  - These are standard, trusted services
  - The goal is to eliminate custom external services and old WordPress backends

- **Cache busting:** Version numbers should increment when content changes
  - Start with `?v=1`, increment as you update
  - This prevents browsers from serving stale cached versions

- **Testing without internet:** If you need to work offline, download CDN libraries locally
  - But for most cases, CDN loading is preferable (updates automatically, faster)

---

### PHASE 8: Custom JavaScript Removal (Optional)

**Goal:** Eliminate unnecessary custom JavaScript files, replacing with native APIs or removing entirely.

**Process:**
1. Audit all local custom JS files for actual usage in HTML
2. Search for data attributes and function calls
3. Remove unused files and corresponding `<script>` references
4. Replace removed functionality with native browser APIs (e.g., `window.scrollTo()` for smooth scroll)

**Example:** Remove g5_master.js → native `tel:` links handle phone functionality, `window.scrollTo()` handles scroll-to-top.

---

### PHASE 9: Mobile Responsiveness Enhancements

**Goal:** Ensure critical content visible on mobile, improve touch experience.

**Checklist:**
- Test header/nav visibility on mobile (logo, contact info)
- Verify form inputs are touch-friendly (minimum 44px tap targets)
- Check mobile menu navigation
- Ensure buttons/CTAs visible and clickable on small screens
- Test image responsiveness

**Example: Mobile Header Fix**
```html
<!-- Desktop: Contact info hidden on mobile -->
<div class="uk-hidden-small">Address & phone here</div>

<!-- Mobile: Contact info visible on mobile -->
<div class="uk-visible-small">
  Address with map link
  Phone number (tel: link)
  Full-width logo
</div>
```

**UIKit Visibility Classes:**
- `uk-visible-small` - Only show on small screens
- `uk-hidden-small` - Hide on small screens
- Combine with grid classes for responsive layouts

---

## Common Gotchas Across All Phases

### 1. **WordPress Export Quirks**

- **Long URLs:** WordPress often exports very long image URLs with parameters
  - Example: `image.jpg?fit=crop&auto=compress&w=600`
  - Strip the parameters when saving locally, they're not needed

- **Absolute vs relative paths:** Check if links are absolute (`https://...`) or relative (`/files/...`)
  - Both need to be converted to relative local paths (`img/filename.ext`)

- **Hidden WordPress classes:** Some WordPress styles are baked into themes as inline styles
  - Not all styling comes from CSS files
  - Be thorough when searching for style references

### 2. **Image Format Issues**

- **WebP conversion:** Some CDNs serve `.webp` format
  - For simplicity, convert to `.jpg` or `.png`
  - Not all browsers support WebP (though most do now)

- **SVG files:** Often have complex formatting, especially exported from design tools
  - Minify SVG files to reduce size: use online SVG minifiers
  - Test that SVG renders correctly after minification

### 3. **CSS Framework Assumptions**

- **Framework-specific patterns:** The site might assume a specific theme/framework
  - Example: UIKit classes like `uk-flex`, `uk-grid`
  - Keep the entire framework loaded via CDN - removing parts breaks styling

- **Responsive design:** WordPress exports often include mobile-responsive styles
  - Don't remove media queries even if they look unused
  - They're critical for mobile experience

### 4. **JavaScript Compatibility**

- **jQuery versions:** WordPress often uses very old jQuery (1.12.x from 2016)
  - Modern features won't work, but existing code will
  - If upgrading jQuery, must test thoroughly (breaking changes between versions)

- **Callback timing:** Some scripts depend on document ready events
  - Ensure scripts are loaded after DOM is ready
  - Inline scripts should be at bottom of `<body>`, not `<head>`

### 5. **API Key Exposure**

- **Search thoroughly:**
  ```bash
  grep -i "key\|token\|secret\|api" index.html g5_master.js nlSignup.js
  ```

- **Never commit API keys** - remove them immediately

- **Replace with alternatives:**
  - Google Maps API key → Embedded Google Map iframe
  - Newsletter service key → Simple contact form or email link
  - Tracking API → Remove entirely (or use privacy-respecting alternative)

### 6. **Testing & Validation**

- **Visual inspection:** Open in multiple browsers, check responsive design
- **Console errors:** Check DevTools console for JavaScript errors (grep helps find root causes)
- **Link testing:** Click all links to verify they work or are safely disabled
- **Performance:** Use browser DevTools to check load times and file sizes

---

## File Structure at Completion

```
.
├── index.html                  # Main single-page site (cleaned & optimized)
├── img/                        # All images migrated here
│   ├── logo.svg
│   ├── logo-white.svg
│   ├── favicon.ico
│   ├── stock-*.jpg            # Stock photos
│   └── ...other images
├── output.min.css             # CSS framework (CDN or local)
└── (any other local CSS/JS files needed)

NOT INCLUDED:
- /dump/                       # Removed after migration complete
- unused CSS files            # Removed if not referenced
- custom JS files             # Removed if unused
- recovery-process.js         # Dead code
- nlSignup.js                 # Dead code (if forms commented out)
```

---

## Testing Checklist - Before Calling Migration Complete

- [ ] **Page Loads:** Open `index.html` in browser - no broken layout
- [ ] **Images:** All images display correctly - no broken image icons
- [ ] **Navigation:** All menu links work - scroll to sections or navigate correctly
- [ ] **Responsive:** Page works on mobile, tablet, desktop (check via DevTools)
- [ ] **Forms:** If present, forms look correct (may not submit if no backend)
- [ ] **Maps:** Maps load and are interactive (if migrated)
- [ ] **No Console Errors:** DevTools console shows no red error messages
- [ ] **No External Dead Links:** Broken links are commented out or safely disabled
- [ ] **Cache Busting:** Image URLs include `?v=1` query strings
- [ ] **File Size:** Reasonable file size (no bloated CSS/JS)
- [ ] **Local Server:** Works with `python3 -m http.server 8000`

---

## Success Indicators

✅ **Site is production-ready when:**

1. Single `index.html` file contains all HTML
2. All images served from local `/img/` directory
3. No external custom services (only standard CDNs for libraries)
4. No exposed API keys or credentials
5. No broken links (either functional or safely hidden)
6. All CSS classes properly defined
7. Zero custom JavaScript files (or minimal, well-documented ones)
8. Site works locally without internet (except CDN libraries)
9. All phases documented in CHANGELOG/TASKS
10. Git repository cleaned and ready for archival

---

## Process Tips for Teams/AI

### For AI Assistants Running This Migration:

1. **Start with PHASE 0:** Understand the scope before making changes
2. **Track progress:** Use TODO/TASKS system for each phase
3. **Test between phases:** Don't batch all changes - verify after each phase
4. **Document gotchas:** Record any issues specific to this site
5. **Commit frequently:** Small, focused commits with clear messages
6. **Reference line numbers:** "Fixed duplicate images on lines 453, 463"

### For Humans Reviewing AI Changes:

1. **Check for oversights:** AI might miss subtle dependencies
   - Example: CSS class used only in media query
2. **Verify API key removal:** Search for `key=`, `apiKey`, `token`, etc.
3. **Test visual rendering:** CSS changes can break layout subtly
4. **Review external URLs:** Ensure all external references are necessary
5. **Confirm browser compatibility:** Check older browsers if site targets them

---

## Quick Reference: Search Commands

```bash
# Find all external image URLs
grep -n "http.*\.\(jpg\|png\|svg\|gif\)" index.html

# Find CSS background images
grep -n "background-image.*http" index.html

# Find WordPress code to remove
grep -n "wp-emoji\|api\.w\.org\|wp-singular\|wp-theme" index.html

# Find potential API keys
grep -i "key\|token\|secret\|apikey" index.html *.js

# Find external script loaders
grep -n "getScript\|\.ajax.*http\|fetch.*http" index.html *.js

# Count classes in HTML vs CSS
grep -o 'class="[^"]*"' index.html | wc -l

# Test with local server
python3 -m http.server 8000

# Validate HTML syntax (requires htmltidy)
tidy -q -e index.html
```

---

## Version History

- **v1.0** - Initial process document based on sor-va.com migration
- Based on: 8 phases of WordPress → Static HTML conversion
- Total time: Multiple commits across development workflow
- Result: 500+ lines of WordPress/custom code removed, fully optimized static site

---

## Questions & Troubleshooting

**Q: Can I keep some custom JavaScript files?**
A: Yes, but only if they're essential and well-documented. Minimize custom code complexity.

**Q: What if images are using complex query parameters?**
A: Strip them when saving locally. Static files don't need `?fit=crop&w=600` - just save the image.

**Q: Should I keep the `/dump/` directory in the repository?**
A: No. It's useful during migration but should be deleted before final commit. It's dead weight.

**Q: What about SEO? Will removing WordPress code hurt rankings?**
A: No. Search engines crawl the final HTML, not the source structure. Clean code is actually better.

**Q: Can I do all phases at once?**
A: Not recommended. Do them in order and test between each phase. This isolates problems.

**Q: What if the site has a lot of custom JavaScript I don't understand?**
A: Audit it carefully. Search for usage in HTML. If not used, it's dead code and should go.

---

## References & Resources

- **UIKit Framework:** https://getuikit.com/ (common in these WordPress exports)
- **jQuery Migration Guide:** https://jquery.com/upgrade-guide/
- **Google Maps Embed:** https://www.google.com/maps/
- **Embedded Maps:** https://maps.google.com/maps?q=lat,lng&output=embed
- **HTML Validation:** https://validator.w3.org/
- **CSS Validation:** https://jigsaw.w3.org/css-validator/
