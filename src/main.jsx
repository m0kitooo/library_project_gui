import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import AddBook from "./AddBook.jsx";
import Proposal from './pages/Proposals/Proposals.jsx'
import ProposalSend from "./pages/Proposals/ProposalSend.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {path: "/", element: <App/>},
        {path: "/add", element: <AddBook/>},
        {path: "/proposal", element: <Proposal/>},
        {path: "/proposal/sendProposal", element: <ProposalSend/>}
      ])}
    >
    </RouterProvider>
  </StrictMode>,
)
