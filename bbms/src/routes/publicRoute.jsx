import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const PublicRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return !session ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
