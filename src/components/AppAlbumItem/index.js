import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SheetManager } from 'react-native-actions-sheet';
import * as realm from '../../services/realm';

const AlbumItem = ({ id, name, audioList = [] }) => {
  const numberOfMusicsOnAlbum = audioList.length;

  const handleDeleteAlbum = async () => {
    await realm.deleteAlbum(id);
  };

  const handleOpenOptions = () => {
    const actionSheetConfig = {
      actions: [
        {
          title: 'deletar album',
          icon: (size, color) => <MaterialCommunityIcons name="delete" size={size} color={color} />,
          callback: () => handleDeleteAlbum(),
        },
      ],
    };

    SheetManager.show('app-actionsheet', actionSheetConfig);
  };

  return (
    <View style={styles.musicItem}>
      <TouchableOpacity style={styles.presentationContainer}>
        <View style={styles.thumbnailContainer}>
          <FontAwesome name="folder" size={40} color="gray" />
        </View>

        <View style={styles.aboutContainer}>
          <Text numberOfLines={1} style={{ ...styles.musicTitle }}>
            {name}
          </Text>

          <View style={styles.musicInfo}>
            <Text style={styles.musicDuration}>{numberOfMusicsOnAlbum} Musicas</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={handleOpenOptions}>
          <SimpleLineIcons style={{ padding: 20 }} name="options-vertical" size={14} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlbumItem;
