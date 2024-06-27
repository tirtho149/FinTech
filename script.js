document.getElementById('participantForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get participant name
    let participantName = document.getElementById('participantName').value.trim();

    // Fetch Ground Truth Ratings
    fetch('MITdataset/groundTruthRatings.json') // Adjust the path to your JSON file
        .then(response => response.json())
        .then(groundTruthData => {
            // Fetch GPT-4o Ratings
            fetch('MITdataset/gpt4oRatings.json') // Adjust the path to your JSON file
                .then(response => response.json())
                .then(gpt4oData => {
                    // Process data for the participant
                    if (participantName in groundTruthData && participantName in gpt4oData) {
                        let groundTruthRatings = groundTruthData[participantName];
                        let gpt4oRatings = gpt4oData[participantName];

                        // Populate Ground Truth Table
                        populateTable(groundTruthRatings, 'groundTruthTable', 'groundTruthDigits');

                        // Populate GPT-4o Table
                        populateTable(gpt4oRatings, 'gpt4oTable', 'gpt4oDigits');

                    } else {
                        console.log(`Participant ${participantName} not found in ratings data.`);
                        // Handle case where participant is not found in one or both datasets
                    }
                })
                .catch(error => {
                    console.error('Error loading GPT-4o ratings:', error);
                    // Handle errors loading GPT-4o JSON file
                });
        })
        .catch(error => {
            console.error('Error loading ground truth ratings:', error);
            // Handle errors loading ground truth JSON file
        });
});

// Function to populate table and score digits
function populateTable(ratings, tableId, digitsContainerId) {
    // Populate Table
    let tableBody = document.getElementById(`${tableId}Body`);
    tableBody.innerHTML = ''; // Clear previous data

    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td>${ratings['Participant']}</td>
        <td>${ratings['Overall']}</td>
        <td>${ratings['Recommend Hiring']}</td>
        <td>${ratings['Colleague']}</td>
        <td>${ratings['Engaged']}</td>
        <td>${ratings['Excited']}</td>
        <td>${ratings['Eye Contact']}</td>
        <td>${ratings['Smiled']}</td>
        <td>${ratings['Speaking Rate']}</td>
        <td>${ratings['No Fillers']}</td>
        <td>${ratings['Friendly']}</td>
        <td>${ratings['Paused']}</td>
        <td>${ratings['Engaging Tone']}</td>
        <td>${ratings['Structured Answers']}</td>
        <td>${ratings['Calm']}</td>
        <td>${ratings['Not Stressed']}</td>
        <td>${ratings['Focused']}</td>
        <td>${ratings['Authentic']}</td>
        <td>${ratings['Not Awkward']}</td>
        <td>${ratings['Total']}</td>
    `;
    tableBody.appendChild(tableRow);

    // Display Score Digits
    displayDigits(ratings, digitsContainerId);
}

// Function to display individual score digits
function displayDigits(ratings, containerId) {
    let digitsContainer = document.getElementById(containerId);
    digitsContainer.innerHTML = ''; // Clear previous data

    Object.keys(ratings).forEach(key => {
        if (key !== 'Participant' && key !== 'Total') {
            let digitDiv = document.createElement('div');
            digitDiv.classList.add('score-digit');
            digitDiv.textContent = ratings[key];
            digitsContainer.appendChild(digitDiv);
        }
    });
}
