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
    `${CORE_API_BASE_URL}/members/${memberId}`, {
      credentials: 'include'
    }
  );
  const { data: loanData, loading: loanLoading, error: loanError } = useFetch(
    `${CORE_API_BASE_URL}/members/${memberId}/book-loans`, {
      credentials: 'include'
    }
  );

  return (
    <BasePageLayout>
      <BackButton fallbackRoute={ROUTES.members.path}/>
      {memberLoading && <p>Ładowanie danych członka...</p>}
      {memberError && <p>Wystąpił błąd: {memberError}</p>}
      {memberData && (
        <div>
          <h2>Szczegóły członka</h2>
          <div className={`${styles.memberDataWrapper}`}>
            <span>Imię: {memberData.name}</span>
            <span>Nazwisko: {memberData.surname}</span>
            <span>Email: {memberData.email}</span>
            <span>Pesel: {memberData.pesel}</span>
            <span>Data urodzenia: {new Date(memberData.birthday).toLocaleDateString("pl-PL")}</span>
            <span>Adres: {memberData.address}</span>
          </div>
        </div>
      )}
      <h2>Historia karty bibliotecznej</h2>
      
      <h2>Historia wypożyczeń</h2>
      {loanLoading && <p>Ładowanie danych...</p>}
      {loanError && <p>Wystąpił błąd: {loanError}</p>}
      {loanData && (
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
            {loanData.map(loan => (
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
        </table>)}
    </BasePageLayout>
  )
}
