/**
 * marquee.js
 * Repeats the children of every [data-marquee="N"] element N times so the CSS
 * loop (.ticker, .mq) is seamless. Output ONE copy in the HTML / WP loop.
 * Needs: nothing.
 */
(function () {
  document.querySelectorAll('[data-marquee]').forEach(function (el) {
    var copies = parseInt(el.dataset.marquee, 10) || 2;
    var html = el.innerHTML;
    for (var i = 1; i < copies; i++) {
      var wrap = document.createElement('div');
      wrap.innerHTML = html;
      while (wrap.firstChild) {
        if (wrap.firstChild.nodeType === 1) wrap.firstChild.setAttribute('aria-hidden', 'true');
        el.appendChild(wrap.firstChild);
      }
    }
  });
})();
