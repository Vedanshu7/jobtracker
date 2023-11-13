// Listen for messages sent from the content script or other parts of the extension
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`

    // Check if the received message is 'onclicked'
    if (message.message === 'onclicked') {

        // Query the active tab to get information about it
        var tab = await chrome.tabs.query({ "active": true });

        // Log the pending URL of the active tab
        message.url = tab[0].pendingUrl;
        message["status"] = 0;
        message["userId"] = "389ea8f2-5b24-11ee-8c99-0242ac120002";
        message["id"] = "00000000-0000-0000-0000-000000000000";

        // Log the updated message
        console.log(message);

        // Check if the message has the property "message" and remove it
        if (message.hasOwnProperty("message")) {
            delete message["message"];
        }

        // Add "CreatedDate" and "UpdatedDate" properties with current timestamps
        message["CreatedDate"] = new Date().toISOString();
        message["UpdatedDate"] = new Date().toISOString();

        // Send a POST request to the specified API endpoint with the modified message
        fetch('https://localhost:7100/Job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(response => response.json())
            .then(data => sendResponse(data))
            .catch(error => sendResponse(error));
    }
});
