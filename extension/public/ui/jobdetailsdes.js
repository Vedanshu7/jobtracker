// job-details.js
//import { getStatusLabel } from "./fetchapiresponse.js";
document.addEventListener("DOMContentLoaded", function () {
  // Get the job ID from the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("jobId");

  // Fetch job details based on the jobId
  fetchJobDetails(jobId);

  document
    .getElementById("updateJobButton")
    .addEventListener("click", updateJobDetails);
});
export function getStatusLabel(status) {
  switch (status) {
    case 0:
      return "Applied";
    case 1:
      return "In Review";
    case 2:
      return "Accepted";
    default:
      return "Apply Now";
  }
}
async function fetchJobDetails(jobId) {
  try {
    // Make a request to your API endpoint to fetch job details
    //const response = await fetch(`https://localhost:7100/Job/${jobId}`);
    const response = await fetch(
      "https://localhost:7100/Job/6d769e7a-7f72-4d74-99d3-c1272653f534"
    ).then(async (response) => {
      displayJobDetails(await response.json());
    });
    if (!response.ok) {
      throw new Error(`Error fetching job details. Status: ${response.status}`);
    }

    // Parse the JSON response
    //const jobDetails = await response.json();
    let jobDetails = response;
    //const jobDetails = await response.json();
    // Display the job details on the page
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
}

function displayJobDetails(jobDetails) {
  const jobDetailsContainer = document.getElementById("job-details-container");

  var content = `
      <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
          <div class="row gy-5 gx-4">
            <div class="col-lg-8">
              <div class="d-flex align-items-center mb-5">
                <img class="flex-shrink-0 img-fluid border rounded" src="${
                  jobDetails.logoUrl
                }" alt="Company Logo" style="width: 80px; height: 80px;">
                <div class="text-start ps-4">
                  <h3 class="mb-3">${jobDetails.title}</h3>
                  <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${
                    jobDetails.location
                  }</span>
                  <span class="text-truncate me-3"><i class="far fa-money-bill-alt text-primary me-2"></i>${
                    jobDetails.salary
                  }</span>
                  <span class="text-truncate me-3"><i class="far fa-money-bill-alt text-primary me-2"></i>${getStatusLabel(
                    jobDetails.status
                  )}</span>
                </div>
              </div>
  
              <div class="mb-5">
                <h4 class="mb-3">Job Description</h4>
                <iframe srcdoc="${
                  jobDetails.jobKeywords
                }" width="100%" ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

  // Update the content in the job details container
  jobDetailsContainer.innerHTML = content;
}

// async function updateJobDetails() {
//   // Assume jobId is available (you can get it from the URL, for example)
//   // Get jobId from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const jobId = urlParams.get("jobId");

//   console.log(jobId);
//   console.log(urlParams);
//   // Fetch job details
//   const jobDetails = await fetchJobDetails(jobId);

//   if (jobDetails) {
//     // Prompt the user for new values
//     const newLocation = prompt("Enter new location:", jobDetails.location);
//     const newSalary = prompt("Enter new salary:", jobDetails.salary);
//     const newTitle = prompt("Enter new job title:", jobDetails.title);

//     // Validate inputs
//     if (newLocation && newSalary && newTitle) {
//       // Update the job details
//       jobDetails.location = newLocation;
//       jobDetails.salary = newSalary;
//       jobDetails.title = newTitle;

//       // Perform any additional update logic (e.g., send an update request to the server)
//       console.log("Job details updated:", jobDetails);
//     } else {
//       alert("Invalid input. Please fill in all fields.");
//     }
//   }
// }
