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
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
