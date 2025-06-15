import {Link} from "react-router-dom";
import routes from "../routes.jsx";

export default function UpperNavBar() {
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
              {/*<button>*/}
              {/*  <span>Wyloguj się</span>*/}
              {/*</button>*/}
            </li>
          </ul>
        </nav>
      </>
  )
}