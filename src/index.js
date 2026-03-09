document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signupForm");
    const loginForm = document.querySelector("#loginForm");
    const signupButton = document.querySelector("[data-signup-open]");
    const signupModal = document.querySelector("[data-signup]");
    const modalCloseBtns = document.querySelectorAll("[data-signup-close]");

    // Handle login form submission
    // Handle login form submission
    if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.querySelector("#loginForm input[type='email']").value;
        const password = document.querySelector("#loginForm input[type='password']").value;
        
        if (!email || !password) {
            alert("Please fill in both fields");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert("Login successful! Welcome to Simply Chocolate ");
                console.log("User data:", data);
                 // Hide the ENTIRE landing page
                const landingPage = document.querySelector(".landing-page");
                console.log("DEBUG: Found landing page:", landingPage);
                if (landingPage) {
                landingPage.classList.add("is-hidden");
                console.log("DEBUG: Hidden landing page");
                }
                const loginModal = document.querySelector("[data-login]");
                console.log("DEBUG: Found login modal:", loginModal); 
                if (loginModal) {
                    loginModal.classList.add("is-hidden");
                    console.log("DEBUG: Added is-hidden to login modal"); 
                }
                const mainContent = document.getElementById("main-content");
                console.log("DEBUG: Found main content:", mainContent);
                if (mainContent) {
                    mainContent.classList.remove("is-hidden");
                    console.log("DEBUG: Removed is-hidden from main content");
                    console.log("DEBUG: Main content classes now:", mainContent.className);
                }
            } else {
                alert("Login failed: " + data.error);
            }
        } catch (error) {
            alert("Something went wrong. Try again!");
            console.error("Login Error:", error);
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
    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.querySelector("#fullName").value;
            const email = document.querySelector("#signupEmail").value;
            const password = document.querySelector("#signupPassword").value;
            const confirmPassword = document.querySelector("#confirmPassword").value;
            const termsChecked = document.querySelector("#terms").checked;

            if (!name || !email || !password || !confirmPassword) {
                alert("All fields are required!");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (!termsChecked) {
                alert("You must agree to the Terms and Privacy Policy!");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Signup Successful! You can now log in.");
                    signupModal.classList.add("is-hidden"); // Close modal
                    signupForm.reset();
                } else {
                    alert("Error: " + data.error);
                }
            } catch (error) {
                alert("Something went wrong. Try again!");
                console.error("Signup Error:", error);
            }
        });
    }
});
