import ROUTES from "../../routes.jsx";
import DefaultNavLink from "../DefaultNavlink/DefaultNavlink.jsx";
import styles from "./SideNavBar.module.css";

export default function SideNavBar() {
  return (
      <>
        <nav className={'base-wrapper'}>
          <ul className={styles.navBarList}>
            <li>
              <DefaultNavLink to={ROUTES.books.path}>
                Strona główna
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.addBook.path}>
                Dodaj książkę
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.loanbook.path}>
                Wypożycz książkę
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.bookLoans.path}>
                Wypożyczenia książek
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.returnBook.path}>
                Zwróć książkę
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.reservations.path}>
                Rezerwacje
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.dispose.path}>
                Utylizacje
              </DefaultNavLink>
            </li>
            <li>
              <span>Stwórz karte blibloiteczną</span>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.proposal.path}>
                Propozycje
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.libraryPayments.path}>
                Płatności biblioteczne
              </DefaultNavLink>
            </li>
            <li>
              <DefaultNavLink to={ROUTES.members.path}>
                Dodaj płatność biblioteczną
              </DefaultNavLink>
            </li>
          </ul>
        </nav>
      </>
  );
}