import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import {Link} from "react-router-dom";
import ROUTES from "../routes.jsx";
import SearchBar from "./SearchBar.jsx";
import Toast from "./Toast/Toast.jsx";

export default function SearchWrapper() {
  const [toast, setToast] = useState(null);

  const [books, setBooks] = useState([]);
  const [loanedStatus, setLoanedStatus] = useState({});

  const fetchBooks = useCallback(
    (title) => {
      title = typeof title === 'string' ? title : '';

      (async () => {
        try {
          const response = await fetch(`${CORE_API_BASE_URL}/books?title=${title}`, {
            credentials: 'include'
          });
          const booksData = await response.json();
          setBooks(booksData);

          const statuses = {};
          for (const book of booksData) {
            statuses[book.id] = await isBookLoaned(book.id);
          }
          setLoanedStatus(statuses);
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
      if (response.ok)
        setToast({ message: "Usunięto książkę!", id: Date.now() });
    } catch (error) {
      console.error('Error: ', error)
    }
  };

  const isBookLoaned = async bookId => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/book-loans/books/${bookId}`, {
        credentials: 'include'
      });
      return response.ok;
    } catch (error) {
      console.error('Error checking loan status: ', error);
      return false;
    }
  };

  return (
    <>
      <div style={{display: 'grid', flex: 1}}>
        <SearchBar searchMethod={fetchBooks}></SearchBar>
        <div>
          <ul style={{listStyle: 'none', padding: 0}}>
            {books.map((book) =>
              <li key={book.id} className={'base-wrapper'} style={{padding: '0 var(--padding-500)'}}>
                <span>{`Tytuł: ${book.title}`}</span>
                <span>{`Autor: ${book.author}`}</span>
                <span>{`Ilość: ${book?.quantity || 0} `}</span>
                <button onClick={async () => {
                  await handleBookDelete(book.id);
                  fetchBooks();
                }}>
                  Usuń
                </button>
                <Link to={ROUTES.updateBook.buildPath(book.id)}><span>Edytuj</span></Link>
                {book.quantity > 0 && !loanedStatus[book.id] && (
                    <Link to={ROUTES.selectMemberForBookLoan.buildPath(book.id)}>
                      <span>Wypożycz</span>
                    </Link>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </>
  )
}