
console.log('Service worker script started');

// Listen for messages sent from the content script or other parts of the extension
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`

  // Check if the received message is 'onclicked'
  if (message.message === 'onclicked') {

    // Query the active tab to get information about it
    var tab = await chrome.tabs.query({ "active": true });

    console.log(tab);
    // Log the pending URL of the active tab
    message.url = tab[0].pendingUrl;
    message["status"] = 0;

    message["id"] = "00000000-0000-0000-0000-000000000000";
    // console.log(JSON.parse(localStorage.getItem("user")));
    // console.log(localStorage.getItem("access_token"));
    message["userId"] = "00000000-0000-0000-0000-000000000000";
    // Log the updated message

    // Check if the message has the property "message" and remove it
    if (message.hasOwnProperty("message")) {
      delete message["message"];
    }

    // Add "CreatedDate" and "UpdatedDate" properties with current timestamps
    message["CreatedDate"] = new Date().toISOString();
    message["UpdatedDate"] = new Date().toISOString();

    console.log(message);
    chrome.storage.local.get('myData', function (result) {
      console.log("Here in local data");
      message.userId = JSON.parse(result.myData.user).id;
      fetch('https://localhost:7100/Job', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ` + result.myData.access_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse(error));
    });


    // Send a POST request to the specified API endpoint with the modified message

    sendResponse("null");

  }
  if (message.message === "onclickedWeb") {
    console.log("Here on web click");
    var tab = await chrome.tabs.query({ "active": true });

    console.log(tab);
    // Log the pending URL of the active tab
    message.url = tab[0].pendingUrl;
    message["status"] = 0;

    message["id"] = "00000000-0000-0000-0000-000000000000";
    // console.log(JSON.parse(localStorage.getItem("user")));
    // console.log(localStorage.getItem("access_token"));
    message["userId"] = "00000000-0000-0000-0000-000000000000";
    // Log the updated message

    // Check if the message has the property "message" and remove it
    if (message.hasOwnProperty("message")) {
      delete message["message"];
    }

    // Add "CreatedDate" and "UpdatedDate" properties with current timestamps
    message["CreatedDate"] = new Date().toISOString();
    message["UpdatedDate"] = new Date().toISOString();

    chrome.storage.local.get('myData', function (result) {
      console.log("Here in local data");
      message.userId = JSON.parse(result.myData.user).id;
      console.log(message);
      fetch('https://localhost:7100/Job', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ` + result.myData.access_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse(error));
    });


    // Send a POST request to the specified API endpoint with the modified message

    sendResponse("null");
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log(chrome);
});

