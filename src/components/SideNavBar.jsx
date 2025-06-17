import {NavLink, Link} from "react-router-dom";
import ROUTES from "../routes.jsx";

export default function SideNavBar() {
  return (
      <>
        <nav className={'base-wrapper'}>
          <ul style={{listStyle: 'none', textAlign: 'left'}}>
            <li>
              <NavLink
                  to={ROUTES.app.path}
                  end
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <span>Strona główna</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                  to={ROUTES.addBook.path}
                  end
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <span>Dodaj książkę</span>
              </NavLink>
            </li>
            <li>
              <Link to={ROUTES.loanbook.path}>
                <span>Wypożycz książkę</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.returnBook.path}>
                <span>Zwróć książkę</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.reservations.path}>
                <span>Rezerwacje</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.dispose.path}>
                <span>Utylizacje</span>
              </Link>
            </li>
            <li>
              <span>Stwórz karte blibloiteczną</span>
            </li>
            <li>
              <NavLink
                  to={ROUTES.proposal.path}
                  end
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <span>Propozycje</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                  to={ROUTES.libraryPayments.path}
                  end
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <span>Płatności biblioteczne</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                  to={ROUTES.addLibraryPayments.path}
                  end
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <span>Dodaj płatność biblioteczną</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                  to={ROUTES.bookLoans.path}
                  end
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <span>Wypożycznia książek</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </>
  );
}