import Realm from 'realm';
import AudioSchema from '../schemas/AudioSchema';

const getRealm = () => {
  return Realm.open({
    schema: [AudioSchema],
    deleteRealmIfMigrationNeeded: true,
  });
};

export const deleteAudio = async id => {
  const realm = await getRealm();
  const audio = realm.objectForPrimaryKey('Audio', id);

  realm.write(() => {
    realm.delete(audio);
  });
};

export const saveAudio = async audio => {
  const realm = await getRealm();

  realm.write(() => {
    realm.create('Audio', audio);
  });
};

export const getAudio = async id => {
  const realm = await getRealm();
  const audio = realm.objectForPrimaryKey('Audio', id);

  return audio;
};

export const deleteAudioCollection = async () => {
  const realm = await getRealm();
  const audioCollection = realm.objects('Audio');

  realm.write(() => {
    realm.delete(audioCollection);
  });
};

export const getAudioCollection = async () => {
  const realm = await getRealm();
  const audioCollection = realm.objects('Audio');

  return audioCollection;
};

/**
 * Setup a listener to be called on audio collection changes.
 * @param {function} callback  The callback to be called on changes.
 */
export const onAudioCollectionUpdate = async callback => {
  const realm = await getRealm();
  const audioCollection = realm.objects('Audio');

  const onUpdate = (audios, changes) => callback(audios, changes);
  audioCollection.addListener(onUpdate);
};

/**
 * Setup a listener to be called on a specific audio change.
 * @param {function} callback  The callback to be called on changes.
 * @param {string} id The object id to be checked for changes.
 */
export const onAudioObjectUpdate = async (callback, id) => {
  const realm = await getRealm();
  const audio = realm.objectForPrimaryKey('Audio', id);

  if (!audio) return;

  const onUpdate = (audios, changes) => callback(audios, changes);
  audio.addListener(onUpdate);
};
