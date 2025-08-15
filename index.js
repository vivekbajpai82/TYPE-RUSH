const typing_ground = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sentence = document.querySelector('#ShowSentence');
const show_time = document.querySelector('#show-time');
const timeSelect = document.getElementById("time-selector");

let startTime, endTime, intervalID;
let elapsedTime = 0;
let selectedTime = 30;

// Sentences by length (15s: short-medium, 30s: medium, 60s: long)
const shortSentences = [
  'The sun rises in the east and sets in the west.',
  'I enjoy reading books on rainy afternoons.',
  'Cats are playful and love to chase small toys.',
  'He writes notes carefully in his notebook.',
  'Birds fly high in the clear blue sky.',
  'I like eating pizza while watching movies.',
  'The dog barked loudly at the stranger.',
  'We went to the park for a short walk.',
  'She painted a small picture for her friend.',
  'He drank a glass of cold water quickly.',
  'The baby laughed when she saw the puppy.',
  'Leaves fall gently from the tall trees outside.',
  'He jogs every morning to stay healthy.',
  'The sunflowers bloom beautifully in summer.',
  'I love listening to music while studying.',
  'The coffee smells delicious in the morning.',
  'She smiled when she got a compliment.',
  'The wind blew softly through the garden.',
  'He read a short story before going to bed.',
  'The cat slept peacefully on the sofa.'
];

const mediumSentences = [
  'The children played happily in the sunny backyard while their parents watched them.',
  'She carefully prepared her presentation before the big meeting at work.',
  'He went to the market to buy fresh vegetables for the evening dinner.',
  'The dog ran swiftly across the field chasing the bouncing ball.',
  'I tried a new recipe today, and it turned out surprisingly delicious.',
  'They walked along the beach enjoying the sound of the waves crashing.',
  'He solved the complex puzzle in a record amount of time.',
  'The teacher explained the difficult concept with simple examples.',
  'She decorated the room with colorful balloons and banners for the party.',
  'He wrote a heartfelt letter to his best friend.',
  'The artist spent hours painting a beautiful landscape on the canvas.',
  'We enjoyed a long drive through the countryside on a sunny day.',
  'She carefully arranged the flowers in a vase for decoration.',
  'He learned to play the guitar by practicing every evening.',
  'They explored the old town, taking pictures of historic buildings.',
  'The chef prepared a special dish for the restaurant’s anniversary.',
  'She danced gracefully to the rhythm of the music.',
  'He spent the afternoon reading an interesting science magazine.',
  'The students worked together to complete the challenging project.',
  'They planned a surprise picnic for their friends in the park.'
];

const longSentences = [
  'After a long journey through winding roads and dense forests, they finally reached the ancient castle standing tall on the hill.',
  'Despite heavy rain and strong winds, she managed to deliver the speech flawlessly to the waiting audience in the grand hall.',
  'He organized all the documents carefully, ensuring that nothing was misplaced, before submitting the final report to his manager.',
  'The scientists conducted experiments late into the night to test their hypothesis about the newly discovered chemical reaction.',
  'As the sun set behind the mountains, the hikers set up their camp and enjoyed a warm dinner by the fire.',
  'She traveled across multiple countries to explore diverse cultures and learn new languages along the way.',
  'The author wrote a lengthy novel detailing the lives of several generations in a quaint village.',
  'During the festival, streets were filled with colorful decorations, lively music, and happy crowds celebrating together.',
  'He studied diligently every day, determined to achieve his dream of becoming a successful engineer.',
  'The orchestra performed a complex symphony that left the audience in awe and admiration.',
  'She spent months preparing her artwork for the exhibition that showcased local talent.',
  'After months of training, the athlete finally won the championship with an incredible performance.',
  'The professor explained a difficult scientific theory using simple examples and diagrams.',
  'They hiked up the steep trail, enjoying breathtaking views of the valley below.',
  'He spent the evening organizing old photographs and memorabilia from his childhood.',
  'The writer described the bustling city streets in vivid detail, capturing the essence of urban life.',
  'She carefully followed the recipe, measuring each ingredient precisely for the perfect dish.',
  'The explorers documented their journey through the dense jungle, encountering rare plants and animals.',
  'During the storm, the lighthouse kept shining, guiding ships safely to the shore.',
  'He reflected on the events of the past year, feeling grateful for all the lessons learned.'
];

// Calculate typing speed
function calculateTypingSpeed(time_taken) {
  const typedText = typing_ground.value.trim();
  const targetText = show_sentence.innerText.trim();

  const typedWords = typedText.split(/\s+/);
  const targetWords = targetText.split(/\s+/);

  let correctWords = 0;
  for (let i = 0; i < typedWords.length && i < targetWords.length; i++) {
    if (typedWords[i] === targetWords[i]) {
      correctWords++;
    }
  }

  const typingSpeed = Math.round((correctWords / time_taken) * 60);

  score.innerHTML = `
    ✅ Correct Words: ${correctWords}<br>
    🕐 Time Taken: ${time_taken.toFixed(2)} sec<br>
    🚀 Typing Speed: ${typingSpeed} WPM
  `;
}

// End typing test
function endTypingTest() {
  btn.innerText = "Start";
  clearInterval(intervalID);
  endTime = new Date().getTime();
  const totalTimeTaken = (endTime - startTime) / 1000;
  calculateTypingSpeed(totalTimeTaken);

  show_sentence.innerHTML = "Click Start to begin...";
  typing_ground.value = "";
  typing_ground.disabled = true;
  show_time.innerHTML = "";
  elapsedTime = 0;
}

// Show timer
function showTimer() {
  clearInterval(intervalID);
  elapsedTime = 0;
  selectedTime = parseInt(timeSelect.value);
  show_time.innerHTML = `${elapsedTime}s`; // ✅ sirf seconds

  intervalID = setInterval(() => {
    elapsedTime++;
    show_time.innerHTML = `${elapsedTime}s`; // ✅ sirf seconds
    if (elapsedTime >= selectedTime) {
      endTypingTest();
    }
  }, 1000);
}


// Start typing test
function startTyping() {
  selectedTime = parseInt(timeSelect.value);
  let sentencesArray;

  if (selectedTime <= 15) {
    sentencesArray = shortSentences;
  } else if (selectedTime <= 30) {
    sentencesArray = mediumSentences;
  } else {
    sentencesArray = longSentences;
  }

  const randomIndex = Math.floor(Math.random() * sentencesArray.length);
  show_sentence.innerHTML = sentencesArray[randomIndex];

  startTime = new Date().getTime();
  btn.innerText = "Done";
  typing_ground.disabled = false;
  typing_ground.value = "";
  typing_ground.focus();
  showTimer();
}

// Button click
btn.addEventListener('click', () => {
  if (btn.innerText.toLowerCase() === "start") {
    startTyping();
  } else {
    endTypingTest();
  }
});

// Dark mode toggle
const toggleBtn = document.getElementById("dark-mode-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.innerHTML = document.body.classList.contains("dark-mode") ?
    "☀️ Light Mode" : "🌙 Dark Mode";
});
