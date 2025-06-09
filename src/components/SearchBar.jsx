import searchIcon from "../assets/search-icon.svg";
import {useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";

function SearchBar() {
  const [books, setBooks] = useState([]);

  const handleSearch = () => {
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
      <div style={{display: 'grid'}}>
        <div style={{ display: 'flex' }}>
          <input type={'text'} placeholder={'Szukaj'}/>
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="Search icon logo"/>
          </button>
        </div>
        <div>
          <ul>
            {books.map((book, index) =>
                <li key={index}>
                  <span>{JSON.stringify(book)}</span>
                  <button onClick={() => handleBookDelete(book.id)}>Usuń</button>
                </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SearchBar;