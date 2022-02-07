import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { formatTitle } from '../../utils';

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

const saveFile = async fileUri => {
  try {
    await getPermissions();

    const asset = await MediaLibrary.createAssetAsync(fileUri);
    let album = await MediaLibrary.getAlbumAsync('Alt');

    if (album == null) {
      await MediaLibrary.createAlbumAsync('Alt', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProgress = (progressEvent, setProgress) => {
  const total = progressEvent.totalBytesExpectedToWrite;
  const loaded = progressEvent.totalBytesWritten;
  const percentage = parseInt((loaded / total) * 100);

  setProgress(percentage);
};

export const downloadFile = async (id, title, setProgress) => {
  const outputTitle = formatTitle(title);
  const fileUri = `${directoryPath}${outputTitle}.m4a`;
  const baseURL = `http://192.168.15.127:3000/download/`;

  await ensureDirectoryExists();

  const downloadResumable = FileSystem.createDownloadResumable(
    baseURL + id,
    fileUri,
    {},
    progress => updateProgress(progress, setProgress)
  );

  try {
    const { uri } = await downloadResumable.downloadAsync();
    await saveFile(uri);
  } catch (error) {
    console.log(error);
  }
};
