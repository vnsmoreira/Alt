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

const getUpdatedObjectsId = (audios, changes) => {
  let updatedObjectsIndex = [];
  let updatedObjectsId = [];

  const deleted = changes.deletions;
  const inserted = changes.insertions;
  const modificated = changes.modifications;

  updatedObjectsIndex.push(...deleted, ...inserted, ...modificated);

  updatedObjectsId = updatedObjectsIndex.map(index => audios[index].id);

  return updatedObjectsId;
};

export const onAudioCollectionUpdate = async (callback, id) => {
  const realm = await getRealm();
  const audioCollection = realm.objects('Audio');

  audioCollection.addListener((audios, changes) => {
    if (!id) {
      callback(audios, changes);
    } else {
      const updatedObjectsId = getUpdatedObjectsId(audios, changes);
      const firstRunning = updatedObjectsId.length == 0;
      const isCurrentObjectBeingChanged = updatedObjectsId.find(objectId => objectId == id);

      (isCurrentObjectBeingChanged || firstRunning) && callback(audios, changes);
    }
  });
};
