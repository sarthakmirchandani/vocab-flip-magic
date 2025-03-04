
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if already signed in
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">WordPill!</h1>
          <p className="mt-2 text-gray-600">Sign in to access your vocabulary flashcards</p>
        </div>
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </div>
    </div>
  );
};

export const SignUpPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if already signed in
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">WordPill!</h1>
          <p className="mt-2 text-gray-600">Create an account to start learning</p>
        </div>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </div>
    </div>
  );
};
