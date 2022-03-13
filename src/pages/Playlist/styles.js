import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

    backgroundColor: '#141414',
  },
  headerContainer: {
    width: '94%',

    marginTop: 70,
    marginHorizontal: '3%',
    marginBottom: 40,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    marginBottom: 10,

    color: 'white',

    fontSize: 30,
    fontFamily: 'Lato_700Bold',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default styles;
