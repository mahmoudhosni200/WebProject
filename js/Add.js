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

        const compressImage = (file, maxSizeKB = 100, quality = 0.7) => {
            return new Promise((resolve) => {
                if (!file || file.size <= maxSizeKB * 1024) {
                    resolve(file);
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        let width = img.width;
                        let height = img.height;
                        const maxDimension = 800;
                        
                        if (width > height && width > maxDimension) {
                            height *= maxDimension / width;
                            width = maxDimension;
                        } else if (height > maxDimension) {
                            width *= maxDimension / height;
                            height = maxDimension;
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        let compressedFile;
                        let currentQuality = quality;
                        
                        const attemptCompression = () => {
                            canvas.toBlob((blob) => {
                                if (blob.size <= maxSizeKB * 1024 || currentQuality <= 0.1) {
                                    compressedFile = new File([blob], file.name, {
                                        type: 'image/jpeg',
                                        lastModified: Date.now()
                                    });
                                    resolve(compressedFile);
                                } else {
                                    currentQuality -= 0.1;
                                    attemptCompression();
                                }
                            }, 'image/jpeg', currentQuality);
                        };
                        
                        attemptCompression();
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
        };

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
            compressImage(bookImage)
                .then(compressedImage => convertToBase64(compressedImage))
                .then(base64String => createBook(base64String))
                .catch(error => {
                    console.error('Error processing image:', error);
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

function initializeStaticBooks() {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    if (books.length === 0) {
        const staticBooks = [
            {
                id: '101',
                title: 'The Great Gatsby',
                author: 'Jane Austen',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 20,
                borrowed: 0,
                language: 'english',
                image: 'images/the great gatspy.jpg',
                category: 'Fiction'
            },
            {
                id: '102',
                title: 'Pride and Prejudice',
                author: 'Harper Lee',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 30,
                borrowed: 0,
                language: 'english',
                image: 'images/Pride and Prejudice.jpg',
                category: 'Fiction'
            },
            {
                id: '103',
                title: 'Moby Dick',
                author: 'Herman Melville',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 8,
                borrowed: 0,
                language: 'english',
                image: 'images/Moby-Dick.jpg',
                category: 'Fiction'
            },
            {
                id: '104',
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 9,
                borrowed: 0,
                language: 'english',
                image: 'images/To Kill a Mockingbird .jpg',
                category: 'Fiction'
            },
            {
                id: '105',
                title: 'Harry Potter',
                author: 'J.K. Rowling',
                description: 'Lorem ipsum دولار sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 3,
                borrowed: 0,
                language: 'english',
                image: 'images/Harry.jpg',
                category: 'Fantasy'
            },
            {
                id: '106',
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 60,
                borrowed: 0,
                language: 'english',
                image: 'images/The hobbit.jpg',
                category: 'Fantasy'
            },
            {
                id: '107',
                title: 'Game Of Thrones',
                author: 'George R.R. Martin',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 14,
                borrowed: 0,
                language: 'english',
                image: 'images/game.jpg',
                category: 'Fantasy'
            },
            {
                id: '108',
                title: 'Patrick Rothfuss',
                author: 'Jane Austen',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque aspernatur, est tempora necessitatibus et harum cumque dolor dolorem dicta vel.',
                available: 15,
                borrowed: 0,
                language: 'english',
                image: 'images/name-wind.jpg',
                category: 'Fiction'
            },
            // Arabic Books
            {
                id: '109',
                title: 'كتاب الرحيق المختوم',
                author: 'صفي الرحمن المباركفوري',
                description: '"الرحيق المختوم" هو كتاب سيرة للنبي محمد صلى الله عليه وسلم، من تأليف صفي الرحمن المباركفوري. تم تأليف الكتاب باللغة العربية وقد حصل على جائزة رابطة العالم الإسلامي لأفضل كتاب في السيرة النبوية في عام 1976. يُعتبر الكتاب من أهم الكتب التي تناولت سيرة النبي محمد بشكل شامل ومفصل.',
                available: 14,
                borrowed: 0,
                language: 'arabic',
                image: 'images/الرحيق المختوم.jpg',
                category: 'Biography'
            },
            {
                id: '110',
                title: 'كتاب إحياء علوم الدين',
                author: 'ابو حامد الغزالي',
                description: '"إحياء علوم الدين" هو كتاب شهير من تأليف أبو حامد الغزالي، يُعد من أعمق الأعمال في التراث الإسلامي. يعرض الكتاب جوانب مختلفة من الحياة الدينية من خلال مناقشة العبادات والأخلاق، والزهد، والتصوف. يتناول الكتاب مفاهيم روحية وعملية في حياة المسلم.',
                available: 100,
                borrowed: 0,
                language: 'arabic',
                image: 'images/احياء علوم الدين.jpg',
                category: 'Religious'
            },
            {
                id: '111',
                title: 'كتاب فقه السنه',
                author: 'سيد سابق',
                description: '"فقه السنة" هو كتاب من تأليف سيد سابق، ويُعتبر من أشهر الكتب التي تناولت موضوعات الفقه الإسلامي بأسلوب مبسط وسهل. الكتاب يشمل شرحًا لأحكام العبادات والمعاملات في الإسلام مستندًا إلى الكتاب والسنة، مع التركيز على الأمور التي تتعلق بالحياة اليومية للمسلمين.',
                available: 8,
                borrowed: 0,
                language: 'arabic',
                image: 'images/فقه السنه.jpg',
                category: 'Religious'
            },
            {
                id: '112',
                title: 'كتاب من تاريخ الادب العربي',
                author: 'طه حسين',
                description: '"الأدب العربي" هو كتاب من تأليف طه حسين، يُعد من أبرز الكتب في دراسة الأدب العربي. يسلط الكتاب الضوء على تاريخ الأدب العربي وأهم مراحله وأثره على الثقافة والفكر العربي. وهو يُعتبر من الأعمال الرائدة في مجال دراسة الأدب العربي، ويمثل مساهمة كبيرة في تطوير الدراسات الأدبية في العالم العربي.',
                available: 90,
                borrowed: 0,
                language: 'arabic',
                image: 'images/الادب العربي.jpg',
                category: 'Literature'
            },
            {
                id: '113',
                title: 'رواية موسم الهجرة إلى الشمال',
                author: 'الطيب صالح',
                description: '"موسم الهجرة إلى الشمال" هي واحدة من أشهر وأهم روايات الكاتب السوداني الطيب صالح، وتُعتبر من أعظم الأعمال الأدبية في الأدب العربي المعاصر. تم نشر الرواية لأول مرة عام 1966، وسرعان ما أصبحت من أهم الكتب التي تتناول قضايا الهوية، الهجرة، الاستعمار، وصراع الشرق مع الغرب.',
                available: 10,
                borrowed: 0,
                language: 'arabic',
                image: 'images/موسم الهجرة إلى الشمال.jpg',
                category: 'Fiction'
            },
            {
                id: '114',
                title: 'رواية أولاد حارتنا',
                author: 'نجيب محفوظ',
                description: '"أولاد حارتنا" هي واحدة من أشهر وأهم روايات نجيب محفوظ، الحائز على جائزة نوبل في الأدب، وتعد من أكثر الأعمال الأدبية المثيرة للجدل في الأدب العربي المعاصر. تم نشر الرواية لأول مرة عام 1959، وهي رواية رمزية ذات إسقاطات دينية وفلسفية.',
                available: 5,
                borrowed: 0,
                language: 'arabic',
                image: 'images/أولاد حارتنا.jpg',
                category: 'Fiction'
            },
            {
                id: '115',
                title: 'رواية حديث الصباح والمساء',
                author: 'نجيب محفوظ',
                description: '"حديث الصباح والمساء" هي إحدى روايات نجيب محفوظ التي نُشرت في عام 1995، وتعد من بين أعماله الروائية الأخيرة التي شهدت رواجًا كبيرًا وتعتبر من أروع أعماله الأدبية. تدور أحداث الرواية في أربعين فصلاً، وهي تتناول تاريخ وحياة مجموعة من الشخصيات التي تعيش في القاهرة خلال فترات مختلفة من الزمن، حيث تمثل تاريخ المجتمع المصري منذ التحولات السياسية والاجتماعية الكبرى حتى عصر نجيب محفوظ في القرن العشرين.',
                available: 7,
                borrowed: 0,
                language: 'arabic',
                image: 'images/حديث الصباح والمساء.jpg',
                category: 'Fiction'
            }
        ];
        localStorage.setItem('books', JSON.stringify(staticBooks));
    }
}

function displayBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const englishBooksContainer = document.querySelector('.english-books');
    const arabicBooksContainer = document.querySelector('.Arabic-books');

    if (!englishBooksContainer || !arabicBooksContainer) {
        console.warn("English or Arabic books container not found.");
        return;
    }

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
                <p data-book-id="${book.id}">${book.description}</p>
            </div>
            <div class="${isAdminPage ? 'edit' : 'book'}">
                <h4 class="available">Available: ${book.available}</h4>
                <h4 class="borrowed">Borrowed: ${book.borrowed}</h4>
                <br>
                ${isAdminPage 
                    ? `
                        <button type="button" data-book-id="${book.id}" class="edit-btn">Edit</button>
                        <button type="button" data-book-id="${book.id}" class="delete-btn">Delete</button>
                    `
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

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const bookId = button.getAttribute('data-book-id');
                if (confirm(`Are you sure you want to delete the book with ID ${bookId}?`)) {
                    let books = JSON.parse(localStorage.getItem('books')) || [];
                    books = books.filter(book => book.id !== bookId);
                    localStorage.setItem('books', JSON.stringify(books));
                    displayBooks(); 
                }
            });
        });
    } else {
        document.querySelectorAll('.borrow-btn').forEach(button => {
            button.addEventListener('click', () => {
                let user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
                
                if (!user) {
                    alert("Please sign in first to borrow books.");
                    window.location.href = "signIn.html";
                    return; 
                }
        
                const bookId = button.getAttribute('data-book-id');
                const index = books.findIndex(b => b.id === bookId);
                if (index !== -1 && books[index].available > 0) {
                    books[index].available -= 1;
                    books[index].borrowed += 1;
                    localStorage.setItem('books', JSON.stringify(books));
                    
                    let username = localStorage.getItem("userName");
                    const borrowedBook = {
                        userName: username,
                        id: Date.now(),
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
}

document.addEventListener('DOMContentLoaded', () => {
    initializeStaticBooks();
    if (window.location.pathname.includes('Add_Book.html')) {
        handleAddBook();
    } else if (window.location.pathname.includes('List-of-Books')) {
        displayBooks();
    }
});