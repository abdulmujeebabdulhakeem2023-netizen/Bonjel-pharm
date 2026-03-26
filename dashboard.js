let meds = JSON.parse(localStorage.getItem("medicines")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

const f = n => `₦${n.toLocaleString()}`;

totalMedicines.textContent = `💊 ${meds.length}`;

let val = meds.reduce((s, m) => s + m.price * m.quantity, 0);
totalValue.textContent = f(val);

let exp = meds.filter(m => (new Date(m.expiryDate) - new Date()) / 86400000 <= 30);
expiringSoon.textContent = `⚠️ ${exp.length}`;

let rev = sales.reduce((s, x) => s + x.total, 0);
totalRevenue.textContent = f(rev);

let prof = sales.reduce((s, x) => s + x.profit, 0);
totalProfit.textContent = prof >= 0 ? f(prof) : `-${f(Math.abs(prof))}`;

let today = new Date().toLocaleDateString();
let ts = sales.filter(s => s.date === today);

todayRevenue.textContent = f(ts.reduce((s, x) => s + x.total, 0));
todayProfit.textContent = f(ts.reduce((s, x) => s + x.profit, 0));