import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import * as realm from '../../services/realm';

export default function Playlist({ route }) {
  const { id: albumId, name } = route.params;

  const [audioList, setAudioList] = useState([]);

  async function setupPlaylist() {
    const [album, audioCollection] = await Promise.all([
      realm.getAlbum(albumId),
      realm.getAudioCollection(),
    ]);

    const audiosIdsList = album.audioList;
    const _audioList = [];

    audiosIdsList.forEach(id => {
      const audioObject = audioCollection.find(audio => audio.id == id);
      
      audioObject && _audioList.push(audioObject);
    });

    setAudioList(_audioList);
  }

  useEffect(() => {
    setupPlaylist();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      {audioList.map(audio => {
        return <Text style={{ color: 'white', fontSize: 20 }}>{audio.id}</Text>;
      })}
    </View>
  );
}
