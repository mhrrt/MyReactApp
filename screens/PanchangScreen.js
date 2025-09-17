import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {theme} from '../theme';
// import PanchangCard from '../panchangCard';
import PanchangCell from '../panchangCell';
// import { useNavigation } from '@react-navigation/native';
import ShareMe from '../utils/shareMe';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Use icons as needed


const {width} = Dimensions.get('window');
const cellSize = Math.floor(width / 15) - 2;

export default function PanchangScreen() {
  const viewRef = useRef();

  //return panchang cards from here
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.panchangView} ref={viewRef}>
          <PanchangCell />
        </View>
      </ScrollView>

        <TouchableOpacity
          style={styles.roundIconButton}
          onPress={() => ShareMe.shareViewAsImage(viewRef)}>
          <MaterialCommunityIcons
            name="share-variant-outline"
            size={20}
            color="#fff"
            style={styles.shareIcon}
          />
          {/* <Text style={styles.shareButtonText}>Panchang</Text> */}
        </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,// or your theme color
  },
  scrollContainer: {
    // flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
    backgroundColor: theme.colors.background,
  },
  panchangView: {
    padding: 0,
    backgroundColor: '#FFF5E1',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row', // 👈 Horizontal layout
    alignItems: 'center', // 👈 Vertically center items
    justifyContent: 'center',
    backgroundColor: '#ff9900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 0,
  },
  shareButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
   shareIcon: {
    // marginRight: 8, // 👈 Space between icon and text
    alignSelf: 'center',
    alignItems: 'center',
  },
  roundIconButton: {
    backgroundColor: '#FF9800',  // or any color you prefer
    borderRadius: 30,            // half of height/width to make it circular
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,                // adds shadow on Android
    shadowColor: '#000',         // adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 3,
    position: 'absolute',
    bottom:20,
    right:5,
  },
});
