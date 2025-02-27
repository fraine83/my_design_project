document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signupForm");
    const loginForm = document.querySelector("#login-form");
   

    // Handle Login Form Submission
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

    // Handle Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("fullName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const termsChecked = document.getElementById("terms").checked;

            // Validate required fields
            if (!name || !email || !password || !confirmPassword) {
                alert("All fields are required!");
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Check if terms are agreed to
            if (!termsChecked) {
                alert("You must agree to the Terms and Privacy Policy!");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Signup successful! You can now log in.");
                    // Close the signup modal
                    document.querySelector("[data-signup]").classList.add("is-hidden");
                    // Reset the form
                    signupForm.reset();
                } else {
                    alert("Error: " + data.error);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Try again!");
            }
        });
    }
});