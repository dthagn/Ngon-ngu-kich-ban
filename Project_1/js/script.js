// ==========================================================================
// STATE MANAGEMENT & INITIALIZATION
// ==========================================================================
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'default';
let cart = [];

// DOM Elements
const categoryListEl = document.getElementById('categoryList');
const productGridEl = document.getElementById('productGrid');
const noProductsMsg = document.getElementById('noProductsMessage');
const brandGridEl = document.getElementById('brandGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const cartBtn = document.getElementById('cartBtn');
const cartCountEl = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartBody = document.getElementById('cartBody');
const cartTotalPriceEl = document.getElementById('cartTotalPrice');

const productModal = document.getElementById('productModal');
const closeProductBtn = document.getElementById('closeProductBtn');
const productDetailBody = document.getElementById('productDetailBody');

// Format Currency Utility
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Initialize App
const initApp = () => {
    renderCategories();
    renderBrands();
    loadCart();
    updateProductView();
};

// ==========================================================================
// RENDERING FUNCTIONS
// ==========================================================================

// Render Sidebar Categories
const renderCategories = () => {
    categoryListEl.innerHTML = '';
    categories.forEach(cat => {
        const li = document.createElement('li');
        li.textContent = cat.name;
        li.dataset.id = cat.id;
        
        if (cat.id === currentCategory) {
            li.classList.add('active');
        }

        li.addEventListener('click', () => {
            // Update active styling
            document.querySelectorAll('.category-list li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            
            // Update state and re-render
            currentCategory = cat.id;
            updateProductView();
        });

        categoryListEl.appendChild(li);
    });
};

// Render Products Grid
const renderProducts = (productsToRender) => {
    productGridEl.innerHTML = '';

    if (productsToRender.length === 0) {
        noProductsMsg.style.display = 'block';
        return;
    }
    
    noProductsMsg.style.display = 'none';

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // Handle Old Price formatting
        const oldPriceHtml = product.oldPrice 
            ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` 
            : '';

        // Handle Tag
        const tagHtml = product.tag 
            ? `<span class="tag">${product.tag}</span>` 
            : '';

        card.innerHTML = `
            ${tagHtml}
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/120x180?text=No+Image'">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price-row">
                <span class="current-price">${formatCurrency(product.price)}</span>
                ${oldPriceHtml}
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
        `;

        // Event listener for opening details (if clicking image or title)
        card.querySelector('.product-image').addEventListener('click', () => openProductDetail(product));
        card.querySelector('.product-name').addEventListener('click', () => openProductDetail(product));
        
        // Event listener for add to cart
        card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening detail modal
            addToCart(product);
        });

        productGridEl.appendChild(card);
    });
};

// Render Brands
const renderBrands = () => {
    brandGridEl.innerHTML = '';
    brands.forEach(brand => {
        const img = document.createElement('img');
        img.src = brand.image;
        img.alt = brand.name;
        // Fallback for missing brand images
        img.onerror = function() { this.src = `https://placehold.co/100x40?text=${brand.name}`; };
        brandGridEl.appendChild(img);
    });
};

// ==========================================================================
// FILTERING & SORTING LOGIC
// ==========================================================================

const updateProductView = () => {
    // 1. Filter by Category
    let filtered = products;
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }

    // 3. Sort
    if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
};

// Event Listeners for Search and Sort
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    updateProductView();
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    updateProductView();
});

// ==========================================================================
// CART & LOCAL STORAGE LOGIC
// ==========================================================================

const saveCart = () => {
    localStorage.setItem('cosmeticCart', JSON.stringify(cart));
    updateCartUI();
};

const loadCart = () => {
    const saved = localStorage.getItem('cosmeticCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
    updateCartUI();
};

const addToCart = (product, quantity = 1) => {
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
};

const changeCartQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
        }
    }
};

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveCart();
};

const updateCartUI = () => {
    // Update count on button
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    // Render cart items in modal
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<p style="text-align:center; color:#999;">Giỏ hàng trống.</p>';
        cartTotalPriceEl.textContent = '0đ';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://placehold.co/50x50?text=Img'">
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                </div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">Xóa</button>
            </div>
        `;

        cartBody.appendChild(itemEl);
    });

    cartTotalPriceEl.textContent = formatCurrency(totalPrice);

    // Attach event listeners for cart buttons dynamically
    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => changeCartQuantity(parseInt(e.target.dataset.id), -1));
    });
    
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => changeCartQuantity(parseInt(e.target.dataset.id), 1));
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => removeFromCart(parseInt(e.target.dataset.id)));
    });
};

// ==========================================================================
// MODAL HANDLING
// ==========================================================================

// Cart Modal
cartBtn.addEventListener('click', () => {
    updateCartUI();
    cartModal.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

// Product Detail Modal
const openProductDetail = (product) => {
    const catName = categories.find(c => c.id === product.category)?.name || '';
    
    productDetailBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-detail-img" onerror="this.src='https://placehold.co/250x300?text=No+Image'">
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <p><strong>Danh mục:</strong> ${catName}</p>
            <h3 style="color: var(--price-color);">${formatCurrency(product.price)}</h3>
            ${product.oldPrice ? `<p style="text-decoration:line-through; color:#999;">Giá cũ: ${formatCurrency(product.oldPrice)}</p>` : ''}
            <p style="margin-top: 15px;">${product.description}</p>
            
            <div style="margin-top: 20px; display:flex; gap: 10px;">
                <input type="number" id="detailQty" value="1" min="1" style="width:60px; padding: 5px;">
                <button id="detailAddToCart" style="background:var(--price-color); color:white; border:none; padding:10px 20px; cursor:pointer; border-radius:4px;">Thêm vào giỏ</button>
            </div>
        </div>
    `;

    document.getElementById('detailAddToCart').addEventListener('click', () => {
        const qty = parseInt(document.getElementById('detailQty').value) || 1;
        addToCart(product, qty);
        productModal.classList.remove('show');
    });

    productModal.classList.add('show');
};

closeProductBtn.addEventListener('click', () => {
    productModal.classList.remove('show');
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
    if (e.target === productModal) {
        productModal.classList.remove('show');
    }
});

// Run Init
initApp();
