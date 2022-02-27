import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

const MusicActionSheet = () => {
  const [musicId, setMusicId] = useState('');

  return (
    <ActionSheet
      id="music-options"
      gestureEnabled={true}
      containerStyle={{ backgroundColor: '#141414' }}
      onBeforeShow={({ id, isDownloaded }) => setMusicId(id)}
    >
      <View style={{ height: 200, backgroundColor: '#141414' }}>
        <Text style={{ color: 'white' }}>{musicId}</Text>
      </View>
    </ActionSheet>
  );
};

export default MusicActionSheet;
