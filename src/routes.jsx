import App from "./pages/App.jsx";
import AddBook from "./pages/AddBook.jsx";
import Proposal from "./pages/proposals/Proposals.jsx";
import ProposalSend from "./pages/proposals/ProposalSend.jsx";
import ReturnBook from "./ReturnBook.jsx";
import LoanBook from "./pages/LoanBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import ProposalDetails from "./pages/proposals/ProposalDetails.jsx";
import ChooseOrganizer from "./pages/proposals/OrganizerList.jsx";
import Members from "./pages/members/Members.jsx";
import MemberDetails from "./pages/members/MemberDetails.jsx";

const ROUTES = {
  app: {path: "/", element: <App/>},

  addBook: {path: "/add", element: <AddBook/>},
  returnBook: {path: "/return", element: <ReturnBook/>},
  loanBook: {path: "/loan", element: <LoanBook/>},
  updateBook: {path: "/book/update/:id", element: <UpdateBook/>, buildPath: id => `/book/update/${id}`},

  proposal: {path: "/proposal", element: <Proposal/>},
  proposalSend: {path: "/proposal/sendProposal", element: <ProposalSend/>},
  proposalDetails: {path: "/proposal/details/:id", element: <ProposalDetails/>},
  choseOrganizer: {path: "/proposal/chooseOrganizer/:id", element: <ChooseOrganizer />},

  member: {path: "/member", element: <Members />},
  memberDetails: {path: "/member/details/:id", element: <MemberDetails /> }
};

export default ROUTES;