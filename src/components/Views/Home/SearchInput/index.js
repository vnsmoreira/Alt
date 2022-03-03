import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const SearchInput = ({ search, setSearch }) => {
  const handleClearInput = () => setSearch('');

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
      <TouchableOpacity onPress={handleClearInput}>
        <MaterialIcons style={styles.searchIcon} name="clear" size={24} color="#5c5c5c" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
