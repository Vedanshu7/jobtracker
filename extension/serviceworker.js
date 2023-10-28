// Add a listener to trigger the opening of a new tab
console.log(chrome)
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    if (message === 'onclicked') {
        var tab = await chrome.tabs.query({"active":true});
        console.log(tab[0].pendingUrl);
        sendResponse("done");
    }
});



