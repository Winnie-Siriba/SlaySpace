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
        excited: "https://open.spotify.com/playlist/37i9dQZF1EIgG2NEOhqsD7?si=d_dRDQk8Q9Oxlr13jzKfvA",
        loved: "https://open.spotify.com/playlist/7IFNbX84LTs8G18bR0jZBP?si=t1vwL-JLTtadH5PMPrFl4Q&pi=JMRiB8XkSeyi0",
        bored: "https://open.spotify.com/playlist/37i9dQZF1EIfiQNtNNKDRJ?si=kAs2q5nQTaefpvL8CgV4bA&pi=quuM5fBDSUq16",
        sad: "https://open.spotify.com/playlist/37i9dQZF1DWVY5eNJoKHd2?si=AtA6wdjtREmELUxHMNV8sg&pi=fFTO-dSKTKG3b",
        angry: "https://open.spotify.com/playlist/37i9dQZF1DWWqx6s5BvQ6Z?si=PRFNM6uWTVGU9NCc0U9UzA&pi=0ueF0dZQR2yYi",
        frustrated: "https://open.spotify.com/playlist/37i9dQZF1DWWqx6s5BvQ6Z?si=PRFNM6uWTVGU9NCc0U9UzA&pi=0ueF0dZQR2yYi"
    };
  
    // Fetch quotes from db.json
    async function getQuotes(mood) {
      try {
          const response = await fetch('https://my-json-server.typicode.com/Winnie-Siriba/SlaySpace' + mood);
          const data = await response.json();
        
          displayQuote(data);
      } catch (error) {
          console.error("Error fetching quotes:", error);
      }
  }
  
  
    // Display quote in the quotes and affirmations section
    function displayQuote(quote) {
        if (!quote) {
          quoteContainer.textContent = ''; //clears previous displayed quotes
          return;
        }
        quote.forEach(quoteObj => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `"${quoteObj.quote}"`;
        quoteContainer.appendChild(quoteElement);
        });
        
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
  
        // background color changes based on mood
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
  