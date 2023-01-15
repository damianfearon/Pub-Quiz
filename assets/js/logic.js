//   Elements
var timerSpan = document.querySelector(".timer");
var container = document.querySelector(".wrapper");
var startBlock = document.querySelector("#start-screen");
var startBtn = document.querySelector("#start");

var quizContainer = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionsChoices = document.querySelector("#choices");

var endBlock = document.querySelector("#end-screen");

var finalScore = document.querySelector("#final-score");
var scoreBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");

var feedback = document.querySelector("#feedback");

// Timer function
var timeLeft = 75;
var timer;

function winGame() {
  endBlock.setAttribute("class", "show");
  score = timeLeft;
  finalScore.textContent = score;
  console.log("Your score is: " + score);
}

function loseGame() {
  console.log("Game Over");
}

function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Start button
startBtn.addEventListener("click", function () {
  startTimer();
  startBlock.setAttribute("class", "hide");
  quizContainer.setAttribute("class", "show");
  feedback.setAttribute("class", "feedback");
});

console.log(questions);

var index = 0;
var correctAnswer;

function quiz() {
  var question = questions[index];
  questionTitle.textContent = question.question;
  var buttons = "";
  answers = question.answers;
  correctAnswer = question.correctAnswer;

  // console.log(Object.keys(answers));
  // console.log(question.correctAnswer);

  for (var key in answers) {
    buttons += `<button>${key}. ${answers[key]}</button>`;
    questionsChoices.innerHTML = buttons;
  }
}

var score;

questionsChoices.addEventListener("click", function (e) {
  var userAnswer = e.target;
  var btnKey = userAnswer.innerText;
  var key = btnKey.charAt();
  if (userAnswer.matches("button")) {
    if (index < questions.length - 1) {
      if (key === correctAnswer) {
        feedback.textContent = "Correct!";
      } else {
        feedback.textContent = "Wrong!";
        timeLeft -= 20;
      }
      index++;
    } else {
      if (key !== correctAnswer) {
        timeLeft -= 20;
      }
      clearInterval(timer);
      winGame();
    }
  }

  // console.log(userAnswer, userAnswer.matches("button"));
  // console.log(index);
  // console.log(btnKey.charAt(0));

  quiz();
});

var playerList = [];

function storage() {
  if (localStorage.bestScores) {
    var storage = JSON.parse(localStorage.getItem("bestScores"));
    for (var i = 0; i < storage.length; i++) {
      playerList.push(storage[i]);
    }
    localStorage.clear();
  }
}

function storePlayers() {
  localStorage.setItem("bestScores", JSON.stringify(playerList));
}

scoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var playerObj = {
    player: initials.value.trim(),
    score: score,
  };

  playerList.push(playerObj);

  storage();
  storePlayers();

  window.open("../../highscores.html", "_self");
});
console.log(localStorage.getItem("bestScores"));

quiz();