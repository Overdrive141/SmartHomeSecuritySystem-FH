import firebase from 'react-native-firebase';
import type {RemoteMessage} from 'react-native-firebase';

export default async (message: RemoteMessage) => {
  console.log('message da de' + message);

  return Promise.resolve();
};
