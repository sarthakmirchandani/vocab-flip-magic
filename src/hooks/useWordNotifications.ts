
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { NotificationService } from '@/services/NotificationService';
import { WordNotificationService } from '@/services/WordNotificationService';

// React hook to manage notifications
export const useWordNotifications = () => {
  const { isSignedIn } = useAuth();
  
  useEffect(() => {
    // Only set up notifications if user is signed in
    if (isSignedIn) {
      // Initialize push notifications
      NotificationService.initialize()
        .then(() => {
          console.log('Notification service initialized');
          // Set up daily notifications
          WordNotificationService.setupDailyNotifications();
        })
        .catch(err => {
          console.error('Error initializing notifications:', err);
        });
    }
  }, [isSignedIn]);
  
  // Function to manually trigger a notification (for testing)
  const sendTestNotification = async () => {
    try {
      const result = await WordNotificationService.sendDailyWordNotification();
      return result;
    } catch (error) {
      console.error('Error sending test notification:', error);
      throw error;
    }
  };
  
  return { sendTestNotification };
};
