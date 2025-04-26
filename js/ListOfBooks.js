function borrowBook(button) {
    let user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    
    if (!user) {
        alert("Please sign in first to borrow books.");
        window.location.href = "signIn.html";
        return; 
    }
    let bookContainer = button.closest(".book");
    let container = bookContainer.closest(".container");

    
    let availableElem = bookContainer.querySelector(".available");
    let borrowedElem = bookContainer.querySelector(".borrowed");

    
    let bookTitle = container.querySelector("h3").innerText;
    let bookAuthor = container.querySelector("h4").innerText.replace("Author: ", "").replace("تأليف: ", "").replace("المؤلف: ", "");
    let bookDescription = container.querySelector("p").innerText;
    let bookImage = container.querySelector("img").src;

    let available = parseInt(availableElem.innerText.match(/\d+/)[0]);
    let borrowed = parseInt(borrowedElem.innerText.match(/\d+/)[0]);

    if (available > 0) {
        available--;
        borrowed++;
        availableElem.innerText = `Available: ${available}`;
        borrowedElem.innerText = `Borrowed: ${borrowed}`;
        
        let username = localStorage.getItem("userName")
        addToBorrowedBooks({
            userName :username,
            title: bookTitle,
            author: bookAuthor,
            description: bookDescription,
            imageSrc: bookImage,
            id: Date.now() 
        });

        
        updateBookStorage(bookTitle, available, borrowed);
    } else {
        alert("No books available to borrow.");
    }
}

function addToBorrowedBooks(book) {
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    borrowedBooks.push(book);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
}

function updateBookStorage(bookTitle, available, borrowed) {
    let bookData = JSON.parse(localStorage.getItem('books')) || {};
    bookData[bookTitle] = {
        available: available,
        borrowed: borrowed
    };
    localStorage.setItem('books', JSON.stringify(bookData));
}


function updateBookStorage(bookTitle, available, borrowed) {
    
    let bookData = JSON.parse(localStorage.getItem('books')) || {};
    
    bookData[bookTitle] = {
        available: available,
        borrowed: borrowed
    };
    
    localStorage.setItem('books', JSON.stringify(bookData));
}


function loadBookData() {
    let bookData = JSON.parse(localStorage.getItem('books')) || {};
    
    
    document.querySelectorAll('.container').forEach(container => {
        let bookTitle = container.querySelector('h3').innerText;
        let availableElem = container.querySelector('.available');
        let borrowedElem = container.querySelector('.borrowed');
        
        
        if (bookData[bookTitle]) {
            availableElem.innerText = `Available: ${bookData[bookTitle].available}`;
            borrowedElem.innerText = `Borrowed: ${bookData[bookTitle].borrowed}`;
        }
    });
    document.querySelectorAll('.borrow-btn').forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.getAttribute('data-book-id');
            const books = JSON.parse(localStorage.getItem('books')) || [];
            const index = books.findIndex(b => b.id === bookId);
            if (index !== -1 && books[index].available > 0) {
                localStorage.setItem('books', JSON.stringify(books));
                let username = localStorage.getItem("userName")
                const borrowedBook = {
                    userName : username,
                    id : Date.now(),
                    bookId: bookId, 
                    title: books[index].title,
                    author: books[index].author,
                    description: books[index].description,
                    imageSrc: books[index].image,
                };
                
                let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
                borrowedBooks.push(borrowedBook);
                localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
                
                displayBooks(); 
            } else {
                alert('No copies available to borrow!');
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', loadBookData);