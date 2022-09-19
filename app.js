/*
GAME FUNCTION:
- Player can define the range of min and max number
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game value
let guessesLeft = 3

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    submitBtn = document.querySelector('#submit-btn'),
    guessBtn = document.querySelector('#guess-btn'),
    minInput = document.querySelector('#min-input'),
    maxInput = document.querySelector('#max-input'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for submit
submitBtn.addEventListener('click', function () {

    let min = parseInt(minInput.value),
        max = parseInt(maxInput.value);
        winningNum = getRandomNum(min, max);

    // Checking the minimum and maximum values
    checkMinMax(min, max)

})

// Listen for guess
guessBtn.addEventListener('click', function () {
    // Game Values
    let guess = parseInt(guessInput.value),
        min = parseInt(minInput.value),
        max = parseInt(maxInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        // Clear Input
        guessInput.value = '';
    }
    // Check if won
    else if (guess === winningNum) {
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        // Wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `GAME OVER! The number was ${winningNum}.`);

        } else {
            // Game continues - Answer wrong
            // Change border color
            guessInput.style.borderColor = 'red';
            // Clear input
            guessInput.value = '';
            // Tell user its the wrong number 
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max) {
    //console.log(Math.floor(Math.random()*(max-min) + min));
    return Math.floor(Math.random() * (max - min) + min);
}

// Check min max values
function checkMinMax(min, max) {
    if (isNaN(min) || isNaN(max)) {
        // Input is not a number - Remove the message
        showAlert('Please enter a number.', 'red');
    } else if (min < 0 || max < 0) {
        showAlert('Please enter a positive number.', 'red');
    } else if (min > max) {
        // Max num lower than min num - Reload
        showAlert('Higher number is lower than lower number. Please try again.', 'red');
    } else if (min == max) {
        // Max num and lower num is equal - Reload 
        showAlert('Lower number and higher number is equal. Please try again.', 'red');
    } else if (max - min < 3) {
        // Difference is too low - Reload
        showAlert('Difference between lower and higher number is too low. Please try again.', 'red');
    } else {
        // Assign UI min and max
        minNum.textContent = min;
        maxNum.textContent = max;
        // Displaying guessing section
        document.querySelector('#after-submit').style.display = 'block';
        document.querySelector('#intro-text').style.display = 'block';
        document.querySelector('#submit-btn').style.display = 'none';
        return min, max;
    }
}

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Set Alert
function showAlert(msg, color) {
    message.style.color = color;
    message.textContent = msg;

    // Timeout after 3 seconds
    setTimeout(function () {
        window.location.reload();
    }, 1500);
} 