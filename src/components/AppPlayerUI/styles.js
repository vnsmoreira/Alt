import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  player: {
    width: '98%',
    height: 60,

    marginHorizontal: '1%',
    borderRadius: 5,

    backgroundColor: '#212121',

    position: 'absolute',
    bottom: 60,
    left: 0,

    overflow: 'hidden',
  },
  playerWrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: '#6a007a',
  },
  progress: {
    width: '0%',
    height: '100%',
    backgroundColor: '#ec73ff',
  },
  thumbnailContainer: {
    width: 60,
    height: 60,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 45,
    height: 45,

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

    marginLeft: 5,

    color: 'white',

    fontFamily: 'Lato_700Bold',
  },
  musicInfo: {
    margin: 0,

    flexDirection: 'row',
    alignItems: 'center',
  },
  musicAuthor: {
    marginLeft: 5,

    color: 'rgb(180,180,180)',

    fontSize: 13,
    fontFamily: 'Lato_400Regular',
  },
  actions: {
    flex: 1,
    height: '100%',

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  playIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  pauseIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  loopIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default styles;
