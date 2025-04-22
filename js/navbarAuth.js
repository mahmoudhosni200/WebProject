document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const authBtn = document.getElementById("auth-btn");
    const userNameDisplay = document.getElementById("user-name");

    if (user && authBtn) {
        
        authBtn.textContent = "Log out";
        authBtn.addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location.href = "signIn.html";
        });

        
        if (userNameDisplay) {
            userNameDisplay.textContent = user.username;
        }
    } else if (authBtn) {
        
        authBtn.textContent = "Sign in";
        authBtn.addEventListener("click", function () {
            window.location.href = "signIn.html";
        });
    }
});
