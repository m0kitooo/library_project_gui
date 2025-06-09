import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(Object.values(ROUTES))}/>
  </StrictMode>,
)
