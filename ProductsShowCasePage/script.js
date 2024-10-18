const slides = document.querySelectorAll(".slide");
var index = 0
slides.forEach((slide,index)=>{
    slide.style.left = `${index*100}%`;
})

const prevSlide = ()=>{
    index = (index-1)%slides.length;
    slideImage();
}

const nextSlide = ()=>{
    index = (index+1)%slides.length;
    slideImage();
}

const slideImage = ()=>{
    slides.forEach((slide)=>{
        slide.style.transform = `translateX(-${index*100}%)`
    })
}