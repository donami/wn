import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tabs from '../components/tabs';
import Text from '../components/text';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Home</Text>
      <Tabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: 'white',
    padding: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
