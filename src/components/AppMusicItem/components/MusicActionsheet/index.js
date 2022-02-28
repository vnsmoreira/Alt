import { useState } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

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

  const handleEditAudio = () => {
    actions.edit && actions.edit();

    closeActionSheet();
  };

  return (
    <ActionSheet
      id="music-options"
      gestureEnabled={true}
      containerStyle={styles.actionSheetContainer}
      onBeforeShow={setupActionSheet}
      onClose={onClose}
    >
      <View style={styles.actionSheetWrapper}>
        <TouchableOpacity onPress={handleDeleteAudio} style={styles.actionItem}>
          <MaterialCommunityIcons name="delete" size={24} color="#ec73ff" />
          <Text style={styles.actionTitle}>delete audio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditAudio} style={styles.actionItem}>
          <MaterialIcons name="edit" size={24} color="#ec73ff" />
          <Text style={styles.actionTitle}>edit audio</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default MusicActionSheet;
