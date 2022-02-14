import * as FileSystem from 'expo-file-system';
import { baseURL, downloadEndpoint } from '../../services/apis/index';
import { saveFile } from '../media';

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
    const isSaved = await saveFile(uri, setDownloaded);

    return isSaved;
  } catch (error) {
    console.log(error);
  }
};
