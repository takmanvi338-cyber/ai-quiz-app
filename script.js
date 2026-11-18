
const questions = [
  {
    question: "What is HTML used for?",
    answers: [
      "Styling web pages",
      "Creating web page structure",
      "Managing databases",
      "Editing photos"
    ],
    correct: 1
  },
  {
    question: "Which language is used to style web pages?",
    answers: ["Python", "Java", "CSS", "C++"],
    correct: 2
  },
  {
    question: "What does JavaScript add to a website?",
    answers: [
      "Interactivity",
      "Only images",
      "Only colours",
      "Internet connection"
    ],
    correct: 0
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    answers: ["<p>", "<h1>", "<a>", "<img>"],
    correct: 2
  },
  {
    question: "Which symbol starts a JavaScript comment on one line?",
    answers: ["##", "//", "<!--", "**"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

function showQuestion() {
  selectedAnswer = null;
  answered = false;

  const q = questions[currentQuestion];
  questionElement.textContent =
    `Question ${currentQuestion + 1}: ${q.question}`;

  answersElement.innerHTML = "";
  feedbackElement.textContent = "";
  scoreElement.textContent = "";
  submitButton.textContent = "Submit Answer";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (answered) return;

      selectedAnswer = index;

      document.querySelectorAll(".answer").forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
    });

    answersElement.appendChild(button);
  });
}

submitButton.addEventListener("click", () => {
  if (currentQuestion >= questions.length) {
    currentQuestion = 0;
    score = 0;
    showQuestion();
    return;
  }

  if (!answered) {
    if (selectedAnswer === null) {
      feedbackElement.textContent = "Please select an answer!";
      return;
    }

    answered = true;

    if (selectedAnswer === questions[currentQuestion].correct) {
      score++;
      feedbackElement.textContent = "Correct! Well done!";
    } else {
      feedbackElement.textContent = "Not quite! Keep learning.";
    }

    submitButton.textContent =
      currentQuestion === questions.length - 1
        ? "See Final Score"
        : "Next Question";

  } else {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      questionElement.textContent = "Quiz Completed!";
      answersElement.innerHTML = "";
      feedbackElement.textContent = "Great effort!";

      scoreElement.textContent =
        `Your score: ${score} out of ${questions.length}`;

      submitButton.textContent = "Try Again";
    }
  }
});

showQuestion();
