/* ======================================================================
   Raphael Souza · Nutricionista Esportivo
   Vanilla JS — scroll reveal, sticky CTA, counter, year
   ====================================================================== */

(() => {
  'use strict';

  // ----- Year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // ----- Stat counter -----
  const stats = document.querySelectorAll('.stat-num[data-count]');
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const formatter = new Intl.NumberFormat('pt-BR');
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const value = Math.floor(easeOut(p) * target);
      el.textContent = formatter.format(value) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (stats.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          so.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach((el) => so.observe(el));
  }

  // ----- Sticky CTA (appears after hero scrolls past) -----
  const stickyCta = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');
  if (stickyCta && hero && 'IntersectionObserver' in window) {
    const heroSentinel = document.createElement('div');
    heroSentinel.style.cssText = 'position:absolute;bottom:0;width:1px;height:1px;';
    hero.appendChild(heroSentinel);

    const ho = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting && e.boundingClientRect.top < 0) {
          stickyCta.classList.add('in');
        } else {
          stickyCta.classList.remove('in');
        }
      });
    }, { threshold: 0 });
    ho.observe(heroSentinel);
  } else if (stickyCta) {
    stickyCta.classList.add('in');
  }

  // ----- Header shadow on scroll -----
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 1px 0 0 rgba(212,255,58,.15), 0 10px 30px rgba(0,0,0,.45)'
        : 'none';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- CTA click analytics hook (drop-in for GTM/Meta Pixel/GA4) -----
  document.querySelectorAll('[data-evt]').forEach((el) => {
    el.addEventListener('click', () => {
      const evt = el.dataset.evt;
      // Hooks for tracking — wire up later:
      // window.dataLayer && window.dataLayer.push({ event: 'cta_click', cta: evt });
      // window.fbq && window.fbq('track', 'Lead', { source: evt });
      // window.gtag && window.gtag('event', 'cta_click', { cta_id: evt });
      if (window.console && window.console.debug) console.debug('[cta]', evt);
    });
  });
})();
