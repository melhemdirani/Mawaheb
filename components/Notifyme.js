import { Notifier, Easing } from 'react-native-notifier';
import { CustomNotification } from './CustomNotifications';

export const notify = (name, description) => {
    let newName =  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    Notifier.showNotification({
        title: newName,
        description: description,
        duration: 0,
        Component: CustomNotification,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log('hidden'),
        onPress: () => console.log('Pressed'),
        hideOnPress: false,
    });
}