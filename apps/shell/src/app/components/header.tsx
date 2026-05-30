import { Link, useLocation, useNavigate } from 'react-router-dom';

// 1. Define the props interface to fix the TypeScript TS2322 compile error
interface HeaderProps {
  isLoggedIn: boolean;
}

export function Header({ isLoggedIn }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if the user is currently on the root home page
  const isHomePage = location.pathname === '/';
  const isNotLoginPage = location.pathname !== '/login';

  // 2. Handle Logout by clearing storage assets and redirecting
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Top Navbar - Always visible on every page */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-[#282c34] text-white shadow-md">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white no-underline hover:text-blue-400 transition-colors">
            Knot & Event
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium text-gray-300">Welcome, User!</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {isNotLoginPage && (
                <div className="loginEnable text-gray-300">
                  Already Member?{' '}
                  <Link to="/login" className="text-[#61dafb] no-underline text-lg hover:text-blue-400 transition-colors ml-1">
                    Login
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main Page Navigation Tiles - ONLY rendered on the home page "/" */}
      {isHomePage && (
        <div className="flex flex-col items-center justify-center bg-gray-50 px-4">
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Navigation tile hooks will be rendered here dynamically based on membership */}
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;
