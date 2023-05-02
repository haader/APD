document.getElementById("close-btn").addEventListener("click", function() {
    chrome.runtime.sendMessage({type: "toggleExtension"});
  });

  