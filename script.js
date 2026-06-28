/**
 * Hamna Fazil — Data Analyst Portfolio
 * Interactive functionality: navigation, scroll spy, contact form
 */

(function () {
  'use strict';

  /* ---------- DOM Elements ---------- */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  /* ---------- Sticky Header on Scroll ---------- */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    updateActiveNavLink();
  }

  /* ---------- Active Nav Link (Scroll Spy) ---------- */
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ---------- Mobile Navigation Toggle ---------- */
  function toggleNav() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  }

  function closeNav() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  /* ---------- Smooth Scroll for Nav Links ---------- */
  function handleNavClick(e) {
    const href = this.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeNav();
      }
    }
  }

  /* ---------- Contact Form Validation & Submit ---------- */
  function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    formStatus.className = 'form__status';
    formStatus.textContent = '';

    if (!name || !email || !message) {
      formStatus.classList.add('error');
      formStatus.textContent = 'Please fill in all fields.';
      return;
    }

    if (!isValidEmail(email)) {
      formStatus.classList.add('error');
      formStatus.textContent = 'Please enter a valid email address.';
      return;
    }

    /* Placeholder: replace with Formspree, Netlify Forms, or backend endpoint */
    formStatus.classList.add('success');
    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
    contactForm.reset();

    setTimeout(function () {
      formStatus.textContent = '';
      formStatus.className = 'form__status';
    }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---------- Event Listeners ---------- */
  window.addEventListener('scroll', handleScroll, { passive: true });

  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', handleNavClick);
  });

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  /* Close mobile nav on window resize to desktop */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeNav();
    }
  });

  /* Initial scroll state */
  handleScroll();
})();
