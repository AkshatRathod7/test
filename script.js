// Smooth scroll to consultation section
function scrollToConsultation() {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
        consultationSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Video play function
function playVideo(placeholder) {
    const videoContainer = placeholder.parentElement;
    // Using a generic relevant business video ID for demonstration
    // In production, replace 'dQw4w9WgXcQ' with actual video ID
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';

    videoContainer.innerHTML = `<iframe src="${videoUrl}" allowfullscreen allow="autoplay; encrypted-media" style="border:0; width:100%; height:100%; position:absolute; top:0; left:0;"></iframe>`;
}

// Testimonial video play function
function playTestimonialVideo(placeholder) {
    const videoContainer = placeholder.parentElement;
    // Using a generic testimonial video ID for demonstration
    // In production, replace with actual testimonial video ID
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';

    videoContainer.innerHTML = `<iframe src="${videoUrl}" allowfullscreen allow="autoplay; encrypted-media" style="border:0; width:100%; height:100%; position:absolute; top:0; left:0;"></iframe>`;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // If it's a social proof section, animate numbers
            if (entry.target.classList.contains('social-proof')) {
                animateNumbers(entry.target);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Counter animation for numbers
function animateNumbers(section) {
    const numbers = section.querySelectorAll('.proof-number');
    numbers.forEach(num => {
        const target = parseInt(num.innerText.replace('+', ''));
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                num.innerText = target + '+';
                clearInterval(timer);
            } else {
                num.innerText = Math.floor(current) + '+';
            }
        }, 16);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Stagger animation for children of certain sections
    const staggerElements = document.querySelectorAll('.benefit-item, .proof-card, .detail-item, .testimonial-card');
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    });
});
