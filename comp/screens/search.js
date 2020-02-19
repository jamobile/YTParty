import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';

import { SearchBar } from 'react-native-elements';

import { getAutoCompleteAXIOS, getYTSearchAXIOS } from '../api/axiosapi';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CardItem from './carditem';

const YTSearch = () => {
  const [searchText, setsearchText] = useState('');
  const [aKey, setaKey] = useState([]);
  const [aVideos, setaVideos] = useState([]);
  const [renderYT, setrenderYT] = useState(false); //flatlist items what to render
  //const [sbarref, setsbarref] = useState();
  const [yttoken, setyttoken] = useState('');
  const [isrefreshing, setisrefreshing] = useState(false);

  //setisrefreshing(false);
  const _loadMoreYT = () => {
    if (renderYT) {
      console.log('LOAD MORE RT...' + renderYT);
      console.log('LOAD MORE...' + isrefreshing);
      setisrefreshing(true);
      _searchYT(searchText);
    }
  };

  const _searchYT = search => {
    console.log('SEARCHING YT...');

    getYTSearchAXIOS(search, yttoken, callback => {
      //console.log('CALLBACK-YT SEARCH');
      //console.log('TOKEN=' + callback.nextPageToken);
      setyttoken(callback.nextPageToken); //save the returned nextPageToken
      callback.items.forEach((item, i) => {
        setaVideos(prevArray => [
          ...prevArray,
          {
            youtubeid: item.id.videoId,
            id: i,
            name: item.snippet.title,
            avatar: item.snippet.thumbnails.default.url,
            artist: '',
            vtype: 'KARAOKE',
            title: item.snippet.title
          }
        ]);
        setisrefreshing(false);
        //console.log('ITEM2=' + JSON.stringify(item));
        //console.log('YT DATA RESULT=' + JSON.stringify(aVideos));
        setrenderYT(true); //flatlist indicator to render the YT data
      });
    });
  };

  const _setSearch = search => {
    setsearchText(search); //update the search bar with the autocomplete key
    //sbarref.focus();
    console.log('CLICK=' + search);
    _searchYT(search); // once autocomplete is selected - start searchYT
  };

  const _clearSearch = () => {
    setsearchText('');
    setaKey([]);
    setaVideos([]);
  };

  const _updateSearch = searchText => {
    setsearchText(searchText);
    if (!searchText.trim() == '') {
      console.log('SEARCH=' + searchText);
      _getAutoComplete(searchText);
    }
  };

  const _getAutoComplete = searchKey => {
    getAutoCompleteAXIOS(searchKey, callback => {
      setaKey([]);
      callback.forEach((element, i) => {
        setaKey(prevArray => [...prevArray, { title: element.keyfind, id: i }]);
        //console.log('CALLBACK-AUTOCOMPLETE');
      });
      //console.log('AUTOCOMPLETE DATA RESULT=' + JSON.stringify(aKey));
      setrenderYT(false); //flatlist indicator to render the YT data
      setisrefreshing(false);
    });
  };

  const _renderList = itemdata => {
    //console.log('RENDER=' + JSON.stringify(itemdata));
    if (!renderYT) {
      return (
        <TouchableOpacity
          onPress={() => {
            _setSearch(itemdata.title); //this needs to be an ARROW function to call the _setSearch()
          }}
        >
          <View style={o_style.item}>
            <Text style={o_style.title}>{itemdata.title}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <CardItem
          video_name={
            itemdata.name + ' | ' + itemdata.vtype + ' | ' + itemdata.artist
          }
          imguri={itemdata.avatar}
          onSelect={() => {
            //_playYT(itemdata.youtubeid);
            console.log('CLICK YT=' + itemdata.youtubeid);
          }}
        />
      );
    }
  };

  //   useEffect(()=>{

  //   })
  // doesnt need useEffect here as we're not running any function on component mount
  //   useEffect(() => {
  //     //_getAutoComplete();
  //     //_updateSearch(searchText);
  //     setisLoading(true);
  //     console.log('USE-EFFECT');
  //   }, []);

  //   if (!isLoading) {
  //     console.log('LOADING FALSE');
  //     return (
  //       <View>
  //         <ActivityIndicator />
  //       </View>
  //     );
  //   } else {

  //console.log('LOADING TRUE');
  return (
    <SafeAreaView style={o_style.container}>
      <SearchBar
        //ref={searchref => setsbarref(searchref)}
        placeholder="Search Here"
        onChangeText={_updateSearch}
        value={searchText}
        onClear={_clearSearch}
        returnKeyType="search"
        onSubmitEditing={() => {
          _searchYT(searchText);
        }}
      />
      <FlatList
        data={renderYT ? aVideos : aKey}
        renderItem={({ item }) => _renderList(item)}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
        onEndReached={_loadMoreYT}
        oneEndReachedThreshold={0.5}
        refreshing={isrefreshing}
      />
    </SafeAreaView>
  );
};
// };

export default YTSearch;

const o_style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
    //backgroundColor: 'blue'
  },
  item: {
    //backgroundColor: '#f9c2ff',
    padding: 1,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 14
  }
});
