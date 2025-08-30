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

function setupDragAndDrop() {
    const lists = document.querySelectorAll('.cards-container');
    
    for (const list of lists) {
        list.addEventListener('dragover', dragOver);
        list.addEventListener('dragenter', dragEnter);
        list.addEventListener('dragleave', dragLeave);
        list.addEventListener('drop', dragDrop);
    }
}

function setupAddCardButtons() {
    const addCardButtons = document.querySelectorAll('.add-card-btn');
    
    for (const button of addCardButtons) {
        button.addEventListener('click', function() {
            const listId = this.getAttribute('data-list');
            showAddCardModal(listId);
        });
    }
}

