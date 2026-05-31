import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();
  let status = current.status;

  if (status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'ResepMakan Notification',
      importance: Notifications.AndroidImportance.MAX
    });
  }

  return status === 'granted';
}

export async function triggerRecipeNotification() {
  const granted = await requestNotificationPermission();

  if (!granted) {
    throw new Error('Izin notifikasi belum diberikan.');
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'ResepMakan',
      body: 'Notifikasi pengingat memasak berhasil dipicu.'
    },
    trigger: null
  });

  return true;
}
