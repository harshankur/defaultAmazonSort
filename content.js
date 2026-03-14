// Used as enum for all the stored data.
// Same names will be used in other parts of the code.
// Controls will have the same names as html element ids in popup.html
const eStoredData = {
    changeSort: "changeSort",
    extensionEnabled: "extensionEnabled"
};

const SORT_VALUES = [
    "relevanceblender",           // Featured
    "exact-aware-popularity-rank", // Best Sellers
    "price-asc-rank",             // Price: Low to High
    "price-desc-rank",            // Price: High to Low
    "review-rank",                // Avg. Customer Review
    "date-desc-rank",             // Newest Arrivals
];


// Get stored data
chrome.storage.sync.get([eStoredData.changeSort, eStoredData.extensionEnabled], storedData => {
    // If extension is disabled or we are not on a search results page, we stop
    if (!storedData[eStoredData.extensionEnabled] || !window.location.pathname.startsWith("/s")) {
        return;
    }

    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;
    const desiredSort = SORT_VALUES[storedData[eStoredData.changeSort] || 0];
    const currentSort = searchParams.get("s");

    // Redirect to the correct sort URL if it is not the desired default
    if (currentSort !== desiredSort) {
        searchParams.set("s", desiredSort);
        // Remove 'ref' to ensure a clean navigation and avoid potential Amazon redirect loops
        searchParams.delete("ref");
        window.location.href = currentUrl.toString();
    }
});