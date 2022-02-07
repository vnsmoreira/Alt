import { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import { downloadFile } from '../../modules/download';
import { PlayerContext } from '../../contexts/player';
import { formatTitle } from './utils';

const MusicItem = ({ item }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);

  const title = formatTitle(item);
  const id = item.id;

  const { player, playerState } = useContext(PlayerContext);

  const pressHandler = async () => {
    player.playMusic({
      id,
      title,
      author: item.author.name,
      thumbnailUri: item.bestThumbnail.url,
    });
  };

  const downloadHandler = async () => {
    await downloadFile(id, item.title, setDownloadProgress);
  };

  return (
    <View style={styles.musicItem}>
      <TouchableOpacity style={styles.presentationContainer} onPress={pressHandler}>
        <View style={styles.thumbnailContainer}>
          <Image style={styles.thumbnail} source={{ uri: item.bestThumbnail.url }} />
        </View>

        <View style={styles.aboutContainer}>
          <Text numberOfLines={1} style={styles.musicTitle}>
            {title}
          </Text>
          <View style={styles.musicInfo}>
            <Text style={styles.musicDuration}>{item.duration}</Text>
            <Text style={styles.musicAuthor}>{item.author.name}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* componentizar musicDownloadButton */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={downloadHandler}>
          <ProgressCircle
            percent={downloadProgress}
            radius={14}
            borderWidth={2}
            color="#ec73ff"
            shadowColor="#6a007a"
            bgColor="#141414"
          >
            {/* <AntDesign name="close" size={14} color="#ec73ff" /> */}
            <AntDesign name="arrowdown" size={14} color="#ec73ff" />
          </ProgressCircle>
        </TouchableOpacity>

        <SimpleLineIcons
          style={{ marginLeft: 20, marginRight: 10 }}
          name="options-vertical"
          size={14}
          color="gray"
        />
      </View>
    </View>
  );
};

export default MusicItem;
