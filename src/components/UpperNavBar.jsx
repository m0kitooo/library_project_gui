export default function UpperNavBar() {
  return (
      <>
        <nav>
          <ul style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', listStyle: 'none'}}>
            <li>
              {/*<button>*/}
              {/*  <span>Zaloguj się</span>*/}
              {/*</button>*/}
              <button>
                <span>Wyloguj się</span>
              </button>
            </li>
          </ul>
        </nav>
      </>
  )
}