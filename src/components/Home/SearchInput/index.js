import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const SearchInput = ({ search, setSearch }) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons style={styles.searchIcon} name="ios-search-outline" size={25} color="#5c5c5c" />
      <TextInput
        selectionColor="purple"
        style={styles.input}
        placeholder="Artistas, musicas ou podcasts"
        placeholderTextColor="#3d3d3d"
        autoCorrect={false}
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
};

export default SearchInput;
