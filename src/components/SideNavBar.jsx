import {Link} from "react-router-dom";

export default function SideNavBar() {
  return (
      <>
        <nav style={{backgroundColor: '#1a1a1a'}}>
          <ul style={{listStyle: 'none', textAlign: 'left'}}>
            <li>
              <Link to={"/"}>
                <span>Strona główna</span>
              </Link>
            </li>
            <li>
              <Link to={"/add"}>
                <span>Dodaj książkę</span>
              </Link>
            </li>
            <li>
              <span>Stwórz karte blibloiteczną</span>
            </li>
            <li>
              <Link to={"/proposal"}>
                <span>Propozycje</span>
              </Link>
            </li>
          </ul>
        </nav>
      </>
  )
}