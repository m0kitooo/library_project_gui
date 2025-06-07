import { useState } from 'react'
import './App.css'
import SearchBar from "./SearchBar.jsx";

function App() {
  const [count, setCount] = useState(0);
  const books = ["xpp", "sigma"];

  return (
    <>
      <nav>
        <ul>
          <li>
            <span>Dodaj książkę</span>
          </li>
          <li>
            <span>Stwórz karte biblioteczną</span>
          </li>
          <li>
            <button>
              <span>Zaloguj się</span>
            </button>
            <button>
              <span>Wyloguj się</span>
            </button>
          </li>
        </ul>
      </nav>
      <SearchBar/>
      <div>
        <ul>
          {/*{books.forEach(b => {*/}
          {/*  <li></li>*/}
          {/*})}*/}
        </ul>
      </div>
      <form>
        <input type={'text'} placeholder={'nazwa'}/>
        <input type={'text'} placeholder={'autor'}/>
        <textarea placeholder={'opis'}></textarea>
        <input type={'number'} min={0} placeholder={'ilość'}/>
        <button>Dodaj książkę</button>
      </form>
      <button>Stwórz wypożyczenie</button>
      <form>
        <button>Stwórz wypożyczenie</button>
      </form>
      <form>
        <input type={'text'} placeholder={'imie'}/>
        <input type={'text'} placeholder={'nazwisko'}/>
        <input type={'text'} inputMode={'numeric'} pattern={'\\d{11}'} maxLength={11} placeholder={'pesel'}/>
        <input type={'date'} placeholder={'data urodzenia'}/>
        <button>Stwórz karte biblioteczną</button>
      </form>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
