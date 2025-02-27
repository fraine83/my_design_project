// const express = require("express");
// const router = express.Router();

// // Sample route
// router.get("/", (req, res) => {
//     res.json({ message: "Welcome to the API!" });
// });

// // Example users route
// router.get("/users", (req, res) => {
//     res.json([
//         { id: 1, name: "Alice" },
//         { id: 2, name: "Bob" },
//     ]);
// });

// module.exports = router;

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Hide login modal
                    document.getElementById("login_modal").classList.add("is-hidden");

                    // Show main content
                    document.getElementById("main-content").classList.remove("is-hidden");

                    alert("Login successful! Welcome to Simply Chocolate 🍫");
                } else {
                    alert("Login failed: " + data.error);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Try again!");
            }
        });
    }
});
