function openNewTab() {
    chrome.tabs.create({}, function (newTab) {
        // newTab is an object representing the newly opened tab
        const newTabUrl = newTab.url;
        console.log('New tab URL:', newTabUrl);
        // Do something with the URL, like sending it to a content script
    });
}

// Add a listener to trigger the opening of a new tab
chrome.browserAction.onClicked.addListener(function (tab) {
    openNewTab();
});
