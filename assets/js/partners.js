/* Partners page: live search on the investment partners grid.
   Needs: #pt-q (input), #pt-grid .ex-tile[data-name], #pt-none (empty message). */
(function () {
  var q = document.getElementById('pt-q'), none = document.getElementById('pt-none');
  if (!q) return;
  q.addEventListener('input', function () {
    var v = q.value.trim().toLowerCase(), shown = 0;
    document.querySelectorAll('#pt-grid .ex-tile').forEach(function (t) {
      var ok = !v || t.dataset.name.indexOf(v) > -1;
      t.hidden = !ok;
      if (ok) shown++;
    });
    none.hidden = shown > 0;
  });
})();
