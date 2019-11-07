import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from '../components/tabs';

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
