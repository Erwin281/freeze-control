// Pantalla blanca solo la primera vez
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
  }
});

// Auto-descongelar al entrar a una pestaña congelada
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.discarded) {
    chrome.tabs.reload(activeInfo.tabId);
  }
});