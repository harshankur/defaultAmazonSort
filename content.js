if (window.location.pathname == '/s') {
    chrome.storage.sync.get('order', function (order) {
        chrome.storage.sync.get('sortOrderMap', function (sortOrderMap) {
            chrome.storage.sync.get('sort', function (data) {
                if (document.getElementsByTagName('SELECT')[1].value != sortOrderMap.sortOrderMap[data.sort]) {
                    document.getElementsByTagName('SELECT')[1].click();
                    window.setTimeout(function() {
                        document.getElementsByTagName('UL')[document.getElementsByTagName('UL').length - 1].children[order.order[data.sort]].children[0].click();
                    }, 500)
                }
            })
        })
    })
}