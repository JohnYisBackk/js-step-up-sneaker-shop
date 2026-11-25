"use strict";

/* ========================================== */
/* SELECT ELEMENTS */
/* ========================================== */

// HEADER
const navLinks = document.querySelectorAll(".nav-link");

const searchBtn = document.querySelector("#searchBtn");
const favoritesBtn = document.querySelector("#favoritesBtn");
const cartBtn = document.querySelector("#cartBtn");
const cartCount = document.querySelector("#cartCount");
const profileBtn = document.querySelector("#profileBtn");
const searchInput = document.querySelector("#searchInput");

// HERO
const heroSneakerImage = document.querySelector("#heroSneakerImage");
const heroFavoritesBtn = document.querySelector(".hero-favorites-btn");

// CATEGORY TABS
const browseTabs = document.querySelectorAll(".browse-tab");

// FILTERS
const clearFiltersBtn = document.querySelector("#clearFiltersBtn");
const brandInputs = document.querySelectorAll('input[name="brand"]');
const colorInputs = document.querySelectorAll('input[name="color"]');
const priceRange = document.querySelector("#priceRange");
const maxPriceValue = document.querySelector("#maxPriceValue");

// PRODUCTS TOOLBAR
const resultsCount = document.querySelector("#resultsCount");
const favoritesOnlyInput = document.querySelector("#favoritesOnlyInput");
const sortSelect = document.querySelector("#sortSelect");

// SNEAKERS GRID
const sneakersGrid = document.querySelector("#sneakersGrid");

// PAGINATION
const paginationPages = document.querySelector("#paginationPages");
const prevPageBtn = document.querySelector("#prevPageBtn");
const nextPageBtn = document.querySelector("#nextPageBtn");

// CART PANEL
const cartPanel = document.querySelector("#cartPanel");
const cartOverlay = document.querySelector("#cartOverlay");
const closeCartBtn = document.querySelector("#closeCartBtn");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const clearCartBtn = document.querySelector("#clearCartBtn");

/* ========================================== */
/* DATA */
/* ========================================== */

const sneakers = [
  // ==========================================
  // NIKE
  // ==========================================

  {
    id: 1,
    name: "Air Jordan 1 High",
    brand: "Nike",
    color: "black",
    price: 189,
    category: "trending",
    image: "assets/nike-jordan1high.png",
    favorite: false,
  },
  {
    id: 2,
    name: "Dunk Low",
    brand: "Nike",
    color: "green",
    price: 129,
    category: "best",
    image: "assets/nike-dunk-low.png",
    favorite: false,
  },
  {
    id: 3,
    name: "Air Max 97",
    brand: "Nike",
    color: "green",
    price: 159,
    category: "new",
    image: "assets/nike-airmax-97.png",
    favorite: false,
  },
  {
    id: 4,
    name: "Jordan NBA",
    brand: "Nike",
    color: "white",
    price: 119,
    category: "best",
    image: "assets/nike-jordan-NBA.png",
    favorite: false,
  },

  // ==========================================
  // ADIDAS
  // ==========================================

  {
    id: 5,
    name: "Adidas Originals",
    brand: "Adidas",
    color: "all",
    price: 115,
    category: "trending",
    image: "assets/adidas-originals.png",
    favorite: false,
  },
  {
    id: 6,
    name: "Samba",
    brand: "Adidas",
    color: "white",
    price: 120,
    category: "best",
    image: "assets/adidas-samba.png",
    favorite: false,
  },
  {
    id: 7,
    name: "Yeezy",
    brand: "Adidas",
    color: "purple",
    price: 110,
    category: "new",
    image: "assets/adidas-yeezy.png",
    favorite: false,
  },
  {
    id: 8,
    name: "Superstars",
    brand: "Adidas",
    color: "white",
    price: 105,
    category: "trending",
    image: "assets/adidas-superstars.png",
    favorite: false,
  },

  // ==========================================
  // NEW BALANCE
  // ==========================================

  {
    id: 9,
    name: "New Balance Classic",
    brand: "New Balance",
    color: "white",
    price: 190,
    category: "new",
    image: "assets/new-balance-classic.png",
    favorite: false,
  },
  {
    id: 10,
    name: "New Balance White",
    brand: "New Balance",
    color: "white",
    price: 140,
    category: "best",
    image: "assets/new-balance-white.png",
    favorite: false,
  },
  {
    id: 11,
    name: "New Balance Tennis",
    brand: "New Balance",
    color: "blue",
    price: 125,
    category: "trending",
    image: "assets/new-balance-tennis.png",
    favorite: false,
  },
  {
    id: 12,
    name: "New Balance Red",
    brand: "New Balance",
    color: "red",
    price: 165,
    category: "new",
    image: "assets/new-balance-red.png",
    favorite: false,
  },

  // ==========================================
  // PUMA
  // ==========================================

  {
    id: 13,
    name: "Puma High",
    brand: "Puma",
    color: "green",
    price: 130,
    category: "new",
    image: "assets/puma-high.png",
    favorite: false,
  },
  {
    id: 14,
    name: "Puma Black Low",
    brand: "Puma",
    color: "black",
    price: 90,
    category: "best",
    image: "assets/puma-black-low.png",
    favorite: false,
  },
  {
    id: 15,
    name: "Puma White Low",
    brand: "Puma",
    color: "white",
    price: 95,
    category: "trending",
    image: "assets/puma-white-low.png",
    favorite: false,
  },
  {
    id: 16,
    name: "Puma Slipper",
    brand: "Puma",
    color: "green",
    price: 110,
    category: "new",
    image: "assets/puma-slipper.png",
    favorite: false,
  },
];

/* ========================================== */
/* STATE */
/* ========================================== */

let currentPage = 1;
let sneakersPerPage = 8;

let browseSneakers = "all";
let activeBrand = "all";
let activeColor = "all";
let activeSort = "default";
let maxPrice = Number(priceRange.value);

let favoritesOnly = false;
let showFavorites = false;

let searchTerm = "";
let searchQuery = "";

let cart = JSON.parse(localStorage.getItem("sneakerCart")) || [];

/* ========================================== */
/* SAVE / LOAD DATA */
/* ========================================== */

function saveCart() {
  localStorage.setItem("sneakerCart", JSON.stringify(cart));
}

function loadCart() {
  try {
    const storedCart = localStorage.getItem("sneakerCart");

    if (!storedCart) return;

    const parsedCart = JSON.parse(storedCart);

    if (Array.isArray(parsedCart)) {
      cart = parsedCart;
    }
  } catch (error) {
    console.error("Failed to load cart...", error);
  }
}

function saveData() {
  localStorage.setItem("miniSneakersCollection", JSON.stringify(sneakers));
}

function loadData() {
  try {
    const storedData = localStorage.getItem("miniSneakersCollection");

    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    if (Array.isArray(parsedData)) {
      sneakers.forEach((sneaker) => {
        const storedSneaker = parsedData.find((item) => item.id === sneaker.id);

        if (storedSneaker) {
          sneaker.favorite = storedSneaker.favorite === true;
        }
      });
    }
  } catch (error) {
    console.error("Failed to load sneakers...", error);
  }
}

/* ========================================== */
/* CATEGORY FILTER */
/* ========================================== */

function setCategory(category) {
  browseSneakers = category;

  currentPage = 1;

  renderSneakers();
}

/* ========================================== */
/* FILTER SNEAKERS */
/* ========================================== */

function filterSneakers() {
  const filteredSneakers = sneakers.filter((sneaker) => {
    const categoryMatch =
      browseSneakers === "all" || sneaker.category === browseSneakers;

    const brandMatch = activeBrand === "all" || sneaker.brand === activeBrand;

    const searchMatch =
      sneaker.name.toLowerCase().includes(searchQuery) ||
      sneaker.brand.toLowerCase().includes(searchQuery);

    const favoriteMatch = !showFavorites || sneaker.favorite;

    const colorMatch = activeColor === "all" || sneaker.color === activeColor;

    const priceMatch = sneaker.price <= maxPrice;

    return (
      categoryMatch &&
      brandMatch &&
      searchMatch &&
      favoriteMatch &&
      colorMatch &&
      priceMatch
    );
  });

  return filteredSneakers;
}

/* ========================================== */
/* SORT SNEAKERS */
/* ========================================== */

function sortSneakers(filteredSneakers) {
  const sortedSneakers = [...filteredSneakers];

  if (sortSelect.value === "price-low") {
    sortedSneakers.sort((a, b) => a.price - b.price);
  }

  if (sortSelect.value === "price-high") {
    sortedSneakers.sort((a, b) => b.price - a.price);
  }

  if (sortSelect.value === "name-az") {
    sortedSneakers.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sortedSneakers;
}

/* ========================================== */
/* RENDER SNEAKERS */
/* ========================================== */

function renderSneakers() {
  // RESET GRID
  sneakersGrid.replaceChildren();

  // GET FILTERED AND SORTED DATA
  const sortedSneakers = sortSneakers(filterSneakers());

  // PAGINATION CALCULATION
  const totalPages = Math.ceil(sortedSneakers.length / sneakersPerPage);

  currentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (currentPage - 1) * sneakersPerPage;
  const endIndex = startIndex + sneakersPerPage;

  // GET VISIBLE SNEAKERS
  const visibleSneakers = sortedSneakers.slice(startIndex, endIndex);

  // EMPTY STATE
  if (sortedSneakers.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.classList.add("empty-state");

    const title = document.createElement("h3");
    title.textContent = "No Sneakers found";

    const description = document.createElement("p");
    description.textContent =
      "Try adjusting your filters to find your perfect pair.";

    emptyState.append(title, description);
    sneakersGrid.appendChild(emptyState);
  }

  // RENDER CARDS
  visibleSneakers.forEach((sneaker) => {
    const card = createSneakerCard(sneaker);

    sneakersGrid.appendChild(card);
  });

  // UPDATE RESULTS COUNT
  const totalSneakers = sortedSneakers.length;

  const from = totalSneakers === 0 ? 0 : startIndex + 1;
  const to = Math.min(endIndex, totalSneakers);

  resultsCount.textContent = `Showing ${from}-${to} of ${totalSneakers} sneakers`;

  // RENDER PAGINATION
  renderPagination(totalPages);

  // INITIALIZE LUCIDE ICONS
  lucide.createIcons();
}

/* ========================================== */
/* CREATE SNEAKER CARD */
/* ========================================== */

function createSneakerCard(sneaker) {
  const card = document.createElement("article");
  card.classList.add("sneaker-card");

  const cardImage = document.createElement("div");
  cardImage.classList.add("sneaker-card-image");

  const badge = document.createElement("span");
  badge.classList.add("sneaker-badge");

  if (sneaker.category === "new") {
    badge.textContent = "New Arrival";
  } else if (sneaker.category === "best") {
    badge.textContent = "Best Seller";
  } else {
    badge.textContent = "Trending";
  }

  const favoriteBtn = document.createElement("button");
  favoriteBtn.type = "button";
  favoriteBtn.classList.add("sneaker-favorite-btn");

  favoriteBtn.setAttribute(
    "aria-label",
    sneaker.favorite ? "Remove from favorites" : "Add to favorites",
  );

  if (sneaker.favorite) {
    favoriteBtn.classList.add("active");
  }

  const heartIcon = document.createElement("i");
  heartIcon.setAttribute("data-lucide", "heart");

  favoriteBtn.appendChild(heartIcon);

  favoriteBtn.addEventListener("click", () => {
    sneaker.favorite = !sneaker.favorite;

    saveData();
    renderSneakers();
  });

  const image = document.createElement("img");

  image.src = sneaker.image;
  image.alt = sneaker.name;
  image.loading = "lazy";

  cardImage.append(badge, favoriteBtn, image);

  const cardContent = document.createElement("div");
  cardContent.classList.add("sneaker-card-content");

  // BRAND
  const brand = document.createElement("span");
  brand.classList.add("sneaker-brand");
  brand.textContent = sneaker.brand;

  // NAME
  const name = document.createElement("h3");
  name.classList.add("sneaker-name");
  name.textContent = sneaker.name;

  const cardBottom = document.createElement("div");
  cardBottom.classList.add("sneaker-card-bottom");

  // PRICE
  const price = document.createElement("span");
  price.classList.add("sneaker-price");
  price.textContent = `€${sneaker.price}`;

  // ADD TO CART BUTTON
  const addCartBtn = document.createElement("button");

  addCartBtn.type = "button";
  addCartBtn.classList.add("sneaker-add-btn");
  addCartBtn.setAttribute("aria-label", "Add to cart");

  const cartIcon = document.createElement("i");

  cartIcon.setAttribute("data-lucide", "shopping-cart");

  addCartBtn.appendChild(cartIcon);

  addCartBtn.addEventListener("click", () => {
    addToCart(sneaker.id);
    openCart();
  });

  // VIEW BUTTON
  const viewBtn = document.createElement("button");
  viewBtn.type = "button";
  viewBtn.classList.add("sneaker-view-btn");

  viewBtn.setAttribute("aria-label", "View sneaker");

  const arrowIcon = document.createElement("i");
  arrowIcon.setAttribute("data-lucide", "arrow-up-right");

  viewBtn.append(arrowIcon);

  // VIEW EVENT
  viewBtn.addEventListener("click", () => {
    heroSneakerImage.src = sneaker.image;
    heroSneakerImage.alt = sneaker.name;

    document.querySelector("#home").scrollIntoView({
      behavior: "smooth",
    });
  });

  const cardActions = document.createElement("div");
  cardActions.classList.add("sneaker-card-actions");

  cardActions.append(addCartBtn, viewBtn);

  cardBottom.append(price, cardActions);

  cardContent.append(brand, name, cardBottom);
  card.append(cardImage, cardContent);

  return card;
}

/* ========================================== */
/* PAGINATION */
/* ========================================== */

function renderPagination(totalPages) {
  // RESET PAGE BUTTONS
  paginationPages.replaceChildren();

  // CREATE PAGE BUTTONS
  for (let page = 1; page <= totalPages; page++) {
    const pageBtn = document.createElement("button");

    pageBtn.type = "button";
    pageBtn.textContent = page;

    if (page === currentPage) {
      pageBtn.classList.add("active");
      pageBtn.setAttribute("aria-current", "page");
    }

    pageBtn.addEventListener("click", () => {
      currentPage = page;

      renderSneakers();
    });

    paginationPages.append(pageBtn);
  }

  // PREVIOUS / NEXT BUTTON STATE
  prevPageBtn.disabled = currentPage <= 1;

  nextPageBtn.disabled = totalPages === 0 || currentPage >= totalPages;
}

/* ========================================== */
/* HEADER ACTIONS */
/* ========================================== */

searchBtn.addEventListener("click", () => {
  searchInput.classList.toggle("active");

  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
});

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.toLowerCase().trim();

  currentPage = 1;

  renderSneakers();
});

favoritesBtn.addEventListener("click", () => {
  showFavorites = !showFavorites;

  favoritesBtn.classList.toggle("active", showFavorites);
  favoritesOnlyInput.checked = showFavorites;

  currentPage = 1;
  renderSneakers();
});

function openCart() {
  cartPanel.classList.add("active");
  cartOverlay.classList.add("active");

  document.body.classList.add("no-scroll");

  renderCart();
}

function closeCart() {
  cartPanel.classList.remove("active");
  cartOverlay.classList.remove("active");

  document.body.classList.remove("no-scroll");
}

/* ========================================== */
/* RESET FILTERS */
/* ========================================== */

/* ========================================== */
/* CART LOGIC */
/* ========================================== */

function addToCart(id) {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1,
    });
  }

  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function changeQuantity(id, amount) {
  const item = cart.find((item) => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  updateCart();
}

function clearCart() {
  cart = [];

  updateCart();
}

function updateCartCount() {
  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalQuantity;
}

function updateCart() {
  saveCart();
  updateCartCount();
  renderCart();
}

/* ========================================== */
/* RENDER CART */
/* ========================================== */

function renderCart() {
  cartItems.replaceChildren();

  let total = 0;

  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.classList.add("cart-empty");
    emptyMessage.textContent = "Your cart is empty.";

    cartItems.append(emptyMessage);
  }

  cart.forEach((item) => {
    const sneaker = sneakers.find((sneaker) => sneaker.id === item.id);

    if (!sneaker) return;

    total += sneaker.price * item.quantity;

    const cartItem = createCartItem(sneaker, item);

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = `€${total.toFixed(2)}`;

  lucide.createIcons();
}

function createCartItem(sneaker, item) {
  const cartItem = document.createElement("div");

  cartItem.classList.add("cart-item");

  cartItem.innerHTML = `
    <img
      src="${sneaker.image}"
      alt="${sneaker.name}"
      class="cart-item-image"
    />

    <div class="cart-item-info">
      <h3 class="cart-item-name">${sneaker.name}</h3>

      <p class="cart-item-price">
        €${sneaker.price} 
      </p>

      <div class="cart-quantity">
        <button type="button" class="cart-quantity-btn minus-btn"
          aria-label="Decrease quantity">-</button>

        <span>${item.quantity}</span>

        <button type="button" class="cart-quantity-btn plus-btn"
          aria-label="Increase quantity">+</button>
      </div>
    </div>

    <button type="button" class="cart-remove-btn"
      aria-label="Remove sneaker">
      <i data-lucide="trash-2"></i>
    </button>
  `;

  const minusBtn = cartItem.querySelector(".minus-btn");
  const plusBtn = cartItem.querySelector(".plus-btn");
  const removeBtn = cartItem.querySelector(".cart-remove-btn");

  minusBtn.addEventListener("click", () => {
    changeQuantity(sneaker.id, -1);
  });

  plusBtn.addEventListener("click", () => {
    changeQuantity(sneaker.id, 1);
  });

  removeBtn.addEventListener("click", () => {
    removeFromCart(sneaker.id);
  });

  return cartItem;
}

/* ========================================== */
/* EVENT LISTENERS */
/* ========================================== */

prevPageBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;

  currentPage--;

  renderSneakers();
});

nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filterSneakers().length / sneakersPerPage);

  if (currentPage >= totalPages) return;

  currentPage++;

  renderSneakers();
});

cartBtn.addEventListener("click", openCart);

closeCartBtn.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);

clearCartBtn.addEventListener("click", clearCart);

browseTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    browseSneakers = tab.dataset.category;

    browseTabs.forEach((btn) => {
      btn.classList.remove("active");
    });

    tab.classList.add("active");

    currentPage = 1;
    renderSneakers();
  });
});

favoritesOnlyInput.addEventListener("change", () => {
  showFavorites = favoritesOnlyInput.checked;

  favoritesBtn.classList.toggle("active", showFavorites);

  currentPage = 1;
  renderSneakers();
});

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderSneakers();
});

brandInputs.forEach((input) => {
  input.addEventListener("change", () => {
    activeBrand = input.value;

    currentPage = 1;
    renderSneakers();
  });
});

colorInputs.forEach((input) => {
  input.addEventListener("change", () => {
    activeColor = input.value;

    currentPage = 1;
    renderSneakers();
  });
});

priceRange.addEventListener("input", () => {
  maxPrice = Number(priceRange.value);

  maxPriceValue.textContent = `€${maxPrice}`;

  currentPage = 1;
  renderSneakers();
});

/* ========================================== */
/* INITIALIZE APP */
/* ========================================== */

function initApp() {
  loadData();
  loadCart();
  renderSneakers();
  updateCart();
}

initApp();
