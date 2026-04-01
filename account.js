// ===== KOCO ACCOUNT CENTER SCRIPT =====
(function() {
  'use strict';

  function initAccount() {

    // ---- Section Navigation ----
    const navItems = document.querySelectorAll('.ac-nav-item');
    const sections = document.querySelectorAll('.ac-section');
    const sidebar = document.getElementById('acSidebar');
    const overlay = document.querySelector('.ac-sidebar-overlay');

    function switchSection(sectionId) {
      // Update nav active state
      navItems.forEach(function(item) {
        item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
      });
      // Show/hide sections
      sections.forEach(function(sec) {
        sec.classList.toggle('active', sec.id === 'sec-' + sectionId);
      });
      // Close mobile sidebar
      closeMobileSidebar();
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        var section = this.getAttribute('data-section');
        if (section) {
          switchSection(section);
          // Update URL hash
          history.replaceState(null, '', '#' + section);
        }
      });
    });

    // Handle initial hash
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('sec-' + hash)) {
      switchSection(hash);
    }

    // ---- Tab Switching ----
    document.querySelectorAll('.ac-tabs').forEach(function(tabContainer) {
      tabContainer.querySelectorAll('.ac-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
          tabContainer.querySelectorAll('.ac-tab').forEach(function(t) {
            t.classList.remove('active');
          });
          this.classList.add('active');
        });
      });
    });

    // ---- Mobile Sidebar Toggle ----
    var mobileToggle = document.querySelector('.ac-mobile-toggle');

    function openMobileSidebar() {
      if (sidebar) sidebar.classList.add('open');
      if (overlay) overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileSidebar() {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        if (sidebar && sidebar.classList.contains('open')) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeMobileSidebar);
    }

    // ---- Language Switcher ----
    var langSwitcherEl = document.getElementById('langSwitcher');
    var langTriggerEl = document.getElementById('langTrigger');

    if (langTriggerEl && langSwitcherEl) {
      var newTrigger = langTriggerEl.cloneNode(true);
      langTriggerEl.parentNode.replaceChild(newTrigger, langTriggerEl);

      newTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        langSwitcherEl.classList.toggle('open');
      });
    }

    document.querySelectorAll('.lang-option').forEach(function(btn) {
      var newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', function() {
        var lang = this.getAttribute('data-lang');
        if (!lang) return;
        if (typeof applyLang === 'function') {
          applyLang(lang);
        } else {
          var flagEl = document.getElementById('langFlag');
          var codeEl = document.getElementById('langCode');
          if (flagEl) flagEl.textContent = this.getAttribute('data-flag') || '';
          if (codeEl) codeEl.textContent = lang;
          document.querySelectorAll('.lang-option').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
          });
        }
        if (langSwitcherEl) langSwitcherEl.classList.remove('open');
      });
    });

    // ---- User Avatar (no dropdown on account page, just link back) ----
    var userAvatarBtn = document.getElementById('userAvatarBtn');
    if (userAvatarBtn) {
      userAvatarBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Already on account page, scroll to top
        switchSection('profile');
        history.replaceState(null, '', '#profile');
      });
    }

    // ---- Notification Bell ----
    var notifBell = document.getElementById('notifBell');
    if (notifBell) {
      notifBell.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    // ---- Close dropdowns on outside click ----
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#langSwitcher') && langSwitcherEl) {
        langSwitcherEl.classList.remove('open');
      }
    });

    // ---- Navbar scroll effect ----
    var navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
      });
    }

    // ---- Apply saved language (read from both possible keys) ----
    var savedLang = '';
    try {
      savedLang = localStorage.getItem('kocoLang') || localStorage.getItem('koco_lang') || 'VN';
    } catch(e) { savedLang = 'VN'; }

    if (typeof applyLang === 'function' && savedLang && savedLang !== 'VN') {
      applyLang(savedLang);
    }

    // Wrap applyLang to always persist language to localStorage
    if (typeof applyLang === 'function') {
      var _origApply = applyLang;
      window.applyLang = function(lang) {
        _origApply(lang);
        try {
          localStorage.setItem('kocoLang', lang);
          localStorage.setItem('koco_lang', lang);
        } catch(e) {}
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccount);
  } else {
    setTimeout(initAccount, 0);
  }
})();
