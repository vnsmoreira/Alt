import Realm from 'realm';
import AudioSchema from '../schemas/AudioSchema';

export default function getRealm() {
  return Realm.open({
    schema: [AudioSchema],
    deleteRealmIfMigrationNeeded: true,
  });
}

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

export const onAudioCollectionUpdate = async callback => {
  const realm = await getRealm();
  const audioCollection = realm.objects('Audio');

  audioCollection.addListener((audios, changes) => {
    callback(audios, changes);
  });
};
