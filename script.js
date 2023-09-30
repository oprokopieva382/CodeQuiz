import {questions} from "./store/state.js";

const toDisplayQuestion = document.getElementById("toDisplayQuestion");
const startQuiz = document.getElementById("startQuiz");
const text = document.getElementById("text");

let error = "";
let currentQuestion = 0;
let timeLeft = 0

const startQuestion = () => {
  console.log("startQuestion");
  toDisplayQuestion.innerHTML = questions[currentQuestion].question;
  startQuiz.remove();
  text.textContent = "";

  for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
    let buttonOption = document.createElement("button");
    buttonOption.classList.add(questions[currentQuestion].answer[i].isCorrect);
    buttonOption.textContent = questions[currentQuestion].answer[i].text;

    let buttonDiv = document.createElement("div");
    buttonDiv.appendChild(buttonOption);
    text.appendChild(buttonDiv);

   }
};

startQuiz.addEventListener("click", startQuestion);
