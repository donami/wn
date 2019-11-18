import React from 'react';
import { View, StyleSheet, StyleProp } from 'react-native';

type Props = {
  navigation?: any;
  containerStyle?: StyleProp<any>;
};
const Box: React.FC<Props> = ({
  containerStyle = {},
  children,
  navigation,
}) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>{children}</View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#F9FAFE',
    shadowColor: '#8F9AB0',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
    padding: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 5,
  },
});
