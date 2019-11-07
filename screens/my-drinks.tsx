import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { firestore } from '../config/firebase';

export default function MyDrinksScreen({ navigation }) {
  const [title, setTitle] = useState('');

  return (
    <View style={styles.container}>
      <Text>This is My drinks screen</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={title}
          placeholder='Title of the drink'
          style={styles.textInput}
          onChangeText={value => setTitle(value)}
        />

        <Button
          onPress={() => {
            firestore
              .collection('drinks')
              .add({
                title,
              })
              .then(doc => {
                ToastAndroid.showWithGravity(
                  'Drink created!',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
              });
          }}
          title='Add the drink'
          color='#841584'
        />
      </View>

      <Button
        title='Go to About'
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: 'white',
    padding: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inputContainer: {
    margin: 30,
  },
  textInput: {
    height: 30,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    fontSize: 24,
    borderWidth: 1,
    borderBottomColor: '#111111',
  },
});
