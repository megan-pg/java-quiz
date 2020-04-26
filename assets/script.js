var gameTimer;
var gameTime = 0;
// upon loading the document, the user is going to see the instructions to the game.
// these instructions can just be part of the HTML. We'll wrap all of the instructions
// in a div, with an id of #intro

// ***************************** START GAME ************************************

var quiz = document.getElementById("quiz");
function generateQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

        // first reset the list of answers
        choices = [];

        // for each available answer to this question...
        for (letter in questions[i].answers) {

            // ...add an html radio button
            choices.push(
                '<label>'
                + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                + letter + ': '
                + questions[i].answers[letter]
                + '</label>'
            );
        }

        // add this question and its answers to the output
        output.push(
            '<div class="question">' + questions[i].question + '</div>'
            + '<div class="choice">' + choices.join('') + '</div>'
        );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
}
//      - append the box to the document body
$('body').append(questions);

function showResults(questions, quizContainer, resultsContainer) {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

        // if answer is correct
        if (userAnswer === questions[i].correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[i].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[i].style.color = 'red';
        }
    }
}
// show number of correct answers out of total

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');


generateQuestions(questions, quizContainer, resultsContainer, submitButton);
var questions = [
    {
        question: "Who is Quark's step-father?",
        choices: ["Lt. Worf", "Rom", "Grand Negus Zek", "Liquidator Brunt"],
        correct: "C"
    },
    {
        question: "What alien species is Lt. Worf?",
        choices: ["Vulcan", "Klingon", "Romulan", "Betazoid"],
        correct: "B"
    },
    {
        question: "When did Captain Sisko's wife die?",
        choices: ["At the Battle of Wolf 359", "At their wedding", "When she became a shape-shifter", "When she lied about being human"],
        correct: "A"
    },
    {
        question: "Who does Kira hate?",
        choices: ["Dr. Bashir", "Lt. Worf", "Jadzia Dax", "Gul Dukat"],
        correct: "D"
    },
];
generateQuestions(questions, quizContainer);

var lastQuestionIndex = questions.length - 1;
var runningQuestionIndex = 0;

function createTimer() {
    // store the current time in a variable called gameTime, which is going to default to 0
    gameTime = 0;
    // create a setInterval, set to 1000ms (1 second), and assign that to a variable called gameTimer
    gameTimer = setInterval(function () {
        // increment the gameTime by 1 (gameTime++)
        gameTime++;
        console.log(gameTime);
    }, 1000);
}

// we need a start button, with an id of #start-button. We'll put this in the #intro div
// when the #start-button is clicked, we need to start the game:
function startGame() {
    // generate 10-20 boxes, and randomly place them on the document
    generateQuestions();
    // start a timer to keep track of how long the user has taken to finish the game
    createTimer();
    // hide the #intro div
    $('#intro').hide();
}

$('#start-button').on('click', startGame);


function calculateScore() {
    return Math.round(numBoxes * 2.5) - gameTime;
}

function getScores() {
    // get all of the current scores from local storage
    var scores = localStorage.getItem('scores');

    // JSON.parse the value from local storage to get an array
    if (scores) {
        return JSON.parse(scores);
    }

    return [];
}

function saveScore(score) {
    // store the score, number of boxes, and the time in local storage

    // create a new score object with the three values that we want
    var scoreObject = {
        score: score,
        numBoxes: numBoxes,
        time: gameTime,
    };

    // add this score object to the current scores
    // get all of the current scores from local storage
    var scores = getScores();
    // push our scoreObject onto the existing scores array
    scores.push(scoreObject);
    // JSON.stringify to turn our array into a string
    var scoresJSON = JSON.stringify(scores);
    // store our new JSON string in local store
    localStorage.setItem('scores', scoresJSON);
}

// ************************** BOX CLICK ****************************************
function endGame() {
    // timer needs to be stopped
    clearInterval(gameTimer);
    // calculate the users score
    var score = calculateScore();
    // display the users score
    $('#score').text(score);
    $('#score-container').show();
    // store the score, number of boxes, and the time in local storage
    saveScore(score);
}


$(document).on('click', '.box', clickBox);

function playAgain() {
    // hide the score container
    $('#score-container').hide();
    // reset the gameTime, the numOfBoxesClicked, and the numBoxes
    gameTime = 0;
    numBoxesClicked = 0;
    numBoxes = 0;
    // call the startGame function
    startGame();
}

// *************************** PLAY AGAIN **************************************
// when the user clicks on #play-again, we need to:
$('#play-again').on('click', playAgain);
//   1. reset the game
//   2. start the game

// ************************** VIEW SCORES **************************************
function viewScores() {
    //   1. hide the users score, and the #play-again and #view-scores buttons
    $('#score-container').hide();
    //   2. get the scores from local storage
    var scores = getScores();
    //   3. display the scores in a table
    var tableBodyElement = $('#score-body');
    scores.forEach(function (score) {
        // for each score, add a new row to the tbody, which has:
        //   the score
        //   the number of blocks
        //   the game time
        var tableRowElement = $('<tr>');
        var scoreTd = $('<td>').text(score.score);
        var numBoxesTd = $('<td>').text(score.numBoxes);
        var timeTd = $('<td>').text(score.time);
        tableRowElement.append(scoreTd);
        tableRowElement.append(numBoxesTd);
        tableRowElement.append(timeTd);
        tableBodyElement.append(tableRowElement);
    });
    // display the #score-list div
    $('#score-list').show();
}
// when the user clicks on #view-scores we need to:
$('#view-scores').on('click', viewScores);



