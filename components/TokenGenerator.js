
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useDispatch} from 'react-redux'
import { setToken } from '../reduxToolkit/userSlice';


export const registerForPushNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return; 
    }
    try {
      const token = (await Notifications.getExpoPushTokenAsync({experienceId:'@melhemdirani/mawaheb'})).data;
      return token;

    } catch (error) {
      console.log(error)
    }
  }
