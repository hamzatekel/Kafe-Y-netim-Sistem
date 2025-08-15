let selectedTable = null;
let cart = {};

function selectTable(tableNumber) {
    selectedTable = tableNumber;
    document.querySelectorAll('.tables button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('table' + tableNumber).classList.add('active');
    cart = {};
    renderCart();
    hidePaymentOptions();
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

function toggleCategory(header) {
    const itemsDiv = header.nextElementSibling;
    itemsDiv.style.display = itemsDiv.style.display === 'block' ? 'none' : 'block';
}

function showPaymentOptions() {
    if (!selectedTable) {
        alert('Önce masa seçin!');
        return;
    }
    if (Object.keys(cart).length === 0) {
        alert('Sepet boş!');
        return;
    }
    document.getElementById('paymentOptions').style.display = 'block';
}

function hidePaymentOptions() {
    document.getElementById('paymentOptions').style.display = 'none';
}

function pay(method) {
    alert(`Masa ${selectedTable} için toplam ödeme: ₺${document.getElementById('totalPrice').innerText}\nÖdeme şekli: ${method === 'nakit' ? 'Nakit' : 'Kredi Kartı'}`);
    cart = {};
    renderCart();
    document.querySelectorAll('.tables button').forEach(btn => btn.classList.remove('active'));
    selectedTable = null;
    hidePaymentOptions();
}
