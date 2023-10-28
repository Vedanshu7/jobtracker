// This is an asynchronous function to open a Chrome extension.
async function openExtension() {
    // Define query options to get the currently active and last focused window.
    let queryOptions = { active: true, lastFocusedWindow: true };
    
    // Use the Chrome API to query the active tab.
    let [tab] = await chrome.tabs.query({ active: true });

    // Execute a content script on the active tab.
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async () => {
            // Display an alert from the extension.
            alert('Hello from my extension!');

            // Find an element with the class 'job-card-container' and add additional content to it.
            var tileObject = document.getElementsByClassName('job-card-container');
            var htmlRef = '<ul class="job-card-list__footer-wrapper job-card-container__footer-wrapper flex-shrink-zero display-flex t-sans t-12 t-black--light t-normal t-roman"><li class="job-card-container__footer-item inline-flex align-items-right" style="color:red"> Applied </li></ul>';
            var htmlObject = document.createElement('ul');
            htmlObject.innerHTML = htmlRef;
            tileObject[0].appendChild(htmlObject);

            // Add a click event listener to an element with the class 'jobs-apply-button'.
            document.getElementsByClassName('jobs-apply-button')[0].addEventListener("click", async () => {
                // Send a message to the background script of the extension.
                chrome.runtime.sendMessage('onclicked', (response) => {
                    // Log the response received from the service worker.
                    console.log('received user data', response);
                });
            });
        }
    });
}

// Add a click event listener to an element with the ID 'myButton' to trigger the openExtension function.
document.getElementById("myButton").addEventListener("click", openExtension());

// Add a click event listener to an element with the class 'jobs-apply-button' to send a message to the service worker.
document.getElementsByClassName('jobs-apply-button')[0].addEventListener("click", async () => {
    chrome.runtime.sendMessage('onclicked', (response) => {
        // Log the response received from the service worker.
        console.log('received user data', response);
    });
});
