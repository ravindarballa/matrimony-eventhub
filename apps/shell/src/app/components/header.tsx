import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const isLoggedIn = false; 
  const location = useLocation();

  // Determine if the user is currently on the root home page
  const isHomePage = location.pathname === '/';
  const isNotLoginPage = location.pathname !== '/login';
  return (
    <>
      {/* Top Navbar - Always visible on every page */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#282c34] text-white shadow-md">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white no-underline hover:text-blue-400 transition-colors">
            Knot & Event
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium">Welcome, User!</span>
              <button className="px-4 py-2 bg-[#61dafb] text-[#282c34] font-bold rounded hover:bg-blue-400 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
            {isNotLoginPage &&    <div className='loginEnable'> 
            Already Member?
              <Link to="/login" className="text-[#61dafb] no-underline text-lg hover:text-blue-400 transition-colors">
                Login
              </Link>
              {/* <Link to="/register" className="px-4 py-2 bg-[#61dafb] text-[#282c34] font-bold rounded no-underline hover:bg-blue-400 transition-colors">
                Register
              </Link> */}
              </div>}
         
            </>
          )}
        </div>
      </header>

      {/* Main Page Navigation Tiles - ONLY rendered on the home page "/" */}
      {isHomePage && (
        <div className="flex flex-col items-center justify-center  bg-gray-50 px-4">
         {/* <h1 className="text-2xl font-semibold text-gray-800 mb-8 max-w-2xl leading-relaxed">
      Access our specialized services directly if you are an active member. 
      New users, please <Link to="/login" className="text-pink-600 hover:underline">log in</Link> or <Link to="/register" className="text-pink-600 hover:underline">register</Link> to get started.
    </h1> */}
          
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Matrimony Tile */}
            {/* <NavLink 
              to="/matrimony" 
              className="flex flex-col items-center justify-center p-10 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 no-underline text-center group"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 text-pink-500 group-hover:scale-110 transition-transform">
                ❤️
              </div>
              <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
                Matrimony
              </span>
              <p className="text-gray-500 mt-2 text-sm max-w-xs">
                Find your perfect life partner and manage matchmaking profiles seamlessly.
              </p>
            </NavLink> */}

            {/* Event Hub Tile */}
            {/* <NavLink 
              to="/eventhub" 
              className="flex flex-col items-center justify-center p-10 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 no-underline text-center group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                🎉
              </div>
              <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
                Event Hub
              </span>
              <p className="text-gray-500 mt-2 text-sm max-w-xs">
                Plan, organize, and discover unforgettable events all in one place.
              </p>
            </NavLink> */}
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;