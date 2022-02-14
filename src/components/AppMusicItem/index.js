import { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { AntDesign, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import { downloadFile } from '../../modules/download';
import { PlayerContext } from '../../contexts/player';
import { baseURL, downloadEndpoint } from '../../services/apis/index.js';
import * as realm from '../../services/realm';

const MusicItem = ({ item }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(downloadProgress != 0);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isPlayAudioFunctionBeingExecuted, setIsPlayAudioFunctionBeingExecuted] = useState(false);
  const [audioUri, setAudioUri] = useState('');
  const { player, loaded, loading, playing, currentAudioId } = useContext(PlayerContext);

  const id = item.id;
  const title = item.title;
  const duration = item.duration;
  const author = item.author;
  const thumbnailUri = item.thumbnailUri;

  const isAudioSelected = currentAudioId == id;
  const isAudioLoading = isAudioSelected && loading;
  const isAudioPlaying = isAudioSelected && playing;

  async function setupAudioUri() {
    const remoteUri = baseURL + downloadEndpoint + item.id;
    let localUri = '';

    try {
      const audio = await realm.getAudio(item.id);

      if (audio) {
        localUri = audio.uri;
        setIsDownloaded(true);
      }

      localUri ? setAudioUri(localUri) : setAudioUri(remoteUri);
    } catch (error) {
      console.log('Error while getting storage status');
    }
  }

  useEffect(() => {
    realm.onAudioCollectionUpdate(setupAudioUri, id);
  }, []);

  const titleStyle = isAudioPlaying ? '#ec73ff' : isAudioSelected ? '#6a007a' : 'white';

  const getAudioInfo = (item, uri) => {
    const info = {
      id,
      title: title,
      duration: item.duration,
      author: item.author,
      thumbnailUri: item.thumbnailUri,
      uri,
    };

    return JSON.parse(JSON.stringify(info));
  };

  const handlePlayAudio = async () => {
    if (isPlayAudioFunctionBeingExecuted) return;

    setIsPlayAudioFunctionBeingExecuted(true);
    const audioInfo = getAudioInfo(item, audioUri);

    if (loaded) {
      if (isAudioSelected) {
        await player.replayAudio();
      } else {
        await player.unloadAudio();
        await player.loadAudio(audioInfo);
        await player.playAudio();
      }
    } else {
      await player.loadAudio(audioInfo);
      await player.playAudio();
    }

    setIsPlayAudioFunctionBeingExecuted(false);
  };

  const handleDownloadAudio = async () => {
    if (isDownloaded || isDownloading) return;

    try {
      const { saved, audioLocalUri } = await downloadFile(id, setDownloadProgress, setIsDownloaded);

      if (saved) {
        const audioInfo = getAudioInfo(item, audioLocalUri);

        await realm.saveAudio(audioInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAudio = async () => {};

  return (
    <View style={styles.musicItem}>
      <TouchableOpacity style={styles.presentationContainer} onPress={handlePlayAudio}>
        <View style={styles.thumbnailContainer}>
          <Image style={styles.thumbnail} source={{ uri: thumbnailUri }} />
        </View>

        <View style={styles.aboutContainer}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.musicTitle,
              ...{ color: titleStyle },
            }}
          >
            {title}
          </Text>
          <View style={styles.musicInfo}>
            <Text style={styles.musicDuration}>{duration}</Text>
            <Text numberOfLines={1} style={styles.musicAuthor}>
              {author}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={handleDownloadAudio}>
          <ProgressCircle
            percent={downloadProgress}
            radius={14}
            borderWidth={2}
            color="#ec73ff"
            shadowColor={isDownloaded ? '#ec73ff' : '#6a007a'}
            bgColor="#141414"
          >
            {isDownloaded ? (
              <MaterialIcons name="file-download-done" size={14} color="#ec73ff" />
            ) : isDownloading ? (
              <AntDesign name="close" size={14} color="#ec73ff" />
            ) : (
              <AntDesign name="arrowdown" size={14} color="#ec73ff" />
            )}
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
