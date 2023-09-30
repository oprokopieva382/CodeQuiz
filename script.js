import { questions } from "./store/state.js";

const toDisplayQuestion = document.getElementById("toDisplayQuestion");
const startQuiz = document.getElementById("startQuiz");
const text = document.getElementById("text");
const messageAlert = document.getElementById("message");

let message = "";
console.log(message);
let currentQuestion = 0;
let timeLeft = 0;

//run quiz question
const runQuestion = () => {
  if (currentQuestion >= questions.length) {
     messageAlert.innerHTML = "Quiz completed!";
    return;
  }
  console.log("runQuestion");
  toDisplayQuestion.innerHTML = questions[currentQuestion].question;
  startQuiz.remove();
  text.textContent = "";

  // Function to check the selected answer
  const checkAnswer = (e) => {
    const element = e.target;
    console.log("checkAnswer");
    if (element.classList.contains("true")) {
      messageAlert.innerHTML = "Correct";
      console.log(message);
    } else {
      messageAlert.innerHTML = "Wrong";
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
