import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/UserContext";
import { ReactNode, FC } from 'react';

// Definiera props-typen
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  //Laddar-indikator
  if (loading) {
    return <div>Laddar...</div>;
  }
  
  // Omdirigera till login om användaren inte är autentiserad
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Returnera den skyddade routen om användaren är autentiserad
  return <>{children}</>;
};

export default ProtectedRoute;