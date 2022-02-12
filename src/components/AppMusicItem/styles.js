import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  musicItem: {
    width: '94%',
    height: 60,

    marginHorizontal: '3%',
    paddingVertical: 5,

    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  presentationContainer: {
    flexDirection: 'row',
  },
  thumbnailContainer: {
    width: 60,
    height: 60,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,

    borderRadius: 5,
  },
  aboutContainer: {
    width: 180,
    height: 60,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  musicTitle: {
    width: '100%',

    marginLeft: 10,

    color: 'white',

    fontFamily: 'Lato_700Bold',
  },
  musicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
  },
  musicAuthor: {
    marginLeft: 5,

    color: 'rgb(180,180,180)',

    fontSize: 13,
    fontFamily: 'Lato_400Regular',
  },
  musicDuration: {
    marginTop: 2,
    marginLeft: 10,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 2,

    color: '#141414',
    backgroundColor: 'gray',

    fontSize: 10,
    fontFamily: 'Lato_700Bold',
  },
  optionsContainer: {
    height: 60,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default styles;
