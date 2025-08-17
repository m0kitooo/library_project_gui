import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import BasePageLayout from "../../components/BasePageLayout.jsx";
import useFetch from "../../hooks/useFetch.js";
import { Link } from "react-router-dom";
import useFetchDynamic from "../../hooks/useFetchDynamic.js";
import Toast from "../../components/Toast/Toast.jsx";
import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

export default function Members() {
  const [toast, setToast] = useState(null);
  const {data, loading, error} = useFetch(`${CORE_API_BASE_URL}/members`, { 
    credentials: 'include'}
  );
  const { fetcher } = useFetchDynamic();

  const createLibraryCard = (memberId) => {
    fetcher(`${CORE_API_BASE_URL}/library-cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // memberId: memberId,
        expiryDate: "2030-05-21"
      }),
      credentials: "include"
    });
    setToast({ message: "Stworzono kartę biblioteczną!" });
  };

  return (
    <BasePageLayout>
      <SearchBar searchMethod={() => {}}></SearchBar>
      {loading && <span>Loading...</span>}
      {!loading && !error && (
        <ul>
        {data.map(member => (
          <li key={member.id}>
            <span>{`Imię: ${member.name}`}</span>
            <span>{`Nazwisko: ${member.surname}`}</span>
            <span>{`Pesel: ${member.pesel}`}</span>
            <button onClick={() => createLibraryCard(member.id)}>Stwórz Kartę Biblioteczną</button>
            <Link to={`/members/${member.id}`}>Szczegóły</Link>
          </li>
        ))}
      </ul>
      )}
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </BasePageLayout>
  );
}
