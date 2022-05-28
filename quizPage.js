let apiData = localStorage.getItem("apiKey");
apiDataJson = JSON.parse(apiData);
let playerName = apiDataJson.Name;
let categoryId = apiDataJson.CatId;
let categoryName = apiDataJson.CatName;
let Questions = apiDataJson.Ques;
let Difficulty = apiDataJson.Diff;
let api = `https://opentdb.com/api.php?amount=${Questions}&category=${categoryId}&difficulty=${Difficulty}&type=multiple`;
//displaying score and username
let scoreDisplay = document.getElementById("score");
let score = localStorage.getItem("score");
if (score == null) {
  scoreDisplay.innerHTML = `Score: 0`;
} else {
  scoreDisplay.innerHTML = `Score: ${score}`;
}
let userName = document.getElementById("playerName");
userName.innerHTML = `Player: ${playerName}`;
// localStorage.clear();
fetch(api)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    allQuizData = data.results;
    dataDistrubution(allQuizData);
  });
//Start Quiz Button
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
let startQuizBtn = document.getElementById("startBtn");
startQuizBtn.addEventListener("click", () => {
  let startSec = document.getElementById("quizStart");
  let showSec = document.getElementById("quizShow");
  startSec.style.display = "none";
  showSec.style.display = "flex";
  quizQuestionShow();
});
var que = 1;
var question = [];
var incorrectAns = [];
var correctAns = [];
var allOptions = [];
function dataDistrubution(allQuizData) {
  allQuizData.forEach((element, index) => {
    question.push(element.question);
    incorrectAns.push(element.incorrect_answers);
    correctAns.push(element.correct_answer);
    allOptions.push(element.incorrect_answers, element.correct_answer);
  });
}
function quizQuestionShow() {
  let queShow = document.getElementById("questionName");
  let op1 = document.getElementById("op1");
  let op2 = document.getElementById("op2");
  let op3 = document.getElementById("op3");
  let op4 = document.getElementById("op4");
  queShow.innerHTML = allQuizData[que - 1].question;
  op1.innerHTML = allQuizData[que - 1].incorrect_answers[0];
  op2.innerHTML = allQuizData[que - 1].incorrect_answers[1];
  op3.innerHTML = allQuizData[que - 1].incorrect_answers[2];
  op4.innerHTML = allQuizData[que - 1].correct_answer;
}
