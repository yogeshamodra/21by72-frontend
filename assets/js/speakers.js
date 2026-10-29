/* Speakers page: live search across the speaker cards.
   Needs: #sp-q (input), .sp-item[data-name] cards, #sp-none (empty message). */
(function () {
  var q = document.getElementById('sp-q'), none = document.getElementById('sp-none');
  if (!q) return;
  q.addEventListener('input', function () {
    var v = q.value.trim().toLowerCase(), shown = 0;
    document.querySelectorAll('#sp-grid .sp-item').forEach(function (it) {
      var ok = !v || it.dataset.name.indexOf(v) > -1;
      it.hidden = !ok;
      if (ok) shown++;
    });
    none.hidden = shown > 0;
  });
})();
