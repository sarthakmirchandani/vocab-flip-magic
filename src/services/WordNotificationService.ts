
import { NotificationService } from './NotificationService';
import { getWordsByLevel } from '@/data/academicWords';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export class WordNotificationService {
  // Schedule a notification with today's word of the day
  static async sendDailyWordNotification() {
    try {
      // Get a random word from the beginner level
      const beginnerWords = getWordsByLevel('beginner');
      const randomIndex = Math.floor(Math.random() * beginnerWords.length);
      const wordOfTheDay = beginnerWords[randomIndex];
      
      // Create notification text
      const title = 'Word of the Day';
      const body = `Today's word: "${wordOfTheDay.word}" - ${wordOfTheDay.definition.substring(0, 50)}...`;
      
      // Show immediate notification for debugging
      await NotificationService.showLocalNotification(title, body);
      
      // Schedule notification for tomorrow at 11:00 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(11, 0, 0, 0); // 11:00 AM

      const scheduled = await NotificationService.scheduleNotification(
        title,
        body,
        tomorrow
      );
      
      console.log(`Scheduled word of the day notification for ${tomorrow.toLocaleString()}`);
      return {
        scheduled,
        word: wordOfTheDay,
        nextNotification: tomorrow
      };
    } catch (error) {
      console.error('Error sending daily word notification:', error);
      throw error;
    }
  }

  // Check if it's time to schedule the next notification
  static shouldScheduleNotification() {
    const lastScheduled = localStorage.getItem('lastNotificationScheduled');
    if (!lastScheduled) return true;
    
    const now = new Date();
    const lastDate = new Date(lastScheduled);
    
    // Schedule a new notification if the last one was scheduled yesterday or earlier
    return now.getDate() !== lastDate.getDate() || 
           now.getMonth() !== lastDate.getMonth() || 
           now.getFullYear() !== lastDate.getFullYear();
  }

  // Set up daily notifications and register for tomorrow
  static setupDailyNotifications() {
    if (this.shouldScheduleNotification()) {
      this.sendDailyWordNotification()
        .then(() => {
          localStorage.setItem('lastNotificationScheduled', new Date().toISOString());
          console.log('Daily word notification scheduled successfully');
        })
        .catch(error => {
          console.error('Failed to schedule daily notification:', error);
        });
    } else {
      console.log('Notification already scheduled for today');
    }
  }
}

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
