import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../components/text';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    padding: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default AboutScreen;
