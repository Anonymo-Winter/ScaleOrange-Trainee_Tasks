const slides = document.querySelectorAll(".slide");
const left = document.querySelector(".left");
left.style.backgroundColor = "grey";
left.style.cursor = "not-allowed";
const right = document.querySelector(".right");
let index = 0;
let slideInterval;

slides.forEach((slide, i) => {
    slide.style.left = `${i * 100}%`;
});


const prevSlide = () => {
    if(left.style.cursor == "not-allowed")
    {
        return;
    }
    clearInterval(slideInterval);
    index = (index - 1 + slides.length) % slides.length; 
    updateSlide();
    startSlideShow();
};

// Move to the next slide
const nextSlide = () => {
    clearInterval(slideInterval);
    index = (index + 1) % slides.length;
    updateSlide();
    startSlideShow();
};

const updateSlide = () => {
    slides.forEach(slide => {
        slide.style.transform = `translateX(-${index * 100}%)`;
    });
    console.log(index);
    if (index === 0) {
        left.style.backgroundColor = "grey";
        left.style.cursor = "not-allowed";
        right.style.backgroundColor = "";
    } else if(index === slides.length-1){
        right.style.backgroundColor = "grey";
        right.style.cursor = "not-allowed";
        left.style.backgroundColor = "";
    }else {
        left.style.backgroundColor = "";
        left.style.cursor = "pointer";
        right.style.cursor = "pointer";
        right.style.backgroundColor = "";
    }
};


const startSlideShow = () => {
    slideInterval = setInterval(nextSlide, 3000);
};

startSlideShow();