let lives = 3;

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

function loseLife() {
    lives--;
    displayLives();
    if (lives <= 0) {
        alert("Game over!");
        resetGame();
    }
}

function displayLives() {
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = ''; // Clear lives display
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        livesContainer.appendChild(heart);
    }
}

function resetGame() {
    lives = 3;
    loadGame(); // Adjust this to reset specific games
    displayLives();
}
function goBackToHome() {
    window.location.href = "index.html"; // Redirects to the front page
}
