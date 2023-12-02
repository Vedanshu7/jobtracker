// job-details.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the job ID from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('jobId');

    
    // Fetch job details based on the jobId
    fetchJobDetails(jobId);

    document.getElementById("updateJobButton").addEventListener("click", updateJobDetails);
});

async function fetchJobDetails(jobId) {
    try {
        // Make a request to your API endpoint to fetch job details
        const response = await fetch(`https://localhost:7100/Job/${jobId}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching job details. Status: ${response.status}`);
        }

        // Parse the JSON response
        const jobDetails = await response.json();

        // Display the job details on the page
        displayJobDetails(jobDetails);
    } catch (error) {
        console.error("Error fetching job details:", error);
    }
}

function displayJobDetails(jobDetails) {
    const jobDetailsContainer = document.getElementById("job-details-container");

    // Create the job details content
    const content = `
        <h2>${jobDetails.title}</h2>
        <p>Company: ${jobDetails.companyName}</p>
        <p>Location: ${jobDetails.location}</p>
        <p>Salary: ${jobDetails.salary}</p>
        <p>Keywords: ${jobDetails.jobKeywords}</p>
        <!-- Add more details as needed -->
    `;

    // Update the content in the job details container
    jobDetailsContainer.innerHTML = content;
}
async function updateJobDetails() {
    // Assume jobId is available (you can get it from the URL, for example)
    // Get jobId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get("jobId");

    console.log(jobId);
    console.log(urlParams);
    // Fetch job details
    const jobDetails = await fetchJobDetails(jobId);

    if (jobDetails) {
        // Prompt the user for new values
        const newLocation = prompt("Enter new location:", jobDetails.location);
        const newSalary = prompt("Enter new salary:", jobDetails.salary);
        const newTitle = prompt("Enter new job title:", jobDetails.title);

        // Validate inputs
        if (newLocation && newSalary && newTitle) {
            // Update the job details
            jobDetails.location = newLocation;
            jobDetails.salary = newSalary;
            jobDetails.title = newTitle;

            // Perform any additional update logic (e.g., send an update request to the server)
            console.log("Job details updated:", jobDetails);
        } else {
            alert("Invalid input. Please fill in all fields.");
        }
    }
}

