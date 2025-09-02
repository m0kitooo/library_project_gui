import ROUTES from "../../routes.jsx";
import DefaultNavLink from "../DefaultNavlink/DefaultNavlink.jsx";
import styles from "./SideNavBar.module.css";
import Package from "../Package/Package.jsx";
import Notification from "../NotificationBar/Notification.jsx";

export default function SideNavBar() {
    return (
        <>
            <nav className={`base-wrapper ${styles.sideNavbarWrapper}`}>
                <ul className={styles.navBarList}>
                    <li>
                        <Package packageName={'Książki'}>
                            <DefaultNavLink to={ROUTES.addBook.path}>
                                Dodaj książkę
                            </DefaultNavLink>
                            <DefaultNavLink to={ROUTES.loanbook.path}>
                                Wypożycz książkę
                            </DefaultNavLink>
                        </Package>
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
                        <DefaultNavLink to={ROUTES.createLibraryCard.path}>
                            Stwórz kartę bliblioteczną
                        </DefaultNavLink>
                    </li>
                    <li>
                        <DefaultNavLink to={ROUTES.proposal.path}>
                            Propozycje
                        </DefaultNavLink>
                    </li>
                    <li>
                        <DefaultNavLink to={ROUTES.plans.path}>Plany wydarzeń</DefaultNavLink>
                    </li>
                    <li>
                        <DefaultNavLink to={ROUTES.libraryPayments.path}>
                            Płatności biblioteczne
                        </DefaultNavLink>
                    </li>
                    <li>
                        <Package packageName={'Członkowie'}>
                            <DefaultNavLink to={ROUTES.members.path}>
                                Członkowie
                            </DefaultNavLink>
                            <DefaultNavLink to={ROUTES.addMembers.path}>
                                Dodaj członka
                            </DefaultNavLink>
                        </Package>
                    </li>

                    <li>
                        <Notification />
                    </li>
                </ul>
            </nav>
        </>
    );
}
