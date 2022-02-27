import * as FileSystem from 'expo-file-system';
import { baseURL, downloadEndpoint } from '../../services/apis/index';

const directoryPath = FileSystem.documentDirectory + 'Alt/';

const ensureDirectoryExists = async () => {
  const directory = await FileSystem.getInfoAsync(directoryPath);
  const { exists } = directory;

  if (!exists) await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
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

    setDownloaded(true);
    return { saved: true, audioLocalUri: uri };
  } catch (error) {
    return { saved: false, audioLocalUri: '' };
  }
};

export const deleteFile = async uri => {
  try {
    await FileSystem.deleteAsync(uri,{});

    return { deleted: true };
  } catch (error) {
    return { deleted: false };
  }
};
