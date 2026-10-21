# 21BY72 front-end

Static HTML/CSS/JS prototype built on Bootstrap 5.3. Every section is plain markup (no JS-rendered content), so each one maps 1:1 to a WordPress template part.

## Structure

```
index.html              page; each section is wrapped in a comment banner naming its WP template part
home.html               light-theme demo: same markup as index.html + <body class="theme-light"> + assets/css/theme-light.css
assets/css/style.css    all theme styles, with a table of contents at the top
assets/img/             21by72-logo.png (header, footer, loader)
assets/js/
  marquee.js            repeats [data-marquee] content for seamless loops
  countdown.js          [data-countdown] date -> [data-cd] numbers
  hero-hex.js           canvas hexagon background (#hex)
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
| roles, booking | section-roles.php, section-book.php | ACF repeater or WooCommerce products |
| our story (masonry gallery) | section-story.php | ACF gallery field; masonry is pure CSS columns |
| speakers + past voices | section-speakers.php | CPT `speaker` (photo, role, group) |
| sponsors & partners | section-partners.php | CPT `partner` + tier taxonomy |
| leaders | section-leaders.php | CPT `leader` (or `speaker` with group) |
| ambassadors, core team | section-ambassadors.php, section-team.php | CPT `team` with group; same card markup |
| testimonials | section-testimonials.php | CPT `testimonial` (quote, name, role, photo) |
| footer | footer.php | wp_nav_menu, options |

Repeated cards in `index.html` (one `.col-*` block, `.testi-slide`, `.logo-box`) are one loop iteration each: replace the sample items with a `WP_Query` loop and keep the markup identical.

## Reusable classes

- Text: `t-mute t-soft t-a t-white t-grad t-metal`, sizes `h-sec h-sub h-stat fs-xs fs-sm`
- Backgrounds: `bg-main bg-alt bg-deep bg-box bg-grad`
- Buttons: `btn-grad btn-ghost btn-sm-x`
- Cards: `box` (pricing/roles), `spk` (speakers), `cspk` (portrait), `testi` (testimonial)
- Colours live in the `:root` tokens at the top of `style.css`.
