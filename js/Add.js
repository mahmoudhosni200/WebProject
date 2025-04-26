function handleAddBook() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const bookId = document.getElementById('book_id').value.trim();
        const bookName = document.getElementById('book_name').value.trim();
        const author = document.getElementById('author').value.trim();
        const category = document.getElementById('category').value.trim();
        const description = document.getElementById('description').value.trim();
        const availableCopies = document.getElementById('available_copies').value;

        if (!bookId || !bookName || !author || !category || !description || !availableCopies) {
            alert('Please fill in all required fields.');
            return;
        }

        const availableCopiesNum = parseInt(availableCopies);
        if (isNaN(availableCopiesNum) || availableCopiesNum < 0) {
            alert('Available copies must be a non-negative number.');
            return;
        }

        const languageRadio = document.querySelector('input[name="choice"]:checked');
        if (!languageRadio) {
            alert('Please select a language (English or Arabic).');
            return;
        }
        const language = languageRadio.value;

        const bookImageInput = document.getElementById('book_image');
        const bookImage = bookImageInput.files[0];

        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        };

        const createBook = (imageData) => {
            const book = {
                id: bookId,
                title: bookName,
                author: author,
                category: category,
                description: description,
                available: availableCopiesNum,
                borrowed: 0,
                language: language,
                image: imageData
            };

            saveBook(book);

            form.reset();
            document.getElementById('file-name').textContent = 'No file chosen';
            window.location.href = 'List-of-Books-Admin.html';
        };

        if (bookImage) {
            convertToBase64(bookImage)
                .then(base64String => createBook(base64String))
                .catch(error => {
                    console.error('Error converting image to Base64:', error);
                    createBook('images/default.jpg');
                });
        } else {
            createBook('images/default.jpg');
        }
    });

    const bookImageInput = document.getElementById('book_image');
    bookImageInput.addEventListener('change', () => {
        const fileName = bookImageInput.files[0]?.name || 'No file chosen';
        document.getElementById('file-name').textContent = fileName;
    });
}

function saveBook(book) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    if (books.some(b => b.id === book.id || b.title === book.title)) {
        alert('Book ID or NAME already exists. Please use a unique ID.');
        return;
    }

    books.push(book);

    try {
        localStorage.setItem('books', JSON.stringify(books));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Storage limit reached. Please clear some data or use fewer images.');
            console.error('Failed to save book due to storage limit:', e);
        }
    }
}

function displayBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const englishBooksContainer = document.querySelector('.english-books');
    const arabicBooksContainer = document.querySelector('.Arabic-books');

    if (!englishBooksContainer || !arabicBooksContainer) return;

    document.querySelectorAll('.container.dynamic').forEach(book => book.remove());

    books.forEach(book => {
        const container = document.createElement('div');
        container.classList.add('container', 'dynamic');

        const isAdminPage = window.location.pathname.includes('Admin');
        const bookHtml = `
            <div class="img-item">
                <img src="${book.image}" alt="${book.title}" onerror="this.src='images/default.jpg'">
            </div>
            <div class="item">
                <h3>${book.title}</h3>
                <h4>Author: ${book.author}</h4>
                <p>${book.description}</p>
            </div>
            <div class="${isAdminPage ? 'edit' : 'book'}">
                <h4>Available: ${book.available}</h4>
                <h4>Borrowed: ${book.borrowed}</h4>
                <br>
                ${isAdminPage 
                    ? `<button type="button" data-book-id="${book.id}" class="edit-btn">Edit</button>`
                    : `<button type="button" class="borrow-btn" data-book-id="${book.id}">Borrow</button>`}
            </div>
            <div class="clr"></div>
        `;

        container.innerHTML = bookHtml;

        if (book.language === 'english') {
            englishBooksContainer.appendChild(container);
        } else if (book.language === 'arabic') {
            arabicBooksContainer.appendChild(container);
        }
    });

    setupButtonListeners(books);
}

function setupButtonListeners(books) {
    const isAdminPage = window.location.pathname.includes('Admin');

    if (isAdminPage) {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const bookId = button.getAttribute('data-book-id');
                const book = books.find(b => b.id === bookId);
                if (book) {
                    const encodedTitle = encodeURIComponent(book.title);
                    window.location.href = `Edit_Book.html?book_id=${book.id}&book_name=${encodedTitle}`;
                }
            });
        });
    } 
    else {
        document.querySelectorAll('.borrow-btn').forEach(button => {
            button.addEventListener('click', () => {
                const bookId = button.getAttribute('data-book-id');
                const index = books.findIndex(b => b.id === bookId);
                if (index !== -1 && books[index].available > 0) {
                    books[index].available -= 1;
                    books[index].borrowed += 1;
                    localStorage.setItem('books', JSON.stringify(books));
                    displayBooks();
                } else {
                    alert('No copies available to borrow!');
                }
            });
        });
    }
}

function loadBooksFromJson() {
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('books', JSON.stringify(data));
            displayBooks();
        })
        .catch(error => {
            console.error('Error loading books.json:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('books')) {
        loadBooksFromJson();
    }

    if (window.location.pathname.includes('Add_Book.html')) {
        handleAddBook();
    } else if (window.location.pathname.includes('List-of-Books')) {
        displayBooks();
    }
});
