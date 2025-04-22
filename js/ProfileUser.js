document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

    if (user) {
        const nameElement = document.querySelector(".right-header");
        const emailElement = document.querySelector(".mail");
        const infoSection = document.querySelector(".left");
        const penIcon = document.querySelector(".pen");

        
        if (nameElement) nameElement.textContent = user.username;
        if (emailElement) emailElement.textContent = user.email;

        if (infoSection) {
            const roleParagraph = document.createElement("p");
            roleParagraph.textContent = `Role: ${user.role}`;
            infoSection.appendChild(roleParagraph);
        }

        penIcon.addEventListener("click", function () {
           
            const alreadyEditing = document.querySelector(".edit-input") || document.querySelector(".save-btn");
            if (alreadyEditing) return;

            const rightDiv = document.querySelector(".right");

            const nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = user.username;
            nameInput.classList.add("edit-input");

            const passInput = document.createElement("input");
            passInput.type = "password";
            passInput.placeholder = "New Password";
            passInput.classList.add("edit-input");

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save Changes";
            saveBtn.classList.add("save-btn");

            nameElement.replaceWith(nameInput);
            rightDiv.appendChild(passInput);
            rightDiv.appendChild(saveBtn);

            saveBtn.addEventListener("click", function () {
                const newName = nameInput.value.trim();
                const newPass = passInput.value.trim();

                if (!newName || !newPass) {
                    alert("Please fill in both fields.");
                    return;
                }

                const storage = localStorage.getItem("user") ? localStorage : sessionStorage;

                const allUsers = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = allUsers.map(u => {
                    if (u.username === user.username && u.email === user.email) {
                        return { ...u, username: newName, password: newPass };
                    }
                    return u;
                });

                localStorage.setItem("users", JSON.stringify(updatedUsers));
                const updatedUser = { ...user, username: newName, password: newPass };
                storage.setItem("user", JSON.stringify(updatedUser));
                user = updatedUser;

                nameElement.textContent = newName;
                nameInput.replaceWith(nameElement);
                passInput.remove();
                saveBtn.remove();
            });
        });
    } else {
        alert("Please sign in first.");
        window.location.href = "signIn.html";
    }
});


