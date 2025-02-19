// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Modal, Pressable } from 'react-native';
import { theme } from './theme';
import { InfoCard } from './InfoCard';

// Generate 15x15 array
const tableData = Array.from({ length: 15 }, (_, row) =>
  Array.from({ length: 15 }, (_, col) => `${row + 1},${col + 1}`)
);

const titleText = 'राम शलाका प्रश्नावली गोस्वामी तुलसीदास क्रुत MTCorp®';
const descText ='#1 राम शलाका प्रश्नावली श्रीरामचरितमानस पर आधारित एक भविष्यफल जानने की विधि है। इसमें एक 15x15 अक्षरों का ग्रिड होता है जिसमें श्रीरामचरितमानस के दोहे और चौपाइयों के अक्षर होते हैं। \n #2 व्यक्ति मन में प्रश्न सोचकर किसी भी एक अक्षर पर उंगली रखता है और एक विशेष विधि से तीन अक्षरों को जोड़कर एक चौपाई प्राप्त होती है। यह चौपाई उस प्रश्न का उत्तर होती है और व्यक्ति के भविष्य या समस्या का संकेत देती है।\n #3 यह विधि गोस्वामी तुलसीदास जी की रामभक्ति परंपरा से जुड़ी हुई है और इसे श्रद्धा और विश्वास के साथ अपनाया जाता है।'

const randomMessages = [
  'Message 1',
  'Message 2',
  'Message 3',
  'Message 4',
  'Message 5',
  'Message 6',
  'Message 7',
  'Message 8',
  'Message 9'
];

const getMessageForCell = (index) => {
  const messageIndex = index % randomMessages.length;
  return randomMessages[messageIndex];
};

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState('');
  const [randomMessage, setRandomMessage] = useState('');

  const handleCellPress = (cell, index) => {
    setSelectedCell(cell);
    setRandomMessage(getMessageForCell(index));
    setModalVisible(true);
  };

  const { width } = Dimensions.get('window');
  const cellSize = Math.floor(width / 15) - 2; // Adjust cell size to fit screen

  return (
    <View style={styles.container}>
      {/* <InfoCard 
          heading={titleText}
          description={descText}
        /> */}
        <Text style={styles.heading}>{titleText}</Text>
        <Text style={styles.description}>{descText}</Text>
      {/* Render table */}
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
        </View>
      ))}

      {/* Modal for displaying cell info */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
       <Pressable style={styles.pressableOverlay} onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Cell: {selectedCell}</Text>
            <Text style={styles.modalMessage}>{randomMessage}</Text>
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
    backgroundColor: 'transparent'
  },
  pressableOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 250,
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