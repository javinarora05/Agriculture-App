// Shared functionality across all pages

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        element.classList.add('tooltip');
        element.innerHTML += `<span class="tooltip-text text-xs">${tooltipText}</span>`;
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Language switcher
function setupLanguageSwitcher() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            // In a real app, this would trigger i18n changes
        });
    }
}
// Supplier filters stub (no-op) to avoid errors when called on pages without supplier controls
function setupSupplierFilters() {
    // Intentionally left simple: pages that need advanced supplier filtering can implement later.
    const supplierSelect = document.querySelector('[name="company"]');
    if (supplierSelect) {
        // no-op: selection handling is covered by setupFiltersAndSorting
    }
}
// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    setupMobileMenu();
    setupLanguageSwitcher();
    setupPriceRangeFilter();
    setupSupplierFilters();
    loadCropData();
// Show loading spinner during page transitions
    const links = document.querySelectorAll('a[href^="/"], a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.hash) {
                // Show loading indicator for page transitions
                document.getElementById('loading').classList.remove('hidden');
            }
        });
    });
    
    // Hide loading spinner when page is fully loaded
    window.addEventListener('load', () => {
        document.getElementById('loading').classList.add('hidden');
    });
});
// Load crop data based on URL parameters
function loadCropData() {
    const urlParams = new URLSearchParams(window.location.search);
    const cropType = urlParams.get('crop');
    
    if (cropType) {
        // Simple local dataset for crop details
        const crops = {
            rice: {
                name: 'Rice',
                variety: 'Pusa Basmati 1121',
                category: 'Cereal',
                scientific: 'Oryza sativa',
                hero: 'http://static.photos/agriculture/640x360/1',
                season: 'Kharif (June-Nov)',
                duration: '120-150 days',
                yield: '5-6 ton/ha',
                price: '₹1,850-2,200/q'
            },
            wheat: {
                name: 'Wheat',
                variety: 'HD 2967',
                category: 'Cereal',
                scientific: 'Triticum aestivum',
                hero: 'http://static.photos/agriculture/640x360/2',
                season: 'Rabi (Nov-Apr)',
                duration: '120-140 days',
                yield: '4-5 ton/ha',
                price: '₹2,100-2,300/q'
            },
            cotton: {
                name: 'Cotton',
                variety: 'BT Cotton',
                category: 'Cash Crop',
                scientific: 'Gossypium hirsutum',
                hero: 'http://static.photos/agriculture/640x360/3',
                season: 'Kharif (Apr-Oct)',
                duration: '150-180 days',
                yield: '1.5-2 ton/ha (lint)',
                price: '₹6,000-7,000/q'
            },
            sugarcane: {
                name: 'Sugarcane',
                variety: 'Co 0238',
                category: 'Cash Crop',
                scientific: 'Saccharum officinarum',
                hero: 'http://static.photos/agriculture/640x360/4',
                season: 'Year-round (planting Feb-Apr/Sep-Oct)',
                duration: '10-14 months',
                yield: '60-80 ton/ha',
                price: '₹3,000-3,400/q (FRP)'
            },
            potato: {
                name: 'Potato',
                variety: 'Kufri Jyoti',
                category: 'Vegetable',
                scientific: 'Solanum tuberosum',
                hero: 'http://static.photos/agriculture/640x360/5',
                season: 'Rabi (Oct-Feb)',
                duration: '90-120 days',
                yield: '20-30 ton/ha',
                price: '₹1,000-1,400/q'
            },
            tomato: {
                name: 'Tomato',
                variety: 'Arka Rakshak',
                category: 'Vegetable',
                scientific: 'Solanum lycopersicum',
                hero: 'http://static.photos/agriculture/640x360/6',
                season: 'Kharif/Rabi/Zaid',
                duration: '90-110 days',
                yield: '25-35 ton/ha',
                price: '₹2,000-3,000/q'
            },
            soybean: {
                name: 'Soybean',
                variety: 'JS 95-60',
                category: 'Pulse',
                scientific: 'Glycine max',
                hero: 'http://static.photos/agriculture/640x360/7',
                season: 'Kharif (Jun-Oct)',
                duration: '90-110 days',
                yield: '2.5-3 ton/ha',
                price: '₹3,600-4,000/q'
            },
            mustard: {
                name: 'Mustard',
                variety: 'Pusa Jaikisan',
                category: 'Oilseed',
                scientific: 'Brassica juncea',
                hero: 'http://static.photos/agriculture/640x360/8',
                season: 'Rabi (Oct-Mar)',
                duration: '110-130 days',
                yield: '1.2-1.8 ton/ha',
                price: '₹4,000-4,400/q'
            }
        };

        const data = crops[cropType.toLowerCase()];
        if (!data) return;

        const titleEl = document.getElementById('crop-title');
        const catEl = document.getElementById('crop-category');
        const sciEl = document.getElementById('crop-scientific');
        const heroImg = document.getElementById('crop-hero');

        if (titleEl) titleEl.textContent = `${data.name} (${data.variety})`;
        if (catEl) catEl.textContent = data.category;
        if (sciEl) sciEl.textContent = `Scientific Name: ${data.scientific}`;
        if (heroImg) heroImg.src = data.hero;

        // Update the stat boxes (order dependent on template)
        const statBoxes = document.querySelectorAll('.grid.grid-cols-2.md\:grid-cols-4 .bg-white .font-medium');
        if (statBoxes && statBoxes.length >= 4) {
            statBoxes[0].textContent = data.season;
            statBoxes[1].textContent = data.duration;
            statBoxes[2].textContent = data.yield;
            statBoxes[3].textContent = data.price;
        }
    }
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('border-red-500');
                    isValid = false;
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const errorElement = form.querySelector('.form-error');
                if (errorElement) {
                    errorElement.textContent = 'Please fill all required fields';
                    errorElement.classList.remove('hidden');
                }
            }
        });
    }
}
// Price range filter functionality
function setupPriceRangeFilter() {
    const priceRange = document.getElementById('price-range');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const priceProgress = document.getElementById('price-progress');
    const priceRangeValue = document.getElementById('price-range-value');

    if (priceRange && minPriceInput && maxPriceInput) {
        // Update max price when range slider changes
        priceRange.addEventListener('input', () => {
            maxPriceInput.value = priceRange.value;
            updatePriceDisplay();
        });

        // Update range slider when max price input changes
        maxPriceInput.addEventListener('input', () => {
            if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
                maxPriceInput.value = minPriceInput.value;
            }
            priceRange.value = maxPriceInput.value;
            updatePriceDisplay();
        });

        // Update min price validation
        minPriceInput.addEventListener('input', () => {
            if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
                minPriceInput.value = maxPriceInput.value;
            }
            updatePriceDisplay();
        });

        function updatePriceDisplay() {
            priceRangeValue.textContent = `₹${minPriceInput.value} - ₹${maxPriceInput.value}`;
            priceProgress.style.width = `${(maxPriceInput.value / 5000) * 100}%`;
            
            // Filter products based on price range
            filterProductsByPrice();
        }

        function filterProductsByPrice() {
            const minPrice = parseInt(minPriceInput.value);
            const maxPrice = parseInt(maxPriceInput.value);
            
            document.querySelectorAll('.product-card').forEach(card => {
                const priceText = card.querySelector('.product-price').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                
                if (price >= minPrice && price <= maxPrice) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Initialize display
        updatePriceDisplay();
    }
}
// Filter and sort products
function setupFiltersAndSorting() {
    // Category filter
    document.querySelector('[name="category"]')?.addEventListener('change', filterProducts);
    
    // Company filter
    document.querySelector('[name="company"]')?.addEventListener('change', filterProducts);
    
    // Seed type filter
    document.querySelector('[name="seed-type"]')?.addEventListener('change', filterProducts);
    
    // Sort by
    document.querySelector('[name="sort-by"]')?.addEventListener('change', sortProducts);
}

function filterProducts() {
    const selectedCategory = document.querySelector('[name="category"]').value;
    const selectedCompany = document.querySelector('[name="company"]').value;
    const selectedSeedType = document.querySelector('[name="seed-type"]').value;
    
    document.querySelectorAll('.product-card').forEach(card => {
        const categoryMatches = !selectedCategory || card.dataset.category === selectedCategory;
        const companyMatches = !selectedCompany || card.dataset.company === selectedCompany;
        const seedTypeMatches = !selectedSeedType || card.dataset.seedType === selectedSeedType;
        
        if (categoryMatches && companyMatches && seedTypeMatches) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortProducts() {
    const sortBy = document.querySelector('[name="sort-by"]').value;
    const productsContainer = document.querySelector('.products-grid');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);
        const ratingA = parseFloat(a.dataset.rating);
        const ratingB = parseFloat(b.dataset.rating);
        
        switch(sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'rating':
                return ratingB - ratingA;
            case 'popular':
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
            default:
                return 0;
        }
    });
    
    // Re-append products in new order
    products.forEach(product => {
        productsContainer.appendChild(product);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupFiltersAndSorting();
    // crop filters/sorting/search initialization (if the page has crops)
    try { setupCropFilters(); } catch (e) { /* ignore if not present */ }
});

// ----------------------------
// Crop search/filter/sort (crops.html)
// ----------------------------
function setupCropFilters() {
    const search = document.getElementById('crop-search');
    const category = document.getElementById('crop-category');
    const sortSel = document.getElementById('crop-sort');
    const grid = document.getElementById('crops-grid');

    if (!grid) return; // not on crops page

    const cropCards = () => Array.from(grid.querySelectorAll('.crop-card'));

    const applyFilters = () => {
        const q = (search?.value || '').trim().toLowerCase();
        const cat = (category?.value || '').trim();

        cropCards().forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const cardCat = (card.dataset.category || '');
            const matchesQuery = !q || name.includes(q);
            const matchesCat = !cat || cardCat === cat;

            card.style.display = (matchesQuery && matchesCat) ? 'block' : 'none';
        });
    };

    const applySort = () => {
        const sortBy = sortSel?.value || 'popular';
        const cards = cropCards().filter(c => c.style.display !== 'none');

        cards.sort((a, b) => {
            if (sortBy === 'name') {
                return a.dataset.name.localeCompare(b.dataset.name);
            }
            const pa = parseInt(a.dataset.price || '0', 10);
            const pb = parseInt(b.dataset.price || '0', 10);
            if (sortBy === 'price-low') return pa - pb;
            if (sortBy === 'price-high') return pb - pa;
            // popular fallback: keep original order (no popularity data)
            return 0;
        });

        // Re-append sorted cards to container
        cards.forEach(c => grid.appendChild(c));
    };

    // wire events
    search?.addEventListener('input', () => { applyFilters(); applySort(); });
    category?.addEventListener('change', () => { applyFilters(); applySort(); });
    sortSel?.addEventListener('change', () => { applySort(); });

    // mobile inputs may be synced by crops.html script — also handle mobile search id
    const searchMobile = document.getElementById('crop-search-mobile');
    searchMobile?.addEventListener('input', () => { applyFilters(); applySort(); });

    // initial
    applyFilters();
    applySort();
}
// Cart management functions
function getCart() {
    return getFromLocalStorage('cart') || [];
}

function saveCart(cart) {
    saveToLocalStorage('cart', cart);
    updateCartCounter();
}

function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showToast(`${item.name} added to cart`, 'success');
}

function updateCartItem(id, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(i => i.id === id);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        saveCart(cart);
        updateCartDisplay();
    }
}

function removeFromCart(id) {
    const cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    updateCartDisplay();
}

function updateCartCounter() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.classList.toggle('hidden', count === 0);
    });
}

function updateCartDisplay() {
    if (window.location.pathname.includes('cart.html')) {
        const event = new Event('cartDisplayUpdate');
        document.dispatchEvent(event);
    }
}

// Local storage helper
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Failed to get from localStorage:', e);
        return null;
    }
}
// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ----------------------------
// Site reviews (index page)
// ----------------------------
const REVIEWS_KEY = 'siteReviews';

function getReviews() {
    return getFromLocalStorage(REVIEWS_KEY) || [];
}

function saveReviews(reviews) {
    saveToLocalStorage(REVIEWS_KEY, reviews);
}

function renderReviews() {
    const listEl = document.getElementById('reviews-list');
    const avgEl = document.getElementById('average-rating');
    const countEl = document.getElementById('review-count');
    const impactAvgEl = document.getElementById('impact-average');

    if (!listEl || !avgEl || !countEl) return;

    const reviews = getReviews();
    listEl.innerHTML = '';

    if (!reviews.length) {
        listEl.innerHTML = '<p class="text-sm text-gray-500">No reviews yet. Be the first to share your experience!</p>';
        avgEl.textContent = '—';
        countEl.textContent = '0';
        if (impactAvgEl) impactAvgEl.textContent = '—';
        return;
    }

    // Calculate average
    const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
    const avg = (sum / reviews.length) || 0;
    const avgRounded = Math.round(avg * 10) / 10; // one decimal

    avgEl.textContent = avgRounded.toFixed(1);
    countEl.textContent = String(reviews.length);
    if (impactAvgEl) impactAvgEl.textContent = avgRounded.toFixed(1);

    // Render each review (most recent first)
    reviews.slice().reverse().forEach(r => {
        const item = document.createElement('div');
        item.className = 'border border-gray-200 rounded-lg p-4';

        const meta = document.createElement('div');
        meta.className = 'flex items-center justify-between mb-2';
        const left = document.createElement('div');
        left.innerHTML = `<div class="text-sm font-medium text-gray-900">Anonymous</div><div class="text-xs text-gray-500">${new Date(r.date).toLocaleString()}</div>`;
        const right = document.createElement('div');
        right.className = 'text-yellow-400';
        // stars
        const stars = Array.from({length: 5}).map((_, i) => i < r.rating ? '★' : '☆').join('');
        right.textContent = stars + `  (${r.rating})`;

        meta.appendChild(left);
        meta.appendChild(right);

        const text = document.createElement('div');
        text.className = 'text-sm text-gray-700';
        text.textContent = r.text;

        item.appendChild(meta);
        item.appendChild(text);

        listEl.appendChild(item);
    });
}

function initReviews() {
    const form = document.getElementById('review-form');
    if (!form) return;

    renderReviews();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const textEl = document.getElementById('review-text');
        const ratingEl = document.getElementById('review-rating');

        if (!textEl || !ratingEl) return;

        const text = textEl.value.trim();
        const rating = parseInt(ratingEl.value, 10) || 0;

        if (!text) {
            showToast('Please enter your review text', 'error');
            return;
        }

        if (rating < 1 || rating > 5) {
            showToast('Please select a rating between 1 and 5', 'error');
            return;
        }

        const reviews = getReviews();
        reviews.push({ id: Date.now(), text, rating, date: new Date().toISOString() });
        saveReviews(reviews);
        renderReviews();

        // Reset form
        textEl.value = '';
        ratingEl.value = '5';

        showToast('Thanks — your review has been submitted');
    });
}

// Initialize reviews on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initReviews();
});