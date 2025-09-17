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
import { useColorScheme } from 'react-native';

const HoroscopeTranslation = forwardRef(({ originalText}, ref) => {

    const [selectedLang, setSelectedLang] = useState('en');
    const [translatedText, setTranslatedText] = useState('');

    // State to handle loading indicator
    const [loading, setLoading] = useState(false);
    
  const scheme = useColorScheme(); // returns 'light' or 'dark'
  const textStyles = getStyles(scheme); // generate themed styles
  console.log('schem and text are::', scheme, textStyles);

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
                        <Text style={textStyles.horoscopeTextByTheme}>{translatedText || originalText}</Text>
                    }
            </View> 
    </View>
  );
});

const getStyles = (scheme) =>
  StyleSheet.create({
    horoscopeTextByTheme: {
      fontSize: 14,
      color: scheme === 'dark' ? '#FFFFFF' : '#4a0505a0',
      // add other shared styles here
    textAlign: 'justify',
    margin: 5,
    },
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
    color: '#000000',
  },
  picker: {
    height: 60,
    width: '100%',
  },
});
