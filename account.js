// ===== KOCO ACCOUNT CENTER SCRIPT =====
(function() {
  'use strict';

  // ---- In-memory orders store (simulates backend state) ----
  var orders = [];

  function initAccount() {
    // ---- Patch i18n dict for keys not yet in script.js cache ----
    if (typeof i18n !== 'undefined') {
      if (!i18n.VN.ac_redeem) i18n.VN.ac_redeem = 'Đổi thưởng';
      if (!i18n.CN.ac_redeem) i18n.CN.ac_redeem = '兑换奖品';
      if (!i18n.ID.ac_redeem) i18n.ID.ac_redeem = 'Tukar hadiah';
    }

    // ---- Section Navigation ----
    var navItems = document.querySelectorAll('.ac-nav-item');
    var sections = document.querySelectorAll('.ac-section');
    var sidebar = document.getElementById('acSidebar');
    var overlay = document.querySelector('.ac-sidebar-overlay');

    function switchSection(sectionId) {
      navItems.forEach(function(item) {
        item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
      });
      sections.forEach(function(sec) {
        sec.classList.toggle('active', sec.id === 'sec-' + sectionId);
      });
      closeMobileSidebar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (sectionId === 'orders') renderOrders('all');
    }

    navItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        var section = this.getAttribute('data-section');
        if (section) {
          switchSection(section);
          history.replaceState(null, '', '#' + section);
        }
      });
    });

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

          if (tabContainer.id === 'participationTabs') {
            var selectedTab = this.getAttribute('data-tab');
            document.querySelectorAll('#partList .ac-part-card').forEach(function(card) {
              var status = card.getAttribute('data-status');
              card.classList.toggle('hide', selectedTab !== 'all' && status !== selectedTab);
            });
          }

          if (tabContainer.id === 'ordersTabs') {
            renderOrders(this.getAttribute('data-tab'));
          }
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
    if (overlay) overlay.addEventListener('click', closeMobileSidebar);

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
        if (typeof applyLang === 'function') applyLang(lang);
        if (langSwitcherEl) langSwitcherEl.classList.remove('open');
      });
    });

    var userAvatarBtn = document.getElementById('userAvatarBtn');
    if (userAvatarBtn) {
      userAvatarBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        switchSection('profile');
        history.replaceState(null, '', '#profile');
      });
    }

    document.addEventListener('click', function(e) {
      if (!e.target.closest('#langSwitcher') && langSwitcherEl) {
        langSwitcherEl.classList.remove('open');
      }
    });

    var navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
      });
    }

    // ---- Apply saved language ----
    var savedLang = '';
    try {
      savedLang = localStorage.getItem('kocoLang') || localStorage.getItem('koco_lang') || 'VN';
    } catch(e) { savedLang = 'VN'; }

    if (typeof applyLang === 'function' && savedLang && savedLang !== 'VN') {
      applyLang(savedLang);
    }

    // Tab label translations (bypasses applyLang to avoid (0) duplication)
    var tabLabels = {
      VN: { all: 'Tất cả', shipped: 'Đã gửi hàng', completed: 'Đã hoàn thành', active: 'Đang tham gia', won: 'Đã trúng', lost: 'Không trúng' },
      CN: { all: '全部', shipped: '已发货', completed: '已完成', active: '参与中', won: '已中奖', lost: '未中奖' },
      ID: { all: 'Semua', shipped: 'Sudah dikirim', completed: 'Selesai', active: 'Sedang ikut', won: 'Menang', lost: 'Tidak menang' }
    };

    function updateTabLabels(lang) {
      var t = tabLabels[lang] || tabLabels['VN'];
      var map = {
        ordersTabLabelAll: t.all,
        ordersTabLabelShipped: t.shipped,
        ordersTabLabelCompleted: t.completed,
        partTabLabelAll: t.all,
        partTabLabelActive: t.active,
        partTabLabelWon: t.won,
        partTabLabelLost: t.lost
      };
      Object.keys(map).forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.textContent = map[id];
      });
    }

    if (typeof applyLang === 'function') {
      var _origApply = applyLang;
      window.applyLang = function(lang) {
        _origApply(lang);
        updateTabLabels(lang);
        try {
          localStorage.setItem('kocoLang', lang);
          localStorage.setItem('koco_lang', lang);
        } catch(e) {}
      };
    }

    // Apply tab labels for saved language on init
    updateTabLabels(savedLang || 'VN');

    // ================================================================
    // ---- REDEEM FLOW ----
    // ================================================================

    // Helper: open / close overlay modals
    function openModal(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }
    function closeModal(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    // Close buttons
    var closeVirtual = document.getElementById('closeVirtualModal');
    if (closeVirtual) closeVirtual.addEventListener('click', function() { closeModal('redeemVirtualModal'); });

    var closePhysical = document.getElementById('closePhysicalModal');
    if (closePhysical) closePhysical.addEventListener('click', function() { closeModal('redeemPhysicalModal'); });

    var closeShipSuccess = document.getElementById('closeShippingSuccess');
    if (closeShipSuccess) closeShipSuccess.addEventListener('click', function() { closeModal('shippingSuccessModal'); });

    // Close on overlay click
    ['redeemVirtualModal', 'redeemPhysicalModal', 'shippingSuccessModal'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', function(e) {
          if (e.target === el) closeModal(id);
        });
      }
    });

    // Copy card code button
    var copyBtn2 = document.getElementById('copyCodeBtn2');
    var copiedTip = document.getElementById('copiedTip');
    if (copyBtn2) {
      copyBtn2.addEventListener('click', function() {
        var code = document.getElementById('virtualCodeValue');
        if (code) {
          navigator.clipboard.writeText(code.textContent).catch(function() {
            var ta = document.createElement('textarea');
            ta.value = code.textContent;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          });
        }
        if (copiedTip) {
          copiedTip.classList.add('show');
          setTimeout(function() { copiedTip.classList.remove('show'); }, 2000);
        }
      });
    }

    // "View orders" button in virtual modal
    var virtualConfirmBtn = document.getElementById('virtualConfirmBtn');
    if (virtualConfirmBtn) {
      virtualConfirmBtn.addEventListener('click', function() {
        closeModal('redeemVirtualModal');
        switchSection('orders');
        history.replaceState(null, '', '#orders');
        // Activate "completed" tab
        setTimeout(function() {
          var completedTab = document.querySelector('#ordersTabs [data-tab="completed"]');
          if (completedTab) completedTab.click();
        }, 100);
      });
    }

    // Shipping form submit
    var shippingForm = document.getElementById('shippingForm');
    if (shippingForm) {
      shippingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var productName = document.getElementById('physicalProductName').textContent;
        var name = document.getElementById('shipName').value;
        var phone = document.getElementById('shipPhone').value;
        var address = document.getElementById('shipAddress').value;
        var city = document.getElementById('shipCity').value;
        var zip = document.getElementById('shipZip').value;
        var note = document.getElementById('shipNote').value;

        // Create shipped order
        addOrder({
          type: 'shipped',
          product: productName,
          img: 'images/iphone17-dark.jpg',
          category: 'Điện tử',
          date: getTodayStr(),
          address: name + ', ' + phone + ', ' + address + ', ' + city + (zip ? ' ' + zip : ''),
          note: note
        });

        // Mark participation card as redeemed
        markParticipationRedeemed(productName, 'physical');

        closeModal('redeemPhysicalModal');
        shippingForm.reset();
        openModal('shippingSuccessModal');
      });
    }

    // "View orders" button in shipping success modal
    var shipSuccessViewBtn = document.getElementById('shippingSuccessViewBtn');
    if (shipSuccessViewBtn) {
      shipSuccessViewBtn.addEventListener('click', function() {
        closeModal('shippingSuccessModal');
        switchSection('orders');
        history.replaceState(null, '', '#orders');
        setTimeout(function() {
          var shippedTab = document.querySelector('#ordersTabs [data-tab="shipped"]');
          if (shippedTab) shippedTab.click();
        }, 100);
      });
    }

    // Delegate: handle redeem button clicks on participation cards
    var partList = document.getElementById('partList');
    if (partList) {
      partList.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-action="redeem"]');
        if (!btn) return;

        var productType = btn.getAttribute('data-type');
        var productName = btn.getAttribute('data-product');
        var cardCode = btn.getAttribute('data-code') || '';

        if (productType === 'virtual') {
          // Show virtual modal with card code
          var nameEl = document.getElementById('virtualProductName');
          var codeEl = document.getElementById('virtualCodeValue');
          if (nameEl) nameEl.textContent = productName;
          if (codeEl) codeEl.textContent = cardCode;
          if (copiedTip) copiedTip.classList.remove('show');

          // Create completed order immediately
          addOrder({
            type: 'completed',
            product: productName,
            img: 'images/apple_gift_card.jpg',
            category: 'Thẻ nạp',
            date: getTodayStr(),
            code: cardCode
          });

          // Mark participation card as redeemed
          markParticipationRedeemed(productName, 'virtual');

          openModal('redeemVirtualModal');

        } else if (productType === 'physical') {
          // Show physical modal with shipping form
          var physNameEl = document.getElementById('physicalProductName');
          if (physNameEl) physNameEl.textContent = productName;
          openModal('redeemPhysicalModal');
        }
      });
    }

    // ================================================================
    // ---- ORDERS RENDERING ----
    // ================================================================

    function getTodayStr() {
      var d = new Date();
      return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth()+1)).slice(-2) + '/' + d.getFullYear();
    }

    function addOrder(order) {
      orders.push(order);
      renderOrders('all');
      updateOrdersStats();
    }

    function updateOrdersStats() {
      var all = orders.length;
      var shipped = orders.filter(function(o) { return o.type === 'shipped'; }).length;
      var completed = orders.filter(function(o) { return o.type === 'completed'; }).length;

      var elAll = document.getElementById('ordersStatAll');
      var elShipped = document.getElementById('ordersStatShipped');
      var elCompleted = document.getElementById('ordersStatCompleted');
      var tabAll = document.getElementById('ordersTabAll');
      var tabShipped = document.getElementById('ordersTabShipped');
      var tabCompleted = document.getElementById('ordersTabCompleted');

      if (elAll) elAll.textContent = all;
      if (elShipped) elShipped.textContent = shipped;
      if (elCompleted) elCompleted.textContent = completed;
      if (tabAll) tabAll.textContent = '(' + all + ')';
      if (tabShipped) tabShipped.textContent = '(' + shipped + ')';
      if (tabCompleted) tabCompleted.textContent = '(' + completed + ')';
    }

    function renderOrders(filter) {
      var list = document.getElementById('ordersList');
      var emptyEl = document.getElementById('ordersEmpty');
      if (!list) return;

      var filtered = filter === 'all' ? orders : orders.filter(function(o) { return o.type === filter; });

      if (filtered.length === 0) {
        list.innerHTML = '';
        if (emptyEl) emptyEl.style.display = '';
        return;
      }
      if (emptyEl) emptyEl.style.display = 'none';

      list.innerHTML = filtered.map(function(order) {
        var statusClass = order.type === 'shipped' ? 'active' : 'won';
        var statusI18n = order.type === 'shipped' ? 'ac_shipped' : 'ac_completed';
        var statusVN = order.type === 'shipped' ? 'Đã gửi hàng' : 'Đã hoàn thành';
        var extraInfo = '';
        if (order.type === 'shipped' && order.address) {
          extraInfo = '<div class="order-address"><span class="order-addr-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="color:#FF5722;vertical-align:middle"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg></span>' + order.address + '</div>';
        }
        if (order.type === 'completed' && order.code) {
          extraInfo = '<div class="order-code-row"><span class="order-code-label" data-i18n="rdm_card_code">Mã thẻ</span>: <strong class="order-code-val">' + order.code + '</strong></div>';
        }
        return '<div class="ac-part-card order-card" data-status="' + order.type + '">' +
          '<div class="ac-part-img-wrap"><img src="' + order.img + '" alt="' + order.product + '" class="ac-part-img" /></div>' +
          '<div class="ac-part-body">' +
            '<div class="ac-part-top">' +
              '<div class="ac-part-info">' +
                '<span class="ac-part-category">' + order.category + '</span>' +
                '<h3 class="ac-part-name">' + order.product + '</h3>' +
                '<div class="ac-part-meta"><span data-i18n="ac_joined_at">Tham gia</span> <strong>' + order.date + '</strong></div>' +
              '</div>' +
              '<span class="ac-part-status ' + statusClass + '" data-i18n="' + statusI18n + '">' + statusVN + '</span>' +
            '</div>' +
            extraInfo +
          '</div>' +
        '</div>';
      }).join('');

      // Re-apply language to newly rendered elements
      if (typeof applyLang === 'function') {
        var lang = '';
        try { lang = localStorage.getItem('kocoLang') || localStorage.getItem('koco_lang') || 'VN'; } catch(e) {}
        if (lang) applyLang(lang);
      }
    }

    // Mark participation card button as redeemed (disable + change text)
    function markParticipationRedeemed(productName, type) {
      var cards = document.querySelectorAll('#partList .ac-part-card[data-status="won"]');
      cards.forEach(function(card) {
        var nameEl = card.querySelector('.ac-part-name');
        if (!nameEl || nameEl.textContent.trim() !== productName) return;
        var btn = card.querySelector('[data-action="redeem"]');
        if (!btn) return;
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
        btn.removeAttribute('data-action');
        // Update text based on type
        var lang = '';
        try { lang = localStorage.getItem('kocoLang') || localStorage.getItem('koco_lang') || 'VN'; } catch(e) {}
        if (type === 'virtual') {
          btn.textContent = lang === 'CN' ? '已兑换' : (lang === 'ID' ? 'Sudah ditukar' : 'Đã đổi thưởng');
        } else {
          btn.textContent = lang === 'CN' ? '待发货' : (lang === 'ID' ? 'Menunggu pengiriman' : 'Đang giao hàng');
          btn.style.background = 'linear-gradient(135deg, #1565C0, #1976D2)';
          btn.style.opacity = '1';
        }
      });
    }

  } // end initAccount

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccount);
  } else {
    setTimeout(initAccount, 0);
  }
})();
