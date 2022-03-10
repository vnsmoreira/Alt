import { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Modal, TextInput, Keyboard } from 'react-native';
import styles from './styles';
import * as realm from '../../../../services/realm';
import { MaterialIcons } from '@expo/vector-icons';

const CreatePlaylistModal = ({ modalVisibility, setModalVisibility }) => {
  const [playlistName, setPlaylistName] = useState('');
  const inputRef = useRef(null);

  const handleCreateAlbum = () => {
    realm.createAlbum({ name: playlistName, audioList: [] });
    setPlaylistName('');
    setModalVisibility(false);
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  });

  return (
    <Modal
      statusBarTranslucent
      onRequestClose={() => setModalVisibility(false)}
      visible={modalVisibility}
      animationType="slide"
      style={{ backgroundColor: 'red' }}
    >
      <View style={{ width: '100%', height: '100%', backgroundColor: '#141414' }}>
        <View
          style={{
            width: '90%',
            height: '100%',
            marginHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextInput
            ref={inputRef}
            selectionColor="purple"
            style={{
              flexDirection: 'row',
              flex: 1,
              height: 40,

              borderBottomWidth: 2,
              borderBottomColor: '#ccc',

              color: 'white',

              fontSize: 16,
              fontFamily: 'Lato_700Bold',
              fontWeight: 'bold',
            }}
            placeholder="Nome da playlist"
            placeholderTextColor="#ccca"
            autoCorrect={false}
            value={playlistName}
            onChangeText={setPlaylistName}
          />
          <View style={{ width: 40 }}>
            <TouchableOpacity
              onPress={handleCreateAlbum}
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#aaa',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
              }}
            >
              <MaterialIcons name="navigate-next" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePlaylistModal;
