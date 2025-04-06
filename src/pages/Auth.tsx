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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Debug loading state
    console.log("SignInPage mounting...");
    
    try {
      // Redirect to home if already signed in
      if (isSignedIn) {
        console.log("User is signed in, redirecting to /");
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
      
      // Log hostname and path for debugging OAuth redirects
      const hostname = window.location.origin;
      const path = location.pathname;
      const fullUrl = window.location.href;
      const isMobile = /Capacitor|Android|iOS/.test(navigator.userAgent);
      
      console.log("Auth page loaded:", {
        fullUrl,
        origin: hostname,
        path,
        search: location.search,
        isCallback: path.includes("callback") || path.includes("sso-callback"),
        isMobile,
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error("Error in SignInPage:", error);
      setAuthError("An unexpected error occurred while loading the sign-in page");
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p>Loading authentication...</p>
        </div>
      </div>
    );
  }

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Debug loading state
    console.log("SignUpPage mounting...");
    
    try {
      // Redirect to home if already signed in
      if (isSignedIn) {
        console.log("User is signed in, redirecting to /");
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

      // Log hostname and path for debugging OAuth redirects
      const hostname = window.location.origin;
      const path = location.pathname;
      const fullUrl = window.location.href;
      const isMobile = /Capacitor|Android|iOS/.test(navigator.userAgent);
      
      console.log("Auth page loaded:", {
        fullUrl,
        origin: hostname,
        path,
        search: location.search,
        isCallback: path.includes("callback") || path.includes("sso-callback"),
        isMobile,
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error("Error in SignUpPage:", error);
      setAuthError("An unexpected error occurred while loading the sign-up page");
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p>Loading authentication...</p>
        </div>
      </div>
    );
  }

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
