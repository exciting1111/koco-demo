// ========== KOC VIDEO-STYLE ANIMATION V4 ==========
// Fixes: auto-loop, proper phone frame, KOCO-branded chats, icon animations, bubble overflow

var kocAnimTimeouts = [];
var kocScrollAnim = null;

// KOCO-branded chat messages
var kocChatMessages = [
  { name: 'KOCO Winners Club 🏆', msg: 'Aku baru menang iPhone 17! 🎉', time: '18:32', color: '#FF6B35', koco: true },
  { name: 'KOCO Indonesia 🇮🇩', msg: 'Daftar gratis, dapat 100 ⭐ sekarang!', time: '17:15', color: '#FF6B35', koco: true },
  { name: 'KOCO Tech Hunters', msg: 'AirPods Pro bisa dapat GRATIS 🎧', time: '15:18', color: '#e74c3c', koco: true },
  { name: 'KOCO KOC Community', msg: 'Bulan ini income 12 juta! 💰', time: '13:08', color: '#9b59b6', koco: true },
  { name: 'KOCO Daily Deals', msg: 'Flash deal: iPhone hanya 1 ⭐!', time: '13:07', color: '#e67e22', koco: true },
  { name: 'KOCO Lifestyle', msg: 'Wish Purchase itu nyata! Coba sekarang', time: '12:45', color: '#1abc9c', koco: true },
  { name: 'KOCO Gaming Squad', msg: 'PS5 bisa menang pakai ⭐ gratis!', time: '10:58', color: '#3498db', koco: true },
  { name: 'KOCO Beauty Circle', msg: 'SK-II kit menang kemarin! 😍', time: '09:03', color: '#f39c12', koco: true },
  { name: 'KOCO Travel Buddies', msg: 'Pakai reward KOCO buat liburan ✈️', time: '09:07', color: '#27ae60', koco: true },
  { name: 'KOCO Foodies 🍜', msg: 'Voucher makan gratis dari KOCO!', time: '08:30', color: '#e74c3c', koco: true },
  { name: 'KOCO Crypto & Tech', msg: 'KOCO referral +50 ⭐ per teman!', time: '07:55', color: '#f1c40f', koco: true },
  { name: 'KOCO Fitness Club', msg: 'Apple Watch menang pagi ini! 💪', time: '07:20', color: '#3498db', koco: true },
  { name: 'KOCO Book & Learn', msg: 'Belajar cara jadi KOC sukses', time: '06:45', color: '#9b59b6', koco: true },
  { name: 'KOCO Asia Network', msg: 'Join sekarang, gratis selamanya!', time: '06:10', color: '#2ecc71', koco: true },
  { name: 'KOCO Night Owls 🦉', msg: 'Malam ini ada flash draw iPhone!', time: '05:30', color: '#e67e22', koco: true },
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
    var initials = m.name.replace(/[^\w\s]/gi, '').trim().split(' ').slice(0,2).map(function(w){return w[0]||'';}).join('').toUpperCase();
    chatHTML += '<div class="koc-chat-item">' +
      '<div class="koc-chat-avatar" style="background:' + m.color + '">' + initials + '</div>' +
      '<div class="koc-chat-info">' +
        '<div class="koc-chat-name">' + m.name + '</div>' +
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
    // Act 1: iPhone frame with chat
    '<div class="koc-act koc-act-1" id="kocAct1">' +
      '<div class="koc-iphone">' +
        '<div class="koc-iphone-notch"></div>' +
        '<div class="koc-iphone-screen">' +
          '<div class="koc-chat-header">' +
            '<div class="koc-chat-logo">' +
              '<img src="images/koco-logo.png" alt="KOCO" style="height:20px;vertical-align:middle;margin-right:6px" onerror="this.style.display=\'none\'" />' +
              '<span style="font-weight:700;font-size:14px;color:#FF6B35;font-family:-apple-system,sans-serif">KOCO</span>' +
            '</div>' +
            '<div class="koc-chat-search">🔍 Search</div>' +
          '</div>' +
          '<div class="koc-chat-list" id="kocChatList">' + chatHTML + '</div>' +
          '<div class="koc-iphone-bar">' +
            '<span class="koc-phone-tab active">💬 Chats</span>' +
            '<span class="koc-phone-tab">⬆ Updates</span>' +
            '<span class="koc-phone-tab">👥 Groups</span>' +
            '<span class="koc-phone-tab">📞 Calls</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // Act 2: Social icons 2x2 grid
    '<div class="koc-act koc-act-2" id="kocAct2">' +
      '<div class="koc-icons-grid">' + iconsHTML + '</div>' +
    '</div>' +
    // Act 3: Logo burst
    '<div class="koc-act koc-act-3" id="kocAct3">' +
      '<div class="koc-logo-burst">' +
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
