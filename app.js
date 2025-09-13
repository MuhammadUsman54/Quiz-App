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
let correctCount = 0;
let incorrectCount = 0;
let answerSelected = false;

const questionElement = document.getElementById("question");
const quizOptions = document.getElementById("quizOption");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");

function renderQuestions() {
    if (currentQuestion >= quiz.length) {
        showResult();
        return;
    }

    answerSelected = false;
    nextBtn.disabled = true;

    questionElement.innerHTML = quiz[currentQuestion].question;
    quizOptions.innerHTML = '';


    for (var i = 0; i < quiz[currentQuestion].options.length; i++) {
        quizOptions.innerHTML +=
            '<li onclick="checkCorrect(this,' + i + ')">' +
            quiz[currentQuestion].options[i] +
            '</li>';
    }



    updateProgress();
}

function checkCorrect(selectedLi, index) {
    if (answerSelected) return;

    var correctIndex = quiz[currentQuestion].correctAnswer;
    var allOptions = quizOptions.getElementsByTagName("li");

    if (index === correctIndex) {
        selectedLi.classList.add("correct");
        correctCount++;
    } else {
        selectedLi.classList.add("incorrect");
        incorrectCount++;
    }

    for (var i = 0; i < allOptions.length; i++) {
        allOptions[i].style.pointerEvents = "none";
    }

    answerSelected = true;
    nextBtn.disabled = false;
}


function goToNext() {
    if (!answerSelected) return;
    currentQuestion++;
    renderQuestions();
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
            <p>📈 <b>Percentage:</b> ${percentage}%</p>
            <p>${percentage >= 50 ? "🎉 <b>Congrats!</b>" : "💪 <b>Keep working hard!</b>"}</p>
        `,
        icon: percentage >= 50 ? 'success' : 'info',
        confirmButtonText: 'Play Again'
    }).then(() => location.reload());
}

renderQuestions();