const quiz = [
    { question: "1: What is the correct syntax to show an alert box in JavaScript?", options: ["alertBox('Hello');", "msg('Hello');", "alert('Hello');", "popup('Hello');"], correctAnswer: 2 },
    { question: "2: Which keyword is used to declare a variable in JavaScript?", options: ["let", "print", "declare", "echo"], correctAnswer: 0 },
    { question: "3: Which operator is used to concatenate strings in JavaScript?", options: ["-", "+", "*", "%"], correctAnswer: 1 },
    { question: "4: How do you write a single-line comment in JavaScript?", options: ["<!-- -->", "/**/", "//", "\\\\"], correctAnswer: 2 },
    { question: "5: What is the purpose of an if statement?", options: ["To run a loop", "To check conditions", "To create an array", "To join strings"], correctAnswer: 1 },
    { question: "6: Which function is used to take input from the user in JavaScript?", options: ["input()", "get()", "prompt()", "read()"], correctAnswer: 2 },
    { question: "7: Which property is used to count elements in an array?", options: ["count", "length", "size", "total"], correctAnswer: 1 },
    { question: "8: Which is the strict equality operator in JavaScript?", options: ["==", "=", "===", "!="], correctAnswer: 2 },
    { question: "9: Inside which HTML tag do we write JavaScript code?", options: ["html", "script", "style", "code"], correctAnswer: 1 },
    { question: "10: Which keyword is used to exit a loop in JavaScript?", options: ["stop", "exit", "break", "halt"], correctAnswer: 2 }
];

let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let incorrectCount = 0;

let scoreElement = document.getElementById("score");
let progressBar = document.getElementById("progressBar");
let quizOptions = document.getElementById("quizOption");
let nextQuestionButton = document.getElementById("nextQuestion");

let currentSelection = null;

function renderQuestions() {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz[currentQuestion].question;

    quizOptions.innerHTML = '';
    for (let i = 0; i < quiz[currentQuestion].options.length; i++) {
        quizOptions.innerHTML += `<li onclick="checkCorrect(event)" class="non-active" style="padding:5px; cursor:pointer;">${quiz[currentQuestion].options[i]}</li>`;
    }

    updateProgress();
}

function goToNext() {
    if (quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer] === currentSelection.innerHTML) {
        score += 10;
        correctCount++;
    } else {
        incorrectCount++;
    }

    scoreElement.innerHTML = score;
    currentQuestion++;

    if (currentQuestion < quiz.length) {
        renderQuestions();
        nextQuestionButton.disabled = true;
    } else {
        showResult();
    }

    updateProgress();
}

function checkCorrect(event) {
    event.target.classList.add("active-class");

    for (let i = 0; i < quizOptions.children.length; i++) {
        if (event.target !== quizOptions.children[i]) {
            quizOptions.children[i].classList.remove("active-class");
        }
    }

    currentSelection = event.target;
    nextQuestionButton.disabled = false;
}

function updateProgress() {
    const progress = ((currentQuestion) / quiz.length) * 100;
    progressBar.style.width = progress + "%";
}

function showResult() {
    const totalQuestions = quiz.length;
    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);

    progressBar.style.width = "100%";

    Swal.fire({
        title: '📊 Quiz Result',
        html: `
            <p>✅ <b>Correct Answers:</b> ${correctCount}</p>
            <p>❌ <b>Incorrect Answers:</b> ${incorrectCount}</p>
            <p>🎯 <b>Final Score:</b> ${score}/${totalQuestions * 10}</p>
            <p>📈 <b>Percentage:</b> ${percentage}%</p>
            <p>${percentage >= 50 ? "🎉 <b>Congrats!</b>" : "💪 <b>Keep working hard!</b>"}</p>
        `,
        icon: percentage >= 50 ? 'success' : 'info',
        confirmButtonText: 'Play Again'
    }).then(() => location.reload());
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
    currentSelection = null;
    scoreElement.innerHTML = score;
    progressBar.style.width = "0%";
    nextQuestionButton.disabled = true;
    renderQuestions();
}


renderQuestions();
