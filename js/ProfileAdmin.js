document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        
        const nameElement = document.querySelector(".right-header");
        if (nameElement) {
            nameElement.textContent = user.username;
        }

        
        const emailElement = document.querySelector(".mail");
        if (emailElement) {
            emailElement.textContent = user.email;
        }

        
        const infoSection = document.querySelector(".left");
        if (infoSection) {
            const roleParagraph = document.createElement("p");
            roleParagraph.textContent = `Role: ${user.role}`;
            infoSection.appendChild(roleParagraph);
        }
    } else {
        
        alert("Please sign in first.");
        window.location.href = "signIn.html";
    }
});
