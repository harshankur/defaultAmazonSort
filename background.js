'use strict';

// Used as enum for all the stored data.
// Same names will be used in other parts of the code.
// Controls will have the same names as html element ids in popup.html
const eStoredData =
{
    changeSort:             "changeSort",
    extensionEnabled:       "extensionEnabled"
};

// When the extension is installed, we want to initialize our properties with true
chrome.runtime.onInstalled.addListener(() =>
    {
        // Get originally stored data
        chrome.storage.sync.get([eStoredData.changeSort, eStoredData.extensionEnabled], storedData =>
        {
            // Set default sort value to "customerReview" if nothing is found on the storage.
            chrome.storage.sync.set({ [eStoredData.changeSort]: storedData[eStoredData.changeSort] ?? 3 });
            // Set toggle to true if no stored data is found.
            chrome.storage.sync.set({ [eStoredData.extensionEnabled]: storedData[eStoredData.extensionEnabled] ?? true });
        });
    });

// When a tab is updated, we want to check with content.js for our extension to work on.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
    {
        if (changeInfo.status == 'complete')
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabId },
                    files: ['./content.js'],
                })
                .catch(err => console.log(err));
    });