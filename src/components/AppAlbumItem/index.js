import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

const MusicItem = ({ title, musicList = [] }) => {
  const numberOfMusicsOnAlbum = musicList.length;

  return (
    <View style={styles.musicItem}>
      <TouchableOpacity style={styles.presentationContainer}>
        <View style={styles.thumbnailContainer}>
          <FontAwesome name="folder" size={40} color="gray" />
        </View>

        <View style={styles.aboutContainer}>
          <Text numberOfLines={1} style={{ ...styles.musicTitle }}>
            {title}
          </Text>

          <View style={styles.musicInfo}>
            <Text style={styles.musicDuration}>{numberOfMusicsOnAlbum} Musicas</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <SimpleLineIcons style={{ padding: 20 }} name="options-vertical" size={14} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicItem;
