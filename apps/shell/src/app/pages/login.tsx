import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Send credentials to your NestJS backend
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save JWT token for the session
      localStorage.setItem('token', data.accessToken);
      
      // Redirect back to the central hub dashboard
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-[85vh] bg-gray-100">
      {/* Left Column: Branding / Marketing Visual */}
      <div className="hidden lg:flex w-1/2 bg-cover bg-center items-center p-12 bg-gradient-to-tr from-pink-500 to-rose-600 text-white">
        <div className="max-w-md">
          <h2 className="text-4xl font-extrabold mb-4">Find Your Perfect Life Partner</h2>
          <p className="text-lg opacity-90">Join thousands of verified members managing matchmaking profiles seamlessly on our unified platform.</p>
        </div>
      </div>

      {/* Right Column: Interactive Login Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-8 bg-white">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Please enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 active:scale-[0.98] transition-all shadow-md shadow-pink-200"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-pink-600 no-underline hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;