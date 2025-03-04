import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from './theme';

const HelpScreen = () => {
    return (
        <ScrollView style={styles.container}>
          {/* English Section */}
          <Text style={styles.title}>🔹 How to Use Ram Salaka</Text>
          {renderBulletPoint("Focus on Your Question", "Think about your question with a clear mind and devotion.")}
          {renderBulletPoint("Tap to Select a Random Grid", "Tap anywhere on the Ram Salaka grid to get a random selection.")}
          {renderBulletPoint("Read the Verse (Chaupai)", "The selected chaupai (verse) from Ramcharitmanas will be displayed.")}
          {renderBulletPoint("Interpret the Answer", "The verse provides guidance based on your query. You can seek help from a learned person for a deeper meaning.")}
    
          {/* Hindi Section */}
          <Text style={styles.title}>🔹 राम सलाका का उपयोग कैसे करें</Text>
          {renderBulletPoint("अपने प्रश्न पर ध्यान केंद्रित करें", "अपने मन को शांत रखकर और भक्ति भाव से प्रश्न के बारे में सोचें।")}
          {renderBulletPoint("यादृच्छिक ग्रिड चुनने के लिए टैप करें", "राम सलाका ग्रिड पर कहीं भी टैप करें।")}
          {renderBulletPoint("चौपाई पढ़ें", "चुनी गई चौपाई (रामचरितमानस की पंक्ति) स्क्रीन पर प्रदर्शित होगी।")}
          {renderBulletPoint("उत्तर की व्याख्या करें", "चौपाई आपके प्रश्न के अनुसार मार्गदर्शन देती है। अधिक गहराई से समझने के लिए किसी विद्वान की सहायता लें।")}
        </ScrollView>
      );
  };

  // Helper function to render bullet points
const renderBulletPoint = (title, description) => (
    <View style={styles.bulletContainer}>
      <Text style={styles.bullet}>{"\u2022"}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );

  // Common Stylesheet
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background // "#F9F9F9", // Light background for elegance
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    bulletContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    bullet: {
      fontSize: 18,
      color: "#555",
      marginRight: 8,
    },
    textContainer: {
      flex: 1,
    },
    boldText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#222",
    },
    description: {
      fontSize: 16,
      color: "#444",
    },
  });
  
  export default HelpScreen;
