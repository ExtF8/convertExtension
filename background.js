chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({
        path: "sidePanel.html",
        enabled: true
    });
});