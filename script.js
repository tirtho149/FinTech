// Function to load and display data from Excel
function loadDataFromExcel(participantName) {
    const fileInput = document.getElementById('FinTechLLMmitCSV - Copy.xlsx'); // Assuming you have an input for file upload
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming sheet names are 'GroundTruth' and 'GPT-4o'
        const groundTruthSheet = workbook.Sheets['GroundTruth'];
        const gpt4oSheet = workbook.Sheets['GPT-4o'];

        // Extract data from sheets
        const groundTruthData = XLSX.utils.sheet_to_json(groundTruthSheet, { header: 1 });
        const gpt4oData = XLSX.utils.sheet_to_json(gpt4oSheet, { header: 1 });

        // Find participant in each sheet
        let groundTruthParticipantData = findParticipantData(groundTruthData, participantName);
        let gpt4oParticipantData = findParticipantData(gpt4oData, participantName);

        // Display data in tables
        displayParticipantData('groundTruthBody', groundTruthParticipantData);
        displayParticipantData('gpt4oBody', gpt4oParticipantData);
    };

    reader.readAsArrayBuffer(file);
}

// Function to find participant data by name
function findParticipantData(sheetData, participantName) {
    // Assuming participantName is in the first column (index 0) of the sheet
    return sheetData.find(row => row[0] === participantName);
}

// Function to display participant data in a table
function displayParticipantData(tableId, participantData) {
    const tableBody = document.getElementById(tableId);
    if (!participantData) {
        tableBody.innerHTML = '<tr><td colspan="17">Participant not found</td></tr>';
        return;
    }

    const dataRow = document.createElement('tr');
    for (let i = 0; i < participantData.length; i++) {
        const cell = document.createElement('td');
        cell.textContent = participantData[i];
        dataRow.appendChild(cell);
    }
    tableBody.innerHTML = '';
    tableBody.appendChild(dataRow);
}

// Handle form submission
document.getElementById('participantForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const participantName = document.getElementById('participantName').value.trim();
    loadDataFromExcel(participantName);
});
