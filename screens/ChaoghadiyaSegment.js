import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ChaughadiyaTable from './ChaughadiyaTable';
import { dayChoghadiya, nightChoghadiya, choghadiyaColors } from './choghadiyaData';

const ChaoghadiyaSegment = () => {
  const [selectedTab, setSelectedTab] = useState('day'); // 'day' or 'night'

  return (
    <View style={styles.container}>
      {/* Segment Control */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedTab === 'day' && styles.activeSegment,
          ]}
          onPress={() => setSelectedTab('day')}
        >
          <Text
            style={[
              styles.segmentText,
              selectedTab === 'day' && styles.activeText,
            ]}
          >
           Din ka Chaughadiya
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedTab === 'night' && styles.activeSegment,
          ]}
          onPress={() => setSelectedTab('night')}
        >
          <Text
            style={[
              styles.segmentText,
              selectedTab === 'night' && styles.activeText,
            ]}
          >
            Raat ka Chaughadiya
          </Text>
        </TouchableOpacity>
      </View>

      {/* Table Below */}
     <ChaughadiyaTable
     key={selectedTab}
  data={selectedTab === 'day' ? dayChoghadiya : nightChoghadiya}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffef9',
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f0e0a0',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9e9b8',
  },
  activeSegment: {
    backgroundColor: '#f8d775',
  },
  segmentText: {
    color: '#6b4f1d',
    fontWeight: '500',
  },
  activeText: {
    fontWeight: '700',
    color: '#3e2723',
  },
});

export default ChaoghadiyaSegment;
