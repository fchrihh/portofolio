/**
 * Portfolio JavaScript — Muhammad Fachri Hasan
 * Minimalist, performant, and robust vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Dynamic Year --- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --- 2. Navbar Scroll Effect --- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* --- 3. Theme Toggle (Dark / Light) --- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  } else {
    body.classList.remove('light-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      if (themeIcon) {
        themeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      }
    });
  }

  /* --- 4. Mobile Navigation Menu --- */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* --- 5. Active Nav Item On Scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(sec => observer.observe(sec));
  }

  /* --- 6. 1-Click Copy Email to Clipboard --- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'fachrihasan101@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalContent = copyEmailBtn.innerHTML;
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = originalContent;
        }, 2200);
      }).catch(() => {
        // Fallback
        alert(`Email: ${email}`);
      });
    });
  }

  /* --- 7. Support / QRIS Modal --- */
  const openSupportBtn = document.getElementById('openSupportBtn');
  const supportModal = document.getElementById('supportModal');
  const closeSupportBtn = document.getElementById('closeSupportBtn');

  function openModal() {
    if (supportModal) supportModal.classList.add('active');
  }

  function closeModal() {
    if (supportModal) supportModal.classList.remove('active');
  }

  if (openSupportBtn) openSupportBtn.addEventListener('click', openModal);
  if (closeSupportBtn) closeSupportBtn.addEventListener('click', closeModal);

  if (supportModal) {
    supportModal.addEventListener('click', (e) => {
      if (e.target === supportModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && supportModal && supportModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* --- 8. Contact Form Handling --- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Kirim Pesan';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Pesan terkirim! Terima kasih telah menghubungi.';
          contactForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.innerHTML = 'Terjadi kendala saat mengirim. Silakan hubungi via WhatsApp atau Email langsung.';
        }
      } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = 'Gagal terhubung ke server formulir. Silakan hubungi via WhatsApp atau Email.';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  /* --- 9. Initialize AOS (if present) --- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }

});
