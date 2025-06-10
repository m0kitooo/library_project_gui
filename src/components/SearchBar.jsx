import searchIcon from "../assets/search-icon.svg";
import {useState} from "react";

export default function SearchBar({ searchMethod }) {
  const [userInput, setUserInput] = useState('');

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{ display: 'flex', width: '100%' }}>
          <input
            type={'text'}
            placeholder={'Szukaj'}
            value={userInput} onChange={e => {setUserInput(e.target.value)}}
            style={{padding: '10px', width: '100%'}}
          />
          <button onClick={searchMethod}>
            <img src={searchIcon} alt="Search icon logo"/>
          </button>
        </div>
      </div>
    </>
  )
}