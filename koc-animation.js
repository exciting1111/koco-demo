// ========== KOC VIDEO-STYLE ANIMATION V4 ==========
// Fixes: auto-loop, proper phone frame, KOCO-branded chats, icon animations, bubble overflow

var kocAnimTimeouts = [];
var kocScrollAnim = null;

// KOCO-branded chat messages with product avatar SVGs
// avatar: SVG string for group icon (product/category thumbnail)
var kocChatMessages = [
  { name: 'KOCO Winners Club', msg: 'Aku baru menang iPhone 17! 🎉', time: '18:32', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#1a1a2e"/><text x="18" y="26" font-size="20" text-anchor="middle">🏆</text></svg>' },
  { name: 'KOCO Smartphone', msg: 'iPhone 17 Pro cuma 1 ⭐ hari ini!', time: '17:15', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#1c1c1e"/><rect x="10" y="4" width="16" height="28" rx="3" fill="#3a3a3c"/><rect x="12" y="7" width="12" height="20" rx="1" fill="#007AFF"/><circle cx="18" cy="30" r="1.5" fill="#666"/></svg>' },
  { name: 'KOCO Elektronik', msg: 'AirPods Pro GRATIS pakai bintang!', time: '15:18', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#1c1c1e"/><ellipse cx="13" cy="18" rx="4" ry="6" fill="white"/><ellipse cx="23" cy="18" rx="4" ry="6" fill="white"/><rect x="11" y="24" width="4" height="5" rx="2" fill="#ccc"/><rect x="21" y="24" width="4" height="5" rx="2" fill="#ccc"/></svg>' },
  { name: 'KOCO KOC Community', msg: 'Bulan ini income 12 juta! 💰', time: '13:08', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#FF6B35"/><text x="18" y="26" font-size="18" text-anchor="middle">⭐</text></svg>' },
  { name: 'KOCO Fashion', msg: 'Tas LV menang kemarin! Mau coba?', time: '13:07', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#8B4513"/><path d="M8 14 Q18 8 28 14 L26 28 H10 Z" fill="#D4A96A"/><path d="M14 14 Q18 10 22 14" fill="none" stroke="#8B4513" stroke-width="1.5"/></svg>' },
  { name: 'KOCO Beauty', msg: 'SK-II Facial Kit bisa menang gratis!', time: '12:45', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#FFB6C1"/><rect x="12" y="8" width="12" height="18" rx="4" fill="white"/><rect x="14" y="6" width="8" height="4" rx="2" fill="#FF69B4"/><text x="18" y="22" font-size="8" text-anchor="middle" fill="#FF69B4">SK-II</text></svg>' },
  { name: 'KOCO Gaming', msg: 'PS5 bisa menang pakai ⭐ gratis!', time: '10:58', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#003087"/><rect x="6" y="12" width="24" height="14" rx="4" fill="#1a1a2e"/><circle cx="24" cy="17" r="2" fill="#00D4FF"/><circle cx="28" cy="21" r="2" fill="#FF4444"/><rect x="9" y="17" width="2" height="4" rx="1" fill="white"/><rect x="8" y="18" width="4" height="2" rx="1" fill="white"/></svg>' },
  { name: 'KOCO Kecantikan', msg: 'Parfum Chanel menang hari ini! 😍', time: '09:03', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#F5E6D3"/><rect x="13" y="10" width="10" height="16" rx="3" fill="#D4A96A"/><rect x="15" y="7" width="6" height="5" rx="1" fill="#B8860B"/><text x="18" y="22" font-size="6" text-anchor="middle" fill="#8B4513">No.5</text></svg>' },
  { name: 'KOCO Rumah Tangga', msg: 'Dyson V15 cuma butuh 50 bintang!', time: '09:07', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#E8F4FD"/><path d="M18 8 L28 18 L26 20 L18 12 L10 20 L8 18 Z" fill="#2196F3"/><rect x="12" y="18" width="12" height="12" rx="1" fill="#1976D2"/><rect x="15" y="22" width="6" height="8" rx="1" fill="#BBDEFB"/></svg>' },
  { name: 'KOCO Makanan', msg: 'Voucher GrabFood gratis dari KOCO!', time: '08:30', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#FF6B35"/><text x="18" y="26" font-size="20" text-anchor="middle">🍜</text></svg>' },
  { name: 'KOCO Jam Tangan', msg: 'Apple Watch Series 10 menang! 💪', time: '07:55', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#1c1c1e"/><rect x="13" y="8" width="10" height="20" rx="5" fill="#2a2a2e"/><rect x="14" y="9" width="8" height="18" rx="4" fill="#007AFF"/><line x1="18" y1="18" x2="18" y2="14" stroke="white" stroke-width="1"/><line x1="18" y1="18" x2="21" y2="18" stroke="white" stroke-width="1"/></svg>' },
  { name: 'KOCO Laptop & PC', msg: 'MacBook Air M3 bisa menang gratis!', time: '07:20', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#E8E8E8"/><rect x="6" y="9" width="24" height="16" rx="2" fill="#C0C0C0"/><rect x="8" y="11" width="20" height="12" rx="1" fill="#1c1c1e"/><rect x="4" y="25" width="28" height="3" rx="1" fill="#A0A0A0"/></svg>' },
  { name: 'KOCO Olahraga', msg: 'Nike Air Max menang pakai bintang!', time: '06:45', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#FF4444"/><text x="18" y="26" font-size="20" text-anchor="middle">👟</text></svg>' },
  { name: 'KOCO Kamera', msg: 'Sony A7 IV menang bulan ini! 📸', time: '06:10', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#1a1a1a"/><rect x="6" y="11" width="24" height="16" rx="3" fill="#333"/><circle cx="18" cy="19" r="5" fill="#222"/><circle cx="18" cy="19" r="3" fill="#444"/><circle cx="18" cy="19" r="1.5" fill="#666"/><rect x="13" y="8" width="5" height="4" rx="1" fill="#555"/></svg>' },
  { name: 'KOCO Tablet', msg: 'iPad Pro M4 flash deal malam ini!', time: '05:30', avatar: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="10" fill="#1c1c1e"/><rect x="8" y="6" width="20" height="24" rx="3" fill="#2a2a2e"/><rect x="10" y="8" width="16" height="20" rx="1" fill="#007AFF"/><circle cx="18" cy="30" r="0" fill="none"/></svg>' },
];

var kocPlatforms = [
  {
    name: 'TikTok',
    svgId: 'tiktok',
    glow: 'rgba(105,201,208,0.8)',
    bubbles: [
      { text: '#koco_menang', count: '2.4K video' },
      { text: '#koco_gratis', count: '1.8K video' },
    ]
  },
  {
    name: 'Instagram',
    svgId: 'instagram',
    glow: 'rgba(253,29,29,0.7)',
    bubbles: [
      { text: '@koco.official', count: '85K followers' },
      { text: '#kocoshop', count: '12K posts' },
    ]
  },
  {
    name: 'Zalo',
    svgId: 'zalo',
    glow: 'rgba(0,104,255,0.7)',
    bubbles: [
      { text: 'KOCO Vietnam', count: '3.2K members' },
      { text: 'KOCO Deals', count: '1.7K members' },
    ]
  },
  {
    name: 'Facebook',
    svgId: 'facebook',
    glow: 'rgba(24,119,242,0.7)',
    bubbles: [
      { text: 'KOCO Community', count: '5K members' },
      { text: 'KOCO KOC Group', count: '2.5K members' },
    ]
  }
];

function kocGetSVG(name) {
  if (name === 'tiktok') {
    return '<svg viewBox="0 0 48 48" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#010101"/><path d="M33 10c0 3.3 2.7 6 6 6v4c-2 0-3.9-.6-5.4-1.7V28c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10c.4 0 .7 0 1.1.1v4.1c-.4-.1-.7-.1-1.1-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V10H33z" fill="#69C9D0"/><path d="M33 10c0 3.3 2.7 6 6 6v4c-2 0-3.9-.6-5.4-1.7V28c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10c.4 0 .7 0 1.1.1v4.1c-.4-.1-.7-.1-1.1-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V10H33z" fill="#EE1D52" opacity="0.5" transform="translate(2,2)"/></svg>';
  }
  if (name === 'instagram') {
    return '<svg viewBox="0 0 48 48" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ig3" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><rect width="48" height="48" rx="12" fill="url(#ig3)"/><rect x="9" y="9" width="30" height="30" rx="9" fill="none" stroke="white" stroke-width="2.5"/><circle cx="24" cy="24" r="7.5" fill="none" stroke="white" stroke-width="2.5"/><circle cx="34" cy="14" r="2" fill="white"/></svg>';
  }
  if (name === 'zalo') {
    return '<svg viewBox="0 0 48 48" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="zg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0068FF"/><stop offset="100%" stop-color="#00B4FF"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#zg3)"/><text x="24" y="31" font-family="Arial Black,sans-serif" font-size="15" font-weight="900" fill="white" text-anchor="middle">Zalo</text></svg>';
  }
  if (name === 'facebook') {
    return '<svg viewBox="0 0 48 48" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#1877F2"/><path d="M26.8 38V25.5h4.3l.6-5H26.8v-3.2c0-1.4.4-2.4 2.5-2.4H32V11c-.5-.1-2.2-.2-4.2-.2-4.1 0-6.9 2.5-6.9 7.1v4H17v5h3.9V38h5.9z" fill="white"/></svg>';
  }
  return '';
}

function kocBuildHTML() {
  // Build chat list HTML with KOCO logo in header
  var chatHTML = '';
  var msgs = kocChatMessages.concat(kocChatMessages);
  msgs.forEach(function(m) {
    chatHTML += '<div class="koc-chat-item">' +
      '<div class="koc-chat-avatar-svg">' + m.avatar + '</div>' +
      '<div class="koc-chat-info">' +
        '<div class="koc-chat-name">' + m.name + ' <span class="koc-badge">KOCO</span></div>' +
        '<div class="koc-chat-msg">' + m.msg + '</div>' +
      '</div>' +
      '<div class="koc-chat-time">' + m.time + '</div>' +
    '</div>';
  });

  // Build icons HTML - 2x2 grid, bubbles positioned inside card
  var iconsHTML = '';
  kocPlatforms.forEach(function(p, i) {
    iconsHTML += '<div class="koc-icon-item" id="kocIcon' + i + '">' +
      '<div class="koc-icon-glow" id="kocGlow' + i + '" style="background:radial-gradient(circle,' + p.glow + ' 0%,transparent 70%)"></div>' +
      '<div class="koc-icon-img" id="kocImg' + i + '">' + kocGetSVG(p.svgId) + '</div>' +
      '<div class="koc-icon-label">' + p.name + '</div>' +
      '<div class="koc-icon-bubble" id="kocBubble' + i + '">' +
        p.bubbles.map(function(b, bi) {
          return '<div class="' + (bi === 0 ? 'koc-bubble-main' : 'koc-bubble-sub') + '">' +
            '<span class="koc-bubble-text">' + b.text + '</span>' +
            '<span class="koc-bubble-count">' + b.count + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  });

  return '<div class="koc-anim-wrapper" id="kocAnimWrapper">' +
    // Act 1: iPhone frame with WhatsApp UI
    '<div class="koc-act koc-act-1" id="kocAct1">' +
      '<div class="koc-iphone">' +
        '<div class="koc-iphone-notch"></div>' +
        '<div class="koc-iphone-screen">' +
          // WhatsApp status bar
          '<div class="koc-wa-statusbar">' +
            '<span class="koc-wa-time">9:41</span>' +
            '<span class="koc-wa-icons">📶📶🔋</span>' +
          '</div>' +
          // WhatsApp top nav
          '<div class="koc-wa-navbar">' +
            '<span class="koc-wa-title">WhatsApp</span>' +
            '<div class="koc-wa-nav-icons">' +
              '<span class="koc-wa-icon">📷</span>' +
              '<span class="koc-wa-icon">🔍</span>' +
              '<span class="koc-wa-icon">⋮</span>' +
            '</div>' +
          '</div>' +
          // WhatsApp tab bar (Chats / Status / Calls)
          '<div class="koc-wa-tabs">' +
            '<span class="koc-wa-tab active">Chats</span>' +
            '<span class="koc-wa-tab">Status</span>' +
            '<span class="koc-wa-tab">Calls</span>' +
          '</div>' +
          // Search bar
          '<div class="koc-wa-search">' +
            '<span class="koc-wa-search-icon">🔍</span>' +
            '<span class="koc-wa-search-text">Search</span>' +
          '</div>' +
          // Chat list
          '<div class="koc-chat-list" id="kocChatList">' + chatHTML + '</div>' +
          // Bottom tab bar (iOS style)
          '<div class="koc-wa-bottombar">' +
            '<div class="koc-wa-bottom-tab active">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#25D366"/></svg>' +
              '<span>Chats</span>' +
            '</div>' +
            '<div class="koc-wa-bottom-tab">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#8696A0" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#8696A0"/></svg>' +
              '<span>Status</span>' +
            '</div>' +
            '<div class="koc-wa-bottom-tab">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#8696A0"/></svg>' +
              '<span>Calls</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // Act 2: Social icons 2x2 grid
    '<div class="koc-act koc-act-2" id="kocAct2">' +
      '<div class="koc-icons-grid">' + iconsHTML + '</div>' +
    '</div>' +
    // Act 3: Logo burst (centered card, not fullscreen)
    '<div class="koc-act koc-act-3" id="kocAct3">' +
      '<div class="koc-logo-card">' +
        '<div class="koc-burst-ring" id="kocBurstRing"></div>' +
        '<img src="images/koco-logo.png" alt="KOCO" class="koc-logo-img" id="kocLogoImg" onerror="this.style.display=\'none\'" />' +
        '<div class="koc-logo-wordmark" id="kocLogoWord">KOCO</div>' +
        '<div class="koc-logo-tagline" id="kocLogoTag">Wish Purchase · Gratis · Nyata</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function kocClearAll() {
  kocAnimTimeouts.forEach(function(t){ clearTimeout(t); });
  kocAnimTimeouts = [];
  if (kocScrollAnim) { cancelAnimationFrame(kocScrollAnim); kocScrollAnim = null; }
}

function kocDelay(fn, ms) {
  kocAnimTimeouts.push(setTimeout(fn, ms));
}

function kocStartAnimation() {
  kocClearAll();

  var act1 = document.getElementById('kocAct1');
  var act2 = document.getElementById('kocAct2');
  var act3 = document.getElementById('kocAct3');
  var chatList = document.getElementById('kocChatList');

  if (!act1) return;

  // --- RESET ALL ---
  [act1, act2, act3].forEach(function(el) {
    el.style.cssText = 'opacity:0;transform:scale(0.95);transition:none;';
  });

  // Reset icons - start hidden, will animate in
  for (var i = 0; i < 4; i++) {
    var icon = document.getElementById('kocIcon' + i);
    var bubble = document.getElementById('kocBubble' + i);
    var glow = document.getElementById('kocGlow' + i);
    var img = document.getElementById('kocImg' + i);
    if (icon) { icon.style.cssText = 'opacity:0;transform:scale(0.3) rotate(-90deg);transition:none;'; }
    if (bubble) { bubble.style.cssText = 'opacity:0;transform:translateY(10px) scale(0.8);transition:none;'; }
    if (glow) { glow.style.cssText = 'opacity:0;transition:none;'; }
    if (img) { img.style.cssText = 'transform:scale(1);transition:none;'; }
  }

  // Reset logo
  var logoImg = document.getElementById('kocLogoImg');
  var logoWord = document.getElementById('kocLogoWord');
  var logoTag = document.getElementById('kocLogoTag');
  var burstRing = document.getElementById('kocBurstRing');
  if (logoImg) logoImg.style.cssText = 'opacity:0;transform:scale(0.2) rotate(-20deg);transition:none;';
  if (logoWord) logoWord.style.cssText = 'opacity:0;transform:translateY(30px);transition:none;';
  if (logoTag) logoTag.style.cssText = 'opacity:0;transform:translateY(20px);transition:none;';
  if (burstRing) burstRing.style.cssText = 'opacity:0;transform:scale(0);transition:none;';

  // ---- ACT 1: Phone chat scrolling (0 - 5s) ----
  kocDelay(function() {
    act1.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.2,0.64,1)';
    act1.style.opacity = '1';
    act1.style.transform = 'scale(1)';

    if (chatList) chatList.scrollTop = 0;
    var scrollPos = 0;
    var speed = 0.7;
    var maxScroll = chatList ? chatList.scrollHeight / 2 : 0;

    function scrollLoop() {
      scrollPos += speed;
      if (scrollPos >= maxScroll) scrollPos = 0;
      if (chatList) chatList.scrollTop = scrollPos;
      kocScrollAnim = requestAnimationFrame(scrollLoop);
    }
    scrollLoop();
  }, 200);

  // ---- Transition ACT 1 → ACT 2 (at 5s) ----
  kocDelay(function() {
    if (kocScrollAnim) { cancelAnimationFrame(kocScrollAnim); kocScrollAnim = null; }
    act1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    act1.style.opacity = '0';
    act1.style.transform = 'scale(0.9) translateY(-20px)';

    kocDelay(function() {
      act2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      act2.style.opacity = '1';
      act2.style.transform = 'scale(1)';

      // Animate icons in one by one with bounce
      for (var i = 0; i < 4; i++) {
        (function(idx) {
          kocDelay(function() {
            var icon = document.getElementById('kocIcon' + idx);
            var glow = document.getElementById('kocGlow' + idx);
            if (icon) {
              icon.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
              icon.style.opacity = '1';
              icon.style.transform = 'scale(1) rotate(0deg)';
            }
            if (glow) {
              glow.style.transition = 'opacity 0.5s ease';
              glow.style.opacity = '0.8';
            }
          }, 200 + idx * 250);
        })(i);
      }

      // Show bubbles after icons appear - staggered
      var bubbleTargets = [0, 1, 2, 3];
      bubbleTargets.forEach(function(idx, seq) {
        kocDelay(function() {
          var bubble = document.getElementById('kocBubble' + idx);
          var img = document.getElementById('kocImg' + idx);
          if (bubble) {
            bubble.style.transition = 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0) scale(1)';
          }
          if (img) {
            img.style.transition = 'transform 0.3s ease';
            img.style.transform = 'scale(1.15)';
            setTimeout(function() {
              if (img) img.style.transform = 'scale(1)';
            }, 300);
          }
        }, 1400 + seq * 300);
      });

    }, 500);
  }, 5000);

  // ---- Transition ACT 2 → ACT 3 (at 10s) ----
  kocDelay(function() {
    // Icons fly out
    var flyPositions = [
      'translate(-80px,-80px) rotate(-270deg) scale(0)',
      'translate(80px,-80px) rotate(270deg) scale(0)',
      'translate(-80px,80px) rotate(-270deg) scale(0)',
      'translate(80px,80px) rotate(270deg) scale(0)'
    ];
    for (var i = 0; i < 4; i++) {
      (function(idx) {
        var icon = document.getElementById('kocIcon' + idx);
        var bubble = document.getElementById('kocBubble' + idx);
        if (bubble) { bubble.style.transition = 'opacity 0.2s'; bubble.style.opacity = '0'; }
        if (icon) {
          icon.style.transition = 'transform 0.7s cubic-bezier(0.55,0,1,0.45), opacity 0.7s ease';
          icon.style.transform = flyPositions[idx];
          icon.style.opacity = '0';
        }
      })(i);
    }

    kocDelay(function() {
      act2.style.transition = 'opacity 0.3s ease';
      act2.style.opacity = '0';

      kocDelay(function() {
        act3.style.transition = 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        act3.style.opacity = '1';
        act3.style.transform = 'scale(1)';

        // Burst ring
        kocDelay(function() {
          if (burstRing) {
            burstRing.style.transition = 'opacity 0.3s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
            burstRing.style.opacity = '0.6';
            burstRing.style.transform = 'scale(1.5)';
          }
        }, 100);

        // Logo pop
        kocDelay(function() {
          if (logoImg) {
            logoImg.style.transition = 'opacity 0.5s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
            logoImg.style.opacity = '1';
            logoImg.style.transform = 'scale(1) rotate(0deg)';
          }
        }, 200);

        // Wordmark slide up
        kocDelay(function() {
          if (logoWord) {
            logoWord.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
            logoWord.style.opacity = '1';
            logoWord.style.transform = 'translateY(0)';
          }
        }, 450);

        // Tagline
        kocDelay(function() {
          if (logoTag) {
            logoTag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            logoTag.style.opacity = '1';
            logoTag.style.transform = 'translateY(0)';
          }
        }, 700);

        // AUTO LOOP: restart after 3s on Act 3
        kocDelay(function() {
          kocStartAnimation();
        }, 3000);

      }, 300);
    }, 700);
  }, 10000);
}

function kocInitAnimation() {
  var card = document.getElementById('kocVisualCard');
  if (!card) return;

  // Override old CSS
  card.style.opacity = '1';
  card.style.transform = 'none';
  card.style.animation = 'none';
  card.style.transition = 'none';

  // Replace card content
  card.innerHTML = kocBuildHTML();

  // Trigger on scroll into view
  var triggered = false;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        kocStartAnimation();
        obs.unobserve(card);
      }
    });
  }, { threshold: 0.25 });

  obs.observe(card);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', kocInitAnimation);
} else {
  kocInitAnimation();
}
