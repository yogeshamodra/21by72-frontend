/* Exhibitors: live search inside the active season tab (tier headings hide when empty).
   Needs: #ex-q (input), .tab-pane .ex-tile[data-name] tiles, .ex-group wrappers, #ex-none (empty message). */
(function () {
  var q = document.getElementById('ex-q'), none = document.getElementById('ex-none');
  if (!q) return;
  function run() {
    var v = q.value.trim().toLowerCase(), shown = 0;
    document.querySelectorAll('.tab-pane .ex-tile').forEach(function (t) {
      var ok = !v || t.dataset.name.indexOf(v) > -1;
      t.hidden = !ok;
      if (ok && t.closest('.tab-pane').classList.contains('active')) shown++;
    });
    document.querySelectorAll('.tab-pane .ex-group').forEach(function (g) { g.hidden = !g.querySelector('.ex-tile:not([hidden])'); });
    none.hidden = shown > 0;
  }
  q.addEventListener('input', run);
  document.querySelectorAll('[data-bs-toggle="pill"]').forEach(function (b) { b.addEventListener('shown.bs.tab', run); });
})();
