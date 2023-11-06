// Listen for messages sent from the content script or other parts of the extension
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    // Check if the received message is 'onclicked'
    if (message === 'onclicked') {
        var tab = await chrome.tabs.query({"active":true});
        // Query the active tab to get information about it
        var tab = await chrome.tabs.query({ "active": true });
        // Log the pending URL of the active tab
        console.log(tab);
        console.log(tab[0].pendingUrl);
        // Send a response back to the sender (the content script or extension component that requested data)
        sendResponse("done");
    }
});