import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Trending from '../components/trending';
import { Tile, Title, ImageBackground } from '@shoutem/ui';
import BottomAd from '../components/bottom-ad';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

export default function HomeScreen({ navigation }) {
  const { width } = Dimensions.get('window');

  const [windowWidth, setWindowWidth] = useState(width);

  const dimensionChangeHandler = data => {
    setWindowWidth(data.window.width);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', dimensionChangeHandler);

    return () => {
      Dimensions.removeEventListener('change', dimensionChangeHandler);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('AllDrinks')}>
          <ImageBackground
            style={{
              width: windowWidth,
            }}
            styleName='large-banner'
            source={require('../assets/all-drinks.jpg')}
          >
            <Tile>
              <Icon
                raised
                name='glass-wine'
                color='#7FC583'
                type='material-community'
                reverse
              />
              <Title styleName='md-gutter-bottom'>BROWSE ALL DRINKS</Title>
            </Tile>
          </ImageBackground>
        </TouchableOpacity>
        <Trending
          navigation={navigation}
          containerStyle={styles.trendingContainer}
        />
      </ScrollView>
      <View
        style={{
          flex: 1,
          maxHeight: '10%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BottomAd />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FB',
  },
  trendingContainer: {
    marginTop: 20,
    padding: 20,
    flex: 1,
  },
  titleStyle: {
    color: '#111',
    fontFamily: 'Montserrat',
  },
  captionStyle: {
    color: '#999',
    fontFamily: 'Montserrat',
  },
});
