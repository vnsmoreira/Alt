import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

const MusicActionSheet = () => {
  const [musicId, setMusicId] = useState('');
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [actions, setActions] = useState({});

  const closeActionSheet = () => SheetManager.hide('music-options');

  const setupActionSheet = ({ id, isDownloaded, actions }) => {
    setMusicId(id);
    setIsDownloaded(isDownloaded);
    setActions(actions);
  };

  const onClose = () => {
    setMusicId('');
    setIsDownloaded(false);
    setActions({});
  };

  const handleDeleteAudio = () => {
    actions.delete && actions.delete();

    closeActionSheet();
  };

  return (
    <ActionSheet
      id="music-options"
      gestureEnabled={true}
      containerStyle={{ backgroundColor: '#141414' }}
      onBeforeShow={setupActionSheet}
      onClose={onClose}
    >
      <View style={{ height: 200, backgroundColor: '#141414' }}>
        <TouchableOpacity onPress={handleDeleteAudio}>
          <Text style={{ color: 'white', fontSize: 30 }}>delete audio</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default MusicActionSheet;
