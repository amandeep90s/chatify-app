import { Navigate, Outlet } from 'react-router';

function ProtectedRoute({ children, user, redirect = '/login' }) {
  if (!user) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
