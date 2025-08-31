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

