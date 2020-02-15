import React from 'react';
import Axios from 'axios';

export async function getAutoCompleteAXIOS(searchKey, callback) {
  let baseUrl =
    'http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=' +
    searchKey;

  //var listStr = '';
  let aList = [];
  let aFinalList = [];
  await Axios.get(baseUrl).then(response => {
    callback(response.data);
    aList = response.data.toString().split(',');
    //callback(aList);
    aList.map(data => {
      aFinalList.push({ keyfind: data });
    });
    callback(aFinalList);
    //console.log('AXIOS=' + JSON.stringify(aFinalList));
  });
}
