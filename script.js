let lives = 3;

displayLives();

function displayLives() {
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = '';  // Clear existing hearts
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        heart.className = 'heart';
        livesContainer.appendChild(heart);
    }
}

function loseLife() {
    lives -= 1;
    displayLives();
    if (lives === 0) {
        alert("Game over! Try again.");
        resetGame();
    }
}

function resetGame() {
    lives = 3;
    displayLives();
    location.reload();  // Reload the page to reset the game
}

// Show specific game
function showGame(gameId) {
    document.querySelectorAll('.container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(gameId).style.display = 'block';
}

// Word Scramble Game
const words = ["javascript", "function", "variable", "syntax", "developer"];
let currentWord = words[Math.floor(Math.random() * words.length)];
document.getElementById('scrambled-word').textContent = currentWord.split('').sort(() => 0.5 - Math.random()).join('');

function checkScramble() {
    const input = document.getElementById('scramble-input').value;
    const result = document.getElementById('scramble-result');
    if (input.toLowerCase() === currentWord) {
        result.textContent = "Correct!";
        loadNewWord();
    } else {
        result.textContent = "Wrong! Try again.";
        loseLife();
    }
}

function loadNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('scrambled-word').textContent = currentWord.split('').sort(() => 0.5 - Math.random()).join('');
    document.getElementById('scramble-result').textContent = '';
    document.getElementById('scramble-input').value = '';
}

// Quiz Game
const quizData = [
    { question: "Which is a programming language?", options: ["HTML", "CSS", "JavaScript", "HTTP"], answer: "JavaScript" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Color Style System", "Creative Style Syntax", "None"], answer: "Cascading Style Sheets" },
    { question: "Do you miss Patricia?", options: ["YES", "SUPER", "I DOOOO", "Hell Yeah"], answer: "SUPER" }
];

let currentQuizIndex = 0;

function loadQuiz() {
    const quiz = quizData[currentQuizIndex];
    document.getElementById('quiz-question').textContent = quiz.question;
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    quiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'quiz-option';
        button.onclick = () => selectAnswer(button, option);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(button, selected) {
    clearHighlights();
    button.classList.add('selected');
    const quiz = quizData[currentQuizIndex];
    const result = document.getElementById('quiz-result');
    if (selected === quiz.answer) {
        result.textContent = "Correct!";
        setTimeout(() => {
            result.textContent = '';
            currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
            loadQuiz();
        }, 2000);
    } else {
        result.textContent = "Wrong! Try again.";
        loseLife();
    }
}

function clearHighlights() {
    document.querySelectorAll('.quiz-option').forEach(button => button.classList.remove('selected'));
}

loadQuiz();

// Sentence Correction Game
const sentences = [
    { incorrect: "He go to school every day.", correct: "He goes to school every day." },
    { incorrect: "She do her homework at night.", correct: "She does her homework at night." }
];
let currentSentenceIndex = 0;

function loadSentence() {
    document.getElementById('incorrect-sentence').textContent = sentences[currentSentenceIndex].incorrect;
}

function checkCorrection() {
    const input = document.getElementById('correction-input').value.trim();
    const result = document.getElementById('correction-result');
    if (input === sentences[currentSentenceIndex].correct) {
        result.textContent = "Correct!";
        setTimeout(() => {
            result.textContent = '';
            currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
            loadSentence();
        }, 2000);
    } else {
        result.textContent = "Incorrect! Try again.";
        loseLife();
    }
}

loadSentence();