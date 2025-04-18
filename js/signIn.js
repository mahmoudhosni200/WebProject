document.addEventListener("DOMContentLoaded", function () {
    const signInForm = document.querySelector("form.sign-in");

    if (signInForm) {
        signInForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = signInForm.querySelector("input[name='username']").value.trim();
            const password = signInForm.querySelector("input[name='password']").value.trim();

            if (!username || !password) {
                alert("Please fill in all fields.");
                return;
            }

            
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (!storedUser) {
                alert("No user registered yet!");
                return;
            }

            
            if (username === storedUser.username && password === storedUser.password) {
                alert("Login successful!");

                if (storedUser.role === "admin") {
                    window.location.href = "homeAdmin.html";
                } else {
                    window.location.href = "home.html";
                }
            } else {
                alert("Invalid username or password.");
            }
        });
    }
});
