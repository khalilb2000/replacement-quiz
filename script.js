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
      const question = questions[currentQuestion];
      questionText.textContent = question.question;
      optionsContainer.innerHTML = '';

      question.options.forEach((option, index) => {
          const optionElement = document.createElement("div");
          optionElement.textContent = option;
          optionElement.addEventListener("click", () => checkAnswer(index));
          optionsContainer.appendChild(optionElement);
      });

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

      // Prompt the user for initials
      const userInitials = prompt("Enter your initials:");

      // Save the score and initials to local storage
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials: userInitials, score: score });
      localStorage.setItem("highScores", JSON.stringify(highScores));

      // Display high scores or perform other actions as needed
      displayHighScores();
  }

  function displayHighScores() {
      // Retrieve high scores from local storage and display them
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      resultsContainer.textContent += "\nHigh Scores:\n";
      highScores.forEach((entry) => {
          resultsContainer.textContent += `${entry.initials}: ${entry.score}\n`;
      });
  }

  startButton.addEventListener("click", loadQuestion);
  nextButton.addEventListener("click", () => {
      if (currentQuestion < questions.length) {
          loadQuestion();
      }
  });

  loadQuestion();
});
