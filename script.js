document.getElementById('participantForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get participant name
    let participantName = document.getElementById('participantName').value.trim();

    // Fetch Ground Truth Ratings
    fetch('MITdataset/groundTruthRatings.json') // Adjust the path to your JSON file
        .then(response => response.json())
        .then(data => {
            // Check if participant exists in ground truth ratings
            if (participantName in data) {
                let ratings = data[participantName];

                // Populate Ground Truth Table
                let groundTruthBody = document.getElementById('groundTruthBody');
                groundTruthBody.innerHTML = ''; // Clear previous data

                let groundTruthRow = document.createElement('tr');
                groundTruthRow.innerHTML = `
                    <td>${participantName}</td>
                    <td>${ratings['Overall']}</td>
                    <td>${ratings['Recommend Hiring']}</td>
                    <td>${ratings['Engaged']}</td>
                    <td>${ratings['Excited']}</td>
                    <td>${ratings['Eye Contact']}</td>
                    <td>${ratings['Smiled']}</td>
                    <td>${ratings['Friendly']}</td>
                    <td>${ratings['Speaking Rate']}</td>
                    <td>${ratings['No Fillers']}</td>
                    <td>${ratings['Paused']}</td>
                    <td>${ratings['Authentic']}</td>
                    <td>${ratings['Calm']}</td>
                    <td>${ratings['Focused']}</td>
                    <td>${ratings['Structured Answers']}</td>
                    <td>${ratings['Not Stressed']}</td>
                    <td>${ratings['Not Awkward']}</td>
                `;
                groundTruthBody.appendChild(groundTruthRow);

                // Display Ground Truth Ratings Digits
                displayDigits(ratings, 'groundTruthDigits');

            } else {
                console.log(`Participant ${participantName} not found in ground truth ratings.`);
                // Handle case where participant is not found
            }
        })
        .catch(error => {
            console.error('Error loading ground truth ratings:', error);
            // Handle errors loading JSON file
        });

    // Fetch GPT-4o Ratings
    fetch('MITdataset/gpt4oRatings.json') // Adjust the path to your JSON file
        .then(response => response.json())
        .then(data => {
            // Check if participant exists in GPT-4o ratings
            if (participantName in data) {
                let ratings = data[participantName];

                // Populate GPT-4o Table
                let gpt4oBody = document.getElementById('gpt4oBody');
                gpt4oBody.innerHTML = ''; // Clear previous data

                let gpt4oRow = document.createElement('tr');
                gpt4oRow.innerHTML = `
                    <td>${participantName}</td>
                    <td>${ratings['Overall']}</td>
                    <td>${ratings['Recommend Hiring']}</td>
                    <td>${ratings['Engaged']}</td>
                    <td>${ratings['Excited']}</td>
                    <td>${ratings['Eye Contact']}</td>
                    <td>${ratings['Smiled']}</td>
                    <td>${ratings['Friendly']}</td>
                    <td>${ratings['Speaking Rate']}</td>
                    <td>${ratings['No Fillers']}</td>
                    <td>${ratings['Paused']}</td>
                    <td>${ratings['Authentic']}</td>
                    <td>${ratings['Calm']}</td>
                    <td>${ratings['Focused']}</td>
                    <td>${ratings['Structured Answers']}</td>
                    <td>${ratings['Not Stressed']}</td>
                    <td>${ratings['Not Awkward']}</td>
                `;
                gpt4oBody.appendChild(gpt4oRow);

                // Display GPT-4o Ratings Digits
                displayDigits(ratings, 'gpt4oDigits');

            } else {
                console.log(`Participant ${participantName} not found in GPT-4o ratings.`);
                // Handle case where participant is not found
            }
        })
        .catch(error => {
            console.error('Error loading GPT-4o ratings:', error);
            // Handle errors loading JSON file
        });
});

// Function to display individual score digits
function displayDigits(ratings, containerId) {
    let digitsContainer = document.getElementById(containerId);
    digitsContainer.innerHTML = ''; // Clear previous data

    Object.keys(ratings).forEach(key => {
        if (key !== 'Participant') {
            let digitDiv = document.createElement('div');
            digitDiv.classList.add('score-digit');
            digitDiv.textContent = ratings[key];
            digitsContainer.appendChild(digitDiv);
        }
    });
}
