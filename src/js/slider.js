class Slider {
    constructor(element, options = {}) {
        this.slider = element;
        this.slides = Array.from(this.slider.querySelectorAll('.slide'));
        this.controls = this.slider.querySelector('.slider-controls');
        this.currentIndex = 0;
        this.options = {
            autoplay: options.autoplay || true,
            interval: options.interval || 5000,
            ...options
        };
        
        this.init();
    }
    
    init() {
        // Add event listeners to controls
        if (this.controls) {
            const prevBtn = this.controls.querySelector('.prev');
            const nextBtn = this.controls.querySelector('.next');
            
            prevBtn?.addEventListener('click', () => this.prev());
            nextBtn?.addEventListener('click', () => this.next());
        }
        
        // Start autoplay if enabled
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        
        // Add touch support
        this.addTouchSupport();
    }
    
    goTo(index) {
        // Remove active class from current slide
        this.slides[this.currentIndex].classList.remove('active');
        
        // Update index
        this.currentIndex = index;
        
        // Handle wraparound
        if (this.currentIndex >= this.slides.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.slides.length - 1;
        }
        
        // Add active class to new slide
        this.slides[this.currentIndex].classList.add('active');
    }
    
    next() {
        this.goTo(this.currentIndex + 1);
    }
    
    prev() {
        this.goTo(this.currentIndex - 1);
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.options.interval);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
    
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoplay();
        }, false);
        
        this.slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        }, false);
        
        this.slider.addEventListener('touchend', () => {
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            if (this.options.autoplay) {
                this.startAutoplay();
            }
        }, false);
    }
}

// Initialize slider when DOM is loaded
function initializeSlider() {
    const sliderElement = document.querySelector('.hero-slider');
    if (sliderElement) {
        const slider = new Slider(sliderElement, {
            autoplay: true,
            interval: 5000
        });
    }
}