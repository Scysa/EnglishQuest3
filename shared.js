const ACHIEVEMENTS = {
    PERFECT_STREAK: { name: 'Perfect Streak', desc: '5 correct answers in a row', icon: '🏆' },
    COIN_MASTER: { name: 'Coin Master', desc: 'Collect 10 coins', icon: '💰' },
    SPEED_DEMON: { name: 'Speed Demon', desc: 'Answer within 5 seconds', icon: '⚡' }
};

const POWER_UPS = {
    SKIP: { cost: 2, icon: '⏭️', name: 'Skip Question' },
    EXTRA_LIFE: { cost: 3, icon: '❤️', name: 'Extra Life' },
    DOUBLE_COINS: { cost: 2, icon: '🪙', name: 'Double Coins' }
};

let achievements = JSON.parse(localStorage.getItem('achievements')) || [];
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let isProcessing = false;

function earnCoin() {
    consecutiveCorrect++;
    if (consecutiveCorrect >= 2) {
        coins++;
        showCoinEarnedPopup();
        displayCoins();
        consecutiveCorrect = 0;
    }
}

function showCoinEarnedPopup() {
    if (document.querySelector('.popup.coin-earned')) return; // Prevent multiple popups
    const popup = document.createElement('div');
    popup.className = 'popup coin-earned';
    popup.textContent = '🪙 Coin Earned!';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

function displayCoins() {
    const coinsContainer = document.getElementById('coins-display');
    if (!coinsContainer) return;
    coinsContainer.innerHTML = '';
    for (let i = 0; i < coins; i++) {
        const coin = document.createElement('span');
        coin.className = 'coin';
        coin.textContent = '🪙';
        coinsContainer.appendChild(coin);
    }
}

function resetStreak() {
    consecutiveCorrect = 0;
}

function setupGameFeatures() {
    setupPowerUps();
    setupHint();
    setupSubmitHandlers();
}

function setupPowerUps() {
    const powerUps = {
        skip: { cost: 2, handler: handleSkip },
        extraLife: { cost: 3, handler: handleExtraLife },
        reveal: { cost: 4, handler: handleReveal }
    };

    Object.entries(powerUps).forEach(([id, {cost, handler}]) => {
        const btn = document.getElementById(`${id}Btn`);
        if (btn) {
            btn.addEventListener('click', () => {
                if (coins >= cost) {
                    coins -= cost;
                    displayCoins();
                    handler();
                } else {
                    showNoCoinsPopup();
                }
            });
        }
    });
}

function handleSkip() {
    if (typeof currentQuizIndex !== 'undefined') {
        currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
        loadQuiz();
    } else if (typeof currentSentenceIndex !== 'undefined') {
        currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
        loadSentence();
    } else {
        loadNewWord();
    }
    showPowerUpEffect('⏭️ Question Skipped!');
}

function handleExtraLife() {
    lives++;
    displayLives();
    showPowerUpEffect('❤️ Extra Life Added!');
}

function handleReveal() {
    const answer = getCurrentAnswer();
    showRevealPopup(answer);
}

function getCurrentAnswer() {
    if (typeof quizData !== 'undefined') {
        return quizData[currentQuizIndex].answer;
    } else if (typeof sentences !== 'undefined') {
        return sentences[currentSentenceIndex].correct;
    } else {
        return currentWordObj.word;
    }
}

function setupHint() {
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        hintButton.addEventListener('click', () => {
            if (coins > 0) {
                coins--;
                displayCoins();
                showHint();
            } else {
                showNoCoinsPopup();
            }
        });
    }
}

function showHint() {
    const hint = getCurrentHint();
    const hintDisplay = document.getElementById('hint-display');
    if (hintDisplay) {
        hintDisplay.style.display = 'block';
        hintDisplay.textContent = hint;
    }
}

function getCurrentHint() {
    if (typeof quizData !== 'undefined') {
        return quizData[currentQuizIndex].hint;
    } else if (typeof sentences !== 'undefined') {
        return sentences[currentSentenceIndex].hint;
    } else {
        return currentWordObj.hint;
    }
}