import searchIcon from "../assets/search-icon.svg";
import {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import {Link} from "react-router-dom";
import ROUTES from "../routes.jsx";

export default function SearchBar() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/book`);
        const jsonData = await response.json();
        setBooks(jsonData);
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  useEffect(() => {
    fetchBooks()
  }, [books]);

  const handleBookDelete = id => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/book/delete?id=${id}`, {
            method: 'DELETE'
        });
        // const jsonData = await response.json();
        // setBooks(jsonData);
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  return (
    <>
      <div style={{display: 'grid', flex: 1}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ display: 'flex' }}>
            <input type={'text'} placeholder={'Szukaj'} style={{padding: '10px'}}/>
            <button onClick={fetchBooks}>
              <img src={searchIcon} alt="Search icon logo"/>
            </button>
          </div>
        </div>
        <div>
          <ul>
            {books.map((book) =>
                <li key={book.id}>
                  <span>{`${book.title}`}</span>
                  <span>{`${book.author}`}</span>
                  <button onClick={() => handleBookDelete(book.id)}>Usuń</button>
                  <Link to={ROUTES.updateBook.buildPath(book.id)}><span>Edytuj</span></Link>
                  <Link to={ROUTES.loanBook.path}><span>Wypożycz</span></Link>
                </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}