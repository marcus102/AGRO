import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // TODO: Implement actual password reset request logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error requesting password reset:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {isSubmitted ? (
          <>
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Success!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We've sent a password reset link to
            </p>
            <p className="mt-1 text-center text-lg font-medium text-gray-900">
              {submittedEmail}
            </p>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please check your email and follow the instructions to reset your password.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:text-white bg-primary-DEFAULT hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT"
              >
                Go to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset your password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:text-white bg-primary-DEFAULT hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send reset link'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <p className="text-center text-sm text-gray-600">
                Click the link in the email to reset your password. If you don't see the email, check
                your spam folder.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:text-white bg-primary-DEFAULT hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT"
                >
                  Try another email
                </button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-primary-DEFAULT hover:text-primary-dark"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}