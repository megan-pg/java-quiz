var gameTimer;
var gameTime = 0;
var questions = [
    {
        question: "Who is Quark's step-father?",
        choices: ["Lt. Worf", "Rom", "Grand Negus Zek", "Liquidator Brunt"],
        correctAnswer: "Grand Negus Zek"
    },
    {
        question: "What alien species is Lt. Worf?",
        choices: ["Vulcan", "Klingon", "Romulan", "Betazoid"],
        correctAnswer: "Klingon"
    },
    {
        question: "When did Captain Sisko's wife die?",
        choices: ["At the Battle of Wolf 359", "At their wedding", "When she became a shape-shifter", "When she lied about being human"],
        correctAnswer: "At the Battle of Wolf 359"
    },
    {
        question: "Who does Kira hate?",
        choices: ["Dr. Bashir", "Lt. Worf", "Jadzia Dax", "Gul Dukat"],
        correctAnswer: "Gul Dukat"
    },
];
var choicesText = document.querySelector("#quiz");
var choices = document.querySelector("#choiceList");

//$('#quiz').hide();

function hideShowQuiz() {
    console.log(hideShowQuiz)
    var quizDisplay = document.getElementById("quiz");
    if (quizDisplay.style.display === "none") {
        startGame.style.display = "block";
    } else {
        quiz.style.display = "none";
    }

}

var score = 0;

// upon loading the document, the user is going to see the instructions to the game.
// these instructions can just be part of the HTML. We'll wrap all of the instructions
// in a div, with an id of #intro

// ***************************** START GAME ************************************

var quiz = document.getElementById("#quiz");


function generateQuestions(questions) {
    console.log(questions)
    console.log(choices)
    // we'll need a place to store the output and the answer choices
    var output = [];
    var choices;

    // for each question...
    for (var i = 0; i < questions.length; i++) {
        console.log(questions.length)
        // first reset the list of answers
        choices = [];

        // for each available answer to this question...
        // for (correctAnswer in questions[i].choices) {
        for (var choice = 0; choice < questions[i].choices.length; choice++) {
            console.log(questions[i])
            // if (questions[i].choices[choice] === questions[i].correctAnswer) {// ...add an html radio button
            console.log(questions[i].choices[choice])
            choices.push(
                '<button class="choices ' + i + '">'
                //+ '<button class="choiceList" name="question' + i + '" value="' + choices + '">'
                //+ choices + ': '
                + questions[i].choices[choice]
                + '</button>'
            );
            // }
        }
        console.log(choices)
        // add this question and its answers to the output
        output.push(
            '<div class="question">' + questions[i].question + '</div>'
            + choices.join('')
        );
    }
    $("#quiz").html("")
    $("#quiz").append(output)

    $(".choices").on("click", function () {
        //console.log($(this).text())
        console.log($(this).hasClass("0"))
        if ($(this).hasClass("0")) {
            if (questions[0].correctAnswer === $(this).text()) {
                alert("Correct!")
                score++
                console.log("correct")
            }
            else {
                alert("Incorrect")
                secondsLeft -= 10;
            }
        }

        if ($(this).hasClass("1")) {
            if (questions[1].correctAnswer === $(this).text()) {
                alert("Correct!")
                score++
                console.log("correct")
            }
            else {
                alert("Incorrect")
                secondsLeft -= 10;
            }

        }

        if ($(this).hasClass("2")) {
            if (questions[2].correctAnswer === $(this).text()) {
                alert("Correct!")
                score++
                console.log("correct")
            }
            else {
                alert("Incorrect")
                secondsLeft -= 10;
            }

        }

        if ($(this).hasClass("3")) {
            if (questions[3].correctAnswer === $(this).text()) {
                alert("Correct!")
                score++
                console.log("correct")
            }
            else {
                alert("Incorrect")
                secondsLeft -= 10;
            }

        }
        if (score >= 4) {
            endGame();
        }
    })
    //     <div id="quiz">
    //     <p>Pick One:</p>
    //     <ul id="choicesList"></ul>
    // </div>
}

// finally combine our output list into one string of html and put it on the page
//quizContainer.innerHTML = output.join('');
//}

//      - append the box to the document body
// $('body').append(questions);
//$('body').append(choices);

function showResults(questions, quizContainer) {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.choicesList');

    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question...
}
// show number of correct answers out of total

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');

generateQuestions(questions, quizContainer);

var lastQuestionIndex = questions.length - 1;
var runningQuestionIndex = 0;


//*****************Time******************************* */
var timeElement = document.querySelector(".time");
var countDown = document.getElementById(".timer");
gameTime = 0;
var secondsLeft = 60;

function createTimer() {
    // store the current time in a variable called gameTime, which is going to default to 0

    // create a setInterval, set to 1000ms (1 second), and assign that to a variable called gameTimer
    gameTimer = setInterval(function () {
        // increment the gameTime by 1 (gameTime++)
        secondsLeft--;
        timeElement.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(gameTimer);
            //countDown.appendChild(timeElement);
            endGame();
        }
    }, 1000);
    console.log(gameTime)
}

// we need a start button, with an id of #start-button. We'll put this in the #intro div
// when the #start-button is clicked, we need to start the game:
function startGame() {
    $("#quiz").css("display", "block")
    // generate 10-20 boxes, and randomly place them on the document
    generateQuestions(questions);
    // start a timer to keep track of how long the user has taken to finish the game
    createTimer();
    // hide the #intro div
    $('#intro').hide();
}

$('#start-button').on('click', startGame);



function calculateScore() {
    return Math.round(correctAnswer + 10);
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
        time: 60 - secondsLeft,
    };

    // add this score object to the current scores
    // get all of the current scores from local storage
    var scores = getScores();
    // push our scoreObject onto the existing scores array
    scores.push(scoreObject);
    // JSON.stringify to turn our array into a string
    var scoresJSON = JSON.stringify(scores);
    console.log(scoresJSON)
    // store our new JSON string in local store
    localStorage.setItem('scores', scoresJSON);
}

// ************************** FINAL ****************************************
function endGame() {


    // // timer needs to be stopped
    // clearInterval(gameTimer);
    // // calculate the users score
    // var score = calculateScore();
    // // display the users score
    $('#score').text(score);
    // $('#score-container').show();
    // // store the score, number of boxes, and the time in local storage
    saveScore(score);
}



function playAgain() {
    // hide the score container
    $('#score-container').hide();
    // reset the gameTime, the numOfBoxesClicked, and the numBoxes
    gameTime = 0;
    // call the startGame function
    startGame();
}

// *************************** PLAY AGAIN **************************************
// when the user clicks on #play-again, we need to:
$('#play-again').on('click', playAgain);
//   1. reset the game
//   2. start the game

// ************************** VIEW SCORES **************************************

