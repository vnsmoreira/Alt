import { FlatList, Keyboard } from 'react-native';
import AlbumItem from '../AppAlbumItem';
import styles from './styles';

const AlbumList = ({ data, setData }) => {
  return (
    <FlatList
      style={{ height: '100%', width: '100%' }}
      onScrollBeginDrag={Keyboard.dismiss}
      contentContainerStyle={{ paddingBottom: 120 }}
      data={data}
      keyExtractor={(album, index) => index}
      renderItem={({ item: album, index }) => (
        <AlbumItem id={album.id} name={album.name} audioList={album.audioList} />
      )}
    />
  );
};

export default AlbumList;
