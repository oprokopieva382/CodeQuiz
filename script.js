import { questions } from "./store/state.js";

const toDisplayQuestion = document.getElementById("toDisplayQuestion");
const startQuiz = document.getElementById("startQuiz");
const text = document.getElementById("text");
const messageAlert = document.getElementById("message");
const resultMessageAlert = document.getElementById("resultMessage");
const time = document.getElementById("time");
const quizSection = document.getElementById("quizSection");
const seeResultSection = document.getElementById("seeResultSection");
const resultText = document.getElementById("resultText");
const submitButton = document.getElementById("submit");
const initials = document.getElementById("initials");

let currentQuestion = 0;
let timeLeft;



//start timer when quiz runs
const startTimer = () => {
  console.log("tick tack start");
  timeLeft = 75;

  let timer = setInterval(() => {
    timeLeft--;
    time.textContent = `Time: ${timeLeft}`;
    console.log("tick tack--");

    if (timeLeft === 0) {
      clearInterval(timer);
      console.log("tick tack stop 0");
      endQuiz();
    }

    if (currentQuestion >= questions.length) {
      console.log("tick tack stop questions length");
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
};

//store player initials and score in local storage
const storeData = (e) => {
  console.log("storeInitials start");
  e.preventDefault();
  let data = {
    playerInitials: initials.value.trim(),
    playerScore: timeLeft,
  };
  console.log(data);
  if (!initials.value.trim().length) {
    console.log("You have to enter your initials❗");
    resultMessageAlert.textContent = "❗You have to enter your initials❗";
  } else {
    resultMessageAlert.textContent = "Submitted successfully✨";
    localStorage.setItem("playerData", JSON.stringify(data));
    console.log("data stored");
  }
};

//end quiz and display result and submit initials
const endQuiz = () => {
  quizSection.style.display = "none";
  seeResultSection.style.display = "flex";
  seeResultSection.style.height = "80vh";
  resultText.innerHTML = `🎉Your final score is: ${timeLeft}🎉`;
};

// function to check the selected answer
const checkAnswer = (e) => {
  const element = e.target;
  console.log("checkAnswer");
  if (element.classList.contains("true")) {
    messageAlert.innerHTML = "That is exactly correct🤗";
  } else {
    messageAlert.innerHTML = "Unfortunately wrong, bro🫢";
  }
  currentQuestion++;
  runQuestion();
};

// run quiz question function
const runQuestion = () => {
  if (currentQuestion >= questions.length) {
    endQuiz();
  } else {
    console.log("runQuestion");
    toDisplayQuestion.innerHTML = questions[currentQuestion].question;
    startQuiz.remove();
    text.textContent = "";

    //run through the answer array to create and display buttons with content
    for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
      let buttonOption = document.createElement("button");
      buttonOption.classList.add(
        questions[currentQuestion].answer[i].isCorrect
      );
      buttonOption.textContent = questions[currentQuestion].answer[i].text;

      let buttonDiv = document.createElement("div");
      buttonDiv.appendChild(buttonOption);
      text.appendChild(buttonDiv);

      buttonOption.addEventListener("click", checkAnswer);
    }
  }
};

//start quiz, run question, start timer
const startQuizRun = () => {
  startTimer();
  runQuestion();
};

startQuiz.addEventListener("click", startQuizRun);
submitButton.addEventListener("click", storeData);
