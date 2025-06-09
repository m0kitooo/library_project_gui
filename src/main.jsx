import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './pages/App.jsx'
import AddBook from "./pages/AddBook.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {path: "/", element: <App/>},
        {path: "/add", element: <AddBook/>}
      ])}
    >
    </RouterProvider>
  </StrictMode>,
)
