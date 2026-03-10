/* === AutoFix Home - Main JavaScript === */

/* ==========================================
   GLOBAL VARIABLES & DATA
   ========================================== */

// Parts data for the marketplace with images
let partsData = [
  { id: 1, name: "Bosch Brake Pad Set", category: "brakes", condition: "new", price: 34.99, seller: "AutoParts Co", rating: 4.8, compatible: "Toyota Camry 2015–2022", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 2, name: "Denso Air Filter", category: "engine", condition: "new", price: 18.50, seller: "SpeedParts", rating: 4.6, compatible: "Honda Civic 2016–2021", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 3, name: "Alternator 120A", category: "electrical", condition: "refurbished", price: 89.00, seller: "RebuiltRight", rating: 4.3, compatible: "Ford Focus 2014–2019", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 4, name: "Headlight Assembly", category: "body", condition: "new", price: 55.00, seller: "LightKing", rating: 4.7, compatible: "Nissan Altima 2017–2020", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 5, name: "OEM Radiator", category: "engine", condition: "used", price: 120.00, seller: "CoolantPros", rating: 4.2, compatible: "Chevrolet Malibu 2013–2018", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 6, name: "Starter Motor", category: "electrical", condition: "refurbished", price: 75.00, seller: "StarterHub", rating: 4.5, compatible: "BMW 3 Series 2012–2016", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 7, name: "Timing Belt Kit", category: "engine", condition: "new", price: 42.00, seller: "BeltWorld", rating: 4.9, compatible: "Volkswagen Golf 2015–2020", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 8, name: "Front Strut Assembly", category: "suspension", condition: "new", price: 98.00, seller: "RideSmooth", rating: 4.6, compatible: "Hyundai Sonata 2016–2021", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  // Additional parts with real photos
  { id: 9, name: "NGK Iridium Spark Plugs (4pc)", category: "engine", condition: "new", price: 28.99, seller: "SparkMasters", rating: 4.9, compatible: "Toyota/Honda/Nissan 2010–2023", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { id: 10, name: "Ceramic Brake Discs", category: "brakes", condition: "new", price: 85.00, seller: "StopRight", rating: 4.7, compatible: "Honda Accord 2018–2022", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" },
  { id: 11, name: "AC Compressor", category: "electrical", condition: "refurbished", price: 145.00, seller: "CoolAirPro", rating: 4.4, compatible: "Ford F-150 2015–2020", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
  { id: 12, name: "LED Headlight Bulbs", category: "body", condition: "new", price: 45.99, seller: "BrightLights", rating: 4.8, compatible: "Universal Fit", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d1?w=400&h=300&fit=crop" },
  { id: 13, name: "Water Pump", category: "engine", condition: "new", price: 65.00, seller: "EngineParts Co", rating: 4.6, compatible: "Chevrolet Silverado 2014–2019", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
  { id: 14, name: "Rear Shock Absorbers", category: "suspension", condition: "used", price: 78.00, seller: "SuspensionPlus", rating: 4.3, compatible: "Toyota Tacoma 2015–2021", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
  { id: 15, name: "Fuel Pump Assembly", category: "engine", condition: "refurbished", price: 112.00, seller: "FuelTech", rating: 4.5, compatible: "Dodge Ram 2013–2018", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
  { id: 16, name: "Oxygen Sensor", category: "electrical", condition: "new", price: 38.50, seller: "SensorWorld", rating: 4.7, compatible: "Honda CR-V 2016–2021", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" }
];

// Cart array
let cart = [];

// Conversation history for chatbot
let conversationHistory = [];

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

/* --- Toast Notification --- */
function showToast(message, duration = 4000, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast toast--${type} visible`;
  
  setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}

/* --- LocalStorage Wrappers --- */
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
}

function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    return null;
  }
}

/* ==========================================
   NAVBAR
   ========================================== */

function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('navbar__nav--open');
    });
  }
  
  // Cart icon
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  
  if (cartIcon && cartSidebar) {
    cartIcon.addEventListener('click', openCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
  }
  
  // Load cart from storage
  loadCart();
}

function openCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartSidebar) cartSidebar.classList.add('cart-sidebar--open');
  if (cartOverlay) cartOverlay.classList.add('cart-overlay--open');
}

function closeCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartSidebar) cartSidebar.classList.remove('cart-sidebar--open');
  if (cartOverlay) cartOverlay.classList.remove('cart-overlay--open');
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }
}

function renderCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  
  if (!cartItemsEl) return;
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    if (cartTotalEl) cartTotalEl.textContent = '$0.00';
    return;
  }
  
  let subtotal = 0;
  cartItemsEl.innerHTML = cart.map((item, index) => {
    subtotal += item.price * item.quantity;
    return `
      <div class="cart-item">
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">$${item.price.toFixed(2)}</div>
          <div class="cart-item__quantity">
            <button class="cart-item__btn" onclick="updateQuantity(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button class="cart-item__btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <span class="cart-item__remove" onclick="removeFromCart(${index})">×</span>
      </div>
    `;
  }).join('');
  
  if (cartTotalEl) {
    cartTotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }
}

function addToCart(part) {
  const existingItem = cart.find(item => item.id === part.id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: part.id,
      name: part.name,
      price: part.price,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartBadge();
  renderCart();
  openCart();
  showToast(`Added ${part.name} to cart`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  renderCart();
}

function emptyCart() {
  cart = [];
  saveCart();
  updateCartBadge();
  renderCart();
  showToast('Cart emptied');
}

function saveCart() {
  saveToStorage('autofix_cart', cart);
}

function loadCart() {
  const savedCart = loadFromStorage('autofix_cart');
  if (savedCart) {
    cart = savedCart;
    updateCartBadge();
    renderCart();
  }
}

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

/* ==========================================
   SCROLL & ANIMATION
   ========================================== */

function initScrollAnimations() {
  // Fade-in sections
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
  }
  
  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================
   HOME PAGE
   ========================================== */

function initHomePage() {
  initToolChecklist();
  initCategoryCards();
}

function initToolChecklist() {
  const checkboxes = document.querySelectorAll('#tools-list input[type="checkbox"]');
  const toolsList = document.getElementById('tools-list');
  const toolsGot = document.getElementById('tools-got');
  
  if (!checkboxes.length) return;
  
  // Load saved state
  const savedTools = loadFromStorage('autofix_tools') || [];
  
  checkboxes.forEach(checkbox => {
    const toolId = checkbox.dataset.tool;
    
    // Check if already saved
    if (savedTools.includes(toolId)) {
      checkbox.checked = true;
    }
    
    checkbox.addEventListener('change', () => {
      handleToolCheck(checkbox, savedTools);
    });
  });
  
  // Initial render of checked items
  updateGotToolsList(savedTools);
}

function handleToolCheck(checkbox, savedTools) {
  const toolId = checkbox.dataset.tool;
  const toolsGot = document.getElementById('tools-got');
  const toolText = checkbox.nextElementSibling.nextElementSibling;
  
  if (checkbox.checked) {
    if (!savedTools.includes(toolId)) {
      savedTools.push(toolId);
    }
    toolText.style.textDecoration = 'line-through';
    toolText.style.color = 'var(--color-success)';
  } else {
    const index = savedTools.indexOf(toolId);
    if (index > -1) {
      savedTools.splice(index, 1);
    }
    toolText.style.textDecoration = 'none';
    toolText.style.color = '';
  }
  
  saveToStorage('autofix_tools', savedTools);
  updateGotToolsList(savedTools);
}

function updateGotToolsList(savedTools) {
  const toolsGot = document.getElementById('tools-got');
  if (!toolsGot) return;
  
  const toolNames = {
    'socket-set': 'Socket Set',
    'jack-stands': 'Jack Stands (2+)',
    'floor-jack': 'Floor Jack',
    'obd-scanner': 'OBD-II Scanner',
    'torque-wrench': 'Torque Wrench',
    'screwdriver-set': 'Screwdriver Set',
    'wrench-set': 'Wrench Set',
    'pliers': 'Pliers (Various Types)',
    'oil-filter-wrench': 'Oil Filter Wrench',
    'work-light': 'Portable Work Light'
  };
  
  if (savedTools.length === 0) {
    toolsGot.innerHTML = '<li class="tool-item" style="color: var(--color-muted); font-style: italic;">No tools checked yet</li>';
    return;
  }
  
  toolsGot.innerHTML = savedTools.map(toolId => `
    <li class="tool-item">
      <label class="tool-checkbox">
        <input type="checkbox" data-tool="${toolId}" checked onchange="handleToolCheckFromGot(this)">
        <span class="tool-checkbox__mark"></span>
        <span class="tool-checkbox__text">${toolNames[toolId] || toolId}</span>
      </label>
    </li>
  `).join('');
  
  // Also update the main list
  const mainCheckboxes = document.querySelectorAll('#tools-list input[type="checkbox"]');
  mainCheckboxes.forEach(cb => {
    const toolId = cb.dataset.tool;
    if (savedTools.includes(toolId)) {
      cb.checked = true;
      cb.nextElementSibling.nextElementSibling.style.textDecoration = 'line-through';
      cb.nextElementSibling.nextElementSibling.style.color = 'var(--color-success)';
    }
  });
}

function handleToolCheckFromGot(checkbox) {
  const toolId = checkbox.dataset.tool;
  const savedTools = loadFromStorage('autofix_tools') || [];
  
  // Uncheck from main list
  const mainCheckbox = document.querySelector(`#tools-list input[data-tool="${toolId}"]`);
  if (mainCheckbox) {
    mainCheckbox.checked = checkbox.checked;
  }
  
  handleToolCheck(mainCheckbox, savedTools);
}

window.handleToolCheckFromGot = handleToolCheckFromGot;

function initCategoryCards() {
  // Category cards already link to repairs.html with URL params
  // This is handled by the href attributes in the HTML
}

/* ==========================================
   REPAIRS PAGE
   ========================================== */

function initRepairsPage() {
  initSearchAndFilter();
  initAccordions();
  initSafetyBanner();
}

function initSearchAndFilter() {
  const searchInput = document.getElementById('search-input');
  const filterPills = document.querySelectorAll('.filter-pill');
  const repairCards = document.querySelectorAll('.repair-card');
  const noResults = document.getElementById('no-results');
  
  let currentFilter = 'all';
  let currentSearch = '';
  
  // Read URL parameter for category
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  if (categoryParam) {
    // Map category param to filter
    const categoryMap = {
      'oil': 'engine',
      'brakes': 'brakes',
      'battery': 'electrical',
      'tires': 'tires',
      'air-filter': 'engine',
      'spark-plugs': 'engine'
    };
    
    const mappedCategory = categoryMap[categoryParam];
    if (mappedCategory) {
      currentFilter = mappedCategory;
      // Update active pill
      filterPills.forEach(pill => {
        if (pill.dataset.filter === mappedCategory) {
          pill.classList.add('filter-pill--active');
        } else {
          pill.classList.remove('filter-pill--active');
        }
      });
    }
  }
  
  // Filter pills click handler
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('filter-pill--active'));
      pill.classList.add('filter-pill--active');
      currentFilter = pill.dataset.filter;
      filterCards();
    });
  });
  
  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase();
      filterCards();
    });
  }
  
  function filterCards() {
    let visibleCount = 0;
    
    repairCards.forEach(card => {
      const title = card.querySelector('.repair-card__title').textContent.toLowerCase();
      const desc = card.querySelector('.repair-card__desc').textContent.toLowerCase();
      const badges = card.querySelectorAll('.badge');
      
      let category = '';
      badges.forEach(badge => {
        if (badge.classList.contains('badge--easy') || badge.classList.contains('badge--medium') || badge.classList.contains('badge--hard')) {
          // This is difficulty, not category
        } else {
          // Check parent for category
        }
      });
      
      // Get category from the card - we'll use a data attribute or infer from title
      const cardText = (title + ' ' + desc).toLowerCase();
      
      // Determine category based on content
      let cardCategory = 'all';
      if (cardText.includes('oil') || cardText.includes('air filter') || cardText.includes('spark plug') || cardText.includes('throttle')) {
        cardCategory = 'engine';
      } else if (cardText.includes('brake') || cardText.includes('braking')) {
        cardCategory = 'brakes';
      } else if (cardText.includes('battery') || cardText.includes('alternator') || cardText.includes('starter')) {
        cardCategory = 'electrical';
      } else if (cardText.includes('tire') || cardText.includes('wheel')) {
        cardCategory = 'tires';
      } else if (cardText.includes('coolant') || cardText.includes('fluid')) {
        cardCategory = 'fluids';
      } else if (cardText.includes('wiper') || cardText.includes('windshield')) {
        cardCategory = 'exterior';
      }
      
      const matchesFilter = currentFilter === 'all' || cardCategory === currentFilter;
      const matchesSearch = currentSearch === '' || title.includes(currentSearch) || desc.includes(currentSearch);
      
      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.add('visible');
      } else {
        noResults.classList.remove('visible');
      }
    }
  }
}

function initAccordions() {
  const accordionBtns = document.querySelectorAll('.repair-card__btn');
  
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetAccordion = document.getElementById(targetId);
      
      // Close all other accordions
      document.querySelectorAll('.repair-card__accordion.active').forEach(acc => {
        if (acc.id !== targetId) {
          acc.classList.remove('active');
          const relatedBtn = document.querySelector(`[data-target="${acc.id}"]`);
          if (relatedBtn) relatedBtn.textContent = 'Read Guide';
        }
      });
      
      // Toggle current accordion
      if (targetAccordion) {
        if (targetAccordion.classList.contains('active')) {
          targetAccordion.classList.remove('active');
          btn.textContent = 'Read Guide';
        } else {
          targetAccordion.classList.add('active');
          btn.textContent = 'Close Guide';
        }
      }
    });
  });
}

function initSafetyBanner() {
  const banner = document.getElementById('safety-banner');
  const closeBtn = document.getElementById('safety-close');
  
  if (!banner || !closeBtn) return;
  
  // Check if already dismissed
  const dismissed = loadFromStorage('autofix_safety_dismissed');
  if (dismissed) {
    banner.classList.add('hidden');
    return;
  }
  
  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    saveToStorage('autofix_safety_dismissed', true);
  });
}

/* ==========================================
   PARTS PAGE
   ========================================== */

function initPartsPage() {
  renderPartsGrid();
  initPartsFilters();
  initSellModal();
  initCartButtons();
}

function renderPartsGrid() {
  const container = document.getElementById('parts-grid-container');
  const noResults = document.getElementById('parts-no-results');
  
  if (!container) return;
  
  // Check for filters
  const categoryFilter = document.getElementById('category-filter');
  const conditionFilter = document.getElementById('condition-filter');
  const searchInput = document.getElementById('parts-search');
  
  let filteredParts = [...partsData];
  
  // Apply category filter
  if (categoryFilter && categoryFilter.value !== 'all') {
    filteredParts = filteredParts.filter(p => p.category === categoryFilter.value);
  }
  
  // Apply condition filter
  if (conditionFilter && conditionFilter.value !== 'all') {
    filteredParts = filteredParts.filter(p => p.condition === conditionFilter.value);
  }
  
  // Apply search filter
  if (searchInput && searchInput.value.trim()) {
    const searchTerm = searchInput.value.toLowerCase();
    filteredParts = filteredParts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.compatible.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filteredParts.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.classList.add('visible');
    return;
  }
  
  if (noResults) noResults.classList.remove('visible');
  
  container.innerHTML = filteredParts.map(part => {
    const conditionClass = `badge--${part.condition}`;
    return `
      <article class="part-card" data-id="${part.id}">
        <div class="part-card__image">
          <img src="${part.image}" alt="${part.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <div class="part-card__image-placeholder" style="display:none;">
            <span>🔧</span>
            <p>${part.name}</p>
          </div>
        </div>
        <div class="part-card__content">
          <h3 class="part-card__name">${part.name}</h3>
          <p class="part-card__compatible">Fits: ${part.compatible}</p>
          <div class="part-card__badges">
            <span class="badge ${conditionClass}">${part.condition}</span>
          </div>
          <div class="part-card__price">$${part.price.toFixed(2)}</div>
          <div class="part-card__seller">
            <span class="part-card__seller-name">${part.seller}</span>
            <span class="part-card__rating">★ ${part.rating}</span>
          </div>
          <div class="part-card__actions">
            <button class="btn btn--primary" onclick="addToCartFromParts(${part.id})">Add to Cart</button>
            <button class="btn btn--outline" onclick="messageSeller('${part.seller}', '${part.name}')">Message</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function addToCartFromParts(partId) {
  const part = partsData.find(p => p.id === partId);
  if (part) {
    addToCart(part);
  }
}

function messageSeller(seller, partName) {
  const subject = encodeURIComponent(`Inquiry about: ${partName}`);
  const body = encodeURIComponent(`Hi ${seller},\n\nI'm interested in your part listing for the ${partName}. Is it still available?\n\nThanks!`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

window.addToCartFromParts = addToCartFromParts;
window.messageSeller = messageSeller;

function initPartsFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const conditionFilter = document.getElementById('condition-filter');
  const searchInput = document.getElementById('parts-search');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', renderPartsGrid);
  }
  
  if (conditionFilter) {
    conditionFilter.addEventListener('change', renderPartsGrid);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', renderPartsGrid);
  }
}

function initSellModal() {
  const sellBtn = document.getElementById('sell-part-btn');
  const sellModal = document.getElementById('sell-modal');
  const modalClose = document.getElementById('sell-modal-close');
  const sellForm = document.getElementById('sell-form');
  
  if (!sellBtn || !sellModal) return;
  
  sellBtn.addEventListener('click', () => {
    sellModal.classList.add('modal--open');
  });
  
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      sellModal.classList.remove('modal--open');
    });
  }
  
  // Close on overlay click
  sellModal.addEventListener('click', (e) => {
    if (e.target === sellModal) {
      sellModal.classList.remove('modal--open');
    }
  });
  
  if (sellForm) {
    sellForm.addEventListener('submit', handleSellFormSubmit);
  }
}

function handleSellFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Validation
  let isValid = true;
  
  // Clear previous errors
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
    input.classList.remove('form-input--error', 'form-select--error', 'form-textarea--error');
  });
  
  // Validate required fields
  const requiredFields = ['partName', 'carMake', 'carModel', 'yearRange', 'condition', 'price', 'description', 'sellerName', 'sellerEmail'];
  
  requiredFields.forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    if (!field.value.trim()) {
      field.classList.add('form-input--error');
      isValid = false;
    }
  });
  
  // Validate email
  const emailField = form.querySelector('[name="sellerEmail"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailField && !emailRegex.test(emailField.value)) {
    emailField.classList.add('form-input--error');
    isValid = false;
  }
  
  // Validate price
  const priceField = form.querySelector('[name="price"]');
  if (priceField && (parseFloat(priceField.value) <= 0 || isNaN(parseFloat(priceField.value)))) {
    priceField.classList.add('form-input--error');
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  // Create new part object
  const condition = formData.get('condition');
  const conditionMap = { 'new': 'New', 'used': 'Used', 'refurbished': 'Refurbished' };
  
  const newPart = {
    id: Date.now(),
    name: formData.get('partName'),
    category: 'engine', // Default, could be inferred
    condition: condition,
    price: parseFloat(formData.get('price')),
    seller: formData.get('sellerName'),
    rating: 5.0, // New sellers start with 5 stars
    compatible: `${formData.get('carMake')} ${formData.get('carModel')} ${formData.get('yearRange')}`
  };
  
  // Add to parts data
  partsData.push(newPart);
  
  // Re-render grid
  renderPartsGrid();
  
  // Close modal
  const sellModal = document.getElementById('sell-modal');
  sellModal.classList.remove('modal--open');
  
  // Reset form
  form.reset();
  
  // Show success toast
  showToast('✅ Your listing has been submitted for review!');
}

function initCartButtons() {
  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showToast('Checkout coming soon!', 3000);
    });
  }
  
  // Empty cart button
  const emptyCartBtn = document.getElementById('empty-cart-btn');
  if (emptyCartBtn) {
    emptyCartBtn.addEventListener('click', emptyCart);
  }
}

/* ==========================================
   CONTACT PAGE
   ========================================== */

function initContactPage() {
  initBookingForm();
  initFAQ();
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  const successEl = document.getElementById('booking-success');
  const dateInput = document.getElementById('preferred-date');
  
  if (!form) return;
  
  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validation
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
      input.classList.remove('form-input--error', 'form-select--error', 'form-textarea--error');
    });
    
    // Validate required fields
    const fields = ['fullName', 'email', 'phone', 'carMake', 'carModel', 'year', 'problem', 'preferredDate', 'preferredTime'];
    
    fields.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (!field) return;
      
      if (!field.value.trim()) {
        field.classList.add('form-input--error');
        isValid = false;
      }
    });
    
    // Validate email
    const emailField = form.querySelector('[name="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && !emailRegex.test(emailField.value)) {
      emailField.classList.add('form-input--error');
      isValid = false;
    }
    
    // Validate phone (10+ digits)
    const phoneField = form.querySelector('[name="phone"]');
    const phoneDigits = phoneField.value.replace(/\D/g, '');
    if (phoneField && phoneDigits.length < 10) {
      phoneField.classList.add('form-input--error');
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    // Show success state
    form.style.display = 'none';
    if (successEl) {
      successEl.classList.add('visible');
    }
  });
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
          const otherQuestion = otherItem.querySelector('.faq-item__question');
          const otherAnswer = otherItem.querySelector('.faq-item__answer');
          
          if (otherItem !== item && otherAnswer.classList.contains('active')) {
            otherQuestion.classList.remove('active');
            otherAnswer.classList.remove('active');
          }
        });
        
        // Toggle current item
        question.classList.toggle('active');
        answer.classList.toggle('active');
      });
    }
  });
}

/* ==========================================
   INITIALIZATION
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavbar();
  initScrollAnimations();
  
  // Page-specific initialization
  const path = window.location.pathname;
  
  if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
    initHomePage();
  } else if (path.includes('repairs.html')) {
    initRepairsPage();
  } else if (path.includes('parts.html')) {
    initPartsPage();
  } else if (path.includes('contact.html')) {
    initContactPage();
  }
  
  // Initialize home page features if on home
  if (document.getElementById('tools-list')) {
    initHomePage();
  }
});

