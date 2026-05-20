/*
 * S.A.L for Logistics Services Website
 * Copyright (c) 2025 Mohammed Sabry
 * Licensed under the MIT License.
 * See LICENSE file for details.
 */
/**
 * OneTrack Express - Main JavaScript
 * Optimized and organized for better maintainability
 * Bootstrap 5 + WOW.js Integration
 */

(function () {
  "use strict";

  // ========================================
  // CONFIGURATION & CONSTANTS
  // ========================================
  const CONFIG = {
    headerScrollThreshold: 50,
    wowOffset: 100,
    carouselFadeDelay: {
      title: 100,
      description: 300,
      button: 500,
    },
    serviceTabFadeDelay: 250,
    resizeDebounceDelay: 250,
    desktopBreakpoint: 1200,
    heroAnimationStagger: 200,
  };

  const SELECTORS = {
    header: "#header",
    heroCarousel: "#heroCarousel",
    galleryCarousel: "#galleryCarousel",
    mobileMenu: "#mobileMenu",
    backToTop: "#backToTop",
    slideCounterCurrent: ".slide-counter .current",
    slideCounterTotal: ".slide-counter .total",
    heroTitle: ".hero-title",
    heroDescription: ".hero-description",
    heroPrimaryBtn: ".hero-content .btn-primary-custom",
    galleryCounter: ".gallery-counter",
    serviceTabs: ".tab-btn",
    serviceIcon: ".service-icon",
    serviceTitle: ".service-title",
    serviceDesc: ".service-desc",
    serviceFeatures: ".service-features",
    serviceImg: "#serviceImg",
    serviceInfo: ".service-info",
    industryPills: ".pill-btn",
    parallaxElements: ".trust-glow-1, .trust-glow-2",
    featureCards: ".feature-card",
    partnersTrack: ".partners-track",
    forms: ".needs-validation",
    navDropdowns: ".navbar-nav .dropdown",
    anchorLinks: 'a[href^="#"]',
    animatableCards: ".feature-card, .team-card, .news-card",
    heroElements:
      ".hero-title, .hero-description, .hero-content .btn-primary-custom",
  };

  // Service tab data configuration
  const SERVICE_DATA = {
    air: {
      title: "Sea Freight",
      desc: "We, at Delma Logistics work with the primary objective of achieving customer satisfaction, and thus, we ensure that we not just offer expert services.",
      features: [
        "Fastest Delivery Times",
        "Dedicated Support",
        "Real-Time Tracking",
      ],
      image: 'assets/image/iStock-1165731864.jpg',
    },
    ocean: {
      title: "Air Freight",
      desc: "To help our clients with the best services with our real time tracking systems along with the backing of advanced technology.",
      features: [
        "Cost-Efficient Shipping",
        "Full Container Loads",
        "Global Port Coverage",
      ],
      image: "assets/image/plane-8508636_1920.jpg",
    },
    land: {
      title: "Land Transport",
      desc: "To always aid our clients with the perfect solutions for transporting your consignments with all the required specifications to any part of the world.",
      features: [
        "Local Distribution",
        "Temperature Control",
        "Safe Cargo Handling",
      ],
      image: "assets/image/company-img3.webp",
    },
    rail: {
      title: "Warehousing",
      desc: "We offer a broad array of cargo and fright services to all parts of the world, and make sure that our clients can access our services in the simplest manner.",
      features: [
        "Eco-Friendly Transport",
        "Bulk Cargo Support",
        "Reliable Scheduling",
      ],
      image: "assets/image/service-card-img1.webp",
    },
  };

  // Hero slide content data
  const HERO_SLIDES_DATA = {
    0: {
      title: "Seamless Sky <br /> Logistics Services",
      description:
        "We deliver fast, secure, and efficient logistics solutions tailored to meet modern global shipping demands.",
      buttonText: "Request A Quote",
    },
    1: {
      title: "Global Freight <br /> Solutions",
      description:
        "Connecting businesses worldwide through reliable air, sea, and land freight solutions with full operational control.",
      buttonText: "Request A Quote",
    },
    2: {
      title: "Your Trusted <br /> Cargo Partner",
      description:
        "Built on precision, transparency, and on-time delivery to support your business growth at every stage.",
      buttonText: "Request A Quote",
    },
    3: {
      title: "Smart Supply <br /> Chain Solutions",
      description:
        "Optimized logistics workflows powered by advanced tracking, smart routing, and professional cargo handling.",
      buttonText: "Request A Quote",
    },
  };

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  const Utils = {
    /**
     * Safely query a single element
     */
    qs: (selector, parent = document) => parent.querySelector(selector),

    /**
     * Safely query all elements
     */
    qsa: (selector, parent = document) =>
      Array.from(parent.querySelectorAll(selector)),

    /**
     * Set multiple styles on an element
     */
    setStyles: (element, styles) => {
      if (!element) return;
      Object.assign(element.style, styles);
    },

    /**
     * Debounce function for performance
     */
    debounce: (func, delay) => {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    },

    /**
     * Check if viewport is desktop size
     */
    isDesktop: () => window.innerWidth >= CONFIG.desktopBreakpoint,

    /**
     * Animate element fade in with transform
     */
    fadeIn: (element, delay = 0, transition = "all 0.6s ease") => {
      if (!element) return;
      setTimeout(() => {
        Utils.setStyles(element, {
          transition,
          opacity: "1",
          transform: "translateY(0)",
        });
      }, delay);
    },

    /**
     * Animate element fade out with transform
     */
    fadeOut: (element, transform = "translateY(30px)") => {
      if (!element) return;
      Utils.setStyles(element, {
        opacity: "0",
        transform,
      });
    },
  };

  // ========================================
  // HEADER MODULE
  // ========================================
  const HeaderModule = {
    init() {
      const header = Utils.qs(SELECTORS.header);
      if (!header) return;

      this.header = header;
      this.handleScroll();
      window.addEventListener("scroll", () => this.handleScroll());
    },

    handleScroll() {
      const scrolled = window.scrollY > CONFIG.headerScrollThreshold;
      this.header.classList.toggle("scrolled", scrolled);
    },
  };

  // ========================================
  // HERO CAROUSEL MODULE
  // ========================================
  const HeroCarouselModule = {
    init() {
      const carousel = Utils.qs(SELECTORS.heroCarousel);
      if (!carousel) return;

      this.carousel = carousel;
      this.initializeCounter();
      this.attachEventListeners();
    },

    initializeCounter() {
      const current = Utils.qs(SELECTORS.slideCounterCurrent);
      const total = Utils.qs(SELECTORS.slideCounterTotal);
      const totalSlides = Utils.qsa(".carousel-item", this.carousel).length;

      if (total) total.textContent = totalSlides;
    },

    attachEventListeners() {
      this.carousel.addEventListener("slid.bs.carousel", (e) =>
        this.updateCounter(e),
      );
      this.carousel.addEventListener("slide.bs.carousel", () =>
        this.fadeOutContent(),
      );
      this.carousel.addEventListener("slid.bs.carousel", (e) =>
        this.fadeInContent(e),
      );
    },

    updateCounter(event) {
      const current = Utils.qs(SELECTORS.slideCounterCurrent);
      if (current) current.textContent = event.to + 1;
    },

    fadeOutContent() {
      const title = Utils.qs(SELECTORS.heroTitle);
      const desc = Utils.qs(SELECTORS.heroDescription);
      const btn = Utils.qs(SELECTORS.heroPrimaryBtn);

      Utils.fadeOut(title);
      Utils.fadeOut(desc);
      Utils.fadeOut(btn);
    },

    fadeInContent(event) {
      const title = Utils.qs(SELECTORS.heroTitle);
      const desc = Utils.qs(SELECTORS.heroDescription);
      const btn = Utils.qs(SELECTORS.heroPrimaryBtn);

      const slideIndex = event.to;
      const slideData = HERO_SLIDES_DATA[slideIndex];

      if (slideData) {
        setTimeout(() => {
          if (title) title.innerHTML = slideData.title;
          if (desc) desc.textContent = slideData.description;
          if (btn) {
            const icon = btn.querySelector("i");
            btn.innerHTML = slideData.buttonText + " ";
            if (icon) {
              btn.appendChild(icon.cloneNode(true));
            } else {
              btn.innerHTML += '<i class="fa-solid fa-plus"></i>';
            }
          }
        }, 50);
      }

      Utils.fadeIn(title, CONFIG.carouselFadeDelay.title);
      Utils.fadeIn(desc, CONFIG.carouselFadeDelay.description);
      Utils.fadeIn(btn, CONFIG.carouselFadeDelay.button);
    },
  };

  // ========================================
  // GALLERY CAROUSEL MODULE
  // ========================================
  const GalleryCarouselModule = {
    init() {
      const carousel = Utils.qs(SELECTORS.galleryCarousel);
      if (!carousel) return;

      this.carousel = carousel;
      this.totalSlides = Utils.qsa(".carousel-item", carousel).length;
      this.attachEventListeners();
    },

    attachEventListeners() {
      this.carousel.addEventListener("slid.bs.carousel", (e) =>
        this.updateCounter(e),
      );
    },

    updateCounter(event) {
      const counter = Utils.qs(SELECTORS.galleryCounter);
      if (counter) {
        counter.textContent = `${event.to + 1} / ${this.totalSlides}`;
      }
    },
  };

  // ========================================
  // SERVICE TABS MODULE
  // ========================================
  const ServiceTabsModule = {
    init() {
      this.tabs = Utils.qsa(SELECTORS.serviceTabs);
      if (!this.tabs.length) return;

      this.attachEventListeners();
    },

    attachEventListeners() {
      this.tabs.forEach((tab) => {
        tab.addEventListener("click", () => this.handleTabClick(tab));
      });
    },

    handleTabClick(clickedTab) {
      // Update active state
      this.tabs.forEach((tab) => tab.classList.remove("active"));
      clickedTab.classList.add("active");

      const tabType = clickedTab.getAttribute("data-tab");
      const data = SERVICE_DATA[tabType];

      if (data) {
        this.updateServiceContent(data);
      }
    },

    updateServiceContent(data) {
      const elements = {
        icon: Utils.qs(SELECTORS.serviceIcon),
        title: Utils.qs(SELECTORS.serviceTitle),
        desc: Utils.qs(SELECTORS.serviceDesc),
        features: Utils.qs(SELECTORS.serviceFeatures),
        img: Utils.qs(SELECTORS.serviceImg),
        info: Utils.qs(SELECTORS.serviceInfo),
      };

      // Fade out
      Utils.setStyles(elements.info, {
        opacity: "0",
        transform: "translateX(-20px)",
      });
      Utils.setStyles(elements.img, {
        opacity: "0",
        transform: "scale(1.1)",
      });

      // Update content and fade in
      setTimeout(() => {
        if (elements.icon) {
          elements.icon.innerHTML = `<i class="bi ${data.icon}"></i>`;
        }
        if (elements.title) {
          elements.title.textContent = data.title;
        }
        if (elements.desc) {
          elements.desc.textContent = data.desc;
        }
        if (elements.features) {
          elements.features.innerHTML = data.features
            .map((f) => `<li><i class="bi bi-check2"></i> ${f}</li>`)
            .join("");
        }
        if (elements.img) {
          elements.img.src = data.image;
          elements.img.alt = `${data.title} Service`;
        }

        Utils.setStyles(elements.info, {
          transition: "all 0.5s ease",
          opacity: "1",
          transform: "translateX(0)",
        });
        Utils.setStyles(elements.img, {
          transition: "all 0.6s ease",
          opacity: "1",
          transform: "scale(1)",
        });
      }, CONFIG.serviceTabFadeDelay);
    },
  };

  // ========================================
  // NAVIGATION MODULE
  // ========================================
  const NavigationModule = {
    init() {
      this.initBackToTop();
      this.initMobileMenu();
      this.initDropdownHover();
      this.initSmoothScroll();
    },

    initBackToTop() {
      const btn = Utils.qs(SELECTORS.backToTop);
      if (!btn) return;

      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },

    initMobileMenu() {
      const menu = Utils.qs(SELECTORS.mobileMenu);
      if (!menu) return;

      const links = Utils.qsa("a:not([data-bs-toggle])", menu);
      links.forEach((link) => {
        link.addEventListener("click", () => {
          const offcanvas = bootstrap.Offcanvas.getInstance(menu);
          if (offcanvas) offcanvas.hide();
        });
      });
    },

    initDropdownHover() {
      const dropdowns = Utils.qsa(SELECTORS.navDropdowns);

      dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("mouseenter", function () {
          if (Utils.isDesktop()) {
            const menu = this.querySelector(".dropdown-menu");
            if (menu) menu.classList.add("show");
          }
        });

        dropdown.addEventListener("mouseleave", function () {
          if (Utils.isDesktop()) {
            const menu = this.querySelector(".dropdown-menu");
            if (menu) menu.classList.remove("show");
          }
        });
      });
    },

    initSmoothScroll() {
      const header = Utils.qs(SELECTORS.header);
      const links = Utils.qsa(SELECTORS.anchorLinks);

      links.forEach((link) => {
        link.addEventListener("click", function (e) {
          const targetId = this.getAttribute("href");

          if (targetId && targetId !== "#") {
            const target = Utils.qs(targetId);

            if (target) {
              e.preventDefault();
              const headerHeight = header ? header.offsetHeight : 0;
              const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

              window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            }
          }
        });
      });
    },
  };

  // ========================================
  // ANIMATIONS MODULE
  // ========================================
  const AnimationsModule = {
    init() {
      this.initWOW();
      this.initIndustryPills();
      this.initParallax();
      this.initFeatureCards();
      this.initIntersectionObserver();
    },

    initWOW() {
      if (typeof WOW !== "undefined") {
        new WOW({
          boxClass: "wow",
          animateClass: "animate__animated",
          offset: CONFIG.wowOffset,
          mobile: true,
          live: true,
          scrollContainer: null,
          resetAnimation: false,
        }).init();
      }
    },

    initIndustryPills() {
      const pills = Utils.qsa(SELECTORS.industryPills);

      pills.forEach((pill) => {
        pill.addEventListener("mouseenter", function () {
          this.style.transform = "scale(1.05)";
        });

        pill.addEventListener("mouseleave", function () {
          this.style.transform = "scale(1)";
        });
      });
    },

    initParallax() {
      const elements = Utils.qsa(SELECTORS.parallaxElements);

      window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        elements.forEach((el, index) => {
          const speed = index === 0 ? 0.1 : 0.05;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      });
    },

    initFeatureCards() {
      const cards = Utils.qsa(SELECTORS.featureCards);

      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
      });
    },

    initIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      }, options);

      Utils.qsa(SELECTORS.animatableCards).forEach((el) => {
        observer.observe(el);
      });
    },
  };

  // ========================================
  // PARTNERS MODULE
  // ========================================
  const PartnersModule = {
    init() {
      const track = Utils.qs(SELECTORS.partnersTrack);
      if (!track) return;

      track.addEventListener("mouseenter", function () {
        this.style.animationPlayState = "paused";
      });

      track.addEventListener("mouseleave", function () {
        this.style.animationPlayState = "running";
      });
    },
  };

  // ========================================
  // FORMS MODULE
  // ========================================
  const FormsModule = {
    init() {
      const forms = Utils.qsa(SELECTORS.forms);

      forms.forEach((form) => {
        form.addEventListener("submit", function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        });
      });
    },
  };

  // ========================================
  // WINDOW EVENTS MODULE
  // ========================================
  const WindowEventsModule = {
    init() {
      this.initLoadEvent();
      this.initResizeEvent();
    },

    initLoadEvent() {
      window.addEventListener("load", () => {
        document.body.classList.add("loaded");

        const heroElements = Utils.qsa(SELECTORS.heroElements);
        heroElements.forEach((el, index) => {
          setTimeout(() => {
            Utils.setStyles(el, {
              opacity: "1",
              transform: "translateY(0)",
            });
          }, index * CONFIG.heroAnimationStagger);
        });
      });
    },

    initResizeEvent() {
      const handleResize = Utils.debounce(() => {
        if (Utils.isDesktop()) {
          const menu = Utils.qs(SELECTORS.mobileMenu);
          if (menu) {
            const offcanvas = bootstrap.Offcanvas.getInstance(menu);
            if (offcanvas) offcanvas.hide();
          }
        }
      }, CONFIG.resizeDebounceDelay);

      window.addEventListener("resize", handleResize);
    },
  };

  // ========================================
  // APPLICATION INITIALIZATION
  // ========================================
  const App = {
    init() {
      // Initialize all modules
      HeaderModule.init();
      HeroCarouselModule.init();
      GalleryCarouselModule.init();
      ServiceTabsModule.init();
      NavigationModule.init();
      AnimationsModule.init();
      PartnersModule.init();
      FormsModule.init();
      WindowEventsModule.init();

      console.log("✅ OneTrack Express - All modules loaded successfully");
    },
  };

  // ========================================
  // DOM READY
  // ========================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => App.init());
  } else {
    App.init();
  }
})();

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "6030e51a-0611-43fa-9aa4-9fa534a5aa01");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});