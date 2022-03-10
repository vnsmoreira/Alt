import { useState } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

const MusicActionSheet = () => {
  const [actions, setActions] = useState([]);

  const handleOnBeforeShow = ({ actions }) => {
    setActions(actions);
  };

  const handleOnClose = () => {
    setActions([]);
  };

  const closeActionSheet = () => SheetManager.hide('app-actionsheet');

  const handleAction = actionCallback => {
    actionCallback();
    closeActionSheet();
  };

  return (
    <ActionSheet
      id="app-actionsheet"
      gestureEnabled={true}
      containerStyle={styles.actionSheetContainer}
      onBeforeShow={handleOnBeforeShow}
      onClose={handleOnClose}
    >
      <View style={styles.actionSheetWrapper}>
        {actions.map(({ title, icon, callback }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleAction(callback)}
              style={styles.actionItem}
            >
              {icon(24, '#ec73ff')}
              <Text style={styles.actionTitle}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ActionSheet>
  );
};

export default MusicActionSheet;
