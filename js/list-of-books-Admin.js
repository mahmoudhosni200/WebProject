function updateBookDescription(bookId, newDescription) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex].description = newDescription;
        localStorage.setItem('books', JSON.stringify(books));
    }
    displayBooks(); 
}


function deleteBook(bookId) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}


function editBook(bookId, bookTitle) {
    if (!bookId || !bookTitle) {
        console.error("Book data is incomplete!");
        return;
    }
    const encodedTitle = encodeURIComponent(bookTitle);
    window.location.href = `Edit_Book.html?book_id=${bookId}&book_name=${encodedTitle}`;
}

window.onload = function () {
    document.querySelectorAll('p[data-book-id]').forEach(function(p) {
        const bookId = p.getAttribute('data-book-id');
        const updatedDescription = localStorage.getItem(`updatedDescription_${bookId}`);
        if (updatedDescription) {
            updateBookDescription(bookId, updatedDescription);
            localStorage.removeItem(`updatedDescription_${bookId}`); 
        }
    });

    const deletedBooks = JSON.parse(localStorage.getItem('deletedBooks')) || [];
    deletedBooks.forEach(function(bookIdToDelete) {
        deleteBook(bookIdToDelete);
    });
    localStorage.removeItem('deletedBooks');

    displayBooks();
};