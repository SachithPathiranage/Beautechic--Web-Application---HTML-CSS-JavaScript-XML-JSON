const questions = [
    {
        question: "What is the primary purpose of a primer in makeup?",
        answers: [
            {text: "Moisturizing", correct: false},
            {text: "Enhancing Fragrance", correct: false},
            {text: "Preparing the Skin for Makeup", correct: true},
            {text: "Adding Color", correct: false},
        ]
    },
    {
        question: "Which vitamin is often associated with promoting healthy skin?",
        answers: [
            {text: "Vitamin A", correct: false},
            {text: "Vitamin C", correct: true},
            {text: "Vitamin K", correct: false},
            {text: "Vitamin D", correct: false},
        ]        
    },
    {
        question: "Which makeup product is commonly used to add a natural flush to the cheeks?",
        answers: [
            {text: "Lip Gloss", correct: false},
            {text: "Highlighter", correct: false},
            {text: "Blush", correct: true},
            {text: "Setting Spray", correct: false},
        ]        
    },
    {
        question: "What is the essential function of a cleanser in skincare?",
        answers: [
            {text: "Removing Impurities and Makeup", correct: true},
            {text: "Adding Fragrance", correct: false},
            {text: "Moisturizing", correct: false},
            {text: "Sunscreen", correct: false},
        ]        
    },
    {
        question: "What is the main function of a hair conditioner?",
        answers: [
            {text: "Cleansing", correct: false},
            {text: "Styling", correct: false},
            {text: "Coloring", correct: false},
            {text: "Moisturizing", correct: true},
        ]        
    },

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
// Add an exit quiz button
const exitButton = document.getElementById("exit-btn");

// Function to handle exit quiz
function exitQuiz() {
    // Clear points from localStorage
    localStorage.removeItem('quizPoints');
    // Redirect to a specific web page
    window.location.href = "https://example.com"; // Replace "https://example.com" with your desired URL
}

// Add event listener for exit button click
exitButton.addEventListener("click", exitQuiz);

 
let currentQuestionIndex = 0;
let score = 0;
let points = 0;


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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

function dingSound(){
    let ding = new Audio ('Sounds/ding.mp3');
    ding.play();
}

function wrongSound(){
    let wrong = new Audio ('Sounds/wrong-answer.mp3');
    wrong.play();
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        dingSound();
        selectedBtn.classList.add("correct");
        score++;
        points+=2;
    }else{
        wrongSound();
        selectedBtn.classList.add("incorrect");
        points--;
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


// Function to save points to localStorage
function savePointsToLocalStorage(points) {
    localStorage.setItem('quizPoints', points);
}

// Function to load points from localStorage
function loadPointsFromLocalStorage() {
    let points = localStorage.getItem('quizPoints');
    points = points ? parseInt(points) : 0;
    // If points are negative, reset them to zero
    if (points < 0) {
        points = 0;
        localStorage.removeItem('quizPoints'); // Remove negative points from localStorage
    }
    return points;
}


// Modify the selectAnswer() function to save points to localStorage
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        dingSound();
        selectedBtn.classList.add("correct");
        score++;
        points += 2;
    } else {
        wrongSound();
        selectedBtn.classList.add("incorrect");
        points--;
    }
    // Save updated points to localStorage
    savePointsToLocalStorage(points);

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Modify the startQuiz() function to clear points from localStorage
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    points = 0; // Reset points to 0
    localStorage.removeItem('quizPoints'); // Clear points from localStorage
    nextButton.innerHTML = "Next";
    showQuestion();
}


// Function to handle exit quiz
function exitQuiz() {
    // Clear points from localStorage
    //localStorage.removeItem('quizPoints');
    // Redirect to a specific web page
    window.location.href = "QuizPage on template.html"; // Replace "https://example.com" with your desired URL
}

// Add event listener for exit button click
exitButton.addEventListener("click", exitQuiz);


// Modify the showScore() function to include the "Exit Quiz" button
function showScore() {
    resetState();
    let userScore = `You got ${score} / ${questions.length} correct.`;
    let pointScore = `You have earned ${points} points!!!`;
    let pointScoreequals1 = `You have earned ${points} point!!!`;
    let message1 = `Please claim the points in your next purchase`;
    let message2 = `You haven't got any points`;
    questionElement.innerHTML = userScore;
    if (points > 1) {
        questionElement.innerHTML += '<br>' + pointScore + '<br>' + message1;
    } else if (points === 1) {
        questionElement.innerHTML += '<br>' + pointScoreequals1 + '<br>' + message1;
    } else {
        questionElement.innerHTML = userScore + '<br>' + message2;
    }
    questionElement.style.textAlign = "center"; // Align the text at the center
    nextButton.innerHTML = "Play Again?";
    exitButton.innerHTML = "Exit Quiz";
    nextButton.style.display = "block";

    // Save points to localStorage when showing the score
    savePointsToLocalStorage(points);

    // Load points from localStorage
    loadPointsFromLocalStorage();

    // Append exit button
    answerButtons.appendChild(exitButton);
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