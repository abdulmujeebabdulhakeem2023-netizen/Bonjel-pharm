let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
let tbody = document.querySelector("tbody");

function getStatus(date) {
    let diff = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "🔴 Expired";
    if (diff <= 30) return "🟡 Expiring";
    return "🟢 Good";
}

function display(list) {
    tbody.innerHTML = "";

    list.forEach((m, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${m.name}</td>
            <td>₦${m.costPrice}</td>
            <td>₦${m.price}</td>
            <td>${m.quantity}</td>
            <td>${m.purchaseDate}</td>
            <td>${m.expiryDate}</td>
            <td>${getStatus(m.expiryDate)}</td>
            <td><button onclick="del(${i})">🗑️</button></td>
        </tr>`;
    });
}

function del(i) {
    if (!confirm("Delete?")) return;
    medicines.splice(i, 1);
    localStorage.setItem("medicines", JSON.stringify(medicines));
    display(medicines);
}

document.querySelector("form").onsubmit = (e) => {
    e.preventDefault();

    let m = {
        name: medName.value,
        costPrice: +medCostPrice.value,
        price: +medPrice.value,
        quantity: +medQuantity.value,
        purchaseDate: medPurchase.value,
        expiryDate: medExpiry.value
    };

    medicines.push(m);
    localStorage.setItem("medicines", JSON.stringify(medicines));
    display(medicines);
};

searchInput.oninput = () => {
    let v = searchInput.value.toLowerCase();
    display(medicines.filter(m => m.name.toLowerCase().includes(v)));
};

display(medicines);