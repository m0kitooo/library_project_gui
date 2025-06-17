import { Link, useNavigate } from "react-router-dom";
import routes from "../routes.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

export default function UpperNavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${CORE_API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      logout();
      navigate(routes.login.path);
    }
  };

  return (
      <>
        <nav>
          <ul style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', listStyle: 'none'}}>
            <li>
              {isAuthenticated ? (
                  <button onClick={handleLogout}>
                    <span>Wyloguj się</span>
                  </button>
              ) : (
                  <Link to={routes.login.path}>
                    <button>
                      <span>Zaloguj się</span>
                    </button>
                  </Link>
              )}
            </li>
          </ul>
        </nav>
      </>
  )
}