import { useAuth, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export default function ProtectedRoute({ children }) {
  const { isLoaded, userId } = useAuth();
  
  // Check if Clerk is properly initialized
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = !!clerkPubKey;
  
  // If Clerk is not configured, just render the children without protection
  if (!isClerkConfigured) {
    console.warn("⚠️ Clerk is not properly configured. Protected routes are accessible without authentication.");
    return children;
  }
  
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tsr-primary"></div>
      </div>
    );
  }
  
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
