/**
 * Comfort Aircon - Layout Injector
 * Builds Header, Footer, Floating WhatsApp, and the Enquiry Modal once
 * and injects them into every page so there is zero duplicated markup.
 */

(function () {
  'use strict';

  // SVG Icon definitions (lightweight, crisp, self-contained)
  const ICONS = {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.41 11.41 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.41 11.41 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.101-.476-.15-.677.151-.2.302-.777.98-1.028 1.258-.251.277-.502.302-.803.151-1.808-.905-3.32-2.003-4.526-3.824-.15-.226-.016-.349.135-.5.136-.135.302-.351.452-.527.151-.176.201-.301.302-.502.1-.2.05-.376-.026-.527-.075-.15-1.78-4.293-1.854-4.469-.074-.176-.15-.15-.226-.15h-.627c-.226 0-.577.075-.879.377-.301.301-1.154 1.13-1.154 2.76 0 1.63 1.18 3.213 1.356 3.439.176.226 2.333 3.565 5.654 4.996 2.238.966 3.109.99 4.213.84.677-.092 2.056-.84 2.348-1.654.293-.815.293-1.512.206-1.659-.088-.147-.289-.223-.59-.374zM12.04 2C6.51 2 2.03 6.48 2.03 12.01c0 1.98.58 3.82 1.58 5.37L2 22l4.78-1.55a9.98 9.98 0 005.26 1.48c5.53 0 10.01-4.48 10.01-10.01C22.05 6.48 17.57 2 12.04 2zm0 18.23c-1.64 0-3.17-.48-4.47-1.3l-.32-.2-3.32 1.08 1.09-3.23-.21-.34a8.17 8.17 0 01-1.25-4.32c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.31-8.2 8.31z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
    mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    snowflake: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22 11h-4.18l2.6-2.6-1.42-1.42L15.58 10H13V7.42l3.02-3.02-1.42-1.42L12 5.58 9.4 3 7.98 4.42 11 7.42V10H8.42L5.4 6.98 3.98 8.4 6.58 11H2.4a.4.4 0 000 .8H2v.4h.4v.8h4.18l-2.6 2.6 1.42 1.42L8.42 14H11v2.58l-3.02 3.02 1.42 1.42L12 18.42l2.6 2.6 1.42-1.42L13 16.58V14h2.58l3.02 3.02 1.42-1.42-2.6-2.6H22v-2h-.4a.4.4 0 000-.8H22v-.2z"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };

  /**
   * Helper to detect current page filename for navigation highlighting
   */
  function getCurrentPageName() {
    const path = window.location.pathname;
    let page = path.split('/').pop();
    if (!page || page === '') {
      page = 'index.html';
    }
    return page;
  }

  /**
   * Build Social Links Markup
   * Only includes networks with non-empty URLs
   */
  function buildSocialMarkup(extraClass = '') {
    const links = [];
    const conf = window.CONFIG || {};
    const social = conf.social || {};

    if (social.facebook && social.facebook.trim() !== '') {
      links.push(`<a href="${social.facebook}" target="_blank" rel="noopener noreferrer" class="social-icon facebook ${extraClass}" aria-label="Follow Comfort Aircon on Facebook">${ICONS.facebook}</a>`);
    }
    if (social.instagram && social.instagram.trim() !== '') {
      links.push(`<a href="${social.instagram}" target="_blank" rel="noopener noreferrer" class="social-icon instagram ${extraClass}" aria-label="Follow Comfort Aircon on Instagram">${ICONS.instagram}</a>`);
    }
    if (social.twitter && social.twitter.trim() !== '') {
      links.push(`<a href="${social.twitter}" target="_blank" rel="noopener noreferrer" class="social-icon twitter ${extraClass}" aria-label="Follow Comfort Aircon on Twitter / X">${ICONS.twitter}</a>`);
    }
    if (social.youtube && social.youtube.trim() !== '') {
      links.push(`<a href="${social.youtube}" target="_blank" rel="noopener noreferrer" class="social-icon youtube ${extraClass}" aria-label="Subscribe to Comfort Aircon on YouTube">${ICONS.youtube}</a>`);
    }
    return links.join('');
  }

  /**
   * Build Header Component
   */
  function injectHeader() {
    const headerContainer = document.getElementById('site-header');
    if (!headerContainer) return;

    const conf = window.CONFIG;
    const currentPage = getCurrentPageName();

    const navItems = [
      { name: 'Home', href: 'index.html' },
      { name: 'About Us', href: 'about.html' },
      { name: 'Services', href: 'services.html' },
      { name: 'Products', href: 'products.html' },
      { name: 'Gallery', href: 'gallery.html' },
      { name: 'Contact Us', href: 'contact.html' }
    ];

    const navLinksHtml = navItems.map(item => {
      const isActive = (item.href === currentPage) || (currentPage === '' && item.href === 'index.html');
      return `<li><a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>${item.name}</a></li>`;
    }).join('');

    const socialMarkup = buildSocialMarkup();

    headerContainer.innerHTML = `
      <header class="site-header" id="main-header">
        <!-- Top Bar -->
        <div class="header-top-bar">
          <div class="container top-bar-container">
            <div class="top-bar-contact">
              <a href="${conf.callLink}" class="top-contact-link" aria-label="Call Comfort Aircon">
                ${ICONS.phone} <span>${conf.phone}</span>
              </a>
              <span class="top-divider" aria-hidden="true">|</span>
              <a href="mailto:${conf.email}" class="top-contact-link" aria-label="Email Comfort Aircon">
                ${ICONS.mail} <span>${conf.email}</span>
              </a>
            </div>
            <div class="top-bar-right">
              <span class="authorized-badge-sm">Authorized Carrier Dealer</span>
              <div class="top-social-links" aria-label="Social links">
                ${socialMarkup}
              </div>
            </div>
          </div>
        </div>

        <!-- Main Nav Bar -->
        <div class="header-main-bar" id="main-nav-bar">
          <div class="container main-bar-container">
            <!-- Brand Logo -->
            <a href="index.html" class="site-brand" aria-label="Comfort Aircon - Complete Cooling Solutions">
              <img src="assets/images/logo.png" alt="Comfort Aircon - Complete Cooling Solutions" class="site-logo-img" width="180" height="73" />
            </a>

            <!-- Desktop Navigation -->
            <nav class="main-navigation" id="desktop-nav" aria-label="Primary Navigation">
              <ul class="nav-menu">
                ${navLinksHtml}
              </ul>
            </nav>

            <!-- Header Action Buttons (Enquire & WhatsApp stay visible on mobile) -->
            <div class="header-actions">
              <a href="${conf.callLink}" class="btn btn-call-header" aria-label="Call Comfort Aircon">
                ${ICONS.phone} <span class="action-btn-text">Call</span>
              </a>
              <a href="${conf.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-header" aria-label="Chat with Comfort Aircon on WhatsApp">
                ${ICONS.whatsapp} <span class="action-btn-text">WhatsApp</span>
              </a>
              <button type="button" class="btn btn-enquire-header" data-action="open-enquiry" aria-label="Open Enquiry Form">
                Enquire Now
              </button>

              <!-- Mobile Hamburger Toggle -->
              <button type="button" class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
                <span class="hamburger-icon">${ICONS.menu}</span>
                <span class="close-icon" hidden>${ICONS.close}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Drawer Navigation -->
        <div class="mobile-nav-drawer" id="mobile-nav-drawer" hidden>
          <div class="mobile-nav-inner">
            <div class="mobile-dealer-badge">
              <span>★ Authorized Carrier AC Dealer</span>
            </div>
            <nav aria-label="Mobile Navigation">
              <ul class="mobile-nav-menu">
                ${navLinksHtml}
              </ul>
            </nav>
            <div class="mobile-drawer-contact">
              <p class="mobile-contact-title">Contact &amp; Support</p>
              <a href="${conf.callLink}" class="mobile-contact-item">
                ${ICONS.phone} <span>${conf.phone}</span>
              </a>
              <a href="mailto:${conf.email}" class="mobile-contact-item">
                ${ICONS.mail} <span>${conf.email}</span>
              </a>
              <div class="mobile-social-wrap">
                ${socialMarkup}
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  /**
   * Build Footer Component
   */
  function injectFooter() {
    const footerContainer = document.getElementById('site-footer');
    if (!footerContainer) return;

    const conf = window.CONFIG;

    const servicesListHtml = conf.services.map(s => {
      return `<li><a href="services.html" class="footer-link">${s.name}</a></li>`;
    }).join('');

    const socialMarkup = buildSocialMarkup('footer-social-icon');

    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-top-section">
          <div class="container footer-grid">
            <!-- Column 1: About -->
            <div class="footer-col footer-about-col">
              <a href="index.html" class="footer-brand" aria-label="Comfort Aircon Home">
                <span class="footer-logo-card">
                  <img src="assets/images/logo.png" alt="Comfort Aircon - Complete Cooling Solutions" class="footer-logo-img" width="180" height="73" />
                </span>
              </a>
              <p class="footer-about-text">
                Your premier Authorized Carrier Air Conditioner dealer in Pondicherry. Delivering top-tier cooling solutions, genuine Carrier units, expert installations, and trusted AC repairs.
              </p>
              <div class="footer-dealer-tag">
                <span class="tag-badge">Authorized Carrier AC Dealer</span>
              </div>
              <div class="footer-social-links" aria-label="Social media links">
                ${socialMarkup}
              </div>
            </div>

            <!-- Column 2: Quick Links -->
            <div class="footer-col">
              <h3 class="footer-col-title">Quick Links</h3>
              <ul class="footer-links-list">
                <li><a href="index.html" class="footer-link">Home</a></li>
                <li><a href="about.html" class="footer-link">About Us</a></li>
                <li><a href="services.html" class="footer-link">Services</a></li>
                <li><a href="products.html" class="footer-link">Products</a></li>
                <li><a href="gallery.html" class="footer-link">Gallery</a></li>
                <li><a href="contact.html" class="footer-link">Contact Us</a></li>
              </ul>
            </div>

            <!-- Column 3: Our Services (all 8) -->
            <div class="footer-col">
              <h3 class="footer-col-title">Our Services</h3>
              <ul class="footer-links-list">
                ${servicesListHtml}
              </ul>
            </div>

            <!-- Column 4: Contact & Locations -->
            <div class="footer-col footer-contact-col">
              <h3 class="footer-col-title">Contact Us</h3>
              <ul class="footer-contact-list">
                <li class="footer-contact-item">
                  <span class="contact-icon" aria-hidden="true">${ICONS.mapPin}</span>
                  <span>${conf.address}</span>
                </li>
                <li class="footer-contact-item">
                  <span class="contact-icon" aria-hidden="true">${ICONS.phone}</span>
                  <a href="${conf.callLink}" class="footer-link">${conf.phone}</a>
                </li>
                <li class="footer-contact-item">
                  <span class="contact-icon" aria-hidden="true">${ICONS.whatsapp}</span>
                  <a href="${conf.whatsappLink}" target="_blank" rel="noopener noreferrer" class="footer-link">WhatsApp: ${conf.whatsapp}</a>
                </li>
                <li class="footer-contact-item">
                  <span class="contact-icon" aria-hidden="true">${ICONS.mail}</span>
                  <a href="mailto:${conf.email}" class="footer-link">${conf.email}</a>
                </li>
                <li class="footer-contact-item">
                  <span class="contact-icon" aria-hidden="true">${ICONS.clock}</span>
                  <span>${conf.workingHours}</span>
                </li>
              </ul>
              <div class="footer-maps-wrap">
                <a href="${conf.googleMapsLink}" target="_blank" rel="noopener noreferrer" class="footer-map-btn">
                  View on Google Maps &rarr;
                </a>
              </div>
              <div class="footer-service-areas">
                <h4 class="areas-title">Service Areas:</h4>
                <p class="areas-text">Pondicherry, Villupuram, Cuddalore and nearby locations.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Strip -->
        <div class="footer-bottom-strip">
          <div class="container bottom-strip-container">
            <p class="copyright-text">
              &copy; ${new Date().getFullYear()} Comfort Aircon. All rights reserved. Authorized Carrier AC Dealer in Pondicherry.
            </p>
            <p class="disclaimer-text">
              Business Enquiry &amp; Support Portal • Designed for prompt local customer assistance.
            </p>
          </div>
        </div>
      </footer>
    `;
  }

  /**
   * Inject Floating WhatsApp Button
   */
  function injectFloatingWhatsApp() {
    if (document.getElementById('floating-whatsapp-btn')) return;

    const conf = window.CONFIG;
    const btn = document.createElement('a');
    btn.id = 'floating-whatsapp-btn';
    btn.className = 'floating-whatsapp';
    btn.href = conf.whatsappLink;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Chat with Comfort Aircon on WhatsApp');
    btn.innerHTML = `
      <span class="whatsapp-pulse"></span>
      <span class="whatsapp-icon-wrap">${ICONS.whatsapp}</span>
      <span class="whatsapp-tooltip">Chat with us</span>
    `;
    document.body.appendChild(btn);
  }

  /**
   * Inject Enquiry Popup Modal (The ONE shared form, exactly 7 fields)
   */
  function injectEnquiryModal() {
    if (document.getElementById('enquiry-modal')) return;

    const conf = window.CONFIG;

    // Service dropdown options (8 services + Other)
    const serviceOptions = conf.services.map(s => {
      return `<option value="${s.name}">${s.name}</option>`;
    }).join('') + `<option value="Other">Other</option>`;

    // Product dropdown options (from mockProducts)
    const productOptions = conf.mockProducts.map(p => {
      return `<option value="${p.name}">${p.name} (${p.model})</option>`;
    }).join('');

    // Location dropdown options (Pondicherry, Villupuram, Cuddalore, Other)
    const locationOptions = conf.locations.map(loc => {
      return `<option value="${loc}">${loc}</option>`;
    }).join('');

    const modalWrapper = document.createElement('div');
    modalWrapper.id = 'enquiry-modal';
    modalWrapper.className = 'modal-backdrop';
    modalWrapper.setAttribute('role', 'dialog');
    modalWrapper.setAttribute('aria-modal', 'true');
    modalWrapper.setAttribute('aria-labelledby', 'modal-heading');
    modalWrapper.hidden = true;

    modalWrapper.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <div>
              <h2 id="modal-heading" class="modal-title">Business Enquiry</h2>
              <p class="modal-subtitle">Authorized Carrier AC Dealer • Pondicherry</p>
            </div>
            <button type="button" class="modal-close-trigger" id="modal-close-trigger" aria-label="Close enquiry modal">
              ${ICONS.close}
            </button>
          </div>

          <!-- Enquiry Form (Exactly 7 fields) -->
          <form id="enquiry-form" class="enquiry-form" novalidate>
            <!-- Field 1: Name (text, required, letters and spaces only) -->
            <div class="form-field-group">
              <label for="enquiry-name" class="field-label">Full Name <span class="req">*</span></label>
              <input 
                type="text" 
                id="enquiry-name" 
                name="name" 
                class="field-input" 
                placeholder="Enter your name" 
                required 
                pattern="^[a-zA-Z\\s]+$" 
                autocomplete="name"
              />
              <span class="field-error-message" id="error-name" role="alert" aria-live="polite"></span>
            </div>

            <!-- Field 2: Mobile Number (required, valid 10-digit Indian mobile starting with 6-9) -->
            <div class="form-field-group">
              <label for="enquiry-phone" class="field-label">Mobile Number <span class="req">*</span></label>
              <div class="phone-input-wrap">
                <span class="country-prefix">+91</span>
                <input 
                  type="tel" 
                  id="enquiry-phone" 
                  name="phone" 
                  class="field-input phone-input" 
                  placeholder="10-digit mobile number" 
                  required 
                  maxlength="10" 
                  pattern="^[6-9]\\d{9}$" 
                  autocomplete="tel"
                />
              </div>
              <span class="field-error-message" id="error-phone" role="alert" aria-live="polite"></span>
            </div>

            <!-- Field 3: Email (optional) -->
            <div class="form-field-group">
              <label for="enquiry-email" class="field-label">Email Address <span class="optional-tag">(Optional)</span></label>
              <input 
                type="email" 
                id="enquiry-email" 
                name="email" 
                class="field-input" 
                placeholder="name@example.com" 
                autocomplete="email"
              />
              <span class="field-error-message" id="error-email" role="alert" aria-live="polite"></span>
            </div>

            <!-- Field 4: Service Required (dropdown, required, 8 services + Other) -->
            <div class="form-field-group">
              <label for="enquiry-service" class="field-label">Service Required <span class="req">*</span></label>
              <select id="enquiry-service" name="service" class="field-select" required>
                <option value="">-- Select Required Service --</option>
                ${serviceOptions}
              </select>
              <span class="field-error-message" id="error-service" role="alert" aria-live="polite"></span>
            </div>

            <!-- Field 5: Product Interested In (dropdown, optional, filled from mockProducts) -->
            <div class="form-field-group">
              <label for="enquiry-product" class="field-label">Product Interested In <span class="optional-tag">(Optional)</span></label>
              <select id="enquiry-product" name="product" class="field-select">
                <option value="">-- Select Product (Optional) --</option>
                ${productOptions}
              </select>
              <span class="field-error-message" id="error-product" role="alert" aria-live="polite"></span>
            </div>

            <!-- Field 6: Location (dropdown, required: Pondicherry, Villupuram, Cuddalore, Other) -->
            <div class="form-field-group">
              <label for="enquiry-location" class="field-label">Location <span class="req">*</span></label>
              <select id="enquiry-location" name="location" class="field-select" required>
                <option value="">-- Select Your Location --</option>
                ${locationOptions}
              </select>
              <span class="field-error-message" id="error-location" role="alert" aria-live="polite"></span>
            </div>

            <!-- Conditional extra field if Location is "Other" -->
            <div class="form-field-group" id="other-location-wrap" style="display: none;">
              <label for="enquiry-other-location" class="field-label">Specify Location <span class="req">*</span></label>
              <input 
                type="text" 
                id="enquiry-other-location" 
                name="otherLocation" 
                class="field-input" 
                placeholder="Enter city / town / area"
              />
              <span class="field-error-message" id="error-other-location" role="alert" aria-live="polite"></span>
            </div>

            <!-- Field 7: Message (textarea, optional, max 500 chars with live counter) -->
            <div class="form-field-group">
              <div class="label-row">
                <label for="enquiry-message" class="field-label">Message <span class="optional-tag">(Optional)</span></label>
                <span class="counter-text" id="message-char-counter">0 / 500</span>
              </div>
              <textarea 
                id="enquiry-message" 
                name="message" 
                class="field-textarea" 
                rows="3" 
                maxlength="500" 
                placeholder="Tell us any specific requirements or cooling needs..."
              ></textarea>
              <span class="field-error-message" id="error-message" role="alert" aria-live="polite"></span>
            </div>

            <!-- Submit Button & Loading State -->
            <div class="form-submit-row">
              <button type="submit" class="btn btn-submit-enquiry" id="enquiry-submit-button">
                <span class="submit-text">Submit Enquiry</span>
                <span class="submit-loader" hidden>Submitting...</span>
              </button>
            </div>
          </form>

          <!-- Success State View -->
          <div id="enquiry-success-view" class="success-feedback-box" hidden>
            <div class="success-badge-icon">
              <svg viewBox="0 0 48 48" width="56" height="56" fill="none">
                <circle cx="24" cy="24" r="23" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
                <path d="M14 24l7 7 14-14" stroke="#16a34a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="success-heading">Thank you!</h3>
            <p class="success-submessage">Our team will contact you shortly.</p>
            <button type="button" class="btn btn-primary" id="success-done-btn">Done</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalWrapper);
  }

  // Initialize Layout once DOM is ready or immediately if containers already exist
  function initLayout() {
    injectHeader();
    injectFooter();
    injectFloatingWhatsApp();
    injectEnquiryModal();
    window.dispatchEvent(new CustomEvent('layoutReady'));
  }

  if (document.getElementById('site-header')) {
    initLayout();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }

})();
