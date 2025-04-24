
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('book_id');
    const bookName = params.get('book_name');

    if (bookId && bookName) {
        document.getElementById('book_id').value = bookId;
        document.getElementById('book_name').value = bookName;
    } else {
        alert("Book data not found!");
    }

    document.getElementById('updateBookButton').addEventListener('click', function(event) {
        event.preventDefault();  

        const newDescription = document.getElementById('description').value.trim();
        const bookId = document.getElementById('book_id').value;

        if (newDescription !== "") {
            let books = JSON.parse(localStorage.getItem('books')) || [];
            const index = books.findIndex(book => book.id === bookId);
            if (index !== -1) {
                books[index].description = newDescription;
                localStorage.setItem('books', JSON.stringify(books));
            } else {
                localStorage.setItem(`updatedDescription_${bookId}`, newDescription);
            }
            window.location.href = "List-of-Books-Admin.html";
        } else {
            alert("Please enter a new description.");
        }
    });

    document.getElementById('deleteBookButton').addEventListener('click', function(event) {
        event.preventDefault();
        if (confirm("Are you sure you want to delete this book?")) {
            const bookId = document.getElementById('book_id').value;
            let books = JSON.parse(localStorage.getItem('books')) || [];
            books = books.filter(book => book.id !== bookId);
            localStorage.setItem('books', JSON.stringify(books));

            const deletedBooks = JSON.parse(localStorage.getItem('deletedBooks')) || [];
            if (!deletedBooks.includes(bookId)) {
                deletedBooks.push(bookId);
                localStorage.setItem('deletedBooks', JSON.stringify(deletedBooks));
            }

            window.location.href = "List-of-Books-Admin.html";
        }
    });
};

