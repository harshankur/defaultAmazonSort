// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeSort = document.getElementById('changeSort');
let sortDictionary;

chrome.storage.sync.get('order', function(data) {
    sortDictionary = data.order;
    chrome.storage.sync.get('sort', function(data) {
        changeSort.getElementsByTagName('option')[sortDictionary[data.sort]].selected = 'selected';
    });
})

changeSort.addEventListener('change', function() {
    chrome.storage.sync.set({sort: changeSort.options[changeSort.selectedIndex].value}, function() {
        console.log(`Default sort order changed to ${changeSort.options[changeSort.selectedIndex].value}`);
    })
})