import { Navigate } from "react-router-dom"
import ROUTES from "../../routes"

function App() {
    return <Navigate to={ROUTES.books.path} replace />
}

export default App
