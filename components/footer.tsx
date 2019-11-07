import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text>Footer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // padding: 40,
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
