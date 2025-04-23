document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search');
    let searchInput = null;
    let searchContainer = null;
    let resultsContainer = null;

    const allBooks = [
        // English Books
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "english" },
        { title: "Pride and Prejudice", author: "Jane Austen", category: "english" },
        { title: "Moby Dick", author: "Herman Melville", category: "english" },
        { title: "To Kill a Mockingbird", author: "Harper Lee", category: "english" },
        { title: "Harry Potter", author: "J.K. Rowling", category: "english" },
        { title: "The Hobbit", author: "J.R.R. Tolkien", category: "english" },
        { title: "Game Of Thrones", author: "George R.R. Martin", category: "english" },
        { title: "The Name of the Wind", author: "Patrick Rothfuss", category: "english" },
        
        // Arabic Books
        { title: "الرحيق المختوم", author: "صفي الرحمن المباركفوري", category: "arabic" },
        { title: "إحياء علوم الدين", author: "أبو حامد الغزالي", category: "arabic" },
        { title: "فقه السنة", author: "سيد سابق", category: "arabic" },
        { title: "من تاريخ الأدب العربي", author: "طه حسين", category: "arabic" },
        { title: "موسم الهجرة إلى الشمال", author: "الطيب صالح", category: "arabic" },
        { title: "أولاد حارتنا", author: "نجيب محفوظ", category: "arabic" },
        { title: "حديث الصباح والمساء", author: "نجيب محفوظ", category: "arabic" }
    ];

    if (window.location.pathname.includes('List-of-Books-Admin.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        
        if (searchParam) {
            createSearchBox();
            if (searchInput) {
                searchInput.value = searchParam;
                performSearchOnBooksPage(searchParam);
            }
        }
    }

    searchButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!searchContainer) {
            createSearchBox();
        } else {
            searchInput.focus();
        }
    });

    function createSearchBox() {
        searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        
        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search books...';
        searchInput.className = 'search-input';
        searchInput.autocomplete = 'off';
        
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        
        const buttonRect = searchButton.getBoundingClientRect();
        searchContainer.style.position = 'absolute';
        searchContainer.style.right = '20px';
        searchContainer.style.top = `${buttonRect.bottom + 5}px`;
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(resultsContainer);
        document.body.appendChild(searchContainer);
        searchInput.focus();
        
        searchInput.addEventListener('input', function() {
            showSuggestions(this.value);
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
            }
        });
        
        document.addEventListener('click', closeSearch);
    }

    function closeSearch(e) {
        if (searchContainer && !searchContainer.contains(e.target)) {
            document.body.removeChild(searchContainer);
            searchContainer = null;
            searchInput = null;
            resultsContainer = null;
            document.removeEventListener('click', closeSearch);
        }
    }

    function showSuggestions(query) {
        const lowerQuery = query.toLowerCase().trim();
        resultsContainer.innerHTML = '';
        
        if (!lowerQuery) {
            resultsContainer.style.display = 'none';
            return;
        }
        
        const matches = allBooks.filter(book => 
            book.title.toLowerCase().includes(lowerQuery) || 
            book.author.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);
        
        if (matches.length > 0) {
            matches.forEach(book => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <strong>${book.title}</strong>
                    <span>by ${book.author}</span>
                `;
                resultItem.addEventListener('click', () => {
                    handleSearch(book.title);
                });
                resultsContainer.appendChild(resultItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    }

    function handleSearch(searchTerm) {
        if (window.location.pathname.includes('List-of-Books-Admin.html')) {
            performSearchOnBooksPage(searchTerm);
            if (searchInput) searchInput.value = searchTerm;
        } else {
            window.location.href = `List-of-Books-Admin.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }

    function performSearchOnBooksPage(searchTerm) {
        const containers = document.querySelectorAll('.container');
        const lowerQuery = searchTerm.toLowerCase().trim();

        containers.forEach(container => {
            const title = container.querySelector('h3').textContent.toLowerCase();
            const author = container.querySelector('h4').textContent.toLowerCase();
            
            if (!lowerQuery || title.includes(lowerQuery) || author.includes(lowerQuery)) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    }
});