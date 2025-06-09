import {Link} from "react-router-dom";

export default function SideNavBar() {
  return (
      <>
        <nav>
          <ul style={{listStyle: 'none'}}>
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
              <span>Stwórz karte biblioteczną</span>
            </li>
            <li>
              <span>Stwórz karte blibloiteczną</span>
            </li>
          </ul>
        </nav>
      </>
  )
}