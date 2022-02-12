import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { baseURL, downloadEndpoint } from '../../services/apis/index';

const directoryPath = FileSystem.documentDirectory + 'Alt/';

const ensureDirectoryExists = async () => {
  const directory = await FileSystem.getInfoAsync(directoryPath);
  const { exists } = directory;

  if (!exists) await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
};

const permissionAlert = () => {
  Alert.alert('Permission Required', 'This app needs to read/write audio files!', [
    { text: 'Allow', onPress: async () => await getPermissions() },
    { text: 'Cancel', onPress: () => permissionAlert() },
  ]);
};

const getPermissions = async () => {
  const { granted, canAskAgain } = await MediaLibrary.getPermissionsAsync();

  if (!granted && canAskAgain) {
    const { canAskAgain, granted } = await MediaLibrary.requestPermissionsAsync(false);

    if (!granted && canAskAgain) {
      permissionAlert();
    }
  }
};

const saveFile = async (fileUri, setDownloaded) => {
  try {
    await getPermissions();

    const asset = await MediaLibrary.createAssetAsync(fileUri);
    let album = await MediaLibrary.getAlbumAsync('Alt');

    if (album == null) {
      await MediaLibrary.createAlbumAsync('Alt', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    const rootAlbum = await MediaLibrary.getAlbumAsync('Alt');
    const { assets } = await MediaLibrary.getAssetsAsync({ album: rootAlbum, mediaType: 'audio' });
    const currentAsset = assets.find(assetItem => assetItem.filename == asset.filename);

    setDownloaded(true);
    return { saved: true, audioLocalUri: currentAsset.uri };
  } catch (error) {
    console.log(error);
    setDownloaded(false);
    return { saved: false, audioLocalUri: '' };
  }
};

const updateProgress = (progressEvent, setProgress) => {
  const total = progressEvent.totalBytesExpectedToWrite;
  const loaded = progressEvent.totalBytesWritten;
  const percentage = parseInt((loaded / total) * 100);

  setProgress(percentage);
};

export const downloadFile = async (id, setProgress, setDownloaded) => {
  const fileUri = `${directoryPath}${id}.m4a`;
  const remoteUrl = baseURL + downloadEndpoint + id;

  try {
    await ensureDirectoryExists();

    const downloadResumable = FileSystem.createDownloadResumable(remoteUrl, fileUri, {}, progress =>
      updateProgress(progress, setProgress)
    );

    const { uri } = await downloadResumable.downloadAsync();
    const isSaved = await saveFile(uri, setDownloaded);

    return isSaved;
  } catch (error) {
    console.log(error);
  }
};
