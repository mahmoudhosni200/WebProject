function borrowBook(button) {
    let user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        alert("Please sign in first to borrow books.");
        window.location.href = "signIn.html";
        return;
    }

    let bookContainer = button.closest(".book");
    let container = bookContainer.closest(".container");
    let bookId = container.querySelector('p')?.getAttribute('data-book-id');
    let bookTitle = container.querySelector("h3").innerText;
    let bookAuthor = containerPlants.querySelector("h4").innerText.replace("Author: ", "").replace("تأليف: ", "").replace("المؤلف: ", "");
    let bookDescription = container.querySelector("p").innerText;
    let bookImage = container.querySelector("img").src;

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1 && books[bookIndex].available > 0) {
        books[bookIndex].available--;
        books[bookIndex].borrowed++;
        localStorage.setItem('books', JSON.stringify(books));

        let username = localStorage.getItem("userName");
        addToBorrowedBooks({
            userName: username,
            bookId: bookId,
            title: bookTitle,
            author: bookAuthor,
            description: bookDescription,
            imageSrc: bookImage,
            id: Date.now()
        });

        displayBooks();
    } else {
        alert("No books available to borrow.");
    }
}

function addToBorrowedBooks(book) {
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    borrowedBooks.push(book);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
}