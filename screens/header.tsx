import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { searchAction } from '../redux/actions/search-actions';
import { withNavigation } from 'react-navigation';

type Props = {
  navigation?: any;
};
const HeaderScreen: React.FC<Props> = ({ navigation }) => {
  const [phrase, setPhrase] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Icon
          name='bars'
          type='font-awesome'
          color='#f50'
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
          containerStyle={styles.searchBarContainer}
          platform={'default'}
          style={styles.searchBarContainer}
          lightTheme
          onSubmitEditing={() => {
            dispatch(searchAction(phrase));
            navigation.navigate('Search', { phrase });
          }}
          // leftIconContainerStyle={styles.input}
          // rightIconContainerStyle={styles.input}
          // inputContainerStyle={styles.input}
          placeholder='Type Here...'
          onChangeText={value => setPhrase(value)}
          value={phrase}
        />
      </View>
    </View>
  );
};

export default withNavigation(HeaderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: '10%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuContainer: {
    flex: 1,
    padding: 10,
    maxWidth: '20%',
  },
  searchContainer: {
    flex: 2,
    padding: 10,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  // input: {
  // borderColor: 'white',
  // backgroundColor: 'white',
  // },
});
