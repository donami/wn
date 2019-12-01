import React from 'react';
import { View } from 'react-native';
import Text from './text';

type Props = {
  number: number;
  text: string;
};
const Instruction: React.FC<Props> = ({ number, text }) => {
  return (
    <View
      key={number}
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 24 / 2,
          backgroundColor: '#EEA18B',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>{number + 1}</Text>
      </View>
      <Text style={{ marginLeft: 20 }}>{text}</Text>
    </View>
  );
};

export default Instruction;
