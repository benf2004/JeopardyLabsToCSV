async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let url1 = new URL(tab.url)
    console.log(url1.hostname)
    if (url1.hostname === "jeopardylabs.com"){
        let path = url1.pathname
        let p = path.split("/")
        console.log(p)
        if (p[1] === "print"){
            go()
        }
        else if(p[1] === "play" || p[0] === "edit2"){
            let new_url = `https://jeopardylabs.com/print/${p[2]}`
            chrome.runtime.sendMessage("delay")
            chrome.tabs.update({url: new_url}, function (tab) {
                console.log(tab)
            })
        }
    }
}
getCurrentTab()
function go(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "go")
    });
}
function stop() {
    window.close()
}
setTimeout(stop, 500)