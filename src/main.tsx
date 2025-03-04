
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Get the publishable key from the environment variable
const publishableKey = "pk_test_d29ydGh5LWNhcmlib3UtNzIuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Render the app with ClerkProvider
createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={publishableKey}
    navigationFallback={<div>Loading...</div>}
  >
    <App />
  </ClerkProvider>
);
