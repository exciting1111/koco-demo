// ========== KOC VIDEO-STYLE ANIMATION V6 ==========
// No phone frame — WhatsApp UI floats directly as a card in the page
// Pixel-perfect WhatsApp UI with real SVG icons

var kocAnimTimeouts = [];
var kocScrollAnim = null;

var kocChatMessages = [
  { name: 'KOCO Winners Club', msg: 'Aku baru menang iPhone 17! 🎉', time: '18:32',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#FFB300"/><path d="M24 12l3 6 6.5 1-4.7 4.6 1.1 6.4L24 27l-5.9 3 1.1-6.4L14.5 19l6.5-1z" fill="white"/></svg>' },
  { name: 'KOCO Smartphone', msg: 'iPhone 17 Pro cuma 1 ⭐ hari ini!', time: '17:15',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1C1C1E"/><rect x="16" y="8" width="16" height="32" rx="4" fill="#2C2C2E"/><rect x="18" y="12" width="12" height="22" rx="2" fill="#007AFF"/><circle cx="24" cy="37" r="1.5" fill="#555"/></svg>' },
  { name: 'KOCO Elektronik', msg: 'AirPods Pro GRATIS pakai bintang!', time: '15:18',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#F5F5F5"/><ellipse cx="17" cy="22" rx="5" ry="7" fill="white" stroke="#DDD" stroke-width="1"/><ellipse cx="31" cy="22" rx="5" ry="7" fill="white" stroke="#DDD" stroke-width="1"/><rect x="15" y="29" width="4" height="6" rx="2" fill="#E0E0E0"/><rect x="29" y="29" width="4" height="6" rx="2" fill="#E0E0E0"/></svg>' },
  { name: 'KOCO KOC Community', msg: 'Bulan ini income 12 juta! 💰', time: '13:08',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#FF6B35"/><path d="M24 10l3.5 7 7.5 1.1-5.4 5.3 1.3 7.6L24 27l-6.9 4 1.3-7.6-5.4-5.3 7.5-1.1z" fill="white"/></svg>' },
  { name: 'KOCO Fashion', msg: 'Tas LV menang kemarin! Mau coba?', time: '13:07',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#8B6914"/><path d="M12 18q12-8 24 0l-2 16H14z" fill="#D4A96A"/><path d="M18 18q6-4 12 0" fill="none" stroke="#8B6914" stroke-width="2"/></svg>' },
  { name: 'KOCO Beauty', msg: 'SK-II Facial Kit bisa menang gratis!', time: '12:45',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#FADADD"/><rect x="16" y="12" width="16" height="22" rx="5" fill="white"/><rect x="18" y="10" width="12" height="6" rx="3" fill="#FF69B4"/><text x="24" y="28" font-size="8" text-anchor="middle" fill="#FF69B4" font-weight="700" font-family="Arial">SK-II</text></svg>' },
  { name: 'KOCO Gaming', msg: 'PS5 bisa menang pakai ⭐ gratis!', time: '10:58',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#003087"/><rect x="8" y="16" width="32" height="18" rx="6" fill="#1A1A2E"/><circle cx="33" cy="22" r="2.5" fill="#00D4FF"/><circle cx="38" cy="27" r="2.5" fill="#FF4444"/><rect x="12" y="23" width="3" height="5" rx="1.5" fill="white"/><rect x="10.5" y="24.5" width="6" height="3" rx="1.5" fill="white"/></svg>' },
  { name: 'KOCO Kecantikan', msg: 'Parfum Chanel menang hari ini! 😍', time: '09:03',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#F5E6D3"/><rect x="17" y="14" width="14" height="20" rx="4" fill="#D4A96A"/><rect x="19" y="10" width="10" height="7" rx="2" fill="#B8860B"/><text x="24" y="29" font-size="7" text-anchor="middle" fill="#8B4513" font-weight="700" font-family="Arial">N°5</text></svg>' },
  { name: 'KOCO Rumah Tangga', msg: 'Dyson V15 cuma butuh 50 bintang!', time: '09:07',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#E3F2FD"/><path d="M24 10L36 22l-2.5 2.5L24 15l-9.5 9.5L12 22z" fill="#1976D2"/><rect x="16" y="22" width="16" height="16" rx="2" fill="#2196F3"/><rect x="20" y="28" width="8" height="10" rx="1" fill="#BBDEFB"/></svg>' },
  { name: 'KOCO Makanan', msg: 'Voucher GrabFood gratis dari KOCO!', time: '08:30',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#00B14F"/><circle cx="24" cy="22" r="10" fill="white"/><path d="M18 22q6-6 12 0" fill="none" stroke="#00B14F" stroke-width="2"/><rect x="22" y="32" width="4" height="4" rx="1" fill="white"/></svg>' },
  { name: 'KOCO Jam Tangan', msg: 'Apple Watch Series 10 menang! 💪', time: '07:55',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1C1C1E"/><rect x="15" y="10" width="18" height="28" rx="9" fill="#2C2C2E"/><rect x="17" y="12" width="14" height="24" rx="7" fill="#000"/><circle cx="24" cy="24" r="8" fill="#111"/><line x1="24" y1="24" x2="24" y2="18" stroke="#FF9500" stroke-width="1.5" stroke-linecap="round"/><line x1="24" y1="24" x2="28" y2="24" stroke="white" stroke-width="1" stroke-linecap="round"/></svg>' },
  { name: 'KOCO Laptop & PC', msg: 'MacBook Air M3 bisa menang gratis!', time: '07:20',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#E8E8E8"/><rect x="8" y="12" width="32" height="20" rx="2" fill="#C0C0C0"/><rect x="10" y="14" width="28" height="16" rx="1" fill="#1C1C1E"/><path d="M6 32h36v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z" fill="#A0A0A0"/></svg>' },
  { name: 'KOCO Olahraga', msg: 'Nike Air Max menang pakai bintang!', time: '06:45',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#111"/><path d="M10 30c2-4 6-10 14-10 6 0 10 3 14 5l-2 4c-4-3-8-5-12-5-5 0-8 4-10 8z" fill="white"/></svg>' },
  { name: 'KOCO Kamera', msg: 'Sony A7 IV menang bulan ini! 📸', time: '06:10',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1A1A1A"/><rect x="8" y="14" width="32" height="22" rx="4" fill="#333"/><circle cx="24" cy="25" r="7" fill="#222"/><circle cx="24" cy="25" r="5" fill="#444"/><circle cx="24" cy="25" r="2" fill="#666"/><rect x="17" y="10" width="8" height="5" rx="2" fill="#555"/></svg>' },
  { name: 'KOCO Tablet', msg: 'iPad Pro M4 flash deal malam ini!', time: '05:30',
    avatar: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1C1C1E"/><rect x="10" y="8" width="28" height="32" rx="4" fill="#2C2C2E"/><rect x="12" y="10" width="24" height="28" rx="2" fill="#007AFF"/></svg>' },
];

var kocPlatforms = [
  {
    name: 'TikTok', svgId: 'tiktok', glow: 'rgba(105,201,208,0.8)',
    bubbles: [
      { text: '#koco_menang', count: '2.4K video' },
      { text: '#koco_gratis', count: '1.8K video' },
    ]
  },
  {
    name: 'Instagram', svgId: 'instagram', glow: 'rgba(253,29,29,0.7)',
    bubbles: [
      { text: '@koco.official', count: '85K followers' },
      { text: '#kocoshop', count: '12K posts' },
    ]
  },
  {
    name: 'Zalo', svgId: 'zalo', glow: 'rgba(0,104,255,0.7)',
    bubbles: [
      { text: 'KOCO Vietnam', count: '3.2K members' },
      { text: 'KOCO Deals', count: '1.7K members' },
    ]
  },
  {
    name: 'Facebook', svgId: 'facebook', glow: 'rgba(24,119,242,0.7)',
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
  // Build chat list
  var chatHTML = '';
  var msgs = kocChatMessages.concat(kocChatMessages); // duplicate for seamless scroll
  msgs.forEach(function(m) {
    chatHTML += '<div class="wa-chat-row">' +
      '<div class="wa-avatar">' + m.avatar + '</div>' +
      '<div class="wa-chat-body">' +
        '<div class="wa-chat-top">' +
          '<span class="wa-chat-name">' + m.name + '</span>' +
          '<span class="wa-chat-time">' + m.time + '</span>' +
        '</div>' +
        '<div class="wa-chat-bottom">' +
          '<span class="wa-chat-preview">' + m.msg + '</span>' +
          '<span class="wa-koco-pill">KOCO</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  });

  // Build icons HTML — vertical list layout, no overlap
  var iconsHTML = '';
  kocPlatforms.forEach(function(p, i) {
    var bubblesHTML = p.bubbles.map(function(b) {
      return '<div class="koc-stat-item">' +
        '<span class="koc-stat-label">' + b.text + '</span>' +
        '<span class="koc-stat-value">' + b.count + '</span>' +
      '</div>';
    }).join('');
    iconsHTML += '<div class="koc-platform-row" id="kocIcon' + i + '">' +
      '<div class="koc-platform-left">' +
        '<div class="koc-platform-icon" id="kocImg' + i + '">' + kocGetSVG(p.svgId) + '</div>' +
        '<div class="koc-platform-name">' + p.name + '</div>' +
      '</div>' +
      '<div class="koc-platform-stats" id="kocBubble' + i + '">' + bubblesHTML + '</div>' +
    '</div>';
  });

  return '<div class="koc-anim-wrapper" id="kocAnimWrapper">' +
    // ===== ACT 1: WhatsApp card (no phone frame) =====
    '<div class="koc-act koc-act-1" id="kocAct1">' +
      '<div class="wa-card">' +
        // Status bar
        '<div class="wa-statusbar">' +
          '<span class="wa-sb-time">9:41</span>' +
          '<div class="wa-sb-right">' +
            '<svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7" width="3" height="4" rx="0.5" fill="white" opacity="0.5"/><rect x="4" y="5" width="3" height="6" rx="0.5" fill="white" opacity="0.7"/><rect x="8" y="3" width="3" height="8" rx="0.5" fill="white" opacity="0.85"/><rect x="12" y="0" width="3" height="11" rx="0.5" fill="white"/></svg>' +
            '<svg width="10" height="11" viewBox="0 0 10 11"><path d="M5 0C2.8 0 .8.8 0 2.2l1.5 1.3C2.2 2.5 3.5 2 5 2s2.8.5 3.5 1.5L10 2.2C9.2.8 7.2 0 5 0z" fill="white" opacity="0.5"/><path d="M5 3.5c-1.4 0-2.6.6-3.2 1.5L3.3 6.3c.4-.6 1-.9 1.7-.9s1.3.3 1.7.9l1.5-1.3c-.6-.9-1.8-1.5-3.2-1.5z" fill="white" opacity="0.7"/><circle cx="5" cy="8.5" r="1.5" fill="white"/></svg>' +
            '<svg width="22" height="11" viewBox="0 0 22 11"><rect x="0" y="0" width="19" height="11" rx="2" fill="none" stroke="white" stroke-width="1.2"/><rect x="1.5" y="1.5" width="14" height="8" rx="1" fill="#4CD964"/><rect x="20" y="3" width="2" height="5" rx="1" fill="white" opacity="0.5"/></svg>' +
          '</div>' +
        '</div>' +
        // Header
        '<div class="wa-header">' +
          '<span class="wa-header-title">WhatsApp</span>' +
          '<div class="wa-header-icons">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 15.2V16m0-9v5.2m0 0a1 1 0 100 2 1 1 0 000-2z" stroke="white" stroke-width="1.5"/><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="white" stroke-width="1.5"/><circle cx="17" cy="7" r="3" fill="#25D366"/></svg>' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="white" stroke-width="1.8"/><path d="M16.5 16.5L20 20" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="6" r="1.5" fill="white"/><circle cx="12" cy="12" r="1.5" fill="white"/><circle cx="12" cy="18" r="1.5" fill="white"/></svg>' +
          '</div>' +
        '</div>' +
        // Tabs
        '<div class="wa-tabs">' +
          '<div class="wa-tab wa-tab-active">Chats</div>' +
          '<div class="wa-tab">Updates</div>' +
          '<div class="wa-tab">Communities</div>' +
          '<div class="wa-tab">Calls</div>' +
        '</div>' +
        // Search
        '<div class="wa-search">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="#8696A0" stroke-width="2"/><path d="M16 16l3.5 3.5" stroke="#8696A0" stroke-width="2" stroke-linecap="round"/></svg>' +
          '<span class="wa-search-text">Search</span>' +
        '</div>' +
        // Chat list
        '<div class="wa-chat-list" id="kocChatList">' + chatHTML + '</div>' +
        // Bottom bar
        '<div class="wa-bottombar">' +
          '<div class="wa-btab wa-btab-active">' +
            '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#25D366"/></svg>' +
            '<span>Chats</span>' +
          '</div>' +
          '<div class="wa-btab">' +
            '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#8696A0" stroke-width="1.8"/><circle cx="12" cy="12" r="3.5" fill="#8696A0"/></svg>' +
            '<span>Updates</span>' +
          '</div>' +
          '<div class="wa-btab">' +
            '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#8696A0"/></svg>' +
            '<span>Communities</span>' +
          '</div>' +
          '<div class="wa-btab">' +
            '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" fill="#8696A0"/></svg>' +
            '<span>Calls</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // ===== ACT 2: Social icons =====
    '<div class="koc-act koc-act-2" id="kocAct2">' +
      '<div class="koc-platform-list">' + iconsHTML + '</div>' +
    '</div>' +
    // ===== ACT 3: Logo burst (simple & clean) =====
    '<div class="koc-act koc-act-3" id="kocAct3">' +
      '<div class="koc-logo-card">' +
        '<img src="images/koco-logo.png" alt="KOCO" class="koc-logo-img" id="kocLogoImg" />' +
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

  // Reset platform rows
  for (var i = 0; i < 4; i++) {
    var row = document.getElementById('kocIcon' + i);
    var stats = document.getElementById('kocBubble' + i);
    var img = document.getElementById('kocImg' + i);
    if (row) row.style.cssText = 'opacity:0;transform:translateX(-30px);transition:none;';
    if (stats) stats.style.cssText = 'opacity:0;transform:translateX(20px);transition:none;';
    if (img) img.style.cssText = 'transform:scale(0.5) rotate(-15deg);transition:none;';
  }

  // Reset logo
  var logoImg = document.getElementById('kocLogoImg');
  var logoTag = document.getElementById('kocLogoTag');
  if (logoImg) logoImg.style.cssText = 'opacity:0;transform:scale(0.3);transition:none;';
  if (logoTag) logoTag.style.cssText = 'opacity:0;transform:translateY(15px);transition:none;';

  // ---- ACT 1: WhatsApp chat scrolling (0 - 5s) ----
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

      // Animate platform rows in sequentially
      for (var i = 0; i < 4; i++) {
        (function(idx) {
          // Row slides in from left
          kocDelay(function() {
            var row = document.getElementById('kocIcon' + idx);
            var img = document.getElementById('kocImg' + idx);
            if (row) {
              row.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
              row.style.opacity = '1';
              row.style.transform = 'translateX(0)';
            }
            if (img) {
              img.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
              img.style.transform = 'scale(1) rotate(0deg)';
            }
          }, 200 + idx * 300);

          // Stats slide in from right with delay
          kocDelay(function() {
            var stats = document.getElementById('kocBubble' + idx);
            if (stats) {
              stats.style.transition = 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
              stats.style.opacity = '1';
              stats.style.transform = 'translateX(0)';
            }
          }, 500 + idx * 300);
        })(i);
      }

    }, 500);
  }, 5000);

  // ---- Transition ACT 2 → ACT 3 (at 10s) ----
  kocDelay(function() {
    // Fade out platform rows
    for (var i = 0; i < 4; i++) {
      (function(idx) {
        var row = document.getElementById('kocIcon' + idx);
        var stats = document.getElementById('kocBubble' + idx);
        if (stats) { stats.style.transition = 'opacity 0.3s ease'; stats.style.opacity = '0'; }
        if (row) {
          row.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
          row.style.opacity = '0';
          row.style.transform = 'translateY(-20px) scale(0.9)';
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

        kocDelay(function() {
          if (logoImg) {
            logoImg.style.transition = 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
            logoImg.style.opacity = '1';
            logoImg.style.transform = 'scale(1)';
          }
        }, 200);

        kocDelay(function() {
          if (logoTag) {
            logoTag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            logoTag.style.opacity = '1';
            logoTag.style.transform = 'translateY(0)';
          }
        }, 600);

        // AUTO LOOP
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

  card.style.opacity = '1';
  card.style.transform = 'none';
  card.style.animation = 'none';
  card.style.transition = 'none';

  card.innerHTML = kocBuildHTML();

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
