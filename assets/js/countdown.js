/**
 * countdown.js
 * Markup: <div data-countdown="2027-04-10T09:00:00+05:30"> with children
 *         [data-cd="d|h|m|s"] that receive the numbers.
 * Needs: nothing.
 */
(function () {
  var root = document.querySelector('[data-countdown]');
  if (!root) return;
  var target = new Date(root.dataset.countdown);
  var out = {};
  ['d', 'h', 'm', 's'].forEach(function (k) { out[k] = root.querySelector('[data-cd="' + k + '"]'); });
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var x = Math.max(0, target - Date.now()) / 1000;
    out.d.textContent = pad(Math.floor(x / 86400));
    out.h.textContent = pad(Math.floor(x % 86400 / 3600));
    out.m.textContent = pad(Math.floor(x % 3600 / 60));
    out.s.textContent = pad(Math.floor(x % 60));
  }
  tick();
  setInterval(tick, 1000);
})();
