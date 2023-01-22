//   Elements for Pub Quiz
var container = document.querySelector(".wrapper");
var startBlock = document.querySelector("#start-screen");
var timerSpan = document.querySelector(".timer");
var startBtn = document.querySelector("#start");

var questionsChoices = document.querySelector("#choices");
var quizContainer = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");

var finalScore = document.querySelector("#final-score");
var scoreBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");

var endBlock = document.querySelector("#end-screen");

var correctSound = new Audio(
  ".../../assets/sfx/correct.wav"
);
var incorrectSound = new Audio(
  "../../assets/sfx/incorrect.wav"
);

// Array = one object for each of the questions.

var questions = [
  {
    question: "What is the capital on England",
    answers: {
      a: "London",
      b: "Manchester",
      c: "Sydney",
    },
    correctAnswer: "a",
  },
  {
    question: "‘The Godfather’ was released in 1972; who played the title role?",
    answers: {
      a: "Robert De Niro",
      b: "Robert Duvall",
      c: "Marlon Brando",
      d: "Al Pacino",
    },
    correctAnswer: "c",
  },
  {
    question: "Which country became the first to give women the vote in 1893?",
    answers: {
      a: "United Kingdom",
      b: "New Zealand",
      c: "Australia",
      d: "Germany",
      e: "None of these countries",
    },
    correctAnswer: "b",
  },
    

];

// Timer (top right)
var timeLeft = 75;
var timer;

function winGame() {
  endBlock.setAttribute("class", "show");
  score = timeLeft;
  quizContainer.setAttribute("class", "hide");
  feedback.setAttribute("class", "hide");
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
        feedback.textContent = "Correct! Keep Going!";
        correctSound.play();
      } else {
        feedback.textContent = "Incorrect!";
        incorrectSound.play();
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

  window.open(
    "https://github.com/damianfearon/Pub-Quiz/blob/main/highscores.html",
    "_self"
  );
});
console.log(localStorage.getItem("bestScores"));

quiz();