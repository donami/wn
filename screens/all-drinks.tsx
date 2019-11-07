import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { firestore } from '../config/firebase';

// function Item({ title, navigation }) {
//   return (
//     <View
//       style={styles.item}
//       onTouchEnd={() => {
//         navigation.navigate('Drink');
//       }}
//     >
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// }

const renderItem = ({ item, navigation }) => (
  <ListItem
    title={item.title}
    subtitle='test'
    onPress={() => navigation.navigate('Drink', { id: item.id })}
    leftAvatar={{
      source: item.image && { uri: item.image },
      title: item.title[0],
    }}
    bottomDivider
    chevron
  />
);

export default function AllDrinksScreen({ navigation }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    firestore
      .collection('drinks')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();
          return {
            id: item.id,
            title: data.title,
            image: data.image,
          };
        });
        setDrinks(items);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={drinks}
        renderItem={args => renderItem({ ...args, navigation })}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: 'white',
    padding: 40,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
