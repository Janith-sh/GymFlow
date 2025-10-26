import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    // Simulate password reset process
    setIsSubmitted(true);
    
    // After 3 seconds, redirect to login
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 8h2v8H6V8zm10 0h2v8h-2V8zM4 10h16v4H4v-4zM2 12h2v2H2v-2zm18 0h2v2h-2v-2z"/>
            </svg>
          </div>
          
          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Check Your Email</h1>
          <p className="text-gray-600 text-lg">We've sent you a password reset link</p>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Sent!</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your email and follow the instructions to reset your password.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleBackToLogin}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200"
            >
              Back to Sign In
            </button>
            
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-gray-800 font-medium hover:underline"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        {/* Logo */}
        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 8h2v8H6V8zm10 0h2v8h-2V8zM4 10h16v4H4v-4zM2 12h2v2H2v-2zm18 0h2v2h-2v-2z"/>
          </svg>
        </div>
        
        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Your Password</h1>
        <p className="text-gray-600 text-lg">Enter your email to receive reset instructions</p>
      </div>

      {/* Forgot Password Form Card */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-600 mb-6">No worries! Enter your email address and we'll send you a link to reset your password.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 mb-4"
          >
            Send Reset Link
          </button>
        </form>
        
        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <button 
              onClick={handleBackToLogin}
              className="text-gray-800 font-medium hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
