import App from "./pages/App.jsx";
import AddBook from "./pages/AddBook.jsx";
import Proposal from "./pages/proposals/Proposals.jsx";
import ProposalSend from "./pages/proposals/ProposalSend.jsx";
import ReturnBook from "./pages/ReturnBook.jsx";
import SelectMemberForBookLoan from "./pages/SelectMemberForBookLoan.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import ProposalDetails from "./pages/proposals/ProposalDetails.jsx";
import LoanBook from "./pages/LoanBook.jsx";
import ChooseOrganizer from "./pages/ChooseOrganizer.jsx";
import LibraryPayments from "./pages/LibraryPayments.jsx";
import BookReservations from "./pages/BookReservations.jsx";
import DisposedBooks from "./pages/DisposedBooks.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

const createProtectedRoute = (element) => (
    <ProtectedRoute>{element}</ProtectedRoute>
);

const ROUTES = {
  app: {path: "/", element: createProtectedRoute(<App/>)},
  addBook: {path: "/book/add", element: createProtectedRoute(<AddBook/>)},
  reservations: {path: "/reservations", element: createProtectedRoute(<BookReservations />)},
  dispose: {path: "/dispose", element: createProtectedRoute(<DisposedBooks />)},
  proposal: {path: "/proposal", element: createProtectedRoute(<Proposal/>)},
  proposalSend: {path: "/proposal/send-proposal", element: createProtectedRoute(<ProposalSend/>)},
  returnBook: {path: "/return", element: createProtectedRoute(<ReturnBook/>)},
  loanbook: {path: "/loan", element: createProtectedRoute(<LoanBook/>)},
  selectMemberForBookLoan: {
    path: "/book/:bookId/select-member",
    element: createProtectedRoute(<SelectMemberForBookLoan/>),
    buildPath: bookId => `/book/${bookId}/select-member`
  },
  updateBook: {path: "/book/:id/update/", element: createProtectedRoute(<UpdateBook/>), buildPath: bookId => `/book/${bookId}/update`},
  proposalDetails: {path: "/proposal/details/:id", element: createProtectedRoute(<ProposalDetails/>)},
  choseOrganizer: {path: "proposal/chooseOrganizer", element: createProtectedRoute(<ChooseOrganizer />)},
  libraryPayments: {path: "library-payment", element: createProtectedRoute(<LibraryPayments/>)},
  login: {path: "/login", element: <Login/>} // Strona logowania nie jest chroniona
};

export default ROUTES;