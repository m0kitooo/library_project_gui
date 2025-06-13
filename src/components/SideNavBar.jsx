import {Link} from "react-router-dom";
import ROUTES from "../routes.jsx";

export default function SideNavBar() {
  return (
      <>
        <nav className={'base-wrapper'}>
          <ul style={{listStyle: 'none', textAlign: 'left'}}>
            <li>
              <Link to={ROUTES.app.path}>
                <span>Strona główna</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.addBook.path}>
                <span>Dodaj książkę</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.returnBook.path}>
                <span>Zwróć książkę</span>
              </Link>
            </li>
            <li>
              <span>Stwórz karte blibloiteczną</span>
            </li>
            <li>
              <Link to={ROUTES.proposal.path}>
                <span>Propozycje</span>
              </Link>
            </li>
            <li>

            </li>
          </ul>
        </nav>
      </>
  )
}