document.getElementById("close-btn").addEventListener("click", function() {
    console.log("Sending closeExtension message to background.js");
    chrome.runtime.sendMessage({type: "closeExtension"});
    window.close();
  });
  