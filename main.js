/*
MDIA 2109
Inductive vs. Deductive
*/

// Questions Array
// 1 = Yes / 2 = No
var questions = [
    {
        question: "We KNOW that a Mango is a Fruit. We KNOW that the Box is full of Fruit. We DON'T know the type of Fruit in the Box <br> Is the Box full of Mangos?",
        image: "images/q1.png",
        answers: ["&#10003;&nbsp;Yes", "&#10007;&nbsp;No"],
        correctAnswer: 2
    },
    {
        question: "We KNOW Cats and Dogs are Animals. We KNOW that Cats and Dogs are Pets.",
        image: "images/q2.png",
        answers: ["All Animals are Pets", "All Animals are not Pets"],
        correctAnswer: 2
    },
    {
        question: "We KNOW Henry is a Teacher. We KNOW Henry likes Sweet Food. We KNOW Strawberries are Sweet",
        image: "images/q3.png",
        answers: ["Henry likes Strawberries", "Henry dislikes Strawberries"],
        correctAnswer: 1
    },
    {
        question: "We KNOW Sarah owns both Red and Purple Pants. Today we KNOW she is wearing Pants",
        image: "images/q4.png",
        answers: ["Sarah is wearing Red Pants", "Sarah is wearing Purple Pants", "Sarah is wearing Red or Purple Pants", "Sarah is wearing a skirt",],
        correctAnswer: 3
    },
    {
        question: "We KNOW that Robins are Birds, We KNOW that Robins have feathers.",
        image: "images/q5.png",
        answers: ["All Birds have Feathers", "All Birds are Red", "All Feathers are Red", "All Birds can Fly",],
        correctAnswer: 1
    },
    {
        question: "What direction is this storm coming from?",
        image: "images/q6.png",
        answers: ["North", "South", "East", "West",],
        correctAnswer: 1
    },
    {
        question: "Is this Inductive or Deductive Reasoning?",
        image: "images/q7.png",
        answers: ["Deductive", "Inductive",],
        correctAnswer: 2
    },
    {
        question: "Is this Inductive or Deductive Reasoning?",
        image: "images/q8.png",
        answers: ["Deductive", "Indeductive",],
        correctAnswer: 1
    },
    {
        question: "",
        image: "images/q9.png",
        answers: ["All Dolphins are Fish", "All Mammals are Dolphins", "Dolphins do not have Stomachs", "All Dolphins have Stomachs",],
        correctAnswer: 4
    },
    {
        question: "Mike finished ahead of Paul. Paul and Brian both finished before Liam. Owen did not finish last. Who was the last to finish?",
        image: "images/q10.png",
        answers: ["Mike", "Paul", "Liam", "Brian",],
        correctAnswer: 3
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
