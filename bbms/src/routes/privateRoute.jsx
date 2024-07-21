import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const PrivateRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
