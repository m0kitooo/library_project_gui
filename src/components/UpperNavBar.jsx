import {Link} from "react-router-dom";
import routes from "../routes.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";

export default function UpperNavBar() {
  const logOutFetch = async () => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      console.log(response);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
      <>
        <nav>
          <ul style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', listStyle: 'none'}}>
            <li>
              <Link to={routes.login.path}>
                <button>
                  <span>Zaloguj się</span>
                </button>
              </Link>
              <button onClick={logOutFetch}>
                <span>Wyloguj się</span>
              </button>
            </li>
          </ul>
        </nav>
      </>
  )
}