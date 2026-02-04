import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    // Foreground notification
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log('📩 Notification received:', notification);
      });

    // Notification click / tap
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('👉 Notification tapped:', response);
      });

      return () => {
        if (notificationListener.current) {
          notificationListener.current.remove();
        }
      
        if (responseListener.current) {
          responseListener.current.remove();
        }
      };
  }, []);

  return { expoPushToken };
}

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert('Physical device required');
    return null;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } =
      await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Notification permission denied');
    return null;
  }

  // 👇 THIS IS FCM TOKEN FOR ANDROID
  const token = (await Notifications.getDevicePushTokenAsync()).data;
  console.log('🔥 FCM TOKEN:', token);

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
