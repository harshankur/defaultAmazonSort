'use strict';

// Used as enum for all the stored data.
// Same names will be used in other parts of the code.
// Controls will have the same names as html element ids in popup.html
const eStoredData =
{
    changeSort:             "changeSort",
    extensionEnabled:       "extensionEnabled"
};

// Get the elements on popup html
const elements = {};
[eStoredData.changeSort, eStoredData.extensionEnabled].forEach(cntl => elements[cntl] = document.getElementById(cntl));
// Set correct sort order
chrome.storage.sync.get([eStoredData.changeSort], storedData => elements[eStoredData.changeSort].selectedIndex = storedData[eStoredData.changeSort]);
// Set toggle switch
chrome.storage.sync.get([eStoredData.extensionEnabled], storedData => elements[eStoredData.extensionEnabled].checked = storedData[eStoredData.extensionEnabled]);

// Add event listener for change for the select control
// Attaching event listener
elements[eStoredData.changeSort].addEventListener('change', () =>
    {
        // Store the new value for toggle values
        chrome.storage.sync.set({ [eStoredData.changeSort]: elements[eStoredData.changeSort].selectedIndex });
        // Execute script on changes with this value
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    files: ['./content.js'],
                })
                .catch(err => console.log(err));
            });
    });

// Add event listener for change for all the toggle control
// Attaching event listener
elements[eStoredData.extensionEnabled].addEventListener('change', () =>
    {
        // Store the new value for toggle values
        chrome.storage.sync.set({ [eStoredData.extensionEnabled]: elements[eStoredData.extensionEnabled].checked });
        // Execute script on changes with this value
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    files: ['./content.js'],
                })
                .catch(err => console.log(err));
            });
    });

// Localisation
const labels = ['changeSortLabel', 'featured', 'lowToHigh', 'highToLow', 'customerReview', 'newestArrivals', 'switchLabel'];
labels.forEach(label => document.getElementById(label).innerText = chrome.i18n.getMessage(label));