const slides = document.querySelectorAll(".slide");
const left = document.querySelector(".left");
if(left)
{
    left.style.backgroundColor = "grey";
    left.style.cursor = "not-allowed";
}
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

if(left && right)
{
    startSlideShow();
}

document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".product"); // This would be your product elements array
    const itemsPerPage = 8; // Number of items per page
    let currentPage = 1;
    const itemsContainer = document.querySelector(".main-product");
    const paginationLinks = document.querySelectorAll(".pagination .page");
    const prevButton = document.querySelector(".pagination .prev");
    const nextButton = document.querySelector(".pagination .next");

    // Calculate the total number of pages based on itemsPerPage
    const totalPages = Math.ceil(pages.length / itemsPerPage);

    // Function to load content based on the page number
    function loadPage(page) {
        currentPage = page;
        itemsContainer.innerHTML = ""; // Clear previous content
        
        // Calculate the start and end index for the items on the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, pages.length); // To prevent overflow

        // Append the items for the current page to the container
        for (let i = startIndex; i < endIndex; i++) {
            itemsContainer.appendChild(pages[i]);
        }

        updatePaginationUI(); // Update pagination button styles
    }

    // Update the UI: Set active class, disable prev/next if needed
    function updatePaginationUI() {
        paginationLinks.forEach(link => {
            link.classList.remove("active");
            if (parseInt(link.textContent) === currentPage) {
                link.classList.add("active");
            }
        });

        prevButton.classList.toggle("disabled", currentPage === 1);
        nextButton.classList.toggle("disabled", currentPage === totalPages);
    }

    // Event listener for page links
    paginationLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            loadPage(parseInt(link.textContent));
        });
    });

    // Event listeners for prev and next buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                loadPage(currentPage - 1);
            }
        });

        nextButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                loadPage(currentPage + 1);
            }
        });
    }

    // Load the first page initially
    loadPage(1);
});
