import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../../../coreApiBaseUrl.js";
import {Link} from "react-router-dom";
import ROUTES from "../../../../routes.jsx";
import SearchBar from "../../../../components/SearchBar/SearchBar.jsx";
import Toast from "../../../../components/Toast/Toast.jsx";
import routes from "../../../../routes.jsx";
import BasePageLayout from "../../../../components/BasePageLayout/BasePageLayout.jsx";
import styles from './Books.module.css';
import usePageTitle from "../../../../hooks/usePageTitle.js";

export default function Books() {
  const [toast, setToast] = useState(null);
  const [books, setBooks] = useState([]);
  usePageTitle("Książki");
  // const {data: loanData, loading: loanLoading, error: loanError, fetcher: loanFetcher} = useFetchDynamic();

  const fetchBooks = useCallback(
    (title) => {
      title = typeof title === 'string' ? title : '';

      (async () => {
        try {
          const response = await fetch(`${CORE_API_BASE_URL}/books?phrase=${title}`, {
            credentials: 'include'
          });
          const booksData = await response.json();
          setBooks(booksData);
        } catch (error) {
          console.error('Error: ', error)
        }
      })();
    }, []
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleBookDelete = async id => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setToast({ message: "Usunięto książkę!", id: Date.now() });
      } else {
        const errorData = await response.json();
        if (errorData.code === 'BOOK_002') {
          alert('Nie można usunąć książki, która jest wypożyczona lub zarezerwowana');
        } else {
          alert('Coś poszło nie tak...');
        }
      }
    } catch (error) {
      alert('Coś poszło nie tak...');
      console.error('Error: ', error)
    }
  };

  return (
    <>
      <BasePageLayout>
        <SearchBar searchMethod={fetchBooks}></SearchBar>
        <div>
          <ul className={styles.bookList}>
            {Array.isArray(books) && books.map((book) =>
              <li key={book.id} className={`${styles.bookListItem} base-wrapper`}>
                <span>{`Tytuł: ${book.title}`}</span>
                <span>{`Autor: ${book.author}`}</span>
                <span>
                  Status: {
                    book?.status === "LOANED" ? (
                      <span className={styles.redText}>Wypożyczona</span>
                    ) : book?.status === "RESERVED" ? (
                      <span className={styles.redText}>Zarezerwowana</span>
                    ) : (
                      <span className={styles.greenText}>Dostępna</span>
                    )
                  }
                </span>

                {/* <span>{`Wypożyczonych: ${loanQuantities[book.id] || 0}`}</span> */}
                <Link to={routes.bookDetails.buildPath(book.id)}><span>Szczegóły</span></Link>
                <button onClick={async () => {
                  await handleBookDelete(book.id);
                  fetchBooks();
                }}>
                  Usuń
                </button>
                <Link to={ROUTES.updateBook.buildPath(book.id)}><span>Zaktualizuj</span></Link>
                {book?.status === "AVAILABLE" && (
                  <Link to={ROUTES.selectMemberForBookLoan.buildPath(book.id)}>
                    <span>Wypożycz</span>
                  </Link>
                )}
              </li>
            )}
          </ul>
        </div>
      </BasePageLayout>
      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </>
  )
}