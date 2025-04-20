function displayBorrowedBooks() {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const booksContainer = document.querySelector('.borrowed-books .english-books');
    
    
    booksContainer.innerHTML = '<h2>Your Borrowed Books</h2><hr>';

    if (borrowedBooks.length === 0) {
        booksContainer.innerHTML += '<p>You have no borrowed books.</p>';
        return;
    }

    borrowedBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'container';
        bookElement.innerHTML = `
            <div class="img-item">
                <img src="${book.imageSrc}" alt="${book.title}">
            </div>
            <div class="item">
                <h3>${book.title}</h3>
                <h4>${book.author}</h4>
                <p>${book.description}</p>
            </div>
            <div class="book">
                <button type="button" onclick="returnBook(${book.id})" class="return-btn">Return Book</button>
            </div>
            <div class="clr"></div>
            <hr>
        `;
        booksContainer.appendChild(bookElement);
    });
}

function returnBook(bookId) {
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    let returnedBook = borrowedBooks.find(book => book.id === bookId);
    
    if (returnedBook) {
        
        let bookData = JSON.parse(localStorage.getItem('libraryBooks')) || {};
        if (bookData[returnedBook.title]) {
            bookData[returnedBook.title].available++;
            bookData[returnedBook.title].borrowed--;
            localStorage.setItem('libraryBooks', JSON.stringify(bookData));
        }

        
        borrowedBooks = borrowedBooks.filter(book => book.id !== bookId);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));

        displayBorrowedBooks();
    
    }
}

window.onload = displayBorrowedBooks;