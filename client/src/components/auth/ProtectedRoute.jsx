import { Navigate, Outlet } from 'react-router';

function ProtectedRoute({ children, user, redirect = '/login', requireAuth = true }) {
  // If requireAuth is true, user must be authenticated
  // If requireAuth is false, user must NOT be authenticated (e.g., login page)
  const isAuthenticated = Boolean(user);
  const shouldRedirect = requireAuth ? !isAuthenticated : isAuthenticated;

  if (shouldRedirect) {
    return <Navigate to={redirect} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
