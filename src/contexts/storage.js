import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageContext = createContext({});

export const StorageProvider = props => {
  const [storage, setStorage] = useState({});
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  useEffect(async () => {
    const localStorage = (await getItem('local-storage')) || {};

    if (!isStorageLoaded) {
      setStorage(localStorage);
      setIsStorageLoaded(true);
    } else {
      await setItem('local-storage', storage);
    }
  }, [storage]);

  const setItem = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@${key}`, jsonValue);

      return { saved: true };
    } catch (e) {
      return { saved: false };
    }
  };

  const getItem = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const cleanStorage = async () => {
    setStorage({});
  };

  const checkAudio = async id => {
    if (storage[id]) {
      return { exists: true };
    } else {
      return { exists: false };
    }
  };

  const saveAudio = async (id, audioInfo) => {
    setStorage(storage => {
      let audioObject = {};
      audioObject[id] = audioInfo;

      return { ...storage, ...audioObject };
    });
  };
  const removeAudio = async id => {
    let storageRef = storage;
    delete storageRef[id];

    setStorage(storageRef);
  };

  return (
    <StorageContext.Provider value={{ saveAudio, removeAudio, checkAudio, cleanStorage, storage }}>
      {props.children}
    </StorageContext.Provider>
  );
};
