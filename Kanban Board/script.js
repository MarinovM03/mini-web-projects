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

function saveCard() {
    const input = document.getElementById('card-text-input');
    const cardText = input.value.trim();
    
    if (cardText === '') {
        alert('Please enter card text');
        return;
    }
    
    if (currentListId) {
        createCard(cardText, currentListId);
        hideAddCardModal();
    }
}

function createCard(text, listId) {
    const cardId = 'card-' + cardIdCounter++;
    const cardsContainer = document.querySelector(`#${listId} .cards-container`);
    
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = cardId;
    card.textContent = text;
    
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-card-btn';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        deleteCard(cardId);
    });
    
    card.appendChild(deleteBtn);
    cardsContainer.appendChild(card);
}

function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    if (card && confirm('Are you sure you want to delete this card?')) {
        card.remove();
    }
}

