import { questions } from "./store/state.js";

const toDisplayQuestion = document.getElementById("toDisplayQuestion");
const startQuiz = document.getElementById("startQuiz");
const text = document.getElementById("text");
const messageAlert = document.getElementById("message");
const time = document.getElementById("time");
const seeResultButton = document.getElementById("seeResult");

let message = "";
console.log(message);
let currentQuestion = 0;
let timeLeft = 60;

//display result.html page with score and submit initials
// const endQuiz = () => {
//   window.location.href = "results.html";
//   time.textContent = `Time: ${timeLeft}`;
//   text.textContent = `Your final score is: ${timeLeft}`;
//   messageAlert.innerHTML = "Quiz completed!";

// };

//run quiz question
const runQuestion = () => {
  if (currentQuestion >= questions.length) {
    seeResultButton.style.display = "block"
    //endQuiz();
    return;
  }
  console.log("runQuestion");
  toDisplayQuestion.innerHTML = questions[currentQuestion].question;
  startQuiz.remove();
  text.textContent = "";
  time.innerHTML = `Time: ${timeLeft}`;

  // Function to check the selected answer
  const checkAnswer = (e) => {
    const element = e.target;
    console.log("checkAnswer");
    if (element.classList.contains("true")) {
      messageAlert.innerHTML = "That is exactly correct🤗";
      console.log(message);
    } else {
      messageAlert.innerHTML = "Unfortunately wrong, bro🫢";
      console.log(message);
    }
    currentQuestion++;
    runQuestion();
  };

  //run through the answer array to create and display buttons with content
  for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
    let buttonOption = document.createElement("button");
    buttonOption.classList.add(questions[currentQuestion].answer[i].isCorrect);
    buttonOption.textContent = questions[currentQuestion].answer[i].text;

    let buttonDiv = document.createElement("div");
    buttonDiv.appendChild(buttonOption);
    text.appendChild(buttonDiv);

    buttonOption.addEventListener("click", checkAnswer);
  }
};

startQuiz.addEventListener("click", runQuestion);