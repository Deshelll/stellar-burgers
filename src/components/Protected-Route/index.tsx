import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from 'src/services/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  unAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  unAuth = false
}: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (unAuth && user) {
    return <Navigate to={from} />;
  }

  if (!user && !unAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
