import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import AddBook from "./AddBook.jsx";
import ReturnBook from "./ReturnBook.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {path: "/", element: <App/>},
        {path: "/add", element: <AddBook/>},
        {path: "/return", element: <ReturnBook/>}

      ])}
    >
    </RouterProvider>
  </StrictMode>,
)
