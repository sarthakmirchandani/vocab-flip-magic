
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vocabflip.app',
  appName: 'vocab-flip-magic',
  webDir: 'dist',
  server: {
    url: 'https://055f41f6-09a5-4201-a3e3-9d3c2c6c7423.lovableproject.com',
    cleartext: true,
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
  android: {
    allowMixedContent: true
  },
  webViewAllowFileAccessFromFileURLs: true,
  overrideUserAgent: 'Mozilla/5.0 CapacitorApp'
};

export default config;
