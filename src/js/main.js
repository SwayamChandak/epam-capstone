// DOM Elements
const header = document.querySelector('.header');
const searchBar = document.querySelector('.search-bar input');
const tabs = document.querySelectorAll('.tab');
const subscribeForm = document.querySelector('.subscribe-form');

// Scroll Handler
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Search Handler
searchBar.addEventListener('input', debounce((e) => {
    const searchTerm = e.target.value.toLowerCase();
    // TODO: Implement search functionality
}, 300));

// Tab Handler
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // TODO: Implement tab content switching
    });
});

// Form Handler
subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        // TODO: Implement form submission
        showNotification('Successfully subscribed!', 'success');
    } else {
        showNotification('Please enter a valid email', 'error');
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeSlider();
    loadProducts();
    loadCategories();
});