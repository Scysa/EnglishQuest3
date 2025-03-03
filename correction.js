const sentences = [
    // EASY LEVEL
    { incorrect: "He don't like pizza", correct: "He doesn't like pizza", hint: "Use doesn't for third person singular", difficulty: "easy" },
    { incorrect: "They is happy", correct: "They are happy", hint: "Use 'are' with plural subjects", difficulty: "easy" },
    { incorrect: "She have a cat", correct: "She has a cat", hint: "Use 'has' for third person singular", difficulty: "easy" },
    { incorrect: "I am go to school", correct: "I am going to school", hint: "Use present continuous form (-ing)", difficulty: "easy" },
    { incorrect: "He speak English", correct: "He speaks English", hint: "Add -s for third person singular", difficulty: "easy" },
    { incorrect: "She don't like ice cream", correct: "She doesn't like ice cream", hint: "Use doesn't for third person singular", difficulty: "easy" },
    { incorrect: "They is playing football", correct: "They are playing football", hint: "Use 'are' with plural subjects", difficulty: "easy" },
    { incorrect: "I am go to the park", correct: "I am going to the park", hint: "Use present continuous form (-ing)", difficulty: "easy" },
    { incorrect: "She have a dog", correct: "She has a dog", hint: "Use 'has' for third person singular", difficulty: "easy" },
    { incorrect: "He speak Spanish", correct: "He speaks Spanish", hint: "Add -s for third person singular", difficulty: "easy" },
    { incorrect: "She don't like chocolate", correct: "She doesn't like chocolate", hint: "Use doesn't for third person singular", difficulty: "easy" },
    { incorrect: "They is watching a movie", correct: "They are watching a movie", hint: "Use 'are' with plural subjects", difficulty: "easy" },
    { incorrect: "I am go to the beach", correct: "I am going to the beach", hint: "Use present continuous form (-ing)", difficulty: "easy" },
    { incorrect: "She have a cat", correct: "She has a cat", hint: "Use 'has' for third person singular", difficulty: "easy" },
    { incorrect: "He speak French", correct: "He speaks French", hint: "Add -s for third person singular", difficulty: "easy" },
    { incorrect: "She don't like ice cream", correct: "She doesn't like ice cream", hint: "Use doesn't for third person singular", difficulty: "easy" },
    { incorrect: "They is playing football", correct: "They are playing football", hint: "Use 'are' with plural subjects", difficulty: "easy" },

    // MEDIUM LEVEL
    { incorrect: "I don't have no money", correct: "I don't have any money", hint: "Avoid double negatives", difficulty: "medium" },
    { incorrect: "She have been working since 2 hours", correct: "She has been working for 2 hours", hint: "Use 'for' with duration", difficulty: "medium" },
    { incorrect: "If I would have money, I will buy a car", correct: "If I had money, I would buy a car", hint: "Second conditional structure", difficulty: "medium" },
    { incorrect: "He go to school yesterday", correct: "He went to school yesterday", hint: "Use past tense for past actions", difficulty: "medium" },
    { incorrect: "They didn't went to the party", correct: "They didn't go to the party", hint: "Use base form after didn't", difficulty: "medium" },
    { incorrect: "She is study for her exam", correct: "She is studying for her exam", hint: "Use present continuous for actions happening now", difficulty: "medium" },
    { incorrect: "I have been knowing him for 5 years", correct: "I have known him for 5 years", hint: "Use present perfect for actions started in the past", difficulty: "medium" },
    { incorrect: "She don't like coffee, but she drinks it", correct: "She doesn't like coffee, but she drinks it", hint: "Use doesn't for third person singular", difficulty: "medium" },
    { incorrect: "He have a car, but he doesn't drive it", correct: "He has a car, but he doesn't drive it", hint: "Use 'has' for third person singular", difficulty: "medium" },
    { incorrect: "They is playing football in the park", correct: "They are playing football in the park", hint: "Use 'are' with plural subjects", difficulty: "medium" },
    { incorrect: "I am go to the beach every weekend", correct: "I go to the beach every weekend", hint: "Use base form for general truths", difficulty: "medium" },
    { incorrect: "She have a cat and a dog", correct: "She has a cat and a dog", hint: "Use 'has' for third person singular", difficulty: "medium" },
    { incorrect: "He speak French and Spanish", correct: "He speaks French and Spanish", hint: "Add -s for third person singular", difficulty: "medium" },
    { incorrect: "She don't like ice cream, but she eats it", correct: "She doesn't like ice cream, but she eats it", hint: "Use doesn't for third person singular", difficulty: "medium" },
    { incorrect: "They is playing football in the park", correct: "They are playing football in the park", hint: "Use 'are' with plural subjects", difficulty: "medium" },

    // HARD LEVEL
    { incorrect: "Not only he failed the test but also lost his scholarship", correct: "Not only did he fail the test but he also lost his scholarship", hint: "Inversion after 'Not only'", difficulty: "hard" },
    { incorrect: "Despite he studied hard, he failed", correct: "Despite studying hard, he failed", hint: "Use gerund after 'despite'", difficulty: "hard" },
    { incorrect: "The more he earn money, the more he become greedy", correct: "The more money he earns, the greedier he becomes", hint: "Parallel structure with comparative", difficulty: "hard" },
    { incorrect: "Had I knew about the party, I would have came", correct: "Had I known about the party, I would have come", hint: "Past perfect in condition", difficulty: "hard" },
    { incorrect: "Neither the students nor the teacher have been able solving the problem", correct: "Neither the students nor the teacher has been able to solve the problem", hint: "Agreement with nearest subject", difficulty: "hard" },
    { incorrect: "I wish I am taller", correct: "I wish I were taller", hint: "Use 'were' for hypothetical situations", difficulty: "hard" },
    { incorrect: "If I would have known, I would have helped", correct: "If I had known, I would have helped", hint: "Third conditional structure", difficulty: "hard" },

    // EXPERT LEVEL
    { incorrect: "Not until had she finished her homework she went to bed", correct: "Not until she had finished her homework did she go to bed", hint: "Inverted word order after 'Not until'", difficulty: "expert" },
    { incorrect: "By the time I will graduate, I will have been studying for 6 years", correct: "By the time I graduate, I will have been studying for 6 years", hint: "Present tense after 'by the time'", difficulty: "expert" },
    { incorrect: "Hardly had I fallen asleep when the phone rings", correct: "Hardly had I fallen asleep when the phone rang", hint: "Past tense consistency", difficulty: "expert" },
    { incorrect: "The book whom I bought yesterday is interesting", correct: "The book which I bought yesterday is interesting", hint: "Use 'which' for objects", difficulty: "expert" },
    { incorrect: "If I would have studied harder, I would passed the exam", correct: "If I had studied harder, I would have passed the exam", hint: "Third conditional structure", difficulty: "expert" },
    { incorrect: "I am looking forward to meet you", correct: "I am looking forward to meeting you", hint: "Use gerund after 'look forward to'", difficulty: "expert" },
    { incorrect: "I wish I can speak Spanish", correct: "I wish I could speak Spanish", hint: "Use 'could' for past ability", difficulty: "expert" },
    { incorrect: "I am tired because I didn't slept well", correct: "I am tired because I didn't sleep well", hint: "Use base form after didn't", difficulty: "expert" },
    { incorrect: "I have been knowing him for 5 years", correct: "I have known him for 5 years", hint: "Use present perfect for actions started in the past", difficulty: "expert" },
    { incorrect: "She don't like coffee, but she drinks it", correct: "She doesn't like coffee, but she drinks it", hint: "Use doesn't for third person singular", difficulty: "expert" },
    { incorrect: "He have a car, but he doesn't drive it", correct: "He has a car, but he doesn't drive it", hint: "Use 'has' for third person singular", difficulty: "expert" },
    { incorrect: "They is playing football in the park", correct: "They are playing football in the park", hint: "Use 'are' with plural subjects", difficulty: "expert" },
    { incorrect: "I am go to the beach every weekend", correct: "I go to the beach every weekend", hint: "Use base form for general truths", difficulty: "expert" },
    { incorrect: "She have a cat and a dog", correct: "She has a cat and a dog", hint: "Use 'has' for third person singular", difficulty: "expert" },
];

let currentSentenceIndex = 0;
let lives = 3;
let coins = 0;
let consecutiveCorrect = 0;
let isProcessing = false;

function goBackToHome() {
    window.location.href = 'index.html';
}

// Add this to your initialization code
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization code...
    
    const homeButton = document.getElementById('home-button');
    if (homeButton) {
        homeButton.addEventListener('click', goBackToHome);
    }
    
    // Initialize other game elements...
});

function loadSentence() {
    const sentenceElement = document.getElementById('incorrect-sentence');
    if (sentenceElement) {
        sentenceElement.textContent = sentences[currentSentenceIndex].incorrect;
        clearHintDisplay();
    } else {
        console.error("Sentence element not found!");
    }
}

function checkCorrection() {
    if (isProcessing) return;
    isProcessing = true;

    const userInput = document.getElementById('correction-input').value.trim();
    if (userInput === sentences[currentSentenceIndex].correct) {
        showCorrectPopup();
        consecutiveCorrect++;

        if (consecutiveCorrect >= 2) {
            coins++;
            showCoinEarnedPopup();
            displayCoins();
            consecutiveCorrect = 0;
        }

        setTimeout(() => {
            currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
            loadSentence();
            document.getElementById('correction-input').value = '';
            clearHintDisplay();
            isProcessing = false;
        }, 1500);
    } else {
        showWrongPopup();
        consecutiveCorrect = 0;
        loseLife();
        setTimeout(() => {
            if (lives <= 0) {
                endGame();
            } else {
                isProcessing = false;
            }
            document.getElementById('correction-input').value = '';
        }, 1500);
    }
}

function initializeGame() {
    loadSentence();
    displayLives();
    displayCoins();
    setupPowerUps();
    setupHint();
    setupSubmit();
}

function setupSubmit() {
    const submitButton = document.getElementById('submit-button');
    const input = document.getElementById('correction-input');

    if (submitButton) {
        submitButton.addEventListener('click', checkCorrection);
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !isProcessing) {
                e.preventDefault();
                checkCorrection();
            }
        });
    }
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
        coinCount.classList.add('coin-update');
        setTimeout(() => coinCount.classList.remove('coin-update'), 300);
    }
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

function earnCoin() {
    consecutiveCorrect++;
    if (consecutiveCorrect >= 2) {
        coins++;
        consecutiveCorrect = 0;
        displayCoins();
        showCoinAnimation();
    }
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

function showCoinEarnedPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup coin-earned';
    popup.textContent = '+1 🪙';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

function showNoCoinsPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup no-coins';
    popup.textContent = 'Not enough coins!';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

function showAnswer() {
    const answer = sentences[currentSentenceIndex].correct;
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

function clearHintDisplay() {
    const hintDisplay = document.getElementById('hint-display');
    if (hintDisplay) {
        hintDisplay.style.display = 'none';
        hintDisplay.textContent = '';
    }
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
        loadSentence();
    });

    document.getElementById('homeBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
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
        updateCoinDisplay();

        switch(type) {
            case 'skip':
                currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
                loadSentence();
                showPowerUpEffect('⏭️ Skipped!');
                break;
            case 'extraLife':
                lives++;
                displayLives();
                showPowerUpEffect('❤️ Extra Life Added!');
                break;
            case 'reveal':
                showAnswer();
                break;
        }
    } else {
        showNoCoinsPopup();
    }
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
        updateCoinDisplay();
        hintDisplay.style.display = 'block';
        hintDisplay.textContent = `Hint: ${sentences[currentSentenceIndex].hint}`;
        hintDisplay.className = 'hint-popup show';
        
        setTimeout(() => {
            hintDisplay.className = 'hint-popup';
            hintDisplay.style.display = 'none';
        }, 3000);
    }
}

function updateCoinDisplay() {
    const coinCount = document.getElementById('coin-count');
    if (coinCount) {
        coinCount.textContent = coins;
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
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