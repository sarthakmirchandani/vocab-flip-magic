
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vocabflip.app',
  appName: 'vocab-flip-magic',
  webDir: 'dist',
  server: {
    // For local development, use localhost with the default Vite port
    url: 'http://localhost:5173',
    cleartext: true,
    androidScheme: 'https',
    // Add hostname whitelist for OAuth flows
    allowNavigation: [
      '*.accounts.dev',
      '*.clerk.dev',
      'worthy-caribou-72.clerk.accounts.dev',
      'accounts.google.com',
      '*.googleapis.com',
      '*.gstatic.com',
      '*.google.com',
      'localhost',
      '10.0.2.2' // Android emulator localhost
    ]
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  ios: {
    contentInset: "always",
    allowsLinkPreview: true,
    scrollEnabled: true,
    useOldRenderingEngine: false
  },
  webViewAllowFileAccessFromFileURLs: true,
  overrideUserAgent: 'Mozilla/5.0 CapacitorApp'
};

export default config;
