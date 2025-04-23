
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
            p.textContent = updatedDescription;
        }
    });
    
    const deletedBooks = JSON.parse(localStorage.getItem('deletedBooks')) || [];
    deletedBooks.forEach(function(bookIdToDelete) {
        const pToDelete = document.querySelector(`p[data-book-id="${bookIdToDelete}"]`);
        if (pToDelete) {
            const container = pToDelete.closest('.container');
            if (container) {
                container.remove();
            }
        }
    });

};



