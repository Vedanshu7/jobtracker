//alert("Hello From Extension");

window.onload = function () {
    var tileObject = document.getElementsByClassName('job-card-container');
    var htmlRef = '<ul class="job-card-list__footer-wrapper job-card-container__footer-wrapper flex-shrink-zero display-flex t-sans t-12 t-black--light t-normal t-roman"><li class="job-card-container__footer-item inline-flex align-items-right" style="color:red"> Applied </li></ul>';
    var htmlObject = document.createElement('ul');
    htmlObject.innerHTML = htmlRef;
    if(tileObject !== undefined && tileObject[0] !== undefined){
        tileObject[0].appendChild(htmlObject);
    }
    // Add a click event listener to an element with the class 'jobs-apply-button'.
    document.getElementsByClassName('jobs-apply-button')[0].addEventListener("click", async () => {
        // Send a message to the background script of the extension.
        chrome.runtime.sendMessage('onclicked', (response) => {
            // 3. Got an asynchronous response with the data from the service worker
            // Log the response received from the service worker.
            console.log('received user data', response);
        });
    });
}
