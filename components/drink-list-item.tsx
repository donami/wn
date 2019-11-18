import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

type Props = {
  item: any;
  navigation: any;
  subtitle?: string;
};

const DrinkListItem: React.FC<Props> = ({ item, navigation, subtitle }) => {
  return (
    <ListItem
      title={item.title}
      subtitle={subtitle}
      onPress={() => navigation.navigate('Drink', { id: item.id })}
      leftAvatar={{
        source: item.image && { uri: item.image },
        title: item.title[0],
      }}
      bottomDivider
      chevron
    />
  );
};

export default DrinkListItem;
