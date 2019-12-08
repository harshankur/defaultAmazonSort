// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
        {file: 'content.js'});
});