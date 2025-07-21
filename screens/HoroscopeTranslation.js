import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';

import TranslationService, { languageOptions } from '../utils/TranslationService';
import {Picker} from '@react-native-picker/picker';

const HoroscopeTranslation = forwardRef(({ originalText}, ref) => {

    const [selectedLang, setSelectedLang] = useState('en');
    const [translatedText, setTranslatedText] = useState('');

    // State to handle loading indicator
    const [loading, setLoading] = useState(false);
    

  const onLangChange = async (lang) => {
    setSelectedLang(lang);
    console.log('#===PickerView Selected language updated to', lang);
    setLoading(true);
    const result = await TranslationService.translate(originalText, lang);
    if (result) {
      setTranslatedText(result);
    } else {
      setTranslatedText('Translation failed');
    }
    setLoading(false);
  };

   // expose translateTo function to parent who had implemented this, we will do this by using ref
   useImperativeHandle(ref, () => ( {
    triggerTranslation: (lang) => onLangChange(lang),
    getSelectedLang: () => selectedLang,
    }));

   return (
    <View style={styles.translationContainer}>
       {/* Pickerview for selecting language */}
            <Picker
              selectedValue={selectedLang}
              style={styles.picker}
              onValueChange={lang => onLangChange(lang)}>
              <Picker.Item label="Select Language" value="" />
              {languageOptions.map(item => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
      
            {/* Horoscope translation text will go here */}
            <View style={styles.translationContainer}>
               {loading ? (
                        <ActivityIndicator size="large" color="#f57c00"></ActivityIndicator>
                        ) :
                        <Text style={styles.horoscopeText}>{translatedText || originalText}</Text>
                    }
            </View> 
    </View>
  );
});

export default HoroscopeTranslation;

const styles = StyleSheet.create({
  translationContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  horoscopeText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'justify',
  },
  picker: {
    height: 60,
    width: '100%',
  },
});
