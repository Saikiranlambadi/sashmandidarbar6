document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = this.elements[0].value;
            const email = this.elements[1].value;
            const phone = this.elements[2].value;
            const date = this.elements[3].value;
            const time = this.elements[4].value;
            const requests = this.elements[5].value;

            const messageText = `Reservation on ${date} at ${time}. Special requests: ${requests}`;
            const data = { name, email, phone, message: messageText };
            console.log('Reservation Details:', data);

            // Use local node server if running on Live Server (port 5500), otherwise use Netlify functions
            const isLocalLiveServer = window.location.port === '5500' || window.location.port === '5501';
            const apiUrl = isLocalLiveServer ? 'http://localhost:5000/api/submit' : '/.netlify/functions/submit';

            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        alert('Thank you for your reservation! We will contact you shortly to confirm.');
                        reservationForm.reset();
                    } else {
                        alert('There was an error submitting your reservation. Please try again later.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting reservation:', error);
                    alert('There was an error connecting to the server. Please try again later.');
                });
        });
    }

    // Mobile menu placeholder
    function setupMobileMenu() {
        console.log('Mobile menu setup would go here');
    }
    setupMobileMenu();

    // Optional gallery controls
    const galleryTrack = document.querySelector('.gallery-track');
    if (galleryTrack) {
        let isPaused = false;
        let startX = 0;
        let scrollLeft = 0;

        galleryTrack.addEventListener('click', function () {
            isPaused = !isPaused;
            galleryTrack.style.animationPlayState = isPaused ? 'paused' : 'running';
        });

        galleryTrack.addEventListener('touchstart', function (e) {
            startX = e.touches[0].pageX - galleryTrack.offsetLeft;
            scrollLeft = galleryTrack.scrollLeft;
            galleryTrack.style.animationPlayState = 'paused';
        });

        galleryTrack.addEventListener('touchmove', function (e) {
            if (!startX) return;
            const x = e.touches[0].pageX - galleryTrack.offsetLeft;
            const walk = (x - startX) * 2;
            galleryTrack.scrollLeft = scrollLeft - walk;
        });

        galleryTrack.addEventListener('touchend', function () {
            startX = 0;
            galleryTrack.style.animationPlayState = 'running';
        });
    }

    // ✅ Continuous Slideshow - FIXED VERSION
    const slideshowContainer = document.querySelector('.slideshow-container');

    // Check if slideshow container exists
    if (slideshowContainer) {
        // Array of image paths (replace with your actual image paths)
        const images = [
            "IMG_20250228_111016.jPg",
            "IMG_20250227_212527.jpg",
            "IMG_9968.jpg",
            "design.jpeg"
        ];

        let currentIndex = 0;
        let slideInterval;

        // Clear any existing content in the container
        slideshowContainer.innerHTML = '';

        // Create image elements
        images.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Restaurant interior ${index + 1}`;
            img.classList.add('slide');
            if (index === 0) img.classList.add('active');

            // Optional: Add error handling for missing images
            img.onerror = function () {
                console.error(`Failed to load image: ${imgSrc}`);
                this.style.display = 'none';
            };

            img.onload = function () {
                console.log(`Successfully loaded image: ${imgSrc}`);
            };

            slideshowContainer.appendChild(img);
        });

        // Function to change slides
        function changeSlide() {
            const slides = document.querySelectorAll('.slide');
            if (slides.length === 0) return;

            // Remove active class from current slide
            slides[currentIndex].classList.remove('active');

            // Increment index or reset to 0
            currentIndex = (currentIndex + 1) % slides.length;

            // Add active class to next slide
            slides[currentIndex].classList.add('active');
        }

        // Start the slideshow
        function startSlideshow() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            slideInterval = setInterval(changeSlide, 3000);
        }

        startSlideshow();

        // Optional: Pause on hover
        slideshowContainer.addEventListener('mouseenter', function () {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        });

        slideshowContainer.addEventListener('mouseleave', function () {
            if (!slideInterval) {
                startSlideshow();
            }
        });
    } else {
        console.warn('Slideshow container not found. Make sure you have an element with class "slideshow-container" in your HTML.');
    }
});

// ===== Modal Functionality =====
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("menuModal");
    const openBtn = document.getElementById("menuBtn");
    const closeBtn = document.querySelector(".close");

    // Check if modal elements exist
    if (modal && openBtn && closeBtn) {
        // Open modal when button is clicked
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "block";
        });

        // Close modal when 'X' is clicked
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close modal when clicking outside image
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    } else {
        console.warn('Modal elements not found. Make sure you have elements with IDs: "menuModal", "menuBtn" and class "close"');
    }
});