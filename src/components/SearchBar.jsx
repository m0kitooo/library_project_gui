import searchIcon from "../assets/search-icon.svg";
import {useEffect, useState} from "react";

export default function SearchBar({ searchMethod }) {
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchMethod(userInput);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [userInput, searchMethod]);

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
          <img
              src={searchIcon}
              alt="Search icon logo"
              style={{position: 'absolute', right: '15px'}}
          />
        </div>
      </div>
    </>
  )
}