let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

let cart = [];
let selectedIndex = -1;

const f = n => `₦${n.toLocaleString()}`;

// SEARCH
sellSearch.oninput = () => {
    let v = sellSearch.value.toLowerCase();
    searchResults.innerHTML = "";

    medicines.filter(m => m.name.toLowerCase().includes(v))
        .forEach(m => {
            let d = document.createElement("div");
            d.textContent = `${m.name} | ${m.quantity} left`;
            d.onclick = () => {
                sellName.value = m.name;
                sellPrice.value = m.price;
                selectedIndex = medicines.indexOf(m);
                searchResults.innerHTML = "";
            };
            searchResults.appendChild(d);
        });
};

// CART
function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((c, i) => {
        let div = document.createElement("div");
        div.innerHTML = `${c.name} x${c.quantity} - ${f(c.total)}`;

        let btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = () => {
            cart.splice(i, 1);
            updateCart();
        };

        div.appendChild(btn);
        cartList.appendChild(div);

        total += c.total;
    });

    cartTotal.textContent = f(total);
}

// ADD
addToCart.onclick = () => {
    let qty = +sellQty.value;
    let price = +sellPrice.value;

    if (selectedIndex === -1) return alert("Select medicine");

    let m = medicines[selectedIndex];

    if (qty > m.quantity) return alert("Not enough stock");

    let total = qty * price;
    let profit = total - qty * m.costPrice;

    cart.push({
        name: m.name,
        quantity: qty,
        total,
        profit,
        index: selectedIndex,
        costPrice: m.costPrice,
        price
    });

    updateCart();
    sellForm.reset();
};

// RECEIPT
function receipt(cart, total) {
    let w = window.open("", "", "width=300,height=500");

    let html = `<h2>💊 Bonjel</h2><hr>`;
    cart.forEach(i => html += `<p>${i.name} x${i.quantity} - ${f(i.total)}</p>`);
    html += `<hr><h3>${f(total)}</h3>`;

    w.document.write(html);
    w.print();
}

// SELL
sellBtn.onclick = () => {
    if (!cart.length) return alert("Cart empty");

    let total = 0;

    cart.forEach(c => {
        medicines[c.index].quantity -= c.quantity;

        sales.push({
            ...c,
            sellingPrice: c.price,
            date: new Date().toLocaleDateString()
        });

        total += c.total;
    });

    localStorage.setItem("medicines", JSON.stringify(medicines));
    localStorage.setItem("sales", JSON.stringify(sales));

    receipt(cart, total);

    cart = [];
    updateCart();
};