// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Consultation Modal
    const modal = document.getElementById('consultationModal');
    const openModalBtn = document.getElementById('openConsultationModal');
    const closeModalBtn = document.getElementById('closeModal');
    const consultationForm = document.getElementById('consultationForm');

    if (openModalBtn && modal && closeModalBtn) {
        openModalBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });

        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your consultation request. We will contact you soon!');
            modal.style.display = 'none';
        });
    }

    // Client Carousel
    const carousel = document.querySelector('.client-carousel');
    const itemWidth = 200;
    let currentPosition = 0;

    // Clone the slides for infinite effect
    function setupInfiniteCarousel() {
        const originalSlides = Array.from(carousel.children);
        
        // Clone slides and append to carousel twice
        for (let i = 0; i < 2; i++) {
            originalSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                carousel.appendChild(clone);
            });
        }
    }

    function moveCarousel() {
        currentPosition -= 1; // Move 1px at a time for smoother animation
        carousel.style.transform = `translateX(${currentPosition}px)`;

        // Reset position when reaching the end of original slides
        const firstSetWidth = (carousel.children.length / 2) * itemWidth;
        if (-currentPosition >= firstSetWidth) {
            currentPosition = 0;
            carousel.style.transform = `translateX(${currentPosition}px)`;
        }
    }

    // Initialize infinite carousel
    setupInfiniteCarousel();
    
    // Start the automatic movement
    setInterval(moveCarousel, 20); // Adjust timing for smooth scrolling

    // Optional: Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(moveCarousel, 20);
    });
});

    
