import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import {Link} from "react-router-dom";
import ROUTES from "../routes.jsx";
import SearchBar from "./SearchBar.jsx";

export default function SearchWrapper() {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(
    (title) => {
      title = typeof title === 'string' ? title : '';

      (async () => {
        try {
          const response = await fetch(`${CORE_API_BASE_URL}/books?title=${title}`, {
            credentials: 'include'
          });
          setBooks(await response.json());
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
      await fetch(`${CORE_API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error: ', error)
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
                <span>{`Ilość: ${book?.quantity || 0}`}</span>
                <button onClick={async () => {
                  await handleBookDelete(book.id);
                  fetchBooks();
                }}>
                  Usuń
                </button>
                <Link to={ROUTES.updateBook.buildPath(book.id)}><span>Edytuj</span></Link>
                <Link to={ROUTES.selectMemberForBookLoan.buildPath(book.id)}><span>Wypożycz</span></Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}