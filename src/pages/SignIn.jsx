import { SignIn as ClerkSignIn } from '@clerk/clerk-react';

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tsr-primary">Sign In</h1>
          <p className="text-gray-600 mt-2">Welcome back to TSR</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <ClerkSignIn 
            routing="path" 
            path="/sign-in" 
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-tsr-primary hover:bg-tsr-primary-dark text-white',
                card: 'shadow-none',
                footer: 'hidden'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
