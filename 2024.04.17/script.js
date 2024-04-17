const questions = [
    {
        question: "Hány éves Arnold Schwarzenegger?",
        answers: [
            { text: "65", correct: false},
            { text: "76", correct: true},
            { text: "79", correct: false},
            { text: "74", correct: false},
        ]
    },
    {
        question: "Melyik Amerikai államnak volt a kormányzója?",
        answers: [
            { text: "Texas", correct: false},
            { text: "New Jersey", correct: false},
            { text: "Florida", correct: false},
            { text: "Kalifornia", correct: true},
        ]
    },
    {
        question: "Hány gyermeke született Arnold Schwarzeneggernek?",
        answers: [
            { text: "5", correct: true},
            { text: "4", correct: false},
            { text: "0", correct: false},
            { text: "6", correct: false},
        ]
    },
    {
        question: "Hány filmje van körülbelül Arnold Schwarzeneggernek?",
        answers: [
            { text: "kb.75", correct: false},
            { text: "kb.100", correct: false},
            { text: "kb.30", correct: false},
            { text: "kb.50", correct: true},
        ]
    },
    {
        question: "Arnold Schwarzenegger hányszor nyerte el a Mr. Olympia címet?",
        answers: [
            { text: "8", correct: false},
            { text: "7", correct: true},
            { text: "6", correct: false},
            { text: "5", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Következő";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Az ereményed  ${score} az ${questions.
        length}-ből!`;
        nextButton.innerHTML = "Újra";
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
})


startQuiz();



