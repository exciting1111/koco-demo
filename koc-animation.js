// ========== KOC VIDEO-STYLE ANIMATION V3 ==========
// Three-act animation matching the reference video

var kocAnimTimeouts = [];
var kocScrollAnim = null;

var kocChatMessages = [
  { name: 'Shenzen Night Runners', tag: 'koco', msg: 'Meet at 7pm today', time: '18:32', color: '#e74c3c' },
  { name: 'Bay Area Housing', tag: 'koco', msg: '2b1b looking for roommate', time: '17:15', color: '#3498db' },
  { name: 'Cat & Dog Parents', tag: 'koco', msg: 'Thy good cat food Meijs?', time: '15:18', color: '#2ecc71' },
  { name: 'Weekend Hiking Krs', tag: 'koco', msg: 'Trail map updated!', time: '13:08', color: '#9b59b6' },
  { name: 'Late Night Tech Talks', tag: 'koco', msg: 'Shyone dropped again', time: '13:07', color: '#e67e22' },
  { name: 'Arena of Valour Buddies', tag: 'koco', msg: 'Buy 1 get 1 Free at Heytea', time: '12:45', color: '#1abc9c' },
  { name: 'Arena of Natus Squad', tag: 'koco', msg: 'Any interpo for plays?', time: '10:58', color: '#e74c3c' },
  { name: 'Study Abroad Help', tag: 'koco', msg: 'Leg interview tips? 👍', time: '09:03', color: '#f39c12' },
  { name: 'Tech Deals Hunters', tag: 'koco', msg: 'RTX 3090 for sale 🟢', time: '09:07', color: '#27ae60' },
  { name: 'Foodie Explorers', tag: 'koco', msg: 'New ramen spot opened!', time: '08:30', color: '#e74c3c' },
  { name: 'Crypto Investors', tag: 'koco', msg: 'BTC just hit 100K!', time: '07:55', color: '#f1c40f' },
  { name: 'Fitness Warriors', tag: 'koco', msg: 'Morning run at 6am?', time: '07:20', color: '#3498db' },
  { name: 'Book Club Weekly', tag: 'koco', msg: 'Chapter 5 discussion', time: '06:45', color: '#9b59b6' },
  { name: 'Travel Buddies Asia', tag: 'koco', msg: 'Bali trip confirmed!', time: '06:10', color: '#2ecc71' },
  { name: 'Gaming Night Squad', tag: 'koco', msg: 'Server is up, join now', time: '05:30', color: '#e67e22' },
];

var kocPlatforms = [
  {
    name: 'TikTok',
    svgId: 'tiktok',
    glow: 'rgba(255,0,80,0.7)',
    bubbles: [
      { text: '#koco dance challenge', count: '1.2K groups' },
      { text: 'koco food covers', count: '80K groups' },
      { text: 'koco daily outfits', count: '700 groups' },
    ]
  },
  {
    name: 'Instagram',
    svgId: 'instagram',
    glow: 'rgba(253,29,29,0.7)',
    bubbles: [
      { text: '#koco dance challenge', count: '1.2K groups' },
      { text: 'koco food covers', count: '80K groups' },
      { text: 'koco daily outfits', count: '700 groups' },
    ]
  },
  {
    name: 'Zalo',
    svgId: 'zalo',
    glow: 'rgba(0,104,255,0.7)',
    bubbles: [
      { text: 'koco Vietnamese community', count: '1.7K groups' },
      { text: 'koco Saigon local', count: '800 groups' },
      { text: 'koco café lovers', count: '400 groups' },
    ]
  },
  {
    name: 'Facebook',
    svgId: 'facebook',
    glow: 'rgba(24,119,242,0.7)',
    bubbles: [
      { text: 'koco community board', count: '3K groups' },
      { text: 'koco parent alliance', count: '1.2K groups' },
      { text: 'koco second-hand marketplace', count: '2.5K groups' },
    ]
  }
];

function kocGetSVG(name) {
  if (name === 'tiktok') {
    return '<svg viewBox="0 0 48 48" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#010101"/><path d="M33 10c0 3.3 2.7 6 6 6v4c-2 0-3.9-.6-5.4-1.7V28c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10c.4 0 .7 0 1.1.1v4.1c-.4-.1-.7-.1-1.1-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V10h3.4z" fill="white"/><path d="M33 10c0 3.3 2.7 6 6 6v4c-2 0-3.9-.6-5.4-1.7V28c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10c.4 0 .7 0 1.1.1v4.1c-.4-.1-.7-.1-1.1-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V10h3.4z" fill="#69C9D0" opacity="0.4"/></svg>';
  }
  if (name === 'instagram') {
    return '<svg viewBox="0 0 48 48" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ig2" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><rect width="48" height="48" rx="12" fill="url(#ig2)"/><rect x="9" y="9" width="30" height="30" rx="9" fill="none" stroke="white" stroke-width="2.5"/><circle cx="24" cy="24" r="7.5" fill="none" stroke="white" stroke-width="2.5"/><circle cx="34" cy="14" r="2" fill="white"/></svg>';
  }
  if (name === 'zalo') {
    return '<svg viewBox="0 0 48 48" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="zg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0068FF"/><stop offset="100%" stop-color="#00B4FF"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#zg2)"/><text x="24" y="31" font-family="Arial Black,sans-serif" font-size="15" font-weight="900" fill="white" text-anchor="middle">Zalo</text></svg>';
  }
  if (name === 'facebook') {
    return '<svg viewBox="0 0 48 48" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#1877F2"/><path d="M26.8 38V25.5h4.3l.6-5H26.8v-3.2c0-1.4.4-2.4 2.5-2.4H32V11c-.5-.1-2.2-.2-4.2-.2-4.1 0-6.9 2.5-6.9 7.1v4H17v5h3.9V38h5.9z" fill="white"/></svg>';
  }
  return '';
}

function kocBuildHTML() {
  var chatHTML = '';
  var msgs = kocChatMessages.concat(kocChatMessages);
  msgs.forEach(function(m) {
    var initials = m.name.split(' ').slice(0,2).map(function(w){return w[0];}).join('');
    chatHTML += '<div class="koc-chat-item">' +
      '<div class="koc-chat-avatar" style="background:' + m.color + '">' + initials + '</div>' +
      '<div class="koc-chat-info">' +
        '<div class="koc-chat-name">' + m.name + ' <span class="koc-chat-tag">(koco)</span></div>' +
        '<div class="koc-chat-msg">' + m.msg + '</div>' +
      '</div>' +
      '<div class="koc-chat-time">' + m.time + '</div>' +
    '</div>';
  });

  var iconsHTML = '';
  kocPlatforms.forEach(function(p, i) {
    iconsHTML += '<div class="koc-icon-item" id="kocIcon' + i + '">' +
      '<div class="koc-icon-wrap">' +
        '<div class="koc-icon-glow" id="kocGlow' + i + '"></div>' +
        '<div class="koc-icon-img" id="kocImg' + i + '">' + kocGetSVG(p.svgId) + '</div>' +
        '<div class="koc-icon-bubble" id="kocBubble' + i + '"></div>' +
      '</div>' +
      '<div class="koc-icon-label">' + p.name + '</div>' +
    '</div>';
  });

  return '<div class="koc-anim-wrapper" id="kocAnimWrapper">' +
    // Act 1: Phone
    '<div class="koc-act koc-act-1" id="kocAct1">' +
      '<div class="koc-phone">' +
        '<div class="koc-phone-screen">' +
          '<div class="koc-chat-header"><span style="color:#aaa;font-size:11px;font-family:-apple-system,sans-serif">🔍 Search</span></div>' +
          '<div class="koc-chat-list" id="kocChatList">' + chatHTML + '</div>' +
        '</div>' +
        '<div class="koc-phone-bar">' +
          '<span class="koc-phone-tab active">💬 Chats</span>' +
          '<span class="koc-phone-tab">⬆ Updates</span>' +
          '<span class="koc-phone-tab">👥 Groups</span>' +
          '<span class="koc-phone-tab">📞 Calls</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // Act 2: Social icons
    '<div class="koc-act koc-act-2" id="kocAct2">' +
      '<div class="koc-icons-grid">' + iconsHTML + '</div>' +
    '</div>' +
    // Act 3: Logo burst
    '<div class="koc-act koc-act-3" id="kocAct3">' +
      '<div class="koc-logo-burst">' +
        '<img src="images/koco-logo.png" alt="KOCO" class="koc-logo-img" id="kocLogoImg" />' +
        '<div class="koc-logo-wordmark" id="kocLogoWord">Koco</div>' +
      '</div>' +
    '</div>' +
    '<button class="koc-replay-btn" id="kocReplayBtn" title="重播">↺</button>' +
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
  var replayBtn = document.getElementById('kocReplayBtn');

  if (!act1) return;

  // Reset
  [act1, act2, act3].forEach(function(el) {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'scale(0.95)';
  });
  act3.style.transform = 'scale(1.05)';
  if (replayBtn) replayBtn.style.opacity = '0';

  // Reset icons
  for (var i = 0; i < 4; i++) {
    var icon = document.getElementById('kocIcon' + i);
    var bubble = document.getElementById('kocBubble' + i);
    var glow = document.getElementById('kocGlow' + i);
    var img = document.getElementById('kocImg' + i);
    if (icon) { icon.style.transition = 'none'; icon.style.opacity = '1'; icon.style.transform = 'scale(1) rotate(0deg) translate(0,0)'; }
    if (bubble) { bubble.style.transition = 'none'; bubble.style.opacity = '0'; bubble.style.transform = 'scale(0.8) translateY(8px)'; bubble.innerHTML = ''; }
    if (glow) { glow.style.transition = 'none'; glow.style.opacity = '0'; }
    if (img) { img.style.transition = 'none'; img.style.transform = 'scale(1)'; }
  }

  // Reset logo
  var logoImg = document.getElementById('kocLogoImg');
  var logoWord = document.getElementById('kocLogoWord');
  if (logoImg) { logoImg.style.transition = 'none'; logoImg.style.opacity = '0'; logoImg.style.transform = 'scale(0.3) rotate(-15deg)'; }
  if (logoWord) { logoWord.style.transition = 'none'; logoWord.style.opacity = '0'; logoWord.style.transform = 'translateY(24px)'; }

  // ---- ACT 1: Phone scrolling chat ----
  kocDelay(function() {
    act1.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    act1.style.opacity = '1';
    act1.style.transform = 'scale(1)';

    var scrollPos = 0;
    var speed = 0.9;
    var maxScroll = chatList ? chatList.scrollHeight / 2 : 0;

    function scrollLoop() {
      scrollPos += speed;
      if (scrollPos >= maxScroll) scrollPos = 0;
      if (chatList) chatList.scrollTop = scrollPos;
      kocScrollAnim = requestAnimationFrame(scrollLoop);
    }
    scrollLoop();
  }, 300);

  // ---- Transition ACT 1 → ACT 2 ----
  kocDelay(function() {
    if (kocScrollAnim) { cancelAnimationFrame(kocScrollAnim); kocScrollAnim = null; }
    act1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    act1.style.opacity = '0';
    act1.style.transform = 'scale(0.9)';

    kocDelay(function() {
      act2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      act2.style.opacity = '1';
      act2.style.transform = 'scale(1)';

      // Show bubbles: Instagram (idx 1) then Facebook (idx 3)
      var showOrder = [1, 3];
      showOrder.forEach(function(idx, seq) {
        kocDelay(function() {
          var p = kocPlatforms[idx];
          var bubble = document.getElementById('kocBubble' + idx);
          var glow = document.getElementById('kocGlow' + idx);
          var img = document.getElementById('kocImg' + idx);

          // Build bubble
          if (bubble) {
            bubble.innerHTML = p.bubbles.map(function(b, bi) {
              return '<div class="' + (bi === 0 ? 'koc-bubble-main' : 'koc-bubble-sub') + '">' +
                b.text + ' <span style="color:rgba(255,255,255,0.5)">- ' + b.count + '</span>' +
              '</div>';
            }).join('');
            bubble.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
            bubble.style.opacity = '1';
            bubble.style.transform = 'scale(1) translateY(0)';
          }

          // Glow
          if (glow) {
            glow.style.background = 'radial-gradient(circle, ' + p.glow + ' 0%, transparent 70%)';
            glow.style.transition = 'opacity 0.5s ease';
            glow.style.opacity = '1';
          }

          // Scale icon
          if (img) {
            img.style.transition = 'transform 0.3s ease';
            img.style.transform = 'scale(1.1)';
          }
        }, 700 + seq * 1400);
      });

    }, 500);
  }, 4500);

  // ---- Transition ACT 2 → ACT 3 ----
  kocDelay(function() {
    // Icons converge with rotation
    var positions = [
      'translate(-50px,-50px) rotate(-200deg) scale(0)',
      'translate(50px,-50px) rotate(200deg) scale(0)',
      'translate(-50px,50px) rotate(-200deg) scale(0)',
      'translate(50px,50px) rotate(200deg) scale(0)'
    ];
    for (var i = 0; i < 4; i++) {
      var icon = document.getElementById('kocIcon' + i);
      var bubble = document.getElementById('kocBubble' + i);
      if (bubble) { bubble.style.transition = 'opacity 0.2s'; bubble.style.opacity = '0'; }
      if (icon) {
        icon.style.transition = 'transform 0.65s cubic-bezier(0.55,0,1,0.45), opacity 0.65s ease';
        icon.style.transform = positions[i];
        icon.style.opacity = '0';
      }
    }

    kocDelay(function() {
      act2.style.transition = 'opacity 0.3s ease';
      act2.style.opacity = '0';

      kocDelay(function() {
        // Orange burst
        act3.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
        act3.style.opacity = '1';
        act3.style.transform = 'scale(1)';

        // Logo pop in
        kocDelay(function() {
          if (logoImg) {
            logoImg.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
            logoImg.style.opacity = '1';
            logoImg.style.transform = 'scale(1) rotate(0deg)';
          }
        }, 100);

        kocDelay(function() {
          if (logoWord) {
            logoWord.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
            logoWord.style.opacity = '1';
            logoWord.style.transform = 'translateY(0)';
          }
        }, 300);

        // Show replay
        kocDelay(function() {
          if (replayBtn) {
            replayBtn.style.transition = 'opacity 0.5s ease';
            replayBtn.style.opacity = '1';
          }
        }, 1800);

      }, 300);
    }, 650);
  }, 9000);
}

function kocInitAnimation() {
  var card = document.getElementById('kocVisualCard');
  if (!card) return;

  // Override old CSS that hides the card
  card.style.opacity = '1';
  card.style.transform = 'none';
  card.style.animation = 'none';
  card.style.transition = 'none';

  // Replace card content
  card.innerHTML = kocBuildHTML();

  // Replay button
  var replayBtn = document.getElementById('kocReplayBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', function() {
      replayBtn.style.opacity = '0';
      kocStartAnimation();
    });
  }

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
