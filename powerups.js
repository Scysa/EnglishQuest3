const POWER_UPS = {
    skip: { cost: 2, icon: '⏭️', name: 'Skip Question' },
    extraLife: { cost: 3, icon: '❤️', name: 'Extra Life' },
    reveal: { cost: 4, icon: '🔍', name: 'Reveal Answer' }
};

let isDoubleCoinsActive = false;

function initializePowerUps() {
    const powerUpButtons = {
        'skipBtn': handleSkip,
        'lifeBtn': handleExtraLife,
        'revealBtn': handleReveal
    };

    Object.entries(powerUpButtons).forEach(([btnId, handler]) => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('click', () => {
                const type = btnId.replace('Btn', '');
                const cost = POWER_UPS[type].cost;
                
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
    // Quiz Game
    if (typeof currentQuizIndex !== 'undefined') {
        currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
        loadQuiz();
    }
    // Sentence Correction
    else if (typeof currentSentenceIndex !== 'undefined') {
        currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
        loadSentence();
    }
    // Word Scramble
    else if (typeof currentWordObj !== 'undefined') {
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
    let answer = '';
    // Quiz Game
    if (typeof currentQuizIndex !== 'undefined') {
        answer = quizData[currentQuizIndex].answer;
    }
    // Sentence Correction
    else if (typeof currentSentenceIndex !== 'undefined') {
        answer = sentences[currentSentenceIndex].correct;
    }
    // Word Scramble
    else if (typeof currentWordObj !== 'undefined') {
        answer = currentWordObj.word;
    }
    
    const revealDisplay = document.createElement('div');
    revealDisplay.className = 'reveal-highlight';
    revealDisplay.textContent = `Answer: ${answer}`;
    document.body.appendChild(revealDisplay);
    setTimeout(() => revealDisplay.remove(), 3000);
    
    showPowerUpEffect('🔍 Answer Revealed!');
}

function activateDoubleCoins() {
    isDoubleCoinsActive = true;
    showPowerUpEffect('🪙 Double Coins Active!');
    setTimeout(() => {
        isDoubleCoinsActive = false;
    }, 30000); // Active for 30 seconds
}

function showPowerUpEffect(message) {
    const popup = document.createElement('div');
    popup.className = 'popup power-up';
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', initializePowerUps);