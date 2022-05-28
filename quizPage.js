const apiData = localStorage.getItem("apiKey");
var apiDataJson = JSON.parse(apiData);
const playerName = localStorage.getItem("name");
const categoryId = apiDataJson.CatId;
const categoryName = apiDataJson.CatName;
const Questions = apiDataJson.Ques;
const Difficulty = apiDataJson.Diff;
var que = 1; //calculating question count
const api = `https://opentdb.com/api.php?amount=${Questions}&category=${categoryId}&difficulty=${Difficulty}&type=multiple`;

scoreAndName();
instructWindow();

document.addEventListener("DOMContentLoaded", () => {
  if (que == 1) {
    const previouBtn = document.getElementById("previous");
    previouBtn.style.color = "white";
  }
  if (que == Questions) {
    const nextBtn = document.getElementById("next");
    nextBtn.style.color = "white";
  }
});

//displaying score and username
function scoreAndName() {
  let scoreDisplay = document.getElementById("score");
  let score = localStorage.getItem("score");
  if (score == null) {
    scoreDisplay.innerHTML = `Score: 0`;
    localStorage.setItem("score", 0);
  } else {
    scoreDisplay.innerHTML = `Score: ${score}`;
  }
  let userName = document.getElementById("playerName");
  userName.innerHTML = `Player: ${playerName}`;
  // localStorage.removeItem("apiKey");
}

//calling quiz form server
fetch(api)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    allQuizData = data.results;
    quizQuestionShow(allQuizData);
  });

//start window close and displaying rules
function instructWindow() {
  let showTitle = document.getElementById("title");
  showTitle.innerHTML = `<p>${categoryName}</p>`;
  let description = document.getElementById("description");
  description.innerHTML = `          <ul>
                                      <div id = "rules"><p>Instructions For Quiz</p></div>
                                      <li>No Of Questions: ${Questions}</li>
                                      <li>Difficulty Level: ${Difficulty}</li>
                                      <li>Multiple Choice Questions</li>
                                      <li>+10 Score For Correct Ans</li>
                                      <li>-5 Score For InCorrect Ans</li>
                                    </ul>`;
}
let startQuizBtn = document.getElementById("startBtn");
startQuizBtn.addEventListener("click", () => {
  let startSec = document.getElementById("quizStart");
  let showSec = document.getElementById("quizShow");
  startSec.style.display = "none";
  showSec.style.display = "flex";
});

//displying the question
function quizQuestionShow(data) {
  let queShow = document.getElementById("questionName");
  let op1 = document.getElementById("op1");
  let op2 = document.getElementById("op2");
  let op3 = document.getElementById("op3");
  let op4 = document.getElementById("op4");
  queShow.innerHTML = data[que - 1].question;
  op1.innerHTML = data[que - 1].incorrect_answers[0];
  op2.innerHTML = data[que - 1].incorrect_answers[1];
  op3.innerHTML = data[que - 1].incorrect_answers[2];
  op4.innerHTML = data[que - 1].correct_answer;
}

function nextBtnClick() {
  if (que < Questions) {
    que++;
  }
  quizQuestionShow(allQuizData);
  if (que != 1) {
    const previouBtn = document.getElementById("previous");
    previouBtn.style.color = "black";
  }
  if (que == Questions) {
    const nextBtn = document.getElementById("next");
    nextBtn.style.color = "white";
  }
  let queNo = document.getElementById("quesNo");
  queNo.innerText = `Question no ${que}`;
}

function previousBtnClick() {
  if (que != 1) {
    que--;
  }
  quizQuestionShow(allQuizData);
  if (que == 1) {
    const previouBtn = document.getElementById("previous");
    previouBtn.style.color = "white";
  }
  if (que != Questions) {
    const nextBtn = document.getElementById("next");
    nextBtn.style.color = "black";
  }
  let queNo = document.getElementById("quesNo");
  queNo.innerText = `Question no ${que}`;
}
