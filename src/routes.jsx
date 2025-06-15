import App from "./pages/App.jsx";
import AddBook from "./pages/AddBook.jsx";
import Proposal from "./pages/proposals/Proposals.jsx";
import ProposalSend from "./pages/proposals/ProposalSend.jsx";
import ReturnBook from "./ReturnBook.jsx";
import SelectMemberForBookLoan from "./pages/SelectMemberForBookLoan.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import ProposalDetails from "./pages/proposals/ProposalDetails.jsx";
import ChooseOrganizer from "./pages/ChooseOrganizer.jsx";
import LibraryPayments from "./pages/LibraryPayments.jsx";
import Login from "./pages/Login.jsx";

const ROUTES = {
  app: {path: "/", element: <App/>},
  addBook: {path: "/book/add", element: <AddBook/>},
  proposal: {path: "/proposal", element: <Proposal/>},
  proposalSend: {path: "/proposal/send-proposal", element: <ProposalSend/>},
  returnBook: {path: "/return", element: <ReturnBook/>},
  selectMemberForBookLoan: {
    path: "/book/:bookId/select-member",
    element: <SelectMemberForBookLoan/>,
    buildPath: bookId => `/book/${bookId}/select-member`
  },
  updateBook: {path: "/book/:id/update/", element: <UpdateBook/>, buildPath: bookId => `/book/${bookId}/update`},
  proposalDetails: {path: "/proposal/details/:id", element: <ProposalDetails/>},
  choseOrganizer: {path: "proposal/chooseOrganizer", element: <ChooseOrganizer />},
  libraryPayments: {path: "library-payment"}, element: <LibraryPayments/>,
  login: {path: "/login", element: <Login/>}
};

export default ROUTES;