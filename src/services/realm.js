import Realm from 'realm';
import AudioSchema from '../schemas/AudioSchema';
import AlbumSchema from '../schemas/AlbumSchema';

const getRealm = () => {
  return Realm.open({
    schema: [AudioSchema, AlbumSchema],
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

export const deleteAlbum = async id => {
  const realm = await getRealm();
  const album = realm.objectForPrimaryKey('Album', id);

  realm.write(() => {
    realm.delete(album);
  });
};

export const createAlbum = async album => {
  const realm = await getRealm();
  const id = new Realm.BSON.UUID();

  realm.write(() => {
    realm.create('Album', { ...album, id });
  });
};

export const getAlbum = async id => {
  const realm = await getRealm();

  const albumId = new Realm.BSON.UUID(id);
  const album = realm.objectForPrimaryKey('Album', albumId);

  return album;
};

export const getAlbumCollection = async () => {
  const realm = await getRealm();
  const albumCollection = realm.objects('Album');

  return albumCollection;
};

export const deleteAlbumCollection = async () => {
  const realm = await getRealm();
  const albumCollection = realm.objects('Album');

  realm.write(() => {
    realm.delete(albumCollection);
  });
};

/**
 * Setup a listener to be called on a selected collection changes.
 * @param {string} collectionName The collection name to listen for changes.
 * @param {function} onChangesCallback  The callback to be called on changes.
 */
export const addCollectionListener = async (collectionName, onChangesCallback) => {
  const realm = await getRealm();
  const collection = realm.objects(collectionName);

  const handleOnChanges = (audios, changes) => onChangesCallback(audios, changes);
  collection.addListener(handleOnChanges);
};

/**
 * Setup a listener to be called on a specific object change.
 * @param {string} objectType The object type name.
 * @param {string} id The object id to be checked for changes.
 * @param {function} callback  The callback to be called on changes.
 */
export const addObjectListener = async (objectType, objectId, onChangesCallback) => {
  const realm = await getRealm();
  const audio = realm.objectForPrimaryKey(objectType, objectId);

  if (!audio) return;

  const handleOnChanges = (audio, changes) => onChangesCallback(audio, changes);
  audio.addListener(handleOnChanges);
};
