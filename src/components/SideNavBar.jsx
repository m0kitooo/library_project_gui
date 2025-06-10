import {Link} from "react-router-dom";

export default function SideNavBar() {
  return (
      <>
        <nav className={'base-wrapper'}>
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