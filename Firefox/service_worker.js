let loaded = false;

chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.id) {
    if (!loaded) {
      loaded = true;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["compiled.js"]
      }, () => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => { controller.buyDoge(); }
        });
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => { controller.buyDoge(); }
      });
    }
  } else {
    console.error("such invalid: ", tab, "; probably can't execute scripts here? or you haven't refreshed when you installed libdoge");
  }
});
