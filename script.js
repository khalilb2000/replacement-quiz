document.addEventListener("DOMContentLoaded", function() {
  let currentQuestion = 0;
  let score = 0;
  let timeRemaining = 60; // Set your desired quiz time in seconds

  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const resultsContainer = document.getElementById("results-container");
  const nextButton = document.getElementById("next-button");
  const startButton = document.getElementById("start-button");

  function loadQuestion() {
      // ... existing loadQuestion function ...

      if (currentQuestion === 0) {
          startTimer();
      }
  }

  function startTimer() {
      const timerInterval = setInterval(function () {
          timeRemaining--;
          resultsContainer.textContent = `Time Remaining: ${timeRemaining}s`;

          if (timeRemaining <= 0) {
              clearInterval(timerInterval);
              showResult();
          }
      }, 1000);
  }

  // ... existing checkAnswer, showResult, and other functions ...

  startButton.addEventListener("click", loadQuestion);
  nextButton.addEventListener("click", () => {
      if (currentQuestion < questions.length) {
          loadQuestion();
      }
  });

  loadQuestion();
});
