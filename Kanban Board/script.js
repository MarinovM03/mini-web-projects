let cardIdCounter = 1;
let currentListId = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeKanbanBoard();
});

function initializeKanbanBoard() {
    setupDragAndDrop();
    setupAddCardButtons();
    setupModal();
}

