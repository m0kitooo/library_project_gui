import App from "./pages/App/App.jsx";
import Books from "./pages/books/Books.jsx";
import AddBook from "./pages/books/AddBook.jsx";
import Proposal from "./pages/proposals/Proposals.jsx";
import ProposalSend from "./pages/proposals/ProposalSend.jsx";
import ReturnBook from "./pages/ReturnBook.jsx";
import SelectMemberForBookLoan from "./pages/SelectMemberForBookLoan.jsx";
import UpdateBook from "./pages/books/UpdateBook/UpdateBook.jsx";
import ProposalDetails from "./pages/proposals/ProposalDetails.jsx";
import LoanBook from "./pages/book-loans/LoanBook.jsx";
import ChooseOrganizer from "./pages/ChooseOrganizer.jsx";
import LibraryPayments from "./pages/library-payments/LibraryPayments.jsx";
import BookReservations from "./pages/BookReservations.jsx";
import DisposedBooks from "./pages/DisposedBooks.jsx";
import Login from "./pages/Login/Login.jsx";
import AddLibraryPayment from "./pages/library-payments/AddLibraryPayment.jsx";
import BookLoans from "./pages/book-loans/BookLoans.jsx";
import BookDetails from "./pages/books/BookDetails/BookDetails.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import LibraryPaymentDetails from "./pages/library-payments/LibraryPaymentDetails.jsx";

const createProtectedRoute = (element) => (
    <ProtectedRoute>{element}</ProtectedRoute>
);

const ROUTES = {
  app: {path: "/", element: createProtectedRoute(<App/>)},
  books: {path: "/book", element: createProtectedRoute(<Books/>)},
  bookDetails: {path: "/book/:id", element: <BookDetails/>, buildPath: bookId => `/book/${bookId}`},
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
  addLibraryPayments: {path: "/library-payment/add", element: <AddLibraryPayment/>},
  bookLoans: {path: '/book-loan', element: <BookLoans/>},
  updateBook: {path: "/book/:id/update/", element: createProtectedRoute(<UpdateBook/>), buildPath: bookId => `/book/${bookId}/update`},
  proposalDetails: {path: "/proposal/details/:id", element: createProtectedRoute(<ProposalDetails/>)},
  choseOrganizer: {path: "/proposal/chooseOrganizer", element: createProtectedRoute(<ChooseOrganizer />)},
  libraryPayments: {path: "/library-payment", element: createProtectedRoute(<LibraryPayments/>)},
  libraryPaymentDetails: {
    path: "/library-payment/:id",
    element: createProtectedRoute(<LibraryPaymentDetails/>),
    buildPath: id => `/library-payment/${id}`
  },
  login: {path: "/login", element: <Login/>} // Strona logowania nie jest chroniona
};

export default ROUTES;