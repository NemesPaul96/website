// animations.js

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.observer = null;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
        
        // Add smooth scrolling to the entire page
        this.enableEnhancedSmoothScroll();
    }

    enableEnhancedSmoothScroll() {
        // Set CSS smooth scrolling as fallback
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Enhanced smooth scrolling for better cross-browser support
        this.setupEnhancedScroll();
    }

    setupEnhancedScroll() {
        // Only enhance if native smooth scroll isn't working well
        if (!this.isSmoothScrollWorking()) {
            this.enableManualSmoothScroll();
        }
    }

    isSmoothScrollWorking() {
        // Test if native smooth scrolling is supported and working
        return 'scrollBehavior' in document.documentElement.style;
    }

    enableManualSmoothScroll() {
        // Add smooth scroll to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });

        // Add keyboard smooth scrolling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const direction = e.key === 'ArrowDown' ? 1 : -1;
                this.scrollByDirection(direction);
            }
        });
    }

    scrollToElement(element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 50;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    scrollByDirection(direction) {
        const currentPosition = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const newPosition = currentPosition + (viewportHeight * 0.8 * direction);

        window.scrollTo({
            top: newPosition,
            behavior: 'smooth'
        });
    }

    setupAnimations() {
        this.cacheElements();
        this.createObserver();
        this.observeElements();
        
        // Initial check for elements already in view
        setTimeout(() => this.checkInitialView(), 100);
    }

    cacheElements() {
        // Select all elements with animate class
        this.animatedElements = document.querySelectorAll('.animate');
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Slightly increased threshold for better timing
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn(entry.target);
                }
            });
        }, options);
    }

    observeElements() {
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateIn(element) {
        // Add a small random delay for more natural staggered effect
        const randomDelay = Math.random() * 0.1;
        
        setTimeout(() => {
            element.classList.add('show');
            
            // Add special handling for scale animations
            if (element.classList.contains('animate-scale') || 
                element.classList.contains('animate-grow')) {
                this.handleScaleAnimation(element);
            }
            
            // Stop observing after animation
            this.observer.unobserve(element);
        }, randomDelay * 1000);
    }

    handleScaleAnimation(element) {
        // Add a subtle pulse effect after scaling
        setTimeout(() => {
            element.style.transform = 'scale(1.02)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }, 800);
    }

    checkInitialView() {
        this.animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInViewport) {
                this.animateIn(element);
            }
        });
    }
}

// Initialize animations when script loads
new ScrollAnimations();

// Additional utility function for manual triggering
window.triggerAnimation = function(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) {
        element.classList.add('show');
    }
};

// Re-initialize function for dynamic content
window.reinitAnimations = function() {
    new ScrollAnimations();
};
