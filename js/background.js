chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'printPage' }, function(response) {
    });
  });

chrome.contextMenus.create({"title": "PagePrinter", "id": "parent", "contexts":["page"],
  "onclick": genericOnClick
});

chrome.contextMenus.create(
    {"title": "printPage", "parentId": "parent", "id": "child1"});
chrome.contextMenus.create(
    {"title": "Somithing else", "parentId": "parent", "id": "child2"});

function genericOnClick() {
  alert('Hello');
}

chrome.contextMenus.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(
    tab.id,
    {code: 'window.print();'});
});






