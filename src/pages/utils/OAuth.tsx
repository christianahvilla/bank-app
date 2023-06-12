import { Navigate } from 'react-router-dom';

interface IOAuth {
  children: JSX.Element;
}

export const OAuth = ({ children }: IOAuth) => {
  const isUserAuthenticated = Boolean(localStorage.getItem('user'));

  if (isUserAuthenticated) {
    return <Navigate to='/bank' replace />;
  }

  return children;
};
