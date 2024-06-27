// Example function to load conversation based on user input
function loadConversation() {
  const participantName = document.getElementById('participant').value.trim();
  const year = document.getElementById('year').value.trim();

  // Example: Fetch JSON data (replace with actual implementation)
  fetch('conversation_analysis.json')
    .then(response => response.json())
    .then(data => {
      const participantKey = `${participantName} ${year}`;
      if (data.hasOwnProperty(participantKey)) {
        const conversation = data[participantKey];

        // Clear previous conversation and traits
        document.getElementById('conversation').innerHTML = '';
        document.getElementById('traits').innerHTML = '';

        // Display conversation chunks
        conversation.forEach(chunk => {
          const transcript = chunk['transcript chunk'];
          const trait = chunk['trait'];
          const chunkHTML = `<div><strong>${trait}:</strong> ${transcript}</div>`;
          document.getElementById('conversation').innerHTML += chunkHTML;
        });

        // Display traits and rating inputs (example)
        const traitsHTML = `
          <h3>Rate Traits:</h3>
          <label for="politeness">Politeness:</label>
          <input type="range" id="politeness" name="politeness" min="1" max="10" value="5">
          <label for="conscientiousness">Conscientiousness:</label>
          <input type="range" id="conscientiousness" name="conscientiousness" min="1" max="10" value="5">
          <!-- Add more traits as needed -->
        `;
        document.getElementById('traits').innerHTML = traitsHTML;
      } else {
        alert('Conversation data not found for the specified participant and year.');
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}
