const quotes = {
  happy: [
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" }
  ],
  sad: [
    { text: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine" },
    { text: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" }
  ],
  angry: [
    { text: "For every minute you remain angry, you give up sixty seconds of peace of mind.", author: "Ralph Waldo Emerson" }
  ],
  motivated: [
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" }
  ]
};

let currentQuote = {};

document.querySelectorAll("button[data-mood]").forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    const moodQuotes = quotes[mood];
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
    currentQuote = randomQuote;
    document.getElementById("quote").innerText = `"${randomQuote.text}"`;
    document.getElementById("author").innerText = `— ${randomQuote.author}`;
  });
});

function saveFavorite() {
  let saved = JSON.parse(localStorage.getItem("favorites")) || [];
  saved.push(currentQuote);
  localStorage.setItem("favorites", JSON.stringify(saved));
  alert("Quote saved to favorites!");
}

function readQuote() {
  const utterance = new SpeechSynthesisUtterance(`${currentQuote.text} by ${currentQuote.author}`);
  speechSynthesis.speak(utterance);
}

function nextQuote() {
  location.reload(); // simple reload to pick new quote
}
function updateStreak() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const lastVisit = localStorage.getItem("lastVisit");
  let streak = parseInt(localStorage.getItem("streak") || "0");

  if (!lastVisit) {
    streak = 1;
  } else {
    const diff = (new Date(today) - new Date(lastVisit)) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
    } else if (diff > 1) {
      streak = 1;
    }
  }

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastVisit", today);
  document.getElementById("streak").innerText = `🔥 Streak: ${streak} day${streak > 1 ? 's' : ''}`;
}

// Run when page loads
updateStreak();
function setDynamicBackground() {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 5 && hour < 12) {
    // Morning
    body.style.background = "linear-gradient(to right, #FFEFBA, #FFFFFF)";
  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    body.style.background = "linear-gradient(to right, #a1c4fd, #c2e9fb)";
  } else {
    // Evening/Night
    body.style.background = "linear-gradient(to right, #2C3E50, #4CA1AF)";
    body.style.color = "white";
  }
}

setDynamicBackground();
