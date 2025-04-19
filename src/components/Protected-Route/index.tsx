import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'src/services/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
