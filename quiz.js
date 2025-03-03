const quizData = [
    // EASY LEVEL
    {
        question: "Which word is a synonym for 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        answer: "Joyful",
        hint: "Think of positive emotions",
        difficulty: "easy"
    },
    {
        question: "Choose the correct plural form: 'One child, two ___'",
        options: ["Childs", "Child", "Childrens", "Children"],
        answer: "Children",
        hint: "This is an irregular plural form",
        difficulty: "easy"
    },
    {
        question: "What is the past tense of 'eat'?",
        options: ["Eated", "Ate", "Eaten", "Eating"],
        answer: "Ate",
        hint: "This is an irregular verb",
        difficulty: "easy"
    },

    // MEDIUM LEVEL
    {
        question: "Which sentence uses the correct form of 'their/there/they're'?",
        options: ["Their going to the store", "There going to the store", "They're going to the store", "Theyre going to the store"],
        answer: "They're going to the store",
        hint: "Think about the contraction of 'they are'",
        difficulty: "medium"
    },
    {
        question: "Choose the correct comparative form: 'This book is ___ than that one.'",
        options: ["more better", "more good", "better", "gooder"],
        answer: "better",
        hint: "This is an irregular comparative",
        difficulty: "medium"
    },
    {
        question: "Which is the correct sentence?",
        options: ["I has been waiting", "I have been waiting", "I having been waiting", "I had been wait"],
        answer: "I have been waiting",
        hint: "Present perfect continuous tense",
        difficulty: "medium"
    },

    // HARD LEVEL
    {
        question: "Choose the correct subjunctive form: 'If I ___ rich, I would buy a house.'",
        options: ["am", "was", "were", "be"],
        answer: "were",
        hint: "Subjunctive mood uses 'were' for hypothetical situations",
        difficulty: "hard"
    },
    {
        question: "Which sentence uses parallel structure correctly?",
        options: [
            "She likes swimming, to dance, and running",
            "She likes swimming, dancing, and running",
            "She likes to swim, dance, and to run",
            "She likes swimming, dance, and to run"
        ],
        answer: "She likes swimming, dancing, and running",
        hint: "Keep the same grammatical form throughout the list",
        difficulty: "hard"
    },
    {
        question: "Identify the correct passive voice: 'The book ___.'",
        options: [
            "was written by him",
            "was wrote by him",
            "was writed by him",
            "was writing by him"
        ],
        answer: "was written by him",
        hint: "Past participle is used in passive voice",
        difficulty: "hard"
    },

    // EXPERT LEVEL
    {
        question: "Choose the correct usage of the past perfect subjunctive:",
        options: [
            "Had I known earlier, I will come",
            "Had I known earlier, I would came",
            "Had I known earlier, I would have come",
            "Had I knew earlier, I would have come"
        ],
        answer: "Had I known earlier, I would have come",
        hint: "Past perfect + would have + past participle",
        difficulty: "expert"
    },
    {
        question: "Which sentence demonstrates correct use of a gerund phrase?",
        options: [
            "To run in the morning is healthy",
            "Running in the morning is healthy",
            "Run in the morning is healthy",
            "The run in the morning is healthy"
        ],
        answer: "Running in the morning is healthy",
        hint: "Gerund phrases function as nouns",
        difficulty: "expert"
    },
    {
        question: "Select the correct sentence with inverted syntax:",
        options: [
            "Never I have seen such beauty",
            "Never have I seen such beauty",
            "Never I had seen such beauty",
            "Never did I had seen such beauty"
        ],
        answer: "Never have I seen such beauty",
        hint: "Inversion happens with negative adverbs at the start",
        difficulty: "expert"
    }
];

let currentQuizIndex = 0;
let lives = 3;
let coins = 0;
let consecutiveCorrect = 0;
let isProcessing = false;
let correctAnswers = 0; // Track correct answers per level

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
        if (correctAnswers >= 3) {
            completeLevel(); // Move to next level
        } else {
            loadNextQuestion(); // Load next question
        }
    } else {
        alert("Wrong! Try again.");
    }
}

function loadQuiz() {
    const questionElement = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const quiz = quizData[currentQuizIndex];
    
    questionElement.textContent = quiz.question;
    optionsContainer.innerHTML = '';
    updateDisplays();
    clearHintDisplay(); // Reset hint state for new question
    
    quiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'quiz-option';
        button.addEventListener('click', () => handleOptionClick(button, option));
        optionsContainer.appendChild(button);
    });
}

function showFeedbackPopup(isCorrect) {
    const popup = document.createElement('div');
    popup.className = `feedback-popup ${isCorrect ? 'correct' : 'incorrect'}`;
    popup.textContent = isCorrect ? '✅ Correct!' : '❌ Wrong!';
    document.body.appendChild(popup);
    
    setTimeout(() => document.body.removeChild(popup), 1500);
}

function handleOptionClick(button, selectedAnswer) {
    if (isProcessing) return;
    isProcessing = true;

    const quiz = quizData[currentQuizIndex];
    button.classList.add('selected');

    if (selectedAnswer === quiz.answer) {
        button.classList.add('correct');
        showFeedbackPopup(true);
        consecutiveCorrect++;
        
        if (consecutiveCorrect >= 2) {
            earnCoin();
            consecutiveCorrect = 0;
        }

        // Add delay before loading next question
        setTimeout(() => {
            if (currentQuizIndex < quizData.length - 1) {
                currentQuizIndex++;
                loadQuiz();
            } else {
                // Reset to first question or show completion
                currentQuizIndex = 0;
                loadQuiz();
            }
            isProcessing = false;
        }, 1500);
    } else {
        button.classList.add('incorrect');
        showFeedbackPopup(false);
        lives--;
        consecutiveCorrect = 0;
        updateDisplays();
        
        // Show correct answer
        const allButtons = document.querySelectorAll('.quiz-option');
        allButtons.forEach(btn => {
            if (btn.textContent === quiz.answer) {
                btn.classList.add('correct');
            }
        });

        setTimeout(() => {
            if (lives <= 0) {
                endGame();
            } else {
                // Don't advance to next question on wrong answer
                loadQuiz(); // Just reload the same question
            }
            isProcessing = false;
        }, 1500);
    }
}

{
    document.addEventListener("DOMContentLoaded", function () {
        let currentLevel = localStorage.getItem("currentLevel") || 1;
        document.getElementById("level-display").textContent = "Level " + currentLevel;
    });
    
    function completeLevel() {
        let currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
        let unlockedLevels = parseInt(localStorage.getItem("unlockedLevels")) || 1;
    
        if (currentLevel === unlockedLevels) {
            localStorage.setItem("unlockedLevels", unlockedLevels + 1); // Unlock next level
        }
    
        localStorage.setItem("currentLevel", currentLevel + 1); // Move to next level
        alert("Level " + currentLevel + " Completed! Moving to Level " + (currentLevel + 1));
        window.location.href = "levels.html"; // Redirect to level selection
    }
    
    }
    
    function unlockNextLevel() {
        let currentLevel = parseInt(localStorage.getItem("currentLevel"));
        let unlockedLevels = parseInt(localStorage.getItem("unlockedLevels")) || 1;
    
        if (currentLevel === unlockedLevels) {
            localStorage.setItem("unlockedLevels", unlockedLevels + 1);
        }
    }
    // Call this when the player finishes the level (e.g., answering all questions correctly)
    function checkQuizCompletion() {
        if (allQuestionsAnsweredCorrectly) { // Replace with your actual quiz completion condition
            completeLevel();
        }
    }
    
    // Unlock the next level function
    function unlockNextLevel() {
        let currentLevel = parseInt(localStorage.getItem("currentLevel"));
        let unlockedLevels = parseInt(localStorage.getItem("unlockedLevels")) || 1;
    
        if (currentLevel === unlockedLevels) {
            localStorage.setItem("unlockedLevels", unlockedLevels + 1); // Unlock next level
        }
    }
    



function updateDisplays() {
    const livesDisplay = document.getElementById('lives-display');
    const coinCount = document.getElementById('coin-count');
    
    if (livesDisplay) livesDisplay.innerHTML = '❤️'.repeat(lives);
    if (coinCount) coinCount.textContent = coins;
}

function showCoinAnimation() {
    const coinPopup = document.createElement('div');
    coinPopup.textContent = '+1 🪙';
    coinPopup.className = 'coin-popup';
    document.body.appendChild(coinPopup);
    
    setTimeout(() => {
        document.body.removeChild(coinPopup);
    }, 1000);
}

function endGame() {
    showGameOverPopup();
    lives = 3;
    coins = 0;
    consecutiveCorrect = 0;
}

function showGameOverPopup() {
    const popup = document.createElement('div');
    popup.className = 'game-over-popup';
    popup.innerHTML = `
        <div class="game-over-content">
            <h2>GAME OVER!</h2>
            <p>RAN OUT OF LIVES</p>
            <div class="game-over-buttons">
                <button id="tryAgainBtn">TRY AGAIN</button>
                <button id="homeBtn">HOME</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('tryAgainBtn').addEventListener('click', () => {
        document.body.removeChild(popup);
        lives = 3;
        coins = 0;
        consecutiveCorrect = 0;
        currentQuizIndex = 0;
        isProcessing = false; // Reset processing flag
        displayLives();
        displayCoins();
        loadQuiz();
        clearHintDisplay();
    });

    document.getElementById('homeBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function displayLives() {
    const livesDisplay = document.getElementById('lives-display');
    if (livesDisplay) {
        livesDisplay.innerHTML = '❤️'.repeat(lives);
    }
}

function goBackToHome() {
    window.location.href = 'index.html';
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
    updateDisplays();
    setupPowerUps();
    setupHint();
});

// Add event listener for hint button
const hintButton = document.getElementById('hint-button');
if (hintButton) {
    hintButton.addEventListener('click', () => {
        const hintDisplay = document.getElementById('hint-display');
        if (hintDisplay) {
            hintDisplay.textContent = quizData[currentQuizIndex].hint;
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .option-btn {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 2px solid #ddd;
        border-radius: 8px;
        background: black;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .option-btn:hover {
        background:rgb(5, 196, 12);
        transform: translateY(-2px);
    }

    .option-btn.correct {
        background: #4CAF50;
        color: white;
        border-color: #45a049;
    }

    .option-btn.incorrect {
        background: #f44336;
        color: white;
        border-color: #da190b;
    }

    .feedback-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 40px;
        border-radius: 10px;
        color: white;
        font-size: 24px;
        animation: popupAnimation 1.5s ease-out;
        z-index: 1000;
    }

    .feedback-popup.correct {
        background: #4CAF50;
    }

    .feedback-popup.incorrect {
        background: #f44336;
    }

    .coin-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        animation: coinAnimation 1s ease-out;
        z-index: 1000;
    }

    @keyframes popupAnimation {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }

    @keyframes coinAnimation {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(style);

function displayCoins() {
    const coinsDisplay = document.getElementById('coins-display');
    if (!coinsDisplay) return;
    
    coinsDisplay.innerHTML = '';
    
    if (coins > 0) {
        const coinIcon = document.createElement('span');
        coinIcon.className = 'coin-icon';
        coinIcon.textContent = '🪙';
        
        const coinCount = document.createElement('span');
        coinCount.className = 'coin-count';
        coinCount.textContent = coins;
        
        coinsDisplay.appendChild(coinIcon);
        coinsDisplay.appendChild(coinCount);
    }
}

function showCoinEarnedAnimation() {
    const coinSticker = document.createElement('div');
    coinSticker.className = 'coin-sticker';
    coinSticker.innerHTML = `
        <div class="coin-icon">🪙</div>
        <div class="coin-text">+1</div>
    `;
    document.body.appendChild(coinSticker);
    
    setTimeout(() => coinSticker.remove(), 1000);
}

function updateCoinDisplay() {
    const coinCount = document.getElementById('coin-count');
    if (coinCount) {
        coinCount.textContent = coins;
        coinCount.classList.add('coin-update');
        setTimeout(() => coinCount.classList.remove('coin-update'), 300);
    }
}

function earnCoin() {
    coins++;
    updateCoinDisplay();
    showCoinAnimation();
}

function setupPowerUps() {
    document.getElementById('skipBtn')?.addEventListener('click', () => usePowerUp('skip'));
    document.getElementById('lifeBtn')?.addEventListener('click', () => usePowerUp('extraLife'));
    document.getElementById('revealBtn')?.addEventListener('click', () => usePowerUp('reveal'));
}

function usePowerUp(type) {
    const costs = {
        skip: 2,
        extraLife: 3,
        reveal: 4
    };

    if (coins >= costs[type]) {
        coins -= costs[type];
        displayCoins();

        switch(type) {
            case 'skip':
                currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
                loadQuiz();
                showPowerUpEffect('⏭️ Question Skipped!');
                break;
            case 'extraLife':
                lives++;
                displayLives();
                showPowerUpEffect('❤️ Extra Life Added!');
                break;
            case 'reveal':
                revealAnswer();
                break;
        }
    } else {
        showNoCoinsPopup();
    }
}

function revealAnswer() {
    const correctAnswer = quizData[currentQuizIndex].answer;
    const revealDisplay = document.createElement('div');
    revealDisplay.className = 'reveal-highlight';
    revealDisplay.textContent = `Answer: ${correctAnswer}`;
    document.body.appendChild(revealDisplay);
    setTimeout(() => revealDisplay.remove(), 3000);
    showPowerUpEffect('🔍 Answer Revealed!');
}

function showPowerUpEffect(message) {
    const popup = document.createElement('div');
    popup.className = 'popup power-up';
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

function showNoCoinsPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup no-coins';
    popup.textContent = 'Not enough coins!';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

function setupHint() {
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        hintButton.addEventListener('click', showHint);
    }
}

function showHint() {
    if (coins < 1) {
        showNoCoinsPopup();
        return;
    }

    const hintDisplay = document.getElementById('hint-display');
    if (hintDisplay) {
        coins--;
        displayCoins();
        hintDisplay.style.display = 'block';
        hintDisplay.textContent = quizData[currentQuizIndex].hint;
        showPowerUpEffect('💡 Hint Revealed!');
    }
}

function clearHintDisplay() {
    const hintDisplay = document.getElementById('hint-display');
    if (hintDisplay) {
        hintDisplay.style.display = 'none';
        hintDisplay.textContent = '';
    }
}
const gameOverStyle = document.createElement('style');
gameOverStyle.textContent = `
    .game-over-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }

    .game-over-content {
        background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        border: 3px solid #d32f2f;
        animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        width: 90%;
    }

    .game-over-content h2 {
        color: #d32f2f;
        font-size: 36px;
        margin: 0 0 15px 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .game-over-content p {
        color: #333;
        font-size: 20px;
        margin: 0 0 25px 0;
        font-weight: 500;
    }

    .game-over-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .game-over-buttons button {
        padding: 12px 30px;
        border: none;
        border-radius: 12px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    #tryAgainBtn {
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
    }

    #homeBtn {
        background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
        color: white;
    }

    .game-over-buttons button:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .game-over-buttons button:active {
        transform: translateY(-1px);
    }

    @keyframes popIn {
        0% { transform: scale(0.7); opacity: 0; }
        45% { transform: scale(1.05); opacity: 0.8; }
        80% { transform: scale(0.95); opacity: 0.9; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(gameOverStyle);