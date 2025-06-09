import '../styles/App.css'
import SearchBar from "../components/SearchBar.jsx";
import BasePageLayout from "../components/BasePageLayout.jsx";

function App() {
  return (
    <>
      <BasePageLayout>
        <SearchBar/>
      </BasePageLayout>
    </>
  )
}

export default App
