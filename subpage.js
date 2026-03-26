// ===== KOCO SUBPAGE SCRIPT =====
// Overrides and supplements script.js for subpages that don't have
// the full main page structure (carousel, modals, etc.)

(function() {
  'use strict';

  // Wait for DOM + script.js to fully load
  function initSubpage() {

    // ---- Language Switcher ----
    const langSwitcherEl = document.getElementById('langSwitcher');
    const langTriggerEl  = document.getElementById('langTrigger');

    if (langTriggerEl && langSwitcherEl) {
      // Remove any existing listeners by cloning
      const newTrigger = langTriggerEl.cloneNode(true);
      langTriggerEl.parentNode.replaceChild(newTrigger, langTriggerEl);

      newTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        langSwitcherEl.classList.toggle('open');
        document.getElementById('userDropdown')?.classList.remove('show');
      });
    }

    // Re-bind lang-option clicks to use applyLang (the correct function name in script.js)
    document.querySelectorAll('.lang-option').forEach(function(btn) {
      // Clone to remove old listeners
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        if (!lang) return;

        // Call the correct function from script.js
        if (typeof applyLang === 'function') {
          applyLang(lang);
        } else {
          // Fallback: manually update flag + code display
          const flagEl = document.getElementById('langFlag');
          const codeEl = document.getElementById('langCode');
          if (flagEl) flagEl.textContent = this.getAttribute('data-flag') || '';
          if (codeEl) codeEl.textContent = lang;
          // Update active state
          document.querySelectorAll('.lang-option').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
          });
        }

        // Close dropdown
        if (langSwitcherEl) langSwitcherEl.classList.remove('open');
      });
    });

    // ---- User Avatar Dropdown ----
    const userAvatarBtnEl = document.getElementById('userAvatarBtn');
    const userDropdownEl  = document.getElementById('userDropdown');

    if (userAvatarBtnEl && userDropdownEl) {
      const newAvatarBtn = userAvatarBtnEl.cloneNode(true);
      userAvatarBtnEl.parentNode.replaceChild(newAvatarBtn, userAvatarBtnEl);

      newAvatarBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdownEl.classList.toggle('show');
        if (langSwitcherEl) langSwitcherEl.classList.remove('open');
      });
    }

    // ---- Notification Bell (subpages don't have notifDropdown, so just prevent errors) ----
    const notifBellEl = document.getElementById('notifBell');
    if (notifBellEl) {
      const newBell = notifBellEl.cloneNode(true);
      notifBellEl.parentNode.replaceChild(newBell, notifBellEl);
      // No-op on subpages (no notification dropdown)
      newBell.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    // ---- Close all dropdowns on outside click ----
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#langSwitcher') && langSwitcherEl) {
        langSwitcherEl.classList.remove('open');
      }
      if (!e.target.closest('.nav-user') && userDropdownEl) {
        userDropdownEl.classList.remove('show');
      }
    });

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
      });
    }

    // ---- Apply saved language on page load ----
    // Read from localStorage if available (so language persists across pages)
    const savedLang = localStorage.getItem('koco_lang') || 'VN';
    if (typeof applyLang === 'function' && savedLang !== 'VN') {
      applyLang(savedLang);
    }

    // ---- Save language to localStorage when changed ----
    // Patch applyLang to also save to localStorage
    if (typeof applyLang === 'function') {
      const _orig = applyLang;
      window.applyLang = function(lang) {
        _orig(lang);
        try { localStorage.setItem('koco_lang', lang); } catch(e) {}
      };
    }
  }

  // Run after script.js has executed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubpage);
  } else {
    // DOM already ready, but give script.js a tick to finish
    setTimeout(initSubpage, 0);
  }
})();
