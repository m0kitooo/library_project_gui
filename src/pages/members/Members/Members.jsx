import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import useFetch from "../../../hooks/useFetch.js";
import { Link } from "react-router-dom";
import useFetchDynamic from "../../../hooks/useFetchDynamic.js";
import Toast from "../../../components/Toast/Toast.jsx";
import { useState, useEffect } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar.jsx";
import ROUTES from "../../../routes.jsx";
import styles from './Members.module.css';

export default function Members() {
  const [toast, setToast] = useState(null);
  const {data, loading, error} = useFetch(`${CORE_API_BASE_URL}/members`, { 
    credentials: 'include'}
  );
  const { 
    data: addLibraryCardData,
    error: addLibraryCardError,
    fetcher: addLibraryCardFetcher 
  } = useFetchDynamic();

  const createLibraryCard = (memberId) => {
    addLibraryCardFetcher(`${CORE_API_BASE_URL}/library-cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: memberId,
        expiryDate: "2030-05-21"
      }),
      credentials: "include"
    });
  };

  useEffect(() => {
    if (addLibraryCardError && addLibraryCardData?.code === 'LIBRARY_CARD_002')
      alert('Członek posiada już aktywną kartę biblioteczną');
    if (addLibraryCardData && !addLibraryCardError) {
      setToast({ message: "Stworzono kartę biblioteczną!" });
    }
  }, [addLibraryCardError, addLibraryCardData]);

  return (
    <BasePageLayout>
      <SearchBar searchMethod={() => {}}></SearchBar>
      {loading && <span>Loading...</span>}
      {!loading && !error && (
        <ul className={styles.memberList}>
        {data.map(member => (
          <li key={member.id} className={`${styles.memberLi} base-wrapper`}>
            <span>{`Imię: ${member.name}`}</span>
            <span>{`Nazwisko: ${member.surname}`}</span>
            <span>{`Pesel: ${member.pesel}`}</span>
            <button onClick={() => createLibraryCard(member.id)}>Stwórz Kartę Biblioteczną</button>
            <Link to={ROUTES.memberDetails.buildPath(member.id)}>Szczegóły</Link>
          </li>
        ))}
      </ul>
      )}
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </BasePageLayout>
  );
}
