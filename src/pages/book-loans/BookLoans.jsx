import BasePageLayout from "../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import SearchBar from "../../components/SearchBar.jsx";
import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import routes from "../../routes.jsx";

export default function BookLoans() {
  const [bookLoans, setBookLoans] = useState([]);

  const fetchBookLoans = useCallback(
      async () => {
        const response = await fetch(`${CORE_API_BASE_URL}/book-loans`, {
          credentials: 'include'
        });
        setBookLoans(await response.json());
      }, []
  );

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
              <li key={bookLoan.id} className={'base-wrapper'}>
                <span>{`Wypożyczone przez ${bookLoan.member.name} ${bookLoan.member.surname}`}</span>
                <Link to={routes.bookDetails.buildPath(bookLoan.book.id)}>
                  <span>{`książka ${bookLoan.book.title}`}</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </BasePageLayout>
    </>
  );
}