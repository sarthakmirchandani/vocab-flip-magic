
import { PushNotifications } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';

export class NotificationService {
  // Store device token for later use with backend
  private static deviceToken: string | null = null;

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
      // Store the token for later use
      this.deviceToken = token.value;
      // In a real app, you would send this token to your backend server
      this.sendTokenToBackend(token.value);
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

  // Method to send token to your backend
  static async sendTokenToBackend(token: string) {
    // This is a placeholder for the actual implementation
    // In a real app, you would send the token to your backend server
    console.log('Sending token to backend:', token);
    
    // Example of how you might send the token to your backend
    /*
    try {
      const response = await fetch('https://your-api.com/register-device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          userId: 'user-id-from-auth-system', // You'd need to get this from your auth system
          platform: 'ios' // or 'android', detect from device
        }),
      });
      
      if (response.ok) {
        console.log('Device registered successfully with backend');
      } else {
        console.error('Failed to register device with backend');
      }
    } catch (error) {
      console.error('Error registering device with backend:', error);
    }
    */
  }

  // Request scheduling a notification with your backend
  static async scheduleNotification(title: string, body: string, scheduledTime: Date) {
    // This is a placeholder for the actual implementation
    // In a real app, you would send the notification data to your backend server
    console.log(`Requesting to schedule notification at ${scheduledTime.toISOString()}`);
    console.log(`Title: ${title}, Body: ${body}`);
    
    // Example of how you might schedule a notification with your backend
    /*
    try {
      const response = await fetch('https://your-api.com/schedule-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          scheduledTime: scheduledTime.toISOString(),
          userId: 'user-id-from-auth-system', // You'd need to get this from your auth system
          // You can add additional data payload if needed
          data: {
            type: 'word_reminder',
            wordId: 'some-word-id'
          }
        }),
      });
      
      if (response.ok) {
        console.log('Notification scheduled successfully with backend');
        return true;
      } else {
        console.error('Failed to schedule notification with backend');
        return false;
      }
    } catch (error) {
      console.error('Error scheduling notification with backend:', error);
      return false;
    }
    */
    
    // For now, just return true to simulate success
    return true;
  }

  // Local notifications for immediate display
  static async showLocalNotification(title: string, body: string) {
    try {
      // Display a toast notification for immediate feedback
      await Toast.show({
        text: `${title}: ${body}`,
        duration: 'long'
      });
      console.log(`Showing local notification: ${title} - ${body}`);
      return true;
    } catch (error) {
      console.error('Error showing local notification:', error);
      return false;
    }
  }
}
