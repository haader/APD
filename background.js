console.log("Received closeExtension message from popup.js");
//recibimos la accion desde el popup para cerrar la extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "closeExtension") {
      console.log("Received closeExtension message from popup.js");
      chrome.runtime.sendMessage({type: "extensionClosed"});
      window.close();
    }
  });
  