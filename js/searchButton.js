document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search');
    let searchInput = null;
    let searchContainer = null;

    searchButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!searchContainer) {
            searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            
            searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search books...';
            searchInput.className = 'search-input';
            
            const buttonRect = searchButton.getBoundingClientRect();
            searchContainer.style.position = 'absolute';
            searchContainer.style.right = '20px';
            searchContainer.style.top = `${buttonRect.bottom + 5}px`;
            
            searchContainer.style.backgroundColor = '#f8f9fa';
            searchContainer.style.borderRadius = '5px';
            searchContainer.style.padding = '10px';
            searchContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            
            searchContainer.appendChild(searchInput);
            document.body.appendChild(searchContainer);
            searchInput.focus();
            
            searchInput.addEventListener('input', function() {
                performSearch(this.value);
            });
            
            document.addEventListener('click', closeSearch);
        } else {
            searchInput.focus();
        }
    });

    function closeSearch(e) {
        if (searchContainer && !searchContainer.contains(e.target)) {
            document.body.removeChild(searchContainer);
            searchContainer = null;
            searchInput = null;
            document.removeEventListener('click', closeSearch);
            
            document.querySelectorAll('.container').forEach(container => {
                container.style.display = 'flex';
            });
        }
    }

    function performSearch(query) {
        const containers = document.querySelectorAll('.container');
        const lowerQuery = query.toLowerCase().trim();

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