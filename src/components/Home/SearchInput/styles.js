import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',

    width: '100%',
    height: 45,

    borderRadius: 4,

    color: '#5c5c5c',
    backgroundColor: 'white',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,

    width: '100%',
    height: '100%',

    color: '#3d3d3d',

    fontSize: 16,
    fontFamily: 'Lato_700Bold',
    fontWeight: 'bold',
  },
});

export default styles;
