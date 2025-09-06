const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = getTransactionsFromStorage();
let currentType = 'income';

document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    setupEventListeners();
    updateTransactionList();
    updateSummary();
}

function setupEventListeners() {
    transactionFormEl.addEventListener('submit', handleFormSubmit);
    
    const incomeBtn = document.getElementById('income-btn');
    const expenseBtn = document.getElementById('expense-btn');
    
    incomeBtn.onclick = function() {
        setTransactionType('income');
    };
    
    expenseBtn.onclick = function() {
        setTransactionType('expense');
    };
}

function setTransactionType(type) {
    currentType = type;
    
    const incomeBtn = document.getElementById('income-btn');
    const expenseBtn = document.getElementById('expense-btn');
    
    if (type === 'income') {
        incomeBtn.classList.add('active');
        expenseBtn.classList.remove('active');
    } else {
        expenseBtn.classList.add('active');
        incomeBtn.classList.remove('active');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    if (!description) {
        alert('Please enter a description');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount');
        return;
    }

    const finalAmount = currentType === 'expense' ? -Math.abs(amount) : Math.abs(amount);
        
    addTransaction(description, finalAmount);
    resetForm();
}

