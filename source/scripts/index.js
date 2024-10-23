// открытие и закрытие меню

const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.onclick = function () {
  navMain.classList.toggle('main-nav--opened');
};

//слайдер

const slider = document.querySelector('.slider__list');
const slides = Array.from(slider.querySelectorAll('li'));
const prevButton = document.querySelector('.slider-button-prev');
const nextButton = document.querySelector('.slider-button-next');
const paginations = document.querySelector('.slider-pagination');
const paginationButton = Array.from(paginations.querySelectorAll('.slider-pagination__button'));
const slideCount = slides.length;
let slideIndex = 0;

const updateSlider = () => {
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  slides[slideIndex].style.display = 'block';
};

paginationButton.forEach((button, index) => {
  button.addEventListener('click', () => {
    slideIndex = index;
    updateSlider();
    for (let i = 0; i < paginationButton.length; i++) {
      if (i === slideIndex) {
        paginationButton[i].classList.add('slider-pagination__button--current');
      } else {
        paginationButton[i].classList.remove('slider-pagination__button--current');
      }
    }
  });
});

prevButton.addEventListener('click', () => {
  if (slideIndex > 0) {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  } else {
    prevButton.disabled = true;
    nextButton.disabled = false;
  }
  updateSlider();
  prevButton.disabled = false;
});

nextButton.addEventListener('click', () => {
  if (slideIndex < slideCount - 1) {
    slideIndex = (slideIndex + 1) % slideCount;
  } else {
    nextButton.disabled = true;
    prevButton.disabled = false;
  }
  updateSlider();
  nextButton.disabled = false;
});

window.addEventListener('load', () => {
  updateSlider();
});

// Scroll - RangeScale

const rangeFieldMin = document.querySelector('.range__field--min');
const rangeScale = document.querySelector('.range__slider');
const rangeFieldMax = document.querySelector('.range__field--max');

noUiSlider.create(rangeScale, {
  start: [0, 900],
  connect: true,
  range: {
    'min': 0,
    'max': 1000
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
  cssPrefix: 'noui-', // defaults to 'noUi-',
});

rangeScale.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  if (handle) {
    rangeFieldMax.value = value;
  } else {
    rangeFieldMin.value = value;
  }
});

rangeFieldMin.addEventListener('change', function () {
  rangeScale.noUiSlider.set([this.value, null]);
});

rangeFieldMax.addEventListener('change', function () {
  rangeScale.noUiSlider.set([null, this.value]);
});

//пагинация

const paginationsList = document.querySelector('.pagination-list');
const paginationItem = Array.from(paginationsList.querySelectorAll('.pagination-list__link'));

paginationsList.addEventListener('click', () => {
  const target = event.target;

  // Проверяем тот ли это элемент который нам нужен
  if (target.classList.contains('pagination-list__link')) {
    for (let i = 0; i < paginationItem.length; i++) {

      // Убираем у других
      paginationItem[i].classList.remove('pagination-list__link--current');

      if (target === paginationItem[paginationItem.length - 2]) {
        paginationItem[paginationItem.length - 1].classList.add('pagination-list__link--disabled');
      } else {
        paginationItem[paginationItem.length - 1].classList.remove('pagination-list__link--disabled');
      }
      if (target === paginationItem[1]) {
        paginationItem[0].classList.add('pagination-list__link--disabled');
      } else {
        paginationItem[0].classList.remove('pagination-list__link--disabled');
      }
    }
    // Добавляем тому на который нажали
    target.classList.add('pagination-list__link--current');
  }
});
