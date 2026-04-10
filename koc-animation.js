// ========== KOC VISUAL CARD ANIMATION ==========
// Triggers on scroll into view: card entrance, avatar bounce, number counting,
// particle & glow canvas, slide-up stats panel

(function () {
  'use strict';

  // ---- Easing helpers ----
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // ---- Number formatting with commas ----
  function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ---- Count-up animation ----
  function countUp(el, target, duration, decimals) {
    const start = performance.now();
    decimals = decimals || 0;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = target * eased;

      if (decimals > 0) {
        el.textContent = current.toFixed(decimals);
      } else {
        el.textContent = formatNumber(Math.round(current));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Final value
        if (decimals > 0) {
          el.textContent = target.toFixed(decimals);
        } else {
          el.textContent = formatNumber(target);
        }
        // Remove counting glow
        el.classList.remove('koc-counting');
      }
    }

    el.classList.add('koc-counting');
    requestAnimationFrame(tick);
  }

  // ---- Particle & Glow Canvas ----
  function initCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const PARTICLE_COUNT = 35;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    function createParticle() {
      const rect = canvas.parentElement.getBoundingClientRect();
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 2 + 1,
        life: Math.random()
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    let frame = 0;
    function draw() {
      frame++;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Background glow orbs
      const t = frame * 0.02;

      // Purple glow - top left area
      const gx1 = w * 0.3 + Math.sin(t * 0.5) * 20;
      const gy1 = h * 0.25 + Math.cos(t * 0.3) * 15;
      const grad1 = ctx.createRadialGradient(gx1, gy1, 0, gx1, gy1, w * 0.35);
      const glowAlpha1 = 0.06 + 0.03 * Math.sin(t);
      grad1.addColorStop(0, 'rgba(120, 60, 200, ' + glowAlpha1 + ')');
      grad1.addColorStop(1, 'rgba(120, 60, 200, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      // Blue glow - bottom right area
      const gx2 = w * 0.75 + Math.cos(t * 0.4) * 18;
      const gy2 = h * 0.7 + Math.sin(t * 0.6) * 20;
      const grad2 = ctx.createRadialGradient(gx2, gy2, 0, gx2, gy2, w * 0.3);
      const glowAlpha2 = 0.05 + 0.025 * Math.cos(t * 0.8);
      grad2.addColorStop(0, 'rgba(60, 100, 220, ' + glowAlpha2 + ')');
      grad2.addColorStop(1, 'rgba(60, 100, 220, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Orange glow - top right (subtle)
      const gx3 = w * 0.85 + Math.sin(t * 0.7) * 10;
      const gy3 = h * 0.15 + Math.cos(t * 0.5) * 12;
      const grad3 = ctx.createRadialGradient(gx3, gy3, 0, gx3, gy3, w * 0.2);
      const glowAlpha3 = 0.04 + 0.02 * Math.sin(t * 1.2);
      grad3.addColorStop(0, 'rgba(255, 107, 53, ' + glowAlpha3 + ')');
      grad3.addColorStop(1, 'rgba(255, 107, 53, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life += 0.003;

        if (p.y < -5 || p.life > 1) {
          particles[i] = createParticle();
          particles[i].y = h + 5;
          continue;
        }

        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.05 * p.pulseSpeed);
        const alpha = p.alpha * pulse;
        const size = p.size * (0.7 + 0.6 * pulse);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 200, 255, ' + alpha + ')';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        initParticles();
      }, 200);
    });

    return function stop() {
      cancelAnimationFrame(animId);
    };
  }

  // ---- Main: Intersection Observer triggers all animations ----
  function initKocAnimation() {
    const card = document.getElementById('kocVisualCard');
    if (!card) return;

    const canvas = document.getElementById('kocCardCanvas');
    let canvasStarted = false;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // 1. Card entrance
          card.classList.add('koc-card-visible');

          // 2. Start canvas particles & glow
          if (!canvasStarted && canvas) {
            canvasStarted = true;
            setTimeout(function () { initCanvas(canvas); }, 300);
          }

          // 3. Trigger avatar bounce-in
          var avatars = card.querySelectorAll('.koc-anim-avatar');
          avatars.forEach(function (el) {
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(function () { el.classList.add('koc-animated'); }, delay);
          });

          // 4. Trigger fade-in elements
          var fades = card.querySelectorAll('.koc-anim-fade');
          fades.forEach(function (el) {
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(function () { el.classList.add('koc-animated'); }, delay);
          });

          // 5. Trigger slide-up elements
          var slides = card.querySelectorAll('.koc-anim-slide-up');
          slides.forEach(function (el) {
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(function () { el.classList.add('koc-animated'); }, delay);
          });

          // 6. Number count-up
          var countEls = card.querySelectorAll('.koc-count-up');
          countEls.forEach(function (el) {
            var target = parseFloat(el.getAttribute('data-target'));
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(function () { countUp(el, target, 2000, 0); }, delay);
          });

          // 7. Decimal count-up (rating)
          var decimalEls = card.querySelectorAll('.koc-count-up-decimal');
          decimalEls.forEach(function (el) {
            var target = parseFloat(el.getAttribute('data-target'));
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(function () { countUp(el, target, 1500, 1); }, delay);
          });

          // Only trigger once
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(card);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKocAnimation);
  } else {
    initKocAnimation();
  }
})();
