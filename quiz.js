const questions = [
  {
    question: "Who is called the man of few words ?",
    answers: [
      { text: "Iyappan", correct: false },
      { text: "Ricon Priyankara", correct: true },
      { text: "Mohamed Shathir", correct: false },
      { text: "Jefrin Jetly", correct: false }
    ]
  },
  {
    question: "Who is greatest of all time in free fire ?",
    answers: [
      { text: "Cross Noyal Pranesh", correct: false },
      { text: "Jegan", correct: false },
      { text: "Ricon Priyankara", correct: true },
      { text: "Abishek", correct: false }
    ]
  },
  {
    question: "Who is ultra bot in free fire ?",
    answers: [
      { text: "Ricon Priyankara", correct: false },
      { text: "Abishek", correct: false },
      { text: "Steni", correct: false },
      { text: "Jegan", correct: true }
    ]
  },
  {
    question: "Who is the unlucky person in love ?",
    answers: [
      { text: "Steni", correct: true },
      { text: "Harish", correct: false },
      { text: "Abilash", correct: false },
      { text: "Mohamed Shathir", correct: false }
    ]
  }
];

var questionElement = document.getElementById("question");
var answerButton = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

var currentQuestionIndex = 0;
var score = 0;

function startQuiz() {
  resetState();
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next"
  showQuestion();
}

function showQuestion() {
  resetButtons();
  var currentQuestion = questions[currentQuestionIndex];
  var questionNo = currentQuestionIndex + 1;
  questionElement.textContent = questionNo + ". " + currentQuestion.question;

  answerButton.innerHTML = '';

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.setAttribute("class", "btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetButtons() {
  var buttons = answerButton.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.removeEventListener('click', selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


function showScore(){
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();