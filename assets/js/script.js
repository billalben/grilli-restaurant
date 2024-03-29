"use strict";

// ?=== Preloader
const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Add event listener on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (const item of elements) item.addEventListener(eventType, callback);
};

// ?=== Navbar
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

addEventOnElements(navbarLinks, "click", function () {
  navbarLinks.forEach((link) => {
    link.classList.remove("active");
  });
  this.classList.add("active");

  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});

// ?=== Header & back btn top
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  header.classList[isScrollBottom ? "add" : "remove"]("hide");

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 60) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// ? === Hero Slider
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

const heroSliderItemsLength = heroSliderItems.length - 1;

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItemsLength) currentSlidePos = 0;
  else currentSlidePos++;

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) currentSlidePos = heroSliderItemsLength;
  else currentSlidePos--;

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto Slide
let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(() => {
    slideNext();
  }, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => {
  clearInterval(autoSlideInterval);
});

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

// ? Parallax Effect
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

window.addEventListener("mousemove", function (event) {
  const baseX = ((event.clientX / window.innerWidth) * 10 - 5) * -1;
  const baseY = ((event.clientY / window.innerWidth) * 10 - 5) * -1;

  parallaxItems.forEach((item) => {
    const parallaxSpeed = Number(item.dataset.parallaxSpeed);
    const x = baseX * parallaxSpeed;
    const y = baseY * parallaxSpeed;

    item.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
});

// dynamic year copyright
document.querySelector(".current-yr-cp").textContent = new Date().getFullYear();
