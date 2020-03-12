/*
MDIA 2109
Inductive vs. Deductive
*/

// Questions Array
// 1 = Yes / 2 = No
var questions = [
    {
        question: "Is the box is full of Mangos?",
        image: "images/q1.png",
        answers: ["&#10003;&nbsp;Yes", "&#10007;&nbsp;No"],
        correctAnswer: 1
    },
    {
        question: "Question...",
        image: "https://via.placeholder.com/728x90.png",
        answers: ["&#10003;&nbsp;Yes", "&#10007;&nbsp;No"],
        correctAnswer: 2
    },
    {
        question: "Question...",
        image: "https://via.placeholder.com/728x90.png",
        answers: ["&#10003;&nbsp;Yes", "&#10007;&nbsp;No"],
        correctAnswer: 1
    },
    {
        question: "Question...",
        image: "https://via.placeholder.com/728x90.png",
        answers: ["&#10003;&nbsp;Yes", "&#10007;&nbsp;No"],
        correctAnswer: 2
    }
  ];

// Variables
var questionIndex;
var currentQuestion;
var score;
var questionAnswered;
var gameOver;
var gameScreen = document.getElementById("gameScreen");

// startGame function to show first question
function startGame() {
    gameScreen.classList.remove("mainScreen");
    gameScreen.classList.add("questionScreen");
    questionIndex = 0;
    currentQuestion = 1;
    questionAnswered = 0;
    score = 0;
    gameScreen.innerHTML = `<div id="progressBar"><span id="progress"></span></div>
    <div id="info">
    <p>Question: <span id="questionNumber">${currentQuestion}</span></p>
    <p> </p>
  <p>Score: <span id="score">${score}</span></p>
    </div>
    <section id="answers"></section>`;
    showQuestions();
}

// showQuestions function to display each question in order of array
function showQuestions() {
    var question = questions[questionIndex];
    var answers = document.getElementById("answers");
    var answerNumber = 0;
    var output = `<div id="questionImg"><img src="${question.image}"/></div><h2 class="text-center bold">${question.question}</h2>`;
    for (let i in question.answers) {
        answerNumber++;
        output += `<div class="answer">
      <input type="radio" id="answer-${answerNumber}" name="answers" value="${answerNumber}">
      <label for="answer-${answerNumber}">${question.answers[i]}</label>
      </div>`;
    }
    answers.innerHTML = output;
}

// showScore to increment score by one when correct answer is selected
function showScore() {
    var questionFeedback = document.getElementById("questionFeedback");
    questionFeedback.parentElement.removeChild(questionFeedback);
    gameOver = 1;
    gameScreen.innerHTML = `<section id="results" class="text-center">
    <p id="percentage">&#9872;</p>
    <h2 class="bold">You got:</h2>
    <p id="percentage">${scorePercentage()}%</p>
    <p>You answered <span class="bold">${score}</span> out of <span class="bold">${
      questions.length
    }</span> questions correctly.</p><br/>
    <button type="button" id="playAgainButton" class="button" onclick="startGame()">Play Again&nbsp;&#8680;</button>
    </section>`;
}

// nextQuestion function to show next question when popup button is clicked
function nextQuestion() {
    currentQuestion++;
    questionIndex++;
    questionAnswered = 0;
    var questionFeedback = document.getElementById("questionFeedback");
    questionFeedback.parentElement.removeChild(questionFeedback);
    var questionNumber = document.getElementById("questionNumber").innerHTML = currentQuestion;
    showQuestions();
}

// function to check if answer is correct / incorrect and display message
function submitAnswer(e) {
    var selectedAnswer = Number(e.target.value);
    var rightAnswer = questions[questionIndex].correctAnswer;
    var answers = document.getElementsByName("answers");
    var progress = document.getElementById("progress");
    questionAnswered = 1;
    progress.style.width = progressPercentage() + "%";
    var questionFeedback = document.createElement("div");
    var message = document.createElement("p");
    var label = e.target.nextElementSibling;
    questionFeedback.id = "questionFeedback";
    if (selectedAnswer === rightAnswer) {
        score++;
        message.innerHTML = "<h1>&#9786;</h1>Correct!";
        label.classList.add("correctGreen");
    } else {
        message.innerHTML = "<h1>&#9785;</h1>Oh noes!";
        label.classList.add("incorrectRed");
        answers.forEach(answer => {
            if (Number(answer.value) !== rightAnswer) return;
            answer.nextElementSibling.classList.add("correctGreen");
        });
    }

    // nextQuestion / finish buttons function
    var button = document.createElement("button");
    button.classList.add("button");
    if (lastQuestion()) {
        button.id = "endGameButton";
        button.innerHTML = "Finish&nbsp;&#8680;";
    } else {
        button.id = "nextQuestionButton";
        button.innerHTML = "Next Question&nbsp;&#8680;";
    }
    questionFeedback.appendChild(message);
    questionFeedback.appendChild(button);
    gameScreen.insertAdjacentElement("afterend", questionFeedback);
    button.focus();
    answers.forEach(answer => (answer.disabled = "disabled"));
    document.getElementById("score").innerHTML = score;
}


// Calculate score as percentage
var scorePercentage = () => (score / questions.length * 100).toFixed(0);
var progressPercentage = () =>
    (currentQuestion / questions.length * 100).toFixed(0);
var lastQuestion = () => currentQuestion === questions.length;
document.addEventListener("click", function (e) {
    if (e.target.matches("#nextQuestionButton")) {
        nextQuestion();
    }
    if (e.target.matches("#endGameButton")) {
        showScore();
    }
});

document.addEventListener("change", function (e) {
    if (e.target.matches('input[type="radio"]')) {
        submitAnswer(e);
    }
});

// menuToggle function to Open / Close Menu
function menuToggle(){
     var info = document.querySelector(".questionMenu");
        info.classList.toggle("display-block");
}

// Functions to jump to questions from thumb menu
function q1(){
    startGame();
    questionIndex = 0;
    currentQuestion = 1;
    showQuestions();
}

function q2(){
    startGame();
    questionIndex = 1;
    currentQuestion = 2;
    showQuestions();
}