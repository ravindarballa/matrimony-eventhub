import * as React from 'react';
import { Route, Routes, NavLink, Link } from 'react-router-dom';
import { loadRemote } from '@module-federation/enhanced/runtime';
import Login from '../pages/login';
import Register from '../pages/register';

type RemoteComponent = { default: React.ComponentType<any> };

const Matrimony = React.lazy(() =>
  loadRemote<RemoteComponent>('matrimony/Module').then((m) => m || Object.create(null))
);

const Eventhub = React.lazy(() =>
  loadRemote<RemoteComponent>('eventhub/Module').then((m) => m || Object.create(null))
);

interface AppRoutesProps {
  isLoggedIn: boolean;
}

export function AppRoutes({ isLoggedIn }: AppRoutesProps) {
  return (
    <React.Suspense fallback={<div className="text-center p-8 text-gray-500">Loading App...</div>}>
      <Routes>
        {/* Home Page Layout */}
        <Route 
          path="/" 
          element={
            <div className="flex flex-col text-left w-full">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                Discover Your Milestones
              </h1>
              
              {/* ✅ Updated with your customized text */}
              <p className="text-sm text-gray-500 mb-6 max-w-xl leading-relaxed">
                {isLoggedIn 
                  ? "Select a premium platform link below to manage your operations." 
                  : <>Once you <Link to="/login" className="text-pink-600 hover:underline font-medium">login</Link> or <Link to="/register" className="text-pink-600 hover:underline font-medium">register</Link> then you can access the services.</>}
              </p>
              
              {/* Dynamic responsive grid */}
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                
                {/* Matrimony Link Card */}
                <NavLink 
                  to="/matrimony" 
                  onClick={(e) => !isLoggedIn && e.preventDefault()} 
                  className={`flex flex-col items-start p-6 bg-white border rounded-xl no-underline transition-all duration-300 ${
                    isLoggedIn 
                      ? "border-gray-200 shadow-sm hover:shadow-lg hover:border-pink-400 cursor-pointer" 
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 text-xl text-pink-500">❤️</div>
                  <span className="text-lg font-bold text-gray-800">Matrimony</span>
                  <p className="text-gray-500 mt-1 text-xs leading-relaxed">Find your perfect life partner and browse matchmaking directories safely.</p>
                </NavLink>

                {/* Event Hub Link Card */}
                <NavLink 
                  to="/eventhub" 
                  onClick={(e) => !isLoggedIn && e.preventDefault()} 
                  className={`flex flex-col items-start p-6 bg-white border rounded-xl no-underline transition-all duration-300 ${
                    isLoggedIn 
                      ? "border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-400 cursor-pointer" 
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-xl text-blue-500">🎉</div>
                  <span className="text-lg font-bold text-gray-800">Event Hub</span>
                  <p className="text-gray-500 mt-1 text-xs leading-relaxed">Plan, organize, and track unforgettable celebrations all in one dashboard.</p>
                </NavLink>
              </nav>
            </div>
          } 
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div className="max-w-md mx-auto mt-8"><Register /></div>} />
        
        <Route path="/matrimony/*" element={isLoggedIn ? <Matrimony /> : <Login />} />
        <Route path="/eventhub/*" element={isLoggedIn ? <Eventhub /> : <Login />} />
      </Routes>
    </React.Suspense>
  );
}

export default AppRoutes;