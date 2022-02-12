import { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { StorageContext } from '../../contexts/storage';
import MusicList from '../../components/AppMusicList';
export default function Playlists() {
  const [audios, setAudios] = useState([]);
  const AsyncStorage = useContext(StorageContext);

  const updateAudios = async () => {
    const storedAudios = await AsyncStorage.storage;
    const audiosArray = storedAudios ? Object.values(storedAudios) : [];
    setAudios(audiosArray);
  };

  useEffect(async () => {
    await updateAudios();
    /* const rootAlbum = await MediaLibrary.getAlbumAsync('Alt');
    const { assets } = await MediaLibrary.getAssetsAsync({ album: rootAlbum, mediaType: 'audio' }); */
  }, [AsyncStorage.storage]);

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
