import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './header';
import Text from '../components/text';

type Props = {};
const Settings: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
