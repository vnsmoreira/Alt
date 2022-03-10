import { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import {
  AntDesign,
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import { downloadFile, deleteFile } from '../../modules/download';
import { PlayerContext } from '../../contexts/player';
import { baseURL, downloadEndpoint } from '../../services/apis/index.js';
import * as realm from '../../services/realm';
import { SheetManager } from 'react-native-actions-sheet';
import BlinkingAnimation from '../AppBlinkingAnimation';

const MusicItem = ({ item, index, queue, updateMusicItem }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [audioUri, setAudioUri] = useState('');
  const { player, playing, loading, currentAudioId, currentAudioInfo } = useContext(PlayerContext);

  const { id, title, duration, author, thumbnailUri } = item;

  const isAudioSelected = currentAudioId == id;
  const isAudioLoading = isAudioSelected && loading;
  const isAudioPlaying = isAudioSelected && playing;

  const setAudioDownloaded = () => {
    setIsDownloaded(true);
    setDownloadProgress(100);
  };

  const setAudioNotDownloaded = () => {
    setIsDownloaded(false);
    setDownloadProgress(0);
  };

  async function getAudioUri() {
    const remoteUri = baseURL + downloadEndpoint + id;
    let localUri = '';

    const audio = await realm.getAudio(id);
    if (audio) localUri = audio.uri;

    return localUri ? localUri : remoteUri;
  }

  async function setupAudioUri(audio, changes) {
    try {
      const uri = await getAudioUri();
      setAudioUri(uri);

      if (changes) {
        changes.deleted ? setAudioNotDownloaded() : setAudioDownloaded();

        updateMusicItem && updateMusicItem(id, { ...item, uri: uri });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setupAudioListener() {
    try {
      const audio = await realm.getAudio(id);

      if (audio) {
        realm.addObjectListener('Audio', id, setupAudioUri);
      } else {
        await setupAudioUri();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setupAudioListener();
  }, []);

  const titleStyle = isAudioPlaying ? '#ec73ff' : isAudioSelected ? '#6a007a' : 'white';

  const getAudioInfo = (item, uri) => ({ ...item, uri });

  const handlePlayAudio = async () => {
    const thisMusicIsPlaying = currentAudioId == id;
    const uriHasChanged = currentAudioInfo.url != audioUri;

    if (thisMusicIsPlaying && !uriHasChanged) {
      playing ? player.jumpTo(0) : player.play();
    } else {
      player.reset();
      player.load(queue, index);
    }
  };

  const handleDownloadAudio = async () => {
    if (isDownloaded || isDownloading) return;

    try {
      setIsDownloading(true);
      const { saved, audioLocalUri } = await downloadFile(id, setDownloadProgress, setIsDownloaded);

      if (saved) {
        const audioInfo = getAudioInfo(item, audioLocalUri);

        await realm.saveAudio(audioInfo);
        realm.addObjectListener('Audio', id, setupAudioUri);
        setIsDownloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAudio = async () => {
    try {
      const { deleted } = await deleteFile(audioUri);

      deleted && (await realm.deleteAudio(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenOptions = () => {
    const actionSheetConfig = {
      actions: [
        {
          title: 'deletar audio',
          icon: (size, color) => <MaterialCommunityIcons name="delete" size={size} color={color} />,
          callback: () => handleDeleteAudio(),
        },
        {
          title: 'editar audio',
          icon: (size, color) => <MaterialIcons name="edit" size={size} color={color} />,
          callback: () => {},
        },
      ],
    };

    SheetManager.show('app-actionsheet', actionSheetConfig);
  };

  return (
    <View style={styles.musicItem}>
      <TouchableOpacity style={styles.presentationContainer} onPress={handlePlayAudio}>
        <View style={styles.thumbnailContainer}>
          <Image style={styles.thumbnail} source={{ uri: thumbnailUri }} />
        </View>

        <View style={styles.aboutContainer}>
          {isAudioLoading ? (
            <BlinkingAnimation duration={300} style={{ width: 180, heigth: 60 }}>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.musicTitle,
                  ...{ color: titleStyle },
                }}
              >
                {title}
              </Text>
            </BlinkingAnimation>
          ) : (
            <Text
              numberOfLines={1}
              style={{
                ...styles.musicTitle,
                ...{ color: titleStyle },
              }}
            >
              {title}
            </Text>
          )}

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
        <TouchableOpacity onPress={handleOpenOptions}>
          <SimpleLineIcons
            style={{ marginLeft: 20, marginRight: 10 }}
            name="options-vertical"
            size={14}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicItem;
