import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

import { SearchBar } from 'react-native-elements';

import { getAutoCompleteAXIOS } from '../api/axiosapi';

const YTSearch = () => {
  const [searchText, setsearchText] = useState('');
  const [aKey, setaKey] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item'
    }
  ];

  const _updateSearch = searchText => {
    setsearchText(searchText);
    if (!searchText.trim() == '') {
      console.log('SEARCH=' + searchText);
      _getAutoComplete(searchText);
    }
  };

  const _getAutoComplete = searchKey => {
    //reset
    getAutoCompleteAXIOS(searchKey, callback => {
      setaKey([]);
      callback.forEach((element, i) => {
        setaKey(prevArray => [...prevArray, { title: element.keyfind, id: i }]);
      });
    });

    console.log('DATAC=' + JSON.stringify(aKey));
  };

  function Item({ title }) {
    return (
      <View style={o_style.item}>
        <Text style={o_style.title}>{title}</Text>
      </View>
    );
  }

  useEffect(() => {
    _getAutoComplete();
    setisLoading(true);
    console.log('USE-EFFECT');
  }, []);

  if (!isLoading) {
    console.log('LOADING FALSE');
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  } else {
    console.log('LOADING TRUE');
    return (
      <SafeAreaView style={o_style.container}>
        <SearchBar
          placeholder="Search Here"
          onChangeText={_updateSearch}
          value={searchText}
          //lightTheme={true}
        />
        <FlatList
          data={aKey}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
};

export default YTSearch;

const o_style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'blue'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
