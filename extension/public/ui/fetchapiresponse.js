// script.js

export function fetchAndDisplayData() {
  // Fetch the API data
  chrome.storage.local.get('myData', function (result) {
    fetch(
      "https://localhost:7100/User?userId=" + JSON.parse(result.myData.user).id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ` + result.myData.access_token,
        'Content-Type': 'application/json'
      }
    }
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the API response and update the job tiles
        updateJobTiles(data);
      })
      .catch((error) => console.error("Error fetching API:", error));

  });
}
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

function getdatestring(dateString) {
  const dateObject = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return new Intl.DateTimeFormat('en-US', options).format(dateObject);
}

function checkSalary(salary){
  if(/\d/.test(salary)){
    return salary;
  }
  return "Not Mentioned";
}

export function updateJobTiles(apiResponse) {
  // Clear existing job tiles
  document.getElementById("tab-1").innerHTML = "";

  // Iterate over the API response and fill job tiles
  apiResponse.forEach((job) => {
    // Create a new job item
    var jobItem = document.createElement("div");
    jobItem.className = "job-item p-4 mb-4";

    // Create the job item content
    var content = `
        <div class="row g-4">
          <div class="col-sm-12 col-md-8 d-flex align-items-center">
            <img class="flex-shrink-0 img-fluid border rounded" src="${job.logoUrl
      }" alt="" style="width: 80px; height: 80px;">
            <div class="text-start ps-4">
              <h5 class="mb-3">${job.title}</h5>
              <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${job.location
      }</span>
              
              <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>${checkSalary(job.salary
  )}</span>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
            <div class="d-flex mb-3">
              <a class="" href="">${getStatusLabel(
        job.status
      )}</a>
              
            </div>
            <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Date: ${getdatestring(job.createdDate
      )}</small>
          </div>
        </div>
      `;

    // Set the content to the job item
    jobItem.innerHTML = content;
    // Make the entire job tile clickable
    jobItem.addEventListener("click", () => {
      // Redirect to the job details page with the job ID
      window.location.href = `job-detail.html?jobId=${job.id}`;
    });


    // Append the job item to the tab-1 container
    document.getElementById("tab-1").appendChild(jobItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayData();
});
