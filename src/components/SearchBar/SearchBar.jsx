import searchIcon from '../../assets/search-icon.svg';
import {useEffect, useState} from "react";
import styles from './SearchBar.module.css';

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
        <div className={styles.outerDiv}>
          <div className={styles.innerDiv}>
            <input
                type={'text'}
                placeholder={placeholder || 'Szukaj'}
                value={userInput} onChange={e => {setUserInput(e.target.value)}}
                className={styles.inputField}
            />
            <img
                src={searchIcon}
                alt="Search icon logo"
                className={styles.searchIcon}
            />
          </div>
        </div>
      </>
  )
}