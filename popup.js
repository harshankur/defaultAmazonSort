'use strict';

let changeSort = document.getElementById('changeSort');
let primeOnlyEnabledCheckbox = document.getElementById('primeOnlyEnabled');
let extensionEnabledCheckbox = document.getElementById('extensionEnabled');
let sortDictionary;

chrome.storage.sync.get('order', function(data) {
    sortDictionary = data.order;
    chrome.storage.sync.get('sort', function(data) {
        changeSort.getElementsByTagName('option')[sortDictionary[data.sort]].selected = 'selected';
    });
})

chrome.storage.sync.get('primeOnlyEnabled', function(data) {
    primeOnlyEnabledCheckbox.checked = data.primeOnlyEnabled;
})

chrome.storage.sync.get('extensionEnabled', function(data) {
    extensionEnabledCheckbox.checked = data.extensionEnabled;
})

changeSort.addEventListener('change', function() {
    chrome.storage.sync.set({sort: changeSort.options[changeSort.selectedIndex].value}, function() {
        console.log(`Default sort order changed to ${changeSort.options[changeSort.selectedIndex].value}`);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {file: 'content.js'},
                () => chrome.runtime.lastError);
          });
    })
})

primeOnlyEnabledCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({primeOnlyEnabled: primeOnlyEnabledCheckbox.checked}, function() {
        console.log(`primeOnlyEnabled is set to ${primeOnlyEnabledCheckbox.checked}`);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {file: 'content.js'},
                () => chrome.runtime.lastError);
          });
    })
})

extensionEnabledCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({extensionEnabled: extensionEnabledCheckbox.checked}, function() {
        console.log(`extensionEnabled is set to ${extensionEnabledCheckbox.checked}`);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {file: 'content.js'},
                () => chrome.runtime.lastError);
          });
    })
})

// Localisation
document.getElementById('changeSortLabel').innerText = chrome.i18n.getMessage('changeSortLabel');
document.getElementById('featured').innerText = chrome.i18n.getMessage('featured');
document.getElementById('lowToHigh').innerText = chrome.i18n.getMessage('lowToHigh');
document.getElementById('highToLow').innerText = chrome.i18n.getMessage('highToLow');
document.getElementById('customerReview').innerText = chrome.i18n.getMessage('customerReview');
document.getElementById('newestArrivals').innerText = chrome.i18n.getMessage('newestArrivals');
document.getElementById('primeOnlyLabel').innerText = chrome.i18n.getMessage('primeOnlyLabel');
document.getElementById('switchLabel').innerText = chrome.i18n.getMessage('switchLabel');