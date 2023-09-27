document.addEventListener("DOMContentLoaded", function() {
    let currentQuestion = 0;
    let score = 0;
  
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const resultsContainer = document.getElementById("results-container");
    const nextButton = document.getElementById("next-button"); // Define nextButton inside the event listener
  
    function loadQuestion() {
      const question = questions[currentQuestion];
      questionText.textContent = question.question;
      optionsContainer.innerHTML = '';
  
      question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(optionElement);
      });
    }
  
    function checkAnswer(selectedIndex) {
      const question = questions[currentQuestion];
      if (question.options[selectedIndex] === question.answer) {
        score++;
      }
  
      currentQuestion++;
  
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }
  
    function showResult() {
      questionText.textContent = "Quiz finished!";
      optionsContainer.innerHTML = '';
      nextButton.style.display = 'none';
      resultsContainer.textContent = `Your score: ${score} out of ${questions.length}`;
    }
  
    nextButton.addEventListener("click", () => {
      if (currentQuestion < questions.length) {
        loadQuestion();
      }
    });
  
    // Start the quiz by loading the first question
    loadQuestion();
  });
  
