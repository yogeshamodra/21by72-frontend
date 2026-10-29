/* Gallery page: season filter + lightbox (arrow keys, Esc, click outside).
   Needs: .sch-chip[data-season], .gal-item[data-season] > .gal-btn > img, #gal-lb (+ #gal-img, #gal-cap). */
(function () {
  var items = [].slice.call(document.querySelectorAll('.gal-item')), chips = [].slice.call(document.querySelectorAll('.gal-filter .sch-chip')),
      lb = document.getElementById('gal-lb'), img = document.getElementById('gal-img'), cap = document.getElementById('gal-cap'), cur = -1;
  if (!items.length || !lb) return;
  function visible() { return items.filter(function (i) { return !i.hidden; }); }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.toggle('active', x === c); });
      items.forEach(function (i) { i.hidden = !!c.dataset.season && i.dataset.season !== c.dataset.season; });
    });
  });
  function show(list, k) {
    var it = list[(k + list.length) % list.length], im = it.querySelector('img');
    cur = items.indexOf(it);
    img.src = im.currentSrc || im.src; img.alt = im.alt;
    cap.textContent = it.querySelector('figcaption b').textContent + ' \u00b7 ' + im.alt;
  }
  function open(i) { lb.hidden = false; document.body.style.overflow = 'hidden'; var v = visible(); show(v, v.indexOf(items[i])); }
  function close() { lb.hidden = true; document.body.style.overflow = ''; img.src = ''; }
  function step(d) { var v = visible(); show(v, v.indexOf(items[cur]) + d); }
  items.forEach(function (it, i) { it.querySelector('.gal-btn').addEventListener('click', function () { open(i); }); });
  lb.addEventListener('click', function (e) {
    var a = e.target.dataset.act;
    if (a === 'close' || e.target === lb) close(); else if (a === 'prev') step(-1); else if (a === 'next') step(1);
  });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') step(-1); else if (e.key === 'ArrowRight') step(1);
  });
})();
