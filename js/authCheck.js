document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || isLoggedIn !== "true") {
        alert("Please sign in first."); 
        window.location.href = "signIn.html"; 
    }
});

