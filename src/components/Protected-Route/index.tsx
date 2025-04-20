import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
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

  if (unAuth && user) {
    return <Navigate to='/' />;
  }

  if (!user && !unAuth) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
