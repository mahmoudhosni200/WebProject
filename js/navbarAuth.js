document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    const userNameSpanLarge = document.getElementById('user-name-large');
    const userNameSpanSmall = document.getElementById('user-name-small');
    const authBtnLarge = document.getElementById('auth-btn-large');
    const authBtnSmall = document.getElementById('auth-btn-small');
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const navLinksSmall = document.querySelectorAll(".side-menu .nav-links li a");

    if (user) {
        [userNameSpanLarge, userNameSpanSmall].forEach(span => {
            if (span) span.textContent = user.username;
        });

        [authBtnLarge, authBtnSmall].forEach(btn => {
            if (btn) {
                btn.textContent = 'Logout';
                btn.classList.remove('sign-in-btn');
                btn.classList.add('logout-btn');

                btn.addEventListener('click', function() {
                    localStorage.removeItem('user');
                    sessionStorage.removeItem('user');
                    window.location.href = 'index.html';
                });
            }
        });

    } else {
        [authBtnLarge, authBtnSmall].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    window.location.href = 'signIn.html';
                });
            }
        });
    }

    menuToggle.addEventListener("click", () => {
        sideMenu.classList.add("open");
    });

    closeMenu.addEventListener("click", () => {
        sideMenu.classList.remove("open");
    });

    navLinksSmall.forEach(link => {
        link.addEventListener("click", () => {
            sideMenu.classList.remove("open");
        });
    });

    const allNavLinks = document.querySelectorAll(".nav-links li a");

    allNavLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }

        link.addEventListener("click", function() {
            allNavLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
