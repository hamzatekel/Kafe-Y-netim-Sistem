let selectedTable = null;
let cart = {};

function selectTable(tableNumber) {
    selectedTable = tableNumber;
    document.querySelectorAll('.tables button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('table' + tableNumber).classList.add('active');
    cart = {}; // Masa değişince sepeti temizle
    renderCart();
}

function addToCart(itemName, price) {
    if (!selectedTable) {
        alert('Önce masa seçin!');
        return;
    }
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = { price: price, quantity: 1 };
    }
    renderCart();
}

function removeFromCart(itemName) {
    delete cart[itemName];
    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    for (const item in cart) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `${item} x${cart[item].quantity} - ₺${cart[item].price * cart[item].quantity} <button onclick="removeFromCart('${item}')">Sil</button>`;
        cartItemsDiv.appendChild(cartItem);
        total += cart[item].price * cart[item].quantity;
    }
    document.getElementById('totalPrice').innerText = total;
}

function pay() {
    if (!selectedTable) {
        alert('Önce masa seçin!');
        return;
    }
    if (Object.keys(cart).length === 0) {
        alert('Sepet boş!');
        return;
    }
    alert(`Masa ${selectedTable} için toplam ödeme: ₺${document.getElementById('totalPrice').innerText}`);
    cart = {};
    renderCart();
    document.querySelectorAll('.tables button').forEach(btn => btn.classList.remove('active'));
    selectedTable = null;
}
