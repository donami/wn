import React from 'react';
import { StyleSheet, View } from 'react-native';
import Trending from '../components/trending';
import { Tile, Title, Subtitle, Overlay, ImageBackground } from '@shoutem/ui';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'expo-ads-admob';
import BottomAd from '../components/bottom-ad';

export default function MyDrinksScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        styleName='large-banner'
        source={require('../assets/christmas-drink.jpg')}
      >
        <Tile>
          <Overlay styleName='image-overlay'>
            <Title styleName='sm-gutter-horizontal'>
              Try out this delicious drink with the taste of christmas
            </Title>
            <Subtitle>Winter is coming...</Subtitle>
          </Overlay>
        </Tile>
      </ImageBackground>
      <Trending
        navigation={navigation}
        containerStyle={styles.trendingContainer}
      />
      <BottomAd />
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
