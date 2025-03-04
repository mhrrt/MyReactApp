import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    height: Dimensions.get('window').height * 0.8
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20, // Space for close button
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  entryContent: {
    marginBottom: 20,
  },
  highlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F', // Red highlight
    marginBottom: 10,
  },
  chaupai: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#4CAF50', // Green for emphasis
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
  },
  translation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2', // Blue
    marginBottom: 5,
    textAlign: 'center'
  },
});
