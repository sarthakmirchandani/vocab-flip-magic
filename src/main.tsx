
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Get the publishable key from the environment variable
const publishableKey = "pk_test_d29ydGh5LWNhcmlib3UtNzIuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Add robust error handling
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
}

// Add debug information in development
if (process.env.NODE_ENV === 'development') {
  console.log('Auth configuration:', {
    publishableKey: publishableKey ? 'Key provided' : 'Missing key',
    origin: window.location.origin,
    host: window.location.host,
    isMobile: /Capacitor|Android|iOS/.test(navigator.userAgent)
  });
}

// Detect if running in a mobile environment
const isMobile = /Capacitor|Android|iOS/.test(navigator.userAgent);

// Wrap rendering in try/catch to capture initialization errors
try {
  // Render the app with ClerkProvider
  createRoot(rootElement!).render(
    <ClerkProvider 
      publishableKey={publishableKey}
      localization={{
        socialButtonsBlockButton: "Continue with {{provider}}"
      }}
      appearance={{
        elements: {
          rootBox: {
            boxShadow: 'none',
            width: '100%'
          }
        }
      }}
    >
      <App />
    </ClerkProvider>
  );
} catch (error) {
  console.error("Failed to render application:", error);
  
  // Display fallback UI if rendering fails
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;padding:20px;text-align:center;">
        <h2>Something went wrong</h2>
        <p>The application failed to initialize. Please check the console for more details.</p>
      </div>
    `;
  }
}
