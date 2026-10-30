/**
 * animations.js
 * Page-wide motion: smooth scroll (Lenis), scroll progress bar, sticky header
 * state, cursor glow, intro loader, scroll reveals, counters, parallax orbs.
 * Hooks (markup): #loader #bar #glow #hd #h1 .hero [data-in] .cards [data-n]
 *                 .story-item .spk .pop .orb .ticker
 * Needs: GSAP, ScrollTrigger, Lenis (Lenis is optional).
 */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll, progress bar, sticky header ---------- */
  var bar = document.getElementById('bar');
  var header = document.getElementById('hd');

  function onScroll() {
    ScrollTrigger.update();
    var de = document.documentElement;
    bar.style.width = (de.scrollTop / (de.scrollHeight - de.clientHeight) * 100) + '%';
    header.classList.toggle('s', de.scrollTop > 40);
  }

  if (typeof Lenis !== 'undefined') {
    var lenis = new Lenis({ duration: 1.15 });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    lenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll);
  }

  document.addEventListener('mousemove', function (e) {
    gsap.to('#glow', { x: e.clientX, y: e.clientY, duration: .6 });
  });

  /* ---------- intro: loader -> headline -> hero content ----------
     Starts as soon as the page structure and fonts are ready (max 700ms wait for fonts) instead of waiting for the window 'load'
     event, which also waits for every remote image and made the logo sit on screen for a long time. */
  var introStarted = false;
  function intro() {
    if (introStarted) return;
    introStarted = true;
    gsap.timeline()
      .to('#loader span', { scale: 1.12, duration: .35, yoyo: true, repeat: 1, ease: 'power2.inOut' })
      .to('#loader', { yPercent: -100, duration: .7, ease: 'power3.inOut' })
      .from('#h1 .w i', { yPercent: 110, duration: 1.1, stagger: .12, ease: 'power4.out' }, '-=.3')
      .from('.hero [data-in]', { y: 30, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out' }, '-=.6');
    gsap.to('.o1', { y: 60, x: 40, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.o2', { y: -60, x: -40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb', { scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' }, y: 200 });
  }
  var fontsReady = (document.fonts && document.fonts.ready) ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 700); })]) : Promise.resolve();
  fontsReady.then(intro);

  /* ---------- scroll reveals ---------- */
  document.querySelectorAll('section:not(.hero) [data-in]').forEach(function (el) {
    gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 50, opacity: 0, duration: .9, ease: 'power3.out' });
  });
  gsap.utils.toArray('.cards').forEach(function (group) {
    // cap the whole stagger at ~0.8s: with 50-90 cards (speakers, blog) a fixed .15s step made the lower cards appear many seconds late, so the area looked empty
    gsap.from(group.children, { scrollTrigger: { trigger: group, start: 'top 85%' }, y: 70, opacity: 0, duration: .8, stagger: Math.min(.15, .8 / Math.max(1, group.children.length)), ease: 'power3.out', clearProps: 'transform,opacity' });
  });
  // tabs change the page height: let ScrollTrigger re-measure so later sections still reveal at the right place
  document.addEventListener('shown.bs.tab', function () { ScrollTrigger.refresh(); });
  gsap.from('.pop', { scrollTrigger: { trigger: '#rail', start: 'top 90%' }, scale: .6, opacity: 0, duration: .6, stagger: .06, ease: 'back.out(1.7)' });
  gsap.from('.story-item', { scrollTrigger: { trigger: '#story-grid', start: 'top 85%' }, y: 60, opacity: 0, scale: .94, duration: .9, stagger: .12, ease: 'power3.out', clearProps: 'transform,opacity' });
  gsap.to('.ticker', { scrollTrigger: { trigger: '.ticker', scrub: true, start: 'top bottom', end: 'bottom top' }, rotate: 1.2 });


  /* ---------- counters: <b data-n="25000" data-s="+"> ---------- */
  document.querySelectorAll('[data-n]').forEach(function (el) {
    var o = { v: 0 }, end = +el.dataset.n, suffix = el.dataset.s || '';
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: function () {
        gsap.to(o, { v: end, duration: 2, ease: 'power2.out', onUpdate: function () {
          el.textContent = Math.round(o.v).toLocaleString('en-IN') + suffix;
        } });
      }
    });
  });
})();
