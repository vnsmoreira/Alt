import { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import MusicList from '../../components/AppMusicList';
import * as realm from '../../services/realm';

export default function Playlists() {
  const [audios, setAudios] = useState([]);

  async function updateAudios() {
    const audios = await realm.getAudioCollection();
    setAudios(audios);
  }

  useEffect(() => {
    realm.onAudioCollectionUpdate(updateAudios);
  }, []);

  return (
    <View style={styles.playlists}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Suas Playlists</Text>
        <TouchableOpacity onPress={updateAudios} style={{ padding: 5 }}>
          <Ionicons name="ios-reload-circle" size={30} color="#ec73ff" />
        </TouchableOpacity>
      </View>

      <MusicList data={audios} />
    </View>
  );
}
