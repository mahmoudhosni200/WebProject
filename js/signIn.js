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

            
            const users = JSON.parse(localStorage.getItem("users")) || [];

           
            const matchedUser = users.find(user => user.username === username && user.password === password);

            if (matchedUser) {
                alert("Login successful!");

                
                localStorage.setItem("user", JSON.stringify(matchedUser));

                
                if (matchedUser.role === "admin") {
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

