// Make sure to correct the import path for useAppSelector
import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (user.email && !isLoading) {
    // Redirect to login page if user is authenticated
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  // Render the children if user is not authenticated
  return children;
}
