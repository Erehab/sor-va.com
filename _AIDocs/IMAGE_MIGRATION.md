# Image Migration Plan

## Overview
Migrate remaining external image URLs from `index.html` to local `/img` directory references. The goal is to eliminate external dependencies and serve all images locally.

---

## Already Migrated ✅
- `logo.svg`
- `spine-ortho-roanoke1.jpg`
- `1-hour.svg`
- `checked.svg`
- `clipboard.svg`
- `stock-8078.jpg`
- `stock-6218.jpg`
- `stock-8475.jpg`
- `stock-11624.jpg`
- `stock-10799.jpg`
- `stock-7580.jpg`
- `stock-7601.jpg`
- `stock-7493.jpg`
- `stock-7947.jpg`

---

## Migration Tasks

### 1. Elbow-Brace Image (HIGH PRIORITY - Easy)
**Status:** ⏳ Pending

**File exists locally:** `img/elbow-brace.png` ✓

**References in index.html:**
- Line 453: `<img src="https://blogsdir.imgix.net/2452/files/image/bigstock-Man-wearing-elbow-brace-to-red-132738953%20%282%29.png?fit=crop&auto=compress%2Cenhance&w=600" class="tm-stakes-img uk-align-center" alt=" ">`
- Line 463: Same URL (duplicate)

**Action:** Replace both occurrences with `src="img/elbow-brace.png?v=1"` (add query string for cache busting)

**Commands when ready:**
```bash
# Search for the pattern
grep -n "bigstock-Man-wearing-elbow-brace" index.html

# View context
sed -n '450,465p' index.html
```

---

### 2. Phone-Call Icon (HIGH PRIORITY - Easy)
**Status:** ⏳ Pending

**File exists locally:** `img/phone-call.svg` ✓

**References in index.html:**
- Line 546: `<img src="https://blogsdir.imgix.net/2452/files/icons/phone-call.svg" class='uk-display-block uk-align-center' alt='physical therapy Irvine CA' width='70' height='70'>`
- Line 878: Same URL (duplicate)

**Action:** Replace both occurrences with `src="img/phone-call.svg?v=1"`

**Commands when ready:**
```bash
# Search for the pattern
grep -n "blogsdir.imgix.net/2452/files/icons/phone-call.svg" index.html

# View context
sed -n '540,550p' index.html
sed -n '875,885p' index.html
```

---

### 3. White Logo Image (MEDIUM PRIORITY)
**Status:** ⏳ Pending

**File exists locally:** ❌ NO - needs to be downloaded

**Reference in index.html:**
- Line 963: `<img src="https://blogsdir.imgix.net/2452/files/logo/128_logo_white.svg" alt=" " class="uk-margin-bottom">`

**Action needed:**
1. Download the image from the URL
2. Save as `img/logo-white.svg`
3. Replace URL with `src="img/logo-white.svg?v=1"`

**Download command:**
```bash
curl -o img/logo-white.svg "https://blogsdir.imgix.net/2452/files/logo/128_logo_white.svg"
```

---

### 4. Stock Images from stock.imgix.net (LOWER PRIORITY - More work)
**Status:** ⏳ Pending

**Files exist locally:** ❌ NO - need to be downloaded

**References in index.html:**
- Line 642: `stock.imgix.net/11011?auto=enhance&fit=crop&h=500&w=500` → `stock-11011.jpg`
- Line 654: `stock.imgix.net/12443?w=500&h=500&fit=crop&crop=faces&auto=enhance` → `stock-12443.jpg`
- Line 666: `stock.imgix.net/8855?w=500&h=500&fit=crop&crop=faces&auto=enhance` → `stock-8855.jpg`
- Line 678: `stock.imgix.net/7553?w=500&h=500&fit=crop&crop=faces&auto=enhance` → `stock-7553.jpg`
- Line 690: `stock.imgix.net/10713?w=500&h=500&fit=crop&crop=faces&auto=enhance` → `stock-10713.jpg`
- Line 728: `stock.imgix.net/10639?w=500&h=320&fit=crop&crop=focalpoint&auto=enhance` → `stock-10639.jpg`
- Line 739: `stock.imgix.net/9686?w=500&h=320&fit=crop&crop=focalpoint&auto=enhance` → `stock-9686.jpg`
- Line 750: `stock.imgix.net/8241?w=500&h=320&fit=crop&crop=focalpoint&auto=enhance` → `stock-8241.jpg`
- Line 761: `stock.imgix.net/7065?w=500&h=320&fit=crop&crop=focalpoint&auto=enhance` → `stock-7065.jpg`
- Line 772: `stock.imgix.net/6391?w=500&h=320&fit=crop&crop=focalpoint&auto=enhance` → `stock-6391.jpg`
- Line 783: `stock.imgix.net/2348?w=500&h=320&fit=crop&crop=focalpoint&auto=enhance` → `stock-2348.jpg`
- Line 908: `stock.imgix.net/8484?w=700&h=500&fit=crop` → `stock-8484.jpg`

**Action needed:**
1. Download each image
2. Save with naming convention `stock-{id}.jpg`
3. Replace URLs with local paths

---

### 5. Favicon & Apple Touch Icons (MEDIUM PRIORITY)
**Status:** ⏳ Pending

**Files exist locally:** ❌ NO - needs to be pulled from https://www.sor-va.com/

**References in index.html:**
- Line 16: `/files/mobile/favicon.ico` → `img/favicon.ico`
- Line 20: `/files/mobile/icon-57x57.png` → `img/icon-57x57.png`
- Line 21: `/files/mobile/apple-touch-startup-image-320x460.png` → `img/apple-touch-startup-image-320x460.png`
- Line 23: `/files/mobile/icon-114x114.png` → `img/icon-114x114.png`
- Line 24: `/files/mobile/apple-touch-startup-image-640x920.png` → `img/apple-touch-startup-image-640x920.png`

**Action needed:**
1. Download files from old site: `https://www.sor-va.com/files/mobile/[filename]`
2. Save to `/img/` with original filenames
3. Update all `href="/files/mobile/` references to `href="img/` in index.html
4. Add query strings for cache busting: `?v=1`

**Download commands:**
```bash
# Download all files
curl -o img/favicon.ico "https://www.sor-va.com/files/mobile/favicon.ico"
curl -o img/icon-57x57.png "https://www.sor-va.com/files/mobile/icon-57x57.png"
curl -o img/apple-touch-startup-image-320x460.png "https://www.sor-va.com/files/mobile/apple-touch-startup-image-320x460.png"
curl -o img/icon-114x114.png "https://www.sor-va.com/files/mobile/icon-114x114.png"
curl -o img/apple-touch-startup-image-640x920.png "https://www.sor-va.com/files/mobile/apple-touch-startup-image-640x920.png"
```

---

## Migration Progress Tracking

| Task | Status | Lines | Notes |
|------|--------|-------|-------|
| Elbow-brace | ✅ Complete | 453, 463 | Replaced with img/elbow-brace.png?v=1 |
| Phone-call | ✅ Complete | 546, 878 | Replaced with img/phone-call.svg?v=1 |
| Logo-white | ✅ Complete | 963 | Downloaded & replaced with img/logo-white.svg?v=1 |
| Stock photos | ✅ Complete | 642, 654, 666, 678, 690, 728, 739, 750, 761, 772, 783, 908 | All 12 images downloaded & replaced |
| Favicon | ✅ Complete | 16 | Replaced with img/favicon.ico?v=1 |
| Touch icons | ✅ Complete | 20, 21, 23, 24 | All downloaded & replaced |

---

## CSS File Scan

### output.min.css Analysis
**Status:** ✅ No image references found

Scanned `output.min.css` for image URLs in CSS background-image, @font-face, and url() rules.
- **Result**: Zero external image URLs detected in CSS
- **Impact**: No CSS migration needed
- **Note**: CSS file uses only inline styles and font imports (Google Fonts) - no background images

---

## Completion Summary ✅

**All migration tasks completed successfully!**

### Tasks Completed:
1. ✅ Elbow-brace image (2 occurrences) - Replaced local paths
2. ✅ Phone-call icon (2 occurrences) - Replaced local paths
3. ✅ White logo - Downloaded and migrated
4. ✅ Stock images (12 URLs) - All downloaded and migrated
5. ✅ Favicon - Downloaded and migrated
6. ✅ Apple touch icons (4 files) - Downloaded and migrated

### Files Migrated:
- **1 logo file**: logo-white.svg
- **12 stock images**: stock-11011 through stock-8484
- **5 icon files**: favicon.ico, icon-57x57.png, icon-114x114.png, apple-touch-startup-image-320x460.png, apple-touch-startup-image-640x920.png
- **Total**: 18 new image files added to `/img/`

### Index.html Updates:
- **Total references updated**: 22 image URLs replaced
- **All external CDN/blogsdir/stock.imgix.net URLs**: Converted to local relative paths
- **Cache busting**: All URLs include `?v=1` query string

---

## PHASE 2: Remove WordPress & CMS Cruft

**Status:** ✅ Complete

### WordPress Components to Remove

The `index.html` was exported from a WordPress site (1000128.ptclinicng.com). The following WordPress-specific code serves no purpose in a static site and should be removed:

#### 1. WordPress Emoji System (Lines 34-54)
**Priority:** HIGH - Dead code, loads external script

**Content to remove:**
- Line 34-39: `window._wpemojiSettings` JavaScript object and emoji support detection script
- Line 41-54: `wp-emoji-styles-inline-css` style block with `.wp-smiley` and `.emoji` styles

**Why:** WordPress emoji system is for dynamic content rendering. Static HTML doesn't need emoji compatibility detection or the external emoji script from `s.w.org`.

#### 2. WordPress REST API Meta Links (Lines 227-230)
**Priority:** HIGH - Dead code, links to old WordPress backend

**Content to remove:**
- Line 227: `<link rel="https://api.w.org/"...>` - WordPress REST API discovery
- Line 227: `<link rel="alternate" title="JSON"...>` - JSON API endpoint
- Line 227: `<link rel="canonical"...>` - Points to old domain `1000128.ptclinicng.com`
- Line 228: `<link rel='shortlink'...>` - WordPress shortlink
- Line 229-230: oEmbed meta links (2 links) - WordPress embed format discovery

**Why:** These are metadata links for WordPress. They reference the old WordPress domain and serve no purpose in a static site.

#### 3. WordPress Body Class (Line 254)
**Priority:** MEDIUM - Cleanup, doesn't affect functionality

**Current:**
```html
<body class="home wp-singular page-template-default page page-id-3 wp-theme-gfive wp-child-theme-1000128themeG5 uk-height-1-1 page-home desktop chrome">
```

**Remove these WordPress classes:**
- `wp-singular`
- `page-template-default`
- `page`
- `page-id-3`
- `wp-theme-gfive`
- `wp-child-theme-1000128themeG5`

**Keep:** `uk-height-1-1`, `page-home`, `desktop`, `chrome` (these relate to UIKit framework and current page state)

**Why:** WordPress body classes are used by WordPress themes for styling. Our static site doesn't need theme-specific selectors.

#### 4. Commented Old Menu Code (Lines 285-316+)
**Priority:** MEDIUM - Code cleanup

**Content:** Large block of commented HTML showing old WordPress menu structure with hardcoded links to `1000128.ptclinicng.com`

**Action:** Remove the entire commented `<!-- <div class="menu-prim-container">...[entire menu]...</div> -->` block

**Why:** These are obsolete references to the old WordPress site's menu. The current navigation is already implemented and uncommented.

### Removal Checklist
- [x] Remove wp-emoji JavaScript (lines 34-39) - ✅ Removed
- [x] Remove wp-emoji styles (lines 41-54) - ✅ Removed
- [x] Remove WordPress REST API links (lines 227-230) - ✅ Removed
- [x] Remove WordPress shortlink (line 228) - ✅ Removed
- [x] Remove oEmbed links (lines 229-230) - ✅ Removed
- [x] Clean up WordPress classes from body tag (line 254) - ✅ Updated to just `uk-height-1-1 page-home desktop chrome`
- [x] Remove commented old menu code (lines 285+) - ✅ Removed entire commented-out menu block (67 lines)
- [x] Test site in browser to ensure nothing broke - ✅ Verified page loads successfully

### Summary of Changes Made
- **Removed ~21 lines:** WordPress emoji detection & rendering JavaScript
- **Removed ~28 lines:** WordPress emoji CSS styles
- **Removed 4 lines:** REST API, shortlink, and oEmbed meta links
- **Removed 1 line:** All WordPress body classes, kept only UIKit and functional ones
- **Removed 67 lines:** Entire commented-out WordPress menu structure with old domain references
- **Total lines removed:** ~121 lines of dead WordPress code

### Verification
- Confirmed no remaining references to: `wp-emoji`, `api.w.org`, `1000128.ptclinicng.com`, `wp-singular` in HTML
- Page loads successfully with all sections intact
- All images and stylesheets loading correctly

---

## PHASE 3: JavaScript Cleanup & Audit

**Status:** ⏳ Pending

### Overview
Review all local JavaScript files to identify and remove unused code. This will reduce payload and maintenance burden.

### Files to Review

#### 1. `recovery-process.js` (Currently: 0 bytes - EMPTY)
- **Status:** Remove entirely - file is empty
- **Action:** Delete file

#### 2. `g5_master.js` (11KB)
- **Purpose:** Likely contains G5 framework core functionality
- **Analysis needed:** Check what this actually does and if all features are used
- **Usage:** Referenced in index.html (line 1079)
- **Action:** Audit for dead code

#### 3. `g5_style.js` (2.5KB)
- **Purpose:** G5 theme styling utilities
- **Analysis needed:** Check if this is required for current styling
- **Usage:** Referenced in index.html (line 1080)
- **Action:** Audit for dead code

#### 4. `media.match.min.js` (3.0KB)
- **Purpose:** Media query matching polyfill
- **Analysis needed:** Check if needed for target browsers
- **Usage:** Referenced in index.html (line 1077)
- **Action:** Audit for necessity

#### 5. `nlSignup.js` (1.2KB)
- **Purpose:** Newsletter signup functionality
- **Analysis needed:** Check if newsletter functionality is actually used on site
- **Usage:** Referenced in index.html (line 1087)
- **Action:** Audit and possibly remove if newsletter not implemented

### Unused CDN Libraries to Consider
Review these CDN includes - check if all features are actually used:

**UIKit Components:**
- accordion.min.js (line 1067) - Used if accordion menus exist
- lightbox.min.js (line 1068) - Used if image galleries exist
- parallax.min.js (line 1069) - Used if parallax scrolling exists
- slider.min.js (line 1070) - Used if content sliders exist
- slideset.min.js (line 1071) - Used if slide sets exist
- slideshow.min.js (line 1072) - Used if slideshows exist
- slideshow-fx.min.js (line 1073) - Used if slideshow effects exist
- sticky.min.js (line 1074) - Used if sticky elements exist
- tooltip.min.js (line 1075) - Used if tooltips exist

**Other Libraries:**
- jquery-migrate.min.js (line 1065) - Compatibility layer for old jQuery code
- jquery.matchHeight-min.js (line 1076) - Equal height columns
- enquire.js (line 1078) - Responsive design helper

### Audit Checklist
- [ ] Identify which UIKit components are actually used in HTML
- [ ] Check `g5_master.js` for unused functions
- [ ] Check `g5_style.js` for unused utilities
- [ ] Determine if `nlSignup.js` is needed
- [ ] Verify `media.match.min.js` necessity for target browsers
- [ ] Create list of unused CDN libraries
- [ ] Remove empty `recovery-process.js`
- [ ] Remove unused files and CDN includes
- [ ] Test all interactive features after cleanup

---

## PHASE 4: Google Maps Migration

**Status:** ⏳ Pending

### Current Situation
**Current implementation:** Line 1004 uses a custom G5 map component that requires Google Maps API

```html
<div class='g5-gmap ' data-practice_id='128' data-static='false' data-zoom='5' data-larger='false' data-directions='false' data-expocolor='#444444' style='width:100%;height:250px;'></div>
```

**Issue:** This relies on:
1. Google Maps API key (likely in `g5_master.js`)
2. Custom JavaScript handler in G5 framework
3. External API calls to Google

### Migration Plan

#### Option A: Embedded Google Map (Recommended)
- Use Google Maps embed (no API key required)
- Simpler than iframe, but still Google-dependent
- Maintains interactive features (zoom, pan)

#### Option B: Embedded OpenStreetMap (Best for Independence)
- Completely free, open-source alternative
- No API key needed
- Uses Leaflet.js library (lightweight)
- Can embed via iframe

#### Option C: Static Map Image (Minimal)
- Just a screenshot of the map
- No interactivity
- Smallest payload
- Good for simple location display

### Steps Required
1. **Decide on implementation:** Embedded Google Map vs OpenStreetMap vs Static Map
2. **Get location coordinates:** Latitude: 37.247101, Longitude: -80.032973 (from schema.org data on line 242)
3. **Address:** 1919 Electric Rd SW, Roanoke, VA 24018
4. **Remove:** `g5-gmap` div and associated G5 JavaScript handling
5. **Add:** New map implementation (embed code)
6. **Test:** Verify map displays and functions correctly

### Map Details
- **Practice Location:** Spine and Orthopedic Rehab, Roanoke, VA
- **Coordinates:** 37.247101, -80.032973
- **Address:** 1919 Electric Rd SW, Roanoke, VA 24018
- **Current zoom level:** 5
- **Current features disabled:** directions, larger view

### Decision Needed
Before implementation, choose the best approach based on:
- **Independence:** OpenStreetMap > Static Image > Google Maps
- **Interactivity:** Google Maps = OpenStreetMap > Static Image
- **Simplicity:** Static Image > Google Maps > OpenStreetMap
- **Performance:** Static Image > Google Maps ≈ OpenStreetMap

---

## Notes
- All migrated images use query string cache busting format: `img/filename.ext?v=1`
- Original external URLs kept commented above if needed for reference
- After each migration, verify the image loads correctly in browser
- Phase 2 focuses on removing WordPress-specific code that's not needed in a static site
- Phase 3 will reduce JavaScript payload by removing unused libraries
- Phase 4 will eliminate API key dependencies and simplify the map implementation
