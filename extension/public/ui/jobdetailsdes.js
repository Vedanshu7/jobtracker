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
    .addEventListener("click", function () {
      // Show the Submit button
      updateJobDetails();
      document.getElementById("submitButtonContainer").style.display = "block";
    });

  // Handle the submit logic
  document
    .getElementById("submitButton")
    .addEventListener("click", function () {
      // Call the submitForm function or add your submit logic here
      submitForm();
      document.getElementById("submitButtonContainer").style.display = "none";
    });
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
                
                  <!-- <span class="text-truncate me-3"><i class="far fa-money-bill-alt text-primary me-2"></i>${getStatusLabel(
                    jobDetails.status
                  )}</span> -->
                  
                <span class="text-truncate me-3"><i class="far fa-money-bill-alt text-primary me-2"></i>`;

  // Replace the static status display with a dynamic <select> element
  content += `
                                <select id="jobStatus" ${
                                  jobDetails.isEditable ? "" : "disabled"
                                }>
                                  <option value="0" ${
                                    jobDetails.status === 0 ? "selected" : ""
                                  }>Applied</option>
                                  <option value="1" ${
                                    jobDetails.status === 1 ? "selected" : ""
                                  }>In Review</option>
                                  <option value="2" ${
                                    jobDetails.status === 2 ? "selected" : ""
                                  }>Accepted</option>
                                </select>
                              </span>
              
                  

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

async function updateJobDetails() {
  var inputElements = document.querySelectorAll("input, select");

  // Toggle the 'disabled' attribute for each input and select
  inputElements.forEach(function (element) {
    element.disabled = !element.disabled;
  });
  //   const shouldEnableStatus = true; // Set this based on your condition

  //   // Get the status select element
  //   const statusSelect = document.getElementById("jobStatus");

  //   // Enable or disable the status button based on the condition
  //   statusSelect.disabled = !shouldEnableStatus;
}

function submitForm() {
  // Get all input and select elements by class name
  var inputElements = document.querySelectorAll("input, select");

  // Validate inputs if needed
  // ...

  // Disable all input and select elements
  inputElements.forEach(function (element) {
    element.disabled = true;
  });
}
