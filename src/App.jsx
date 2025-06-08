import { useState } from 'react'
import './App.css'
import SearchBar from "./SearchBar.jsx";
import UpperNavBar from "./UpperNavBar.jsx";
import SideNavBar from "./SideNavBar.jsx";

function App() {
  const [count, setCount] = useState(0);
  const books = ["xpp", "sigma"];

  return (
    <>
      <UpperNavBar/>
      <SideNavBar/>
      <SearchBar/>
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
