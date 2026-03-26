const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const error = document.getElementById("error");

const users = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "staff", password: "1234", role: "staff" }
];

togglePassword.onclick = () => {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
};

loginBtn.onclick = () => {
    let password = passwordInput.value;

    let user = users.find(u => u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        error.textContent = "❌ Incorrect password";
    }
};