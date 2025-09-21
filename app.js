const quiz = [
    {
        question: "1: Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string"],
        correctAnswer: 0
    },
    {
        question: "2: What is the correct syntax to write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alert('Hello World');", "prompt('Hello World');"],
        correctAnswer: 1
    },
    {
        question: "3: Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/* */", "#"],
        correctAnswer: 0
    },
    {
        question: "4: Which operator is used to compare both value and type?",
        options: ["==", "===", "="],
        correctAnswer: 1
    },
    {
        question: "5: Which built-in method converts a string to uppercase?",
        options: ["toUpperCase()", "upperCase()", "changeCase()"],
        correctAnswer: 0
    },
    {
        question: "6: Which of the following is NOT a JavaScript data type?",
        options: ["Number", "Boolean", "Character"],
        correctAnswer: 2
    },
    {
        question: "7: Which function is used to parse a string to an integer?",
        options: ["parseInt()", "parseFloat()", "Number()"],
        correctAnswer: 0
    },
    {
        question: "8: Which method adds an element at the end of an array?",
        options: ["push()", "pop()", "shift()"],
        correctAnswer: 0
    },
    {
        question: "9: Which object is used to work with dates in JavaScript?",
        options: ["Calendar", "Date", "Time"],
        correctAnswer: 1
    },
    {
        question: "10: How do you write a function in JavaScript?",
        options: ["function myFunc() {}", "def myFunc() {}", "func myFunc() {}"],
        correctAnswer: 0
    }
];


let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let incorrectCount = 0;
let userAnswers = [];
let timerInterval;
let timeLeft = 60;
let currentSelection = null;

let quizOptions = document.getElementById("quizOption");
let nextQuestionButton = document.getElementById("nextQuestion");
let progressBar = document.getElementById("progressBar");
let timeLeftElement = document.getElementById("timeLeft");
let quizContainer = document.getElementById("quizContainer");
let resultContainer = document.getElementById("resultContainer");

function renderQuestions() {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz[currentQuestion].question;

    quizOptions.innerHTML = '';
    for (let i = 0; i < quiz[currentQuestion].options.length; i++) {
        quizOptions.innerHTML += `<li onclick="checkCorrect(event)" class="non-active">${quiz[currentQuestion].options[i]}</li>`;
    }

    updateProgress();
    startTimer();
}

function goToNext() {
    clearInterval(timerInterval);

    let userAnswer = currentSelection ? Array.from(quizOptions.children).indexOf(currentSelection) : -1;
    userAnswers.push(userAnswer);

    if (currentSelection && quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer] === currentSelection.innerHTML) {
        score += 10;
        correctCount++;
    } else {
        incorrectCount++;
    }

    currentQuestion++;
    if (currentQuestion < quiz.length) {
        renderQuestions();
        nextQuestionButton.disabled = true;
        currentSelection = null;
    } else {
        // Abhi direct result show karne ki bajaye "Check Result" button dikhayenge
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        resultContainer.innerHTML = `
            <h2>✅ Quiz Completed!</h2>
            <p>Click below to check your results</p>
            <button onclick="showResult()">Check Result</button>
            <button onclick="resetQuiz()">Try Again</button>
        `;
        progressBar.style.width = "100%";
    }
}
function checkCorrect(event) {
    for (let i = 0; i < quizOptions.children.length; i++) {
        quizOptions.children[i].classList.remove("active-class");
        quizOptions.children[i].classList.add("non-active");
    }
    event.target.classList.add("active-class");
    event.target.classList.remove("non-active");
    currentSelection = event.target;
    nextQuestionButton.disabled = false;
}

function updateProgress() {
    const progress = ((currentQuestion) / quiz.length) * 100;
    progressBar.style.width = progress + "%";
}
function showResult() {
    clearInterval(timerInterval);
    const totalQuestions = quiz.length;
    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);

    let message = percentage >= 50
        ? `<p class="result-message pass">🎉 Congratulations! You have passed the quiz.</p>`
        : `<p class="result-message fail">😟 You need to work harder. Try again!</p>`;

    resultContainer.innerHTML = `
        <h2>📊 Quiz Results</h2>
        <p>Total Questions: ${totalQuestions}</p>
        <p>✅ Correct Answers: ${correctCount}</p>
        <p>❌ Incorrect Answers: ${incorrectCount}</p>
        <p>Score: ${score}/${totalQuestions * 10}</p>
        <p>Percentage: ${percentage}%</p>
        ${message}
        <button onclick="showDetailedResults()">Check Detailed Results</button>
        <button onclick="resetQuiz()">Try Again</button>
    `;
}

function showDetailedResults() {
    resultContainer.innerHTML = `<h2>📑 Detailed Results</h2>`;
    for (let i = 0; i < quiz.length; i++) {
        const userAnswerIndex = userAnswers[i];
        const isCorrect = userAnswerIndex === quiz[i].correctAnswer;
        const wasAnswered = userAnswerIndex !== undefined && userAnswerIndex !== -1;

        resultContainer.innerHTML += `
            <div style="margin-bottom:15px; padding:10px; border-radius:8px; background-color:${isCorrect ? '#d4edda' : '#f8d7da'};">
                <p><b>${quiz[i].question}</b></p>
                <p>Your Answer: <span style="color:${isCorrect ? 'green' : 'red'}">${wasAnswered ? quiz[i].options[userAnswerIndex] : 'Not answered'}</span></p>
                <p>Correct Answer: <span style="color:green">${quiz[i].options[quiz[i].correctAnswer]}</span></p>
            </div>`;
    }
    resultContainer.innerHTML += `<button onclick="resetQuiz()">🔄 Restart Quiz</button>`;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
    userAnswers = [];
    currentSelection = null;
    nextQuestionButton.disabled = true;
    progressBar.style.width = "0%";

    quizContainer.style.display = "block";
    resultContainer.style.display = "none";

    renderQuestions();
}

function startTimer() {
    timeLeft = 60;
    timeLeftElement.textContent = formatTime(timeLeft);
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeLeft = 0;
        goToNext();
    }
    timeLeftElement.textContent = formatTime(timeLeft);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

renderQuestions();
