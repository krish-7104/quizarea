var easy = "";
var medium = "";
var hard = "";
var start = 0;
let introCard = document.getElementById("startCard");
let select = document.getElementById("selectCard");
if (start == "0") {
  introCard.style.display = "flex";
  select.style.display = "none";
  start++;
} else {
  introCard.style.display = "none";
}
function selectCard() {
  introCard.style.display = "none";
  select.style.display = "block";
}
let optionSelect = document.getElementById("category");
var Categories = {};
url = "https://opentdb.com/api_category.php";
catgeoryData = "";
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    Categories = data.trivia_categories;
    html = "";
    Categories.forEach((element) => {
      html += `<option value="${element.id}">${element.name}</option>`;
    });
    optionSelect.innerHTML = html;
  });

let button = document.getElementById("generateQuiz");
button.addEventListener("click", () => {
  let noOfQue = document.getElementById("noOfQue").value;
  let playerName = document.getElementById("name").value;
  let category = document.getElementById("category").value;
  let difficulty = document.getElementById("difficulty").value;
  let CatName = "";
  if (playerName != "") {
    if (difficulty != "none") {
      if (difficulty == "easy") {
        if (noOfQue <= easy) {
          Categories.forEach((element) => {
            if (element.id == category) {
              CatName = element.name;
            }
          });
          let api = {
            Ques: noOfQue,
            CatId: category,
            CatName: CatName,
            Diff: difficulty,
          };
          localStorage.setItem("apiKey", JSON.stringify(api));
          localStorage.setItem("name", playerName);
          window.open("quizPage.html", "_self");
        } else {
          document.getElementById("noQUE").style.color = "red";
        }
      } else if (difficulty == "medium") {
        if (noOfQue <= medium) {
          Categories.forEach((element) => {
            if (element.id == category) {
              CatName = element.name;
            }
          });
          let api = {
            Ques: noOfQue,
            CatId: category,
            CatName: CatName,
            Diff: difficulty,
          };
          localStorage.setItem("apiKey", JSON.stringify(api));
          localStorage.setItem("name", playerName);
          window.open("quizPage.html", "_self");
        } else {
          document.getElementById("noQUE").style.color = "red";
        }
      } else if (difficulty == "hard") {
        if (noOfQue <= hard) {
          Categories.forEach((element) => {
            if (element.id == category) {
              CatName = element.name;
            }
          });
          let api = {
            Ques: noOfQue,
            CatId: category,
            CatName: CatName,
            Diff: difficulty,
          };
          localStorage.setItem("apiKey", JSON.stringify(api));
          localStorage.setItem("name", playerName);
          window.open("quizPage.html", "_self");
        } else {
          document.getElementById("noQUE").style.color = "red";
        }
      }
    } else {
      alert("Select Difficulty Level");
    }
  } else {
    alert("Enter Player Name");
  }
});

let ele = document.getElementById("difficulty");
ele.addEventListener("click", () => {
  let category = document.getElementById("category").value;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://opentdb.com/api_count.php?category=${category}`,
    true
  );
  xhr.onload = function () {
    easy = JSON.parse(this.responseText).category_question_count
      .total_easy_question_count;
    medium = JSON.parse(this.responseText).category_question_count
      .total_medium_question_count;
    hard = JSON.parse(this.responseText).category_question_count
      .total_hard_question_count;
    if (document.getElementById("difficulty").value == "easy") {
      if (easy <= 50) {
        document.getElementById(
          "noQUE"
        ).innerHTML = ` No Of Question (1-${easy}) `;
      } else {
        document.getElementById("noQUE").innerHTML = ` No Of Question (1-50) `;
      }
    }
    if (document.getElementById("difficulty").value == "medium") {
      if (medium <= 50) {
        document.getElementById(
          "noQUE"
        ).innerHTML = ` No Of Question (1-${medium}) `;
      } else {
        document.getElementById("noQUE").innerHTML = ` No Of Question (1-50) `;
      }
    }
    if (document.getElementById("difficulty").value == "hard") {
      if (hard <= 50) {
        document.getElementById(
          "noQUE"
        ).innerHTML = ` No Of Question (1-${hard}) `;
      } else {
        document.getElementById("noQUE").innerHTML = ` No Of Question (1-50) `;
      }
    }
  };
  xhr.send();
});

let ele2 = document.getElementById("category");
ele2.addEventListener("click", () => {
  let category = document.getElementById("category").value;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://opentdb.com/api_count.php?category=${category}`,
    true
  );
  xhr.onload = function () {
    easy = JSON.parse(this.responseText).category_question_count
      .total_easy_question_count;
    medium = JSON.parse(this.responseText).category_question_count
      .total_medium_question_count;
    hard = JSON.parse(this.responseText).category_question_count
      .total_hard_question_count;
    if (document.getElementById("difficulty").value == "easy") {
      document.getElementById(
        "noQUE"
      ).innerHTML = ` No Of Question (1-${easy}) `;
    }
    if (document.getElementById("difficulty").value == "medium") {
      document.getElementById(
        "noQUE"
      ).innerHTML = ` No Of Question (1-${medium}) `;
    }
    if (document.getElementById("difficulty").value == "hard") {
      document.getElementById(
        "noQUE"
      ).innerHTML = ` No Of Question (1-${hard}) `;
    }
  };
  xhr.send();
});
