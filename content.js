// Used as enum for all the stored data.
// Same names will be used in other parts of the code.
// Controls will have the same names as html element ids in popup.html
// HACK: Fixed the "Already Declared" error from showing on the Extensions page by not using strict mode and
//       declaring eStoredData without any const or let declaration.
eStoredData =
{
    changeSort:             "changeSort",
    extensionEnabled:       "extensionEnabled"
};

// Get stored data
chrome.storage.sync.get([eStoredData.changeSort, eStoredData.extensionEnabled], storedData =>
    {
        // If basic info does not match, we stop proceeding further
        if (!storedData[eStoredData.extensionEnabled] || window.location.pathname != "/s")
            return;

        // Set sort order only if it is not the desired default
        if (document.getElementsByTagName('select')[1].selectedIndex == storedData[eStoredData.changeSort])
            return;

        // Open the sort order list and click on the desired default
        document.getElementsByTagName('select')[1].click();
        setTimeout(() => document.getElementsByTagName('ul')[document.getElementsByTagName('ul').length - 1].children[storedData[eStoredData.changeSort]].children[0].click(), 300);

    });