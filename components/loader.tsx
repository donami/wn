import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type Props = {};
const Loader: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#7FC583' />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
