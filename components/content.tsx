import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Content() {
  return (
    <View style={styles.container}>
      <Text>This is the Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: 'red',
    padding: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
