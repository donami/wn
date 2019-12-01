import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/text';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';

type Props = { navigation: any };
const Settings: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name='chevron-left' color='white' size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.pageTitle}>
          <Text style={{ color: '#fff', fontSize: 30 }}>Settings</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={{ color: 'white' }}>
          Mr. Bar - Version {Constants.platform.android.versionCode || '1'}
        </Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEA18B',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
  },
  backButton: {
    flexGrow: 0,
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
  },
  pageTitle: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
