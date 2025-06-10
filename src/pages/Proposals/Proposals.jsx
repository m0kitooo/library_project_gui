import UpperNavBar from "../../UpperNavBar.jsx";
import SideNavBar from "../../SideNavBar.jsx";
import { Link } from "react-router-dom";
import ProposalList from "../../assets/ProposalList.jsx";
import ProposalDetails from "./ProposalDetails.jsx";

export default function Proposals() {
  return (
    <>
      <UpperNavBar/>
      <SideNavBar/>
      <ul>
        <li>
          <Link to={"/proposal/sendProposal"}>Wyślij propozycję</Link>
        </li>
      </ul>
      <ProposalList page={0} limit={20}/>
    </>
  )
}
