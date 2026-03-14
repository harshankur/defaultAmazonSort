// Used as enum for all the stored data.
// Same names will be used in other parts of the code.
// Controls will have the same names as html element ids in popup.html
const eStoredData = {
    changeSort: "changeSort",
    extensionEnabled: "extensionEnabled",
    primeOnly: "primeOnly"
};

const SORT_VALUES = [
    "relevanceblender",           // Featured
    "exact-aware-popularity-rank", // Best Sellers
    "price-asc-rank",             // Price: Low to High
    "price-desc-rank",            // Price: High to Low
    "review-rank",                // Avg. Customer Review
    "date-desc-rank",             // Newest Arrivals
];


// Main function to run the logic
function applyAmazonFilters() {
    // Get stored data
    chrome.storage.sync.get([eStoredData.changeSort, eStoredData.extensionEnabled, eStoredData.primeOnly], storedData => {
        // If extension is disabled or we are not on a search results page, we stop
        if (!storedData[eStoredData.extensionEnabled] || !window.location.pathname.startsWith("/s")) {
            return;
        }

        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;
        const desiredSort = SORT_VALUES[storedData[eStoredData.changeSort] || 0];
        const currentSort = searchParams.get("s");
        const primeOnly = storedData[eStoredData.primeOnly] || false;

        // Sort logic
        let needsRedirect = false;
        if (currentSort !== desiredSort) {
            searchParams.set("s", desiredSort);
            needsRedirect = true;
        }

        // Define Prime Filters per region (using decoded format)
        const PRIME_FILTERS = {
            "amazon.com": "p_85:2470955011",
            "amazon.in": "p_85:10440599031",
            "amazon.co.uk": "p_76:419158031"
        };

        // Prime Only logic (manipulating 'rh' parameter)
        const hostname = window.location.hostname.replace("www.", "");
        let primeFilter = PRIME_FILTERS[hostname];

        // Dynamic Strategy: If unknown region, attempt to scrape the exact ID from the DOM's left sidebar
        if (!primeFilter && primeOnly) {
            const primeElements = document.querySelectorAll('i.a-icon-prime');
            for (const el of primeElements) {
                const link = el.closest('a');
                if (link && link.href) {
                    const match = link.href.match(/(p_85|p_76)(?:%3A|:)(\d+)/);
                    if (match) {
                        primeFilter = `${match[1]}:${match[2]}`;
                        console.log("DAS: Scraped local Prime filter tag:", primeFilter);
                        break;
                    }
                }
            }
        }

        let currentRh = searchParams.get("rh") || "";
        let rhParts = currentRh ? currentRh.split(',') : [];

        // If we still don't have a primeFilter tag (unknown region & scraping failed), we skip Prime logic
        if (primeFilter) {
            // 'get' returns decoded values (e.g., 'p_85:10440599031'), so exact match works
            const hasPrimeFilter = rhParts.includes(primeFilter);

            if (primeOnly && !hasPrimeFilter) {
                rhParts.push(primeFilter);
                searchParams.set("rh", rhParts.join(',')); // URLSearchParams handles the encoding automatically
                needsRedirect = true;
            } else if (!primeOnly && hasPrimeFilter) {
                rhParts = rhParts.filter(part => part !== primeFilter);
                if (rhParts.length > 0) {
                    searchParams.set("rh", rhParts.join(','));
                } else {
                    searchParams.delete("rh");
                }
                needsRedirect = true;
            }
        } else if (primeOnly && !PRIME_FILTERS[hostname]) {
            console.log("DAS: Prime filter enabled, but tag unknown for this region and could not be scraped.");
        }

        // Redirect to the correct sort URL if any parameters needed to be changed
        if (needsRedirect) {
            // Remove 'ref' to ensure a clean navigation and avoid potential Amazon redirect loops
            searchParams.delete("ref");
            window.location.href = currentUrl.toString();
        }
    });
}

// Run on page load
applyAmazonFilters();

// Listen for messages from the popup to immediately apply new filter settings dynamically
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "apply_filters") {
        applyAmazonFilters();
    }
});