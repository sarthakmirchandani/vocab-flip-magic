
import { PushNotifications } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';

export class NotificationService {
  static async initialize() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    try {
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
        
        // Set up listeners for push events
        this.addListeners();
        console.log('Push notification registration successful');
      } else {
        console.log('Push notification permission denied');
      }
    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  }

  static addListeners() {
    // On registration success
    PushNotifications.addListener('registration', token => {
      console.log('Push registration success, token: ' + token.value);
      // You would typically send this token to your server
    });

    // On registration error
    PushNotifications.addListener('registrationError', err => {
      console.error('Push registration failed: ' + JSON.stringify(err));
    });

    // On push notification received
    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ' + JSON.stringify(notification));
      // Show a toast with the title of the notification
      if (notification.title) {
        Toast.show({
          text: `${notification.title}: ${notification.body || ''}`,
          duration: 'long'
        });
      }
    });

    // On push notification action performed (when user taps on notification)
    PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed: ' + JSON.stringify(notification));
      // Here you can navigate to specific parts of your app based on the notification
    });
  }

  static async scheduleLocalNotification(title: string, body: string, id: string) {
    try {
      // This is a workaround since Capacitor doesn't have a direct API for scheduling
      // For a real implementation, you'd use platform-specific code or a scheduled notification plugin
      console.log(`Scheduling notification: ${title} - ${body}`);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }
}
