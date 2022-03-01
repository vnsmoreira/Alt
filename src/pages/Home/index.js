import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { getMusics } from '../../services/apis/searchMusics';
import * as realm from '../../services/realm';
import { convertToPlaylist } from '../../contexts/player/utils';

/* components */
import SearchInput from '../../components/Home/SearchInput';
import AppLoadingSpinner from '../../components/AppLoadingSpinner';
import MusicList from '../../components/AppMusicList';

export default function Home() {
  /* search */
  const [search, setSearch] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);
  const [musicList, setMusicList] = useState(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);

  const updateMusics = async () => {
    setIsLoadingSearch(true);
    try {
      const [musics, downloadedAudios] = await Promise.all([
        getMusics(search),
        realm.getAudioCollection(),
      ]);

      const playlist = convertToPlaylist(musics, downloadedAudios);

      setMusicList(playlist);
      setIsLoadingSearch(false);
    } catch (error) {
      setMusicList([]);
    }
  };

  /* search delay */
  useEffect(() => {
    realm.onAudioCollectionUpdate(updateMusics);
    clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => updateMusics(), 250));
  }, [search]);

  return (
    <View style={styles.home}>
      <View style={styles.headerContainer}>
        <Text style={styles.searchInputLabel}>Pesquisar</Text>
        <SearchInput search={search} setSearch={setSearch} />
      </View>

      {isLoadingSearch ? <AppLoadingSpinner color="purple" /> : <MusicList data={musicList} />}
    </View>
  );
}
