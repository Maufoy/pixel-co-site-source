/* ======================================================================
   CURSO ESCRITA VIVA — main.js
   ====================================================================== */

(function () {
  'use strict';

  /* ── Typewriter no hero ─────────────────────────────────────────── */
  var words  = ['roteiros.', 'romances.', 'contos.', 'histórias.', 'crônicas.'];
  var el     = document.querySelector('.typewriter-word');
  var index  = 0;
  var charIdx = 0;
  var deleting = false;
  var typePause = 110;
  var deletePause = 60;
  var waitAfterWord = 1800;
  var waitBeforeType = 400;

  function type() {
    if (!el) return;
    var word = words[index];

    if (!deleting) {
      el.textContent = word.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(type, waitAfterWord);
        return;
      }
      setTimeout(type, typePause);
    } else {
      el.textContent = word.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        index = (index + 1) % words.length;
        setTimeout(type, waitBeforeType);
        return;
      }
      setTimeout(type, deletePause);
    }
  }

  setTimeout(type, 600);

  /* ── Typewriter do Manuscrito ───────────────────────────────────── */
  var msEl      = document.getElementById('msText');
  var msPhrases = [
    'Era uma noite de inverno quando ela abriu o caderno e começou a escrever. As palavras vieram — desta vez, sem travar.',
    'Ele não sabia que a história já existia dentro dele. Só precisava aprender a encontrá-la.',
    'A página em branco deixou de ser um obstáculo no dia em que ela descobriu que escrever é uma habilidade — não um dom.'
  ];
  var msIdx     = 0;
  var msChar    = 0;
  var msDel     = false;

  function typeMs() {
    if (!msEl) return;
    var phrase = msPhrases[msIdx];

    if (!msDel) {
      msEl.textContent = phrase.slice(0, msChar + 1);
      msChar++;
      if (msChar === phrase.length) {
        msDel = true;
        setTimeout(typeMs, 2800);
        return;
      }
      setTimeout(typeMs, 48);
    } else {
      msEl.textContent = phrase.slice(0, msChar - 1);
      msChar--;
      if (msChar === 0) {
        msDel = false;
        msIdx = (msIdx + 1) % msPhrases.length;
        setTimeout(typeMs, 500);
        return;
      }
      setTimeout(typeMs, 22);
    }
  }

  setTimeout(typeMs, 1200);

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
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Sticky Header ──────────────────────────────────────────────── */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 36);
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

  /* ── Smooth scroll âncoras ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

  /* ── FAQ — fechar outros ao abrir um ───────────────────────────── */
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

  /* ── Notebook cursor blink delay sync ──────────────────────────── */
  var nbCursor = document.querySelector('.nb-cursor');
  if (nbCursor) {
    setInterval(function () {
      nbCursor.style.opacity = nbCursor.style.opacity === '0' ? '1' : '0';
    }, 900);
  }

})();
