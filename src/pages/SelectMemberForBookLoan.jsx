import BasePageLayout from "../components/BasePageLayout/BasePageLayout.jsx";
import {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.js";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import routes from "../routes.jsx";
import BackButton from "../components/BackButton/BackButton.jsx";
import Toast from "../components/Toast/Toast.jsx";
import useFetch from "../hooks/useFetch.js";
import ROUTES from "../routes.jsx";
import DefaultNavLink from "../components/DefaultNavLink/DefaultNavLink.jsx";

export default function SelectMemberForBookLoan() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const { bookId } = useParams();
  const [toast, setToast] = useState();
  const { data: bookData, loading: bookLoading, error: bookError } = useFetch(`${CORE_API_BASE_URL}/books/${bookId}`, {credentials: 'include'});

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

  const fetchMembers = () => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/members`, {
          credentials: 'include'
        });
        const jsonData = await response.json();
        setMembers(jsonData);
      } catch (error) {
        console.error('Error: ', error);
      }
    })();
  };

  useEffect(() =>  {
    fetchMembers()
  }, []);

  return (
    <>
      <BasePageLayout>
        <SearchBar/>
        <BackButton fallbackRoute={ROUTES.books.path}/>
        {bookLoading && <span>Ładowanie...</span>}
        <span>Książka: {bookData?.title}</span>
        <ul className={'ul-reset'}>
          {members.length === 0 ? (
            <li>Brak członków do wyświetlenia</li>
          ) : (
            members.map(member =>
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
      </BasePageLayout>
      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
