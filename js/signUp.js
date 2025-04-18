document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.getElementById("signUpForm");

    if (signUpForm) {
        signUpForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = signUpForm.querySelector("input[name='username']").value.trim();
            const email = signUpForm.querySelector("input[name='email']").value.trim();
            const password = signUpForm.querySelector("input[name='password']").value.trim();
            const confirmPassword = signUpForm.querySelector("input[name='confirm-password']").value.trim();
            const role = signUpForm.querySelector("input[name='choice']:checked")?.value;

            if (!username || !email || !password || !confirmPassword || !role) {
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const userData = {
                username,
                email,
                password,
                role: role === "option1" ? "admin" : "user"
            };

            localStorage.setItem("user", JSON.stringify(userData));
            alert("Account created successfully!");
            window.location.href = "signIn.html";
        });
    }
});

