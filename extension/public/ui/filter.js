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

  try {
    chrome.storage.local.get('myData', async function (result) {
      console.log(JSON.parse(result.myData.user))
      const response = await fetch("https://localhost:7100/locations/" + JSON.parse(result.myData.user).id, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ` + result.myData.access_token,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      const data = await response.json();
      const selectElement = document.getElementById("locationSelect");

      // Clear existing options
      selectElement.innerHTML = "";
      const optionElement = document.createElement("option");
      optionElement.value = "select";
      optionElement.text = "select";
      optionElement.selected = true;
      selectElement.appendChild(optionElement);

      // Add new options
      data.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
      });
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

