import App from "./pages/App/App.jsx";
import Books from "./pages/books/Books/Books/Books.jsx";
import AddBook from "./pages/books/AddBook/AddBook.jsx";
import ProposalSend from "./pages/proposals/ProposalSend.jsx";
import ProposalAccept from "./pages/proposals/ProposalAccept.jsx";
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
import CreateLibraryCard from "./pages/library-cards/CreateLibraryCard.jsx";
import ProposalList from "./components/ProposalList.jsx";
import ReturnWithComments from "./pages/proposals/ReturnWithComments.jsx";
import CreatePlan from "./pages/plans/CreatePlan.jsx";
import PlanDetails from "./pages/plans/PlanDetails.jsx";
import Plans from "./pages/plans/PlanList.jsx";
import PlanEdit from "./pages/plans/PlanEdit.jsx";
import UpdateLibraryPayment from "./pages/library-payments/UpdateLibraryPayment/UpdateLibraryPayment.jsx";

const ROUTES = {
    app: {path: "/", element: <App/>},
    books: {path: "/book", element: <Books/>},
    bookDetails: {path: "/book/:id", element: <BookDetails/>, buildPath: bookId => `/book/${bookId}`},
    addBook: {path: "/book/add", element: <AddBook/>},
    reservations: {path: "/reservations", element: <BookReservations/>},
    dispose: {path: "/dispose", element: <DisposedBooks/>},
    proposal: {path: "/proposal/list", element: <ProposalList/>},
    proposalSend: {path: "/proposal/send", element: <ProposalSend/>},
    proposalAccept: {
        path: "/proposal/accept/:id",
        element: <ProposalAccept/>,
        buildPath: (id) => `/proposal/accept/${id}`
    },
    proposalReturnWithComment: {
        path: "/proposal/return-with-comment/:id",
        element: <ReturnWithComments/>,
        buildPath: (id) => `/proposal/return-with-comment/${id}`
    },
    plans: {path: "/plans", element: <Plans/>},
    planDetails: {
        path: "/plans/:id",
        element: <PlanDetails/>,
        buildPath: (id) => `/plans/${id}`,
    },
    createPlan: {path: "/plans/create", element: <CreatePlan/>},
    planEdit: {
        path: "/plans/:id/edit",
        element: <PlanEdit/>,
        buildPath: (id) => `/plans/${id}/edit`,
    },

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
    proposalDetails: {
        path: "/proposal/details/:id",
        element: <ProposalDetails/>,
        buildPath: (id) => `/proposal/details/${id}`
    },
    choseOrganizer: {path: "/proposal/chooseOrganizer", element: <ChooseOrganizer/>},
    libraryPayments: {path: "/library-payment", element: <LibraryPayments/>},
    libraryPaymentDetails: {
        path: "/library-payment/:id",
        element: <LibraryPaymentDetails/>,
        buildPath: id => `/library-payment/${id}`
    },
    updateLibraryPayment: {
        path: "/library-payment/:id/update",
        element: <UpdateLibraryPayment/>,
        buildPath: id => `/library-payment/${id}/update`
    },
    createLibraryCard: {path: "/library-card/create", element: <CreateLibraryCard/>},
    login: {path: "/login", element: <Login/>},
    members: {path: "/member", element: <Members/>},
    addMembers: {path: "/member/add", element: <AddMember/>},
    memberDetails: {path: "/member/:memberId", element: <MemberDetails/>, buildPath: memberId => `/member/${memberId}`},
};

for (const route in ROUTES) {
  if (route !== "login") {
    ROUTES[route].element = <ProtectedRoute>{ROUTES[route].element}</ProtectedRoute>;
  }
}

export default ROUTES;