const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const percentageSpan = document.getElementById("percentage");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of Spain?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: false },
      { text: "Madrid", correct: true },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
  {
    question: "Which year did World War II end?",
    answers: [
      { text: "1944", correct: false },
      { text: "1945", correct: true },
      { text: "1946", correct: false },
      { text: "1947", correct: false },
    ],
  },
  {
    question: "What is the smallest unit of matter?",
    answers: [
      { text: "Molecule", correct: false },
      { text: "Atom", correct: true },
      { text: "Cell", correct: false },
      { text: "Electron", correct: false },
    ],
  },
  {
    question: "Which continent is the largest?",
    answers: [
      { text: "Africa", correct: false },
      { text: "Asia", correct: true },
      { text: "North America", correct: false },
      { text: "Europe", correct: false },
    ],
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let selectedQuestions = [];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function initializeQuiz() {
  selectedQuestions = shuffleArray([...quizQuestions]).slice(0, 5);
  totalQuestionsSpan.textContent = selectedQuestions.length;
  maxScoreSpan.textContent = selectedQuestions.length;
}

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove('active');
  setTimeout(() => {
    quizScreen.classList.add('active');
  }, 150);
  
  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = selectedQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;
  
  // Update progress bar
  const progressPercent = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
  progressBar.style.width = progressPercent + '%';

  answersContainer.innerHTML = '';
  
  // Shuffle answers and create buttons
  const shuffledAnswers = shuffleArray([...currentQuestion.answers]);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answersDisabled) return;

  answersDisabled = true;
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';

  selectedBtn.classList.add('selected');

  const allButtons = answersContainer.querySelectorAll('.answer-btn');
  allButtons.forEach(button => {
    button.disabled = true;
  });

  setTimeout(() => {
    allButtons.forEach(button => {
      button.classList.remove('selected');
      
      if (button.dataset.correct === 'true') {
        button.classList.add('correct');
      } else if (button === selectedBtn && !isCorrect) {
        button.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      score++;
      scoreSpan.textContent = score;
    }
    
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  }, 300);
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.remove('active');
  setTimeout(() => {
    resultScreen.classList.add('active');
  }, 150);
  
  finalScoreSpan.textContent = score;
  const percentage = Math.round((score / selectedQuestions.length) * 100);
  percentageSpan.textContent = percentage + '%';

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! 🎯 You're a quiz master!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! 🎉 You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good work! 👍 Keep it up!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! 🤔 Room for improvement!";
  } else {
    resultMessage.textContent = "Keep trying! 🌱 Practice makes perfect!";
  }
}

}

function restartQuiz(e) {
    resultScreen.classList.remove('active');
    
    startQuiz();
}