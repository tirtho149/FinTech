document.getElementById('participantForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let participantName = document.getElementById('participantName').value.trim();

    // Fetch ground truth ratings
    fetch('GroundTruth.json')  // Replace with your actual JSON file path for ground truth ratings
        .then(response => response.json())
        .then(data => {
            // Find participant ratings in ground truth data
            let participantData = data.find(entry => entry.Participant === participantName);

            if (participantData) {
                populateTable(participantData, 'groundTruthBody');
            } else {
                console.log(`Ground truth ratings for participant ${participantName} not found.`);
                // Handle case where participant's ground truth ratings are not found
                clearTable('groundTruthBody');
            }
        })
        .catch(error => {
            console.error('Error loading ground truth ratings:', error);
            // Handle errors loading ground truth ratings
        });

    // Fetch GPT-4o ratings
    fetch('GPT-4o.json')  // Replace with your actual JSON file path for GPT-4o generated ratings
        .then(response => response.json())
        .then(data => {
            // Find participant ratings in GPT-4o data
            let participantData = data.find(entry => entry.Participant === participantName);

            if (participantData) {
                populateTable(participantData, 'gpt4oBody');
            } else {
                console.log(`GPT-4o ratings for participant ${participantName} not found.`);
                // Handle case where participant's GPT-4o ratings are not found
                clearTable('gpt4oBody');
            }
        })
        .catch(error => {
            console.error('Error loading GPT-4o ratings:', error);
            // Handle errors loading GPT-4o ratings
        });
});

function populateTable(data, tableBodyId) {
    let tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = '';  // Clear previous content

    // Create row for participant name
    let participantRow = tableBody.insertRow();
    let participantCell = participantRow.insertCell();
    participantCell.textContent = data['Participant'];

    // Create rows for each rating category
    Object.keys(data).forEach(key => {
        if (key !== 'Participant') {
            let row = tableBody.insertRow();
            let categoryCell = row.insertCell();
            categoryCell.textContent = key;
            let ratingCell = row.insertCell();
            ratingCell.textContent = data[key];
        }
    });
}

function clearTable(tableBodyId) {
    let tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = '';  // Clear table content
}
