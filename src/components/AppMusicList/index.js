import { FlatList, Keyboard } from 'react-native';
import MusicItem from '../AppMusicItem';

import styles from './styles';

const MusicList = ({ data }) => {
  return (
    <FlatList
      onScrollBeginDrag={Keyboard.dismiss}
      contentContainerStyle={styles.musicList}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <MusicItem item={item} />}
    />
  );
};

export default MusicList;
