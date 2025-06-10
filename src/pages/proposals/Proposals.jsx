import { Link } from "react-router-dom";
import ProposalList from "../../components/ProposalList.jsx";
import BasePageLayout from "../../components/BasePageLayout.jsx";

export default function Proposals() {
  return (
    <>
      <BasePageLayout>
        <ul>
          <li>
            <Link to={"/proposal/sendProposal"}>Wyślij propozycję</Link>
          </li>
        </ul>
        <ProposalList page={0} limit={20}/>
      </BasePageLayout>
    </>
  )
}
