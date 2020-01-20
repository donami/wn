import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Trending from '../components/trending';
import { Tile, Title, ImageBackground } from '@shoutem/ui';
import BottomAd from '../components/bottom-ad';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AllDrinks')}>
        <ImageBackground
          style={{
            width: '100%',
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
