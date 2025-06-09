export default function UpperNavBar() {
  return (
      <>
        <nav>
          <ul style={{listStyle: 'none'}}>
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
      </>
  )
}