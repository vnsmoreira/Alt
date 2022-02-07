import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { downloadMusic } from '../../services/apis/downloadMusic';
import { formatTitle } from '../../utils';

const directoryPath = FileSystem.cacheDirectory + 'Alt/';

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

export const downloadFile = async (id, title, setProgress) => {
  const outputTitle = formatTitle(title);
  const fileUri = `${directoryPath}${outputTitle}.m4a`;

  await ensureDirectoryExists();

  /* tentar criar sem o axios, usando downlaod resumable */
  try {
    const audio = await downloadMusic(id, setProgress);

    await FileSystem.writeAsStringAsync(fileUri, Buffer.from(audio, 'binary').toString('base64'), {
      encoding: FileSystem.EncodingType.Base64,
    });

    await saveFile(fileUri);
  } catch (error) {
    console.log(error);
  }
};
