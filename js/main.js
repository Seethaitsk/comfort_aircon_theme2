/**
 * Comfort Aircon - Main Interactive Script
 * Handles:
 * - Mobile navigation menu toggle & keyboard trap
 * - Sticky header on scroll
 * - Shared Enquiry Popup (open, close, product auto-selection, focus trap)
 * - Strict 7-field form validation & live counter
 * - Simulated submission with placeholder for Laravel API
 * - Scroll-reveal animations with IntersectionObserver & reduced-motion support
 * - Home page Featured Products rendering from central CONFIG
 */

(function () {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', initApp);
  window.addEventListener('layoutReady', bindConfigLinks);
  window.addEventListener('load', bindConfigLinks);

  function initApp() {
    bindConfigLinks();
    initStickyHeader();
    initMobileNav();
    initEnquiryModal();
    initFeaturedProducts();
    initScrollAnimations();
  }

  /* Sync all dynamic link elements with central CONFIG */
  function bindConfigLinks() {
    const conf = window.CONFIG;
    if (!conf) return;

    document.querySelectorAll('[data-bind="whatsapp-link"]').forEach(el => {
      el.href = conf.whatsappLink;
    });

    document.querySelectorAll('[data-bind="call-link"]').forEach(el => {
      el.href = conf.callLink;
    });
  }

  /* ==========================================================================
     1. STICKY HEADER WITH SHADOW
     ========================================================================== */
  function initStickyHeader() {
    const mainNav = document.getElementById('main-nav-bar');
    if (!mainNav) return;

    function handleScroll() {
      if (window.scrollY > 40) {
        mainNav.classList.add('is-sticky');
      } else {
        mainNav.classList.remove('is-sticky');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION MENU
     ========================================================================== */
  function initMobileNav() {
    function openMobileMenu() {
      const toggleBtn = document.getElementById('mobile-nav-toggle');
      const drawer = document.getElementById('mobile-nav-drawer');
      if (!toggleBtn || !drawer) return;
      const hamburgerIcon = toggleBtn.querySelector('.hamburger-icon');
      const closeIcon = toggleBtn.querySelector('.close-icon');

      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
      drawer.hidden = false;
      drawer.classList.add('is-open');
      if (hamburgerIcon) hamburgerIcon.hidden = true;
      if (closeIcon) closeIcon.hidden = false;
    }

    function closeMobileMenu() {
      const toggleBtn = document.getElementById('mobile-nav-toggle');
      const drawer = document.getElementById('mobile-nav-drawer');
      if (!toggleBtn || !drawer) return;
      const hamburgerIcon = toggleBtn.querySelector('.hamburger-icon');
      const closeIcon = toggleBtn.querySelector('.close-icon');

      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      drawer.classList.remove('is-open');
      drawer.hidden = true;
      if (hamburgerIcon) hamburgerIcon.hidden = false;
      if (closeIcon) closeIcon.hidden = true;
    }

    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('#mobile-nav-toggle');
      if (toggleBtn) {
        e.stopPropagation();
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
        return;
      }

      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer && !drawer.hidden) {
        if (e.target.closest('#mobile-nav-drawer a')) {
          closeMobileMenu();
        } else if (!drawer.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    // Close on Esc key
    document.addEventListener('keydown', function (e) {
      const drawer = document.getElementById('mobile-nav-drawer');
      if (e.key === 'Escape' && drawer && !drawer.hidden) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. ENQUIRY POPUP (SHARED MODAL - EXACTLY 7 FIELDS)
     ========================================================================== */
  let activeFocusBeforeModal = null;

  function initEnquiryModal() {
    const modal = document.getElementById('enquiry-modal');
    const form = document.getElementById('enquiry-form');
    const successView = document.getElementById('enquiry-success-view');
    const closeBtn = document.getElementById('modal-close-trigger');
    const doneBtn = document.getElementById('success-done-btn');
    const locationSelect = document.getElementById('enquiry-location');
    const otherLocationWrap = document.getElementById('other-location-wrap');
    const otherLocationInput = document.getElementById('enquiry-other-location');
    const messageInput = document.getElementById('enquiry-message');
    const charCounter = document.getElementById('message-char-counter');
    const productSelect = document.getElementById('enquiry-product');

    if (!modal || !form) return;

    // Open Modal Function
    window.openEnquiryModal = function (productToSelect = '') {
      activeFocusBeforeModal = document.activeElement;
      modal.hidden = false;
      modal.classList.add('is-visible');
      document.body.classList.add('modal-scroll-lock');

      // Reset form states
      form.hidden = false;
      if (successView) successView.hidden = true;
      clearFormErrors();

      // Pre-select product if opened from a product card
      if (productSelect && productToSelect) {
        let matchFound = false;
        for (let i = 0; i < productSelect.options.length; i++) {
          if (productSelect.options[i].value.toLowerCase().includes(productToSelect.toLowerCase()) ||
              productToSelect.toLowerCase().includes(productSelect.options[i].value.toLowerCase())) {
            productSelect.selectedIndex = i;
            matchFound = true;
            break;
          }
        }
        if (!matchFound) {
          productSelect.value = productToSelect;
        }
      }

      // Focus first input
      const firstInput = document.getElementById('enquiry-name');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    };

    // Close Modal Function
    window.closeEnquiryModal = function () {
      modal.classList.remove('is-visible');
      modal.hidden = true;
      document.body.classList.remove('modal-scroll-lock');
      form.reset();
      clearFormErrors();
      if (otherLocationWrap) otherLocationWrap.style.display = 'none';
      if (charCounter) charCounter.textContent = '0 / 500';
      if (activeFocusBeforeModal && typeof activeFocusBeforeModal.focus === 'function') {
        activeFocusBeforeModal.focus();
      }
    };

    // Delegation to handle all Enquiry triggers
    document.addEventListener('click', function (e) {
      const openBtn = e.target.closest('[data-action="open-enquiry"]');
      if (openBtn) {
        e.preventDefault();
        window.openEnquiryModal();
        return;
      }

      const productEnquireBtn = e.target.closest('[data-action="enquire-product"]');
      if (productEnquireBtn) {
        e.preventDefault();
        const productName = productEnquireBtn.getAttribute('data-product-name') || '';
        window.openEnquiryModal(productName);
        return;
      }

      if (e.target.closest('#modal-close-trigger') || e.target.closest('#success-done-btn')) {
        e.preventDefault();
        window.closeEnquiryModal();
        return;
      }

      // Close on backdrop click (outside modal-dialog)
      if (e.target === modal) {
        window.closeEnquiryModal();
        return;
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', window.closeEnquiryModal);
    }
    if (doneBtn) {
      doneBtn.addEventListener('click', window.closeEnquiryModal);
    }

    // Keyboard support: Escape to close & Focus trap
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) {
        window.closeEnquiryModal();
        return;
      }

      if (e.key === 'Tab' && !modal.hidden) {
        const focusables = modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Location "Other" conditional text box
    if (locationSelect && otherLocationWrap) {
      locationSelect.addEventListener('change', function () {
        if (this.value === 'Other') {
          otherLocationWrap.style.display = 'block';
          if (otherLocationInput) otherLocationInput.required = true;
        } else {
          otherLocationWrap.style.display = 'none';
          if (otherLocationInput) {
            otherLocationInput.required = false;
            otherLocationInput.value = '';
          }
          clearError('other-location');
        }
        clearError('location');
      });
    }

    // Live character counter for Message (max 500)
    if (messageInput && charCounter) {
      messageInput.addEventListener('input', function () {
        const len = this.value.length;
        charCounter.textContent = `${len} / 500`;
        if (len >= 500) {
          charCounter.classList.add('limit-reached');
        } else {
          charCounter.classList.remove('limit-reached');
        }
      });
    }

    // Form inputs blur clear validation
    ['name', 'phone', 'email', 'service', 'location', 'other-location'].forEach(fieldId => {
      const el = document.getElementById('enquiry-' + fieldId);
      if (el) {
        el.addEventListener('input', () => clearError(fieldId));
        el.addEventListener('change', () => clearError(fieldId));
      }
    });

    // Form Submit Handler
    form.addEventListener('submit', handleEnquirySubmit);
  }

  function setError(fieldId, message) {
    const errorEl = document.getElementById('error-' + fieldId);
    const inputEl = document.getElementById('enquiry-' + fieldId);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) {
      inputEl.classList.add('is-invalid');
      const wrap = inputEl.closest('.phone-input-wrap');
      if (wrap) wrap.classList.add('is-invalid');
    }
  }

  function clearError(fieldId) {
    const errorEl = document.getElementById('error-' + fieldId);
    const inputEl = document.getElementById('enquiry-' + fieldId);
    if (errorEl) errorEl.textContent = '';
    if (inputEl) {
      inputEl.classList.remove('is-invalid');
      const wrap = inputEl.closest('.phone-input-wrap');
      if (wrap) wrap.classList.remove('is-invalid');
    }
  }

  function clearFormErrors() {
    ['name', 'phone', 'email', 'service', 'product', 'location', 'other-location', 'message'].forEach(clearError);
  }

  /* ==========================================================================
     4. FORM VALIDATION & SUBMISSION
     ========================================================================== */
  async function handleEnquirySubmit(e) {
    e.preventDefault();
    clearFormErrors();

    const nameInput = document.getElementById('enquiry-name');
    const phoneInput = document.getElementById('enquiry-phone');
    const emailInput = document.getElementById('enquiry-email');
    const serviceSelect = document.getElementById('enquiry-service');
    const productSelect = document.getElementById('enquiry-product');
    const locationSelect = document.getElementById('enquiry-location');
    const otherLocationInput = document.getElementById('enquiry-other-location');
    const messageInput = document.getElementById('enquiry-message');

    const submitBtn = document.getElementById('enquiry-submit-button');
    const submitText = submitBtn.querySelector('.submit-text');
    const submitLoader = submitBtn.querySelector('.submit-loader');

    let isValid = true;

    // 1. Name: text, required, letters and spaces only
    const nameVal = nameInput ? nameInput.value.trim() : '';
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!nameVal) {
      setError('name', 'Full name is required.');
      isValid = false;
    } else if (!namePattern.test(nameVal) || nameVal.length < 2) {
      setError('name', 'Please enter a valid name (letters and spaces only).');
      isValid = false;
    }

    // 2. Mobile Number: required, valid 10-digit Indian mobile (starts with 6-9)
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const indianMobilePattern = /^[6-9]\d{9}$/;
    if (!phoneVal) {
      setError('phone', 'Mobile number is required.');
      isValid = false;
    } else if (!indianMobilePattern.test(phoneVal)) {
      setError('phone', 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).');
      isValid = false;
    }

    // 3. Email: optional, but if entered must be valid
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal && !emailPattern.test(emailVal)) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    // 4. Service Required: dropdown, required (8 services + Other)
    const serviceVal = serviceSelect ? serviceSelect.value : '';
    if (!serviceVal) {
      setError('service', 'Please select a service.');
      isValid = false;
    }

    // 5. Product Interested In: optional
    const productVal = productSelect ? productSelect.value : '';

    // 6. Location: dropdown, required
    const locationVal = locationSelect ? locationSelect.value : '';
    let finalLocation = locationVal;
    if (!locationVal) {
      setError('location', 'Please select your location.');
      isValid = false;
    } else if (locationVal === 'Other') {
      const otherVal = otherLocationInput ? otherLocationInput.value.trim() : '';
      if (!otherVal) {
        setError('other-location', 'Please specify your location.');
        isValid = false;
      } else {
        finalLocation = `Other (${otherVal})`;
      }
    }

    // 7. Message: optional, max 500 characters
    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (messageVal.length > 500) {
      setError('message', 'Message cannot exceed 500 characters.');
      isValid = false;
    }

    if (!isValid) {
      // Focus first error field
      const firstInvalid = document.querySelector('.field-input.is-invalid, .field-select.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Prepare clean form payload
    const enquiryData = {
      name: nameVal,
      phone: `+91${phoneVal}`,
      email: emailVal || null,
      service: serviceVal,
      product: productVal || 'General Enquiry',
      location: finalLocation,
      message: messageVal || '',
      submittedAt: new Date().toISOString()
    };

    // Enter Submit Loading State
    submitBtn.disabled = true;
    if (submitText) submitText.hidden = true;
    if (submitLoader) submitLoader.hidden = false;

    try {
      // Call placeholder function simulating server submission
      await submitEnquiry(enquiryData);

      // On Success: switch views
      const formEl = document.getElementById('enquiry-form');
      const successView = document.getElementById('enquiry-success-view');

      if (formEl) formEl.hidden = true;
      if (successView) {
        successView.hidden = false;
        const doneBtn = document.getElementById('success-done-btn');
        if (doneBtn) doneBtn.focus();
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      alert('Unable to submit enquiry at this time. Please call or WhatsApp us directly.');
    } finally {
      // Reset submit button state
      submitBtn.disabled = false;
      if (submitText) submitText.hidden = false;
      if (submitLoader) submitLoader.hidden = true;
    }
  }

  /**
   * Placeholder function that simulates server delay and logs to console.
   * 
   * TODO: Connect this to the Laravel API endpoint later (e.g., POST /api/enquiries)
   * Example:
   * return fetch('/api/enquiries', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
   *   body: JSON.stringify(data)
   * });
   */
  function submitEnquiry(data) {
    console.log('[Comfort Aircon] Enquiry Submitted (Placeholder):', data);
    return new Promise(resolve => setTimeout(resolve, 800));
  }

  /* ==========================================================================
     5. HOME PAGE: FEATURED PRODUCTS INJECTION
     Shows ONLY: Image, Name, Model, Specifications (short), Features (short), Enquire button
     NO price, cart, buy button, stock, reviews or wishlist.
     ========================================================================== */
  function initFeaturedProducts() {
    const productsContainer = document.getElementById('featured-products-container');
    if (!productsContainer) return;

    const conf = window.CONFIG;
    if (!conf || !conf.mockProducts) return;

    const productsHtml = conf.mockProducts.map(p => `
      <article class="product-card reveal-item" data-product-id="${p.id}">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name} - Model ${p.model}" class="product-img" loading="lazy" width="400" height="250" />
        </div>
        <div class="product-content">
          <div class="product-badge">Carrier Authorized</div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-model"><span class="model-label">Model:</span> ${p.model}</p>
          
          <div class="product-info-block">
            <h4 class="product-info-heading">Specifications:</h4>
            <p class="product-spec-text">${p.specifications}</p>
          </div>

          <div class="product-info-block">
            <h4 class="product-info-heading">Key Features:</h4>
            <p class="product-feature-text">${p.features}</p>
          </div>

          <div class="product-action-row">
            <button 
              type="button" 
              class="btn btn-product-enquire" 
              data-action="enquire-product" 
              data-product-name="${p.name}" 
              aria-label="Enquire about ${p.name}"
            >
              Enquire Now
            </button>
            <button 
              type="button" 
              class="btn-product-arrow" 
              data-action="enquire-product" 
              data-product-name="${p.name}" 
              aria-label="View or enquire about ${p.name}"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    productsContainer.innerHTML = productsHtml;
  }

  /* ==========================================================================
     6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  function initScrollAnimations() {
    // Respect user's preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-item');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.01,
      rootMargin: '100px 0px 100px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

})();
