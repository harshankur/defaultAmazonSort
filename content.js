function isAmazonWebsite(url) {
    // Asia
    if (url == 'www.amazon.cn')
        return true;
    else if (url == 'www.amazon.in')
        return true;
    else if (url == 'www.amazon.co.jp')
        return true;
    else if (url == 'www.amazon.com.sg')
        return true;
    else if (url == 'www.amazon.com.tr')
        return true;
    else if (url == 'www.amazon.ae')
        return true;
    // Europe
    else if (url == 'www.amazon.fr')
        return true;
    else if (url == 'www.amazon.de')
        return true;
    else if (url == 'www.amazon.it')
        return true;
    else if (url == 'www.amazon.nl')
        return true;
    else if (url == 'www.amazon.es')
        return true;
    else if (url == 'www.amazon.uk')
        return true;
    // Americas
    else if (url == 'www.amazon.ca')
        return true;
    else if (url == 'www.amazon.com.mx')
        return true;
    else if (url == 'www.amazon.com')
        return true;
    // Australia
    else if (url == 'www.amazon.com.au')
        return true;
    // Brazil
    else if (url == 'www.amazon.com.br')
        return true;
    else
        return false;
}

chrome.storage.sync.get('extensionEnabled', function (data) {
    if (data.extensionEnabled == true && isAmazonWebsite(window.location.hostname) && window.location.pathname == '/s') {
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
})
