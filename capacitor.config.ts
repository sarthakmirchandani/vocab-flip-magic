
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.055f41f609a54201a3e39d3c2c6c7423',
  appName: 'vocab-flip-magic',
  webDir: 'dist',
  server: {
    url: 'https://055f41f6-09a5-4201-a3e3-9d3c2c6c7423.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
