import BasePageLayout from "../components/BasePageLayout/BasePageLayout.jsx";
import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.js";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import {useParams} from "react-router-dom";
import BackButton from "../components/BackButton/BackButton.jsx";
import Toast from "../components/Toast/Toast.jsx";
import useFetch from "../hooks/useFetch.js";
import ROUTES from "../routes.jsx";
import DefaultNavLink from "../components/DefaultNavLink/DefaultNavLink.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import useFetchDynamic from "../hooks/useFetchDynamic.js";

export default function SelectMemberForBookLoan() {
  usePageTitle("Wybierz członka do wypożyczenia książki");

  const {data: memberData, loading: memberLoading, error: memberError, fetcher: memberFetcher} = useFetchDynamic();
  const { bookId } = useParams();
  const [toast, setToast] = useState();
  const { data: bookData, loading: bookLoading, error: bookError } = useFetch(`${CORE_API_BASE_URL}/books/${bookId}`, {credentials: 'include'});

  const searchMembers = useCallback((phrase) => {
    const fetchMembers = async () => {
      await memberFetcher(
        `${CORE_API_BASE_URL}/members?phrase=${phrase || ''}`,
        { credentials: 'include' }
      );
    };
  
    fetchMembers();
  }, []);

  useEffect(() => {
    searchMembers();
  }, [searchMembers]);

  const doesMemberHasActiveLibraryCard = async memberId => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/library-cards/members/${memberId}/active-card`, {
        credentials: 'include'
      });
      return response.ok;
    } catch (error) {
      console.error('Error: ', error);
    }
    return false;
  }

  return (
    <>
      <BasePageLayout>
        <SearchBar searchMethod={searchMembers}/>
        <BackButton fallbackRoute={ROUTES.books.path}/>
        {bookLoading && <span>Ładowanie...</span>}
        <span>Książka: {bookData?.title}</span>
        <span>Wybierz członka do wypożyczenia:</span>
        {memberLoading && <span>Loading...</span>}
        {!memberLoading && !memberError && memberData && Array.isArray(memberData) && (
          <ul className={'ul-reset'}>
            {memberData.length === 0 ? (
              <li>Brak</li>
            ) : (
              memberData.map(member =>
                <li key={member.id} className={'base-wrapper'}>
                  <span>{member.name}</span>
                  <span>{member.surname}</span>
                  <DefaultNavLink to={`${ROUTES.members.path}/${member.id}`}>Szczegóły</DefaultNavLink>
                  <button onClick={async () => {
                    if (!await doesMemberHasActiveLibraryCard(member.id)) {
                      alert('Czytelnik nie posiada karty bibliotecznej, nie można wypożyczyć');
                      return;
                    }

                    try {
                      const response = await fetch(`${CORE_API_BASE_URL}/book-loans`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          bookId: bookId,
                          memberId: member.id
                        }),
                        credentials: 'include'
                      });
                      if (response.ok)
                        setToast({message: 'Książka została wypożyczona'});
                      else {
                        const errorData = await response.json();
                        if (errorData.code === 'BOOK_001')
                          setToast({message: 'Książka nie istnieje lub jest niedostępna', id: Date.now()});
                        if (errorData.code === 'BOOK_LOAN_003')
                          setToast({message: 'Czytelnik aktualnie wypożycza już tę książkę', id: Date.now()});
                        if (errorData.code === 'MEMBER_003')
                          setToast({message: 'Czytelnik wypożycza już maksymalną ilość książek (5)', id: Date.now()});
                      }
                    } catch (error) {
                      console.error('Error: ', error)
                      setToast({message: 'Wystąpił błąd podczas wypożyczania książki', id: Date.now()});
                    }
                  }}>
                    Wypożycz
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </BasePageLayout>
      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
