// popup.js

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('clickButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: injectContentScript,
      });
    });
  });
});



function injectContentScript() {
  try {

    chrome.storage.local.get('myData', function (result) {
      fetch(
        "https://localhost:7100/Job/GetStatus?userId=" + JSON.parse(result.myData.user).id
        ,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ` + result.myData.access_token,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((data) => {
          // Process the API response and update the job tiles
          console.log(data);
          var jobCardContainers = document.getElementsByClassName('job-card-container');
          for (var i = 0; i < jobCardContainers.length; i++) {
            if (data.hasOwnProperty(jobCardContainers[i].dataset.jobId)) {
              if (!document.getElementById("my-" + jobCardContainers[i].dataset.jobId)) {
                var htmlRef = '<ul id="my-' + jobCardContainers[i].dataset.jobId + '" class="job-card-list__footer-wrapper job-card-container__footer-wrapper flex-shrink-zero display-flex t-sans t-12 t-black--light t-normal t-roman"><li class="job-card-container__footer-item inline-flex align-items-right" style="color:red">'
                  + data[jobCardContainers[i].dataset.jobId] + '</li></ul>';
                var htmlObject = document.createElement('ul');
                htmlObject.innerHTML = htmlRef;
                jobCardContainers[i].appendChild(htmlObject);
              }
            }
          }
        })
        .catch((error) => console.error("Error fetching API:", error));

    });

    
    // Add a click event listener to an element with the class 'jobs-apply-button'.
    document.getElementsByClassName('jobs-apply-button')[0].addEventListener("click", async () => {
      // Create an object with various properties based on the information from the page
      let obj = {
        "logoUrl": document.getElementsByClassName("jobs-search-results-list__list-item--active")[0].querySelector('img.ivm-view-attr__img--centered.EntityPhoto-square-4').src,
        "title": document.getElementsByClassName('t-24 t-bold job-details-jobs-unified-top-card__job-title')[0].innerText,
        "companyName": document.getElementsByClassName('job-details-jobs-unified-top-card__primary-description-container')[0].getElementsByClassName('app-aware-link')[0].innerText,
        "jobId": document.getElementsByClassName("jobs-search-results-list__list-item--active")[0].dataset.jobId,
        // Define a function for extracting location information
        "location_func": () => {
          let clonedDiv = document.getElementsByClassName('job-details-jobs-unified-top-card__primary-description-container')[0].cloneNode(true);

          // Remove all anchor tags and spans from the cloned div
          var anchors = clonedDiv.querySelectorAll('a');
          var spans = clonedDiv.querySelectorAll('span');

          anchors.forEach(function (anchor) {
            anchor.parentNode.removeChild(anchor);
          });

          spans.forEach(function (span) {
            span.parentNode.removeChild(span);
          });

          // Extract and clean the text content from the cloned div
          return clonedDiv.textContent.trim().replace("· ", "");
        },

        // Define a function for extracting salary information
        "salary_func": () => {
          let jobInsightLi = document.querySelector('.job-details-jobs-unified-top-card__job-insight');
          let firstSpanInLi = jobInsightLi.querySelector('span');
          return firstSpanInLi.textContent.trim().split("\n")[0];
        },

        // Define a function for extracting job keywords
        "jobKeywords_func": () => {
          let container = document.querySelector('.jobs-description__container');
          let spanElements = container.querySelectorAll('span');
          let spanTextList = [];

          spanElements.forEach(function (span) {
            var spanText = span.textContent.trim();
            if (spanText !== "") {
              spanTextList.push(spanText);
            }
          });

          // Convert the array of span text to a comma-separated string
          return spanTextList.toString();
        },

        // Additional properties
        "message": "onclicked",
        "salary": "",
        "location": "",
        "jobKeywords": "",
        "url": "",
        "userId": ""
      };

      // Populate the remaining properties of the object using the defined functions
      obj.jobKeywords = obj.jobKeywords_func();
      obj.location = obj.location_func();
      obj.salary = obj.salary_func();

      // Example: Capture scroll events
      // document.addEventListener('scroll', () => {

      // });

      // Send a message to the background script of the extension.
      chrome.runtime.sendMessage(obj, (response) => {
        // 3. Got an asynchronous response with the data from the service worker
        // Log the response received from the service worker.
        console.log('received user data', response);
      });
    });
  }
  catch (err) {

  }

}

