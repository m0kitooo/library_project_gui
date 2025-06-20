import searchIcon from "../assets/search-icon.svg";
import {useEffect, useState} from "react";

export default function SearchBar({ searchMethod, placeholder }) {
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (typeof searchMethod === 'function') {
        searchMethod(userInput);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [userInput, searchMethod]);

  return (
      <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <input
                type={'text'}
                placeholder={placeholder || 'Szukaj'}
                value={userInput} onChange={e => {setUserInput(e.target.value)}}
                style={{padding: '10px', width: '100%'}}
            />
            <img
                src={searchIcon}
                alt="Search icon logo"
                style={{position: 'absolute', top: '10px', right: '12px'}}
            />
          </div>
        </div>
      </>
  )
}