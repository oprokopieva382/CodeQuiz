const questions = [
  {
    question: "What type of data does not exist in JS?",
    answer: [
      {
        text: "string",
        isCorrect: false,
      },
      {
        text: "number",
        isCorrect: false,
      },
      {
        text: "null",
        isCorrect: false,
      },
      {
        text: "thread",
        isCorrect: true,
      },
    ],
  },
  {
    question: "What example are the built-in methods in JS?",
    answer: [
      {
        text: "slip()",
        isCorrect: false,
      },
      {
        text: "hop()",
        isCorrect: false,
      },
      {
        text: "pop()",
        isCorrect: true,
      },
      {
        text: "strim()",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is not the scopes of variable in JS?",
    answer: [
      {
        text: "global scope",
        isCorrect: false,
      },
      {
        text: "local scope",
        isCorrect: false,
      },
      {
        text: "regional scope",
        isCorrect: true,
      },
    ],
  },
];
const toDisplayQuestion = document.getElementById("toDisplayQuestion");
const startQuiz = document.getElementById("startQuiz");
const text = document.getElementById("text");

let error = "";
let currentQuestion = 0;

const startQuestion = () => {
  toDisplayQuestion.innerHTML = questions[currentQuestion].question;
  startQuiz.remove();
  text.textContent = "";

  for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
    let buttonOption = document.createElement("button");
    buttonOption.className = questions[currentQuestion].answer[i].isCorrect;
    buttonOption.textContent = questions[currentQuestion].answer[i].text;

    let buttonDiv = document.createElement("div");
    buttonDiv.appendChild(buttonOption);
    text.appendChild(buttonDiv);
  }
};

startQuiz.addEventListener("click", startQuestion);
