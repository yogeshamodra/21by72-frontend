# 21BY72 front-end

Static HTML/CSS/JS prototype built on Bootstrap 5.3. Every section is plain markup (no JS-rendered content), so each one maps 1:1 to a WordPress template part.

## Structure

```
index.html              home page (light theme); each section is wrapped in a comment banner naming its WP template part
schedule.html           full agenda (Day 1 / Day 2 tabs, session cards grouped by time of day)
about.html              about page (video hero, numbers, mission, organisers)
exhibitors.html         exhibit page (stall packages, exhibitor logo grid with search)
speakers.html           speakers page (season 1-5 tabs, featured speakers, search)
gallery.html            photo gallery of past seasons (season filter + lightbox)
partners.html           sponsors, supporters, ecosystem partners and investors
tickets.html            passes with countdown, comparison table and FAQ
stalls.html             stall packages, inclusions and a past-seasons photo slider
rooms.html              hotel rooms (dual / triple occupancy)
pitching.html           Trailblazers Mine pitching event (steps, past startups, investors, FAQ)
blogs.html              blog (featured post, category chips, search, load more)
dark.html               dark-theme copy of the home page (the old index.html)
assets/css/style.css    all theme styles, with a table of contents at the top
assets/css/theme-light.css  light-theme overrides, scoped under .theme-light (loaded by every page except dark.html)
assets/img/             21by72-logo.png (header, footer, loader)
assets/js/
  marquee.js            repeats [data-marquee] content for seamless loops
  countdown.js          [data-countdown] date -> [data-cd] numbers
  hero-hex.js           canvas hexagon background (#hex)
  exhibitors.js         live search on the exhibitors page
  speakers.js           live search on the speakers page
  gallery.js            season filter + lightbox on the gallery page
  partners.js           live search on the partners page
  slider.js             scroll-snap slider (arrows, dots, autoplay)
  blogs.js              category chips, search and load more on the blog page
  sliders.js            testimonials slider (jQuery + Slick)
  animations.js         GSAP / Lenis: loader, reveals, progress bar
```

Each JS file starts with a header comment listing the markup hooks it needs and its dependencies.

## Script load order (wp_enqueue_script, in footer)

1. bootstrap.bundle  2. jquery (WP core)  3. slick-carousel  4. gsap  5. ScrollTrigger  6. lenis
7. marquee.js  8. countdown.js  9. hero-hex.js  10. sliders.js  11. animations.js

Styles: bootstrap.min.css, slick.min.css, then `assets/css/style.css`. Poppins is loaded from Google Fonts.

## Sections -> WordPress

| Section in index.html | Template part | Data source |
|---|---|---|
| header / navigation | header.php | wp_nav_menu |
| hero | template-parts/section-hero.php | options page (date, venue); `data-countdown` takes the event date |
| ticker | template-parts/ticker.php | ACF repeater (one copy only; marquee.js repeats it) |
| booking | section-book.php | ACF repeater or WooCommerce products |
| our story (masonry gallery) | section-story.php | ACF gallery field; masonry is pure CSS columns |
| speakers + past voices | section-speakers.php | CPT `speaker` (photo, role, group) |
| sponsors & partners | section-partners.php | CPT `partner` + tier taxonomy |
| leaders | section-leaders.php | CPT `leader` (or `speaker` with group) |
| core team | section-team.php | CPT `team` |
| testimonials | section-testimonials.php | CPT `testimonial` (quote, name, role, photo) |
| footer | footer.php | wp_nav_menu, options |

Repeated cards in `index.html` (one `.col-*` block, `.testi-slide`, `.logo-box`) are one loop iteration each: replace the sample items with a `WP_Query` loop and keep the markup identical.

## Reusable classes

- Text: `t-mute t-soft t-a t-white t-grad t-metal`, sizes `h-sec h-sub h-stat fs-xs fs-sm`
- Backgrounds: `bg-main bg-alt bg-deep bg-box bg-grad`
- Buttons: `btn-grad btn-ghost btn-sm-x`
- Cards: `box` (pricing/roles), `spk` (speakers), `cspk` (portrait), `testi` (testimonial)
- Colours live in the `:root` tokens at the top of `style.css`.
