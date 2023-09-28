async function sayHello() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            alert('Hello from my extension!');
            var t = document.getElementsByClassName('job-card-container');
            var s = '<ul class="job-card-list__footer-wrapper job-card-container__footer-wrapper flex-shrink-zero display-flex t-sans t-12 t-black--light t-normal t-roman"><li class="job-card-container__footer-item inline-flex align-items-right" style="color:red"> Applied </li></ul>';
            var htmlObject = document.createElement('ul');
            htmlObject.innerHTML = s;
            t[0].appendChild(htmlObject);
            document.getElementsByClassName('jobs-apply-button').addEventListener("click", () => {
                alert(window.location.href)
            });
        }
    });

}

document.getElementById("myButton").addEventListener("click", sayHello);
