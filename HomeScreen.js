// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import { theme } from './theme';
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

import RamPrashnavaliAnswer from './RamPrashnavaliAnswer';


// const tableData = Array.from({ length: 15 }, (_, row) =>
//   Array.from({ length: 15 }, (_, col) => `${row + 1},${col + 1}`)
// );

const { width } = Dimensions.get('window');
const cellSize = Math.floor(width / 15) - 2;

const titleText = 'राम शलाका प्रश्नावली गोस्वामी तुलसीदास क्रुत MTCorp®';
const descText ='#1 राम शलाका प्रश्नावली श्रीरामचरितमानस पर आधारित एक भविष्यफल जानने की विधि है।';

const tableSize = 15; // 15x15 table

const gridLetters = [
  'सु','प्र','उ','बि','हो','मु','ग','ब','सु','नु','बि','घ','धि','इ','द',
  'र','रु','फ','सि','सि','रहिं','बस','हि','मं','ल','न','ल','य','न','अं',
  'सुज','सो','ग','सु','कु','म','स','ग','त','न','ई','ल','धा','बे','नो',
  'त्य','र','न','कु','जो','म','रि','र','र','अ','की','हो','सं','रा','य',
  'पु','सु','थ','सी','जे','इ','ग','म','सं','क','रे','हो','स','स','नि',
  'त','र','त','र','स','हूँ','ह','ब','ब','प','चि','स','हिं','स','तु',
  'म','का','ा','र','र','म','मि','मी','म्हा','ा','जा','हू','हीं','ा','ा',
  'ता','रा','रे','री','हृ','का','फ','खा','जू','ई','र','रा','पू','द','ल',
  'नि','को','जो','गो','न','मु','जि','यँ','ने','मनि','क','ज','प','स','ल',
  'हि','रा','मि',' स','रि','ग','द','न्मु','ख','म','खि','जि','म','त','जं',
  'सिं','ख','नु','न','कौ','मि','निज','र्क','ग','धु','ध','सु','का','स','र',
  'गु','ब','म','अ','रि','नि','म','ल','ा','न','ढँ','ती','न','क','भ',
  'ना','पु','व','अ','ा','र','ल','ा','ए','तु','र','न','नु','वै','थ',
  'सि','हूँ','सु','म्ह','रा','र','स','स','र','त','न','ख','ा','ज','ा',
  'र','ा','ा','ला','धी','ा','री','ा','हू','हीं','खा','जू','ई','रा','रे',

];

const answerList = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //As there are Nine chopai only which will be used as result

// Convert flatData into a 2D array based on numColumns
const tableData = [];
for (let i = 0; i < gridLetters.length; i += tableSize) {
  tableData.push(gridLetters.slice(i, i + tableSize));
}

const getMessageForCell = (index) => {
  const messageIndex = index % answerList.length;
  return answerList[messageIndex];
};

const getChopaiIndexForCell = (index) => {
  const messageIndex = index % answerList.length;
  // console.log(messageIndex);
  // Alert.alert(
  //     'Alert Title',
  //     'My Alert Msg index at homescreen is:'+ messageIndex, // <- this part is optional, you can pass an empty string
  //     [
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ],
  //     {cancelable: false},
  //   );
  return messageIndex;
};

const getChopaiViewForCell = (index) => {
  const chopaiIndex = index % chopaiViewList.length;
  return chopaiViewList[chopaiIndex];
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState('');
  // const [chopaiMessage, setChopaiMessage] = useState('');
  const [showChopaiAtIndex, setshowChopaiAtIndex] = useState(null);

  const handleCellPress = (cell, index) => {
    setSelectedCell(cell);
    // setChopaiMessage(getChopaiViewForCell(index));
    const selectedindex =  getChopaiIndexForCell(index);
    setshowChopaiAtIndex(selectedindex);
    setModalVisible(true);
  };

   // Replace TestIds.BANNER with your actual Ad Unit ID
  //  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5854957597162003/5424363862';

  return (
    <View style={styles.container}>
      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => {
            const cellIndex = rowIndex * 15 + colIndex;
            return (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={[styles.cell, { width: cellSize, height: cellSize }]}
                onPress={() => handleCellPress(cell, cellIndex)}
              >
                <Text style={styles.cellText}>{cell}</Text>
              </TouchableOpacity>
            );
          })}
          {/* Google AdMob Banner */}
          {/* <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true, // GDPR compliance
            }}
          /> */}
        </View>
      ))}
      <Modal
        transparent={false}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
       <Pressable style={styles.pressableOverlay} onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.modalText}>Cell: {selectedCell}</Text> */}
            {/* <Text style={styles.modalMessage}>{chopaiMessage}</Text> */}
            {/* Dynamically Render Component */}
            {/* {chopaiMessage} */}
      
            {showChopaiAtIndex !== null && <RamPrashnavaliAnswer chopaiIndex={showChopaiAtIndex} />}

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingTop: 20
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: theme.colors.secondary,
  },
  cellText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: theme.fontSize.small,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: Dimensions.get('window') * 0.8
  },
  pressableOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  modalText: {
    fontSize: theme.fontSize.large,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  }
});