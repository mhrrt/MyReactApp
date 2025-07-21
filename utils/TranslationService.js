 export const languageOptions = [
    {label: 'English', value: 'en'},
    {label: 'हिंदी', value: 'hi'},
    {label: 'मराठी', value: 'mr'},
    {label: 'ગુજરાતી', value: 'gu'},
    {label: 'ಕನ್ನಡ', value: 'kn'},
    {label: 'తెలుగు', value: 'te'},
    {label: 'বাংলা', value: 'bn'},
    {label: 'Français', value: 'fr'},
    {label: 'Español', value: 'es'},
    // Add more as needed
  ];


export default class TranslationService {

  static async translate(text, lang) {
    try {
      const url = `https://ftapi.pythonanywhere.com/translate?dl=${lang}&text=${encodeURIComponent(text)}`;
      console.log('Language translation: URL', url.toString());
      const response = await fetch(url);
      const json = await response.json();
      console.log('Type of json:', typeof json);

      console.log(
        'Horoscope translation:',
        JSON.stringify(json, null, 2),
      );

      console.log('Json access using key::', json['destination-text']);
      // if(json.destination-text) // ❌ This won't work because of the dash
      if (json['destination-text']) {
        return json['destination-text'];
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      return null;
    }
  }
}
