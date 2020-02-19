import APIKey from '../constants/apikey';
import Axios from 'axios';

export async function getAutoCompleteAXIOS(searchKey, callback) {
  let baseUrl =
    'http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=' +
    searchKey +
    ' KARAOKE';

  //var listStr = '';
  let aList = [];
  let aFinalList = [];
  await Axios.get(baseUrl)
    .then(response => {
      //callback(response.data);
      aList = response.data.toString().split(',');
      //callback(aList);
      aList.map(data => {
        aFinalList.push({ keyfind: data });
      });
      callback(aFinalList);
      //console.log('AXIOS=' + JSON.stringify(aFinalList));
    })
    .catch(error => {
      console.log('AXIOS ERROR=' + error);
    });
}

export async function getYTSearchAXIOS(searchkey, yttoken, callback) {
  let maxRes = 10;
  let baseUrl = '';
  if (yttoken.trim() == '') {
    baseUrl =
      'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' +
      maxRes +
      '&order=viewCount&q=' +
      searchkey +
      '&key=' +
      APIKey.youtube_key;
  } else {
    baseUrl =
      'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' +
      maxRes +
      '&order=viewCount&q=' +
      searchkey +
      '&pageToken=' +
      yttoken +
      '&key=' +
      APIKey.youtube_key;
  }

  //let baseUrl = 'https://www.googleapis.com/youtube/v3/search?';

  // const params = {
  //   q: searchkey,
  //   key: APIKey.youtube_key,
  //   maxResults: 5,
  //   part: 'snippet',
  //   order: 'viewCount'
  // };

  //"nextPageToken"

  console.log('base url=' + baseUrl);
  await Axios.get(baseUrl).then(response => {
    callback(response.data);
    //console.log('AXIOS=' + JSON.stringify(response.data));
  });
  // .catch(error => {
  //   console.log('AXIOS ERROR' + error);
  // });
}
