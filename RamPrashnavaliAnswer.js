import React from 'react';
import { View, Text, Alert, Dimensions, ScrollView } from 'react-native';
import styles from './AnswerStyles'; // Importing the styles

const screenHeight = Dimensions.get('window').height; // Get device height
const modalHeight = screenHeight * 0.8; // 80% of screen height

const chopai1 = {
  title: "Ram Prashnavali Answer #1 Chaupai from BalKand",
  resultHindi: "उत्तर प्रश्न बहुत उत्तम है। कार्य सिद्ध होगा।",
  chopaiHindi:"चौपाई: सुनु सिय सत्य असीस हमारी। पूजिहि मन कामना तुम्हारी॥",
  interpritionHindi: " हे सीता! हमारी सच्ची आसीस सुनो, तुम्हारी मनःकामना पूरी होगी। नारद का वचन सदा पवित्र (संशय, भ्रम आदि दोषों से रहित) और सत्य है। जिसमें तुम्हारा मन अनुरक्त हो गया है, वही वर तुमको मिलेगा।",
  resultEngligh:"Answer: The question of the questioner is good; the work will be successful.",
  chopaiEng:"Chaupai: Sunu Siy Saty Asees Hamaaree, Poojihi Man Kaamana Tumhaaree.",
  interpritionEng:"Hey Sita! Listen to our true blessings; your wishes will be fulfilled. Narad’s word is always pure (free from defects like doubt, confusion, etc.) and accurate. You will get the same boon to which your mind is attached."
}

const chopai2 = {
  title: "Ram Prashnavali Answer #2 Chaupai from Sunderkand",
  resultHindi: "उत्तर: भगवान श्री राम का स्मरण करते हुए अपना काम शुरू करें, सफलता मिलेगी।",
  chopaiHindi:"चौपाई: प्रबिसि नगर कीजे सब काजा। हृदयँ राखि कौसलपुर राजा॥",
  interpritionHindi: "  अयोध्यापुरी के राजा श्री रघुनाथजी को हृदय में रखे हुए नगर में प्रवेश करके सब काम कीजिए। उसके लिए विष अमृत हो जाता है, शत्रु मित्रता करने लगते हैं, समुद्र गाय के खुर के बराबर हो जाता है, अग्नि में शीतलता आ जाती है।",
  resultEngligh:"Chaupai: Prabisi Nagar Kije Sab Kaaja. Keeping his heart the king of Kausalya.",
  chopaiEng:"Chaupai: Sunu Siy Saty Asees Hamaaree, Poojihi Man Kaamana Tumhaaree.",
  interpritionEng:"Do all the work after entering the city, keeping the king of Ayodhyapuri Shri Raghunathji in your heart. For him, poison becomes nectar, enemies become friends, the ocean becomes equal to a cow’s hoof, and fire becomes cool.॥1॥"
}

const chopai3 = {
  title: "Ram Prashnavali Answer #3 Chaupai from Balkand",
  resultHindi: "उत्तर : भगवान श्री राम के अनुसार कार्य में असफलता के योग हैं।",
  chopaiHindi:"चौपाई: उघरहिं अंत न होइ निबाहू। कालनेमि जिमि रावन राहू॥",
  interpritionHindi: "बहुरूपिए भी यदि साधु का वेष बना लें तो संसार उनके वेष के प्रभाव से उनकी वंदना करता है, परन्तु एक न एक दिन उनकी प्रकृति सामने आ ही जाती है. उनका कपट सदा के लिए छिप सकता जैसे कालनेमि, रावण और राहु का सत्य सामने आ ही गया।",
  resultEngligh:"Answer: According to Lord Shri Ram, there are chances of failure in work.",
  chopaiEng:"Chaupai: Ugharhin End Na Hoi Nibahu. Kalnemi Jimmy Ravana Rahu॥",
  interpritionEng:"Even if the impersonators disguise themselves as saints, the world worships them due to the influence of their disguise, but one day or the other, their nature comes to the fore. Their deceit could have remained hidden forever just as the truth about Kalnemi, Ravana, and Rahu came to light.॥3॥"
}

const chopai4 = {
  title: "Ram Prashnavali Answer #4 Chaupai from Balkand",
  resultHindi: "उत्तर : उन लोगों को छोड़ दें जो आपके काम पर बुरा प्रभाव डालते हैं। कार्य पूर्ण होने में संदेह है।",
  chopaiHindi:"चौपाई: बिधि बस सुजन कुसंगत परहीं। फनि मनि सम निज गुण अनुसरहिं॥",
  interpritionHindi: "दुष्ट भी सत्संगति पाकर सुधर जाते हैं, जैसे पारस के स्पर्श से लोहा सुहावना हो जाता है (सुंदर सोना बन जाता है), किन्तु दैवयोग से यदि कभी सज्जन कुसंगति में पड़ जाते हैं, तो वे वहाँ भी साँप की मणि के समान अपने गुणों का ही अनुसरण करते हैं। (अर्थात्‌ जिस प्रकार साँप का संसर्ग पाकर भी मणि उसके विष को ग्रहण नहीं करती तथा अपने सहज गुण प्रकाश को नहीं छोड़ती, उसी प्रकार साधु पुरुष दुष्टों के संग में रहकर भी दूसरों को प्रकाश ही देते हैं, दुष्टों का उन पर कोई प्रभाव नहीं पड़ता।)।।",
  resultEngligh:"Answer: Leave people who have a bad influence on your work. There is doubt in the completion of the work.",
  chopaiEng:"Chaupai: Bidhi is just on Sujan Kusangat. Fani Mani Sam Nij Guna Anusarahi ॥",
  interpritionEng:"Even the wicked get reformed after getting good company, like iron becomes beautiful by the touch of Paras (beautiful becomes gold), but if, due to chance, the good people fall into bad company, they also lose their qualities like a snake’s gem. Only follow. (That is, just as a gem does not take its poison even after coming in contact with a snake and does not give up its innate quality of light, in the same way, a saintly person gives light to others even while being in the company of the wicked, the wicked do not affect them. ॥4॥"
}

const chopai5 = {
  title: "Ram Prashnavali Answer #5 Chaupai from Balkand",
  resultHindi: "उत्तर : कार्य के सफल होने में संदेह है इसलिए इसे प्रभु श्री राम पर छोड़ देना ही बेहतर है।",
  chopaiHindi:"चौपाई: होइहि सोइ जो राम रचि राखा। को करि तर्क बढ़ावै साखा॥",
  interpritionHindi: " जो कुछ राम ने रच रखा है, वही होगा। तर्क करके कौन शाखा (विस्तार) बढ़ावे। (मन में) ऐसा कहकर शिव भगवान हरि का नाम जपने लगे और सती वहाँ गईं जहाँ सुख के धाम प्रभु राम थे।।",
  resultEngligh:"Answer: There is doubt about the work’s success, so it is better to leave it to lord Shri Ram.",
  chopaiEng:"Chaupai: Hoi Hi Soee Jo Raam Rachi Raakha. Ko Kari Tark Badhaavai Saakha.",
  interpritionEng:"Whatever Ram has created, that will happen. Who will increase the branch (expansion) by reasoning? Saying this (in mind), Shiva started chanting the name of Lord Hari, and Sati went to the place where Lord Ram was the abode of happiness. ॥5॥"
}
const chopai6 = {
  title: "Ram Prashnavali Answer #6 Chaupai from Balkand",
  resultHindi: "उत्तर : सवाल बढ़िया है. कार्य सिद्ध होगा।",
  chopaiHindi:"चौपाई: मुद मंगलमय संत समाजु। जो जग जंगम तीरथराजू॥",
  interpritionHindi: " संतों का समाज आनंद और कल्याणमय है, जो जगत में चलता-फिरता तीर्थराज (प्रयाग) है। जहां (उस संत समाज रूपी प्रयागराज में) राम भक्ति रूपी गंगाजी की धारा है और ब्रह्मविचार का प्रचार सरस्वतीजी हैं।।",
  resultEngligh:"Answer: Great question. The work will be successful.",
  chopaiEng:"Chaupai: Mud Mangalamay Sant Samaaju. Jo Jag Jangam Teeratharaajoo॥",
  interpritionEng:"The society of saints is blissful and welfare, which is the Tirtharaj (Prayag) walking in the world. Where (in Prayagraj in the form of a saintly society) there is a stream of Gangaji in the form of Ram’s devotion, and Saraswatiji is the propagator of Brahma thought.॥6॥"
}

const chopai7 = {
  title: "Ram Prashnavali Answer #7 Chaupai from Sunderkand",
  resultHindi: "उत्तर : प्रश्न अद्भुत है. आपका काम सफल होगा।",
  chopaiHindi:"चौपाई: गरल सुधा रिपु करहिं मिताई। गोपद सिंधु अनल सितलाई॥",
  interpritionHindi: " (जो प्रभु श्री राम को ह्रदय में धारण करते हैं) उसके लिए विष अमृत हो जाता है, शत्रु मित्रता करने लगते हैं, समुद्र गाय के खुर के बराबर हो जाता है, अग्नि में शीतलता आ जाती है।।",
  resultEngligh:"Answer: The question is wonderful. Your work will be successful.",
  chopaiEng:"Chaupai: Garal Sudha Ripu Karahin Mitaee. Gopad Sindhu Enal Sitalaee॥",
  interpritionEng:"(One who holds Lord Shri Ram in his heart) For him poison becomes nectar, enemies become friends, the ocean becomes equal to the hoof of a cow, the fire becomes cool.॥7॥"
}

const chopai8 = {
  title: "Ram Prashnavali Answer #8 Chaupai from LankaKand",
  resultHindi: "उत्तर : कार्य पूर्ण होने में संदेह है।",
  chopaiHindi:"चौपाई: बरुन कुबेर सुरेस समीरा। रन सन्मुख धरि काहूँ न धीरा॥",
  interpritionHindi: " वरुण, कुबेर, इंद्र और वायु, इनमें से किसी ने भी रण में तुम्हारे सामने धैर्य धारण नहीं किया (अर्थात सामना न कर सके )।।",
  resultEngligh:"Answer: There is doubt in sucess of the work.",
  chopaiEng:"Chaupai: Barun kuber sures sameera. ran sanmukh dhari kaahoon na dheera॥",
  interpritionEng:"Varun, Kuber, Indra and Vayu, none of them could withstand you in battle.॥8॥"
}

const chopai9 = {
  title: "Ram Prashnavali Answer #9 Chaupai from BalKand",
  resultHindi: "उत्तर : प्रश्न बहुत श्रेष्ठ है। कार्य सफल होगा।",
  chopaiHindi:"चौपाई: सुफल मनोरथ होहूँ तुम्हारे। रामु लखनु सुनि भए सुखारे॥",
  interpritionHindi: " फूल पाकर मुनि ने पूजा की। फिर दोनों भाइयों को आशीर्वाद दिया कि तुम्हारे मनोरथ सफल हों। यह सुनकर राम-लक्ष्मण सुखी हुए।।",
  resultEngligh:"Answer: The question is very good. The work will be accomplished.",
  chopaiEng:"Chaupai: Suphal manorath hohoon tumhaare. raamu lakhanu suni bhe sukhaare॥",
  interpritionEng:"Muni worshiped after getting the flower. Then, he blessed both the brothers that their wishes may be successful. Ram-Laxman was happy to hear this.॥9॥"
}

const chopaiList = [
  chopai1,
  chopai2,
  chopai3,
  chopai4,
  chopai5,
  chopai6,
  chopai7,
  chopai8,
  chopai9
];

// const chopaiIndex 
export default function RamPrashnavaliAnswer({ chopaiIndex }) {
  // Alert.alert(
  //   'Alert Title',
  //   'Alert index at RamPrashnavali is:'+ chopaiIndex, // <- this part is optional, you can pass an empty string
  //   [
  //     {text: 'OK', onPress: () => console.log('OK Pressed')},
  //   ],
  //   {cancelable: false},
  // );
  if (chopaiIndex === null || chopaiIndex === undefined) return null;
  const selectedChopai = chopaiList[chopaiIndex];
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} 
        nestedScrollEnabled={true} scrollEnabled={true} 
        showsVerticalScrollIndicator={true} 
        keyboardShouldPersistTaps="handled"
        onScroll={(event) => console.log('Scrolling...', event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        >
      {/* Header */}
      <View style={styles.header} onStartShouldSetResponder={() => true}>
        <Text style={styles.title}>{selectedChopai.title}</Text>
      </View>

      {/* Entry Content */}
      <View style={styles.entryContent} onStartShouldSetResponder={() => true}>
        <Text style={styles.highlight}>{selectedChopai.resultHindi}</Text>

        <Text style={styles.chaupai}>{selectedChopai.chopaiHindi}</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>अर्थ:</Text> {selectedChopai.interpritionHindi}
        </Text>

        <Text style={styles.translation}>English Translation</Text>

        <Text style={styles.highlight}>{selectedChopai.resultEngligh}
        </Text>

        <Text style={styles.chaupai}>{selectedChopai.chopaiEng}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Meaning:</Text> {selectedChopai.interpritionEng}
        </Text>
      </View>
      </ScrollView>
    </View>
  );
}
