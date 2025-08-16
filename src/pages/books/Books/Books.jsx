import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import {Link} from "react-router-dom";
import ROUTES from "../../../routes.jsx";
import SearchBar from "../../../components/SearchBar/SearchBar.jsx";
import Toast from "../../../components/Toast/Toast.jsx";
import routes from "../../../routes.jsx";
import BasePageLayout from "../../../components/BasePageLayout.jsx";
import styles from './Books.module.css';
import useFetchDynamic from "../../../hooks/useFetchDynamic.js";

export default function Books() {
  const [toast, setToast] = useState(null);
  const [books, setBooks] = useState([]);
  const {data, loading, error, fetcher} = useFetchDynamic();
  const [loanQuantities, setLoanQuantities] = useState({});

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

          const quantities = {};
          await Promise.all(
            booksData.map(async (book) => {
            const res = await fetch(`${CORE_API_BASE_URL}/book-loans/books/${book.id}`, {
            credentials: 'include'
          });
          const data = await res.json();
          quantities[book.id] = Array.isArray(data) ? data.length : 0;
        })
      );
      setLoanQuantities(quantities);
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

  // const isBookLoaned = async bookId => {
  //   try {
  //     const response = await fetch(`${CORE_API_BASE_URL}/book-loans/books/${bookId}`, {
  //       credentials: 'include'
  //     });
  //     return response.ok;
  //   } catch (error) {
  //     console.error('Error checking loan status: ', error);
  //     return false;
  //   }
  // };

  const getBookLoanQuantity = async bookId => {
    fetcher(`${CORE_API_BASE_URL}/book-loans/books/${bookId}`, {
      credentials: 'include'
    });
    return data?.length || 0;
  };

  //TO DO dodaj cos typu dostepne zeby pokazylo ilosc ksiazek ktore nie sa wypozyczone albo jakos inaczej bo trzeba tez uwzglednic rezerwacje
  return (
    <>
      <BasePageLayout>
        <SearchBar searchMethod={fetchBooks}></SearchBar>
        <div>
          <ul className={styles.bookList}>
            {books.map((book) =>
              <li key={book.id} className={`${styles.bookListItem} base-wrapper`}>
                <span>{`Tytuł: ${book.title}`}</span>
                <span>{`Autor: ${book.author}`}</span>
                <span>{`Ilość: ${book?.quantity || 0} `}</span>
                <span>{`Wypożyczonych: ${loanQuantities[book.id] || 0}`}</span>
                <Link to={routes.bookDetails.buildPath(book.id)}><span>Szczegóły</span></Link>
                <button onClick={async () => {
                  await handleBookDelete(book.id);
                  fetchBooks();
                }}>
                  Usuń
                </button>
                <Link to={ROUTES.updateBook.buildPath(book.id)}><span>Edytuj</span></Link>
                {book.quantity - loanQuantities[book.id] > 0 && (
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