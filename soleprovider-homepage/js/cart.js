class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
    }

    initializeElements() {
        this.cartButton = document.getElementById('cart-button');
        this.cartCount = document.getElementById('cart-count');
        this.cartItems = document.getElementById('cart-items');
        this.checkoutContainer = document.getElementById('checkout-container');
        this.cartContainer = document.getElementById('cart-container');
        this.addToCartButtons = document.querySelectorAll('.add-to-cart');
    }

    bindEvents() {
        if (this.cartButton) {
            this.cartButton.addEventListener('click', () => window.location.href = 'checkout.html');
        }

        this.addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.addItem(button.getAttribute('data-item'));
            });
        });
    }

    updateUI() {
        this.updateCartCount();
        this.displayCart();
        this.updateCheckout();
    }

    addItem(item) {
        if (!item) return; // Prevent undefined items
        const button = [...this.addToCartButtons].find(btn => btn.getAttribute('data-item') === item);
        if (!button) return; // Prevent adding items without proper button reference
        
        const productCard = button.closest('.card');
        const productImage = productCard.querySelector('.card-img-top').src;
        const productName = item;
        
        this.cart.push({
            name: productName,
            image: productImage
        });
        
        this.saveCart();
        this.updateUI();
    }

    removeItem(itemName) {
        const index = this.cart.findIndex(item => item.name === itemName);
        if (index > -1) {
            this.cart.splice(index, 1);
            this.saveCart();
            
            // Update all UI elements
            this.updateCartCount();
            this.displayCart();
            
            // Special handling for checkout page
            if (window.location.pathname.endsWith('checkout.html')) {
                const cartItems = document.getElementById('cart-items');
                if (cartItems) {
                    cartItems.innerHTML = this.cart.length ? 
                        this.renderCartItems(cartItems) :
                        '<li class="list-group-item">Your cart is empty</li>';
                }
            }
        }
    }

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        } catch (e) {
            console.error('Failed to save cart:', e);
        }
    }

    updateCartCount() {
        if (this.cartCount) {
            this.cartCount.textContent = this.cart.length;
        }
    }

    displayCart() {
        if (this.cartContainer) {
            this.cartContainer.innerHTML = this.cart.length ? 
                this.renderCartItems(this.cartContainer) :
                '<p>Your cart is empty</p>';
        }
    }

    updateCheckout() {
        if (this.cartItems) {
            this.cartItems.innerHTML = this.cart.length ? 
                this.renderCartItems(this.cartItems) :
                '<li class="list-group-item">Your cart is empty</li>';
        }
    }

    renderCartItems(container) {
        return this.cart.map(item => `
            <${container.id === 'cart-items' ? 'li' : 'div'} class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 15px;">
                    <span>${item.name}</span>
                </div>
                <button class="btn btn-sm btn-danger" onclick="window.cart.removeItem('${item.name}')">Remove</button>
            </${container.id === 'cart-items' ? 'li' : 'div'}>
        `).join('');
    }
}

// Initialize cart only if it hasn't been initialized yet
if (!window.cart) {
    document.addEventListener('DOMContentLoaded', () => {
        window.cart = new ShoppingCart();
    });
}
