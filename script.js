let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question: "What is HTML?",
        answer: "HTML is used to create web pages."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is used to make web pages interactive."
    }
];

let currentIndex = 0;

function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayCard() {
    document.getElementById("question").innerText = flashcards[currentIndex].question;
    document.getElementById("answer").innerText = flashcards[currentIndex].answer;
    document.getElementById("answer").style.display = "none";
}

function showAnswer() {
    document.getElementById("answer").style.display = "block";
}

function nextCard() {
    currentIndex++;

    if (currentIndex >= flashcards.length) {
        currentIndex = 0;
    }

    displayCard();
}

function prevCard() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = flashcards.length - 1;
    }

    displayCard();
}

function addCard() {
    let question = document.getElementById("newQuestion").value;
    let answer = document.getElementById("newAnswer").value;

    if (question === "" || answer === "") {
        alert("Please enter both question and answer");
        return;
    }

    flashcards.push({
        question: question,
        answer: answer
    });

    saveFlashcards();

    document.getElementById("newQuestion").value = "";
    document.getElementById("newAnswer").value = "";

    currentIndex = flashcards.length - 1;
    displayCard();

    alert("Flashcard added successfully");
}

function editCard() {
    let newQuestion = prompt("Edit question:", flashcards[currentIndex].question);
    let newAnswer = prompt("Edit answer:", flashcards[currentIndex].answer);

    if (newQuestion !== null && newAnswer !== null) {
        flashcards[currentIndex].question = newQuestion;
        flashcards[currentIndex].answer = newAnswer;

        saveFlashcards();
        displayCard();
    }
}

function deleteCard() {
    if (flashcards.length === 1) {
        alert("At least one flashcard must remain");
        return;
    }

    flashcards.splice(currentIndex, 1);
    saveFlashcards();

    if (currentIndex >= flashcards.length) {
        currentIndex = flashcards.length - 1;
    }

    displayCard();
}

displayCard();
document.addEventListener("keydown", function(event){

    if(event.key === "ArrowRight"){
        nextCard();
    }

    if(event.key === "ArrowLeft"){
        prevCard();
    }

    if(event.key === "Enter"){
        showAnswer();
    }
});