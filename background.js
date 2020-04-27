'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({sort: 'customerReview'}, function() {
    console.log('Default sort is set to Avg. Customer Review');
  });
  chrome.storage.sync.set({order: {featured: 0, lowToHigh: 1, highToLow: 2, customerReview: 3, newestArrivals: 4}}, function() {
    console.log('Sort order dictionary');
  });
  chrome.storage.sync.set({sortOrderMap: {featured: 'relevanceblender', lowToHigh: 'price-asc-rank', highToLow: 'price-desc-rank', customerReview: 'review-rank', newestArrivals: 'date-desc-rank'}}, function () {
    console.log('Sort Order Map built')
  })
  chrome.storage.sync.set({primeOnlyEnabled: true}, function() {
    console.log(`primeOnly is set to true`);
  })
  chrome.storage.sync.set({extensionEnabled: true}, function() {
    console.log(`extensionEnabled is set to true`);
  })
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    chrome.tabs.executeScript(
        tabId,
        {file: 'content.js'},
        () => chrome.runtime.lastError);
});