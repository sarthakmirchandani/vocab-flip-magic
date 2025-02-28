
import { NotificationService } from './NotificationService';
import { getWordsByLevel } from '@/data/academicWords';

export class WordNotificationService {
  // This method would typically be called by a server-side scheduled job
  // For testing purposes, we can call it manually or simulate it client-side
  static async sendDailyWordNotification() {
    try {
      // Get a random word from the beginner level (or any level you prefer)
      const beginnerWords = getWordsByLevel('beginner');
      const randomIndex = Math.floor(Math.random() * beginnerWords.length);
      const wordOfTheDay = beginnerWords[randomIndex];
      
      // Schedule a notification with this word
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0); // 9:00 AM

      await NotificationService.scheduleNotification(
        'Word of the Day',
        `Learn "${wordOfTheDay.word}" - ${wordOfTheDay.definition.substring(0, 50)}...`,
        tomorrow
      );
      
      console.log(`Scheduled word of the day notification: ${wordOfTheDay.word}`);
      return wordOfTheDay;
    } catch (error) {
      console.error('Error sending daily word notification:', error);
      throw error;
    }
  }

  // This would simulate setting up a recurring notification
  // For a real implementation, this would be handled server-side
  static setupDailyNotifications() {
    // For testing, we'll just schedule one notification for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 9:00 AM

    console.log(`Simulated setup of daily notifications for ${tomorrow.toLocaleString()}`);
    
    // In a real app, you'd register this with a server that would send push notifications
    return {
      scheduled: true,
      nextNotification: tomorrow
    };
  }
}
