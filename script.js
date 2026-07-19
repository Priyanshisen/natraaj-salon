/* ============================================
   NATRAAJ BEAUTY SALON — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // Fallback: hide preloader after 3s regardless
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar glass effect
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveLink();
  });

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Mobile Navigation ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileNav);
  navOverlay.addEventListener('click', toggleMobileNav);

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // ---------- Active Navigation Link ----------
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks.querySelector(`a[href="#${id}"]`);

      if (link && scrollPos >= top && scrollPos < top + height) {
        navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  // ---------- Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Floating Petals ----------
  function createPetals() {
    const petalCount = 8;
    const colors = ['#e8a0b0', '#f9e4e8', '#c27083', '#e6d49a', '#b07aa1'];

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');

      const size = Math.random() * 15 + 10;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.background = colors[Math.floor(Math.random() * colors.length)];
      petal.style.animationDuration = `${Math.random() * 10 + 10}s`;
      petal.style.animationDelay = `${Math.random() * 10}s`;
      petal.style.opacity = '0';

      document.body.appendChild(petal);
    }
  }

  createPetals();

  // ---------- Counter Animation ----------
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');

    counters.forEach(counter => {
      const text = counter.textContent;
      const target = parseInt(text.replace(/[^0-9]/g, ''));
      const suffix = text.replace(/[0-9]/g, '');
      let current = 0;
      const increment = Math.ceil(target / 60);
      const duration = 2000;
      const stepTime = duration / (target / increment);

      const updateCounter = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          return;
        }
        counter.textContent = current + suffix;
        setTimeout(updateCounter, stepTime);
      };

      // Start animation when hero is visible
      const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          heroObserver.disconnect();
        }
      }, { threshold: 0.5 });

      heroObserver.observe(counter);
    });
  }

  animateCounters();

  // ---------- Set minimum date for appointment ----------
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  // ---------- Appointment Form — WhatsApp Integration ----------
  const form = document.getElementById('appointmentForm');
  const formSuccess = document.getElementById('formSuccess');

    // The form now submits natively using FormSubmit.co
    // so we don't preventDefault() here anymore for WhatsApp.

  // ---------- Smooth scroll for all anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});

// ---------- Reset Form (global) ----------
function resetForm() {
  const form = document.getElementById('appointmentForm');
  const formSuccess = document.getElementById('formSuccess');
  form.reset();
  form.style.display = 'block';
  formSuccess.classList.remove('show');
}

// ---------- Order Modal Logic ----------
function openOrderModal(productName, price) {
  document.getElementById('modalProductName').textContent = productName;
  document.getElementById('hiddenProductName').value = productName;
  document.getElementById('hiddenProductPrice').value = '₹' + price;
  document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('active');
}

// Close on outside click
document.getElementById('orderModal').addEventListener('click', function(e) {
  if (e.target === this) closeOrderModal();
});

