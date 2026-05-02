﻿const CATEGORY_SECTIONS = {
  sale: 'sale-grid',
  dryfit: 'dryfit-grid',
  activewear: 'activewear-grid',
  tshirts: 'tshirts-grid',
  dropshoulder: 'dropshoulder-grid',
  tracksuit: 'tracksuit-grid',
  bundle: 'bundle-grid',
  shorts: 'shorts-grid'
};

const PROMOS = [
  { label: 'T-Shirts', img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80' },
  { label: 'Tracksuits', img: 'https://images.unsplash.com/photo-1611911813383-67769b37a149?w=600&q=80' },
  { label: 'Shorts', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80' },
  { label: 'Drop Shoulder', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
  { label: 'Bundles', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80' },
  { label: 'Active Wear', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80' }
];

const REVIEWS = [
  {
    stars: 5,
    text: 'Amazing quality! The fabric is so soft and the stitching is perfect. Will definitely order again from Black X Original. Highly recommended to everyone.',
    author: 'Ahmed R.',
    date: 'March 2025'
  },
  {
    stars: 5,
    text: "Got the tracksuit bundle and I'm beyond impressed. Fast delivery and the product looks even better in person. Size guide was accurate too!",
    author: 'Zainab K.',
    date: 'February 2025'
  },
  {
    stars: 4,
    text: 'The drop shoulder tees are exactly what I was looking for. Perfect oversized fit. The black one is my new daily wear. Great value for money.',
    author: 'Hassan M.',
    date: 'March 2025'
  }
];

const INSTA_IMGS = [
  'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80',
  'https://images.unsplash.com/photo-1611911813383-67769b37a149?w=400&q=80',
  'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80',
  'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80',
  'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&q=80',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80'
];

const API_BASE = 'http://localhost:3000';
let fetchedProducts = [];
let cart = normalizeCart(JSON.parse(localStorage.getItem('cart')) || []);
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
let isCheckingOut = false;

function normalizeCart(items) {
  return items.map((item) => ({
    ...item,
    qty: Number(item.qty || item.quantity || 1)
  }));
}

function persistCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function formatPrice(amount) {
  const value = Number(amount) || 0;
  return `Rs. ${value.toLocaleString()}`;
}

function stars(n) {
  const safe = Math.max(0, Math.min(5, Number(n) || 0));
  return '★'.repeat(safe) + '☆'.repeat(5 - safe);
}

function renderProductCard(product) {
  const displayPrice = formatPrice(product.price);
  const originalPrice = product.original_price ? formatPrice(product.original_price) : '';
  const subtitle = product.subtitle || product.description || 'New Arrival';
  const rating = Number(product.rating || 0);
  const reviews = Number(product.reviews_count || 0);
  const isOutOfStock = Number(product.is_out_of_stock || 0) === 1;

  return `
    <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
      ${isOutOfStock ? '<span class="badge">OUT</span>' : product.badge ? `<span class="badge ${product.badge === 'NEW' ? 'badge-new' : ''}">${product.badge}</span>` : ''}
      <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-overlay">${isOutOfStock ? 'Out of Stock' : 'View Details'}</div>
      <div class="product-info">
        <div class="stars">${stars(rating)} <span style="color:#888;font-size:11px">(${reviews})</span></div>
        <div class="product-name">${product.name}</div>
        <div class="product-sub">${subtitle}</div>
        <div class="product-price">
          ${displayPrice}
          ${originalPrice ? `<span class="original">${originalPrice}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderGrid(gridId, products) {
  const el = document.getElementById(gridId);
  if (!el) return;

  if (!products.length) {
    el.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No products available</p>';
    return;
  }

  el.innerHTML = products.map(renderProductCard).join('');
}

function renderCategorySections() {
  Object.entries(CATEGORY_SECTIONS).forEach(([category, gridId]) => {
    const sectionProducts = fetchedProducts.filter((product) => 
      product.category && product.category.toLowerCase().trim() === category.toLowerCase()
    );
    const grid = document.getElementById(gridId);
    if (grid) {
      renderGrid(gridId, sectionProducts);
    }
  });
}

function renderPromos() {
  const el = document.getElementById('promo-grid');
  if (!el) return;
  el.innerHTML = PROMOS.map((promo) => `
    <div class="promo-card">
      <img src="${promo.img}" alt="${promo.label}" loading="lazy" />
      <div class="promo-card-label">${promo.label}</div>
    </div>
  `).join('');
}

function renderReviews() {
  const el = document.getElementById('reviews-grid');
  if (!el) return;
  el.innerHTML = REVIEWS.map((review) => `
    <div class="review-card">
      <div class="review-stars">${stars(review.stars)}</div>
      <p class="review-text">"${review.text}"</p>
      <div class="review-author">${review.author}</div>
      <div class="review-date">${review.date}</div>
    </div>
  `).join('');
}

function renderInstagram() {
  const el = document.getElementById('insta-grid');
  if (!el) return;
  el.innerHTML = INSTA_IMGS.map((src) => `
    <div class="insta-item">
      <img src="${src}" alt="Instagram post" loading="lazy" />
    </div>
  `).join('');
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = count;
    // Show badge only when there are items
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function addToCart(id) {
  const product = fetchedProducts.find((item) => Number(item.id) === Number(id));
  if (!product) return;

  if (Number(product.is_out_of_stock || 0) === 1) {
    showNotification('This product is currently out of stock.', 'error');
    return;
  }

  const existing = cart.find((item) => Number(item.id) === Number(id));
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      subtitle: product.subtitle || product.description || '',
      qty: 1
    });
  }

  persistCart();
  updateCartCount();
  showAddToCartPopup(product, 1);
}

function showAddToCartPopup(product, quantity = 1) {
  document.querySelector('.cart-confirm-popup')?.remove();

  const popup = document.createElement('div');
  popup.className = 'cart-confirm-popup';
  popup.innerHTML = `
    <button class="cart-confirm-close" type="button" aria-label="Close cart confirmation">&times;</button>
    <div class="cart-confirm-media">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="cart-confirm-copy">
      <div class="cart-confirm-kicker">Added to bag</div>
      <div class="cart-confirm-title">${product.name}</div>
      <div class="cart-confirm-meta">Qty ${quantity} · ${formatPrice(product.price)}</div>
    </div>
    <div class="cart-confirm-actions">
      <button class="cart-confirm-primary" type="button">View Cart</button>
      <button class="cart-confirm-secondary" type="button">Continue</button>
    </div>
  `;

  document.body.appendChild(popup);

  const closePopup = () => popup.classList.add('closing');
  popup.querySelector('.cart-confirm-close').addEventListener('click', closePopup);
  popup.querySelector('.cart-confirm-secondary').addEventListener('click', closePopup);
  popup.querySelector('.cart-confirm-primary').addEventListener('click', () => {
    closePopup();
    openModal('cart-modal');
  });
  popup.addEventListener('animationend', () => {
    if (popup.classList.contains('closing')) popup.remove();
  });

  setTimeout(closePopup, 4500);
}

function removeFromCart(id) {
  cart = cart.filter((item) => Number(item.id) !== Number(id));
  persistCart();
  updateCartCount();
  renderCart();
}

function updateQty(id, change) {
  const item = cart.find((entry) => Number(entry.id) === Number(id));
  if (!item) return;

  item.qty = Math.max(1, Number(item.qty) + change);
  persistCart();
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartSummaryDiv = document.getElementById('cart-summary');

  if (!cartItemsDiv || !cartSummaryDiv) return;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    cartSummaryDiv.innerHTML = '';
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = cart.map((item) => {
    const itemPrice = Number(item.price) || 0;
    const itemTotal = itemPrice * Number(item.qty);
    total += itemTotal;

    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <div style="font-weight: 600;">${item.name}</div>
          <div style="font-size: 12px; color: #888;">${formatPrice(itemPrice)} x ${item.qty}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span style="width: 20px; text-align: center;">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          <button class="qty-btn" onclick="removeFromCart(${item.id})" style="color: #c8102e; margin-left: 8px;">✕</button>
        </div>
      </div>
    `;
  }).join('');

  cartSummaryDiv.innerHTML = `Total: ${formatPrice(total)}`;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('active');
  if (modalId === 'cart-modal') renderCart();
  if (modalId === 'profile-modal') loadProfile();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach((modal) => modal.classList.remove('active'));
}

function performSearch(query) {
  const resultsDiv = document.getElementById('search-results');
  if (!resultsDiv) return;

  if (query.trim() === '') {
    resultsDiv.innerHTML = '';
    return;
  }

  const results = fetchedProducts.filter((product) => {
    const haystack = `${product.name} ${product.subtitle || ''} ${product.description || ''}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  if (!results.length) {
    resultsDiv.innerHTML = '<div class="search-item">No products found</div>';
    return;
  }

  resultsDiv.innerHTML = results.map((product) => `
    <div class="search-item" onclick="window.location.href='product-detail.html?id=${product.id}'">
      <div style="display: flex; gap: 12px;">
        <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" />
        <div>
          <div style="font-weight: 600; font-size: 13px;">${product.name}</div>
          <div style="font-size: 12px; color: #888;">${product.subtitle || product.description || ''}</div>
          <div style="font-weight: 600; color: var(--accent);">${formatPrice(product.price)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function loadProfile() {
  document.getElementById('profile-name').value = userProfile.name || '';
  document.getElementById('profile-email').value = userProfile.email || '';
  document.getElementById('profile-phone').value = userProfile.phone || '';
  document.getElementById('profile-address').value = userProfile.address || '';
  document.getElementById('profile-city').value = userProfile.city || '';
  document.getElementById('profile-postal').value = userProfile.postal || '';
}

async function saveProfile() {
  const name = document.getElementById('profile-name').value.trim();
  const email = document.getElementById('profile-email').value.trim();
  const phone = document.getElementById('profile-phone').value.trim();
  const address = document.getElementById('profile-address').value.trim();
  const city = document.getElementById('profile-city').value.trim();
  const postal = document.getElementById('profile-postal').value.trim();

  if (!name || !email) {
    showNotification('Name and Email are required', 'error');
    return;
  }

  try {
    const checkResponse = await fetch(`${API_BASE}/users/${email}`);
    const method = checkResponse.ok ? 'PUT' : 'POST';
    const endpoint = checkResponse.ok ? `${API_BASE}/users/${email}` : `${API_BASE}/users`;

    const response = await fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, address, city, postal })
    });
    if (!response.ok) {
      throw new Error(`Failed to ${method} user data`);
    }

    userProfile = { name, email, phone, address, city, postal };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    showNotification('Profile saved and synced successfully!');
    closeModal('profile-modal');
  } catch (error) {
    console.error('Save profile error:', error);
    showNotification('Failed to sync profile with database', 'error');
  }
}

function logout() {
  userProfile = {};
  localStorage.removeItem('userProfile');
  closeModal('profile-modal');
  showNotification('Logged out successfully!');
}

async function checkout() {
  if (!cart.length) {
    showNotification('Your cart is empty!', 'error');
    return;
  }

  if (!userProfile.name || !userProfile.email || !userProfile.phone || !userProfile.address) {
    showNotification('Please complete your profile first!', 'error');
    closeModal('cart-modal');
    openModal('profile-modal');
    return;
  }

  if (isCheckingOut) return;

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * Number(item.qty), 0);
  isCheckingOut = true;

  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: userProfile.name,
        customerEmail: userProfile.email,
        customerPhone: userProfile.phone,
        customerAddress: userProfile.address,
        customerCity: userProfile.city || '',
        customerPostal: userProfile.postal || '',
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          size: item.size || null
        }))
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Checkout failed');
    }

    alert(`Order confirmed!\n\nOrder ID: ${result.order.id}\nTotal: ${formatPrice(total)}\nCustomer: ${userProfile.name}\nEmail: ${userProfile.email}\n\nThank you for shopping with Black X Original!`);

    cart = [];
    persistCart();
    updateCartCount();
    closeModal('cart-modal');
    renderCart();
    showNotification('Order saved successfully!');
  } catch (error) {
    console.error('Checkout error:', error);
    const message = error.message === 'Failed to fetch'
      ? 'Backend not running. Start the server on http://localhost:3000 and try again.'
      : (error.message || 'Unable to save your order');
    showNotification(message, 'error');
  } finally {
    isCheckingOut = false;
  }
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    padding: 12px 20px; border-radius: 6px; font-weight: 600;
    background: ${type === 'success' ? '#4caf50' : '#f44336'};
    color: white; animation: slideIn .3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut .3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn { from { transform: translateX(400px); } to { transform: translateX(0); } }
  @keyframes slideOut { from { transform: translateX(0); } to { transform: translateX(400px); } }
  @keyframes cartPopIn {
    from { opacity: 0; transform: translateY(18px) scale(.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes cartPopOut {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(18px) scale(.96); }
  }
  .cart-confirm-popup {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 10001;
    width: min(420px, calc(100vw - 32px));
    display: grid;
    grid-template-columns: 86px 1fr;
    gap: 14px;
    align-items: center;
    padding: 16px;
    background: #111;
    color: #fff;
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 10px;
    box-shadow: 0 22px 60px rgba(0,0,0,.35);
    animation: cartPopIn .22s ease both;
  }
  .cart-confirm-popup.closing { animation: cartPopOut .2s ease both; }
  .cart-confirm-close {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 28px;
    height: 28px;
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
  }
  .cart-confirm-media {
    width: 86px;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 8px;
    background: #222;
  }
  .cart-confirm-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cart-confirm-copy { min-width: 0; padding-right: 20px; }
  .cart-confirm-kicker {
    color: #b7f7c3;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .cart-confirm-title {
    font-size: 15px;
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 5px;
  }
  .cart-confirm-meta { color: #cfcfcf; font-size: 12px; }
  .cart-confirm-actions {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 4px;
  }
  .cart-confirm-actions button {
    min-height: 40px;
    border-radius: 6px;
    border: 1px solid #fff;
    cursor: pointer;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .cart-confirm-primary { background: #fff; color: #111; }
  .cart-confirm-secondary { background: transparent; color: #fff; }
  @media (max-width: 520px) {
    .cart-confirm-popup {
      right: 16px;
      bottom: 16px;
      grid-template-columns: 72px 1fr;
      padding: 14px;
    }
    .cart-confirm-media { width: 72px; }
  }
`;
document.head.appendChild(style);

async function loadProductsFromApi() {
  try {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    fetchedProducts = await response.json();
    if (fetchedProducts.length === 0) {
      console.warn('Backend returned 0 products.');
    }
    renderCategorySections();
    renderNewStock();
  } catch (error) {
    console.error('Fetch error:', error);
    const message = error.message === 'Failed to fetch' 
      ? 'Cannot connect to backend. Is the server running on port 3000?' 
      : error.message;
    throw new Error(message);
  }
}

function renderNewStock() {
  const container = document.getElementById('new-stock-grid');
  if (!container) return;

  const latestProducts = [...fetchedProducts].slice(0, 8);
  if (!latestProducts.length) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No new products available</p>';
    return;
  }

  container.innerHTML = latestProducts.map(renderProductCard).join('');
}

function loadMoreNewStock() {
  renderNewStock();
  showNotification('Latest products loaded!');
}

document.addEventListener('DOMContentLoaded', async () => {
  renderPromos();
  renderReviews();
  renderInstagram();
  updateCartCount();

  try {
    await loadProductsFromApi();
  } catch (error) {
    const userMsg = error.message.includes('Failed to fetch') 
      ? 'Cannot connect to server. Is the backend running?' 
      : 'Error loading products from database.';
    
    Object.values(CATEGORY_SECTIONS).forEach((gridId) => {
      const grid = document.getElementById(gridId);
      if (grid) grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #f44336;">${userMsg}</p>`;
    });
    const newStockGrid = document.getElementById('new-stock-grid');
    if (newStockGrid) newStockGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #f44336;">${userMsg}</p>`;
  }

  const dropdownBtn = document.getElementById('dropdown-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdownBtn.classList.toggle('active');
      dropdownMenu.classList.toggle('active');
    });

    document.querySelectorAll('.dropdown-item').forEach((item) => {
      item.addEventListener('click', () => {
        dropdownBtn.classList.remove('active');
        dropdownMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.dropdown-container')) {
        dropdownBtn.classList.remove('active');
        dropdownMenu.classList.remove('active');
      }
    });
  }

  document.getElementById('search-btn')?.addEventListener('click', () => {
    openModal('search-modal');
    document.getElementById('search-input')?.focus();
  });

  document.getElementById('search-input')?.addEventListener('input', (event) => {
    performSearch(event.target.value);
  });

  document.getElementById('profile-btn')?.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  document.getElementById('admin-btn')?.addEventListener('click', () => {
    window.location.href = 'admin.html';
  });

  document.getElementById('cart-btn')?.addEventListener('click', () => {
    openModal('cart-modal');
  });

  if (sessionStorage.getItem('openCart') === '1') {
    sessionStorage.removeItem('openCart');
    openModal('cart-modal');
  }

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal.id);
    });
  });
});
