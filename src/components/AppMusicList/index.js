import { FlatList, Keyboard } from 'react-native';
import MusicItem from '../AppMusicItem';

import styles from './styles';

const MusicList = ({ data, setData }) => {
  const updateMusicItem = (id, music) => {
    setData(data => {
      const dataRef = data;

      const index = dataRef.findIndex(item => item.id == id);
      dataRef[index] = music;

      return dataRef;
    });
  };

  return (
    <FlatList
      onScrollBeginDrag={Keyboard.dismiss}
      contentContainerStyle={styles.musicList}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <MusicItem
          item={item}
          index={index}
          queue={data}
          updateMusicItem={setData ? updateMusicItem : null}
        />
      )}
    />
  );
};

export default MusicList;
