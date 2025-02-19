import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window');

const InfoCard = ({ title, description }) => {
    return (
        <View style={[styles.card, { height: height * 0.5 }]}>
            <Text style={styles.title}>{title}</Text>
            {/* -- Split description by new line character  */}
            {description.split('\n').map((line, index) => (
                <Text key={index} style={styles.description}>
                    {line}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      margin: 10,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
      justifyContent: 'center'
    },
    description: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
      justifyContent: 'left'
    },
  });
  export default InfoCard;