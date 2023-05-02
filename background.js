


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "toggleExtension") {
    console.log("Received toggleExtension message from popup.js");
    chrome.tabs.reload();
    chrome.management.setEnabled(chrome.runtime.id, false);
  }
});

