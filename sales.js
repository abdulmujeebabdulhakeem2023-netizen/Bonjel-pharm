let sales = JSON.parse(localStorage.getItem("sales")) || [];
let today = new Date();
let todayStr = new Date().toLocaleDateString();

// ── DISPLAY SALES IN TABLE ─────────────────────────
function displaySales(list) {
    let tbody = document.getElementById("salesTableBody");
    tbody.innerHTML = "";

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">No sales found!</td></tr>`;
        return;
    }

    list.slice().reverse().forEach(sale => {
        let profitColor = sale.profit >= 0 ? "green" : "red";
        let profitText = sale.profit >= 0 
            ? `₦${sale.profit.toLocaleString()}` 
            : `-₦${Math.abs(sale.profit).toLocaleString()}`;

        let row = `
            <tr>
                <td>${sale.date}</td>
                <td>${sale.name}</td>
                <td>${sale.quantity}</td>
                <td>₦${sale.costPrice}</td>
                <td>₦${sale.sellingPrice}</td>
                <td style="color:${profitColor}">${profitText}</td>
                <td>₦${sale.total.toLocaleString()}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// ── UPDATE SUMMARY CARDS ───────────────────────────
function updateCards(list) {
    document.getElementById("totalSales").textContent = 
        `🛒 Total Sales: ${list.length}`;

    let totalRevenue = list.reduce((sum, sale) => sum + sale.total, 0);
    document.getElementById("totalRevenue").textContent = 
        `📈 Total Revenue: ₦${totalRevenue.toLocaleString()}`;

    let totalProfit = list.reduce((sum, sale) => sum + sale.profit, 0);
    document.getElementById("totalProfit").textContent = totalProfit >= 0
        ? `💵 Total Profit: ₦${totalProfit.toLocaleString()}`
        : `💵 Total Loss: ₦${Math.abs(totalProfit).toLocaleString()}`;

    let todaySales = list.filter(sale => sale.date === todayStr);
    let todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    document.getElementById("todayRevenue").textContent = 
        `🧾 Today's Revenue: ₦${todayRevenue.toLocaleString()}`;
}

// ── FILTER BUTTONS ─────────────────────────────────
document.getElementById("filterToday").addEventListener("click", function() {
    let filtered = sales.filter(sale => sale.date === todayStr);
    displaySales(filtered);
    updateCards(filtered);
});

document.getElementById("filterWeek").addEventListener("click", function() {
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    let filtered = sales.filter(sale => new Date(sale.date) >= weekAgo);
    displaySales(filtered);
    updateCards(filtered);
});

document.getElementById("filterMonth").addEventListener("click", function() {
    let monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    let filtered = sales.filter(sale => new Date(sale.date) >= monthAgo);
    displaySales(filtered);
    updateCards(filtered);
});

// ── LOAD ALL SALES ON START ────────────────────────
displaySales(sales);
updateCards(sales);