import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import 'react-native-get-random-values';

import App from './src/App';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => require('./src/services/trackplayer'));
