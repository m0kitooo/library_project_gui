import searchIcon from "./assets/search-icon.svg";

function SearchBar() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <input type={'text'} placeholder={'Szukaj'}/>
        <button>
          <img src={searchIcon} alt="Search icon logo"/>
        </button>
      </div>
    </>
  )
}

export default SearchBar;