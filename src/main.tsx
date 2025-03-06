
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Get the publishable key from the environment variable
const publishableKey = "pk_test_d29ydGh5LWNhcmlib3UtNzIuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Add debug information in development
if (process.env.NODE_ENV === 'development') {
  console.log('Auth configuration:', {
    publishableKey: publishableKey ? 'Key provided' : 'Missing key',
    origin: window.location.origin,
    host: window.location.host,
  });
}

// Render the app with ClerkProvider
createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={publishableKey}
    localization={{
      socialButtonsBlockButton: "Continue with {{provider}}"
    }}
    // Define the redirect URLs with all possible patterns
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    afterSignInUrl="/"
    afterSignUpUrl="/"
  >
    <App />
  </ClerkProvider>
);
