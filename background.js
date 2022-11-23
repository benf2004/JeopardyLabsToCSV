chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request === "delay"){
            console.log("YES")
            setTimeout(sayGo, 2000)
        }
    }
);

function sayGo(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "go")
    });
}