import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const nav = useNavigate();

  // State for each form field and loading indicator
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles signup form submission
  const onSignupSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Data to send to backend
    const signupPayload = {
      name: fullName,
      email: userEmail,
      password: pwd
    };

    try {
      // Make signup API request
      const resp = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupPayload)
      });

      const respData = await resp.json();

      // If signup is successful, show success message and redirect
      if (resp.ok) {
        alert('Signup successful!');
        nav('/login');
      } 
      // Handle any server-side validation or failure messages
      else {
        alert(respData.message || 'Signup failed for some reason.');
      }
    } catch (fetchErr) {
      // Network or unexpected error handling
      console.error(fetchErr);
      alert("Something went wrong while signing up. Try again later.");
    } finally {
      // Re-enable button after request completes
      setIsSubmitting(false);
    }
  };

  return (
    // Centered signup container
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Create Account
        </h1>
        <p className="text-sm text-center text-gray-300 mb-6">
          Join us and start your fitness journey 🚀
        </p>

        {/* Signup Form */}
        <form onSubmit={onSignupSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Choose a secure password"
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-semibold shadow transition-colors duration-300"
          >
            {isSubmitting ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link for existing users */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-400 font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
