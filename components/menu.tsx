import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Menu() {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>My drinks</Text>
      <Text style={styles.item}>On the shelf</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 40,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
  },
});
