
function displayBorrowedBooks() {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const booksContainer = document.querySelector('.borrowed-books .english-books');
    const currentUser = localStorage.getItem("userName");
    
    if (!booksContainer) return;
    
    booksContainer.innerHTML = '<h2>Your Borrowed Books</h2><hr>';

    const userBooks = borrowedBooks.filter(book => book.userName === currentUser);

    if (userBooks.length === 0) {
        booksContainer.innerHTML += '<p>You have no borrowed books.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    userBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'container';
        
        bookElement.innerHTML = `
            <div class="img-item">
                <img src="${escapeHtml(book.imageSrc) || 'images/default.jpg'}" alt="${escapeHtml(book.title)}">
            </div>
            <div class="item">
                <h3>${escapeHtml(book.title)}</h3>
                <h4>${escapeHtml(book.author)}</h4>
                <p>${escapeHtml(book.description)}</p>
            </div>
            <div class="book">
                <button type="button" onclick="returnBook('${escapeHtml(book.bookId)}')" class="return-btn">Return Book</button>
            </div>
            <div class="clr"></div>
            <hr>
        `;
        fragment.appendChild(bookElement);
    });

    booksContainer.appendChild(fragment);
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function returnBook(bookId) {
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    let books = JSON.parse(localStorage.getItem('books')) || []; 
    
    const returnedBookIndex = borrowedBooks.findIndex(book => book.bookId === bookId);
    
    if (returnedBookIndex !== -1) {
        const returnedBook = borrowedBooks[returnedBookIndex];
        
        const bookIndex = books.findIndex(b => b.id === returnedBook.bookId);
        if (bookIndex !== -1) {
            books[bookIndex].available++;
            books[bookIndex].borrowed--;
            localStorage.setItem('books', JSON.stringify(books));
        }

        borrowedBooks.splice(returnedBookIndex, 1);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));

        displayBorrowedBooks();
    }
}

window.onload = displayBorrowedBooks;
