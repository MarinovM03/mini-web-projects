const addBookmarkBtn = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmark-list');
const bookmarkNameInput = document.getElementById('bookmark-name');
const bookmarkUrlInput = document.getElementById('bookmark-url');
const emptyMessage = document.getElementById('empty-message');

document.addEventListener('DOMContentLoaded', loadBookmarks);

addBookmarkBtn.addEventListener('click', handleAddBookmark);


function handleAddBookmark() {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        alert('Please enter both bookmark name and URL.');
        return;
    }

    if (!isValidUrl(url)) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
    }

    if (bookmarkExists(name, url)) {
        alert('This bookmark already exists!');
        return;
    }

    addBookmarkToDisplay(name, url);
    saveBookmarkToStorage(name, url);

    clearInputs();
    
    updateEmptyMessage();
}

function isValidUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

function bookmarkExists(name, url) {
    const bookmarks = getBookmarksFromStorage();
    return bookmarks.some(bookmark => 
        bookmark.name.toLowerCase() === name.toLowerCase() || 
        bookmark.url === url
    );
}

function addBookmarkToDisplay(name, url) {
    const li = document.createElement('li');
    li.className = 'bookmark-item';

    const link = document.createElement('a');
    link.href = url;
    link.textContent = name;
    link.target = '_blank';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.addEventListener('click', function() {
        removeBookmark(li, name, url);
    });

    li.appendChild(link);
    li.appendChild(removeBtn);
    bookmarkList.appendChild(li);
}

function removeBookmark(listItem, name, url) {
    if (confirm(`Are you sure you want to remove "${name}"?`)) {
        bookmarkList.removeChild(listItem);
        removeBookmarkFromStorage(name, url);
        updateEmptyMessage();
    }
}

function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmarkToStorage(name, url) {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage();
    
    bookmarks.forEach(bookmark => {
        addBookmarkToDisplay(bookmark.name, bookmark.url);
    });
    
    updateEmptyMessage();
}

function removeBookmarkFromStorage(name, url) {
    let bookmarks = getBookmarksFromStorage();
    bookmarks = bookmarks.filter(bookmark => 
        bookmark.name !== name || bookmark.url !== url
    );
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

