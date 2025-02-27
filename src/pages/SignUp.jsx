import { SignUp as ClerkSignUp } from '@clerk/clerk-react';

export default function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tsr-primary">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join the TSR community</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <ClerkSignUp 
            routing="path" 
            path="/sign-up" 
            signInUrl="/sign-in"
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
