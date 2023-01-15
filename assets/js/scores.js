
var highScores = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");

var scores = [];

function getList() {
  if (localStorage.bestScores) {
    var storage = JSON.parse(localStorage.getItem("bestScores"));

    for (var i = 0; i < storage.length; i++) {
      scores.push(storage[i]);
    }
  }
}

// Render a new li for each score
function scoreList() {
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = `Player: ${score.player} - Score: ${score.score}`;

    highScores.appendChild(li);
  }
}
getList();

scores.sort(function (a, b) {
  return a.score - b.score;
});
scores.reverse();

scoreList();

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});