/* Speakers page: live search inside the active season tab.
   Needs: #sp-q (input), .tab-pane .sp-item[data-name] cards, #sp-none (empty message). */
(function () {
  var q = document.getElementById('sp-q'), none = document.getElementById('sp-none');
  if (!q) return;
  function run() {
    var v = q.value.trim().toLowerCase(), shown = 0;
    document.querySelectorAll('.tab-pane .sp-item').forEach(function (it) {
      var ok = !v || it.dataset.name.indexOf(v) > -1;
      it.hidden = !ok;
      if (ok && it.closest('.tab-pane').classList.contains('active')) shown++;
    });
    none.hidden = shown > 0;
  }
  q.addEventListener('input', run);
  document.querySelectorAll('[data-bs-toggle="pill"]').forEach(function (b) { b.addEventListener('shown.bs.tab', run); });
})();
