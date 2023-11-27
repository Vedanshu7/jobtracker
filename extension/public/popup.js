// popup.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch the content of index.html
    fetch(chrome.runtime.getURL('index.html'))
      .then(response => response.text())
      .then(data => {
        // Insert the content into the #website-template div
        document.getElementById('website-template').innerHTML = data;
      })
      .catch(error => console.error('Error fetching index.html:', error));
  });
  