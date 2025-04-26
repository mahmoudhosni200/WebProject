document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    const userNameSpan = document.getElementById('user-name');
    const authBtn = document.getElementById('auth-btn');

    if (user) {
        userNameSpan.textContent = user.username;
        authBtn.textContent = 'Logout';
        authBtn.classList.remove('sign-in-btn');
        authBtn.classList.add('logout-btn');

        authBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            
            window.location.href = 'index.html';
        });
    } else {
        authBtn.addEventListener('click', function() {
            window.location.href = 'signIn.html';
        });
    }
});