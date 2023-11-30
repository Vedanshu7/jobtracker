// filter.js
// AnotherFile.js
import { fetchAndDisplayData, updateJobTiles } from "./fetchapiresponse.js";

// Now you can use fetchAndDisplayData and updateJobTiles in this file

function filterJobs() {
  // Get values from input and select elements
  var keyword = document.getElementById("keywordInput").value.toLowerCase();
  var location = document.getElementById("locationSelect").value.toLowerCase();
  console.log("Job Keyword:", keyword);
  console.log("Job Location:", location);

  // Fetch the API data (you need to implement this in fetchapiresponse.js)
  fetch(
    "https://localhost:7100/User?userId=76848a5d-1b02-4fbd-954a-0b505bb46f85"
  )
    .then((response) => response.json())
    .then((data) => {
      // Filter jobs based on keyword and location
      var filteredJobs = data.filter((job) => {
        // Implement your filtering logic here
        var jobKeyword = job.title.toLowerCase();
        var jobLocation = job.location.toLowerCase();

        return (
          jobKeyword.includes(keyword) &&
          (location === "location" || jobLocation === location)
        );
      });

      // Update job tiles with filtered data
      updateJobTiles(filteredJobs);
      // Print filtered jobs to the console
      console.log("Filtered Jobs:", filteredJobs);
    })
    .catch((error) => console.error("Error fetching API:", error));
}
// filter.js

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchButton").addEventListener("click", filterJobs);
});
