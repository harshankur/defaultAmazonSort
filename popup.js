'use strict';

// Used as enum for all the stored data.
// Same names will be used in other parts of the code.
// Controls will have the same names as html element ids in popup.html
const eStoredData =
{
    changeSort: "changeSort",
    extensionEnabled: "extensionEnabled"
};

// Get the elements on popup html
const elements = {};
[eStoredData.changeSort, eStoredData.extensionEnabled].forEach(cntl => elements[cntl] = document.getElementById(cntl));

// Set correct sort order
chrome.storage.sync.get([eStoredData.changeSort], storedData => elements[eStoredData.changeSort].selectedIndex = storedData[eStoredData.changeSort]);

// Set toggle switch
chrome.storage.sync.get([eStoredData.extensionEnabled], storedData => elements[eStoredData.extensionEnabled].checked = storedData[eStoredData.extensionEnabled]);

// Add event listener for change for the select control
elements[eStoredData.changeSort].addEventListener('change', () => {
    // Store the new value for sort order
    chrome.storage.sync.set({ [eStoredData.changeSort]: elements[eStoredData.changeSort].selectedIndex }, () => {
        // Execute script on changes with this value to trigger immediate refresh if on Amazon
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes("amazon.")) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['./content.js'],
                }).catch(err => console.log(err));
            }
        });
    });
});

// Add event listener for change for the toggle control
elements[eStoredData.extensionEnabled].addEventListener('change', () => {
    // Store the new value for the enable/disable state
    chrome.storage.sync.set({ [eStoredData.extensionEnabled]: elements[eStoredData.extensionEnabled].checked }, () => {
        // Execute script on changes with this value to trigger immediate refresh if on Amazon
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes("amazon.")) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['./content.js'],
                }).catch(err => console.log(err));
            }
        });
    });
});

// Localisation
// This function finds all elements with a 'data-i18n' attribute and sets their content
// This is more scalable than maintaining a manual list of IDs in JS.
function localize() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const message = chrome.i18n.getMessage(key);
        if (message) {
            element.innerText = message;
        }
    });
}

localize();