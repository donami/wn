import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Icon, Image } from 'react-native-elements';
import ElevatedView from 'react-native-elevated-view';

import Text from './text';

const truncate = (str: string, maxLength: number, useWordBoundary: boolean) => {
  if (str.length <= maxLength) {
    return str;
  }
  var subString = str.substr(0, maxLength - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + '...'
  );
};

type Props = {
  item: any;
  onDelete: () => void;
};
const ShoppingListItem: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <ElevatedView elevation={3} style={styles.container}>
      <View style={styles.standalone}>
        <SwipeRow
          disableRightSwipe
          leftOpenValue={75}
          rightOpenValue={-75}
          preview
          previewOpenValue={-75}
        >
          <TouchableHighlight
            onPress={onDelete}
            style={styles.standaloneRowBack}
          >
            <Icon name='trash' type='font-awesome' color='white' />
          </TouchableHighlight>
          <View style={styles.standaloneRowFront}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 20,
              }}
            >
              <Image
                source={
                  item.ingredient.image
                    ? { uri: item.ingredient.image }
                    : require('../assets/no-image.png')
                }
                style={{ width: 48, height: 48, marginRight: 20 }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text numberOfLines={1}>
                {truncate(`${item.amount} ${item.ingredient.title}`, 25, true)}
              </Text>
            </View>
          </View>
        </SwipeRow>
      </View>
    </ElevatedView>
  );
};

export default ShoppingListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 3,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 3,
  },
  standalone: {},
  standaloneRowFront: {
    alignItems: 'flex-start',
    paddingLeft: 75,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    minHeight: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    paddingRight: 30,
  },
});
