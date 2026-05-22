/* =====================================================
   PixelCraft Studio — script.js
   Build. Design. Create.
   ===================================================== */

/* =====================================================
   1. HERO ICON — Video animasi + fallback + pixel dots
   ===================================================== */

(function initHeroIcon() {
  const video   = document.getElementById('heroIconVideo');
  const fallback = document.getElementById('heroIconFallback');

  // Jika video gagal dimuat / diputar → tampilkan fallback image
  if (video) {
    video.addEventListener('error', () => {
      video.classList.add('error');
      if (fallback) fallback.style.display = 'block';
    });

    // Pastikan video mute & autoplay (diperlukan browser mobile)
    video.muted = true;
    video.play().catch(() => {
      // Autoplay diblokir browser → tampilkan fallback
      video.classList.add('error');
      if (fallback) fallback.style.display = 'block';
    });
  }

  // --- Floating pixel dots di sekitar icon ---
  const container = document.getElementById('iconPixels');
  if (!container) return;

  const colors = ['#FF6B2B', '#E91E8C', '#7B2FBE', '#3B82F6', '#FF8C42', '#9D4EDD'];
  const count  = 18;
  const wrap   = document.getElementById('hero3d');
  const W = wrap ? wrap.offsetWidth  || 500 : 500;
  const H = wrap ? wrap.offsetHeight || 480 : 480;

  for (let i = 0; i < count; i++) {
    const dot  = document.createElement('div');
    dot.className = 'icon-pixel-dot';
    const size = Math.random() * 10 + 5;
    const x    = Math.random() * W;
    const y    = Math.random() * H;
    const dur  = Math.random() * 4 + 3;
    const delay = Math.random() * 5;

    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.4 ? '3px' : '50%'};
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
      filter: blur(${Math.random() > 0.6 ? 1 : 0}px);
    `;
    container.appendChild(dot);
  }
})();

/* =====================================================
   2. NAVBAR — scroll effect & active link
   ===================================================== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  // Active link on scroll
  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Smooth scroll on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu
          document.getElementById('navMenu').classList.remove('open');
          document.getElementById('hamburger').classList.remove('active');
        }
      }
    });
  });
})();

/* =====================================================
   3. HAMBURGER MENU
   ===================================================== */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove('active');
      menu.classList.remove('open');
    }
  });
})();

/* =====================================================
   4. DARK / LIGHT THEME TOGGLE
   ===================================================== */
(function initTheme() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('pixelcraft-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateIcon(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pixelcraft-theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }
})();

/* =====================================================
   5. TYPING EFFECT on hero tagline
   ===================================================== */
(function initTyping() {
  const target = document.getElementById('typingTarget');
  if (!target) return;

  const phrases = [
    'Build. Design. Create.',
    'From Vision to Reality.',
    'Pixel Perfect. Always.',
    'Your Digital Studio Partner.',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  // Create cursor span
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  target.appendChild(cursor);

  function type() {
    const current = phrases[phraseIndex];
    const displayed = isDeleting
      ? current.slice(0, charIndex - 1)
      : current.slice(0, charIndex + 1);

    target.textContent = displayed;
    target.appendChild(cursor);

    if (!isDeleting) {
      charIndex++;
      if (charIndex > current.length) {
        isDeleting = true;
        typingSpeed = 60;
        setTimeout(type, 1800); // pause before delete
        return;
      }
      typingSpeed = 75 + Math.random() * 40;
    } else {
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 120;
      }
      typingSpeed = 40;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
})();

/* =====================================================
   6. FLOATING PIXEL BACKGROUND in Hero
   ===================================================== */
(function initPixelBg() {
  const bg = document.getElementById('pixelBg');
  if (!bg) return;

  const colors = ['#FF6B2B', '#E91E8C', '#7B2FBE', '#3B82F6', '#FF8C42', '#9D4EDD'];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'pixel-dot';
    const size = Math.random() * 6 + 3;
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '2px' : '50%'};
      animation-duration: ${Math.random() * 10 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    bg.appendChild(dot);
  }
})();

/* =====================================================
   7. SCROLL ANIMATIONS (lightweight AOS alternative)
   ===================================================== */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* =====================================================
   8. CONTACT FORM — Kirim otomatis ke WhatsApp
   ===================================================== */
(function initContactForm() {
  // ⬇️ GANTI dengan nomor WhatsApp kamu (format: kode negara + nomor, tanpa + atau 0 di depan)
  // Contoh Indonesia: 628123456789
  const WA_NUMBER = '6287895623651';

  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ambil nilai form
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validasi wajib
    if (!name || !email || !message) {
      shakeForm();
      return;
    }

    // Susun pesan WA yang rapi
    const waText = [
      `🎨 *Halo PixelCraft Studio!*`,
      ``,
      `Saya ingin memulai sebuah project bersama kalian.`,
      ``,
      `👤 *Nama:* ${name}`,
      `📧 *Email:* ${email}`,
      service ? `🛠️ *Layanan:* ${service}` : null,
      ``,
      `💬 *Pesan:*`,
      message,
      ``,
      `_Dikirim via PixelCraft Studio Website_`,
    ].filter(line => line !== null).join('\n');

    // Encode untuk URL
    const encoded = encodeURIComponent(waText);
    const waURL   = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

    // Loading state pada tombol
    const btn = form.querySelector('.btn-submit');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membuka WhatsApp...';
    btn.disabled = true;

    // Buka WhatsApp di tab baru
    setTimeout(() => {
      window.open(waURL, '_blank');

      // Reset form & tombol
      form.reset();
      btn.innerHTML = '<span>Send Message</span><i class="fa-brands fa-whatsapp"></i>';
      btn.disabled = false;

      showToast();
    }, 800);
  });

  // Goyangkan form jika validasi gagal
  function shakeForm() {
    form.style.animation = 'shake 0.4s ease';
    setTimeout(() => form.style.animation = '', 400);
  }

  function showToast() {
    if (!toast) return;
    toast.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span>WhatsApp dibuka! Lanjutkan kirim pesan kamu 🚀</span>';
    toast.style.borderColor = 'rgba(37,211,102,0.4)';
    toast.querySelector('i').style.color = '#25D366';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }
})();

/* =====================================================
   9. SMOOTH SCROLL for all anchor links
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =====================================================
   10. SERVICE & PORTFOLIO CARD hover glow
   ===================================================== */
(function initCardGlow() {
  const cards = document.querySelectorAll('.service-card, .portfolio-card, .about-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
})();

console.log('%cPixelCraft Studio 🎨', 'color: #FF6B2B; font-size: 18px; font-weight: bold;');
console.log('%cBuild. Design. Create.', 'color: #7B2FBE; font-size: 12px;');
