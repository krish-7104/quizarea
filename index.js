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
  Categories.forEach((element) => {
    if (element.id == category) {
      CatName = element.name;
    }
  });
  if (playerName.length == 0) {
    playerName = "⚡⚡⚡⚡";
  }
  let api = {
    Ques: noOfQue,
    CatId: category,
    CatName: CatName,
    Diff: difficulty,
    Name: playerName,
  };
  localStorage.setItem("apiKey", JSON.stringify(api));
  window.location.replace("quizPage.html");
});
