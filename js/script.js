/**
 * Main JavaScript file for Avicave Recruitment Agency website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect - add shadow and reduce padding when scrolling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    
    // Only initialize if testimonial elements exist
    if (testimonialSlider && testimonialDots.length > 0) {
        // Get the first testimonial item
        let firstTestimonial = document.querySelector('.testimonial-item');
        
        if (firstTestimonial) {
            // Create additional testimonials if they don't exist
            // Create second testimonial
            const secondTestimonial = firstTestimonial.cloneNode(true);
            secondTestimonial.querySelector('.testimonial-quote').textContent = 
                '"Avicave consistently delivers top talent that aligns perfectly with our company culture. Their thorough understanding of our industry sets them apart."';
            secondTestimonial.querySelector('.testimonial-author h4').textContent = 'Sarah Johnson';
            secondTestimonial.querySelector('.testimonial-author p').textContent = 'HR Director, HealthPlus';
            secondTestimonial.style.display = 'none';
            
            // Create third testimonial
            const thirdTestimonial = firstTestimonial.cloneNode(true);
            thirdTestimonial.querySelector('.testimonial-quote').textContent = 
                '"Working with Avicave transformed our hiring strategy. Their industry insights and personalized approach helped us build a world-class team."';
            thirdTestimonial.querySelector('.testimonial-author h4').textContent = 'Michael Rodriguez';
            thirdTestimonial.querySelector('.testimonial-author p').textContent = 'CEO, FinanceGrowth';
            thirdTestimonial.style.display = 'none';
            
            // Insert new testimonials before the dots container
            const dotsContainer = document.querySelector('.testimonial-dots');
            testimonialSlider.insertBefore(secondTestimonial, dotsContainer);
            testimonialSlider.insertBefore(thirdTestimonial, dotsContainer);
            
            // Get all testimonial items after adding the new ones
            const testimonialItems = document.querySelectorAll('.testimonial-item');
            let currentTestimonial = 0;
            let testimonialInterval;
            
            // Function to show a specific testimonial
            function showTestimonial(index) {
                // Hide all testimonials
                testimonialItems.forEach(item => {
                    item.style.display = 'none';
                });
                
                // Remove active class from all dots
                testimonialDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Show the selected testimonial and activate its dot
                testimonialItems[index].style.display = 'block';
                testimonialDots[index].classList.add('active');
                currentTestimonial = index;
            }
            
            // Add click event for testimonial navigation dots
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showTestimonial(index);
                    clearInterval(testimonialInterval); // Reset interval when manually clicked
                    startTestimonialRotation();
                });
            });
            
            // Function to start automatic testimonial rotation
            function startTestimonialRotation() {
                testimonialInterval = setInterval(function() {
                    let nextTestimonial = currentTestimonial + 1;
                    if (nextTestimonial >= testimonialItems.length) {
                        nextTestimonial = 0;
                    }
                    showTestimonial(nextTestimonial);
                }, 5000); // Change testimonial every 5 seconds
            }
            
            // Initialize the testimonial slider
            showTestimonial(0);
            startTestimonialRotation();
        }
    }


    // Client Carousel Functionality
    const track = document.querySelector('.carousel-track');
    const logos = document.querySelectorAll('.client-logo');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    
    if (!track || !logos.length || !prevButton || !nextButton) return;
    
    // Clone logos for infinite scroll effect
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Set initial position
    let position = 0;
    const logoWidth = logos[0].offsetWidth + parseInt(getComputedStyle(logos[0]).marginLeft) * 2;
    const visibleLogos = Math.floor(track.parentElement.offsetWidth / logoWidth);
    const maxPosition = logos.length * logoWidth;
    
    // Auto scroll functionality
    let isAutoScrolling = true;
    let autoScrollInterval;
    
    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            if (isAutoScrolling) moveNext();
        }, 3000);
    }
    
    function moveNext() {
        position -= logoWidth;
        if (Math.abs(position) >= maxPosition) {
            // Jump back to start
            position = 0;
            track.style.transition = 'none';
            track.style.transform = `translateX(${position}px)`;
            // Force reflow
            track.offsetHeight;
            track.style.transition = 'transform 0.5s ease';
        } else {
            track.style.transform = `translateX(${position}px)`;
        }
    }
    
    function movePrev() {
        position += logoWidth;
        if (position > 0) {
            // Jump to end
            position = -maxPosition + logoWidth;
            track.style.transition = 'none';
            track.style.transform = `translateX(${position}px)`;
            // Force reflow
            track.offsetHeight;
            track.style.transition = 'transform 0.5s ease';
        } else {
            track.style.transform = `translateX(${position}px)`;
        }
    }
    
    // Event listeners
    nextButton.addEventListener('click', () => {
        isAutoScrolling = false;
        moveNext();
        setTimeout(() => { isAutoScrolling = true; }, 5000);
    });
    
    prevButton.addEventListener('click', () => {
        isAutoScrolling = false;
        movePrev();
        setTimeout(() => { isAutoScrolling = true; }, 5000);
    });
    
    // Pause auto-scroll on hover
    track.parentElement.addEventListener('mouseenter', () => {
        isAutoScrolling = false;
    });
    
    track.parentElement.addEventListener('mouseleave', () => {
        isAutoScrolling = true;
    });
    
    // Start auto-scroll
    startAutoScroll();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newLogoWidth = logos[0].offsetWidth + parseInt(getComputedStyle(logos[0]).marginLeft) * 2;
        if (newLogoWidth !== logoWidth) {
            // Reset position if logo width changes
            position = 0;
            track.style.transform = `translateX(${position}px)`;
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling with basic validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formInputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
                
                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = 'red';
                    }
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                // For now, just show a success message
                const formElements = contactForm.elements;
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                // Disable form and change button text
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = true;
                }
                submitButton.textContent = 'Sending...';
                
                // Simulate form submission (remove in production)
                setTimeout(function() {
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.backgroundColor = '#c4a747';
                    successMessage.style.color = '#fff';
                    successMessage.style.padding = '1rem';
                    successMessage.style.marginTop = '1rem';
                    successMessage.style.textAlign = 'center';
                    successMessage.textContent = 'Thank you for your message. We will get back to you soon!';
                    
                    // Add message after form
                    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Re-enable form
                    for (let i = 0; i < formElements.length; i++) {
                        formElements[i].disabled = false;
                    }
                    submitButton.textContent = originalText;
                    
                    // Remove success message after a few seconds
                    setTimeout(function() {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s ease';
                        setTimeout(function() {
                            successMessage.remove();
                        }, 500);
                    }, 5000);
                }, 1500);
            }
        });
    }
});