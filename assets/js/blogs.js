/* Blog page: category chips + search + "Load more" (12 at a time).
   Needs: .bl-item[data-cats][data-q], .sch-chip[data-cat], #bl-q, #bl-more, #bl-none. */
(function () {
  var items = [].slice.call(document.querySelectorAll('.bl-item')), chips = [].slice.call(document.querySelectorAll('.sch-chip[data-cat]')),
      q = document.getElementById('bl-q'), more = document.getElementById('bl-more'), none = document.getElementById('bl-none'),
      PAGE = 12, shown = PAGE, cat = '';
  if (!items.length) return;
  function run() {
    var v = q.value.trim().toLowerCase(), match = items.filter(function (i) {
      return (!cat || i.dataset.cats.split('|').indexOf(cat) > -1) && (!v || i.dataset.q.indexOf(v) > -1);
    });
    items.forEach(function (i) { i.hidden = true; });
    match.slice(0, shown).forEach(function (i) { i.hidden = false; });
    more.hidden = match.length <= shown;
    none.hidden = match.length > 0;
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { cat = c.dataset.cat; shown = PAGE; chips.forEach(function (x) { x.classList.toggle('active', x === c); }); run(); }); });
  q.addEventListener('input', function () { shown = PAGE; run(); });
  more.addEventListener('click', function () { shown += PAGE; run(); });
  run();
})();
