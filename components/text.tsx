import React from 'react';
import { Text as NativeText, TextProps, StyleSheet } from 'react-native';

type Props = TextProps;
const Text: React.FC<Props> = ({ style, children, ...other }) => {
  const propStyle: any = style;

  return (
    <NativeText style={{ ...styles.container, ...propStyle }} {...other}>
      {children}
    </NativeText>
  );
};

export default Text;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Montserrat',
  },
});
