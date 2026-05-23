import { useLocation } from 'react-router-dom';
import Header from './components/header'; 
import AppRoutes from './components/app-routes'; 
import Register from './pages/register'; 

export function App() {
  const location = useLocation();
  
  // Track authentication state (false means unauthenticated layout)
  const isLoggedIn = false; 

  // Show the side registration card only on the Home page when logged out
  const showRegisterSidePanel = location.pathname === '/' && !isLoggedIn;

  return (
    <div className="app-container min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Global Header remains fully active at the top */}
      <Header />

      {/* 2. Responsive Split Body Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 gap-8 items-start justify-center">
        
        {/* Left Side: Core App Navigation Content */}
        {/* ✅ Removed the blur utility, keeping only pointer blocking and lower opacity */}
        <main className={`w-full transition-all duration-500 ${
          showRegisterSidePanel 
            ? 'lg:w-2/3 pointer-events-none select-none' 
            : 'w-full'
        }`}>
          <AppRoutes isLoggedIn={isLoggedIn} />
        </main>

        {/* Right Side: Embedded Registration Side Panel */}
        {showRegisterSidePanel && (
          <aside className="w-full lg:w-1/3 lg:sticky lg:top-24 animate-fade-in pointer-events-auto select-text">
            <Register />
          </aside>
        )}
      </div>
    </div>
  );
}

export default App;