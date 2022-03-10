import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: '#141414',
  },
  actionSheetWrapper: {
    width: '94%',
    height: 200,

    marginHorizontal: '3%',

    backgroundColor: '#141414',
  },
  actionItem: {
    marginBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    marginLeft: 10,

    color: 'white',
    fontSize: 20,
    fontFamily: 'Lato_400Regular',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default styles;
