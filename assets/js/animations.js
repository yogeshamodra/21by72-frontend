/**
 * animations.js
 * Page-wide motion: smooth scroll (Lenis), scroll progress bar, sticky header
 * state, cursor glow, intro loader, scroll reveals, parallax orbs.
 * Hooks (markup): #loader #bar #glow #hd #h1 .hero [data-in] .cards
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

  /* ---------- intro: loader -> headline -> hero content ---------- */
  window.addEventListener('load', function () {
    gsap.timeline()
      .to('#loader span', { scale: 1.15, duration: .6, yoyo: true, repeat: 1, ease: 'power2.inOut' })
      .to('#loader', { yPercent: -100, duration: .8, ease: 'power3.inOut' })
      .from('#h1 .w i', { yPercent: 110, duration: 1.1, stagger: .12, ease: 'power4.out' }, '-=.3')
      .from('.hero [data-in]', { y: 30, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out' }, '-=.6');
    gsap.to('.o1', { y: 60, x: 40, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.o2', { y: -60, x: -40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb', { scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' }, y: 200 });
  });

  /* ---------- scroll reveals ---------- */
  document.querySelectorAll('section:not(.hero) [data-in]').forEach(function (el) {
    gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 50, opacity: 0, duration: .9, ease: 'power3.out' });
  });
  gsap.utils.toArray('.cards').forEach(function (group) {
    gsap.from(group.children, { scrollTrigger: { trigger: group, start: 'top 85%' }, y: 70, opacity: 0, duration: .8, stagger: .15, ease: 'power3.out', clearProps: 'transform,opacity' });
  });
  gsap.from('.spk', { scrollTrigger: { trigger: '#rail', start: 'top 85%' }, clipPath: 'inset(50% round 10px)', scale: .9, duration: 1, stagger: .1, ease: 'power3.out', clearProps: 'clipPath,transform' });
  gsap.from('.pop', { scrollTrigger: { trigger: '#past', start: 'top 90%' }, scale: .6, opacity: 0, duration: .6, stagger: .06, ease: 'back.out(1.7)' });
  gsap.from('.story-item', { scrollTrigger: { trigger: '#story-grid', start: 'top 85%' }, y: 60, opacity: 0, scale: .94, duration: .9, stagger: .12, ease: 'power3.out', clearProps: 'transform,opacity' });
  gsap.to('.ticker', { scrollTrigger: { trigger: '.ticker', scrub: true, start: 'top bottom', end: 'bottom top' }, rotate: 1.2 });

})();
