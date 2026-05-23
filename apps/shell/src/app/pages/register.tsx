import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileCreatedBy, setProfileCreatedBy] = useState('Self');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, profileCreatedBy, gender }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-xs text-gray-500 mt-0.5">Join Knot & Event to discover matches and events</p>
        </div>

        {error && (
          <div className="p-2.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">{error}</div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600">Profile Created For</label>
            <select
              className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              value={profileCreatedBy}
              onChange={(e) => setProfileCreatedBy(e.target.value)}
            >
              <option value="Self">Self</option>
              <option value="Parents">Parents</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Gender</label>
            <div className="flex gap-3 text-sm">
              <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg w-1/2 cursor-pointer bg-gray-50">
                <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} className="text-pink-600" />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg w-1/2 cursor-pointer bg-gray-50">
                <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} className="text-pink-600" />
                <span>Female</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600">Email Address</label>
            <input type="email" required className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600">Password</label>
            <input type="password" required className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="w-full py-2.5 bg-pink-600 text-white text-sm font-bold rounded-lg hover:bg-pink-700 transition-colors shadow-md">
          Get Started
        </button>

        <p className="text-center text-xs text-gray-500">
          Already a member? <Link to="/login" className="font-semibold text-pink-600 no-underline hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;