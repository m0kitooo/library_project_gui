import App from "./pages/App.jsx";
import AddBook from "./pages/AddBook.jsx";
import Proposal from "./pages/proposals/Proposals.jsx";
import ProposalSend from "./pages/proposals/ProposalSend.jsx";
import ReturnBook from "./ReturnBook.jsx";
import LoanBook from "./pages/LoanBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import ProposalDetails from "./pages/proposals/ProposalDetails.jsx";
import ChooseOrganizer from "./pages/ChooseOrganizer.jsx";

const ROUTES = {
  app: {path: "/", element: <App/>},
  addBook: {path: "/add", element: <AddBook/>},
  proposal: {path: "/proposal", element: <Proposal/>},
  proposalSend: {path: "/proposal/sendProposal", element: <ProposalSend/>},
  returnBook: {path: "/return", element: <ReturnBook/>},
  loanBook: {path: "/loan", element: <LoanBook/>},
  updateBook: {path: "/book/update/:id", element: <UpdateBook/>, buildPath: id => `/book/update/${id}`},
  proposalDetails:  {path: "/proposal/details/:id", element: <ProposalDetails/>},
  choseOrganizer:  {path: "proposal/chooseOrganizer", element: <ChooseOrganizer />}
};

export default ROUTES;