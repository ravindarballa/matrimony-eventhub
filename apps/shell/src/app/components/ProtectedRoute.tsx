import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // If no token exists, boot the visitor back to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children routes dynamically
  return <Outlet />;
}

export default ProtectedRoute;
