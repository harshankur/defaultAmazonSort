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

changeSort.onclick = function(element) {
  // let color = element.target.value;
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.executeScript(
  //       tabs[0].id,
  //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
  // });
};
