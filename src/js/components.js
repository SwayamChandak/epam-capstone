// Product Card Component
class ProductCard {
    constructor(product) {
        this.product = product;
    }
    
    render() {
        return `
            <div class="product-card card">
                <img src="${this.product.image}" alt="${this.product.name}" class="product-image">
                <div class="product-info">
                    <h3>${this.product.name}</h3>
                    <div class="rating">
                        ${this.renderRating(this.product.rating)}
                    </div>
                    <div class="price">
                        ${this.renderPrice(this.product.price, this.product.oldPrice)}
                    </div>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
    }
    
    renderRating(rating) {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    }
    
    renderPrice(price, oldPrice) {
        return oldPrice ? 
            `<span class="price-old">$${oldPrice}</span> <span class="price">$${price}</span>` :
            `<span class="price">$${price}</span>`;
    }
}

// Category Card Component
class CategoryCard {
    constructor(category) {
        this.category = category;
    }
    
    render() {
        return `
            <div class="category-card">
                <div class="icon">${this.category.icon}</div>
                <h3>${this.category.name}</h3>
                <p>${this.category.productCount} Products</p>
            </div>
        `;
    }
}

// Load Products from API/JSON
async function loadProducts() {
    try {
        // TODO: Replace with actual API call
        const products = [
            {
                name: 'Sample Product',
                image: 'placeholder.jpg',
                rating: 4,
                price: 99.99,
                oldPrice: 129.99
            }
            // Add more sample products
        ];
        
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = products
                .map(product => new ProductCard(product).render())
                .join('');
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load Categories
async function loadCategories() {
    try {
        // TODO: Replace with actual API call
        const categories = [
            {
                name: 'Headphones',
                icon: '🎧',
                productCount: 3
            }
            // Add more sample categories
        ];
        
        const categoryGrid = document.querySelector('.category-grid');
        if (categoryGrid) {
            categoryGrid.innerHTML = categories
                .map(category => new CategoryCard(category).render())
                .join('');
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}