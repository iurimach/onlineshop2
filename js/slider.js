async function loadSlider() {
    const sliderContainer = document.getElementById('slider');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentIndex = 0;
    let images = [];
  
    // Fetch slider images from slider.json
    try {
      const response = await fetch('json/slider.json');
      const data = await response.json();
      images = data.sliderImages;
    } catch (error) {
      console.error('Error loading slider images:', error);
      sliderContainer.innerHTML = '<p>Error loading slider images.</p>';
      return;
    }
  
    // Create image elements dynamically
    images.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.classList.add(index === 0 ? 'active' : 'hidden');
      sliderContainer.appendChild(img);
    });
  
    const imgElements = document.querySelectorAll('.slider-container img');
  
    // Function to change images
    function changeImage(nextIndex) {
      imgElements[currentIndex].classList.remove('active');
      imgElements[currentIndex].classList.add('hidden');
      imgElements[nextIndex].classList.remove('hidden');
      imgElements[nextIndex].classList.add('active');
      currentIndex = nextIndex;
    }
  
    // Auto-slide every 3 seconds
    let autoSlideInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      changeImage(nextIndex);
    }, 3000);
  
    // Event listeners for buttons
    prevButton.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      changeImage(prevIndex);
      resetAutoSlide();
    });
  
    nextButton.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % images.length;
      changeImage(nextIndex);
      resetAutoSlide();
    });
  
    // Reset the auto-slide interval
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        changeImage(nextIndex);
      }, 3000);
    }
  }
  
  loadSlider();
  