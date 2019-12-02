import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
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
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const start = () => {
    setIsHidden(!isHidden);

    Animated.timing(animatedValue, {
      toValue: isHidden ? 1 : 0,
      duration: 300,
    }).start();
  };

  return (
    <LinearGradient
      start={[0, 1]}
      end={[1, 0]}
      colors={['#F4C6A1', '#EEA18B', '#E77B77']}
      style={styles.container}
    >
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name='bars' type='font-awesome' color='#fff' />
        </TouchableOpacity>
      </View>
      <View style={[styles.searchContainer]}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
            flex: 1,
          }}
        >
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
              <Icon name='search' color='rgba(255, 255, 255, 0.7)' {...props} />
            )}
            clearIcon={false}
            // clearIcon={props => (
            //   <Icon
            //     name='times'
            //     type='font-awesome'
            //     color='rgba(255, 255, 255, 0.7)'
            //     {...props}
            //   />
            // )}
            // leftIconContainerStyle={styles.searchIcon}
            // rightIconContainerStyle={styles.input}
            inputContainerStyle={styles.input}
            placeholder='Search drinks...'
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            inputStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
            onChangeText={value => setPhrase(value)}
            value={phrase}
          />
        </Animated.View>
        <View
          style={{
            flex: 1,
            maxWidth: 50,
            alignItems: 'flex-end',
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              start();
            }}
          >
            {!isHidden ? (
              <Icon name='chevron-right' color='#fff' />
            ) : (
              <Icon name='search' color='#fff' />
            )}
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
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
