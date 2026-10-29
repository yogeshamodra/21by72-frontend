/* Exhibitors: live search across the logo grids.
   Needs: #ex-q (input), .ex-tile[data-name] tiles, #ex-none (empty message). */
(function () {
  var q = document.getElementById('ex-q'), none = document.getElementById('ex-none');
  if (!q) return;
  function run() {
    var v = q.value.trim().toLowerCase(), shown = 0;
    document.querySelectorAll('.tab-pane.active .ex-tile').forEach(function (t) {
      var ok = !v || t.dataset.name.indexOf(v) > -1;
      t.hidden = !ok;
      if (ok) shown++;
    });
    document.querySelectorAll('.tab-pane:not(.active) .ex-tile').forEach(function (t) { t.hidden = false; });
    none.hidden = shown > 0;
  }
  q.addEventListener('input', run);
  document.querySelectorAll('[data-bs-toggle="pill"]').forEach(function (b) { b.addEventListener('shown.bs.tab', run); });
})();
