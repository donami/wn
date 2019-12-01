import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { searchAction } from '../redux/actions/search-actions';
import { withNavigation } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  navigation?: any;
};
const HeaderScreen: React.FC<Props> = ({ navigation }) => {
  const [phrase, setPhrase] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <LinearGradient
      start={[0, 1]}
      end={[1, 0]}
      colors={['#F4C6A1', '#EEA18B', '#E77B77']}
      style={styles.container}
    >
      <View style={styles.menuContainer}>
        <Icon
          name='bars'
          type='font-awesome'
          color='#fff'
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View style={styles.searchContainer}>
        {!visible && (
          <View style={{ alignSelf: 'flex-end', padding: 10, marginRight: 10 }}>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Icon name='search' color='#fff' />
            </TouchableOpacity>
          </View>
        )}
        {visible && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
              padding: 20,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <SearchBar
                containerStyle={styles.searchBarContainer}
                platform={'default'}
                style={styles.searchBarContainer}
                lightTheme
                onSubmitEditing={() => {
                  dispatch(searchAction(phrase));
                  navigation.navigate('Search', { phrase });
                }}
                searchIcon={props => (
                  <Icon
                    name='search'
                    color='rgba(255, 255, 255, 0.7)'
                    {...props}
                  />
                )}
                clearIcon={props => (
                  <Icon
                    name='times'
                    type='font-awesome'
                    color='rgba(255, 255, 255, 0.7)'
                    {...props}
                  />
                )}
                // leftIconContainerStyle={styles.searchIcon}
                // rightIconContainerStyle={styles.input}
                inputContainerStyle={styles.input}
                placeholder='Search drinks...'
                placeholderTextColor='rgba(255, 255, 255, 0.7)'
                inputStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                onChangeText={value => setPhrase(value)}
                value={phrase}
              />
            </View>
            <View style={{ flexGrow: 0, marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                  setPhrase('');
                }}
              >
                <Icon
                  name='chevron-right'
                  type='font-awesome'
                  color='rgba(255, 255, 255, 0.7)'
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
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
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  input: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
});
