import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ROUTES from '../routes';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Użytkownik nie jest zalogowany, przekieruj do strony logowania
        return <Navigate to={ROUTES.login.path} />;
    }

    return children;
};

export default ProtectedRoute;