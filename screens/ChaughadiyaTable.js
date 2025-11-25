import React, {useState, useEffect} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { dayChoghadiya, nightChoghadiya, choghadiyaColors } from './choghadiyaData';


const ChaughadiyaTable = ({ data }) => {
  //let choghadiyaData = data === 'day' ? dayChoghadiya : nightChoghadiya;
  const [choghadiyaData, setTableData] = useState(data);

  // Utility: Convert "06:00 AM" to Date object for comparison
const parseTime = (timeStr) => {
  const [hourMin, ampm] = timeStr.split(' ');
  let [hour, minute] = hourMin.split(':').map(Number);
  if (ampm === 'PM' && hour !== 12) {hour += 12;}
  if (ampm === 'AM' && hour === 12) {hour = 0;}
  return { hour, minute };
};

// Utility: Check if current time is between two slots
const isCurrentSlot = (current, start, end) => {
  const currentMinutes = current.getHours() * 60 + current.getMinutes();
  const startMinutes = start.hour * 60 + start.minute;
  const endMinutes = end.hour * 60 + end.minute;
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
};
const now = new Date();

  useEffect(() => {
    setTableData(data);
  }, [data]); // ✅ re-run when parent sends new data

  return (
    <ScrollView horizontal={true} style={styles.scrollContainer}>
      <ScrollView style={styles.scrollInner}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, styles.headerCell]}>Time</Text>
            <Text style={[styles.cell, styles.headerCell]}>Sun</Text>
            <Text style={[styles.cell, styles.headerCell]}>Mon</Text>
            <Text style={[styles.cell, styles.headerCell]}>Tue</Text>
            <Text style={[styles.cell, styles.headerCell]}>Wed</Text>
            <Text style={[styles.cell, styles.headerCell]}>Thu</Text>
            <Text style={[styles.cell, styles.headerCell]}>Fri</Text>
            <Text style={[styles.cell, styles.headerCell]}>Sat</Text>
          </View>

          {/* Data Rows */}
          {choghadiyaData.map((item, index) => {
            const isEvenRow = index % 2 === 0;

            const start = parseTime(item.time);
            const nextSlot = data[index + 1]
              ? parseTime(data[index + 1].time)
              : {hour: 18, minute: 0}; // fallback end time

            const active = isCurrentSlot(now, start, nextSlot);

            return (
              <View
                key={index}
                style={[
                  styles.row,
                  {backgroundColor: active
                    ? '#FF9933'
                    : isEvenRow
                      ? '#fdf6e3' :
                      '#fff',
                    }, // alternate color
                ]}>
                <Text style={styles.cell}>{item.time}</Text>
                <Text style={styles.cell}>{item.Sun}</Text>
                <Text style={styles.cell}>{item.Mon}</Text>
                <Text style={styles.cell}>{item.Tue}</Text>
                <Text style={styles.cell}>{item.Wed}</Text>
                <Text style={styles.cell}>{item.Thu}</Text>
                <Text style={styles.cell}>{item.Fri}</Text>
                <Text style={styles.cell}>{item.Sat}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const CELL_WIDTH = 75;

const styles = StyleSheet.create({
  horizontalScroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  verticalScroll: {
    flexGrow: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fafafa',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0e68c',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_WIDTH,
    height: CELL_WIDTH * 0.5,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 14,
  },
  timecell: {
    width: CELL_WIDTH + 30,
    height: CELL_WIDTH * 0.5,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 14,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ChaughadiyaTable;

