import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { firestore } from '../config/firebase';
import { Icon, ListItem, Image } from 'react-native-elements';
import { Ingredient } from '../types/models';

export default function DrinkScreen({ navigation }) {
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    const drinkId = navigation.getParam('id');
    const docRef = firestore.collection('drinks').doc(drinkId);

    docRef
      .get()
      .then(async doc => {
        const data = doc.data();

        if (data.ingredients && data.ingredients.length) {
          data.ingredients = await Promise.all(
            data.ingredients.map(item => {
              return item.ingredient.get().then(ingredient => {
                const ingredientData = ingredient.data();
                return {
                  amount: item.amount,
                  ingredient: {
                    id: ingredient.id,
                    ...ingredientData,
                  },
                };
              });
            })
          );
        }

        setDrink({
          id: drinkId,
          ...data,
        });
      })
      .catch(e => {
        console.warn('Unable to fetch drink with ID: ' + drinkId);
      });
  }, []);

  return (
    <View style={styles.container}>
      {drink && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              maxHeight: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{drink.title}</Text>
          </View>
          {drink.image && (
            <View style={styles.imageView}>
              <Image
                source={{ uri: drink.image }}
                style={{ width: 200, height: 200, maxHeight: '100%' }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          )}
          {drink.description && (
            <View
              style={{
                flex: 1,
                padding: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{drink.description}</Text>
            </View>
          )}
          {drink.ingredients && (
            <View style={{ flex: 1 }}>
              {drink.ingredients.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    leftAvatar={{
                      source: {
                        uri: item.ingredient.image,
                      },
                      title: item.ingredient.title[0],
                    }}
                    title={item.ingredient.title}
                    subtitle={item.amount}
                    bottomDivider
                  />
                );
              })}
            </View>
          )}
          <Icon raised name='heartbeat' type='font-awesome' color='#f50' />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    // padding: 40,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  imageView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
