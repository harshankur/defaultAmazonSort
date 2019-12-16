'use strict';

let changeSort = document.getElementById('changeSort');
let extensionEnabledCheckbox = document.getElementById('extensionEnabled');
let sortDictionary;

chrome.storage.sync.get('order', function(data) {
    sortDictionary = data.order;
    chrome.storage.sync.get('sort', function(data) {
        changeSort.getElementsByTagName('option')[sortDictionary[data.sort]].selected = 'selected';
    });
})

chrome.storage.sync.get('extensionEnabled', function(data) {
    extensionEnabledCheckbox.checked = data.extensionEnabled;
})

changeSort.addEventListener('change', function() {
    chrome.storage.sync.set({sort: changeSort.options[changeSort.selectedIndex].value}, function() {
        console.log(`Default sort order changed to ${changeSort.options[changeSort.selectedIndex].value}`);
    })
})

extensionEnabledCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({extensionEnabled: extensionEnabledCheckbox.checked}, function() {
        console.log(`extensionEnabled is set to ${extensionEnabledCheckbox.checked}`);
    })
})