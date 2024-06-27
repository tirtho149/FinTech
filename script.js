// Function to load conversation based on participant name (filename)
function loadConversation() {
  const participantName = document.getElementById("participant").value.trim();
  const conversation = conversationData[participantName];

  if (!conversation) {
    alert("Conversation not found for the participant name.");
    return;
  }

  // Clear previous conversation and traits
  clearConversationAndTraits();

  // Display conversation chunks
  const conversationContainer = document.getElementById("conversation");
  conversation.forEach(chunk => {
    const div = document.createElement("div");
    div.classList.add("chunk");
    div.innerHTML = `<p><strong>${chunk["transcript chunk"].split("\n")[0]}</strong></p>
                     <p>${chunk["transcript chunk"].split("\n")[1]}</p>`;
    conversationContainer.appendChild(div);
  });

  // Display traits and rating inputs
  const traitsContainer = document.getElementById("traits");
  conversation.forEach(chunk => {
    const div = document.createElement("div");
    div.classList.add("trait");
    div.innerHTML = `<p><strong>Trait: ${chunk.trait}</strong></p>
                     <label for="${chunk.trait}">Rate ${chunk.trait} (0-10):</label>
                     <input type="number" id="${chunk.trait}" name="${chunk.trait}" min="0" max="10" step="1">`;
    traitsContainer.appendChild(div);
  });
}

// Function to clear conversation and traits
function clearConversationAndTraits() {
  const conversationContainer = document.getElementById("conversation");
  const traitsContainer = document.getElementById("traits");

  // Clear previous conversation chunks
  while (conversationContainer.firstChild) {
    conversationContainer.removeChild(conversationContainer.firstChild);
  }

  // Clear previous traits
  while (traitsContainer.firstChild) {
    traitsContainer.removeChild(traitsContainer.firstChild);
  }
}

// Function to save ratings
function saveRatings() {
  const participantName = document.getElementById("participant").value.trim();
  const conversation = conversationData[participantName];

  if (!conversation) {
    alert("No conversation loaded to save ratings.");
    return;
  }

  // Prepare object to store ratings
  const ratings = {};

  // Retrieve ratings from input fields
  conversation.forEach(chunk => {
    const rating = document.getElementById(chunk.trait).value;
    ratings[chunk.trait] = rating;
  });

  // Example: Send ratings to backend or save locally
  console.log("Ratings for " + participantName + ":", ratings);
  document.getElementById("successMessage").innerText = "Ratings saved successfully!";
}
