import App from "./pages/App.jsx";
import AddBook from "./pages/AddBook.jsx";
import Proposal from "./pages/Proposals/Proposals.jsx";
import ProposalSend from "./pages/Proposals/ProposalSend.jsx";
import ReturnBook from "./ReturnBook.jsx";
import LoanBook from "./pages/LoanBook.jsx";

const ROUTES = {
  app: {path: "/", element: <App/>},
  addBook: {path: "/add", element: <AddBook/>},
  proposal: {path: "/proposal", element: <Proposal/>},
  proposalSend: {path: "/proposal/sendProposal", element: <ProposalSend/>},
  returnBook: {path: "/return", element: <ReturnBook/>},
  loanBook: {path: "/loan", element: <LoanBook/>}
};

export default ROUTES;