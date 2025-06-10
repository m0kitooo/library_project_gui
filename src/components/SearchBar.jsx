import searchIcon from "../assets/search-icon.svg";

export default function SearchBar({ searchMethod }) {
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{ display: 'flex', width: '100%' }}>
          <input type={'text'} placeholder={'Szukaj'} style={{padding: '10px', width: '100%'}}/>
          <button onClick={searchMethod}>
            <img src={searchIcon} alt="Search icon logo"/>
          </button>
        </div>
      </div>
    </>
  )
}