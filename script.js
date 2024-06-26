document.getElementById('interviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get participant ID
    let participant = document.getElementById('participant').value.trim();

    // Load JSON data (replace with your actual JSON file path)
    fetch('MITdataset/interviewScoreRoy.json') // Adjust the path to your JSON file
        .then(response => response.json())
        .then(data => {
            // Check if participant ID exists in JSON data
            if (participant in data) {
                // Retrieve ratings for the participant from JSON data
                let ratings = data[participant];

                // Populate form fields with ratings
                document.getElementById('overallRating').value = ratings['Overall Rating'] || '';
                document.getElementById('recommendHiring').value = ratings['Recommend Hiring'] || '';
                document.getElementById('engagement').value = ratings['Engagement'] || '';
                document.getElementById('excitement').value = ratings['Excitement'] || '';
                document.getElementById('eyeContact').value = ratings['Eye Contact'] || '';
                document.getElementById('smile').value = ratings['Smile'] || '';
                document.getElementById('friendliness').value = ratings['Friendliness'] || '';
                document.getElementById('speakingRate').value = ratings['Speaking Rate'] || '';
                document.getElementById('noFillers').value = ratings['No Fillers'] || '';
                document.getElementById('paused').value = ratings['Paused'] || '';
                document.getElementById('authentic').value = ratings['Authentic'] || '';
                document.getElementById('calm').value = ratings['Calm'] || '';
                document.getElementById('focused').value = ratings['Focused'] || '';
                document.getElementById('structuredAnswers').value = ratings['Structured Answers'] || '';
                document.getElementById('notStressed').value = ratings['Not Stressed'] || '';
                document.getElementById('notAwkward').value = ratings['Not Awkward'] || '';

            } else {
                console.log(`Participant ${participant} not found in data.`);
                // Handle case where participant ID is not found
            }
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
            // Handle errors loading JSON file
        });
});
s
