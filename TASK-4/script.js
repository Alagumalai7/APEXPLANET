// Sample product data
const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, category: "electronics", rating: 4.5, image: "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/b/l/black-01-solo4.jpg.large.2x_1.png" },
    { id: 2, name: "Smartphone", price: 699.99, category: "electronics", rating: 4.8, image: "https://idestiny.in/wp-content/uploads/2024/10/iPhone_15_Pink_PDP_Image_Position-1__WWEN.jpg" },
    { id: 3, name: "Cotton T-Shirt", price: 19.99, category: "clothing", rating: 4.2, image: "https://skinyoga.in/cdn/shop/files/Design-_14-980754.webp?v=1713584213" },
    { id: 4, name: "Coffee Maker", price: 49.99, category: "home", rating: 4.3, image: "https://images.philips.com/is/image/philipsconsumer/vrs_a6f229ac53eb2ad8dcf9e281050310d76783fec6?wid=700&hei=700&$pnglarge$" },
    { id: 5, name: "Fantasy Novel", price: 14.99, category: "books", rating: 4.7, image: "https://m.media-amazon.com/images/I/91jqg51kxVL._UF1000,1000_QL80_.jpg" },
    { id: 6, name: "Running Shoes", price: 89.99, category: "sports", rating: 4.6, image: "https://assets.ajio.com/medias/sys_master/root/20250217/NYqb/67b35d9f2960820c498c0082/-473Wx593H-701224492-grey-MODEL.jpg" },
    { id: 7, name: "Bluetooth Speaker", price: 79.99, category: "electronics", rating: 4.4, image: "https://mobilla.in/cdn/shop/collections/Mrock_101-1_533x.jpg?v=1702109941" },
    { id: 8, name: "Denim Jeans", price: 59.99, category: "clothing", rating: 4.1, image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1725966879-mango-wide-leg-jeans-66e02a10419f1.jpg?crop=1.00xw:0.895xh;0,0.0887xh&resize=980:*" },
    { id: 9, name: "Air Fryer", price: 129.99, category: "home", rating: 4.9, image: "https://assets.bonappetit.com/photos/6667291c1414ed4d7791c09c/1:1/w_2700,h_2700,c_limit/BA_Ninja-Air-Fryer-XL-review.jpg" },
    { id: 10, name: "Yoga Mat", price: 29.99, category: "sports", rating: 4.0, image: "https://assetscdn1.paytm.com/images/catalog/product/S/SP/SPOSTRAUSS-NBR-KHEL193268E2FF5019/1612004222297_17.jpg" },
    { id: 11, name: "Cookbook", price: 24.99, category: "books", rating: 4.3, image: "https://www.greenpan.us/cdn/shop/products/NC_CC007381-001-07-1200x1200-bd93c0f.jpg?v=1697557184" },
    { id: 12, name: "Smart Watch", price: 199.99, category: "electronics", rating: 4.7, image: "https://m.media-amazon.com/images/I/61pIzNaNRWL._AC_UF1000,1000_QL80_.jpg" }
];

// DOM elements
const productsContainer = document.getElementById('products-container');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const priceRange = document.querySelector('.price-range');
const currentPrice = document.getElementById('current-price');
const sortSelect = document.getElementById('sort-by');

// Initialize the page
function init() {
    displayProducts(products);
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Category filter
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Price filter
    priceRange.addEventListener('input', function() {
        currentPrice.textContent = this.value;
        filterProducts();
    });

    // Sort
    sortSelect.addEventListener('change', filterProducts);
}

// Filter and sort products
function filterProducts() {
    // Get selected categories
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Get max price
    const maxPrice = parseFloat(priceRange.value);

    // Filter products
    let filteredProducts = products.filter(product => {
        return selectedCategories.includes(product.category) && product.price <= maxPrice;
    });

    // Sort products
    const sortValue = sortSelect.value;
    filteredProducts = sortProducts(filteredProducts, sortValue);

    // Display filtered products
    displayProducts(filteredProducts);
}

// Sort products based on selected option
function sortProducts(products, sortValue) {
    const [key, order] = sortValue.split('-');
    
    return [...products].sort((a, b) => {
        let valueA, valueB;
        
        if (key === 'rating' || key === 'price') {
            valueA = a[key];
            valueB = b[key];
        } else if (key === 'name') {
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
        }
        
        if (order === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
}

// Display products in the grid
function displayProducts(productsToDisplay) {
    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-results">
                <h3>No products match your filters</h3>
                <p>Try adjusting your filters to see more products</p>
            </div>
        `;
        return;
    }

    productsContainer.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>${product.rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', init);