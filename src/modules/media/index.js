import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

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

export const saveFile = async (fileUri, setDownloaded) => {
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
