//import React from 'react';
import { alert } from 'react-native';
import { firebaseConfig } from './firebaseconfig';
import * as firebase from 'firebase';
import 'firebase/firestore';

export async function getCollectionAPI(tableRef, onBannerReceived) {
  var aBannerResult = [];
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  await firebase
    .firestore()
    .collection(tableRef)
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(item => {
        //const dataItem = item.data();
        //dataItem.id = item.id;
        // aBannerResult.push(dataItem.photo);
        aBannerResult.push(item.data());
      });
      //console.log('API COLL END:' + JSON.stringify(aBannerResult));
      onBannerReceived(aBannerResult);
      //console.log('API GetCollection END=' + tableRef);
    });
}

export async function getQueryAPI(tableRef, w1, w2, w3, onBannerReceived) {
  //console.log('API GETCOLL start=');
  var aBannerResult = [];
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  await firebase
    .firestore()
    .collection(tableRef)
    .where(w1, w2, w3)
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(item => {
        aBannerResult.push(item.data());
      });
      //console.log('API GETQUERYX:' + JSON.stringify(aBannerResult));
      onBannerReceived(aBannerResult);
      console.log('API GetQuery END=' + tableRef);
    });
}

//WORKING VERSION
export async function getStoredImageAPI(refTable, onImageReceived) {
  //console.log('TABLE' + refTable);
  //var aBannerResult = [];
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  var storageRef = firebase.storage().ref(refTable);

  await storageRef
    .listAll()
    .then(res => {
      var aBannerResult = [];
      res.items.forEach(imageRef => {
        imageRef
          .getDownloadURL()
          .then(uri => {
            //var aBannerResult = [];
            aBannerResult.push(uri);
            //console.log('API END:' + aBannerResult);
            onImageReceived(aBannerResult);
            //console.log('API GetStoredImage END=' + refTable);
            //onImageReceived(uri);
          })

          .catch(err => {
            alert('API ERROR' + err.code);
          });
      });
    })
    .catch(err => {
      alert('API ERROR' + err.code);
    });
}

export async function getQueryWithLimitAPI(
  tableRef,
  w1,
  w2,
  w3,
  wlimit,
  w4,
  onBannerReceived
) {
  console.log('API GETQUERYWITH LIMIT start=');
  var aBannerResult = [];
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  await firebase
    .firestore()
    .collection(tableRef)
    .where(w1, w2, w3)
    .orderBy(w4)
    .limit(wlimit)
    .get()
    .then(querySnapshot => {
      let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.docs.map(item => {
        aBannerResult.push(item.data());
      });

      onBannerReceived(aBannerResult, lastVisible);
      //console.log('API withLimit END=' + lastVisible);
      //console.log('API withLimit END=' + JSON.stringify(aBannerResult));
    });
}

export async function getQueryWithLimitLoadMoreAPI(
  tableRef,
  w1,
  w2,
  w3,
  wlimit,
  w4,
  lastVisible,
  onBannerReceived
) {
  console.log('API GETQUERYWITH LIMIT start=');
  var aBannerResult = [];
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  await firebase
    .firestore()
    .collection(tableRef)
    .where(w1, w2, w3)
    .orderBy(w4)
    .startAfter(lastVisible) //load more
    .limit(wlimit)
    .get()
    .then(querySnapshot => {
      //update last fetched data
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.docs.map(item => {
        aBannerResult.push(item.data());
      });

      onBannerReceived(aBannerResult, lastVisible);
      console.log('API withLimit MORE=');
    });
}

//----------------
export async function getWhereAPI(
  tableRef,
  searchstr,
  wlimit,
  w4,
  onBannerReceived
) {
  //console.log('API GETQUERYWITH LIMIT start=');
  var aBannerResult = [];
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //"'video_name', '>=', search).where('video_name', '<=', search+ '\uf8ff'";
  await firebase
    .firestore()
    .collection(tableRef)
    .where('keyword', 'array-contains', searchstr)
    .orderBy(w4)
    .limit(wlimit)
    .get()
    .then(querySnapshot => {
      let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.docs.map(item => {
        aBannerResult.push(item.data());
      });

      onBannerReceived(aBannerResult, lastVisible);
      //console.log('API withLimit END=' + lastVisible);
      //console.log('API withLimit END=' + JSON.stringify(aBannerResult));
    });
}

export async function getUserAPI(email, password, callback) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      //console.log(res.user.email);
      callback(res.user);
    })
    .catch(error => {
      callback(error);
    });
}

// export async function getImagesAPI(onBannerReceived) {
//   // console.log('API start');
//   var aBannerResult = [];
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
//   await firebase
//     .firestore()
//     .collection('banner')
//     .get()
//     .then(function(querySnapshot) {
//       querySnapshot.docs.map(function(item) {
//         const dataItem = item.data();
//         dataItem.id = item.id;
//         aBannerResult.push(dataItem.photo);
//       });
//       //console.log('API END:' + aBannerResult);
//       onBannerReceived(aBannerResult);
//     });
// }

//WORKING VERSION
// export async function getStoredImageAPI(refTable, onImageReceived) {
//   console.log('TABLE' + refTable);
//   var aBannerResult = [];
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }

//   var storageRef = firebase.storage().ref(refTable);

//   await storageRef
//     .listAll()
//     .then(res => {
//       res.items.forEach(imageRef => {
//         imageRef
//           .getDownloadURL()
//           .then(uri => {
//             aBannerResult.push(uri);
//             //console.log('API END:' + aBannerResult);
//             console.log('API END:');
//             onImageReceived(aBannerResult);
//             //nImageReceived(uri);
//           })

//           .catch(err => {
//             alert('API ERROR' + err.code);
//           });
//       });
//     })
//     .catch(err => {
//       alert('API ERROR' + err.code);
//     });
// }
