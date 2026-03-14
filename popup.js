'use strict';

// Used as enum for all the stored data.
// Same names will be used in other parts of the code.
// Controls will have the same names as html element ids in popup.html
const eStoredData =
{
    changeSort: "changeSort",
    extensionEnabled: "extensionEnabled",
    primeOnly: "primeOnly"
};

// Get the elements on popup html
const elements = {};
[eStoredData.changeSort, eStoredData.extensionEnabled, eStoredData.primeOnly].forEach(cntl => elements[cntl] = document.getElementById(cntl));

// Set correct sort order
chrome.storage.sync.get([eStoredData.changeSort], storedData => elements[eStoredData.changeSort].selectedIndex = storedData[eStoredData.changeSort]);

// Set toggle switch (Extension Enabled)
chrome.storage.sync.get([eStoredData.extensionEnabled], storedData => elements[eStoredData.extensionEnabled].checked = storedData[eStoredData.extensionEnabled]);

// Set toggle switch (Prime Only)
chrome.storage.sync.get([eStoredData.primeOnly], storedData => elements[eStoredData.primeOnly].checked = storedData[eStoredData.primeOnly]);

// Helper function to trigger content.js to apply new filters
function notifyAmazonTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes("amazon.")) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "apply_filters" })
                .catch(err => console.log("Content script not ready or error:", err));
        }
    });
}

// Add event listener for change for the select control
elements[eStoredData.changeSort].addEventListener('change', () => {
    // Store the new value for sort order
    chrome.storage.sync.set({ [eStoredData.changeSort]: elements[eStoredData.changeSort].selectedIndex }, notifyAmazonTab);
});

// Add event listener for change for the Extension Enable toggle
elements[eStoredData.extensionEnabled].addEventListener('change', () => {
    // Store the new value for the enable/disable state
    chrome.storage.sync.set({ [eStoredData.extensionEnabled]: elements[eStoredData.extensionEnabled].checked }, notifyAmazonTab);
});

// Add event listener for change for the Prime Only toggle
elements[eStoredData.primeOnly].addEventListener('change', () => {
    // Store the new value for the Prime Only state
    chrome.storage.sync.set({ [eStoredData.primeOnly]: elements[eStoredData.primeOnly].checked }, notifyAmazonTab);
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