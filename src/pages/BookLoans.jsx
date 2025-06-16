import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useEffect, useState} from "react";

export default function BookLoans() {
  const [bookLoans, setBookLoans] = useState([]);

  const fetchBookLoans = async () => {
    const response = await fetch(`${CORE_API_BASE_URL}/book-loans`, {
      credentials: 'include'
    });
    setBookLoans(await response.json());
  }

  useEffect(() => {
    fetchBookLoans();
  }, [fetchBookLoans]);

  return (
    <>
      <BasePageLayout>
        <div style={{display: 'grid', flex: 1}}>
          <SearchBar></SearchBar>
          <ul style={{listStyle: 'none', padding: 0}}>
            {bookLoans.map((bookLoan) =>
              <li key={bookLoan.id}>
                <span>{`Wypożyczone przez ${bookLoan.member}`}</span>
                <span>{`książka ${bookLoan.book}`}</span>
              </li>
            )}
          </ul>
        </div>
      </BasePageLayout>
    </>
  );
}