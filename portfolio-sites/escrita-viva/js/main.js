/* ======================================================================
   CURSO ESCRITA VIVA — main.js
   ====================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Typewriter do hero ─────────────────────────────────────────── */
  var words       = ['roteiros.', 'romances.', 'contos.', 'histórias.', 'crônicas.'];
  var heroEl      = document.querySelector('.typewriter-word');
  var heroIdx     = 0;
  var heroChar    = 0;
  var heroDeleting = false;
  var heroLast    = 0;
  var heroDelay   = 110;

  function heroTick(ts) {
    if (!heroEl) return;
    if (reduced) { heroEl.textContent = words[0]; return; }
    if (ts - heroLast < heroDelay) { requestAnimationFrame(heroTick); return; }
    heroLast = ts;

    var word = words[heroIdx];
    if (!heroDeleting) {
      heroEl.textContent = word.slice(0, heroChar + 1);
      heroChar++;
      if (heroChar === word.length) { heroDeleting = true; heroDelay = 1800; }
      else heroDelay = 110;
    } else {
      if (heroDelay === 1800) { heroDelay = 60; }
      heroEl.textContent = word.slice(0, heroChar - 1);
      heroChar--;
      if (heroChar === 0) {
        heroDeleting = false;
        heroIdx = (heroIdx + 1) % words.length;
        heroDelay = 400;
      }
    }
    requestAnimationFrame(heroTick);
  }
  setTimeout(function () { requestAnimationFrame(heroTick); }, 600);

  /* ── Typewriter do Manuscrito (rAF) ─────────────────────────────── */
  var msEl      = document.getElementById('msText');
  var msPhrases = [
    'Era uma noite de inverno quando ela abriu o caderno e começou a escrever. As palavras vieram — desta vez, sem travar.',
    'Ele não sabia que a história já existia dentro dele. Só precisava aprender a encontrá-la.',
    'A página em branco deixou de ser um obstáculo no dia em que ela descobriu que escrever é uma habilidade — não um dom.'
  ];
  var msIdx   = 0;
  var msChar  = 0;
  var msDel   = false;
  var msLast  = 0;
  var msDelay = 48;

  function msTick(ts) {
    if (!msEl) return;
    if (reduced) { msEl.textContent = msPhrases[0]; return; }
    if (ts - msLast < msDelay) { requestAnimationFrame(msTick); return; }
    msLast = ts;

    var phrase = msPhrases[msIdx];
    if (!msDel) {
      msEl.textContent = phrase.slice(0, msChar + 1);
      msChar++;
      if (msChar === phrase.length) { msDel = true; msDelay = 2800; }
      else msDelay = 48;
    } else {
      if (msDelay === 2800) { msDelay = 22; }
      msEl.textContent = phrase.slice(0, msChar - 1);
      msChar--;
      if (msChar === 0) {
        msDel = false;
        msIdx = (msIdx + 1) % msPhrases.length;
        msDelay = 500;
      }
    }
    requestAnimationFrame(msTick);
  }
  setTimeout(function () { requestAnimationFrame(msTick); }, 1200);

  /* ── Scroll Reveal ──────────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Sticky Header ──────────────────────────────────────────────── */
  var header = document.getElementById('siteHeader');
  var lastScroll = 0;

  function onScroll() {
    var y = window.scrollY;
    if (!header) return;
    header.classList.toggle('scrolled', y > 36);
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Sticky CTA ─────────────────────────────────────────────────── */
  var stickyCta = document.getElementById('stickyCta');
  var hero      = document.querySelector('.hero');

  if (stickyCta && hero && 'IntersectionObserver' in window) {
    var ctaObs = new IntersectionObserver(
      function (entries) {
        var visible = !entries[0].isIntersecting;
        stickyCta.classList.toggle('is-visible', visible);
        stickyCta.setAttribute('aria-hidden', String(!visible));
      },
      { threshold: 0.15 }
    );
    ctaObs.observe(hero);
  }

  /* ── Count-up nos stats ─────────────────────────────────────────── */
  var statEls = document.querySelectorAll('.stat-num[data-target]');

  if (!reduced && statEls.length && 'IntersectionObserver' in window) {
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        statObs.unobserve(entry.target);
        var el     = entry.target;
        var target = parseInt(el.dataset.target, 10);
        var prefix = el.dataset.prefix || '';
        var start  = 0;
        var dur    = 900;
        var t0     = null;

        function step(ts) {
          if (!t0) t0 = ts;
          var progress = Math.min((ts - t0) / dur, 1);
          var ease     = 1 - Math.pow(1 - progress, 3);
          var val      = Math.round(start + (target - start) * ease);
          el.textContent = prefix + val.toLocaleString('pt-BR');
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    statEls.forEach(function (el) { statObs.observe(el); });
  }

  /* ── Expandir depoimento ────────────────────────────────────────── */
  var expandBtn = document.querySelector('.expand-btn');
  var fullText  = document.querySelector('.testimonial-full');

  if (expandBtn && fullText) {
    expandBtn.addEventListener('click', function () {
      var expanded = expandBtn.getAttribute('aria-expanded') === 'true';
      fullText.hidden = expanded;
      expandBtn.setAttribute('aria-expanded', String(!expanded));
      expandBtn.textContent = expanded ? 'Ler mais' : 'Ler menos';
    });
  }

  /* ── Smooth scroll âncoras (nativo com fallback) ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: top, behavior: 'smooth' });
      } else {
        window.scrollTo(0, top);
      }
    });
  });

  /* ── FAQ — fecha outros ao abrir um ────────────────────────────── */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

})();
