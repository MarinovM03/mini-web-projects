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

function setupModal() {
    const modal = document.getElementById('add-card-modal');
    const saveBtn = document.getElementById('save-card-btn');
    const cancelBtn = document.getElementById('cancel-card-btn');
    const input = document.getElementById('card-text-input');
    
    saveBtn.addEventListener('click', saveCard);
    cancelBtn.addEventListener('click', hideAddCardModal);
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveCard();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            hideAddCardModal();
        }
    });
}

function showAddCardModal(listId) {
    currentListId = listId;
    const modal = document.getElementById('add-card-modal');
    const input = document.getElementById('card-text-input');
    
    modal.style.display = 'flex';
    input.value = '';
    input.focus();
}

function hideAddCardModal() {
    const modal = document.getElementById('add-card-modal');
    modal.style.display = 'none';
    currentListId = null;
}

