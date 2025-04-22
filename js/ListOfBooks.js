function borrowBook(button) {
    // Get the container of the clicked button
    let bookContainer = button.closest(".book");

    // Get the available and borrowed elements within this container
    let availableElem = bookContainer.querySelector(".available");
    let borrowedElem = bookContainer.querySelector(".borrowed");

    // Extract numbers using RegExp
    let available = parseInt(availableElem.innerText.match(/\d+/)[0]);
    let borrowed = parseInt(borrowedElem.innerText.match(/\d+/)[0]);

    if (available > 0) {
        available--;
        borrowed++;
        availableElem.innerText = `Available: ${available}`;
        borrowedElem.innerText = `Borrowed: ${borrowed}`;
    } else {
        alert("No books available to borrow.");
    }
}
