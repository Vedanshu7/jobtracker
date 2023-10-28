async function openExtension() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async () => {
            alert('Hello from my extension!');
            var tileObject = document.getElementsByClassName('job-card-container');
            var htmlRef = '<ul class="job-card-list__footer-wrapper job-card-container__footer-wrapper flex-shrink-zero display-flex t-sans t-12 t-black--light t-normal t-roman"><li class="job-card-container__footer-item inline-flex align-items-right" style="color:red"> Applied </li></ul>';
            var htmlObject = document.createElement('ul');
            htmlObject.innerHTML = htmlRef;
            tileObject[0].appendChild(htmlObject);
            document.getElementsByClassName('jobs-apply-button')[0].addEventListener("click", async () => {
                chrome.runtime.sendMessage('onclicked', (response) => {
                    // 3. Got an asynchronous response with the data from the service worker
                    console.log('received user data', response);
                  });
            });
        }
    });

}

document.getElementById("myButton").addEventListener("click", openExtension());
document.getElementsByClassName('jobs-apply-button')[0].addEventListener("click",async () => {
    chrome.runtime.sendMessage('onclicked', (response) => {
        // 3. Got an asynchronous response with the data from the service worker
        console.log('received user data', response);
      });
});

