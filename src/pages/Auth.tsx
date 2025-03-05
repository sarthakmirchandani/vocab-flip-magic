
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if already signed in
    if (isSignedIn) {
      navigate("/");
    }

    // Check for error query param in URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      setAuthError(decodeURIComponent(error));
      console.error("Auth error from URL:", error);
    }

    // Log hostname for debugging OAuth redirects
    const hostname = window.location.origin;
    setDebugInfo(`Current origin: ${hostname}`);
    console.log("Auth page loaded with origin:", hostname);
  }, [isSignedIn, navigate]);

  // Handle authentication errors from Clerk
  const handleSignInError = (err: Error) => {
    console.error("Sign in error:", err);
    setAuthError(err.message || "Failed to sign in. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">WordPill!</h1>
          <p className="mt-2 text-gray-600">Sign in to access your vocabulary flashcards</p>
        </div>

        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        {debugInfo && process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 mb-4">
            <p>{debugInfo}</p>
            <p>Make sure this origin is added as an authorized redirect URI in your OAuth providers.</p>
          </div>
        )}

        <SignIn 
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          redirectUrl="/"
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition",
              footerActionLink: 
                "text-blue-600 hover:text-blue-800 font-medium",
              card: "p-0 m-0 shadow-none"
            }
          }}
        />
      </div>
    </div>
  );
};

export const SignUpPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if already signed in
    if (isSignedIn) {
      navigate("/");
    }

    // Check for error query param
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      setAuthError(decodeURIComponent(error));
      console.error("Auth error from URL:", error);
    }

    // Log hostname for debugging OAuth redirects
    const hostname = window.location.origin;
    setDebugInfo(`Current origin: ${hostname}`);
    console.log("Auth page loaded with origin:", hostname);
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">WordPill!</h1>
          <p className="mt-2 text-gray-600">Create an account to start learning</p>
        </div>

        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        {debugInfo && process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 mb-4">
            <p>{debugInfo}</p>
            <p>Make sure this origin is added as an authorized redirect URI in your OAuth providers.</p>
          </div>
        )}

        <SignUp 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in"
          afterSignUpUrl="/"
          redirectUrl="/"
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition",
              footerActionLink: 
                "text-blue-600 hover:text-blue-800 font-medium",
              card: "p-0 m-0 shadow-none"
            }
          }}
        />
      </div>
    </div>
  );
};
