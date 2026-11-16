/* googlefixmybiz — shared behavior. Loaded on every page (after Lenis). */
(function(){
  'use strict';
  var d = document;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;
  function $(s, c){ return (c || d).querySelector(s); }
  function $$(s, c){ return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  /* ---------- smooth scroll ---------- */
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, easing: function(t){ return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
  }

  /* ---------- mobile menu ---------- */
  var burger = $('.burger'), mnav = $('#mnav'), scrim = $('.mscrim');
  function setMenu(open){
    if (!burger || !mnav) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mnav.classList.toggle('open', open);
    scrim.classList.toggle('open', open);
    d.body.classList.toggle('no-scroll', open);
    if (lenis) { open ? lenis.stop() : lenis.start(); }
  }
  if (burger && mnav && scrim) {
    burger.addEventListener('click', function(){ setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    scrim.addEventListener('click', function(){ setMenu(false); });
    d.addEventListener('keydown', function(e){ if (e.key === 'Escape') setMenu(false); });
    $$('a', mnav).forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });
    var mc = $('.mclose', mnav); if (mc) mc.addEventListener('click', function(){ setMenu(false); });
  }

  /* ---------- same-page anchor links ---------- */
  d.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.origin !== location.origin || u.pathname.replace(/\/$/, '') !== location.pathname.replace(/\/$/, '') || u.hash.length < 2) return;
    var el = d.getElementById(decodeURIComponent(u.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', u.hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  /* ---------- scroll progress, nav shadow, parallax, timelines ---------- */
  var prog = $('.sprog i'), nav = $('.nav');
  var parallax = $$('[data-speed]'), tls = $$('.tl');
  var ticking = false;
  function onScroll(){
    var y = window.scrollY, vh = window.innerHeight;
    var max = d.documentElement.scrollHeight - vh;
    if (prog) prog.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')';
    if (nav) nav.classList.toggle('stuck', y > 8);
    if (!reduce) {
      parallax.forEach(function(el){
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var sp = parseFloat(el.dataset.speed || '0.06');
        el.style.transform = 'translate3d(0,' + (-((r.top + r.height / 2) - vh / 2) * sp).toFixed(1) + 'px,0)';
      });
    }
    tls.forEach(function(tl){
      var r = tl.getBoundingClientRect();
      var p = clamp((vh * 0.62 - r.top) / r.height, 0, 1);
      tl.style.setProperty('--p', p.toFixed(3));
      var lineEnd = r.top + 8 + (r.height - 16) * p;
      $$('.tl-step', tl).forEach(function(s){
        s.classList.toggle('on', s.getBoundingClientRect().top + 20 <= lineEnd);
      });
    });
    ticking = false;
  }
  function req(){ if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  if (lenis) lenis.on('scroll', req);

  /* ---------- word-split headings ---------- */
  function split(el){
    var i = 0;
    (function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if (n.nodeType === 3) {
          var frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(tok){
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(d.createTextNode(' ')); return; }
            var w = d.createElement('span'); w.className = 'w';
            var s = d.createElement('span'); s.textContent = tok; s.style.setProperty('--i', i++);
            w.appendChild(s); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
      });
    })(el);
    el.classList.add('split-ready');
  }
  $$('[data-split]').forEach(split);

  /* ---------- count-up ---------- */
  function countUp(n){
    if (n.dataset.done) return; n.dataset.done = '1';
    var target = parseFloat(n.dataset.count), dec = parseInt(n.dataset.dec || '0', 10);
    var pre = n.dataset.prefix || '', suf = n.dataset.suffix || '';
    if (reduce) { n.textContent = pre + (dec ? target.toFixed(dec) : Math.round(target).toLocaleString()) + suf; return; }
    var s = performance.now();
    (function tick(t){
      var p = Math.min(1, (t - s) / 1500), v = target * (1 - Math.pow(1 - p, 3));
      n.textContent = pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString()) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(s);
  }

  /* ---------- rank grid (animated local-ranking heat map) ---------- */
  function rnd(seed){ var x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); }
  function rankInit(g){
    if (g.dataset.built) return; g.dataset.built = '1';
    var n = parseInt(g.dataset.n || '5', 10), c = (n - 1) / 2, before = [], after = [];
    g.style.gridTemplateColumns = 'repeat(' + n + ',1fr)';
    for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) {
      var dist = Math.sqrt(Math.pow(r - c, 2) + Math.pow(k - c, 2)) / c, id = r * n + k;
      before.push(clamp(Math.round(5 + dist * 11 + rnd(id + 1) * 6), 4, 20));
      after.push(clamp(Math.round(1 + dist * 2.2 + rnd(id + 40) * 2.2), 1, 9));
      var cell = d.createElement('i'); cell.dataset.d = dist.toFixed(2);
      if (r === c && k === c) cell.className = 'me';
      g.appendChild(cell);
    }
    g._b = before; g._a = after;
    rankSet(g, g.dataset.rank === 'after' ? 'after' : 'before', false);
  }
  function cls(v){ return v <= 3 ? 'g' : v <= 10 ? 'y' : 'r'; }
  function rankSet(g, mode, animate){
    var arr = mode === 'after' ? g._a : g._b;
    $$('i', g).forEach(function(cell, idx){
      var apply = function(){ cell.textContent = arr[idx]; cell.classList.remove('g', 'y', 'r'); cell.classList.add(cls(arr[idx])); };
      if (animate && !reduce) setTimeout(apply, parseFloat(cell.dataset.d) * 520 + rnd(idx) * 160); else apply();
    });
    g.dataset.mode = mode;
    var lab = g.dataset.label && $(g.dataset.label);
    if (lab) lab.textContent = mode === 'after' ? (g.dataset.afterText || 'After') : (g.dataset.beforeText || 'Before');
  }
  function rankStart(g){
    g.classList.add('live');
    if (g.dataset.rank === 'auto') {
      setTimeout(function(){ rankSet(g, 'after', true); }, 1100);
      if (g.dataset.loop !== undefined) setInterval(function(){ rankSet(g, g.dataset.mode === 'after' ? 'before' : 'after', true); }, 4800);
    }
  }
  $$('.rg').forEach(rankInit);
  $$('[data-rank-set]').forEach(function(b){
    b.addEventListener('click', function(){
      var g = $(b.dataset.rankFor); if (!g) return;
      rankSet(g, b.dataset.rankSet, true);
      $$('[data-rank-for="' + b.dataset.rankFor + '"]').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    });
  });

  /* ---------- reveal engine ---------- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      var t = e.target;
      t.classList.add('in');
      if (t.matches('[data-count]')) countUp(t);
      $$('[data-count]', t).forEach(countUp);
      if (t.matches('.rg')) rankStart(t);
      $$('.rg', t).forEach(rankStart);
      io.unobserve(t);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.rv,.rv-l,.rv-r,.rv-s,[data-split],[data-count],.rg').forEach(function(el){ io.observe(el); });

  /* ---------- tilt + magnetic (fine pointers only) ---------- */
  if (fine && !reduce) {
    $$('[data-tilt]').forEach(function(el){
      el.addEventListener('pointermove', function(e){
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.classList.add('tilting');
        el.style.transform = 'perspective(900px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg) translateY(-4px)';
      });
      el.addEventListener('pointerleave', function(){ el.classList.remove('tilting'); el.style.transform = ''; });
    });
    $$('[data-mag]').forEach(function(el){
      el.addEventListener('pointermove', function(e){
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
    });
  }

  /* ---------- marquee ---------- */
  $$('.marq-track').forEach(function(t){ t.innerHTML += t.innerHTML; t.setAttribute('aria-hidden', 'true'); });

  /* ---------- carousel ---------- */
  $$('[data-carousel]').forEach(function(box){
    var track = $('.track', box), prev = $('[data-prev]', box), next = $('[data-next]', box);
    if (!track) return;
    function sync(){
      if (prev) prev.classList.toggle('dis', track.scrollLeft < 8);
      if (next) next.classList.toggle('dis', track.scrollLeft + track.clientWidth >= track.scrollWidth - 8);
    }
    var step = function(){ var c = track.children[0]; return c ? c.getBoundingClientRect().width + 30 : 400; };
    if (prev) prev.addEventListener('click', function(){ track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function(){ track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', sync, { passive: true }); sync();
  });

  /* ---------- filters: <div data-filters="#grid"> <button data-filter="x"> ; items carry data-cat="x y" ---------- */
  $$('[data-filters]').forEach(function(box){
    var target = $(box.dataset.filters); if (!target) return;
    var chips = $$('[data-filter]', box);
    function apply(f){
      chips.forEach(function(c){ c.setAttribute('aria-pressed', c.dataset.filter === f ? 'true' : 'false'); });
      $$('[data-cat]', target).forEach(function(it){
        var show = f === 'all' || it.dataset.cat.split(' ').indexOf(f) > -1;
        it.classList.toggle('hide', !show);
      });
      var empty = $('[data-empty]', target.parentNode);
      if (empty) empty.hidden = !!$$('[data-cat]:not(.hide)', target).length;
    }
    chips.forEach(function(c){ c.addEventListener('click', function(){ apply(c.dataset.filter); }); });
    var h = decodeURIComponent((location.hash || '').slice(1));
    apply(chips.some(function(c){ return c.dataset.filter === h; }) ? h : 'all');
    window.addEventListener('hashchange', function(){
      var hh = decodeURIComponent((location.hash || '').slice(1));
      if (chips.some(function(c){ return c.dataset.filter === hh; })) apply(hh);
    });
  });

  /* ---------- forms (front-end only until wired to a backend) ---------- */
  $$('form[data-form]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var host = f.closest('.news');
      f.classList.add('done');
      if (host) host.classList.add('done');
      var ok = $('.form-ok', f) || (host && $('.ok', host));
      if (ok) ok.setAttribute('role', 'status');
      f.dispatchEvent(new CustomEvent('gfmb:submit', { bubbles: true }));
    });
  });

  /* public helpers for page scripts */
  window.GFMB = { lenis: lenis, reduce: reduce, countUp: countUp, rankInit: rankInit, rankSet: rankSet, rankStart: rankStart, clamp: clamp };
  onScroll();
})();
