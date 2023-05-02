
let booleanApp=true;


chrome.tabs.query({url: "https://misservicios.abc.gob.ar/actos.publicos.digitales/"}, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id);
        
      }
    });


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "toggleExtension") {
  

    chrome.tabs.query({url: "https://misservicios.abc.gob.ar/actos.publicos.digitales/"}, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id);
        booleanApp=!booleanApp;
    chrome.management.setEnabled("fonjahncogcbmenahmchjeenphgggole", booleanApp);
    
      }
    });

  }
});
