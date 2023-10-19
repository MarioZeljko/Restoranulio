'use strict';

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

//Modal Window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelector('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

//Smooth Scroll

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Hover animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const syblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    syblings.forEach(s => {
      if (link !== s) {
        s.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Nav

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

//Tabbed Component

const tabs = document.querySelectorAll('.about__tab');
const tabContainer = document.querySelector('.about__tab-container');
const tabContent = document.querySelectorAll('.about__content');

tabContainer.addEventListener('click', function (e) {
  /* e.preventDefault(); */

  const clicked = e.target.closest('.about__tab');

  if (!clicked) return;

  // Remove active classes

  tabs.forEach(t => {
    t.classList.remove('about__tab--active');
  });
  tabContent.forEach(c => {
    c.classList.remove('about__content--active');
  });

  //Add active class

  clicked.classList.add('about__tab--active');

  document
    .querySelector(`.about__content--${clicked.dataset.tab}`)
    .classList.add('about__content--active');
});

//Slider

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `TranslateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else currSlide++;

  goToSlide(currSlide);
  activateDot(currSlide);
};

btnRight.addEventListener('click', nextSlide);

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide;
  } else currSlide--;

  goToSlide(currSlide);
  activateDot(currSlide);
};

btnLeft.addEventListener('click', prevSlide);

//Create && activate dots

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(d => {
    d.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateDot(currSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  }

  e.key === 'ArrowLeft' && prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

//Reveal Sections on Scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(s => {
  s.classList.add('section--hidden');
  sectionObserver.observe(s);
});
