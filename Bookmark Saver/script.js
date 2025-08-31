const addBookmarkBtn = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmark-list');
const bookmarkNameInput = document.getElementById('bookmark-name');
const bookmarkUrlInput = document.getElementById('bookmark-url');
const emptyMessage = document.getElementById('empty-message');

document.addEventListener('DOMContentLoaded', loadBookmarks);

addBookmarkBtn.addEventListener('click', handleAddBookmark);


