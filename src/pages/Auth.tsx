
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if already signed in
    if (isSignedIn) {
      navigate("/");
      return;
    }

    // Check for error query param in URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      setAuthError(decodeURIComponent(error));
      console.error("Auth error from URL:", error);
    }

    // Check for redirect_url param
    const redirectUrl = urlParams.get("redirect_url");
    console.log("Redirect URL from params:", redirectUrl);

    // Log hostname and path for debugging OAuth redirects
    const hostname = window.location.origin;
    const path = location.pathname;
    const fullUrl = window.location.href;
    setDebugInfo(`Current URL: ${fullUrl}\nOrigin: ${hostname}, Path: ${path}`);
    console.log("Auth page loaded:", {
      fullUrl,
      origin: hostname,
      path,
      search: location.search,
      isCallback: path.includes("callback") || path.includes("sso-callback"),
      isMobile: /Capacitor|Android|iOS/.test(navigator.userAgent),
      userAgent: navigator.userAgent
    });
  }, [isSignedIn, navigate, location]);

  // Handle authentication errors from Clerk
  const handleSignInError = (err: Error) => {
    console.error("Sign in error:", err);
    setAuthError(err.message || "Failed to sign in. Please try again.");
  };

  // Detect if running in Capacitor/mobile
  const isMobileApp = /Capacitor|Android|iOS/.test(navigator.userAgent);

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
            <p>Running in {isMobileApp ? 'mobile app' : 'browser'}</p>
          </div>
        )}

        <SignIn 
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up"
          afterSignInUrl="/"
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
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if already signed in
    if (isSignedIn) {
      navigate("/");
      return;
    }

    // Check for error query param
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      setAuthError(decodeURIComponent(error));
      console.error("Auth error from URL:", error);
    }

    // Check for redirect_url param
    const redirectUrl = urlParams.get("redirect_url");
    console.log("Redirect URL from params:", redirectUrl);

    // Log hostname and path for debugging OAuth redirects
    const hostname = window.location.origin;
    const path = location.pathname;
    const fullUrl = window.location.href;
    setDebugInfo(`Current URL: ${fullUrl}\nOrigin: ${hostname}, Path: ${path}`);
    console.log("Auth page loaded:", {
      fullUrl,
      origin: hostname,
      path,
      search: location.search,
      isCallback: path.includes("callback") || path.includes("sso-callback"),
      isMobile: /Capacitor|Android|iOS/.test(navigator.userAgent),
      userAgent: navigator.userAgent
    });
  }, [isSignedIn, navigate, location]);

  // Detect if running in Capacitor/mobile
  const isMobileApp = /Capacitor|Android|iOS/.test(navigator.userAgent);

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
            <p>Running in {isMobileApp ? 'mobile app' : 'browser'}</p>
          </div>
        )}

        <SignUp 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in"
          afterSignUpUrl="/"
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
