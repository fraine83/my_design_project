document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    const signupButton = document.querySelector("[data-signup-open]");
    const signupModal = document.querySelector("[data-signup]");
    const modalCloseBtns = document.querySelectorAll("[data-signup-close]");

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.querySelector("#loginForm input[type='email']").value;
            const password = document.querySelector("#loginForm input[type='password']").value;
            
            if (email && password) {
                console.log("Logging in with:", email, password);
                alert("Login successful! (Fake response for now)");
            } else {
                alert("Please fill in both fields");
            }
        });
    }

    // Show signup modal
    if (signupButton && signupModal) {
        signupButton.addEventListener("click", () => {
            signupModal.classList.remove("is-hidden");
        });
    }

    // Close signup modal
    if (modalCloseBtns) {
        modalCloseBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                signupModal.classList.add("is-hidden");
            });
        });
    }
});