import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import AlbumList from '../../components/AppAlbumList';
import CreatePlaylistModal from '../../components/Views/Playlists/CreatePlaylistModal';
import * as realm from '../../services/realm';

export default function Playlists() {
  const [albums, setAlbums] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  async function setupAlbums() {
    const albumsArray = await realm.getAlbumCollection();
    setAlbums(albumsArray);
  }

  useEffect(() => {
    realm.addCollectionListener('Album', setupAlbums);
  }, []);

  return (
    <View style={styles.playlists}>
      <View style={[styles.headerContainer, { flexDirection: 'column' }]}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headerTitle}>Suas Playlists</Text>
          <TouchableOpacity onPress={setupAlbums} style={{ padding: 5, paddingRight: 0 }}>
            <Ionicons name="ios-reload-circle" size={30} color="#ec73ff" />
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => setModalVisibility(true)}
            style={{ backgroundColor: 'gray', padding: 5 }}
          >
            <Text
              style={{
                color: 'black',
                fontFamily: 'Lato_700Bold',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              criar playlist
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AlbumList data={albums} />

      <CreatePlaylistModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </View>
  );
}
