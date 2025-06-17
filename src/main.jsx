import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";

const router = createBrowserRouter(Object.values(ROUTES));

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </StrictMode>,
)