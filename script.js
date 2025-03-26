document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("mood-form");
  const moodSelect = document.getElementById("moods");
  const moodDisplay = document.getElementById("mood-display");
  const moodText = document.getElementById("mood-text");
  const moodIcon = document.getElementById("mood-icon");
  const moodBackground = document.getElementById("mood-background");
  const updateBtn = document.getElementById("update-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const spotifyLink = document.getElementById("spotify-link");

  const quoteContainer = document.querySelector('.item4 .quote-container');  // For quotes section


  const moodPlaylists = {
      happy: "https://open.spotify.com/playlist/1llkez7kiZtBeOw5UjFlJq?si=Kk1GpHlpTxKn2kPTeI7Bqw",
      excited: "https://open.spotify.com/playlist/37i9dQZF1DX3P5yZTrA8xF",
      loved: "https://open.spotify.com/playlist/37i9dQZF1DXbF3J3ogmaYm",
      bored: "https://open.spotify.com/playlist/37i9dQZF1DWV9A8uRkjm7h",
      sad: "https://open.spotify.com/playlist/37i9dQZF1DX5Vt6tD4tE8Y",
      angry: "https://open.spotify.com/playlist/37i9dQZF1DWXRqzC8K6jH7",
      frustrated: "https://open.spotify.com/playlist/37i9dQZF1DXcxtfd5sDAl7"
  };

  // Fetch quotes from the db.json file
  async function getQuotes(mood) {
    try {
        const response = await fetch('http://localhost:8080/' + mood);
        const data = await response.json();
        const randomQuote = data[Math.floor(Math.random() * data.length)].quote;
        displayQuote(randomQuote);
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}


  // Display quote in the quotes section
  function displayQuote(quote) {
      if (!quote) {
        quoteContainer.textContent = '';
        return;
      }

      const quoteElement = document.createElement('p');
      quoteElement.textContent = `"${quote}"`;
      quoteContainer.appendChild(quoteElement);
  }

  // Form submit handler
  form.addEventListener("submit", function (e) {
      e.preventDefault();
      const selectedMood = moodSelect.value;
      updateMoodDisplay(selectedMood);
      getQuotes(selectedMood);
  });

  // Update mood
  updateBtn.addEventListener("click", function () {
      form.style.display = "block";
      moodDisplay.style.display = "none";
      displayQuote('');
  });

  // Delete mood
  deleteBtn.addEventListener("click", function () {
      moodDisplay.style.display = "none";
      form.style.display = "block";
      displayQuote('');
  });

  // Update mood display function
  function updateMoodDisplay(mood) {
      form.style.display = "none";
      moodDisplay.style.display = "block";

      // Update mood text and icon
      moodText.textContent = `${mood.toUpperCase()}`;
      moodIcon.src = `./assets/icons/formkit_${mood}.png`; // Assuming icons are named based on mood

      // Change background color based on mood
      let color;
      switch (mood) {
          case "happy":
              color = "yellow";
              break;
          case "excited":
              color = "orange";
              break;
          case "loved":
              color = "pink";
              break;
          case "bored":
              color = "lightgrey";
              break;
          case "sad":
              color = "blue";
              break;
          case "angry":
              color = "red";
              break;
          case "frustrated":
              color = "purple";
              break;
          default:
              color = "grey";
      }

      moodBackground.style.backgroundColor = color;

      // Update Spotify link
      spotifyLink.href = moodPlaylists[mood];

      getQuotes(mood);
  }
});



