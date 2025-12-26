const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const quiestionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
{
    question: "What is the capital of Kazakhstan?",
    answers: [
        {text: "London", correct: false},
        {text: "Astana", correct: true},
        {text: "Madrid", correct: false},
        {text: "Paris", correct: false},
    ],
},
{
    question: "Whos is the first president of Kazakhstan?",
    answers: [
        {text: "Nursultan Nazarbayev", correct: true},
        {text: "Donald Trump", correct: false},
        {text: "Vladimir Putin", correct: false},
        {text: "Barack Obama", correct: false},
    ],
},
{
    question: "Which Kazakh poet is the author of “Kara Sozder”?",
    answers: [
        {text: "Olzhas Suleimenov", correct: false},
        {text: "Shakarim Kudaiberdiuly", correct: false},
        {text: "Mukagali Makatayev", correct: false},
        {text: "Abai Qunanbaiuly", correct: true},
    ],
},
{
    question: "Which Kazakh boxer is a former unified middleweight world champion?",
    answers: [
        {text: "Serik Sapiyev", correct: false},
        {text: "Gennady Golovkin", correct: true},
        {text: "Daniyar Yeleussinov", correct: false},
        {text: "Bakhtiyar Artayev", correct: false},
    ],
},
{
    question: "Which Kazakh singer gained worldwide fame after winning the “Singer 2017” competition in China?",
    answers: [
        {text: "Madina Saduakasova", correct: false},
        {text: "Kairat Nurtas", correct: false},
        {text: "Dimash Qudaibergen", correct: true},
        {text: "Roza Rymbayeva", correct: false},
    ],
}]

let questionsDisabled = false;
let currentQuestionIndex = 0;
let score = 0;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
    
}

function showQuestion(){
    questionsDisabled = false
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    const progressPercent = (currentQuestionIndex/ quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    quiestionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    })

}


function selectAnswer(event){
    if(questionsDisabled) return;

    questionsDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    })

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }
        else{
            showResult();
        }
    }, 1000)
}

function showResult(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/ quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
  }
}


function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}