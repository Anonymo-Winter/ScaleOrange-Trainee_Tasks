// Get references to DOM elements
const carousel = document.querySelector(".carousel");
const carouselItems = document.querySelectorAll(".carousel img");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

let index = 0;
let autoSlideInterval;

// Function to hide all slides and display the current one
const showSlide = (index) => {
    carouselItems.forEach((item) => item.style.display = "none"); // Hide all slides
    carouselItems[index].style.display = "block"; // Show the current slide
};

// Function to move to the next slide
const nextSlide = () => {
    index = (index + 1) % carouselItems.length; // Loop back to the start
    showSlide(index);
};

// Function to move to the previous slide
const prevSlide = () => {
    index = (index - 1 + carouselItems.length) % carouselItems.length; // Loop back to the end
    showSlide(index);
};

// Initialize the carousel with the first slide
showSlide(index);

// Set up the interval for automatic sliding
const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 2000);
};

// Stop the automatic sliding
const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

// Add event listeners for the left and right arrows
leftArrow.addEventListener("click", () => {
    stopAutoSlide(); // Stop the auto slide when clicked
    prevSlide();
    startAutoSlide(); // Restart the auto slide
});

rightArrow.addEventListener("click", () => {
    stopAutoSlide(); // Stop the auto slide when clicked
    nextSlide();
    startAutoSlide(); // Restart the auto slide
});

// Start auto-sliding on page load
startAutoSlide();

// --- Infinite Scroll Loop Logic ---

// Calculate the width of one slide (in case of horizontal scroll carousel)
const slideWidth = carouselItems[0].clientWidth;

// Add scroll event listener to create an infinite loop effect
carousel.addEventListener('scroll', () => {
    // When scrolling to the end (last cloned slide), reset to the first real slide
    if (carousel.scrollLeft >= (carousel.scrollWidth - slideWidth)) {
        carousel.scrollLeft = slideWidth;
    }

    // When scrolling to the beginning (first cloned slide), reset to the last real slide
    if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = carousel.scrollWidth - (2 * slideWidth);
    }
});

// Initial positioning to start at the first real slide
carousel.scrollLeft = slideWidth;
