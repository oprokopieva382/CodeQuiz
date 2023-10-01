import { questions } from "../store/state.js";

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
  timeLeft = 75;

  let timer = setInterval(() => {
    timeLeft--;
    time.textContent = `Time: ${timeLeft}`;
    timeLeft = Math.max(0, timeLeft);

    if (timeLeft === 0) {
      clearInterval(timer);
      endQuiz();
    }

    if (currentQuestion >= questions.length) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
};

//check for existing data in local storage, if there is not - store player info, if yes - add new to existing
const storeData = (e) => {
  e.preventDefault();

  let existingData = JSON.parse(localStorage.getItem("playersData"));
  const playerInitials = initials.value.trim();
  const playerScore = timeLeft;

  if (!playerInitials.length) {
    resultMessageAlert.textContent = "❗Type your initials first❗";
  } else {
    if (!Array.isArray(existingData)) {
      existingData = [];
    }
    existingData.push({ playerInitials, playerScore });
    resultMessageAlert.textContent =
      "Submitted successfully✨Use link above to see best players";
    localStorage.setItem("playersData", JSON.stringify(existingData));
    submitButton.disabled = true;
    // window.location.href = "../scoresRecord.html";
  }
};

//end quiz and display result and option to submit initials
const endQuiz = () => {
  quizSection.style.display = "none";
  seeResultSection.style.display = "flex";
  seeResultSection.style.height = "80vh";
  resultText.innerHTML = `🎉Your final score is: ${timeLeft}🎉`;
};

// function to check if selected answer correct or not, and if not subtract 10 sec, but keep timer >= 0
const checkAnswer = (e) => {
  const element = e.target;
  if (element.classList.contains("true")) {
    messageAlert.innerHTML = "That is exactly correct🤗";
  } else {
    timeLeft -= 10;
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
