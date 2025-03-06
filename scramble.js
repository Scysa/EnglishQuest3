const words = [
    { word: "happy 'feeling or showing pleasure or contentment'", hint: "Feeling joy and pleasure", difficulty: "easy" },
    { word: "smile 'a facial expression showing happiness'", hint: "Expression of happiness", difficulty: "easy" },
    { word: "brave 'showing courage and fearlessness'", hint: "Showing courage", difficulty: "easy" },
    { word: "quiet 'making little or no noise'", hint: "Making little noise", difficulty: "easy" },
    { word: "clean 'free from dirt or mess'", hint: "Free from dirt", difficulty: "easy" },
    { word: "kind 'being friendly, generous, and considerate'", hint: "Being friendly and gentle", difficulty: "easy" },

    // MEDIUM LEVEL (6-8 letters)
    { word: "freedom 'the state of being free from restrictions'", hint: "State of being free", difficulty: "medium" },
    { word: "courage 'the ability to face fear with confidence'", hint: "Facing fear with confidence", difficulty: "medium" },
    { word: "respect 'a feeling of deep admiration for someone'", hint: "Deep admiration", difficulty: "medium" },
    { word: "healthy 'being in a good physical and mental condition'", hint: "In good condition", difficulty: "medium" },
    { word: "success 'the achievement of a goal or purpose'", hint: "Achievement of a goal", difficulty: "medium" },
    { word: "wisdom 'the ability to make good judgments based on knowledge'", hint: "Knowledge and good judgment", difficulty: "medium" },

    // HARD LEVEL (8-10 letters)
    { word: "confident 'feeling sure about oneself and one's abilities'", hint: "Feeling sure about something", difficulty: "hard" },
    { word: "excellent 'extremely good or outstanding in quality'", hint: "Exceptionally good", difficulty: "hard" },
    { word: "determine 'to decide firmly or establish something with purpose'", hint: "To decide firmly", difficulty: "hard" },
    { word: "grateful 'feeling or showing appreciation and thanks'", hint: "Feeling thankful", difficulty: "hard" },
];

const POWER_UPS = {
    skip: { cost: 2, icon: '⏭️', name: 'Skip Question' },
    extraLife: { cost: 3, icon: '❤️', name: 'Extra Life' },
    reveal: { cost: 4, icon: '🔍', name: 'Reveal Answer' }
};

let currentWordObj = words[Math.floor(Math.random() * words.length)];
let lives = 3; // Set initial lives
let coins = 0; // Start with 0 coins
let consecutiveCorrect = 0; // Track correct answers
let hasClickedHint = false;
let hintButton;
let isProcessing = false;

// Display the scrambled word
document.getElementById('scrambled-word').textContent = scrambleWord(currentWordObj.word);

// Function to scramble the word
function scrambleWord(word) {
    return word.split('').sort(() => 0.5 - Math.random()).join('');
}

function displayLives() {
    const livesDisplay = document.getElementById('lives-display');
    if (livesDisplay) {
        livesDisplay.innerHTML = '❤️'.repeat(lives);
    }
}

function displayCoins() {
    const coinCount = document.getElementById('coin-count');
    if (coinCount) {
        coinCount.textContent = coins;
    }
}

// Check the user's input
function checkScramble() {
    if (isProcessing) return;
    isProcessing = true;

    const userInput = document.getElementById('user-input').value.toLowerCase();
    if (userInput === currentWordObj.word) {
        showCorrectPopup();
        consecutiveCorrect++;
        
        if (consecutiveCorrect >= 2) {
            coins++;
            showCoinEarnedPopup();
            displayCoins();
            consecutiveCorrect = 0;
        }

        setTimeout(() => {
            loadNewWord();
            document.getElementById('user-input').value = '';
            clearHintDisplay();
            isProcessing = false;
        }, 1500);
    } else {
        showWrongPopup();
        consecutiveCorrect = 0;
        loseLife();
        setTimeout(() => {
            document.getElementById('user-input').value = '';
            isProcessing = false;
        }, 1000);
    }
{
}
}

function clearHintDisplay() {
    const hintDisplay = document.getElementById('hint-display');
    if (hintDisplay) {
        hintDisplay.style.display = 'none';
        hintDisplay.textContent = '';
    }
}

// Load a new word
function loadNewWord() {
    currentWordObj = words[Math.floor(Math.random() * words.length)];
    document.getElementById('scrambled-word').textContent = scrambleWord(currentWordObj.word);
    clearHintDisplay(); // Clear hint on new word
}

function loseLife() {
    lives--;
    displayLives();
    if (lives <= 0) {
        endGame();
    }
}

function endGame() {
    showGameOverPopup();
    lives = 3;
    coins = 0;
    consecutiveCorrect = 0;
}

function resetGame() {
    lives = 3;
    coins = 0;
    consecutiveCorrect = 0;
    currentQuizIndex = 0;
    loadQuiz();
    displayLives();
    displayCoins();
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000); // Remove popup after 1 second
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
        hintDisplay.textContent = `Hint: ${currentWordObj.hint}`;
        showPowerUpEffect('💡 Hint Used!');
        
        setTimeout(() => {
            clearHintDisplay();
        }, 3000);
    }
}

function goBackToHome() {
    window.location.href = "index.html"; // Redirect to the homepage
}

// Listen for the Enter key to submit the answer
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkScramble();
    }
});

function initializeGame() {
    currentWordObj = words[Math.floor(Math.random() * words.length)];
    document.getElementById('scrambled-word').textContent = scrambleWord(currentWordObj.word);
    displayLives();
    displayCoins();
    setupButtons();
    setupPowerUps();
}

function setupButtons() {
    // Setup submit button
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', checkScramble);
    }

    // Setup hint button
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        // Remove existing listeners
        const newButton = hintButton.cloneNode(true);
        hintButton.parentNode.replaceChild(newButton, hintButton);
        newButton.addEventListener('click', showHint);
    }

    // Setup enter key
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkScramble();
            }
        });
    }
}

function setupPowerUps() {
    const skipBtn = document.getElementById('skipBtn');
    const lifeBtn = document.getElementById('lifeBtn');
    const revealBtn = document.getElementById('revealBtn');

    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            if (coins >= POWER_UPS.skip.cost) {
                coins -= POWER_UPS.skip.cost;
                displayCoins();
                loadNewWord();
                showPowerUpEffect('⏭️ Word Skipped!');
            } else {
                showNoCoinsPopup();
            }
        });
    }

    if (lifeBtn) {
        lifeBtn.addEventListener('click', () => {
            if (coins >= POWER_UPS.extraLife.cost) {
                coins -= POWER_UPS.extraLife.cost;
                displayCoins();
                lives++;
                displayLives();
                showPowerUpEffect('❤️ Extra Life Added!');
            } else {
                showNoCoinsPopup();
            }
        });
    }

    if (revealBtn) {
        revealBtn.addEventListener('click', () => {
            if (coins >= POWER_UPS.reveal.cost) {
                coins -= POWER_UPS.reveal.cost;
                displayCoins();
                showAnswer();
            } else {
                showNoCoinsPopup();
            }
        });
    }
}

function showAnswer() {
    const answer = currentWordObj.word;
    const revealDisplay = document.createElement('div');
    revealDisplay.className = 'reveal-highlight';
    revealDisplay.textContent = `Answer: ${answer}`;
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
    popup.textContent = 'No coins left for power-ups!';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

function showCorrectPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup correct';
    popup.textContent = 'Correct!';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

function showWrongPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup wrong';
    popup.textContent = 'Wrong!';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

function earnCoin() {
    consecutiveCorrect++;
    if (consecutiveCorrect >= 2) { // Earn coin every 2 correct answers
        coins++;
        consecutiveCorrect = 0;
        showCoinEarnedPopup();
        displayCoins();
    }
}

function showCoinEarnedPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup coin-earned';
    popup.textContent = '+1 🪙';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

function setupHint() {
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        hintButton.addEventListener('click', () => {
            if (coins >= 1) {
                coins--;
                displayCoins();
                showHintPopup(currentWordObj.hint);
            } else {
                showNoCoinsPopup();
            }
        });
    }
}

function showHintPopup(hint) {
    const popup = document.createElement('div');
    popup.className = 'hint-popup show';
    popup.textContent = `Hint: ${hint}`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

// Add CSS styles for hint popup
const hintStyle = document.createElement('style');
hintStyle.textContent = `
    .hint-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 15px 25px;
        background: linear-gradient(45deg, #4CAF50, #45a049);
        border: 2px solid #388E3C;
        border-radius: 10px;
        color: white;
        font-size: 18px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }

    .hint-popup.show {
        opacity: 1;
    }
`;
document.head.appendChild(hintStyle);

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
        displayLives();
        displayCoins();
        loadNewWord();
    });

    document.getElementById('homeBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const userInput = document.getElementById('user-input');
    
    if (submitButton) {
        submitButton.addEventListener('click', checkScramble);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkScramble();
            }
        });
    }
    
    loadNewWord();
    displayLives();
    displayCoins();
    setupPowerUps();
    setupHint();
});
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
