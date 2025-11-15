# No-JS Conversion Plan: index.html → nojs.html

## Overview
Convert index.html to nojs.html by removing UIKit JavaScript dependencies and replacing with vanilla JavaScript implementations.

## UIKit Features Detected in index.html

### 1. **data-uk-slider** (Lines 406-491)
- **Usage**: Professional Services carousel with auto-play
- **Config**: `{autoplay:true, autoplayInterval:3000}`
- **Features**:
  - Auto-rotating carousel
  - Previous/Next navigation buttons
  - Multiple items visible at once
  - Responsive grid (1/2/3/4 columns)
- **Replacement**: Vanilla JS carousel with setInterval

### 2. **data-uk-scrollspy** (Lines 352, 588)
- **Usage**: Fade-in animation on scroll for CTA sections
- **Config**: `{cls:'uk-animation-fade', delay:200, repeat:true}`
- **Features**:
  - Adds fade animation class when element enters viewport
  - 200ms delay
  - Repeats on each scroll
- **Replacement**: IntersectionObserver API

### 3. **data-uk-grid-margin** (Multiple locations)
- **Usage**: Grid spacing management
- **Features**: Dynamic margin calculation between grid items
- **Replacement**: CSS only (already have flexbox/grid, may not need JS)

### 4. **data-uk-grid-match** (Lines 229, 262, 314, 504)
- **Usage**: Match heights of elements in grid
- **Config**: Some with `{target:'.uk-panel'}`
- **Features**: Makes grid items equal height
- **Replacement**: CSS `display: grid` or `flex` (already in use, may not need JS)

## Conversion Steps

### Step 1: Duplicate and Clean
- [ ] Copy index.html → nojs.html
- [ ] Remove UIKit JS script tags (lines 672-674):
  - jQuery (keep - used by slider)
  - UIKit core JS (remove - line 672 already commented)
  - Slider component (remove)
  - matchHeight (remove)

### Step 2: Replace Slider/Carousel (Priority 1)
- [ ] Remove `data-uk-slider` attributes
- [ ] Remove `data-uk-slider-item` attributes
- [ ] Add vanilla JS carousel implementation:
  - Auto-play with 3000ms interval
  - Previous/Next button handlers
  - Touch/swipe support (optional)
  - Responsive item count

### Step 3: Replace ScrollSpy (Priority 2)
- [ ] Remove `data-uk-scrollspy` attributes
- [ ] Add IntersectionObserver for fade-in animations
- [ ] Implement delay and repeat functionality

### Step 4: Handle Grid Features (Priority 3)
- [ ] Remove `data-uk-grid-margin` attributes
- [ ] Remove `data-uk-grid-match` attributes
- [ ] Verify CSS grid/flexbox handles layout (likely already works)
- [ ] Add CSS-only equal height if needed

### Step 5: Testing
- [ ] Test carousel functionality
- [ ] Test scroll animations
- [ ] Test responsive behavior
- [ ] Test all navigation buttons
- [ ] Compare visual appearance with index.html

## Dependencies Analysis

### Current Scripts (from index.html):
```html
Line 671: <script src="jquery/3.7.1/jquery.min.js"></script>
Line 672: <!-- COMMENTED OUT: uikit.min.js -->
Line 673: <script src="uikit/2.26.3/js/components/slider.min.js"></script>
Line 674: <script src="jquery.matchHeight/0.7.2/jquery.matchHeight-min.js"></script>
```

### After Conversion:
- **Remove**: All external JS files
- **Add**: Inline vanilla JavaScript (~100-200 lines)

## Vanilla JS Implementations Needed

### 1. Carousel (est. 80 lines)
```javascript
// Simple carousel with auto-play
// - Track current slide
// - setInterval for auto-advance
// - Previous/Next handlers
// - Responsive item count
```

### 2. ScrollSpy (est. 30 lines)
```javascript
// IntersectionObserver for scroll animations
// - Observe elements with animation class
// - Add/remove fade class on scroll
// - Handle delay and repeat
```

### 3. Grid Match Heights (est. 20 lines, if needed)
```javascript
// Calculate and set equal heights
// - Find tallest item in each row
// - Set all items to match
// - Re-calculate on resize
```

## File Size Comparison

### Before (index.html):
- HTML: ~20KB
- UIKit CSS: ~120KB
- jQuery: ~85KB
- UIKit Slider JS: ~15KB
- matchHeight JS: ~5KB
- **Total**: ~245KB

### After (nojs.html):
- HTML: ~20KB
- UIKit CSS: ~120KB (keep for styling)
- Inline JS: ~2KB
- **Total**: ~142KB
- **Savings**: ~103KB (42% reduction)

## Risks & Considerations

1. **Carousel complexity**: UIKit slider handles edge cases (touch, accessibility)
2. **Browser compatibility**: IntersectionObserver needs polyfill for IE11
3. **CSS dependencies**: UIKit CSS classes may expect JS behavior
4. **Testing burden**: Need to test all interactive features

## Success Criteria

- [ ] All carousel functionality works (auto-play, navigation)
- [ ] Scroll animations trigger correctly
- [ ] No console errors
- [ ] Visual match with index.html
- [ ] Performance improvement (26x from original measurements)
- [ ] No external JS dependencies

## Timeline Estimate

- Step 1 (Duplicate): 2 minutes
- Step 2 (Carousel): 30 minutes
- Step 3 (ScrollSpy): 15 minutes
- Step 4 (Grid): 10 minutes
- Step 5 (Testing): 20 minutes
- **Total**: ~1.5 hours
