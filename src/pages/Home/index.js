import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { getMusics } from '../../services/apis/searchMusics';

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
      let musics = await getMusics(search);
      setMusicList(musics);
      setIsLoadingSearch(false);
    } catch (error) {
      setMusicList([]);
    }
  };

  /* search delay */
  useEffect(() => {
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
