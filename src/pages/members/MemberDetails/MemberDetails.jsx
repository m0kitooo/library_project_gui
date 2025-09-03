import BackButton from "../../../components/BackButton/BackButton";
import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout";
import useFetch from "../../../hooks/useFetch";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl";
import { useParams } from "react-router-dom";
import ROUTES from "../../../routes";
import styles from "./MemberDetails.module.css";
import DefaultNavLink from "../../../components/DefaultNavLink/DefaultNavLink";

export default function MemberDetails() {
    const { memberId } = useParams();

    const { data: memberData, loading: memberLoading, error: memberError } = useFetch(
        `${CORE_API_BASE_URL}/members/${memberId}`,
        { credentials: "include" }
    );

    const { data: activeCard, loading: activeCardLoading, error: activeCardError } = useFetch(
        `${CORE_API_BASE_URL}/library-cards/members/${memberId}/active-card`,
        { credentials: "include" }
    );

    const { data: inactiveCards, loading: inactiveCardsLoading, error: inactiveCardsError } = useFetch(
        `${CORE_API_BASE_URL}/library-cards/members/${memberId}/inactive-cards`,
        { credentials: "include" }
    );

    const { data: loanData, loading: loanLoading, error: loanError } = useFetch(
        `${CORE_API_BASE_URL}/members/${memberId}/book-loans`,
        { credentials: "include" }
    );

    return (
        <BasePageLayout>
            <BackButton fallbackRoute={ROUTES.members.path} />

            {memberLoading && <p>Ładowanie danych członka...</p>}
            {memberError && <p>Wystąpił błąd: {String(memberError.message || memberError)}</p>}
            {memberData && (
                <div>
                    <h2>Szczegóły członka</h2>
                    <div className={styles.memberDataWrapper}>
                        <span>Imię: {memberData.name}</span>
                        <span>Nazwisko: {memberData.surname}</span>
                        <span>Email: {memberData.email}</span>
                        <span>Pesel: {memberData.pesel}</span>
                        <span>Data urodzenia: {new Date(memberData.birthday).toLocaleDateString("pl-PL")}</span>
                        <span>Adres: {memberData.address}</span>
                    </div>
                </div>
            )}

            <h2>Aktywna karta biblioteczna</h2>
            {activeCardLoading && <p>Ładowanie...</p>}
            {activeCardError && <p>Brak aktywnej karty</p>}
            {activeCard ? (
                <div>
                    <p>Numer: {activeCard.id}</p>
                    <p>Ważna do: {new Date(activeCard.expiryDate).toLocaleDateString("pl-PL")}</p>
                </div>
            ) : !activeCardLoading && !activeCardError ? (
                <p>Brak aktywnej karty</p>
            ) : null}

            <h2>Historia kart bibliotecznych</h2>
            {inactiveCardsLoading && <p>Ładowanie...</p>}
            {inactiveCardsError && <p>Wystąpił błąd: {String(inactiveCardsError.message || inactiveCardsError)}</p>}
            {inactiveCards && inactiveCards.length > 0 ? (
                <ul>
                    {inactiveCards.map((card) => (
                        <li key={card.id}>
                            Numer: {card.id}, ważna do: {new Date(card.expiryDate).toLocaleDateString("pl-PL")}
                        </li>
                    ))}
                </ul>
            ) : !inactiveCardsLoading && !inactiveCardsError ? (
                <p>Brak nieaktywnych kart</p>
            ) : null}

            <h2>Historia wypożyczeń</h2>
            {loanLoading && <p>Ładowanie danych...</p>}
            {loanError && <p>Wystąpił błąd: {String(loanError.message || loanError)}</p>}
            {loanData && loanData.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Tytuł</th>
                        <th>Autor</th>
                        <th>Data wypożyczenia</th>
                        <th>Zakończone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loanData.map((loan) => (
                        <tr key={loan.id}>
                            <td>
                                <DefaultNavLink to={`${ROUTES.books.path}/${loan.book.id}`}>
                                    {loan.book.title}
                                </DefaultNavLink>
                            </td>
                            <td>{loan.book.author}</td>
                            <td>{new Date(loan.loanDate).toLocaleDateString("pl-PL")}</td>
                            <td>{loan.archived ? "Tak" : "Nie"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : !loanLoading && !loanError ? (
                <p>Brak historii wypożyczeń</p>
            ) : null}
        </BasePageLayout>
    );
}
