const apiData = localStorage.getItem("apiKey");
var apiDataJson = JSON.parse(apiData);
const playerName = localStorage.getItem("name");
const categoryId = apiDataJson.CatId;
const categoryName = apiDataJson.CatName;
const Questions = apiDataJson.Ques;
const Difficulty = apiDataJson.Diff;
var que = 1; //calculating question count
var selectedAns = "";
var correctAns = "";
const api = `https://opentdb.com/api.php?amount=${Questions}&category=${categoryId}&difficulty=${Difficulty}&type=multiple`;
var currentScore = 0;
var submitClickCount = 0;
var userAnsweredQuestions = {};
var userAnsweredQuestionsId = [];
var answeredLast = "";
scoreAndName();
instructWindow();
var allOpt = document.querySelectorAll("span.op");
document.addEventListener("DOMContentLoaded", () => {
  if (que == 1) {
    const previouBtn = document.getElementById("previous");
    previouBtn.style.color = "white";
  }
  if (que == Questions) {
    const nextBtn = document.getElementById("next");
    nextBtn.style.color = "white";
  }
  questionAnsweredValidate();
});

//displaying score and username
function scoreAndName() {
  let scoreDisplay = document.getElementById("score");
  scoreDisplay.innerHTML = `Score: ${currentScore}`;
  let userName = document.getElementById("playerName");
  userName.innerHTML = `Player: ${playerName}`;
}

//calling quiz form server
fetch(api)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.response_code === 0) {
      allQuizData = data.results;
      quizQuestionShow(allQuizData);
    } else {
      alert("Unable To Get Quiz For This Category, Try Another");
      window.open("index.html", "_self");
    }
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
  let options = [];
  data[que - 1].incorrect_answers.forEach((option) => {
    options.push(option);
  });
  options.push(data[que - 1].correct_answer);
  options.sort(() => Math.random() - 0.5);
  op1.innerHTML = options[0];
  op2.innerHTML = options[1];
  op3.innerHTML = options[2];
  op4.innerHTML = options[3];
  correctAns = data[que - 1].correct_answer;
}

function nextBtnClick() {
  let optList = document.querySelectorAll(".op");
  optList.forEach((element) => {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
  });
  selectedAns = "";
  let hoverBtns = document.querySelectorAll(".op");
  hoverBtns.forEach((element) => {
    element.classList.remove("noHover");
  });
  allOpt.forEach((element) => {
    element.classList.remove("selected");
  });
  submitClickCount = 0;
  selectedCount = 0;

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
  hideText();
  questionAnsweredValidate();
}

function previousBtnClick() {
  let optList = document.querySelectorAll(".op");
  optList.forEach((element) => {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
  });
  selectedAns = "";
  let hoverBtns = document.querySelectorAll(".op");
  hoverBtns.forEach((element) => {
    element.classList.remove("noHover");
  });
  allOpt.forEach((element) => {
    element.classList.remove("selected");
  });
  submitClickCount = 0;
  selectedCount = 0;
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
  hideText();
  questionAnsweredValidate();
}
function highlightSelected(id) {
  document.getElementById(id).classList.add("selected");
  allOpt = document.querySelectorAll("span.op");
  selectedAns = document.getElementById(id).innerText;
  allOpt.forEach((element) => {
    if (element.id != id) {
      element.classList.remove("selected");
    }
  });
}
function checkAns() {
  if (selectedAns != "") {
    let hoverBtns = document.querySelectorAll(".op");
    hoverBtns.forEach((element) => {
      // element.classList.add("noHover");
    });
    submitClickCount++;
    if (submitClickCount == 1) {
      if (selectedAns.toLowerCase() == HTMLDecode(correctAns).toLowerCase()) {
        currentScore += 10;
        let success = document.getElementById("addScore");
        let Sampletext = document.getElementById("sampleText");
        Sampletext.style.display = "none";
        success.style.display = "block";
      } else {
        currentScore -= 5;
        let error = document.getElementById("removeScore");
        let Sampletext = document.getElementById("sampleText");
        Sampletext.style.display = "none";
        let optList = document.querySelectorAll(".op");
        optList.forEach((element) => {
          if (
            selectedAns.toLowerCase() ==
            HTMLDecode(element.innerHTML).toLowerCase()
          ) {
            element.classList.add("incorrect");
          }
        });
        error.style.display = "block";
      }
      let optList = document.querySelectorAll(".op");
      optList.forEach((element) => {
        if (
          element.innerText.toLowerCase() ==
          HTMLDecode(correctAns).toLowerCase()
        ) {
          element.classList.add("correct");
        }
      });
      scoreAndName();
      userAnsweredData();
      selectedAns = "";
    }
  }
}

function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function hideText() {
  let error = document.getElementById("removeScore");
  let Sampletext = document.getElementById("sampleText");
  let success = document.getElementById("addScore");
  Sampletext.style.display = "block";
  Sampletext.innerText = "+10 For Correct And -5 For Incorrect Answer";
  success.style.display = "none";
  error.style.display = "none";
  let subBtn = document.getElementById("Submit");
  subBtn.removeAttribute("disabled");
}
function userAnsweredData() {
  let userQue = document.getElementById("questionName").innerText;
  let o1 = document.getElementById("op1").innerText;
  let o2 = document.getElementById("op2").innerText;
  let o3 = document.getElementById("op3").innerText;
  let o4 = document.getElementById("op4").innerText;
  userAnsweredQuestions[que] = {
    que: userQue,
    op1: o1,
    op2: o2,
    op3: o3,
    op4: o4,
    correct: correctAns,
    selected: selectedAns,
  };
}

function questionAnsweredValidate() {
  for (queId in userAnsweredQuestions) {
    if (queId == que) {
      document.getElementById("op1").innerText =
        userAnsweredQuestions[queId]["op1"];
      document.getElementById("op2").innerText =
        userAnsweredQuestions[queId]["op2"];
      document.getElementById("op3").innerText =
        userAnsweredQuestions[queId]["op3"];
      document.getElementById("op4").innerText =
        userAnsweredQuestions[queId]["op4"];
      let optList = document.querySelectorAll(".op");
      optList.forEach((element) => {
        if (
          element.innerText == userAnsweredQuestions[queId]["selected"] &&
          element.innerText ==
            userAnsweredQuestions[queId]["correct"].toUpperCase()
        ) {
          element.classList.add("correct");
          let Sampletext = document.getElementById("sampleText");
          Sampletext.innerText = "YOU HAVE ALREADY ATTEMPTED THE QUESTION";
          let subBtn = document.getElementById("Submit");
          subBtn.setAttribute("disabled", "true");
        } else {
          if (element.innerText == userAnsweredQuestions[queId]["selected"]) {
            element.classList.add("incorrect");
            let Sampletext = document.getElementById("sampleText");
            Sampletext.innerText = "YOU HAVE ALREADY ATTEMPTED THE QUESTION";
            let subBtn = document.getElementById("Submit");
            subBtn.setAttribute("disabled", "true");
          }
          if (
            element.innerText ==
            userAnsweredQuestions[queId]["correct"].toUpperCase()
          ) {
            element.classList.add("correct");
            let Sampletext = document.getElementById("sampleText");
            Sampletext.innerText = "YOU HAVE ALREADY ATTEMPTED THE QUESTION";
            let subBtn = document.getElementById("Submit");
            subBtn.setAttribute("disabled", "true");
          }
        }
      });
    }
  }
}
var flag = 0;
function resultDisplay() {
  let displayArea = document.getElementById("resultShow");
  displayArea.style.display = "block";

  if (Object.keys(userAnsweredQuestions).length === 0) {
    window.open("index.html", "_self");
  } else {
    html = `<h3>Attempted Questions! | You Score : ${currentScore}</h3>`;
    for (element in userAnsweredQuestions) {
      let o1 = userAnsweredQuestions[element]["op1"];
      let o2 = userAnsweredQuestions[element]["op2"];
      let o3 = userAnsweredQuestions[element]["op3"];
      let o4 = userAnsweredQuestions[element]["op4"];
      html += `<div id="questionSec">
      <p id="quesNo">Question NO ${element}</p>
      <br />
      <p id="questionName">
      ${userAnsweredQuestions[element]["que"]}
      </p>
    </div>
    <div class="options">
      <span class="op" onclick="highlightSelected(this.id)" id="op1"
        >${o1}</span
      >
      <span class="op" onclick="highlightSelected(this.id)" id="op2"
        >${o2}</span
      >
      <span class="op" onclick="highlightSelected(this.id)" id="op3"
        >${o3}</span
      >
      <span class="op" onclick="highlightSelected(this.id)" id="op4"
        >${o4}</span
      >
    </div>
    <div class="textView">
    <p class="text"><b>Correct Answer:</b> <span id="correctSpan">${userAnsweredQuestions[element]["correct"]}</span></p>
    <p class="text"><b>You Selected:</b> <span id="selectedSpan">${userAnsweredQuestions[element]["selected"]}</span></p>
 </div> 
    <hr>
    `;
    }
    html += `<div class="playBtn"><button id = "playAnother" onclick="playQuiz()">Play Another Quiz</button></div>`;
    displayArea.innerHTML = html;
    let fot = document.querySelector("footer");
    fot.style.position = "relative";
  }
}

function playQuiz() {
  window.open("index.html", "_self");
}

function closeBtnClick() {
  if (confirm("Do You Want To Go To Result?") == true) {
    resultDisplay();
    document.getElementById("quizShow").style.display = "none";
  }
}
