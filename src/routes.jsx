import App from "./pages/App/App.jsx";
import Books from "./pages/books/Books/Books.jsx";
import AddBook from "./pages/books/AddBook.jsx";
import Proposal from "./pages/proposals/Proposals.jsx";
import ProposalSend from "./pages/proposals/ProposalSend.jsx";
import ReturnBook from "./pages/ReturnBook.jsx";
import SelectMemberForBookLoan from "./pages/SelectMemberForBookLoan.jsx";
import UpdateBook from "./pages/books/UpdateBook/UpdateBook.jsx";
import ProposalDetails from "./pages/proposals/ProposalDetails.jsx";
import LoanBook from "./pages/book-loans/LoanBook.jsx";
import ChooseOrganizer from "./pages/ChooseOrganizer.jsx";
import LibraryPayments from "./pages/library-payments/LibraryPayments/LibraryPayments.jsx";
import BookReservations from "./pages/BookReservations.jsx";
import DisposedBooks from "./pages/DisposedBooks.jsx";
import Login from "./pages/Login/Login.jsx";
import AddLibraryPayment from "./pages/library-payments/AddLibraryPayment/AddLibraryPayment.jsx";
import BookLoans from "./pages/book-loans/BookLoans.jsx";
import BookDetails from "./pages/books/BookDetails/BookDetails.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import LibraryPaymentDetails from "./pages/library-payments/LibraryPaymentDetails/LibraryPaymentDetails.jsx";
import Members from "./pages/members/Members/Members.jsx";
import AddMember from "./pages/members/AddMember/AddMember.jsx";
import MemberDetails from "./pages/members/MemberDetails/MemberDetails.jsx";

const ROUTES = {
  app: {path: "/", element: <App/>},
  books: {path: "/book", element: <Books/>},
  bookDetails: {path: "/book/:id", element: <BookDetails/>, buildPath: bookId => `/book/${bookId}`},
  addBook: {path: "/book/add", element: <AddBook/>},
  reservations: {path: "/reservations", element: <BookReservations />},
  dispose: {path: "/dispose", element: <DisposedBooks />},
  proposal: {path: "/proposal", element: <Proposal/>},
  proposalSend: {path: "/proposal/send-proposal", element: <ProposalSend/>},
  returnBook: {path: "/return", element: <ReturnBook/>},
  loanbook: {path: "/loan", element: <LoanBook/>},
  selectMemberForBookLoan: {
    path: "/book/:bookId/select-member",
    element: <SelectMemberForBookLoan/>,
    buildPath: bookId => `/book/${bookId}/select-member`
  },
  addLibraryPayments: {path: "/library-payment/add", element: <AddLibraryPayment/>},
  bookLoans: {path: '/book-loan', element: <BookLoans/>},
  updateBook: {path: "/book/:id/update/", element: <UpdateBook/>, buildPath: bookId => `/book/${bookId}/update`},
  proposalDetails: {path: "/proposal/details/:id", element: <ProposalDetails/>},
  choseOrganizer: {path: "/proposal/chooseOrganizer", element: <ChooseOrganizer />},
  libraryPayments: {path: "/library-payment", element: <LibraryPayments/>},
  addLibraryPayment: {path: "/library-payment/add", element: <AddLibraryPayment/>},
  libraryPaymentDetails: {
    path: "/library-payment/:id",
    element: <LibraryPaymentDetails/>,
    buildPath: id => `/library-payment/${id}`
  },
  login: {path: "/login", element: <Login/>},
  members: {path: "/member", element: <Members/>},
  addMembers: {path: "/member/add", element: <AddMember/>},
  memberDetails: {path: "/member/:memberId", element: <MemberDetails/>, buildPath: memberId => `/member/${memberId}`}
};

for (const route in ROUTES) {
  if (route !== "login") {
    ROUTES[route].element = <ProtectedRoute>{ROUTES[route].element}</ProtectedRoute>;
  }
}

export default ROUTES;