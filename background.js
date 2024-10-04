chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({
        path: "index.html",
        enabled: true
    });
});