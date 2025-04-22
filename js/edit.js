
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
    
        const newDescription = document.getElementById('description').value;
        const bookId = document.getElementById('book_id').value;
    
        if (newDescription.trim() !== "") {
            const updatedData = {
                id: bookId,
                description: newDescription
            };
            
            localStorage.setItem(`updatedDescription_${bookId}`, newDescription);
            
            window.location.href = "List-of-Books.html";
            window.location.href = "List-of-Books-Admin.html";
        } else {
            alert("Please enter a new description.");
        }
    });
 
    document.getElementById('deleteBookButton').addEventListener('click', function() {
        if (confirm("Are you sure you want to delete this book?")) {
            const deletedBooks = JSON.parse(localStorage.getItem('deletedBooks')) || [];
            const bookId = document.getElementById('book_id').value;
            
            deletedBooks.push(bookId); 
            localStorage.setItem('deletedBooks', JSON.stringify(deletedBooks));

            window.location.href = "List-of-Books.html";
            window.location.href = "List-of-Books-Admin.html";
        }
    });

    
};



