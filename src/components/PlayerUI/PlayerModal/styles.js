import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  playerModal: {},
  playerContainer: {
    width: '100%',
    height: '100%',
  },
  backgroundWrapper: {
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  playerWrapper: {
    width: '90%',
    height: '100%',

    marginTop: 20,
    marginHorizontal: '5%',
    position: 'relative',
  },
  playerHeader: {
    width: '90%',
    height: 60,

    marginHorizontal: '5%',
    marginTop: 10,
  },
  playerThumbnails: {
    width: '100%',

    marginTop: 20,
    marginTop: '10%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  currentTrackThumbnail: {
    width: '90%',
    aspectRatio: 1,

    marginBottom: 40,
  },
  aboutContainer: {
    width: '90%',
    height: 60,

    marginBottom: 10,

    marginHorizontal: '5%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  musicTitle: {
    width: '100%',

    color: 'white',
    fontSize: 25,
    fontFamily: 'Lato_700Bold',
  },
  musicAuthor: {
    color: 'rgb(180,180,180)',

    fontSize: 18,
    fontFamily: 'Lato_700Bold',
  },
  seekBarContainer: {
    width: '90%',

    marginHorizontal: '5%',

    alignItems: 'center',
  },
  controls: {
    width: '90%',
    marginHorizontal: '5%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    bottom: 35,
  },
  mainControls: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
