
var loaded = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  if (!loaded) {
    loaded = true;
    chrome.tabs.executeScript(null, 
      { file: "compiled.js" }, function() {
        chrome.tabs.executeScript({code: 'controller.buyDoge();'});
      });
  }
  else {
    chrome.tabs.executeScript({code: 'controller.buyDoge();'});
  }
});