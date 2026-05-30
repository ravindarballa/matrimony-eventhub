import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateProfile() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [religion, setReligion] = useState('');
  const [community, setCommunity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Extract the saved user metadata object we captured during login
    const savedUserStr = localStorage.getItem('user');
    if (!savedUserStr) {
      setError('No active session found. Please re-login.');
      return;
    }

    const userObj = JSON.parse(savedUserStr);
    const userId = userObj.id; // Match the JSON model shape returned by NestJS

    try {
      const response = await fetch('http://localhost:3000/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          fullName,
          dateOfBirth,
          religion,
          community,
          occupation
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile submission failed');
      }

      setMessage('Profile built and saved to MongoDB successfully!');
      setTimeout(() => navigate('/'), 2000); // Send them to dashboard home
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <form onSubmit={handleProfileSubmit} className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Matrimony Profile</h1>
          <p className="text-xs text-gray-500 mt-1">Provide your background information to start finding matches</p>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
        {message && <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg">{message}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input type="text" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
            <input type="date" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Religion</label>
              <input type="text" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="Hinduism, Christian, etc." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Community/Caste</label>
              <input type="text" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" value={community} onChange={(e) => setCommunity(e.target.value)} placeholder="Sub-community name" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Current Occupation</label>
            <input type="text" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Software Engineer / Business Manager" />
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-all shadow-md">
          Save Matrimony Profile
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
