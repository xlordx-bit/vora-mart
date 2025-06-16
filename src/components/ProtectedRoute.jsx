import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // If still loading auth state, show nothing (or could show a loading spinner)
  if (loading) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If authenticated, show the protected content
  return children;
}

export default ProtectedRoute;
