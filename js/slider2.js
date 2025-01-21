//ეს სალიდი ატრიალებს დესკტოპზე ღილაკების მიხედვით დასერჩვას

const slider = document.getElementById('slider2');
    const items = document.querySelectorAll('.slider-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    const visibleItems = 6;
    const totalItems = items.length;
    const cloneCount = visibleItems;

    let currentIndex = cloneCount;

    // Clone elements at the start and end for circular effect
    for (let i = 0; i < cloneCount; i++) {
      const firstClone = items[i].cloneNode(true);
      const lastClone = items[items.length - 1 - i].cloneNode(true);
      slider.appendChild(firstClone);
      slider.insertBefore(lastClone, slider.firstChild);
    }

    const allItems = document.querySelectorAll('.slider-item');
    slider.style.transform = `translateX(-${(100 / visibleItems) * currentIndex}%)`;

    function updateSliderPosition() {
      slider.style.transition = 'transform 0.5s ease-in-out';
      slider.style.transform = `translateX(-${(100 / visibleItems) * currentIndex}%)`;
    }

    function slideNext() {
      currentIndex++;
      updateSliderPosition();
      if (currentIndex === totalItems + cloneCount) {
        setTimeout(() => {
          slider.style.transition = 'none';
          currentIndex = cloneCount;
          slider.style.transform = `translateX(-${(100 / visibleItems) * currentIndex}%)`;
        }, 500);
      }
    }

    function slidePrev() {
      currentIndex--;
      updateSliderPosition();
      if (currentIndex === 0) {
        setTimeout(() => {
          slider.style.transition = 'none';
          currentIndex = totalItems;
          slider.style.transform = `translateX(-${(100 / visibleItems) * currentIndex}%)`;
        }, 500);
      }
    }

    prevButton.addEventListener('click', () => {
      clearInterval(autoSlide);
      slidePrev();
      startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
      clearInterval(autoSlide);
      slideNext();
      startAutoSlide();
    });

    let autoSlide;

    function startAutoSlide() {
      autoSlide = setInterval(slideNext, 3000);
    }

    startAutoSlide();