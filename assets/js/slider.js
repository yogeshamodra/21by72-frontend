/* Scroll-snap slider (no library): arrows, dots, autoplay that pauses on hover/focus.
   Markup: [data-slider] > .sl-track > .sl-slide, plus .sl-prev, .sl-next and an empty .sl-dots. */
(function () {
  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var track = root.querySelector('.sl-track'), slides = [].slice.call(track.children),
        prev = root.querySelector('.sl-prev'), next = root.querySelector('.sl-next'), dots = root.querySelector('.sl-dots'),
        timer, unlock, paused = false, still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.setAttribute('data-lenis-prevent', '');
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      b.addEventListener('click', function () { go(i); });
      dots.appendChild(b);
    });
    function step() { return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth; }
    function index() { return Math.round(track.scrollLeft / step()); }
    function maxIndex() { return Math.round((track.scrollWidth - track.clientWidth) / step()); }
    function go(i, instant) {
      // scroll-snap fights a smooth programmatic scroll (that is the stutter), so snapping is paused while it runs
      track.style.scrollSnapType = 'none';
      track.scrollTo({ left: Math.max(0, Math.min(i, maxIndex())) * step(), behavior: instant ? 'auto' : 'smooth' });
      clearTimeout(unlock);
      unlock = setTimeout(function () { track.style.scrollSnapType = ''; }, instant ? 60 : 650);
    }
    function sync() {
      var i = Math.min(index(), maxIndex());
      [].forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === i); d.hidden = k > maxIndex(); });
      prev.disabled = i <= 0; next.disabled = i >= maxIndex();
    }
    prev.addEventListener('click', function () { go(index() - 1); });
    next.addEventListener('click', function () { go(index() + 1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(sync); });
    window.addEventListener('resize', sync);
    function play() { clearInterval(timer); if (still) return; timer = setInterval(function () { if (paused) return; if (index() >= maxIndex()) go(0, true); else go(index() + 1); }, 4000); }
    ['mouseenter', 'focusin', 'touchstart'].forEach(function (e) { root.addEventListener(e, function () { paused = true; }, { passive: true }); });
    ['mouseleave', 'focusout', 'touchend'].forEach(function (e) { root.addEventListener(e, function () { paused = false; }, { passive: true }); });
    sync(); play();
  });
})();
